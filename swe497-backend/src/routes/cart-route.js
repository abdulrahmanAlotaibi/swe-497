const express = require("express");
const cartController = require("../controllers/cart-controller");
const validationChecker = require("../middlewares/validationChecker");
const { catchErrors } = require("../middlewares/error-handler");
const validator = require("../middlewares/validator");
const auth = require("../middlewares/auth");
const permission = require("../middlewares/permissions");

const router = express.Router();

// @route    GET api/v1/cart/:id
// @desc     Get the  cart
// @access   Private
router.get(
  "/:id",
  auth,
  permission("cart", "read:own"),
  catchErrors(cartController.getCart)
);

// @route    POST api/v1/cart
// @desc     Add item to cart
// @access   Private
router.post(
  "/:id/items",
  auth,
  permission("cart", "update:own"),
  catchErrors(cartController.addToCart)
);

// @route    POST api/v1/cart/:id
// @desc     Remove from cart
// @access   Private
router.delete(
  "/:id/items/:itemId",
  auth,
  permission("cart", "update:own"),
  catchErrors(cartController.removeFromCart)
);

module.exports = router;
