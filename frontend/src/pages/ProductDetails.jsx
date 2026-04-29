// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getProductById } from "../services/productApi";
// import { useCart } from "../context/CartContext";

// const ProductDetails = () => {
//   const { id } = useParams();
//   const { addToCart } = useCart();

//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const [selectedSize, setSelectedSize] = useState("");
//   const [selectedColor, setSelectedColor] = useState("");

//   const [currentImage, setCurrentImage] = useState(0); // ✅ NEW

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const { data } = await getProductById(id);
//         setProduct(data.data);

//         setSelectedSize("");
//         setSelectedColor("");
//         setCurrentImage(0); // ✅ RESET slider

//       } catch (error) {
//         console.error("Error fetching product", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   if (loading) {
//     return (
//       <p className="text-center p-10 text-gray-600">
//         Loading product...
//       </p>
//     );
//   }

//   if (!product) {
//     return (
//       <p className="text-center p-10 text-gray-600">
//         Product not found
//       </p>
//     );
//   }

//   // ✅ Normalize images
//   const images = product.images?.length
//     ? product.images.map((img) =>
//         img.startsWith("http")
//           ? img
//           : `http://localhost:5000${img}`
//       )
//     : ["https://via.placeholder.com/500"];

//   return (
//     <div className="p-4 sm:p-6 max-w-6xl mx-auto
//                     grid grid-cols-1 md:grid-cols-2 gap-8">

//       {/* IMAGE SLIDER */}
//       <div className="bg-white/60 backdrop-blur-md
//                       border border-[#E3BFC3]
//                       rounded-2xl p-3 shadow-sm">

//         <img
//           src={images[currentImage]}
//           alt={product.name}
//           className="w-full rounded-xl transition-all duration-300"
//         />

//         {/* ✅ Arrows */}
//         {images.length > 1 && (
//           <div className="flex justify-between mt-3">
//             <button
//               onClick={() =>
//                 setCurrentImage((prev) =>
//                   prev === 0 ? images.length - 1 : prev - 1
//                 )
//               }
//               className="px-3 py-1 bg-[#DD7A83] text-white rounded-lg"
//             >
//               ◀
//             </button>

//             <button
//               onClick={() =>
//                 setCurrentImage((prev) =>
//                   prev === images.length - 1 ? 0 : prev + 1
//                 )
//               }
//               className="px-3 py-1 bg-[#DD7A83] text-white rounded-lg"
//             >
//               ▶
//             </button>
//           </div>
//         )}

//         {/* ✅ Thumbnails */}
//         {images.length > 1 && (
//           <div className="flex gap-2 mt-3 flex-wrap">
//             {images.map((img, i) => (
//               <img
//                 key={i}
//                 src={img}
//                 onClick={() => setCurrentImage(i)}
//                 className={`w-16 h-16 object-cover rounded-lg cursor-pointer border ${
//                   currentImage === i
//                     ? "border-[#DD7A83]"
//                     : "border-gray-200"
//                 }`}
//                 alt="thumb"
//               />
//             ))}
//           </div>
//         )}
//       </div>

//       {/* DETAILS */}
//       <div className="bg-white/60 backdrop-blur-md
//                       border border-[#E3BFC3]
//                       rounded-2xl p-5 shadow-sm">

//         <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
//           {product.name}
//         </h2>

//         <p className="text-gray-600 mt-3">
//           {product.description}
//         </p>

//         <p className="text-xl sm:text-2xl font-semibold mt-4 text-[#DD7A83]">
//           ₹{product.price}
//         </p>

//         {/* SIZE */}
//         {product.sizes?.length > 0 && (
//           <div className="mt-5">
//             <h4 className="font-semibold mb-2 text-gray-800">
//               Select Size:
//             </h4>

//             <div className="flex gap-2 flex-wrap">
//               {product.sizes.map((size, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setSelectedSize(size)}
//                   className={`px-3 py-1.5 border rounded-xl text-sm transition ${
//                     selectedSize === size
//                       ? "bg-[#DD7A83] text-white border-[#DD7A83]"
//                       : "border-[#DD7A83] text-[#DD7A83] hover:bg-[#f9e4e7]"
//                   }`}
//                 >
//                   {size}
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* COLORS */}
//         {product.colors?.length > 0 && (
//           <div className="mt-5">
//             <h4 className="font-semibold mb-2 text-gray-800">
//               Select Color:
//             </h4>

//             <div className="flex gap-2 flex-wrap">
//               {product.colors.map((color, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setSelectedColor(color)}
//                   className={`px-3 py-1.5 border rounded-xl text-sm transition ${
//                     selectedColor === color
//                       ? "bg-[#DD7A83] text-white border-[#DD7A83]"
//                       : "border-[#DD7A83] text-[#DD7A83] hover:bg-[#f9e4e7]"
//                   }`}
//                 >
//                   {color}
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* STOCK */}
//         <p className="mt-5 text-sm text-gray-500">
//           Stock: <span className="font-medium">{product.stock}</span>
//         </p>

//         {/* ADD TO CART */}
//         <button
//           onClick={() => {
//             if (product.sizes?.length > 0 && !selectedSize) {
//               alert("Please select size");
//               return;
//             }

//             if (product.colors?.length > 0 && !selectedColor) {
//               alert("Please select color");
//               return;
//             }

