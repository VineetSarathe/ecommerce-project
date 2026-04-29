const Order = require("../models/Order");
const Product = require("../models/Product");
const DeliveryState = require("../models/DeliveryState"); // ✅ NEW
const asyncHandler = require("../middleware/asyncHandler");
const razorpay = require("../config/razorpay");
const crypto = require("crypto");
const { checkServiceability } = require("../utils/shiprocketService");
const { createShipment } = require("../utils/shiprocketService");
const PDFDocument = require("pdfkit");




// ================= PLACE ORDER =================
exports.placeOrder = asyncHandler(async (req, res) => {
  const { items, shippingAddress, totalAmount } = req.body;

  if (!items || items.length === 0) {
    res.status(400);
    throw new Error("No order items");
  }

  if (!shippingAddress?.address || !shippingAddress?.phone) {
    res.status(400);
    throw new Error("Shipping details incomplete");
  }

  if (!shippingAddress?.pincode) {
    res.status(400);
    throw new Error("Pincode is required");
  }

  // ================= SHIPROCKET PINCODE CHECK =================
  if (process.env.DEV_SHIPROCKET !== "true") {

    const isServiceable = await checkServiceability(
      shippingAddress.pincode
    );

    if (!isServiceable) {
      res.status(400);
      throw new Error("Delivery not available at this pincode");
    }
  }

  // ✅ NORMALIZE STATE
  shippingAddress.state = shippingAddress.state?.trim();

  if (!shippingAddress?.state) {
    res.status(400);
    throw new Error("State is required for delivery");
  }

  const activeStates = await DeliveryState.find({ isActive: true });

  const isDeliverable = activeStates.some(
    (s) => s.name.toLowerCase() === shippingAddress.state.toLowerCase()
  );

  if (!isDeliverable) {
    res.status(400);
    throw new Error("Delivery not available in selected state");
  }

  if (totalAmount <= 0) {
    res.status(400);
    throw new Error("Invalid total amount");
  }

  // 🔥 VALIDATION (UNCHANGED)
  for (const item of items) {
    if (!item.product) {
      res.status(400);
      throw new Error("Product ID missing in items");
    }

    if (item.quantity <= 0) {
      res.status(400);
      throw new Error(`Invalid quantity for ${item.name}`);
    }

    if (item.price < 0) {
      res.status(400);
      throw new Error(`Invalid price for ${item.name}`);
    }

    const product = await Product.findById(item.product);

    if (!product) {
      res.status(404);
      throw new Error(`Product not found: ${item.name}`);
    }

    if (!product.isActive) {
      res.status(400);
      throw new Error(`${product.name} is unavailable`);
    }

    if (product.stock < item.quantity) {
      res.status(400);
      throw new Error(`Insufficient stock for ${product.name}`);
    }

    // ✅ SIZE VALIDATION
    if (item.size && product.sizes?.length > 0) {
      if (!product.sizes.includes(item.size)) {
        res.status(400);
        throw new Error(`Invalid size for ${product.name}`);
      }
    }

    // ✅ COLOR VALIDATION
    if (item.color && product.colors?.length > 0) {
      if (!product.colors.includes(item.color)) {
        res.status(400);
        throw new Error(`Invalid color for ${product.name}`);
      }
    }
  }

  // ✅ STOCK DEDUCTION (UNCHANGED)
  for (const item of items) {
    const product = await Product.findById(item.product);
    product.stock -= item.quantity;
    await product.save();
  }

  // ================= 🔥 DISCOUNT + SAFE PRICING =================
  let finalTotal = 0;
  const validatedItems = [];

  for (const item of items) {
    const product = await Product.findById(item.product);

    const discountPercent = product.discountPercent || 0;

    const discountedPrice =
      discountPercent > 0
        ? product.price - (product.price * discountPercent) / 100
        : product.price;

    finalTotal += discountedPrice * item.quantity;

    validatedItems.push({
      product: product._id,
      name: product.name,
      price: product.price,
      discountedPrice: discountPercent > 0 ? discountedPrice : null,
      discountPercent,
      quantity: item.quantity,
      size: item.size || null,
      color: item.color || null,
    });
  }

  // ✅ CREATE ORDER (UPDATED)
  const order = await Order.create({
    user: req.user._id,
    items: validatedItems,     // ✅ SAFE ITEMS
    shippingAddress,
    totalAmount: finalTotal,   // ✅ BACKEND CALCULATED
  });

  res.status(201).json({
    success: true,
    message: "Order placed successfully",
    data: order,
  });
});


