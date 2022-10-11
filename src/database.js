const mongoose = require('mongoose');
const { config } = require('./config/config')

const URI = config.dbUrl;

mongoose.connect(URI)
        .then(db => console.log('DB is connected to ', URI))
        .catch(err => console.error(err));

module.exports = mongoose;