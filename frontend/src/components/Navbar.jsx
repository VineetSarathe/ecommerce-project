import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { Menu, X, ShoppingCart } from "lucide-react"; // ✅ Cart Icon
import logo from "../assets/logo.png";

const Navbar = () => {
  const { user } = useAuth();
  const { cartItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const totalQty = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <nav
      className="fixed top-0 z-50 w-full
      bg-gradient-to-r from-[#DD7A83]/95 to-[#E3BFC3]/95
      text-white shadow-lg backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">

        {/* ✅ Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="Roopswaroop Logo"
            className="h-10 w-auto object-contain hover:scale-105 transition"
          />
          <span className="text-lg font-bold bg-gradient-to-r from-white to-pink-100 bg-clip-text text-transparent">
            Roopswaroop
          </span>
        </Link>

        {/* ✅ Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center text-sm font-medium">

          <Link className="hover:text-pink-100 transition" to="/products">
            Products
          </Link>

          <Link className="hover:text-pink-100 transition" to="/about">
            About
          </Link>

          

          {/* ✅ CART ICON */}
          <Link
            className="hover:text-pink-100 transition relative"
            to="/cart"
          >
            <ShoppingCart size={22} />

            {totalQty > 0 && (
              <span className="
                absolute -top-2 -right-3
                bg-white text-[#DD7A83]
                text-xs font-bold
                px-1.5 py-0.5
                rounded-full
              ">
                {totalQty}
              </span>
            )}
          </Link>



          {user?.role === "admin" && (
            <Link
              className="hover:text-yellow-200 transition"
              to="/admin/dashboard"
            >
              Admin 👑
            </Link>
          )}

          <Link className="hover:text-pink-100 transition" to="/help">
            Help
          </Link>

          {user ? (
            <Link className="hover:text-pink-100 transition" to="/profile">
              Profile 👤
            </Link>
          ) : (
            <Link className="hover:text-pink-100 transition" to="/login">
              Login
            </Link>
          )}
        </div>

        {/* ✅ Right Section (Mobile) */}
        <div className="flex items-center gap-4 md:hidden">

          {/* ✅ CART ICON ALWAYS VISIBLE */}
          <Link to="/cart" className="relative">
            <ShoppingCart size={24} />

            {totalQty > 0 && (
              <span className="
                absolute -top-2 -right-3
                bg-white text-[#DD7A83]
                text-xs font-bold
                px-1.5 py-0.5
                rounded-full
              ">
                {totalQty}
              </span>
            )}
          </Link>

          {/* ✅ Hamburger */}
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* ✅ Mobile Menu */}
      {isOpen && (
        <div
          className="md:hidden px-4 pb-4 flex flex-col gap-3 text-sm font-medium
          animate-in slide-in-from-top duration-300"
        >
          <Link onClick={() => setIsOpen(false)} to="/products">
            Products
          </Link>

          <Link onClick={() => setIsOpen(false)} to="/about">
            About
          </Link>


          {/* ❌ Cart removed from menu */}

          {user?.role === "admin" && (
            <Link
              onClick={() => setIsOpen(false)}
              to="/admin/dashboard"
            >
              Admin 👑
            </Link>
          )}

          <Link onClick={() => setIsOpen(false)} to="/help">
            Help
          </Link>

          {user ? (
            <Link onClick={() => setIsOpen(false)} to="/profile">
              Profile 👤
            </Link>
          ) : (
            <Link onClick={() => setIsOpen(false)} to="/login">
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;