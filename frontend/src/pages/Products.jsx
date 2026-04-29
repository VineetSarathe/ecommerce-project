// import { useEffect, useState } from "react";
// import { getProducts } from "../services/productApi";
// import ProductCard from "../components/ProductCard";

// const Products = () => {
//   const [products, setProducts] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [category, setCategory] = useState("all");
//   const [maxPrice, setMaxPrice] = useState("");

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const { data } = await getProducts();
//         setProducts(data.data);
//         setFiltered(data.data);
//       } catch (error) {
//         console.error("Error fetching products", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   useEffect(() => {
//     let temp = [...products];

//     if (category !== "all") {
//       temp = temp.filter((p) => p.category === category);
//     }

//     if (maxPrice) {
//       temp = temp.filter((p) => p.price <= Number(maxPrice));
//     }

//     setFiltered(temp);
//   }, [category, maxPrice, products]);

//   if (loading) {
//     return (
//       <div className="text-center p-16 text-gray-500">
//         Loading products...
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gradient-to-b from-[#fff6f7] to-[#ffeef1] min-h-screen">

//       {/* ✅ HEADER */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
//         <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
//           Our Collection 👗
//         </h1>
//         <p className="text-sm text-gray-500 mt-1">
//           Discover your perfect style
//         </p>
//       </div>

//       {/* ✅ FILTER */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-5">
//         <div className="bg-white rounded-2xl shadow-sm border border-[#f1d4d7]
//                         p-4 flex flex-wrap gap-3 items-center">

//           <select
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             className="border border-[#E3BFC3] px-3 py-2 rounded-xl text-sm"
//           >
//             <option value="all">All Categories</option>
//             <option value="kurti">Kurti</option>
//             <option value="dress">Dress</option>
//             <option value="jeans">Jeans</option>
//             <option value="tops">Tops</option>
//             <option value="saree">Saree</option>
//           </select>

//           <input
//             type="number"
//             placeholder="Max Price ₹"
//             value={maxPrice}
//             onChange={(e) => setMaxPrice(e.target.value)}
//             className="border border-[#E3BFC3] px-3 py-2 rounded-xl text-sm w-36"
//           />

//           <button
//             onClick={() => {
//               setCategory("all");
//               setMaxPrice("");
//             }}
//             className="px-4 py-2 rounded-xl text-sm bg-gray-100"
//           >
//             Reset
//           </button>

//           <div className="ml-auto text-sm text-gray-500 font-medium">
//             {filtered.length} products
//           </div>
//         </div>
//       </div>

//       {/* ✅ GRID */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">

//         {filtered.length === 0 ? (
//           <div className="text-center py-20 text-gray-500">
//             No products found 😔
//           </div>
//         ) : (
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">

//             {filtered.map((product) => (
//               <div
//                 key={product._id}
//                 className="relative bg-white rounded-2xl shadow-sm
//                            hover:shadow-lg hover:-translate-y-1
//                            transition duration-300 overflow-hidden"
//               >
//                 <ProductCard product={product} />

//                 {/* ✅ Badges only */}
//                 <div className="absolute top-2 left-2 flex gap-2">
//                   {product.stock === 0 && (
//                     <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-lg">
//                       Out of Stock
//                     </span>
//                   )}

//                   {product.isNew && (
//                     <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-lg">
//                       New
//                     </span>
//                   )}
//                 </div>

//               </div>
//             ))}

//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Products;







// import { useEffect, useState } from "react";
// import { getProducts } from "../services/productApi";
// import ProductCard from "../components/ProductCard";
// import { SlidersHorizontal, X } from "lucide-react";

// const Products = () => {
//   const [products, setProducts] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [category, setCategory] = useState("all");
//   const [priceRange, setPriceRange] = useState("all");

//   const [showFilters, setShowFilters] = useState(false);

//   // ✅ FETCH PRODUCTS
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const { data } = await getProducts();
//         setProducts(data.data);
//         setFiltered(data.data);
//       } catch (error) {
//         console.error("Error fetching products", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   // ✅ FILTER LOGIC
//   useEffect(() => {
//     let temp = [...products];

//     if (category !== "all") {
//       temp = temp.filter((p) => p.category === category);
//     }

//     if (priceRange !== "all") {
//       if (priceRange === "500-1000") {
//         temp = temp.filter((p) => p.price >= 500 && p.price <= 1000);
//       }

//       if (priceRange === "1000-1500") {
//         temp = temp.filter((p) => p.price > 1000 && p.price <= 1500);
//       }

//       if (priceRange === "1500-2000") {
//         temp = temp.filter((p) => p.price > 1500 && p.price <= 2000);
//       }

//       if (priceRange === "2000+") {
//         temp = temp.filter((p) => p.price > 2000);
//       }
//     }

//     setFiltered(temp);
//   }, [category, priceRange, products]);

//   if (loading) {
//     return (
//       <div className="text-center p-16 text-gray-500">
//         Loading products...
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gradient-to-b from-[#fff6f7] to-[#ffeef1] min-h-screen">

//       {/* ✅ HEADER (UNCHANGED STYLE) */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
//         <div className="flex items-center justify-between flex-wrap gap-2">

//           <div>
//             <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
//               Our Collection 👗
//             </h1>
//             <p className="text-sm text-gray-500 mt-1">
//               Discover your perfect style
//             </p>
//           </div>

//           {/* ✅ FILTER BUTTON (THEME SAFE) */}
//           <button
//             onClick={() => setShowFilters(true)}
//             className="flex items-center gap-2
//                        px-4 py-2 rounded-xl
//                        border border-[#E3BFC3]
//                        bg-white/80 backdrop-blur
//                        hover:bg-white hover:shadow-sm
//                        transition text-sm"
//           >
//             <SlidersHorizontal size={18} />
//             Filters
//           </button>
//         </div>
//       </div>

//       {/* ✅ FILTER SUMMARY BAR */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-3">
//         <div className="flex flex-wrap gap-2 text-xs sm:text-sm">

//           {category !== "all" && (
//             <span className="bg-[#ffe4e8] text-[#DD7A83]
//                              px-3 py-1 rounded-full">
//               {category}
//             </span>
//           )}

//           {priceRange !== "all" && (
//             <span className="bg-[#ffe4e8] text-[#DD7A83]
//                              px-3 py-1 rounded-full">
//               {priceRange}
//             </span>
//           )}

//           <span className="ml-auto text-gray-500">
//             {filtered.length} products
//           </span>
//         </div>
//       </div>

//       {/* ✅ GRID (UNCHANGED) */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">

//         {filtered.length === 0 ? (
//           <div className="text-center py-20 text-gray-500">
//             No products found 😔
//           </div>
//         ) : (
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">

//             {filtered.map((product) => (
//               <div
//                 key={product._id}
//                 className="relative bg-white rounded-2xl shadow-sm
//                            hover:shadow-lg hover:-translate-y-1
//                            transition duration-300 overflow-hidden"
//               >
//                 <ProductCard product={product} />
//               </div>
//             ))}

//           </div>
//         )}
//       </div>

//       {/* ================= FILTER DRAWER ================= */}

//       {/* ✅ OVERLAY */}
//       {showFilters && (
//         <div
//           className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
//           onClick={() => setShowFilters(false)}
//         />
//       )}

//       {/* ✅ DRAWER */}
//       <div
//         className={`fixed top-0 left-0 h-full w-[280px]
//                     bg-white shadow-2xl z-50
//                     transform transition-transform duration-300
//                     ${showFilters ? "translate-x-0" : "-translate-x-full"}`}
//       >
//         {/* HEADER */}
//         <div className="flex items-center justify-between p-4 border-b">
//           <h2 className="font-bold text-lg text-gray-800">
//             Filters
//           </h2>

//           <button onClick={() => setShowFilters(false)}>
//             <X size={20} />
//           </button>
//         </div>

//         {/* CONTENT */}
//         <div className="p-4 space-y-6 text-sm">

//           {/* CATEGORY */}
//           <div>
//             <h3 className="font-semibold mb-2 text-gray-700">
//               Category
//             </h3>

//             <div className="space-y-2">
//               {["all", "kurti", "dress", "jeans", "tops", "saree"].map((cat) => (
//                 <label key={cat} className="flex items-center gap-2 cursor-pointer">
//                   <input
//                     type="radio"
//                     checked={category === cat}
//                     onChange={() => setCategory(cat)}
//                     className="accent-[#DD7A83]"
//                   />
//                   <span className="capitalize">
//                     {cat === "all" ? "All Categories" : cat}
//                   </span>
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* PRICE */}
//           <div>
//             <h3 className="font-semibold mb-2 text-gray-700">
//               Price Range
//             </h3>

//             <div className="space-y-2">
//               {[
//                 { value: "all", label: "All Prices" },
//                 { value: "500-1000", label: "₹500 – ₹1000" },
//                 { value: "1000-1500", label: "₹1000 – ₹1500" },
//                 { value: "1500-2000", label: "₹1500 – ₹2000" },
//                 { value: "2000+", label: "Above ₹2000" },
//               ].map((range) => (
//                 <label key={range.value} className="flex items-center gap-2 cursor-pointer">
//                   <input
//                     type="radio"
//                     checked={priceRange === range.value}
//                     onChange={() => setPriceRange(range.value)}
//                     className="accent-[#DD7A83]"
//                   />
//                   {range.label}
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* RESET */}
//           <button
//             onClick={() => {
//               setCategory("all");
//               setPriceRange("all");
//             }}
//             className="w-full bg-[#ffe4e8] text-[#DD7A83]
//                        py-2 rounded-xl font-medium
//                        hover:bg-[#ffd6dc] transition"
//           >
//             Reset Filters
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Products;

















