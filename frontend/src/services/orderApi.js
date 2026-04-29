// import API from "./api";

// // ================= USER =================

// // PLACE ORDER
// export const placeOrder = (orderData) =>
//   API.post("/orders", orderData);

// // GET MY ORDERS
// export const getMyOrders = () =>
//   API.get("/orders/my");

// // GET SINGLE ORDER
// export const getOrderById = (id) =>
//   API.get(`/orders/${id}`);


// // ================= ADMIN =================

// // ✅ GET ALL ORDERS (WITH OPTIONAL QUERY)
// export const getAllOrders = (query = "") =>
//   API.get(`/orders${query}`);

// // UPDATE STATUS
// export const updateOrderStatus = (id, status) =>
//   API.put(`/orders/${id}`, { status });

// // ✅ UPDATE TRACKING
// export const shipOrder = (id) =>
//   API.put(`/orders/${id}/ship`);

// // CREATE RAZORPAY ORDER
// export const createRazorpayOrder = (orderId) =>
//   API.post("/orders/create-razorpay-order", { orderId });

// // VERIFY PAYMENT
// export const verifyPayment = (data) =>
//   API.post("/orders/verify-payment", data);


// export const cancelOrder = (id) =>
//   API.put(`/orders/${id}/cancel`);

// export const refundOrder = (orderId) =>
//   API.post(`/orders/${orderId}/refund`);










// import API from "./api";

// // ================= USER =================

// // PLACE ORDER
// export const placeOrder = (orderData) =>
//   API.post("/orders", orderData);

// // GET MY ORDERS
// export const getMyOrders = () =>
//   API.get("/orders/my");

// // GET SINGLE ORDER
// export const getOrderById = (id) =>
//   API.get(`/orders/${id}`);


// // ================= ADMIN =================

// // ✅ GET ALL ORDERS (WITH OPTIONAL QUERY)
// export const getAllOrders = (query = "") =>
//   API.get(`/orders${query}`);

// // UPDATE STATUS
// export const updateOrderStatus = (id, status) =>
//   API.put(`/orders/${id}`, { status });

// // ✅ UPDATE TRACKING
// export const shipOrder = (id) =>
//   API.put(`/orders/${id}/ship`);

// // CREATE RAZORPAY ORDER
// export const createRazorpayOrder = (orderId) =>
//   API.post("/orders/create-razorpay-order", { orderId });

// // VERIFY PAYMENT
// export const verifyPayment = (data) =>
//   API.post("/orders/verify-payment", data);


// export const cancelOrder = (id) =>
//   API.put(`/orders/${id}/cancel`);

// export const refundOrder = (orderId) =>
//   API.post(`/orders/${orderId}/refund`);


// export const approveReturn = (id) =>
//   API.put(`/orders/${id}/approve-return`);

// export const confirmReturn = (id) =>
//   API.put(`/orders/${id}/confirm-return`);

// export const requestReturn = (id, data) =>
//   API.put(`/orders/${id}/request-return`, data);

// export const rejectReturn = (id) =>
//   API.put(`/orders/${id}/reject-return`);











import API from "./api";

// ================= USER =================

// PLACE ORDER
export const placeOrder = (orderData) =>
  API.post("/orders", orderData);

// GET MY ORDERS
export const getMyOrders = () =>
  API.get("/orders/my");

// GET SINGLE ORDER
export const getOrderById = (id) =>
  API.get(`/orders/${id}`);


// ================= ADMIN =================

// ✅ GET ALL ORDERS (WITH OPTIONAL QUERY)
export const getAllOrders = (query = "") =>
  API.get(`/orders${query}`);

// UPDATE STATUS
export const updateOrderStatus = (id, status) =>
  API.put(`/orders/${id}`, { status });

// ✅ UPDATE TRACKING
export const shipOrder = (id) =>
  API.put(`/orders/${id}/ship`);

// CREATE RAZORPAY ORDER
export const createRazorpayOrder = (orderId) =>
  API.post("/orders/create-razorpay-order", { orderId });

// VERIFY PAYMENT
export const verifyPayment = (data) =>
  API.post("/orders/verify-payment", data);


export const cancelOrder = (id) =>
  API.put(`/orders/${id}/cancel`);

export const refundOrder = (orderId) =>
  API.post(`/orders/${orderId}/refund`);


export const approveReturn = (id) =>
  API.put(`/orders/${id}/approve-return`);

export const confirmReturn = (id) =>
  API.put(`/orders/${id}/confirm-return`);

export const requestReturn = (id, data) =>
  API.put(`/orders/${id}/request-return`, data);

export const rejectReturn = (id) =>
  API.put(`/orders/${id}/reject-return`);

export const checkPincode = (pincode) =>
  API.post("/orders/check-pincode", { pincode });