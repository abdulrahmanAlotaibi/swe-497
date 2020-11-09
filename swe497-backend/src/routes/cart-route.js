const express = require("express");
const cartController = require("../controllers/cart-controller");

const router = express.Router();

// @route    GET api/v1/cart/:id
// @desc     Get the  cart
// @access   Private
router.get("/carts/:id", cartController.getCart);

// @route    POST api/v1/cart
// @desc     Add item to cart
// @access   Private
router.post("/carts/:cartId/items", cartController.addToCart);

// @route    POST api/v1/cart/:id
// @desc     Remove from cart
// @access   Private
router.delete("/carts/items/:id", cartController.removeFromCart);

module.exports = router;
