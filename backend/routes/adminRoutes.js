const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

// ✅ IMPORT CONTROLLERS
const { getDashboardStats, getAllUsers, updateUserRole, getMonthlyRevenue } = require("../controllers/adminController");


// Dashboard Stats
router.get("/stats", protect, adminOnly, getDashboardStats);

// Users
router.get("/users", protect, adminOnly, getAllUsers);

// ✅ Update User Role
router.put("/users/:id", protect, adminOnly, updateUserRole);

router.get("/monthly-revenue", protect, adminOnly, getMonthlyRevenue);

module.exports = router;