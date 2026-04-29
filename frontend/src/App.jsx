import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import OrderSuccess from "./pages/OrderSuccess";
import Help from "./pages/Help";

import AdminLogin from "./admin/pages/AdminLogin";
import Dashboard from "./admin/pages/Dashboard";
import AdminRoute from "./admin/components/AdminRoute";

import AdminProducts from "./admin/pages/Products";
import AdminOrders from "./admin/pages/Orders";
import AdminUsers from "./admin/pages/Users";
import AddProduct from "./admin/pages/AddProduct";
import EditProduct from "./admin/pages/EditProduct";

import OrderDetails from "./pages/OrderDetails";
import DeliveryStates from "./admin/pages/DeliveryStates";

import { Toaster } from "react-hot-toast";   // ✅ already present

import Policies from "./pages/Policies";


import ScrollToTop from "./components/ScrollToTop";

import InvoicePage from "./pages/InvoicePage";


function App() {
  return (
    <Router>

      <ScrollToTop />
      <Navbar />

      {/* ✅ TOASTER ADDED */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "12px",
            background: "#333",
            color: "#fff",
          },
        }}
      />

      <Routes>
        {/* USER ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/help" element={<Help />} />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route path="/success/:id" element={<OrderSuccess />} />

        {/* ADMIN */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <AdminRoute>
              <AdminProducts />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/products/add"
          element={
            <AdminRoute>
              <AddProduct />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/products/edit/:id"
          element={
            <AdminRoute>
              <EditProduct />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <AdminOrders />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <AdminUsers />
            </AdminRoute>
          }
        />

        <Route
          path="/orders/:id"
          element={
            <ProtectedRoute>
              <OrderDetails />
            </ProtectedRoute>
          }
        />

        <Route path="/dashboard" element={<Navigate to="/admin/dashboard" />} />

        <Route
          path="/admin/delivery-states"
          element={
            <AdminRoute>
              <DeliveryStates />
            </AdminRoute>
          }
        />

        <Route path="/policies" element={<Policies />} />

        <Route path="/invoice/:id" element={<InvoicePage />} />
        
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;