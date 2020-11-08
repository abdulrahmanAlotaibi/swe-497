const express = require("express");
const cartController = require("../controllers/cart-controller");

const router = express.Router();

// @route    POST api/v1/cart
// @desc     Add item to cart
// @access   Private
router.post("/cart/:id", cartController.addToCart);

// @route    GET api/v1/cart/:id
// @desc     Get the  cart
// @access   Private
router.get("/cart/:id", cartController.getCart);

// @route    POST api/v1/cart/:id
// @desc     Remove from user cart
// @access   Private
router.delete("/cart/:id", cartController.removeFromCart);

module.exports = router;
