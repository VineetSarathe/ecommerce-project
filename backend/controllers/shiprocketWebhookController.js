const crypto = require("crypto");
const Order = require("../models/Order");

module.exports = async (req, res) => {
  try {
    const secret = process.env.SHIPROCKET_WEBHOOK_SECRET;

    // 🔐 Signature Verification
    const signature = req.headers["x-shiprocket-signature"];

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(JSON.stringify(req.body))
      .digest("hex");

    if (signature !== expectedSignature) {
      return res.status(400).json({ message: "Invalid signature" });
    }

    const data = req.body;

    // const order = await Order.findOne({
    //   trackingId: data.tracking_number,
    // });

    let order = await Order.findOne({
  trackingId: data.tracking_number,
});

let isReturn = false;

if (!order) {
  order = await Order.findOne({
    returnTrackingId: data.tracking_number,
  });

  if (order) {
    isReturn = true;
  }
}

if (!order) {
  return res.status(404).json({ message: "Order not found" });
}

    



const status = data.current_status?.toUpperCase().replaceAll(" ", "_");

if (!isReturn) {

  if (status === "SHIPPED") {
    order.trackingStatus = "SHIPPED";
    order.orderStatus = "shipped";
  }

  if (status === "IN_TRANSIT") {
    order.trackingStatus = "IN_TRANSIT";
  }

  if (status === "OUT_FOR_DELIVERY") {
    order.trackingStatus = "OUT_FOR_DELIVERY";
  }

  if (status === "DELIVERED") {
    order.trackingStatus = "DELIVERED";
    order.orderStatus = "delivered";
    order.deliveredAt = Date.now();
  }

  if (status === "RTO_INITIATED") {
    order.trackingStatus = "RTO";
  }

  if (status === "RTO_DELIVERED") {
    order.trackingStatus = "RTO";
    order.orderStatus = "cancelled";
  }

} else {

  if (status === "SHIPPED") {
    order.returnTrackingStatus = "SHIPPED";
  }

  if (status === "IN_TRANSIT") {
    order.returnTrackingStatus = "IN_TRANSIT";
  }

  if (status === "OUT_FOR_DELIVERY") {
    order.returnTrackingStatus = "OUT_FOR_DELIVERY";
  }

//   if (status === "DELIVERED") {
//     order.returnTrackingStatus = "DELIVERED";
//   }

const order = await Order.findById(req.params.id);

if (!order) {
  res.status(404);
  throw new Error("Order not found");
}

if (order.returnTrackingStatus !== "DELIVERED") {
  throw new Error("Return not delivered yet");
}

}

    await order.save();

    res.status(200).json({ success: true });

  } catch (error) {
    console.error("Shiprocket Webhook Error:", error);
    res.status(500).json({ success: false });
  }
};