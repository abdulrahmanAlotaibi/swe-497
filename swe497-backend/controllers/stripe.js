const Course = require("../model/course");
const Tutor = require("../model/tutor");
const Student = require("../model/student");
const stripe = require("stripe")("sk_test_YY2GYcqE6R2Son25MdpBQXf8002wF8YbGa");
const { uuid } = require("uuidv4");
const jwt = require("jsonwebtoken");

const signToken = id => {
  return jwt.sign({ id }, "secret", {
    expiresIn: "30d"
  });
};

exports.renewSubscribe = async (req, res) => {
  console.log("Request:", req.body);
  let error;
  let status;
  try {
    const { price, token } = req.body;
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    });
    const idempotency_key = uuid();
    const charge = await stripe.charges.create(
      {
        amount: price * 100,
        currency: "SAR",
        customer: customer.id,
        receipt_email: token.email,
        description: `Subscription`,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip
          }
        }
      },
      {
        idempotency_key
      }
    );
    const date = new Date();
    const tutor = await Tutor.findById(req.params.id);
    tutor.subscriptionExpiresIn =
      price === 200
        ? date.setDate(date.getDate() + 365)
        : date.setDate(date.getDate() + 30);

    await tutor.save({ validateBeforeSave: false });
    const tutorToken = signToken(tutor._id);
    res.status(200).json({
      status: "success",
      data: {
        tutor,
        token: tutorToken
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message
    });
  }
};

exports.getCheckoutSession = async (req, res) => {
  console.log("Request:", req.body);
  let error;
  let status;
  try {
    const { price, token, courses } = req.body;
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    });
    const idempotency_key = uuid();
    const charge = await stripe.charges.create(
      {
        amount: price * 100,
        currency: "SAR",
        customer: customer.id,
        receipt_email: token.email,
        description: `Purchased the courses`,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip
          }
        }
      },
      {
        idempotency_key
      }
    );
    const student = await Student.findById(req.user._id);
    const newCourses = [...student.courses];
    for (const course of courses) {
      newCourses.push(course._id);
    }
    student.courses = newCourses;
    student.cart = [];
    await student.save({ validateBeforeSave: false });
    console.log("Charge:", { charge });
    status = "success";
  } catch (error) {
    console.error("Error:", error);
    status = "failure";
  }

  res.json({ error, status });
};

exports.createCustomer = async (req, res) => {
  try {
    const token = req.body.token;
    if (!token) {
      res.status(400).json({
        status: "fail",
        message: "No token"
      });
    }
    stripe.customers.create(
      {
        source: token
      },
      function(err, customer) {
        if (err) {
          console.log(err);
        } else {
          res.status(200).json({
            status: "success",
            data: customer,
            customerId: customer.id
          });
        }
      }
    );
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message
    });
  }
};

exports.subscribe = async (req, res) => {
  // let { plan } = req.body;
  // plan = plan.toLowerCase();
  // plan = plan.trim();
  // const plans = ["monthly", "yearly"];
  // if (plans.indexOf(plan) === -1) {
  //   return res.status(400).json({
  //     status: "fail",
  //     message: "Invalid Plan"
  //   });
  // }
  // const customerId = "cus_H7tUt13e64opyO";
  // const subscription = stripe.subscriptions.create({
  //   customer: customerId,
  //   items: [{ plan }]
  // });
  // res.status(200).json({
  //   status: "success",
  //   message: "Done"
  // });
  console.log("Request:", req.body);
  let error;
  let status;
  try {
    const { price, token } = req.body;
    console.log(price, token);
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    });
    console.log(customer);
    const idempotency_key = uuid();
    const charge = await stripe.charges.create(
      {
        amount: price * 100,
        currency: "SAR",
        customer: customer.id,
        receipt_email: token.email,
        description: `Subscription`,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip
          }
        }
      },
      {
        idempotency_key
      }
    );
    console.log("🙋", "ddd");
    const date = new Date();
    const tutor = await Tutor.findById(req.user._id);
    tutor.subscriptionExpiresIn =
      price === 200
        ? date.setDate(date.getDate() + 365)
        : date.setDate(date.getDate() + 30);

    await tutor.save({ validateBeforeSave: false });
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

    res.status(200).json({
      status: "success",
      data: tutor
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message
    });
  }
};
