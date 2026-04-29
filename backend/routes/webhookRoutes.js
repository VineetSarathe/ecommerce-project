const express = require("express");
const router = express.Router();

const shiprocketWebhookController = require(
  "../controllers/shiprocketWebhookController"
);

router.post("/shiprocket", shiprocketWebhookController);

module.exports = router;