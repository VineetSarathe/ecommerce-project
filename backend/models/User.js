// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       match: [/^\S+@\S+\.\S+$/, "Invalid email"],
//     },
//     password: { type: String, required: true },
//     role: { type: String, default: "user" },

//     // ✅ NEW CART FIELD
//     cart: [
//       {
//         product: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "Product",
//         },
//         quantity: {
//           type: Number,
//           default: 1,
//         },
//         size: String,
//         color: String,
//       },
//     ],
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("User", userSchema);










const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email"],
    },
    password: { type: String, required: true },
    role: { type: String, default: "user" },

    // ✅ NEW CART FIELD
    cart: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          default: 1,
        },
        size: String,
        color: String,
      },
    ],

    // ✅ addresses
    addresses: [
      {
        fullName: String,
        phone: String,
        address: String,
        city: String,
        state: String,
        pincode: String,
        isDefault: { type: Boolean, default: false }
      }
    ],
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);