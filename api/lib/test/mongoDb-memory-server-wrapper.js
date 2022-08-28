const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongodb;

module.exports.connect = async () => {
    mongodb = await MongoMemoryServer.create();
    const uri = await mongodb.getUri();
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    await mongoose.connect(uri, options);
}

module.exports.stopDatabase = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongodb.stop();
}

module.exports.deleteCollections = async () => {
    const collections = mongoose.connection.collection;

    for(const key in collections){
        const collection = collections[key];
        await collection.deleteMany({});
    }
}