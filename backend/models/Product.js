// const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: [true, "Product name is required"],
//       trim: true,
//       minlength: [2, "Name must be at least 2 characters"],
//     },

//     description: {
//       type: String,
//       required: [true, "Description is required"],
//       minlength: [10, "Description too short"],
//     },

//     price: {
//       type: Number,
//       required: [true, "Price is required"],
//       min: [0, "Price cannot be negative"],
//     },

//     category: {
//       type: String,
//       required: [true, "Category required"],
//       enum: ["tops", "dress", "jeans", "kurti", "saree", "other"],
//     },

//     sizes: [
//       {
//         type: String,
//         enum: ["S", "M", "L", "XL"],
//       },
//     ],

//     colors: [
//       {
//         type: String,
//       },
//     ],

//     stock: {
//       type: Number,
//       required: [true, "Stock required"],
//       min: [0, "Stock cannot be negative"],
//       default: 0,
//     },

//     images: [
//       {
//         type: String,
//       },
//     ],

//     isActive: {
//       type: Boolean,
//       default: true,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Product", productSchema);





const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [10, "Description too short"],
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },

    // ✅ NEW
    discountPercent: {
      type: Number,
      default: 0,
      min: [0, "Discount cannot be negative"],
      max: [90, "Discount too high"],
    },

    discountedPrice: {
      type: Number,
    },

    category: {
      type: String,
      required: [true, "Category required"],
      enum: ["tops", "dress", "jeans", "kurti", "saree", "other"],
    },

    sizes: [
      {
        type: String,
        enum: ["S", "M", "L", "XL"],
      },
    ],

    colors: [
      {
        type: String,
      },
    ],

    stock: {
      type: Number,
      required: [true, "Stock required"],
      min: [0, "Stock cannot be negative"],
      default: 0,
    },

    images: [
      {
        type: String,
      },
    ],

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);