const nodemailer = require("nodemailer");
const config = require('../config')
// async..await is not allowed in global scope, must use a wrapper
// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing

// create reusable transporter object using the default SMTP transport
async function send(from, to, subject, text) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.email_user, // generated ethereal user
            pass: config.email_pass // generated ethereal password
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: config.email_bot, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: text// plain body
    });

    console.log("Message sent");

}
module.exports = {
    send: send
}
