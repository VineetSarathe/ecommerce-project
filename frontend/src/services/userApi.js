import API from "./api";

export const getAddresses = () => API.get("/users/addresses");
export const addAddress = (data) => API.post("/users/addresses", data);
export const deleteAddress = (id) => API.delete(`/users/addresses/${id}`);