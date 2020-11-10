const nodemailer = require("nodemailer");
const config = require("config");
const { COSTUMER_SERIVCE_EMAIL } = require("../util/constants");

exports.sendEmail = async (senderEmail, recipientEmail, title, message) => {
  const emailCredentials = config.get("email");
    console.log(emailCredentials)
  const transport = nodemailer.createTransport({
    host: emailCredentials.host,
    port: emailCredentials.port,
    auth: {
      user: emailCredentials.user,
      pass: emailCredentials.password,
    },
  });

  const emailMessage = {
    from: senderEmail, // Sender address
    to: recipientEmail, // List of recipients
    subject: title, // Subject line
    text: message, // Plain text body
  };

  transport.sendMail(emailMessage, function(err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

exports.contactUs = async (senderEmail, title, message) => {
  const recipientEmail = COSTUMER_SERIVCE_EMAIL;

  const email = await this.sendEmail(senderEmail, recipientEmail, title, message);

  return email;
};
