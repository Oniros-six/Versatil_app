const express = require('express');
const passport = require('passport');
const authService = require('../services/auth.service')
const service = new authService()

const router = express.Router();

router.post('/login',
    passport.authenticate('local', { session: false }),
    async (req, res, next) => {
        try {
            const respuesta = await service.login(req)

            res.json({
                user: respuesta.user,
                token: respuesta.token
            })

        } catch (error) {
            next(error)
        }
    })

module.exports = router
