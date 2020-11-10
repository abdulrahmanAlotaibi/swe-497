const events = require("events");
const eventEmitter = new events.EventEmitter();
const EmailService = require("../services/email-service");

eventEmitter.on(
  "user_singup",
  async (recipientEmail, name) => {
    const title = `Welcome ${name}!`;
    const message =
      "We are delighted to have you with us, We hope you enjoy our serivce!";

    await EmailService.sendEmail(recipientEmail, title, message);
  }
);

module.exports = emailEvent = eventEmitter;