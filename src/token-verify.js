const jwt = require('jsonwebtoken');
const {config} = require('./config/config')

const secret = config.secreto

function verifyToken(token, secret){
    return jwt.verify(token, secret);
}
// Verify token, me devuelve el contenido del payload