// ================= CREATE RAZORPAY ORDER =================
exports.createRazorpayOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.body;

  const order = await Order.findById(orderId);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  const options = {
    amount: order.totalAmount * 100,
    currency: "INR",
    receipt: order._id.toString(),
  };

  const razorpayOrder = await razorpay.orders.create(options);

  order.razorpayOrderId = razorpayOrder.id;
  await order.save();

  res.status(200).json({
    success: true,
    data: razorpayOrder,
  });
});


// ================= VERIFY PAYMENT =================
exports.verifyPayment = asyncHandler(async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    orderId,
  } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    res.status(400);
    throw new Error("Invalid payment signature");
  }

  const order = await Order.findById(orderId);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  order.paymentStatus = "paid";
  order.razorpayOrderId = razorpay_order_id;
  order.razorpayPaymentId = razorpay_payment_id;
  order.razorpaySignature = razorpay_signature;
  order.paidAt = Date.now();

  await order.save();

  const { createShipment } = require("../utils/shiprocketService");

const shipment = await createShipment(order);

order.shipmentId = shipment.shipmentId;
order.trackingId = shipment.trackingId;
order.courier = shipment.courier;
order.trackingStatus = "SHIPPED";
order.orderStatus = "shipped";

await order.save();

  res.status(200).json({
    success: true,
    message: "Payment verified successfully",
  });
});


// ================= USER – MY ORDERS =================
exports.getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({
    createdAt: -1,
  });

  res.status(200).json({
    success: true,
    data: orders,
  });
});


// ================= ADMIN – ALL ORDERS =================
exports.getAllOrders = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    let filter = {};

    if (startDate && endDate) {
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);

      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);

      filter.createdAt = { $gte: start, $lte: end };
    }

    const orders = await Order.find(filter)
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: orders,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================= UPDATE ORDER STATUS =================
exports.updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const allowedStatus = ["placed", "shipped", "delivered", "cancelled"];

  if (!allowedStatus.includes(status)) {
    res.status(400);
    throw new Error("Invalid order status");
  }

  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  if (status === "cancelled" && order.paymentStatus === "paid") {
  throw new Error("Use refund system to cancel paid orders");
  }

  if (order.orderStatus === "delivered") {
    res.status(400);
    throw new Error("Delivered order cannot be updated");
  }

  // ✅ STOCK RESTORE WHEN CANCELLED
  if (status === "cancelled" && order.orderStatus !== "cancelled") {
    for (const item of order.items) {
      const product = await Product.findById(item.product);
      if (product) {
        product.stock += item.quantity;
        await product.save();
      }
    }
  }

  if (status === "delivered") {
  order.deliveredAt = Date.now();
}

order.orderStatus = status;
await order.save();

  res.status(200).json({
    success: true,
    message: "Order status updated",
    data: order,
  });
});


// ================= UPDATE TRACKING =================
exports.updateTracking = asyncHandler(async (req, res) => {
  const { trackingId, courier, trackingStatus } = req.body;

  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  order.trackingId = trackingId || order.trackingId;
  order.courier = courier || order.courier;
  order.trackingStatus = trackingStatus || order.trackingStatus;

  if (trackingId) {
    order.orderStatus = "shipped";
  }

  await order.save();

  res.json({
    success: true,
    message: "Tracking updated",
    data: order,
  });
});


exports.shipOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  if (order.orderStatus !== "placed") {
    res.status(400);
    throw new Error("Order already processed");
  }

  const shipment = await createShipment(order);

  // order.orderStatus = "shipped";
  // order.trackingId = shipment.trackingId;
  // order.courier = shipment.courier;
  // order.trackingStatus = "shipped";

