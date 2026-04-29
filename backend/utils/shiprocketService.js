

const axios = require("axios");
const { getShiprocketToken } = require("../config/shiprocket");



exports.createShipment = async (order) => {

  // 🔥 ================= DEV MODE =================
  if (process.env.DEV_SHIPROCKET === "true") {
    console.log("🚀 DEV MODE Shipment Created");

    return {
      shipmentId: "DEV-" + Date.now(),
      trackingId: "TRK-" + Math.floor(Math.random() * 1000000),
      courier: "Shiprocket (Dev)",
    };
  }

  // 🔴 ================= PRODUCTION MODE =================
  const token = await getShiprocketToken();

  if (!token) {
    throw new Error("Shiprocket token not available");
  }

  const res = await axios.post(
    `${process.env.SHIPROCKET_BASE_URL}/orders/create/adhoc`,
    {
      order_id: order._id.toString(),
      order_date: new Date().toISOString(),
      pickup_location: "Primary",
      billing_customer_name: order.shippingAddress.fullName,
      billing_phone: order.shippingAddress.phone,
      billing_address: order.shippingAddress.address,
      billing_city: order.shippingAddress.city,
      billing_state: order.shippingAddress.state,
      billing_pincode: order.shippingAddress.pincode,
      billing_country: "India",
      order_items: order.items.map((item) => ({
        name: item.name,
        sku: item.product.toString(),
        units: item.quantity,
        selling_price: item.price,
      })),
      payment_method: "Prepaid",
      sub_total: order.totalAmount,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return {
    shipmentId: res.data.shipment_id,
    trackingId: null,
    courier: null,
  };
};



exports.createReturnShipment = async (order) => {
  const token = await getShiprocketToken();

  const res = await axios.post(
    `${process.env.SHIPROCKET_BASE_URL}/orders/create/return`,
    {
      order_id: order._id.toString(),
      pickup_location: "Primary",
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return {
    trackingId: res.data.shipment_id,
    courier: "Shiprocket",
  };
};


// ================= CHECK PINCODE SERVICEABILITY =================
exports.checkServiceability = async (deliveryPincode) => {
  const token = await getShiprocketToken();

  if (!token) {
    throw new Error("Shiprocket token not available");
  }

  const res = await axios.get(
    `${process.env.SHIPROCKET_BASE_URL}/courier/serviceability/`,
    {
      params: {
        pickup_postcode: process.env.PICKUP_PINCODE,
        delivery_postcode: deliveryPincode,
        weight: 0.5,
        cod: 0,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const companies = res.data?.data?.available_courier_companies;

  return companies && companies.length > 0;

  
};