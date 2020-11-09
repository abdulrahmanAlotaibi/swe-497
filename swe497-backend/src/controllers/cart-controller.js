const CartService = require("../services/cart-service");

exports.getCart = async (req, res) => {
  const cartId = req.params.id;

  const updatedCart = await CartService.getCart(cartId);

  res.status(200).json({
    status: "success",
    data: {
      updatedCart,
    },
  });
};

exports.addToCart = async (req, res) => {
  const cartId = req.params.id;

  const itemId = req.body.itemId;

  const updatedCart = await CartService.addToCart(cartId, itemId);

  res.status(200).json({
    status: "success",
    data: {
      updatedCart,
    },
  });
};

exports.removeFromCart = async (req, res) => {
  const cartId = req.params.id;

  const itemId = req.body.itemId;

  const updatedCart = await CartService.removeFromCart(cartId, itemId);

  res.status(200).json({
    status: "success",
    data: {
      updatedCart,
    },
  });
};
