require('dotenv').config()

const config = {
    env: process.env.NODE_ENV || 'dev',
    isProd: process.env.NODE_ENV === 'production',
    port: process.env.PORT || 4000,
    dbUrl: process.env.DATABASE_URL,
    apiKey: process.env.API_KEY,
    secreto: process.env.JWT_SECRET,
    // jwtConfig: process.env.JWT_CONFIG
}

module.exports = { config }