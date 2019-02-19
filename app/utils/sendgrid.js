const sgMail = require('@sendgrid/mail');
const config = require('../../config/config');

sgMail.setApiKey(config.sendGrid.api_key);

// Sending the mail to dev-ops@pfa.com from development@pfa.com
exports.sendMail = (subject, text, callback) => {
    sgMail.send({
        to: config.sendGrid.to,
        from: config.sendGrid.from,
        subject: subject,
        text: text
    }).then(() => {
        callback(null, 'sending done.')
    }).catch(error => {
        callback(error)
    });
}
