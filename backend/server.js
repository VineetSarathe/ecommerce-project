// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const connectDB = require("./config/db");

// const helmet = require("helmet");
// const rateLimit = require("express-rate-limit");

// const errorHandler = require("./middleware/errorMiddleware");

// const deliveryStateRoutes = require("./routes/deliveryStateRoutes");
// const { loginShiprocket } = require("./config/shiprocket");

// const userRoutes = require("./routes/userRoutes");

// const Order = require("./models/Order");
// const Product = require("./models/Product");


// require("dotenv").config();

// dotenv.config();
// connectDB();
// loginShiprocket();

// const app = express();

// const autoCancelUnpaidOrders = async () => {
//   try {
//     const expiredOrders = await Order.find({
//       paymentStatus: "pending",
//       orderStatus: "placed",
//       expiresAt: { $lte: new Date() },
//     });

//     for (const order of expiredOrders) {
//       // 🔄 Restore stock
//       for (const item of order.items) {
//         const product = await Product.findById(item.product);
//         if (product) {
//           product.stock += item.quantity;
//           await product.save();
//         }
//       }

//       order.orderStatus = "cancelled";
//       order.paymentStatus = "failed";
//       await order.save();

//       console.log(`⏰ Order auto-cancelled: ${order._id}`);
//     }

//   } catch (error) {
//     console.error("Auto cancel error:", error);
//   }
// };

// // ✅ Basic Middlewares
// // app.use(cors());

// // ✅ ADD THIS
// const allowedOrigins = [
//   process.env.FRONTEND_URL,
//   "http://localhost:5173",
// ];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//   })
// );

// // ✅ RAZORPAY WEBHOOK (RAW BODY REQUIRED)
// app.post(
//   "/api/orders/webhook",
//   express.raw({ type: "application/json" }),
//   require("./controllers/orderWebhookController")
// );

// app.use(express.json());

// // ✅ Helmet
// app.use(
//   helmet({
//     crossOriginResourcePolicy: false,
//   })
// );

// // ✅ Static पहले (GOOD)
// app.use("/uploads", express.static("uploads"));

// // ✅ Limiters
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 1000,
//   standardHeaders: true,
//   legacyHeaders: false,
// });

// const loginLimiter = rateLimit({
//   windowMs: 60 * 1000,
//   max: 7,
//   message: {
//     success: false,
//     message: "Too many login attempts. Try again later.",
//   },
// });

// const statsLimiter = rateLimit({
//   windowMs: 60 * 1000,
//   max: 120,
// });

// app.use(limiter);
// app.use("/api/auth/login", loginLimiter);
// app.use("/api/admin/stats", statsLimiter);

// app.use("/api/users", userRoutes);

// // ✅ Routes
// app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api/products", require("./routes/productRoutes"));
// app.use("/api/orders", require("./routes/orderRoutes"));
// app.use("/api/cart", require("./routes/cartRoutes"));
// app.use("/api/admin", require("./routes/adminRoutes"));
// app.use("/api/delivery-states", deliveryStateRoutes);

// // ✅ 404
// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     message: "Route not found",
//   });
// });

// // ✅ Error Handler
// app.use(errorHandler);

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });


// setInterval(autoCancelUnpaidOrders, 60 * 1000); // every 1 min
















// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const connectDB = require("./config/db");

// const helmet = require("helmet");
// const rateLimit = require("express-rate-limit");

// const errorHandler = require("./middleware/errorMiddleware");

// const deliveryStateRoutes = require("./routes/deliveryStateRoutes");
// const userRoutes = require("./routes/userRoutes");

// const Order = require("./models/Order");
// const Product = require("./models/Product");

// const webhookRoutes = require("./routes/webhookRoutes");

// dotenv.config();
// connectDB();

// const app = express();

// /* =====================================================
//    🔁 AUTO CANCEL UNPAID ORDERS
// ===================================================== */
// const autoCancelUnpaidOrders = async () => {
//   try {
//     const expiredOrders = await Order.find({
//       paymentStatus: "pending",
//       orderStatus: "placed",
//       paymentExpiresAt: { $lte: new Date() }, // ✅ FIXED
//     });

//     for (const order of expiredOrders) {
//       for (const item of order.items) {
//         const product = await Product.findById(item.product);
//         if (product) {
//           product.stock += item.quantity;
//           await product.save();
//         }
//       }

//       order.orderStatus = "cancelled";
//       order.paymentStatus = "failed";
//       await order.save();

//       console.log(`⏰ Order auto-cancelled: ${order._id}`);
//     }

//   } catch (error) {
//     console.error("Auto cancel error:", error);
//   }
// };

// /* =====================================================
//    🔐 WEBHOOKS (MUST BE BEFORE JSON & CORS)
// ===================================================== */

// // Razorpay Webhook
// app.post(
//   "/api/orders/webhook",
//   express.raw({ type: "application/json" }),
//   require("./controllers/orderWebhookController")
// );

// // Shiprocket Webhook
// app.use(
//   "/api/webhooks",
//   express.raw({ type: "application/json" })
// );

// app.use("/api/webhooks", webhookRoutes);

// /* =====================================================
//    🌍 CORS CONFIG
// ===================================================== */

