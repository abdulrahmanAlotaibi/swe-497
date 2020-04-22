const express = require("express");
const authController = require("../controllers/auth");
const courseController = require("../controllers/course");
const studentController = require("../controllers/student");
const tutorController = require("../controllers/tutor");
const stripeController = require("../controllers/stripe");

const stripeRouter = express.Router();

// stripeRouter
//   .route("/api/customer/create")
//   .post(stripeController.createCustomer);

stripeRouter
  .route("/api/customer/subscribe")
  .post(authController.protect("tutor"), stripeController.subscribe);

stripeRouter
  .route("/api/customer/renew-subscribe/:id")
  .post(stripeController.renewSubscribe);

stripeRouter
  .route("/api/checkout-session")
  .post(authController.protect("student"), stripeController.getCheckoutSession);

module.exports = stripeRouter;
