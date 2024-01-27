const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI;

const connectToMongo = () => {
    mongoose.connect(mongoURI)
        .then((res) => console.log('Connected to Mongo successfully.'))
        .catch(error => console.log(error.reason));
};

module.exports = connectToMongo;