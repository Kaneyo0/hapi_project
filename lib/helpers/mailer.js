'use strict';

const Nodemailer = require('nodemailer');

require('dotenv').config();

module.exports = class MailerHelper {
    static instance = new MailerHelper();

    constructor() {

        Nodemailer.createTestAccount((err, account) => {

            if (err) {
                console.error('Failed to create a testing account. ' + err.message);
                return process.exit(1);
            }

            console.log('Credentials obtained');

            // Create a SMTP transporter object
            this.transporter = Nodemailer.createTransport({
                host: process.env.MAILER_HOST,
                port: process.env.MAILER_PORT,
                auth: {
                    user: process.env.MAILER_AUTH_USER,
                    pass: process.env.MAILER_AUTH_PWD
                }
            });
        });
    }

    send(email, object, content) {

        const message = {
            from: process.env.MAILER_AUTH_USER,
            to: email,
            subject: object,
            text: content,
            html: `<p>${content}</p>`
        };

        this.transporter.sendMail(message, (err, info) => {

            if (err) {
                console.error(err);
                console.log('Error occurred. ' + err.message);
                return process.exit(1);
            }

            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', Nodemailer.getTestMessageUrl(info));
        });
    }
};
