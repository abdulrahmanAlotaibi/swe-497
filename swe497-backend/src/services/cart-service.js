const Cart = require("../models/Cart");

const Course = require("../models/Course");

exports.getCart = async (customerId) => {
  try {
    const cart = await Cart.findById(customerId).populate("items");

    if (!cart) throw APIError.notFound();

    return cart;
  } catch (err) {
    throw APIError.invalidInputs("Invalid student id");
  }
};

exports.addToCart = async (customerId, itemId) => {
  try {
    const item = await Course.findById(itemId);
    const updatedCart = await Cart.update(
      { customerId: customerId },
      {
        $push: {
          items: itemId,
        },
      }
    );

    if (!updatedCart) throw APIError.notFound();

    updatedCart.total -= item.price;

    return updatedCart;
  } catch (err) {
    throw APIError.invalidInputs("Invalid student id");
  }
};

exports.removeFromCart = async (customerId, itemId) => {
  try {
    const updatedCart = await Cart.update(
      { customerId: customerId },
      {
        $pull: {
          items: itemId,
        },
      }
    );

    if (!updatedCart) throw APIError.notFound();

    updatedCart.total -= item.price;

    return updatedCart;
  } catch (err) {
    throw APIError.invalidInputs("Invalid student id");
  }
};
