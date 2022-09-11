const passport = require('passport');

const LocalStrategy = require('./strategies/local.strategies');
const jwtStrategy = require('./strategies/jwt.strategies');

passport.use(LocalStrategy)
passport.use(jwtStrategy)

module.exports = passport
