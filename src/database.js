const mongoose = require('mongoose');

const URI = 'mongodb+srv://lean286:lealeo321@cluster0.juyk1f7.mongodb.net/test';
// const URI = 'mongodb://localhost/myApp';

mongoose.connect(URI)
        .then(db => console.log('DB is connected'))
        .catch(err => console.error(err));

module.exports = mongoose;