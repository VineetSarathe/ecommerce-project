const express = require("express");
const router = express.Router();

const {
  getActiveStates,
  addState,
  toggleState,
  deleteState,
} = require("../controllers/deliveryStateController");

// ✅ FIX → No destructuring
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

router.get("/", getActiveStates);
router.post("/", protect, adminOnly, addState);
router.put("/:id", protect, adminOnly, toggleState);
router.delete("/:id", protect, adminOnly, deleteState);

module.exports = router;