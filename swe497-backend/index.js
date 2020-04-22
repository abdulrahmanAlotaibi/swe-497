const express = require("express");
const email = require("./utilities/email");
const studentRoute = require("./routes/userRoutes/studentRoutes");
const tutorRoute = require("./routes/userRoutes/tutorRoutes");
const courseRoute = require("./routes/courseRoute");
const adminRoutes = require("./routes/adminRoute");
const stripeRoutes = require("./routes/stripe");
const Course = require("./model/course");
const searchUtil = require("./utilities/search");
const morgan = require("morgan");
const path = require("path");

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use("/public/imgs", express.static(path.join(__dirname, "public/imgs")));
app.use(
  "/public/videos",
  express.static(path.join(__dirname, "public/videos"))
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/student", studentRoute);
app.use("/tutor", tutorRoute);
app.use("/course", courseRoute);
app.use("/admin", adminRoutes);
app.use("/stripe", stripeRoutes);
app.get("/search", async (req, res) => {
  try {
    const { type, name } = req.query;
    const courses = await searchUtil.search(type, name);
    if (courses.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "No courses with this name"
      });
    }
    // if(course === "something went wrong") {
    //   return res.status(400).json({
    //     status: 'fail',
    //     message: "something went wrong"
    //   });
    // }
    res.status(200).json({
      status: "success",
      data: courses
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err
    });
  }
});
app.use("/contact-us", async (req, res) => {
  try {
    email({
      from: req.body.from,
      email: "asg1996@live.com", // This is admint email
      subject: req.body.subject,
      message: req.body.message
    });
    res.status(200).json({
      status: "success",
      message: "Mail was send"
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err
    });
  }
});

app.use('/', (req, res) => {
  res.json({status: 'success'})
})

module.exports = app;
