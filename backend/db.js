const mongoose = require('mongoose');

const mongoURI = 'mongodb://127.0.0.1:27017/login-page';

const connectToMongo = () => {
    mongoose.connect(mongoURI)
        .then((res) => console.log('Connected to Mongo successfully.'))
        .catch(error => console.log(error.reason));
};

module.exports = connectToMongo;