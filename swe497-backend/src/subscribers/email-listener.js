const nodemailer = require('nodemailer');

module.exports = async options => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 25,
    auth: {
      user: '847e42f13113a1',
      pass: '0c1b3808febe08'
    }
  });

  transporter.sendMail({
    from: options.from,
    to: options.email,
    subject: options.subject,
    text: options.message
  });
};
