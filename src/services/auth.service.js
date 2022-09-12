const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const {config} = require('../config/config')
const bc = require('bcrypt');

const userService = require('./../../src/services/user.service');
const service = new userService()

class authService {

    async getUser(username, password) {
        const user = await service.getUserByName(username)
        if (!user){
            throw boom.unauthorized()
        }
        const isMatch = await bc.compare(password, user.pass);
        if (!isMatch){
            throw boom.unauthorized()
        }
        console.log(user)
        return user
    }

    async login(req) {
        const user = req.user
        const payload = {
            sub: user.id
        }
        const token = jwt.sign(payload, config.secreto)
        // const token = jwt.sign(payload, config.secreto, config.jwtConfig)

        return {user, token}
}

}

module.exports = authService