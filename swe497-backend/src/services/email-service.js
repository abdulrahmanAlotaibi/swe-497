const nodemailer = require("nodemailer");

exports.sendEmail = async (recipientEmail, title, message) => {
  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "7840cb0e94669e",
      pass: "385b771c8ab280",
    },
  });

  const emailMessage = {
    from: "costumer-service@swe497.com", // Sender address
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

// TODO: html template
