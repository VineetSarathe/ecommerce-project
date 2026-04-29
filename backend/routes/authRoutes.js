const express = require("express");
const { register, login } = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");   // ✅ ADD THIS

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// ✅ GET LOGGED-IN USER
router.get("/me", protect, (req, res) => {
  res.json(req.user);
});

module.exports = router;
