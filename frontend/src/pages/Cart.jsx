// import { useCart } from "../context/CartContext";
// import { Link } from "react-router-dom";

// const Cart = () => {
//   const { cartItems, removeFromCart, updateQty, totalPrice } = useCart();

//   const resolveImage = (img) => {
//     if (!img) return "https://via.placeholder.com/150";
//     if (img.startsWith("http")) return img;
//     return `http://localhost:5000${img}`;
//   };

//   if (cartItems.length === 0) {
//     return <p className="text-center p-10">Cart is empty 🛒</p>;
//   }

//   return (
//     <div className="p-4 max-w-5xl mx-auto">
//       <h2 className="text-xl font-bold mb-6">Your Cart</h2>

//       <div className="space-y-4">
//         {cartItems.map((item) => {
//           const product = item.product;

//           if (!product) return null; // safety

//           // ✅ PRICE RESOLUTION (DB SAFE)
//           const finalPrice =
//             product.discountPercent > 0
//               ? product.discountedPrice
//               : product.price;

//           return (
//             <div
//               key={`${product._id}-${item.size}-${item.color}`}
//               className="flex gap-4 border p-3 rounded-xl"
//             >
//               <img
//                 src={resolveImage(product.images?.[0])}
//                 alt={product.name}
//                 className="w-24 h-24 object-cover rounded-lg"
//               />

//               <div className="flex-1">
//                 <h3 className="font-semibold">{product.name}</h3>

//                 {/* ✅ UPDATED PRICE DISPLAY */}
//                 <p>
//                   {product.discountPercent > 0 ? (
//                     <>
//                       <span className="text-gray-400 line-through mr-2">
//                         ₹{product.price}
//                       </span>

//                       <span className="text-[#DD7A83] font-semibold">
//                         ₹{finalPrice}
//                       </span>

//                       <span className="ml-2 text-xs bg-black text-white px-2 py-1 rounded-lg">
//                         {product.discountPercent}% OFF
//                       </span>
//                     </>
//                   ) : (
//                     <>₹{product.price}</>
//                   )}
//                 </p>

//                 {/* ✅ SIZE / COLOR */}
//                 {item.size && (
//                   <p className="text-xs text-gray-500">
//                     Size: {item.size}
//                   </p>
//                 )}

//                 {item.color && (
//                   <p className="text-xs text-gray-500">
//                     Color: {item.color}
//                   </p>
//                 )}

//                 {/* ✅ QTY CONTROLS */}
//                 <div className="flex gap-2 mt-2">
//                   <button
//                     onClick={() =>
//                       updateQty(
//                         product._id,
//                         item.quantity - 1,
//                         product.stock,
//                         item.size,
//                         item.color
//                       )
//                     }
//                   >
//                     −
//                   </button>

//                   <span>{item.quantity}</span>

//                   <button
//                     onClick={() =>
//                       updateQty(
//                         product._id,
//                         item.quantity + 1,
//                         product.stock,
//                         item.size,
//                         item.color
//                       )
//                     }
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>

//               {/* ✅ REMOVE */}
//               <button
//                 onClick={() => removeFromCart(product._id)}
//                 className="text-red-500"
//               >
//                 Remove
//               </button>
//             </div>
//           );
//         })}
//       </div>

//       {/* ✅ TOTAL */}
//       <h3 className="mt-6 font-bold">Total: ₹{totalPrice}</h3>

//       <Link to="/checkout">
//         <button className="mt-4 bg-[#DD7A83] text-white px-6 py-2 rounded-xl">
//           Checkout
//         </button>
//       </Link>
//     </div>
//   );
// };

// export default Cart;








// import { useCart } from "../context/CartContext";
// import { Link } from "react-router-dom";

// const Cart = () => {
//   const { cartItems, removeFromCart, updateQty, totalPrice } = useCart();

//   const resolveImage = (img) => {
//     if (!img) return "https://via.placeholder.com/150";
//     if (img.startsWith("http")) return img;
//     return `http://localhost:5000${img}`;
//   };

//   if (cartItems.length === 0) {
//     return <p className="text-center p-10">Cart is empty 🛒</p>;
//   }

//   return (
//     <div className="p-4 max-w-5xl mx-auto">
//       <h2 className="text-xl font-bold mb-6">Your Cart</h2>

