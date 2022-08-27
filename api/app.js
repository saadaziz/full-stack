const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const defaultRoutes = require('./controller/default-routes');
const userRoutes = require('./controller/user-routes');
const authRoutes = require('./controller/auth-routes');
const passport = require('passport');
const Strategy = require('passport-google-oauth2');
const UserService = require('./lib/user');
var session = require('express-session');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');


//TODO
// consider moving all mongodb stuff out
// consider moving all passport stuff out

if (process.env.NODE_ENV !== 'production') {
  console.log("Running !production");
  require('dotenv').config();
}

const PORT = process.env.PORT || 3001;
const ROOT_URL = process.env.ROOT_URL;
const MONGO_URL = process.env.MONGO_DB_URL_TEST;
const ONE_DAY_MILLISECONDS = 1000 * 60 * 60 * 24;

const app = express();

// enable json request, body parsing
const jsonParser = bodyParser.json();
app.use(jsonParser);
app.use(bodyParser.urlencoded({ extended: true }));

// enable cookie parsing
app.use(cookieParser());

// enable sessions
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV !== "production" ? false : true,
    maxAge: ONE_DAY_MILLISECONDS
  },
  store: MongoStore.create({
    mongoUrl: MONGO_URL,
  })
}));
if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
}

// set up data sources
// conecting to mongoDb atlas | TODO - factor in documentDb connection switching
mongoose.connect(
  MONGO_URL,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  (error) => {
    if (error) console.log(error)
  }
)
mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to MongoDb server');
});
mongoose.connection.on('error', function (err) {
  console.log('Mongoose default connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

// set up access control list
const verifyUser = async (accessToken, refreshToken, profile, verified) => {
  if (profile.emails) {
    email = profile.emails[0].value;
  }

  if (profile.photos && profile.photos.length > 0) {
    avatarUrl = profile.photos[0].value;
  }

  try {

    const user = await UserService.signIn({
      googleId: profile.id,
      email: profile.email,
      googleToken: { accessToken, refreshToken },
      displayName: profile.displayName,
      avatarUrl: profile.avatarUrl
    });

    verified(null, user);

  } catch (err) {

    verified(err);

    console.log("app | UserService.signIn err: " + err);
  }
}

// set up security
passport.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${ROOT_URL}/auth/oauth2callback`,
    },
    verifyUser,
  ),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  let err;

  try {
    const user = UserService.findUsingId(id);
    done(null, user);
  } catch (err) {
    console.error("deserializeUser: err | " + err);
    done(err, user);
  };
});

app.use(passport.initialize());
app.use(passport.session());

// set up application routes
app.use('/', defaultRoutes);
app.use('/user', userRoutes);
app.use('/auth', authRoutes);

app.get('/api', (req, res) => {
  res.send('/api GET request')
})

app.get('/profile', async (req, res) => {
  // Cookies that have not been signed
  console.log('Cookies: ', req.cookies)

  // Cookies that have been signed
  console.log('Signed Cookies: ', req.signedCookies);

  // Who is this user?
  res.send('/profile GET request: user | ' + await req.user );
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

module.exports = app;