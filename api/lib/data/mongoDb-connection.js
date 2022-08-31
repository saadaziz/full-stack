const mongoose = require('mongoose');

require('dotenv').config();

const MONGO_URL = process.env.MONGO_DB_URL_TEST;

let mongodb;

module.exports.connect = async () => {
  const connection = await mongoose.connect(
    MONGO_URL,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    },
    (error) => {
      if (error) console.log(error);
    },
  );
  mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to MongoDb server');
  });
  mongoose.connection.on('error', (err) => {
    console.log(`Mongoose default connection error: ${err}`);
  });
  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose default connection disconnected');
  });

  return connection;
};
