const boom = require('@hapi/boom');

function validatiorHandler(schema, prop) {
    return (req, res, next) => {
        const data = req[prop];
        const {error} = schema.validate(data, { abortEarly: false })
        if (error) {
            next(boom.badRequest(error));
        }
        next()
    }
}

module.exports = validatiorHandler;