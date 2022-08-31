const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const Strategy = require('passport-google-oauth2');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const db = require('./lib/data/mongoDb-connection');
const UserService = require('./lib/user');
const authRoutes = require('./controller/auth-routes');
const userRoutes = require('./controller/user-routes');
const defaultRoutes = require('./controller/default-routes');

// TODO
// consider moving all mongodb stuff out
// consider moving all passport stuff out

if (process.env.NODE_ENV !== 'production') {
  console.log('Running !production');
  require('dotenv').config();
}

const PORT = process.env.PORT || 3001;
const { ROOT_URL } = process.env;
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
    secure: process.env.NODE_ENV === 'production',
    maxAge: ONE_DAY_MILLISECONDS,
  },
  store: MongoStore.create({
    mongoUrl: MONGO_URL,
  }),
}));
if (app.get('env') === 'production') {
  app.set('trust proxy', 1); // trust first proxy
}

// set up data sources
db.connect();

// conecting to mongoDb atlas | TODO - factor in documentDb connection switching

// set up access control list
const verifyUser = async (accessToken, refreshToken, profile, verified) => {
  let email;
  let avatarUrl;

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
      avatarUrl,
    });

    verified(null, user);
  } catch (err) {
    console.log(`app | UserService.signIn err: ${err}`);
    verified(err);
  }
};

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

passport.deserializeUser(async (id, done) => {
  try {
    let err;
    const user = await UserService.findUsingId(id);
    console.log(`deserializeUser() | ${user}`);
    done(null, user);
  } catch (err) {
    console.error(`deserializeUser: err | ${err}`);
    done(err, user);
  }
});

app.use(passport.initialize());
app.use(passport.session());

// set up application routes
app.use('/', defaultRoutes);
app.use('/user', userRoutes);
app.use('/auth', authRoutes);

app.get('/api', (req, res) => {
  res.send('/api GET request');
});

app.get('/logout', (req, res) => {
  res.status(200).clearCookie('connect.sid', {
    path: '/',
  });
  req.session.destroy((err) => {
    console.log(err);
    res.redirect('/');
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

module.exports = app;
