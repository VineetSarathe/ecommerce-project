import api from "./api";

export const fetchDeliveryStates = () =>
  api.get("/delivery-states");

export const addDeliveryState = (data) =>
  api.post("/delivery-states", data);

export const toggleDeliveryState = (id) =>
  api.put(`/delivery-states/${id}`);

export const deleteDeliveryState = (id) =>
  api.delete(`/delivery-states/${id}`);