import { useEffect, useState } from "react";
import { getProducts } from "../services/productApi";
import ProductCard from "../components/ProductCard";
import { SlidersHorizontal, X } from "lucide-react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await getProducts();
        setProducts(data.data);
        setFiltered(data.data);
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let temp = [...products];
    if (category !== "all") temp = temp.filter((p) => p.category === category);
    if (priceRange === "500-1000") temp = temp.filter((p) => p.price >= 500 && p.price <= 1000);
    else if (priceRange === "1000-1500") temp = temp.filter((p) => p.price > 1000 && p.price <= 1500);
    else if (priceRange === "1500-2000") temp = temp.filter((p) => p.price > 1500 && p.price <= 2000);
    else if (priceRange === "2000+") temp = temp.filter((p) => p.price > 2000);
    setFiltered(temp);
  }, [category, priceRange, products]);

  if (loading) {
    return (
      <div style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        fontFamily: "'Jost', sans-serif",
        background: "#fdf6f7",
      }}>
        <div style={{
          width: "36px", height: "36px", borderRadius: "50%",
          border: "2px solid #f0d8db",
          borderTop: "2px solid #c9626b",
          animation: "rs-spin 0.8s linear infinite",
        }} />
        <p style={{ fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#a06068", fontWeight: 400 }}>
          Loading Collection
        </p>
        <style>{`@keyframes rs-spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const activeFilters = [
    category !== "all" && { key: "cat", label: category },
    priceRange !== "all" && { key: "price", label: `₹${priceRange}` },
  ].filter(Boolean);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Jost:wght@300;400;500&display=swap');
        .pg-cormorant { font-family: 'Cormorant Garamond', Georgia, serif; }
        .pg-jost      { font-family: 'Jost', 'Helvetica Neue', sans-serif; }

        /* Filter button */
        .pg-filter-btn {
          display: inline-flex; align-items: center; gap: 0.5rem;
          font-family: 'Jost', sans-serif;
          font-size: 0.62rem; font-weight: 500;
          letter-spacing: 0.2em; text-transform: uppercase;
          padding: 0.65rem 1.4rem;
          border: 1px solid #e8c8cc;
          background: #fff;
          color: #5c2e34;
          cursor: pointer;
          transition: all 0.25s ease;
          position: relative; overflow: hidden;
        }
        .pg-filter-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: #faeef0;
          transform: scaleX(0); transform-origin: right;
          transition: transform 0.3s ease;
        }
        .pg-filter-btn:hover::before { transform: scaleX(1); transform-origin: left; }
        .pg-filter-btn span { position: relative; z-index: 1; }

        /* Active chip */
        .pg-chip {
          display: inline-flex; align-items: center; gap: 0.4rem;
          font-family: 'Jost', sans-serif;
          font-size: 0.58rem; font-weight: 500;
          letter-spacing: 0.15em; text-transform: uppercase;
          padding: 0.3rem 0.75rem;
          background: #faeef0;
          color: #b0474f;
          border: 1px solid #e8c8cc;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        .pg-chip:hover { background: #f5e0e3; }

        /* Drawer */
        .pg-drawer {
          position: fixed; top: 0; left: 0;
          height: 100%; width: 290px;
          background: #fff;
          z-index: 50;
          transform: translateX(-100%);
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1);
          border-right: 1px solid #f0d8db;
          box-shadow: 8px 0 40px rgba(42,18,21,0.10);
          display: flex; flex-direction: column;
        }
        .pg-drawer.open { transform: translateX(0); }

        /* Radio custom */
        .pg-radio-label {
          display: flex; align-items: center; gap: 0.65rem;
          cursor: pointer; padding: 0.4rem 0;
          font-family: 'Jost', sans-serif;
          font-size: 0.75rem; font-weight: 300;
          color: #5c2e34; letter-spacing: 0.03em;
          transition: color 0.2s ease;
        }
        .pg-radio-label:hover { color: #c9626b; }

        .pg-radio-dot {
          width: 16px; height: 16px; border-radius: 50%;
          border: 1.5px solid #e8c8cc;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: border-color 0.2s ease;
        }
        .pg-radio-dot.active {
          border-color: #c9626b;
        }
        .pg-radio-dot.active::after {
          content: '';
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #c9626b;
          display: block;
        }

        /* Reset button */
        .pg-reset-btn {
          width: 100%;
          font-family: 'Jost', sans-serif;
          font-size: 0.6rem; font-weight: 500;
          letter-spacing: 0.22em; text-transform: uppercase;
          padding: 0.85rem;
          border: 1px solid #e8c8cc;
          background: transparent;
          color: #7a3d43;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .pg-reset-btn:hover { background: #faeef0; border-color: #c9626b; color: #c9626b; }

        /* Empty state */
        .pg-empty {
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          min-height: 40vh; gap: 0.75rem;
          font-family: 'Jost', sans-serif;
        }
      `}</style>

      <div className="pg-jost" style={{ background: "linear-gradient(160deg, #f7e8eb 0%, #fdf6f7 40%, #fff 100%)", minHeight: "100vh" }}>

        {/* ── Page Header ── */}
        <div style={{ maxWidth: "1300px", margin: "0 auto", padding: "2.5rem 1.5rem 0" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>

            {/* Title */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.5rem" }}>
                <span style={{ display: "block", height: "1px", width: "1.8rem", background: "#c9626b", opacity: 0.55 }} />
                <span style={{ fontSize: "0.58rem", fontWeight: 500, letterSpacing: "0.3em", textTransform: "uppercase", color: "#c9626b" }}>
                  RoopSwaroop
                </span>
              </div>
              <h1
                className="pg-cormorant"
                style={{ margin: 0, fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 500, color: "#1a0a0c", lineHeight: 1, letterSpacing: "-0.01em" }}
              >
                Our <em style={{ fontStyle: "italic", color: "#c9626b", fontWeight: 400 }}>Collection</em>
              </h1>
              <p style={{ margin: "0.4rem 0 0", fontSize: "0.75rem", fontWeight: 300, color: "#7a3d43", letterSpacing: "0.04em" }}>
                Discover your perfect style
              </p>
            </div>

            {/* Filter button */}
            <button className="pg-filter-btn" onClick={() => setShowFilters(true)}>
              <SlidersHorizontal size={13} style={{ position: "relative", zIndex: 1 }} />
              <span>Filters</span>
            </button>
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: "linear-gradient(to right, #e8c8cc, transparent)", margin: "1.5rem 0 1rem" }} />

          {/* Filter summary bar */}
          <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "0.5rem", minHeight: "2rem" }}>
            {activeFilters.map((f) => (
              <span
                key={f.key}
                className="pg-chip"
                onClick={() => {
                  if (f.key === "cat") setCategory("all");
                  if (f.key === "price") setPriceRange("all");
                }}
              >
                {f.label} ×
              </span>
            ))}
            {activeFilters.length === 0 && (
              <span style={{ fontSize: "0.62rem", color: "#b8898e", fontWeight: 300, letterSpacing: "0.08em" }}>
                All products
              </span>
            )}
            <span style={{ marginLeft: "auto", fontSize: "0.65rem", fontWeight: 400, color: "#8c5058", letterSpacing: "0.08em" }}>
              {filtered.length} items
            </span>
          </div>
        </div>

        {/* ── Product Grid ── */}
        <div style={{ maxWidth: "1300px", margin: "0 auto", padding: "1.5rem 1.5rem 4rem" }}>
          {filtered.length === 0 ? (
            <div className="pg-empty">
              <div style={{
                width: "52px", height: "52px", borderRadius: "50%",
                background: "linear-gradient(135deg, #f7e8eb, #f0d0d5)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.4rem",
              }}>
                🪡
              </div>
              <p style={{ fontSize: "0.85rem", fontWeight: 300, color: "#7a3d43", letterSpacing: "0.05em" }}>
                No products found
              </p>
              <button
                onClick={() => { setCategory("all"); setPriceRange("all"); }}
                style={{
                  fontSize: "0.58rem", fontWeight: 500, letterSpacing: "0.2em",
                  textTransform: "uppercase", color: "#c9626b",
                  background: "none", border: "none", cursor: "pointer",
                  borderBottom: "1px solid #c9626b", paddingBottom: "2px",
                }}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
              gap: "1rem",
            }}>
              {filtered.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Overlay ── */}
      {showFilters && (
        <div
          onClick={() => setShowFilters(false)}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(42,18,21,0.25)",
            backdropFilter: "blur(4px)",
            zIndex: 40,
          }}
        />
      )}

      {/* ── Filter Drawer ── */}
      <div className={`pg-drawer ${showFilters ? "open" : ""}`}>

        {/* Drawer header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "1.5rem 1.25rem 1.25rem",
          borderBottom: "1px solid #f0d8db",
        }}>
          <div>
            <p style={{ margin: 0, fontSize: "0.55rem", fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: "#c9626b", marginBottom: "0.25rem" }}>
              Refine
            </p>
            <h2 className="pg-cormorant" style={{ margin: 0, fontSize: "1.4rem", fontWeight: 500, color: "#1a0a0c" }}>
              Filters
            </h2>
          </div>
          <button
            onClick={() => setShowFilters(false)}
            style={{
              width: "32px", height: "32px", borderRadius: "50%",
              border: "1px solid #f0d8db", background: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "#7a3d43",
              transition: "background 0.2s ease",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#faeef0"}
            onMouseLeave={e => e.currentTarget.style.background = "#fff"}
          >
            <X size={14} />
          </button>
        </div>

        {/* Drawer body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem 1.25rem" }}>

          {/* Category */}
          <div style={{ marginBottom: "2rem" }}>
            <p style={{ margin: "0 0 0.9rem", fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.25em", textTransform: "uppercase", color: "#7a3d43" }}>
              Category
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.1rem" }}>
              {["all", "kurti", "dress", "jeans", "tops", "saree"].map((cat) => (
                <label key={cat} className="pg-radio-label" onClick={() => setCategory(cat)}>
                  <div className={`pg-radio-dot ${category === cat ? "active" : ""}`} />
                  <span style={{ fontWeight: category === cat ? 500 : 300, color: category === cat ? "#c9626b" : "#5c2e34" }}>
                    {cat === "all" ? "All Categories" : cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: "#f0d8db", marginBottom: "2rem" }} />

          {/* Price */}
          <div style={{ marginBottom: "2rem" }}>
            <p style={{ margin: "0 0 0.9rem", fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.25em", textTransform: "uppercase", color: "#7a3d43" }}>
              Price Range
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.1rem" }}>
              {[
                { value: "all", label: "All Prices" },
                { value: "500-1000", label: "₹500 – ₹1,000" },
                { value: "1000-1500", label: "₹1,000 – ₹1,500" },
                { value: "1500-2000", label: "₹1,500 – ₹2,000" },
                { value: "2000+", label: "Above ₹2,000" },
              ].map((range) => (
                <label key={range.value} className="pg-radio-label" onClick={() => setPriceRange(range.value)}>
                  <div className={`pg-radio-dot ${priceRange === range.value ? "active" : ""}`} />
                  <span style={{ fontWeight: priceRange === range.value ? 500 : 300, color: priceRange === range.value ? "#c9626b" : "#5c2e34" }}>
                    {range.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Drawer footer */}
        <div style={{ padding: "1rem 1.25rem 1.5rem", borderTop: "1px solid #f0d8db" }}>
          <button
            className="pg-reset-btn"
            onClick={() => { setCategory("all"); setPriceRange("all"); }}
          >
            Reset All Filters
          </button>
        </div>
      </div>
    </>
  );
};

export default Products;