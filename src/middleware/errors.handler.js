const boom = require('@hapi/boom');

function logErrors(err, req, res, next){
    console.log(err)
    next(err)
}

function errorHandler(err, req, res, next){
    res.status(500).json({
        // el 500 es un temporal
        message: err.message,
        stack: err.stack
    })
}

function boomErrorHandler(err, req, res, next) {
    if (err.isBoom) {
        const {output} = err
        res.status(output.statusCode).json(output.payload)
    }
    next(err)
}

module.exports = {logErrors, errorHandler, boomErrorHandler}