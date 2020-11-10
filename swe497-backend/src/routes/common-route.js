const express = require("express");
const commonController = require("../controllers/common-controller")

const router = express.Router();

// @route    GET api/v1/common/contact-us
// @desc     Send contact us message
// @access   Public
router.post("/contact-us", commonController.contactUs);

module.exports = router;