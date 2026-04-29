const Product = require("../models/Product");
const asyncHandler = require("../middleware/asyncHandler");

// ================= CREATE PRODUCT =================
const createProduct = asyncHandler(async (req, res) => {
  const { name, price, stock, discountPercent = 0 } = req.body;

  if (!name || price == null || stock == null) {
    res.status(400);
    throw new Error("Name, price, stock required");
  }

  if (discountPercent < 0 || discountPercent > 90) {
    res.status(400);
    throw new Error("Invalid discount percent");
  }

  let images = [];

  if (req.files && req.files.length > 0) {
    req.files.forEach((file) => {
      images.push(`/uploads/${file.filename}`);
    });
  }

  if (req.body.images && typeof req.body.images === "string") {
    if (req.body.images.trim() !== "") {
      images.push(req.body.images.trim());
    }
  }

  // ✅ DISCOUNT CALCULATION
  const discountedPrice =
    discountPercent > 0
      ? price - (price * discountPercent) / 100
      : price;

  const product = await Product.create({
    ...req.body,
    discountPercent,
    discountedPrice,
    images,
  });

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: product,
  });
});

// ================= GET ALL PRODUCTS =================
const getAllProducts = asyncHandler(async (req, res) => {
  // const products = await Product.find({ isActive: true });
  const products = await Product.find({ isActive: true })
  .sort({ createdAt: -1 });   // ✅ NEWEST FIRST

  res.status(200).json({
    success: true,
    data: products,
  });
});

// ================= GET PRODUCT BY ID =================
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product || !product.isActive) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.status(200).json({
    success: true,
    data: product,
  });
});

// ================= UPDATE PRODUCT =================
const updateProduct = asyncHandler(async (req, res) => {
  const existing = await Product.findById(req.params.id);

  if (!existing) {
    res.status(404);
    throw new Error("Product not found");
  }

  let images = existing.images || [];

  if (req.files && req.files.length > 0) {
    images = req.files.map((file) => `/uploads/${file.filename}`);
  }

  const price = req.body.price ?? existing.price;
  const discountPercent =
    req.body.discountPercent ?? existing.discountPercent ?? 0;

  if (discountPercent < 0 || discountPercent > 90) {
    res.status(400);
    throw new Error("Invalid discount percent");
  }

  // ✅ RECALCULATE
  const discountedPrice =
    discountPercent > 0
      ? price - (price * discountPercent) / 100
      : price;

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
      discountPercent,
      discountedPrice,
      images,
    },
    { new: true }
  );

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    data: product,
  });
});

// ================= DELETE PRODUCT =================
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    { isActive: false },
    { new: true }
  );

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};