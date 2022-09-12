const express = require('express');
const passport = require('passport');
const authService = require('../services/auth.service')
const service = new authService()

const router = express.Router();

router.post('/login',
    passport.authenticate('local', { session: false }),
    async (req, res, next) => {
        try {
            res.json(service.login(req))
        } catch (error) {
            next(error)
        }
    })

module.exports = router
