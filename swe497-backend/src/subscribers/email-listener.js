const events = require("events");
const eventEmitter = new events.EventEmitter();
const EmailService = require("../services/email-service");
const { COSTUMER_SERIVCE_EMAIL } = require("../util/constants");

eventEmitter.on("user_singup", async (recipientEmail, name) => {
  const title = `Welcome ${name}!`;

  const message =
    "We are delighted to have you with us, We hope you enjoy our serivce!";

  const senderEmail = COSTUMER_SERIVCE_EMAIL;

  await EmailService.sendEmail(senderEmail, recipientEmail, title, message);
});

module.exports = emailEvent = eventEmitter;