order.shipmentId = shipment.shipmentId;
order.trackingId = shipment.trackingId;
order.courier = shipment.courier;
order.trackingStatus = "SHIPPED";
order.orderStatus = "shipped";

// order.shipmentId = shipment.shipmentId;
// order.trackingStatus = "PENDING";
// order.orderStatus = "placed";

  await order.save();

  res.json({
    success: true,
    message: "Order shipped successfully",
    data: order,
  });
});


// ================= ADMIN – REFUND ORDER =================
exports.refundOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  // Only paid orders can be refunded
  if (order.paymentStatus !== "paid") {
    res.status(400);
    throw new Error("Only paid orders can be refunded");
  }

  // Do not allow refund of delivered orders (production safety)
  if (order.orderStatus === "delivered") {
    res.status(400);
    throw new Error("Delivered orders cannot be refunded directly");
  }

  // 🔥 Razorpay Refund API
  const refund = await razorpay.payments.refund(
    order.razorpayPaymentId,
    {
      amount: order.totalAmount * 100, // in paise
    }
  );

  // ✅ Update order
  order.paymentStatus = "refunded";
  order.refundId = refund.id;
  order.refundedAt = Date.now();
  order.refundAmount = order.totalAmount;
  order.orderStatus = "cancelled";

  // ✅ Restore stock
  for (const item of order.items) {
    const product = await Product.findById(item.product);
    if (product) {
      product.stock += item.quantity;
      await product.save();
    }
  }

  await order.save();

  res.status(200).json({
    success: true,
    message: "Order refunded successfully",
    data: order,
  });
});


exports.downloadInvoice = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.paymentStatus !== "paid") {
      return res.status(400).json({ message: "Invoice available only for paid orders" });
    }

    const doc = new PDFDocument({ margin: 50 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=invoice-${order._id}.pdf`
    );

    doc.pipe(res);

    // ================= HEADER =================
    doc
      .fontSize(20)
      .text("ORDER INVOICE", { align: "center" })
      .moveDown();

    doc.fontSize(12);
    doc.text(`Invoice ID: INV-${order._id}`);
    doc.text(`Order ID: ${order._id}`);
    doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`);
    doc.moveDown();

    // ================= COMPANY INFO =================
    doc.text("Seller:");
    doc.text("Girls Clothing Store");
    doc.text("India");
    doc.moveDown();

    // ================= CUSTOMER INFO =================
    doc.text("Bill To:");
    doc.text(order.shippingAddress.fullName);
    doc.text(order.shippingAddress.address);
    doc.text(
      `${order.shippingAddress.city}, ${order.shippingAddress.state}`
    );
    doc.text(order.shippingAddress.pincode);
    doc.text(`Phone: ${order.shippingAddress.phone}`);
    doc.moveDown();

    // ================= ITEMS =================
    doc.moveDown();
    doc.text("Items:", { underline: true });
    doc.moveDown();

    order.items.forEach((item) => {
      const price =
        item.discountPercent > 0 && item.discountedPrice
          ? item.discountedPrice
          : item.price;

      doc.text(
        `${item.name}  |  Qty: ${item.quantity}  |  ₹${price}  |  ₹${
          price * item.quantity
        }`
      );
    });

    doc.moveDown();

    // ================= TOTAL =================
    doc
      .fontSize(14)
      .text(`Total Paid: ₹${order.totalAmount}`, { align: "right" });

    doc.moveDown();
    doc.fontSize(10);
    doc.text(
      "This is a system generated invoice and does not require signature.",
      { align: "center" }
    );

    doc.end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ================= USER – REQUEST RETURN =================
exports.requestReturn = asyncHandler(async (req, res) => {
  const { reason } = req.body;

  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  if (order.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized");
  }

  if (order.orderStatus !== "delivered") {
    res.status(400);
    throw new Error("Return allowed only after delivery");
  }

  // 🔥 7 DAY WINDOW CHECK
  if (!order.deliveredAt) {
  res.status(400);
  throw new Error("Delivery date not found");
}

const deliveryDate = new Date(order.deliveredAt);
const now = new Date();
const diffDays = (now - deliveryDate) / (1000 * 60 * 60 * 24);

if (diffDays > 7) {
  res.status(400);
  throw new Error("Return window expired (7 days only)");
}

  if (order.returnStatus !== "none") {
    res.status(400);
    throw new Error("Return already requested");
  }

  order.returnRequested = true;
  order.returnReason = reason;
  order.returnStatus = "requested";
  order.returnRequestedAt = Date.now();

  await order.save();

  res.json({
    success: true,
    message: "Return request submitted",
    data: order,
  });
});



// ================= ADMIN – APPROVE RETURN =================
exports.approveReturn = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  if (order.returnStatus !== "requested") {
    res.status(400);
    throw new Error("No return request found");
  }

  // order.returnStatus = "approved";
  // await order.save();
  const { createReturnShipment } = require("../utils/shiprocketService");

// const returnShipment = await createReturnShipment(order);
let returnShipment;

try {
  returnShipment = await createReturnShipment(order);
} catch (error) {
  throw new Error("Return shipment creation failed");
}

order.returnTrackingId = returnShipment.trackingId;
order.returnCourier = returnShipment.courier;
order.returnStatus = "approved";

await order.save();

  res.json({
    success: true,
    message: "Return approved",
  });
});


