const Cart = require("../models/Cart");

exports.getCart = async (customerId, itemId) => {
  try {
    const updatedCart = await Cart.update(
      { customerId: customerId },
      {
        $push: {
          items: itemId,
        },
      }
    );
    if (!updatedCart) throw APIError.notFound();

    return updatedCart;
  } catch (err) {
    throw APIError.invalidInputs("Invalid student id");
  }
};

exports.addToCart = async (customerId, itemId) => {
  try {
    const updatedCart = await Cart.update(
      { customerId: customerId },
      {
        $push: {
          items: itemId,
        },
      }
    );
    if (!updatedCart) throw APIError.notFound();

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

    return updatedCart;
  } catch (err) {
    throw APIError.invalidInputs("Invalid student id");
  }
};
