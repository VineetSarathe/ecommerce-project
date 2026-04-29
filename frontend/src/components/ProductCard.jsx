import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const rawImage = product.images?.[0];

  const imageUrl = rawImage
    ? rawImage.startsWith("http")
      ? rawImage
      : `http://localhost:5000${rawImage}`
    : "https://via.placeholder.com/300";

  // ✅ SAFE STOCK (handles different backend fields)
  const stock =
    product.stock ??
    product.countInStock ??
    product.quantity ??
    0;

  const handleAddToCart = (e) => {
    e.preventDefault(); // ✅ Prevent Link navigation

    if (stock === 0) {
      toast.error("Product is out of stock");
      return;
    }

    addToCart(product);
    // toast.success("Added to cart 🛒");
  };

  return (
    <div
      className="group bg-white/70 backdrop-blur-md
                 border border-[#E3BFC3]
                 rounded-2xl shadow-sm
                 hover:shadow-lg hover:scale-[1.02]
                 transition duration-300 p-3"
    >
      <Link to={`/product/${product._id}`}>

        {/* IMAGE */}
        <div className="relative">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-48 sm:h-56 md:h-64
                       object-contain rounded-xl bg-white"
          />

          {/* ✅ BADGES */}
          <div className="absolute top-2 left-2 flex gap-2 flex-wrap">
            {stock === 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-lg">
                Out of Stock
              </span>
            )}

            {product.isNew && (
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-lg">
                New
              </span>
            )}

            {product.discountPercent > 0 && (
              <span className="bg-black text-white text-xs px-2 py-1 rounded-lg">
                {product.discountPercent}% OFF
              </span>
            )}
          </div>
        </div>

        {/* DETAILS */}
        <div className="flex justify-between items-center mt-2">
          
          {/* PRICE */}
          <p className="text-sm font-bold">
            {product.discountPercent > 0 ? (
              <>
                <span className="text-gray-400 line-through mr-2">
                  ₹{product.price}
                </span>

                <span className="text-[#DD7A83]">
                  ₹{product.discountedPrice}
                </span>
              </>
            ) : (
              <span className="text-[#DD7A83]">
                ₹{product.price}
              </span>
            )}
          </p>

          {/* CATEGORY */}
          <span className="text-xs sm:text-sm font-semibold text-gray-800 line-clamp-1">
            {product.category}
          </span>
        </div>

        {/* STOCK + CART */}
        <div className="flex justify-between items-center mt-1">
          
          {/* STOCK */}
          <p
            className={`text-xs font-medium ${
              stock > 5
                ? "text-green-600"
                : stock > 0
                ? "text-orange-500"
                : "text-red-500"
            }`}
          >
            {stock > 0 ? `${stock} left` : "Unavailable"}
          </p>

          {/* ADD TO CART */}
          <button
            onClick={handleAddToCart}
            disabled={stock === 0}
            className={`text-xs px-3 py-1 rounded-xl transition
              ${
                stock === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
          >
            Add to Cart
          </button>
        </div>

      </Link>
    </div>
  );
};

export default ProductCard;