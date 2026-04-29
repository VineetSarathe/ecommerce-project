const Product = require("../models/Product");
const Order = require("../models/Order");
const User = require("../models/User");



// ================= DASHBOARD STATS =================
exports.getDashboardStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments({ isActive: true });
    const totalOrders = await Order.countDocuments();

    // ✅ Revenue (only paid & not cancelled)
    const revenueData = await Order.aggregate([
      {
        $match: {
          paymentStatus: "paid",
          orderStatus: { $ne: "cancelled" },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" },
        },
      },
    ]);

    const totalRevenue = revenueData[0]?.totalRevenue || 0;

    // ✅ Extra Stats
    const paidOrders = await Order.countDocuments({
      paymentStatus: "paid",
    });

    const deliveredOrders = await Order.countDocuments({
      orderStatus: "delivered",
    });

    const cancelledOrders = await Order.countDocuments({
      orderStatus: "cancelled",
    });

    const refundedOrders = await Order.countDocuments({
      paymentStatus: "refunded",
    });

    const returnRequested = await Order.countDocuments({ returnStatus: "requested" });
const returnApproved = await Order.countDocuments({ returnStatus: "approved" });
const returnRejected = await Order.countDocuments({ returnStatus: "rejected" });

const totalRefundAmount = await Order.aggregate([
  { $match: { paymentStatus: "refunded" } },
  { $group: { _id: null, total: { $sum: "$refundAmount" } } }
]);


const returnRate = totalOrders > 0
  ? ((returnRequested + returnApproved + returnRejected) / totalOrders) * 100
  : 0;

    res.json({
      success: true,
      data: {
        totalProducts,
        totalOrders,
        totalRevenue,
        paidOrders,
        deliveredOrders,
        cancelledOrders,
        refundedOrders,
        // ✅ NEW
    returnRequested,
    returnApproved,
    returnRejected,
    totalRefundAmount: totalRefundAmount[0]?.total || 0,
    returnRate,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= MONTHLY REVENUE =================
exports.getMonthlyRevenue = async (req, res) => {
  try {
    const revenue = await Order.aggregate([
      {
        $match: {
          paymentStatus: "paid",
          orderStatus: { $ne: "cancelled" },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          total: { $sum: "$totalAmount" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    res.json({
      success: true,
      data: revenue,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET ALL USERS =================
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json({
      success: true,
      data: users,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= UPDATE USER ROLE =================
exports.updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role",
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.role = role;
    await user.save();

    res.json({
      success: true,
      message: "User role updated",
      data: user,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