//       <div className="space-y-4">
//         {cartItems.map((item) => {
//           const product = item.product;

//           if (!product) return null; // safety

//           // ✅ PRICE RESOLUTION (DB SAFE)
//           const finalPrice =
//             product.discountPercent > 0
//               ? product.discountedPrice
//               : product.price;

//           return (
//             <div
//               key={`${product._id}-${item.size}-${item.color}`}
//               className="flex gap-4 border p-3 rounded-xl"
//             >
//               <img
//                 src={resolveImage(product.images?.[0])}
//                 alt={product.name}
//                 className="w-24 h-24 object-cover rounded-lg"
//               />

//               <div className="flex-1">
//                 <h3 className="font-semibold">{product.name}</h3>

//                 {/* ✅ UPDATED PRICE DISPLAY */}
//                 <p>
//                   {product.discountPercent > 0 ? (
//                     <>
//                       <span className="text-gray-400 line-through mr-2">
//                         ₹{product.price}
//                       </span>

//                       <span className="text-[#DD7A83] font-semibold">
//                         ₹{finalPrice}
//                       </span>

//                       <span className="ml-2 text-xs bg-black text-white px-2 py-1 rounded-lg">
//                         {product.discountPercent}% OFF
//                       </span>
//                     </>
//                   ) : (
//                     <>₹{product.price}</>
//                   )}
//                 </p>

//                 {/* ✅ SIZE / COLOR */}
//                 {item.size && (
//                   <p className="text-xs text-gray-500">
//                     Size: {item.size}
//                   </p>
//                 )}

//                 {item.color && (
//                   <p className="text-xs text-gray-500">
//                     Color: {item.color}
//                   </p>
//                 )}

//                 {/* ✅ QTY CONTROLS */}
//                 <div className="flex gap-2 mt-2">
//                   <button
//                     onClick={() =>
//                       updateQty(
//                         product._id,
//                         item.quantity - 1,
//                         product.stock,
//                         item.size,
//                         item.color
//                       )
//                     }
//                   >
//                     −
//                   </button>

//                   <span>{item.quantity}</span>

//                   <button
//                     onClick={() =>
//                       updateQty(
//                         product._id,
//                         item.quantity + 1,
//                         product.stock,
//                         item.size,
//                         item.color
//                       )
//                     }
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>

//               {/* ✅ REMOVE */}
//               <button
//                 onClick={() => removeFromCart(product._id)}
//                 className="text-red-500"
//               >
//                 Remove
//               </button>
//             </div>
//           );
//         })}
//       </div>

//       {/* ✅ TOTAL */}
//       <h3 className="mt-6 font-bold">Total: ₹{totalPrice}</h3>

//       <Link to="/checkout">
//         <button className="mt-4 bg-[#DD7A83] text-white px-6 py-2 rounded-xl">
//           Checkout
//         </button>
//       </Link>
//     </div>
//   );
// };

// export default Cart;
















// import { useCart } from "../context/CartContext";
// import { Link } from "react-router-dom";
// import toast from "react-hot-toast";


// const Cart = () => {
//   const { cartItems, removeFromCart, updateQty, totalPrice } = useCart();

//   const resolveImage = (img) => {
//     if (!img) return "https://via.placeholder.com/150";
//     if (img.startsWith("http")) return img;
//     return `http://localhost:5000${img}`;
//   };

//   const handleCheckout = () => {
//     const missingSelection = cartItems.some(
//       (item) =>
//         (item.product?.sizes?.length > 0 && !item.size) ||
//         (item.product?.colors?.length > 0 && !item.color)
//     );

//     if (missingSelection) {
//       toast.error("Select size & color before checkout 🛍");
//       return;
//     }

//     window.location.href = "/checkout";
//   };

//   if (cartItems.length === 0) {
//     return <p className="text-center p-10">Cart is empty 🛒</p>;
//   }

//   return (
//     <div className="p-4 max-w-5xl mx-auto">
//       <h2 className="text-xl font-bold mb-6">Your Cart</h2>

//       <div className="space-y-4">
//         {cartItems.map((item) => {
//           const product = item.product;

//           if (!product) return null; // safety

//           // ✅ PRICE RESOLUTION (DB SAFE)
//           const finalPrice =
//             product.discountPercent > 0
//               ? product.discountedPrice
//               : product.price;

