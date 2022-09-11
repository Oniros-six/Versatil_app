const { Strategy } = require('passport-local');
const boom = require('@hapi/boom');
const bc = require('bcrypt');

const userService = require('./../../../services/user.service');
const user = require('../../../models/user');
const service = new userService()

const LocalStrategy = new Strategy({usernameField: 'username',
                                    passwordField: 'password'},
    async (username, password, done) => {
    try {
        const user = await service.getUserByName(username)
        if (!user){
            done(boom.unauthorized(), false)
        }
        const isMatch = await bc.compare(password, user.pass);
        if (!isMatch){
            done(boom.unauthorized(), false)
        }
        done(null, user)

    } catch (error) {
        done(error, false)
    }
})

module.exports = LocalStrategy;
