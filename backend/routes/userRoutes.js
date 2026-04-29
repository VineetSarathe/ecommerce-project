const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const {
  getAddresses,
  addAddress,
  deleteAddress,
} = require("../controllers/userController");

router.get("/addresses", protect, getAddresses);
router.post("/addresses", protect, addAddress);
router.delete("/addresses/:id", protect, deleteAddress);

module.exports = router;