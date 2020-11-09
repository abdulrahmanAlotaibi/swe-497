const Cart = require("../models/Cart");
const Course = require("../models/Course");
const { APIError } = require("../middlewares/error-handler");

exports.getCart = async (customerId) => {
  try {
    const cart = await Cart.findById(customerId).populate("items");

    if (!cart) throw APIError.notFound();

    return cart;
  } catch (err) {
    throw APIError.invalidInputs("Invalid student id");
  }
};

exports.addToCart = async (cartId, itemId) => {
  const item = await Course.findById(itemId);

  if (!item) throw APIError.notFound();

  const cart = await Cart.findById(cartId).exec();

  if (!cart) throw APIError.notFound();

  for (const item of cart.items) {
    if (item == itemId) {
      throw APIError.alreadyExsist();
    }
  }

  cart.items = [...cart.items, itemId];

  cart.total += item.price;
  
  await cart.save();

  return cart;
};

exports.removeFromCart = async (cartId, itemId) => {
  const item = await Course.findById(itemId);

  if (!item) throw APIError.notFound();

  const cart = await Cart.findById(cartId).exec();

  if (!cart) throw APIError.notFound();

  cart.items = cart.items.filter((item) => item != itemId);

  cart.total -= item.price;

  await cart.save();

  return cart;
};
