const User = require("../models/User");
const Product = require("../models/Product");
const asyncHandler = require("../middleware/asyncHandler");

// ✅ GET CART
exports.getCart = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate("cart.product");

  res.json({
    success: true,
    data: user.cart,
  });
});

// ✅ ADD TO CART
exports.addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity = 1, size = null, color = null } = req.body;

  const user = await User.findById(req.user._id);
  const product = await Product.findById(productId);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const existingItem = user.cart.find(
    (item) =>
      item.product.toString() === productId &&
      item.size === size &&
      item.color === color
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    user.cart.push({ product: productId, quantity, size, color });
  }

  await user.save();

  res.json({
    success: true,
    message: "Item added to cart",
    data: user.cart,
  });
});

// ✅ UPDATE CART ITEM
// exports.updateCartItem = asyncHandler(async (req, res) => {
//   const { productId, quantity, size = null, color = null } = req.body;

//   const user = await User.findById(req.user._id);

//   const item = user.cart.find(
//     (item) =>
//       item.product.toString() === productId &&
//       item.size === size &&
//       item.color === color
//   );

//   if (!item) {
//     res.status(404);
//     throw new Error("Cart item not found");
//   }

//   if (quantity <= 0) {
//     user.cart = user.cart.filter((i) => i !== item);
//   } else {
//     item.quantity = quantity;
//   }

//   await user.save();

//   res.json({
//     success: true,
//     message: "Cart updated",
//     data: user.cart,
//   });
// });

exports.updateCartItem = asyncHandler(async (req, res) => {
  const { productId, quantity, size = null, color = null } = req.body;

  const user = await User.findById(req.user._id);

  // ✅ Try exact variant match first
  let item = user.cart.find(
    (item) =>
      item.product.toString() === productId &&
      item.size === size &&
      item.color === color
  );

  // ⭐ FALLBACK: product match only (variant change case)
  if (!item) {
    item = user.cart.find(
      (item) => item.product.toString() === productId
    );

    if (item) {
      item.size = size;
      item.color = color;
    }
  }

  if (!item) {
    res.status(404);
    throw new Error("Cart item not found");
  }

  if (quantity <= 0) {
    user.cart = user.cart.filter((i) => i !== item);
  } else {
    item.quantity = quantity;
  }

  await user.save();

  res.json({
    success: true,
    message: "Cart updated",
    data: user.cart,
  });
});

// ✅ REMOVE ITEM
exports.removeCartItem = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { size = null, color = null } = req.body;

  const user = await User.findById(req.user._id);

  user.cart = user.cart.filter(
    (item) =>
      !(
        item.product.toString() === productId &&
        item.size === size &&
        item.color === color
      )
  );

  await user.save();

  res.json({
    success: true,
    message: "Variant removed",
    data: user.cart,
  });
});

// ✅ CLEAR CART
exports.clearCart = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  user.cart = [];
  await user.save();

  res.json({
    success: true,
    message: "Cart cleared",
  });
});