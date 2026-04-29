const crypto = require("crypto");
const Order = require("../models/Order");

module.exports = async (req, res) => {
  try {
    const secret = process.env.SHIPROCKET_WEBHOOK_SECRET;

    const signature = req.headers["x-shiprocket-signature"];

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(JSON.stringify(req.body))
      .digest("hex");

    if (signature !== expectedSignature) {
      return res.status(400).json({ message: "Invalid signature" });
    }

    const data = req.body;

    // 🔥 IMPORTANT: Find order by shipmentId
    const order = await Order.findOne({
      shipmentId: data.shipment_id,
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // ✅ Save tracking number when first received
    if (data.tracking_number) {
      order.trackingId = data.tracking_number;
    }

    const status = data.current_status;

    // ================= STATUS MAPPING =================

    if (status === "SHIPPED") {
      order.trackingStatus = "SHIPPED";
      order.orderStatus = "shipped";
    }

    if (status === "IN TRANSIT") {
      order.trackingStatus = "IN_TRANSIT";
    }

    if (status === "OUT FOR DELIVERY") {
      order.trackingStatus = "OUT_FOR_DELIVERY";
    }

    if (status === "DELIVERED") {
      order.trackingStatus = "DELIVERED";
      order.orderStatus = "delivered";
      order.deliveredAt = Date.now();
    }

    await order.save();

    res.status(200).json({ success: true });

  } catch (error) {
    console.error("Shiprocket Webhook Error:", error);
    res.status(500).json({ success: false });
  }
};