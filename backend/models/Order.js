// const mongoose = require("mongoose");

// const orderSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//       index: true,
//     },

//     items: [
//       {
//         product: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "Product",
//           required: true,
//         },

//         name: { type: String, required: true },
//         price: { type: Number, required: true, min: 1 },

//         discountedPrice: { type: Number, default: null },
//         discountPercent: { type: Number, default: 0 },

//         quantity: { type: Number, required: true, min: 1 },
//         size: { type: String, default: null },
//         color: { type: String, default: null },
//       },
//     ],

//     shippingAddress: {
//       fullName: { type: String, required: true },
//       phone: { type: String, required: true },
//       address: { type: String, required: true },
//       city: { type: String, required: true },
//       state: { type: String, required: true },
//       pincode: { type: String, required: true },
//     },

//     totalAmount: { type: Number, required: true },

//     // ================= ORDER STATUS =================
//     orderStatus: {
//       type: String,
//       enum: ["placed", "shipped", "delivered", "cancelled"],
//       default: "placed",
//       index: true,
//     },

//     deliveredAt: { type: Date, default: null },

//     // ================= TRACKING =================
//     trackingId: { type: String, default: null },
//     courier: { type: String, default: null },
//     trackingStatus: { type: String, default: "pending" },

//     // ================= PAYMENT =================
//     razorpayOrderId: { type: String, default: null },
//     razorpayPaymentId: { type: String, default: null },
//     razorpaySignature: { type: String, default: null },

//     paidAt: { type: Date, default: null },

//     paymentMethod: { type: String, default: "Razorpay" },

//     paymentStatus: {
//       type: String,
//       enum: ["pending", "paid", "failed", "refunded"],
//       default: "pending",
//       index: true,
//     },

//     refundId: { type: String, default: null },
//     refundedAt: { type: Date, default: null },
//     refundAmount: { type: Number, default: 0 },
//     refundReason: { type: String, default: null },

//     paymentExpiresAt: {
//       type: Date,
//       default: function () {
//         return new Date(Date.now() + 10 * 60 * 1000); // 10 min payment window
//       },
//     },

//     // ================= RETURN SYSTEM =================
//     returnStatus: {
//       type: String,
//       enum: ["none", "requested", "approved", "rejected", "returned"],
//       default: "none",
//       index: true,
//     },

//     returnReason: { type: String, default: null },
//     returnRequestedAt: { type: Date, default: null },
//     returnedAt: { type: Date, default: null },
//   },
//   { timestamps: true }
// );

// // ================= PERFORMANCE INDEXES =================
// orderSchema.index({ createdAt: -1 });
// // orderSchema.index({ returnStatus: 1 });
// orderSchema.index({ user: 1, createdAt: -1 });

// module.exports = mongoose.model("Order", orderSchema);











const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },

        name: { type: String, required: true },
        price: { type: Number, required: true, min: 1 },

        discountedPrice: { type: Number, default: null },
        discountPercent: { type: Number, default: 0 },

        quantity: { type: Number, required: true, min: 1 },
        size: { type: String, default: null },
        color: { type: String, default: null },
      },
    ],

    shippingAddress: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
    },

    totalAmount: { type: Number, required: true },

    // ================= ORDER STATUS =================
    orderStatus: {
      type: String,
      enum: ["placed", "shipped", "delivered", "cancelled"],
      default: "placed",
      index: true,
    },

    deliveredAt: { type: Date, default: null },

    // ================= TRACKING =================
    trackingId: { type: String, default: null },
    courier: { type: String, default: null },
    trackingStatus: {
  type: String,
  enum: ["pending", "SHIPPED", "IN_TRANSIT", "OUT_FOR_DELIVERY", "DELIVERED", "RTO"],
  default: "pending",
},

// ================= RETURN TRACKING =================
returnTrackingStatus: {
  type: String,
  enum: ["pending", "SHIPPED", "IN_TRANSIT", "OUT_FOR_DELIVERY", "DELIVERED"],
  default: "pending",
},


    shipmentId: { type: String, default: null },

    // ================= PAYMENT =================
    razorpayOrderId: { type: String, default: null },
    razorpayPaymentId: { type: String, default: null },
    razorpaySignature: { type: String, default: null },

    paidAt: { type: Date, default: null },

    paymentMethod: { type: String, default: "Razorpay" },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
      index: true,
    },

    refundId: { type: String, default: null },
    refundedAt: { type: Date, default: null },
    refundAmount: { type: Number, default: 0 },
    refundReason: { type: String, default: null },
    returnTrackingId: { type: String, default: null },
    returnCourier: { type: String, default: null },

    paymentExpiresAt: {
      type: Date,
      default: function () {
        return new Date(Date.now() + 10 * 60 * 1000); // 10 min payment window
      },
    },

    // ================= RETURN SYSTEM =================
    returnStatus: {
      type: String,
      enum: ["none", "requested", "approved", "rejected", "returned"],
      default: "none",
      index: true,
    },

    returnReason: { type: String, default: null },
    returnRequestedAt: { type: Date, default: null },
    returnedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

// ================= PERFORMANCE INDEXES =================
orderSchema.index({ createdAt: -1 });
// orderSchema.index({ returnStatus: 1 });
orderSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model("Order", orderSchema);

