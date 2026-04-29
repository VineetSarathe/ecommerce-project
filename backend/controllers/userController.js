const User = require("../models/User");

// ================= GET ADDRESSES =================
exports.getAddresses = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json(user.addresses || []);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= ADD ADDRESS =================
exports.addAddress = async (req, res) => {
  try {
    const { fullName, phone, address, city, state, pincode } = req.body;

    if (!fullName || !phone || !address || !city || !state || !pincode) {
      return res.status(400).json({
        success: false,
        message: "All address fields are required",
      });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const newAddress = {
      fullName,
      phone,
      address,
      city,
      state,
      pincode,
    };

    user.addresses.push(newAddress);
    await user.save();

    res.json({
      success: true,
      message: "Address added",
      addresses: user.addresses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= DELETE ADDRESS =================
exports.deleteAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.addresses = user.addresses.filter(
      (addr) => addr._id.toString() !== req.params.id
    );

    await user.save();

    res.json({
      success: true,
      message: "Address removed",
      addresses: user.addresses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};