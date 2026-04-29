import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import toast from "react-hot-toast";

import {
  fetchCartAPI,
  addToCartAPI,
  updateCartItemAPI,
  removeCartItemAPI,
  clearCartAPI,
} from "../services/cartApi";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loadingCart, setLoadingCart] = useState(false);

  // ✅ FETCH CART
  const fetchCart = async () => {
    if (!user?._id) {
      setCartItems([]);
      return;
    }

    try {
      setLoadingCart(true);
      const { data } = await fetchCartAPI();
      setCartItems(data.data || []);
    } catch (error) {
      console.error("Cart fetch failed", error);
      toast.error("Failed to load cart");
    } finally {
      setLoadingCart(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  // ✅ ADD TO CART
  const addToCart = async (product) => {
    if (!user) {
      toast.error("Please login first");
      return;
    }

    try {
      await addToCartAPI({
        productId: product._id,
        quantity: 1,
        size: product.selectedSize || null,
        color: product.selectedColor || null,
      });

      toast.success("Added to cart 🛒");
      fetchCart();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Add to cart failed"
      );
    }
  };

  // ✅ UPDATE QTY
  const updateQty = async (id, qty, stock, size, color) => {
    if (qty > stock) {
      toast.error("Cannot exceed stock");
      return;
    }

    if (qty < 1) {
      toast.error("Quantity must be at least 1");
      return;
    }

    try {
      await updateCartItemAPI({
        productId: id,
        quantity: qty,
        size,
        color,
      });

      toast.success("Cart updated");
      fetchCart();
    } catch (error) {
      console.error("Update cart failed", error);
      toast.error("Update failed");
    }
  };

  // ✅ REMOVE ITEM
  const removeFromCart = async (id, size, color) => {
    try {
      await removeCartItemAPI(id, size, color);
      toast.success("Item removed");
      fetchCart();
    } catch (error) {
      console.error("Remove failed", error);
      toast.error("Remove failed");
    }
  };

  // ✅ CLEAR CART
  const clearCart = async () => {
    try {
      await clearCartAPI();
      setCartItems([]);
      // toast.success("Cart cleared");
    } catch (error) {
      console.error("Clear cart failed", error);
      toast.error("Clear cart failed");
    }
  };

  // ✅ TOTAL PRICE
  const totalPrice = cartItems.reduce((acc, item) => {
    const product = item.product;
    if (!product) return acc;

    const basePrice = product.price ?? 0;
    const discountPercent = product.discountPercent ?? 0;

    const final =
      discountPercent > 0
        ? product.discountedPrice ?? basePrice
        : basePrice;

    return acc + final * (item.quantity ?? 1);
  }, 0);

  // ✅ CART COUNT
  const cartCount = cartItems.reduce(
    (acc, item) => acc + (item.quantity || 0),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQty,
        removeFromCart,
        clearCart,
        totalPrice,
        cartCount,
        loadingCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);