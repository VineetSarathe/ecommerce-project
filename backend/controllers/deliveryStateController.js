const DeliveryState = require("../models/DeliveryState");

exports.getActiveStates = async (req, res) => {
  try {
    const states = await DeliveryState.find({ isActive: true });
    res.json(states);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch states" });
  }
};

exports.addState = async (req, res) => {
  try {
    const { name } = req.body;

    const exists = await DeliveryState.findOne({ name });
    if (exists)
      return res.status(400).json({ message: "State already exists" });

    const state = await DeliveryState.create({ name });
    res.status(201).json(state);
  } catch (err) {
    res.status(500).json({ message: "Failed to add state" });
  }
};

exports.toggleState = async (req, res) => {
  try {
    const state = await DeliveryState.findById(req.params.id);

    if (!state)
      return res.status(404).json({ message: "State not found" });

    state.isActive = !state.isActive;
    await state.save();

    res.json(state);
  } catch (err) {
    res.status(500).json({ message: "Failed to update state" });
  }
};

exports.deleteState = async (req, res) => {
  try {
    await DeliveryState.findByIdAndDelete(req.params.id);
    res.json({ message: "State removed" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete state" });
  }
};