//           return (
//             <div
//               key={`${product._id}-${item.size}-${item.color}`}
//               className="flex gap-4 border p-3 rounded-xl"
//             >
//               <img
//                 src={resolveImage(product.images?.[0])}
//                 alt={product.name}
//                 className="w-24 h-24 object-cover rounded-lg"
//               />

//               <div className="flex-1">
//                 <h3 className="font-semibold">{product.name}</h3>

//                 {/* ✅ UPDATED PRICE DISPLAY */}
//                 <p>
//                   {product.discountPercent > 0 ? (
//                     <>
//                       <span className="text-gray-400 line-through mr-2">
//                         ₹{product.price}
//                       </span>

//                       <span className="text-[#DD7A83] font-semibold">
//                         ₹{finalPrice}
//                       </span>

//                       <span className="ml-2 text-xs bg-black text-white px-2 py-1 rounded-lg">
//                         {product.discountPercent}% OFF
//                       </span>
//                     </>
//                   ) : (
//                     <>₹{product.price}</>
//                   )}
//                 </p>

//                 {/* ✅ SIZE / COLOR */}
//                 {item.size && (
//                   <p className="text-xs text-gray-500">
//                     Size: {item.size}
//                   </p>
//                 )}

//                 {item.color && (
//                   <p className="text-xs text-gray-500">
//                     Color: {item.color}
//                   </p>
//                 )}

//                 {/* ✅ QTY CONTROLS */}
//                 <div className="flex gap-2 mt-2">
//                   <button
//                     onClick={() =>
//                       updateQty(
//                         product._id,
//                         item.quantity - 1,
//                         product.stock,
//                         item.size,
//                         item.color
//                       )
//                     }
//                   >
//                     −
//                   </button>

//                   <span>{item.quantity}</span>

//                   <button
//                     onClick={() =>
//                       updateQty(
//                         product._id,
//                         item.quantity + 1,
//                         product.stock,
//                         item.size,
//                         item.color
//                       )
//                     }
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>

//               {/* ✅ REMOVE */}
//               <button
//                 onClick={() => removeFromCart(product._id)}
//                 className="text-red-500"
//               >
//                 Remove
//               </button>
//             </div>
//           );
//         })}
//       </div>

//       {/* ✅ TOTAL */}
//       <h3 className="mt-6 font-bold">Total: ₹{totalPrice}</h3>

//       <button
//   onClick={handleCheckout}
//   className="mt-4 bg-[#DD7A83] text-white px-6 py-2 rounded-xl"
// >
//   Checkout
// </button>
//     </div>
//   );
// };

// export default Cart;










// import { useCart } from "../context/CartContext";
// import toast from "react-hot-toast";

// const Cart = () => {
//   const { cartItems, removeFromCart, updateQty, totalPrice } = useCart();

//   const resolveImage = (img) => {
//     if (!img) return "https://via.placeholder.com/150";
//     if (img.startsWith("http")) return img;
//     return `http://localhost:5000${img}`;
//   };

//   const handleCheckout = () => {
//     const missingSelection = cartItems.some(
//       (item) =>
//         (item.product?.sizes?.length > 0 && !item.size) ||
//         (item.product?.colors?.length > 0 && !item.color)
//     );

//     if (missingSelection) {
//       toast.error("Select size & color before checkout 🛍");
//       return;
//     }

//     window.location.href = "/checkout";
//   };

//   if (cartItems.length === 0) {
//     return <p className="text-center p-10">Cart is empty 🛒</p>;
//   }

//   return (
//     <div className="p-4 max-w-5xl mx-auto">
//       <h2 className="text-xl font-bold mb-6">Your Cart</h2>

//       <div className="space-y-4">
//         {cartItems.map((item) => {
//           const product = item.product;

//           if (!product) return null;

//           const finalPrice =
//             product.discountPercent > 0
//               ? product.discountedPrice
//               : product.price;

//           return (
//             <div
//               key={`${product._id}-${item.size}-${item.color}`}
//               className="flex gap-4 border p-3 rounded-xl"
//             >
//               <img
//                 src={resolveImage(product.images?.[0])}
//                 alt={product.name}
//                 className="w-24 h-24 object-cover rounded-lg"
//               />

