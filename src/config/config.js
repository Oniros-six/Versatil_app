require('dotenv').config()

const config = {
    env: process.env.NODE_ENV || 'dev',
    isProd: process.env.NODE_ENV === 'production',
    port: process.env.PORT || 4000,
    dbUrl: process.env.DATABASE_URL,
    apiKey: process.env.API_KEY
}

module.exports = { config }