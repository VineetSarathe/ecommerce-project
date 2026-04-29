import API from "./api";

// LOGIN
export const loginUser = (formData) =>
  API.post("/auth/login", formData);

// REGISTER
export const registerUser = (formData) =>
  API.post("/auth/register", formData);

// GET PROFILE
export const getProfile = () =>
  API.get("/auth/me");