// ================= ADMIN – CONFIRM RETURN & REFUND =================
exports.confirmReturnAndRefund = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

//   if (order.trackingStatus !== "DELIVERED") {
//   throw new Error("Return not delivered yet");
// }

if (order.returnTrackingStatus !== "DELIVERED") {
  throw new Error("Return not delivered yet");
}

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  if (order.returnStatus !== "approved") {
    res.status(400);
    throw new Error("Return not approved yet");
  }

  if (order.paymentStatus !== "paid") {
    res.status(400);
    throw new Error("Only paid orders can be refunded");
  }

  // 🔥 DOUBLE REFUND PROTECTION
  if (order.paymentStatus === "refunded") {
    res.status(400);
    throw new Error("Already refunded");
  }

  const refund = await razorpay.payments.refund(
    order.razorpayPaymentId,
    {
      amount: order.totalAmount * 100,
    }
  );

  order.paymentStatus = "refunded";
  order.refundId = refund.id;
  order.refundedAt = Date.now();
  order.refundAmount = order.totalAmount;

  order.returnStatus = "returned";
  order.returnedAt = Date.now();
  order.orderStatus = "cancelled";

  for (const item of order.items) {
    const product = await Product.findById(item.product);
    if (product) {
      product.stock += item.quantity;
      await product.save();
    }
  }

  await order.save();

  res.status(200).json({
    success: true,
    message: "Return completed & refund issued",
  });
});


exports.rejectReturn = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  if (order.returnStatus !== "requested") {
    res.status(400);
    throw new Error("No return request to reject");
  }

  order.returnStatus = "rejected";

  await order.save();

  res.json({
    success: true,
    message: "Return rejected",
  });
});


// ================= CHECK PINCODE =================
exports.checkPincode = asyncHandler(async (req, res) => {
  const { pincode } = req.body;

  if (!pincode || pincode.length !== 6) {
    res.status(400);
    throw new Error("Invalid pincode");
  }

  // if (process.env.DEV_SHIPROCKET === "true") {
  //   return res.json({ success: true, serviceable: true });
  // }

  if (process.env.DEV_SHIPROCKET === "true") {

  // Basic Indian pincode validation
  const validIndianPin = /^[1-9][0-9]{5}$/;

  if (!validIndianPin.test(pincode)) {
    return res.json({
      success: true,
      serviceable: false,
    });
  }

  // Optional: block obviously fake pins
  if (pincode === "999999" || pincode === "000000") {
    return res.json({
      success: true,
      serviceable: false,
    });
  }

  return res.json({
    success: true,
    serviceable: true,
  });
}

  const isServiceable = await checkServiceability(pincode);

  res.json({
    success: true,
    serviceable: isServiceable,
  });
});