const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const defaultRoutes = require('./controller/default-routes');
const userRoutes = require('./controller/user-routes');

if (process.env.NODE_ENV !== 'production') {
  console.log("Running !production");
  require('dotenv').config();
}

const PORT = process.env.PORT || 3001;

const app = express();

// enable json request, body parsing
const jsonParser = bodyParser.json();

app.use(jsonParser);

app.use(bodyParser.urlencoded({extended: true}));

// set up data sources
const MONGO_URL = process.env.MONGO_DB_URL_TEST;

// conecting to mongoDb atlas
// TODO - factor in documentDb connection switching
mongoose.connect(
  MONGO_URL,
  {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      // useFindAndModify: false,
      // useCreateIndex: true
  },
  (error) => {
      if (error) console.log(error)
  }
)

mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to MongoDb server');
});
// If the connection throws an error
mongoose.connection.on('error', function (err) {
  console.log('Mongoose default connection error: ' + err);
});
// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

// set up application routes
app.use('/', defaultRoutes);
app.use('/user', userRoutes);

// temp using for testing
app.get('/api', function (req, res) {
  res.send('API server is up and running');
});

// temp using for testing
app.post('/api', function (req, res) {
  console.log(req.body)
  res.send(req.body.googleId);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

module.exports = app;