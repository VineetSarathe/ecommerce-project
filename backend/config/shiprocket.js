const axios = require("axios");

let shiprocketToken = null;
let tokenExpiry = null;

const loginShiprocket = async () => {
  try {
    const res = await axios.post(
      `${process.env.SHIPROCKET_BASE_URL}/auth/login`,
      {
        email: process.env.SHIPROCKET_EMAIL,
        password: process.env.SHIPROCKET_PASSWORD,
      }
    );

    shiprocketToken = res.data.token;

    // Shiprocket token valid approx 240 minutes
    tokenExpiry = Date.now() + 230 * 60 * 1000;

    console.log("✅ Shiprocket Auth Success");
  } catch (error) {
  console.error("❌ Shiprocket Auth Failed:", error.message);
  throw new Error("Shiprocket authentication failed");
}
};

const getShiprocketToken = async () => {
  if (!shiprocketToken || Date.now() > tokenExpiry) {
    await loginShiprocket();
  }
  return shiprocketToken;
};

module.exports = { getShiprocketToken };