//             addToCart({
//               ...product,
//               selectedSize,
//               selectedColor,
//             });
//           }}
//           disabled={product.stock === 0}
//           className={`mt-6 w-full sm:w-auto px-8 py-3 rounded-xl 
//                       text-white shadow-md transition ${
//             product.stock === 0
//               ? "bg-gray-400"
//               : "bg-[#DD7A83] hover:bg-[#c9656e]"
//           }`}
//         >
//           {product.stock === 0 ? "Out of Stock" : "Add to Cart 🛒"}
//         </button>

//       </div>
//     </div>
//   );
// };

// export default ProductDetails;







import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/productApi";
import { useCart } from "../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await getProductById(id);
        setProduct(data.data);

        setSelectedSize("");
        setSelectedColor("");
        setCurrentImage(0);

      } catch (error) {
        console.error("Error fetching product", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <p className="text-center p-10 text-gray-600">
        Loading product...
      </p>
    );
  }

  if (!product) {
    return (
      <p className="text-center p-10 text-gray-600">
        Product not found
      </p>
    );
  }

  // ✅ Normalize images
  const images = product.images?.length
    ? product.images.map((img) =>
        img.startsWith("http")
          ? img
          : `http://localhost:5000${img}`
      )
    : ["https://via.placeholder.com/500"];

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto
                    grid grid-cols-1 md:grid-cols-2 gap-8">

      {/* IMAGE SLIDER */}
      <div className="bg-white/60 backdrop-blur-md
                      border border-[#E3BFC3]
                      rounded-2xl p-3 shadow-sm">

        <img
          src={images[currentImage]}
          alt={product.name}
          className="w-full rounded-xl transition-all duration-300"
        />

        {images.length > 1 && (
          <div className="flex justify-between mt-3">
            <button
              onClick={() =>
                setCurrentImage((prev) =>
                  prev === 0 ? images.length - 1 : prev - 1
                )
              }
              className="px-3 py-1 bg-[#DD7A83] text-white rounded-lg"
            >
              ◀
            </button>

            <button
              onClick={() =>
                setCurrentImage((prev) =>
                  prev === images.length - 1 ? 0 : prev + 1
                )
              }
              className="px-3 py-1 bg-[#DD7A83] text-white rounded-lg"
            >
              ▶
            </button>
          </div>
        )}

        {images.length > 1 && (
          <div className="flex gap-2 mt-3 flex-wrap">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setCurrentImage(i)}
                className={`w-16 h-16 object-cover rounded-lg cursor-pointer border ${
                  currentImage === i
                    ? "border-[#DD7A83]"
                    : "border-gray-200"
                }`}
                alt="thumb"
              />
            ))}
          </div>
        )}
      </div>

      {/* DETAILS */}
      <div className="bg-white/60 backdrop-blur-md
                      border border-[#E3BFC3]
                      rounded-2xl p-5 shadow-sm">

        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          {product.name}
        </h2>

        <p className="text-gray-600 mt-3">
          {product.description}
        </p>

        {/* ✅ UPDATED PRICE SECTION */}
        <p className="text-xl sm:text-2xl font-semibold mt-4">
          {product.discountPercent > 0 ? (
            <>
              <span className="text-gray-400 line-through mr-3 text-lg">
                ₹{product.price}
              </span>

              <span className="text-[#DD7A83]">
                ₹{product.discountedPrice}
              </span>

              <span className="ml-2 text-sm bg-black text-white px-2 py-1 rounded-lg">
                {product.discountPercent}% OFF
              </span>
            </>
          ) : (
            <span className="text-[#DD7A83]">
              ₹{product.price}
            </span>
          )}
        </p>

        {/* SIZE */}
        {product.sizes?.length > 0 && (
          <div className="mt-5">
            <h4 className="font-semibold mb-2 text-gray-800">
              Select Size:
            </h4>

            <div className="flex gap-2 flex-wrap">
              {product.sizes.map((size, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1.5 border rounded-xl text-sm transition ${
                    selectedSize === size
                      ? "bg-[#DD7A83] text-white border-[#DD7A83]"
                      : "border-[#DD7A83] text-[#DD7A83] hover:bg-[#f9e4e7]"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* COLORS */}
        {product.colors?.length > 0 && (
          <div className="mt-5">
            <h4 className="font-semibold mb-2 text-gray-800">
              Select Color:
            </h4>

            <div className="flex gap-2 flex-wrap">
              {product.colors.map((color, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedColor(color)}
                  className={`px-3 py-1.5 border rounded-xl text-sm transition ${
                    selectedColor === color
                      ? "bg-[#DD7A83] text-white border-[#DD7A83]"
                      : "border-[#DD7A83] text-[#DD7A83] hover:bg-[#f9e4e7]"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STOCK */}
        <p className="mt-5 text-sm text-gray-500">
          Stock: <span className="font-medium">{product.stock}</span>
        </p>

        {/* ADD TO CART */}
        <button
          onClick={() => {
            if (product.sizes?.length > 0 && !selectedSize) {
              alert("Please select size");
              return;
            }

            if (product.colors?.length > 0 && !selectedColor) {
              alert("Please select color");
              return;
            }

            addToCart({
              ...product,
              selectedSize,
              selectedColor,
            });
          }}
          disabled={product.stock === 0}
          className={`mt-6 w-full sm:w-auto px-8 py-3 rounded-xl 
                      text-white shadow-md transition ${
            product.stock === 0
              ? "bg-gray-400"
              : "bg-[#DD7A83] hover:bg-[#c9656e]"
          }`}
        >
          {product.stock === 0 ? "Out of Stock" : "Add to Cart 🛒"}
        </button>

      </div>
    </div>
  );
};

export default ProductDetails;