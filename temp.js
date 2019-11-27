require('dotenv').config();
module.exports = {
    access_token: process.env.access_token,
    refresh_token: process.env.refresh_token,
    scope: process.env.scope,
    token_type: process.env.token_type,
    expiry_date: process.env.expiry_date
}