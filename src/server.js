const express = require('express');
const morgan = require('morgan');
const passport = require('passport')
const {logErrors, errorHandler, boomErrorHandler} = require('./middleware/errors.handler')
const {checkApiKey} = require('./middleware/auth.handler')
const path = require('path');
const cors = require('cors')

const { config } = require('./config/config')

const app = express();

const {Mongoose} = require('./database');



// Settings
app.set('port', process.env.PORT || config.port);
app.use(cors())

// Middleware
require('./utils/auth')
app.use(morgan('dev'));
app.use(express.json());


// Routes
app.use('/api/categories/', require('./routes/category.routes'));
app.use('/api/notes/', require('./routes/note.routes'));
app.use('/api/finanzas/', require('./routes/finanzas.routes'));
app.use('/api/users/', require('./routes/user.routes'));
app.use('/api/auth/', require('./routes/auth.route'));

app.get('/test', checkApiKey,(req, res) => {
    res.send('funcionando')
})

// Middlewares de error
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

// Statics
app.use(express.static(path.join(__dirname, '../public')));
// Start server
app.listen(process.env.PORT, () => {
    console.log(`The server is listening on the port ${app.get('port')}`)
})
