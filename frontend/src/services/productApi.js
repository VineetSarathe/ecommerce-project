import API from "./api";

// GET ALL PRODUCTS
export const getProducts = () => API.get("/products");

// GET SINGLE PRODUCT
export const getProductById = (id) => API.get(`/products/${id}`);

// ADMIN
// export const createProduct = (data) => API.post("/products", data);

export const createProduct = (data) =>
  API.post("/products", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateProduct = (id, data) => API.put(`/products/${id}`, data);
export const deleteProduct = (id) => API.delete(`/products/${id}`);


// import API from "./api";

// export const getProducts = () => API.get("/products");
// export const getProductById = (id) => API.get(`/products/${id}`);

// export const createProduct = (data) =>
//   API.post("/products", data, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });

// export const updateProduct = (id, data) =>
//   API.put(`/products/${id}`, data, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });

// export const deleteProduct = (id) =>
//   API.delete(`/products/${id}`);