//               <div className="flex-1">
//                 <h3 className="font-semibold">{product.name}</h3>

//                 {/* ✅ PRICE */}
//                 <p>
//                   {product.discountPercent > 0 ? (
//                     <>
//                       <span className="text-gray-400 line-through mr-2">
//                         ₹{product.price}
//                       </span>

//                       <span className="text-[#DD7A83] font-semibold">
//                         ₹{finalPrice}
//                       </span>

//                       <span className="ml-2 text-xs bg-black text-white px-2 py-1 rounded-lg">
//                         {product.discountPercent}% OFF
//                       </span>
//                     </>
//                   ) : (
//                     <>₹{product.price}</>
//                   )}
//                 </p>

//                 {/* 🚨 WARNINGS */}
//                 {!item.size && product.sizes?.length > 0 && (
//                   <p className="text-xs text-red-500">
//                     Please select size
//                   </p>
//                 )}

//                 {!item.color && product.colors?.length > 0 && (
//                   <p className="text-xs text-red-500">
//                     Please select color
//                   </p>
//                 )}

//                 {/* ✅ SIZE SELECTOR */}
//                 {product.sizes?.length > 0 && (
//                   <div className="mt-2">
//                     <p className="text-xs text-gray-500 mb-1">Size:</p>

//                     <div className="flex gap-1 flex-wrap">
//                       {product.sizes.map((size) => (
//                         <button
//                           key={size}
//                           onClick={() =>
//                             updateQty(
//                               product._id,
//                               item.quantity,
//                               product.stock,
//                               size,
//                               item.color
//                             )
//                           }
//                           className={`px-2 py-1 text-xs border rounded ${
//                             item.size === size
//                               ? "bg-[#DD7A83] text-white border-[#DD7A83]"
//                               : "border-gray-300 hover:border-[#DD7A83]"
//                           }`}
//                         >
//                           {size}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* ✅ COLOR SELECTOR */}
//                 {product.colors?.length > 0 && (
//                   <div className="mt-2">
//                     <p className="text-xs text-gray-500 mb-1">Color:</p>

//                     <div className="flex gap-1 flex-wrap">
//                       {product.colors.map((color) => (
//                         <button
//                           key={color}
//                           onClick={() =>
//                             updateQty(
//                               product._id,
//                               item.quantity,
//                               product.stock,
//                               item.size,
//                               color
//                             )
//                           }
//                           className={`px-2 py-1 text-xs border rounded ${
//                             item.color === color
//                               ? "bg-[#DD7A83] text-white border-[#DD7A83]"
//                               : "border-gray-300 hover:border-[#DD7A83]"
//                           }`}
//                         >
//                           {color}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* ✅ QTY */}
//                 <div className="flex gap-2 mt-3">
//                   <button
//                     onClick={() =>
//                       updateQty(
//                         product._id,
//                         item.quantity - 1,
//                         product.stock,
//                         item.size,
//                         item.color
//                       )
//                     }
//                   >
//                     −
//                   </button>

//                   <span>{item.quantity}</span>

//                   <button
//                     onClick={() =>
//                       updateQty(
//                         product._id,
//                         item.quantity + 1,
//                         product.stock,
//                         item.size,
//                         item.color
//                       )
//                     }
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>

//               {/* ✅ REMOVE (VARIANT SAFE) */}
//               <button
//                 onClick={() =>
//                   removeFromCart(product._id, item.size, item.color)
//                 }
//                 className="text-red-500"
//               >
//                 Remove
//               </button>
//             </div>
//           );
//         })}
//       </div>

//       {/* ✅ TOTAL */}
//       <h3 className="mt-6 font-bold">Total: ₹{totalPrice}</h3>

//       {/* ✅ CHECKOUT */}
//       <button
//         onClick={handleCheckout}
//         className="mt-4 bg-[#DD7A83] text-white px-6 py-2 rounded-xl"
//       >
//         Checkout
//       </button>
//     </div>
//   );
// };

// export default Cart;











import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

