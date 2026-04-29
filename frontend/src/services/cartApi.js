// import API from "./api";

// export const fetchCartAPI = () => API.get("/cart");

// export const addToCartAPI = (data) =>
//   API.post("/cart/add", data);

// export const updateCartItemAPI = (data) =>
//   API.put("/cart/update", data);

// export const removeCartItemAPI = (productId) =>
//   API.delete(`/cart/remove/${productId}`);

// export const clearCartAPI = () =>
//   API.delete("/cart/clear");








import API from "./api";

export const fetchCartAPI = () => API.get("/cart");

export const addToCartAPI = (data) =>
  API.post("/cart/add", data);

export const updateCartItemAPI = (data) =>
  API.put("/cart/update", data);

export const removeCartItemAPI = (productId, size, color) =>
  API.delete(`/cart/remove/${productId}`, {
    data: { size, color },
  });

export const clearCartAPI = () =>
  API.delete("/cart/clear");