// const allowedOrigins = [
//   process.env.FRONTEND_URL,
//   "http://localhost:5173",
// ];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//   })
// );

// /* =====================================================
//    📦 JSON PARSER
// ===================================================== */
// app.use(express.json());

// /* =====================================================
//    🛡 SECURITY
// ===================================================== */
// app.use(
//   helmet({
//     crossOriginResourcePolicy: false,
//   })
// );

// /* =====================================================
//    📁 STATIC
// ===================================================== */
// app.use("/uploads", express.static("uploads"));

// /* =====================================================
//    🚦 RATE LIMITERS
// ===================================================== */
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 1000,
//   standardHeaders: true,
//   legacyHeaders: false,
// });

// const loginLimiter = rateLimit({
//   windowMs: 60 * 1000,
//   max: 7,
//   message: {
//     success: false,
//     message: "Too many login attempts. Try again later.",
//   },
// });

// const statsLimiter = rateLimit({
//   windowMs: 60 * 1000,
//   max: 120,
// });

// app.use(limiter);
// app.use("/api/auth/login", loginLimiter);
// app.use("/api/admin/stats", statsLimiter);

// /* =====================================================
//    📌 ROUTES
// ===================================================== */
// app.use("/api/users", userRoutes);
// app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api/products", require("./routes/productRoutes"));
// app.use("/api/orders", require("./routes/orderRoutes"));
// app.use("/api/cart", require("./routes/cartRoutes"));
// app.use("/api/admin", require("./routes/adminRoutes"));
// app.use("/api/delivery-states", deliveryStateRoutes);

// /* =====================================================
//    ❌ 404 HANDLER
// ===================================================== */
// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     message: "Route not found",
//   });
// });

// /* =====================================================
//    ⚠ ERROR HANDLER
// ===================================================== */
// app.use(errorHandler);

// /* =====================================================
//    🚀 SERVER START
// ===================================================== */
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });

// /* =====================================================
//    🛡 CRASH SAFETY
// ===================================================== */
// process.on("unhandledRejection", (err) => {
//   console.error("Unhandled Rejection:", err);
// });

// /* =====================================================
//    ⏳ AUTO CANCEL INTERVAL
// ===================================================== */
// setInterval(autoCancelUnpaidOrders, 60 * 1000);




















const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const errorHandler = require("./middleware/errorMiddleware");

const deliveryStateRoutes = require("./routes/deliveryStateRoutes");
const userRoutes = require("./routes/userRoutes");

const Order = require("./models/Order");
const Product = require("./models/Product");

const webhookRoutes = require("./routes/webhookRoutes");

dotenv.config();

connectDB();

const app = express();

/* =====================================================
   🔁 AUTO CANCEL UNPAID ORDERS
===================================================== */
const autoCancelUnpaidOrders = async () => {
  try {
    const expiredOrders = await Order.find({
      paymentStatus: "pending",
      orderStatus: "placed",
      paymentExpiresAt: { $lte: new Date() }, // ✅ FIXED
    });

    for (const order of expiredOrders) {
      for (const item of order.items) {
        const product = await Product.findById(item.product);
        if (product) {
          product.stock += item.quantity;
          await product.save();
        }
      }

      order.orderStatus = "cancelled";
      order.paymentStatus = "failed";
      await order.save();

      console.log(`⏰ Order auto-cancelled: ${order._id}`);
    }

  } catch (error) {
    console.error("Auto cancel error:", error);
  }
};

/* =====================================================
   🔐 WEBHOOKS (MUST BE BEFORE JSON & CORS)
===================================================== */

// Razorpay Webhook
app.post(
  "/api/orders/webhook",
  express.raw({ type: "application/json" }),
  require("./controllers/orderWebhookController")
);

// Shiprocket Webhook
app.use(
  "/api/webhooks",
  express.raw({ type: "application/json" })
);

app.use("/api/webhooks", webhookRoutes);

/* =====================================================
   🌍 CORS CONFIG
===================================================== */

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

/* =====================================================
   📦 JSON PARSER
===================================================== */
app.use(express.json());

/* =====================================================
   🛡 SECURITY
===================================================== */
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

/* =====================================================
   📁 STATIC
===================================================== */
app.use("/uploads", express.static("uploads"));

/* =====================================================
   🚦 RATE LIMITERS
===================================================== */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  standardHeaders: true,
  legacyHeaders: false,
});

const loginLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 7,
  message: {
    success: false,
    message: "Too many login attempts. Try again later.",
  },
});

const statsLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120,
});

app.use(limiter);
app.use("/api/auth/login", loginLimiter);
app.use("/api/admin/stats", statsLimiter);

/* =====================================================
   📌 ROUTES
===================================================== */
app.use("/api/users", userRoutes);
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/delivery-states", deliveryStateRoutes);

/* =====================================================
   ❌ 404 HANDLER
===================================================== */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/* =====================================================
   ⚠ ERROR HANDLER
===================================================== */
app.use(errorHandler);

/* =====================================================
   🚀 SERVER START
===================================================== */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

/* =====================================================
   🛡 CRASH SAFETY
===================================================== */
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
});

/* =====================================================
   ⏳ AUTO CANCEL INTERVAL
===================================================== */
setInterval(autoCancelUnpaidOrders, 60 * 1000);