const Cart = () => {
  const { cartItems, removeFromCart, updateQty, totalPrice } = useCart();

  const resolveImage = (img) => {
    if (!img) return "https://via.placeholder.com/150";
    if (img.startsWith("http")) return img;
    return `http://localhost:5000${img}`;
  };

  const handleCheckout = () => {
    const missingSelection = cartItems.some(
      (item) =>
        (item.product?.sizes?.length > 0 && !item.size) ||
        (item.product?.colors?.length > 0 && !item.color)
    );

    if (missingSelection) {
      toast.error("Select size & color before checkout 🛍");
      return;
    }

    window.location.href = "/checkout";
  };

  if (cartItems.length === 0) {
    return <p className="text-center p-10">Cart is empty 🛒</p>;
  }

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-xl font-bold mb-6">Your Cart</h2>

      <div className="space-y-4">
        {cartItems.map((item) => {
          const product = item.product;

          if (!product) return null;

          const finalPrice =
            product.discountPercent > 0
              ? product.discountedPrice
              : product.price;

          return (
            <div
              key={`${product._id}-${item.size}-${item.color}`}
              className="flex gap-4 border p-3 rounded-xl"
            >
              <img
                src={resolveImage(product.images?.[0])}
                alt={product.name}
                className="w-24 h-24 object-cover rounded-lg"
              />

              <div className="flex-1">
                <h3 className="font-semibold">{product.name}</h3>

                {/* ✅ PRICE */}
                <p>
                  {product.discountPercent > 0 ? (
                    <>
                      <span className="text-gray-400 line-through mr-2">
                        ₹{product.price}
                      </span>

                      <span className="text-[#DD7A83] font-semibold">
                        ₹{finalPrice}
                      </span>

                      <span className="ml-2 text-xs bg-black text-white px-2 py-1 rounded-lg">
                        {product.discountPercent}% OFF
                      </span>
                    </>
                  ) : (
                    <>₹{product.price}</>
                  )}
                </p>

                {/* 🚨 WARNINGS */}
                {!item.size && product.sizes?.length > 0 && (
                  <p className="text-xs text-red-500">
                    Please select size
                  </p>
                )}

                {!item.color && product.colors?.length > 0 && (
                  <p className="text-xs text-red-500">
                    Please select color
                  </p>
                )}

                {/* ✅ SIZE SELECTOR */}
                {product.sizes?.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-500 mb-1">Size:</p>

                    {item.size && (
                      <p className="text-xs text-gray-600 mb-1">
                        Selected: <b>{item.size}</b>
                      </p>
                    )}

                    <div className="flex gap-1 flex-wrap">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() =>
                            updateQty(
                              product._id,
                              item.quantity,
                              product.stock,
                              size,
                              item.color
                            )
                          }
                          className={`px-2 py-1 text-xs border rounded ${
                            item.size === size
                              ? "bg-[#DD7A83] text-white border-[#DD7A83]"
                              : "border-gray-300 hover:border-[#DD7A83]"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* ✅ COLOR SELECTOR */}
                {product.colors?.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-500 mb-1">Color:</p>

                    {item.color && (
                      <p className="text-xs text-gray-600 mb-1">
                        Selected: <b>{item.color}</b>
                      </p>
                    )}

                    <div className="flex gap-1 flex-wrap">
                      {product.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() =>
                            updateQty(
                              product._id,
                              item.quantity,
                              product.stock,
                              item.size,
                              color
                            )
                          }
                          className={`px-2 py-1 text-xs border rounded ${
                            item.color === color
                              ? "bg-[#DD7A83] text-white border-[#DD7A83]"
                              : "border-gray-300 hover:border-[#DD7A83]"
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* ✅ QTY */}
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() =>
                      updateQty(
                        product._id,
                        item.quantity - 1,
                        product.stock,
                        item.size,
                        item.color
                      )
                    }
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      updateQty(
                        product._id,
                        item.quantity + 1,
                        product.stock,
                        item.size,
                        item.color
                      )
                    }
                  >
                    +
                  </button>
                </div>
              </div>

              {/* ✅ REMOVE (VARIANT SAFE) */}
              <button
                onClick={() =>
                  removeFromCart(product._id, item.size, item.color)
                }
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>

      {/* ✅ TOTAL */}
      <h3 className="mt-6 font-bold">Total: ₹{totalPrice}</h3>

      {/* ✅ CHECKOUT */}
      <button
        onClick={handleCheckout}
        className="mt-4 bg-[#DD7A83] text-white px-6 py-2 rounded-xl"
      >
        Checkout
      </button>
    </div>
  );
};

export default Cart;