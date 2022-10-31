const express = require('express');
const passport = require('passport');
const authService = require('../services/auth.service')
const service = new authService()

const router = express.Router();

router.get('/perfil',
    async (req, res, next) => {
        try {
            res.statusCode(200)
        } catch (error) {
            next(error)
        }
    })

module.exports = router
