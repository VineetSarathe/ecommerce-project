// import API from "./api";

// export const getDashboardStats = () =>
//   API.get("/admin/stats");


// export const getAllUsers = () => API.get("/admin/users");


// export const updateUserRole = (id, role) =>
//   API.put(`/admin/users/${id}`, { role });








import API from "./api";

// ================= DASHBOARD STATS =================
export const getDashboardStats = () =>
  API.get("/admin/stats");

// ================= MONTHLY REVENUE =================
export const getMonthlyRevenue = () =>
  API.get("/admin/monthly-revenue");

// ================= USERS =================
export const getAllUsers = () =>
  API.get("/admin/users");

export const updateUserRole = (id, role) =>
  API.put(`/admin/users/${id}`, { role });