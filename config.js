require('dotenv').config();

module.exports = {
    ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    MONGODOCKER_URI: process.env.MONGODOCKER_URI,
    secretOrKey: process.env.secretOrKey
}