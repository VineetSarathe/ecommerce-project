const express = require("express");
const {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  updateTracking,
  shipOrder,
  createRazorpayOrder,
  verifyPayment,
  refundOrder,
  downloadInvoice,
  requestReturn,
  approveReturn,   
  confirmReturnAndRefund,
  rejectReturn,
  checkPincode,
} = require("../controllers/orderController");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");
const Order = require("../models/Order");

const router = express.Router();

// ================= USER =================
router.post("/", protect, placeOrder);
router.get("/my", protect, getMyOrders);

// Razorpay routes
router.post("/create-razorpay-order", protect, createRazorpayOrder);
router.post("/verify-payment", protect, verifyPayment);

// ================= ADMIN =================
router.get("/", protect, adminOnly, getAllOrders);
router.put("/:id", protect, adminOnly, updateOrderStatus);
router.put("/:id/tracking", protect, adminOnly, updateTracking);
router.put("/:id/ship", protect, adminOnly, shipOrder);
router.post("/:id/refund", protect, adminOnly, refundOrder);
router.put("/:id/approve-return", protect, adminOnly, approveReturn);
router.put("/:id/confirm-return", protect, adminOnly, confirmReturnAndRefund);
router.put("/:id/request-return", protect, requestReturn);
router.put("/:id/reject-return", protect, adminOnly, rejectReturn);

// ✅ INVOICE ROUTE (IMPORTANT: before /:id)
router.get("/:id/invoice", protect, downloadInvoice);

router.post("/check-pincode", protect, checkPincode);


// ================= GET SINGLE ORDER =================
router.get("/:id", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.status(200).json({
      success: true,
      data: order,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ================= USER CANCEL ORDER =================
router.put("/:id/cancel", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (order.paymentStatus === "paid") {
      return res.status(400).json({
        message: "Paid orders must go through refund process",
      });
    }

    if (order.orderStatus !== "placed") {
      return res.status(400).json({
        message: "Order cannot be cancelled",
      });
    }

    order.orderStatus = "cancelled";
    await order.save();

    res.json({ success: true, message: "Order cancelled" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;