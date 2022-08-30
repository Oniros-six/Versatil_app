const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

const {Mongoose} = require('./database');


// Settings

app.set('port', process.env.PORT || 4000);

// Middleware
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/categories/', require('./routes/category.routes'));
app.use('/api/notes/', require('./routes/note.routes'));
app.use('/api/users/', require('./routes/user.routes'));
app.use('/api/finanzas/', require('./routes/finanzas.routes'));


// Statics
app.use(express.static(path.join(__dirname, 'public')));

// Start server
app.listen(app.get('port'), () => {
    console.log(`The server is listening on the port ${app.get('port')}`)
})
