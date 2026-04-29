const express = require("express");
const router = express.Router();

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");
const upload = require("../middleware/uploadMiddleware");

// ================= PUBLIC =================
router.get("/", getAllProducts);
router.get("/:id", getProductById);

// ================= ADMIN =================

// ✅ Create product (multi image upload supported)
router.post(
  "/",
  protect,
  adminOnly,
  upload.array("images", 5),   // ✅ UPDATED
  createProduct
);

// ✅ Update (multi image upload supported)
router.put(
  "/:id",
  protect,
  adminOnly,
  upload.array("images", 5),   // ✅ UPDATED
  updateProduct
);

// ✅ Delete
router.delete("/:id", protect, adminOnly, deleteProduct);

module.exports = router;
