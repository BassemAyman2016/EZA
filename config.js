require('dotenv').config();

module.exports = {
    ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    MONGODOCKER_URI: process.env.MONGODOCKER_URI,
    secretOrKey: process.env.secretOrKey,
    email_bot: process.env.email_bot,
    email_host: process.env.email_host,
    email_user: process.env.email_user,
    email_pass: process.env.email_pass,
    email_port: process.env.email_port
}