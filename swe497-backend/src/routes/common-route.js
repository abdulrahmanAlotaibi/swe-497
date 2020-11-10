const express = require("express");
const commonController = require("../controllers/common-controller")

const router = express.Router();

// @route    GET api/v1/contact-us
// @desc     Send contact us message
// @access   Public
router.post("/contact-us", commonController.contactUs);