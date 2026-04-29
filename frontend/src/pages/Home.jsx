// const Home = () => {
//   return (
//     <div className="p-6 text-center">
//       <h1 className="text-3xl font-bold">Girls Clothing Store 👗</h1>
//       <p className="mt-2 text-gray-600">Single Brand Fashion</p>
//     </div>
//   );
// };

// export default Home;









// import { Link } from "react-router-dom";

// import Hero from "../components/Hero";

// const Home = () => {
//   return (
//     <div className="bg-gradient-to-b from-[#fdf2f4] to-white">

//       {/* ✅ HERO SECTION */}
//       <Hero />

//       {/* ✅ PROMO / BANNER */}
//       <section className="mx-4 sm:mx-6 lg:mx-10 mb-12 mt-10">

//         <div className="bg-gradient-to-r from-[#E3BFC3] to-[#DD7A83]
//                         rounded-3xl p-6 sm:p-10 text-center text-white shadow-md">

//           <h3 className="text-lg sm:text-2xl font-bold">
//             New Season Arrivals 🌸
//           </h3>

//           <p className="mt-2 text-sm sm:text-base text-white/90">
//             Discover fresh styles curated just for you
//           </p>

//           <Link to="/products">
//             <button className="mt-4 bg-white text-[#DD7A83]
//                                px-5 py-2 rounded-xl
//                                text-sm font-semibold
//                                hover:bg-gray-100 transition">
//               Explore Now →
//             </button>
//           </Link>

//         </div>
//       </section>

//       {/* ✅ WHY CHOOSE US */}
//       <section className="px-4 sm:px-6 lg:px-10 pb-16">

//         <h2 className="text-lg sm:text-2xl font-bold text-gray-800 mb-6 text-center">
//           Why Choose Us ✨
//         </h2>

//         <div className="grid sm:grid-cols-3 gap-4">

//           <div className="bg-white rounded-2xl shadow-sm p-5 text-center">
//             <p className="font-semibold text-gray-800">
//               Premium Quality 💎
//             </p>
//             <p className="text-sm text-gray-600 mt-1">
//               Handpicked fabrics & designs
//             </p>
//           </div>

//           <div className="bg-white rounded-2xl shadow-sm p-5 text-center">
//             <p className="font-semibold text-gray-800">
//               Trendy Styles 🔥
//             </p>
//             <p className="text-sm text-gray-600 mt-1">
//               Latest fashion collections
//             </p>
//           </div>

//           <div className="bg-white rounded-2xl shadow-sm p-5 text-center">
//             <p className="font-semibold text-gray-800">
//               Fast Delivery 🚚
//             </p>
//             <p className="text-sm text-gray-600 mt-1">
//               Quick & safe shipping
//             </p>
//           </div>

//         </div>
//       </section>

//     </div>
//   );
// };

// export default Home;









// import { Link } from "react-router-dom";
// import Hero from "../components/Hero";
// import Products from "./Products";

// const Home = () => {
//   return (
//     <div style={{ fontFamily: "'Jost', 'Helvetica Neue', sans-serif", background: "#fdf6f7" }}>

//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Jost:wght@300;400;500&display=swap');

//         .home-cormorant { font-family: 'Cormorant Garamond', Georgia, serif; }
//         .home-jost      { font-family: 'Jost', 'Helvetica Neue', sans-serif; }

//         /* Promo banner */
//         .promo-banner {
//           background: linear-gradient(118deg, #c9626b 0%, #d4787f 40%, #e0969b 75%, #e8b5b9 100%);
//           position: relative;
//           overflow: hidden;
//         }

//         .promo-banner::before {
//           content: '';
//           position: absolute;
//           inset: 0;
//           background-image: repeating-linear-gradient(
//             -45deg, transparent, transparent 40px,
//             rgba(255,255,255,0.04) 40px, rgba(255,255,255,0.04) 41px
//           );
//         }

//         .promo-banner::after {
//           content: '';
//           position: absolute;
//           top: -60%;
//           right: -10%;
//           width: 420px;
//           height: 420px;
//           border-radius: 50%;
//           background: radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 65%);
//           pointer-events: none;
//         }

//         .promo-btn {
//           font-family: 'Jost', sans-serif;
//           font-size: 0.62rem;
//           font-weight: 500;
//           letter-spacing: 0.22em;
//           text-transform: uppercase;
//           color: #c9626b;
//           background: #fff;
//           border: none;
//           padding: 0.75rem 2rem;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           display: inline-block;
//           text-decoration: none;
//         }

//         .promo-btn:hover {
//           background: #fdf0f1;
//           transform: translateY(-1px);
//           box-shadow: 0 8px 24px rgba(42,18,21,0.12);
//         }

//         /* Feature cards */
//         .feature-card {
//           background: #ffffff;
//           border: 1px solid #f0d8db;
//           transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
//           box-shadow: 0 2px 10px rgba(42,18,21,0.05);
//         }

//         .feature-card:hover {
//           transform: translateY(-4px);
//           box-shadow: 0 12px 32px rgba(42,18,21,0.09);
//           border-color: #e0b8bc;
//         }

//         .feature-icon {
//           width: 48px;
//           height: 48px;
//           border-radius: 50%;
//           background: linear-gradient(135deg, #f7e8eb, #f0d0d5);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           margin: 0 auto 1rem;
//           font-size: 1.25rem;
//         }
//       `}</style>

//       {/* ── Hero ── */}
//       <Hero />

//       {/* ── Promo Banner ── */}
//       <section style={{ padding: "2.5rem 1.5rem 0" }}>
//         <div
//           className="promo-banner"
//           style={{ borderRadius: "16px", padding: "2.5rem 2rem", textAlign: "center" }}
//         >
//           {/* Inner content above pseudo-elements */}
//           <div style={{ position: "relative", zIndex: 2 }}>

//             <p
//               className="home-jost"
//               style={{
//                 fontSize: "0.6rem",
//                 fontWeight: 500,
//                 letterSpacing: "0.32em",
//                 textTransform: "uppercase",
//                 color: "rgba(255,255,255,0.75)",
//                 marginBottom: "0.6rem",
//               }}
//             >
//               Limited Time
//             </p>

//             <h3
//               className="home-cormorant"
//               style={{
//                 fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
//                 fontWeight: 500,
//                 fontStyle: "italic",
//                 color: "#fff",
//                 lineHeight: 1.1,
//                 margin: "0 0 0.5rem",
//                 letterSpacing: "-0.01em",
//               }}
//             >
//               New Season Arrivals
//             </h3>

//             <p
//               className="home-jost"
//               style={{
//                 fontSize: "0.8rem",
//                 fontWeight: 300,
//                 color: "rgba(255,255,255,0.85)",
//                 marginBottom: "1.75rem",
//                 letterSpacing: "0.03em",
//               }}
//             >
//               Discover fresh styles curated just for you
//             </p>

//             <Link to="/products" className="promo-btn">
//               Explore Now →
//             </Link>

//           </div>
//         </div>
//       </section>

//       <Products/>

//       {/* ── Why Choose Us ── */}
//       <section style={{ padding: "3.5rem 1.5rem 4rem" }}>

//         {/* Section heading */}
//         <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
//           <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
//             <span style={{ display: "block", height: "1px", width: "2rem", background: "#c9626b", opacity: 0.5 }} />
//             <span
//               className="home-jost"
//               style={{ fontSize: "0.58rem", letterSpacing: "0.32em", textTransform: "uppercase", color: "#c9626b", fontWeight: 500 }}
//             >
//               Our Promise
//             </span>
//             <span style={{ display: "block", height: "1px", width: "2rem", background: "#c9626b", opacity: 0.5 }} />
//           </div>

//           <h2
//             className="home-cormorant"
//             style={{
//               fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
//               fontWeight: 500,
//               color: "#1a0a0c",
//               margin: 0,
//               letterSpacing: "-0.01em",
//               lineHeight: 1.1,
//             }}
//           >
//             Why Choose <em style={{ color: "#c9626b", fontStyle: "italic" }}>Us</em>
//           </h2>
//         </div>

//         {/* Cards grid */}
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
//             gap: "1rem",
//             maxWidth: "900px",
//             margin: "0 auto",
//           }}
//         >
//           {[
//             { icon: "💎", title: "Premium Quality", desc: "Handpicked fabrics & designs crafted for elegance" },
//             { icon: "✨", title: "Trendy Styles", desc: "Latest fashion collections updated every season" },
//             { icon: "🚚", title: "Fast Delivery", desc: "Quick & safe shipping right to your door" },
//           ].map((item) => (
//             <div
//               key={item.title}
//               className="feature-card"
//               style={{ borderRadius: "12px", padding: "1.75rem 1.25rem", textAlign: "center" }}
//             >
//               <div className="feature-icon">{item.icon}</div>

//               <p
//                 className="home-cormorant"
//                 style={{
//                   fontSize: "1.05rem",
//                   fontWeight: 500,
//                   color: "#1a0a0c",
//                   margin: "0 0 0.4rem",
//                   letterSpacing: "0.01em",
//                 }}
//               >
//                 {item.title}
//               </p>

//               <p
//                 className="home-jost"
//                 style={{
//                   fontSize: "0.75rem",
//                   fontWeight: 300,
//                   color: "#7a3d43",
//                   margin: 0,
//                   lineHeight: 1.7,
//                   letterSpacing: "0.01em",
//                 }}
//               >
//                 {item.desc}
//               </p>

//               {/* Bottom accent line */}
//               <div
//                 style={{
//                   height: "2px",
//                   width: "2rem",
//                   background: "linear-gradient(to right, #c9626b, #e8b5b9)",
//                   margin: "1.1rem auto 0",
//                   borderRadius: "2px",
//                 }}
//               />
//             </div>
//           ))}
//         </div>

//       </section>

//     </div>
//   );
// };

// export default Home;



















import { useEffect, useState } from "react";
import { getProducts } from "../services/productApi";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import Products from "./Products";


const Home = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await getProducts();

        // ✅ ONLY FIRST 10 PRODUCTS
        setProducts(data.data.slice(0, 10));

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div style={{ fontFamily: "'Jost', 'Helvetica Neue', sans-serif", background: "#fdf6f7" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Jost:wght@300;400;500&display=swap');

        .home-cormorant { font-family: 'Cormorant Garamond', Georgia, serif; }
        .home-jost      { font-family: 'Jost', 'Helvetica Neue', sans-serif; }

        /* Promo banner */
        .promo-banner {
          background: linear-gradient(118deg, #c9626b 0%, #d4787f 40%, #e0969b 75%, #e8b5b9 100%);
          position: relative;
          overflow: hidden;
        }

        .promo-banner::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: repeating-linear-gradient(
            -45deg, transparent, transparent 40px,
            rgba(255,255,255,0.04) 40px, rgba(255,255,255,0.04) 41px
          );
        }

        .promo-banner::after {
          content: '';
          position: absolute;
          top: -60%;
          right: -10%;
          width: 420px;
          height: 420px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 65%);
          pointer-events: none;
        }

        .promo-btn {
          font-family: 'Jost', sans-serif;
          font-size: 0.62rem;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #c9626b;
          background: #fff;
          border: none;
          padding: 0.75rem 2rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-block;
          text-decoration: none;
        }

        .promo-btn:hover {
          background: #fdf0f1;
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(42,18,21,0.12);
        }

        /* Feature cards */
        .feature-card {
          background: #ffffff;
          border: 1px solid #f0d8db;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
          box-shadow: 0 2px 10px rgba(42,18,21,0.05);
        }

        .feature-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(42,18,21,0.09);
          border-color: #e0b8bc;
        }

        .feature-icon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f7e8eb, #f0d0d5);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
          font-size: 1.25rem;
        }
      `}</style>

      {/* ── Hero ── */}
      <Hero />

      {/* ✅ HOME PRODUCTS */}
<section style={{ padding: "3rem 1.5rem" }}>
  <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "1.5rem"
    }}>
      <h2 style={{ fontSize: "1.6rem", fontWeight: 500 }}>
        Featured Collection ✨
      </h2>

      <Link to="/products">
        <button style={{
          background: "none",
          border: "none",
          color: "#c9626b",
          cursor: "pointer",
          fontSize: "0.9rem",
          fontWeight: 500
        }}>
          View All →
        </button>
      </Link>
    </div>

    {loading ? (
      <p>Loading...</p>
    ) : (
      <>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {/* ✅ Bottom View All */}
        <div style={{
          textAlign: "center",
          marginTop: "2rem"
        }}>
          <Link to="/products">
            <button style={{
              background: "#c9626b",
              color: "white",
              border: "none",
              padding: "0.7rem 1.4rem",
              borderRadius: "999px",
              cursor: "pointer",
              fontSize: "0.9rem",
              fontWeight: 500,
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem"
            }}>
              View All Products
              <span>🛍️</span>
            </button>
          </Link>
        </div>
      </>
    )}

  </div>
</section>

      {/* ── Promo Banner ── */}
      <section style={{ padding: "2.5rem 1.5rem 0" }}>
        <div
          className="promo-banner"
          style={{ borderRadius: "16px", padding: "2.5rem 2rem", textAlign: "center" }}
        >
          {/* Inner content above pseudo-elements */}
          <div style={{ position: "relative", zIndex: 2 }}>

            <p
              className="home-jost"
              style={{
                fontSize: "0.6rem",
                fontWeight: 500,
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.75)",
                marginBottom: "0.6rem",
              }}
            >
              Limited Time
            </p>

            <h3
              className="home-cormorant"
              style={{
                fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
                fontWeight: 500,
                fontStyle: "italic",
                color: "#fff",
                lineHeight: 1.1,
                margin: "0 0 0.5rem",
                letterSpacing: "-0.01em",
              }}
            >
              New Season Arrivals
            </h3>

            <p
              className="home-jost"
              style={{
                fontSize: "0.8rem",
                fontWeight: 300,
                color: "rgba(255,255,255,0.85)",
                marginBottom: "1.75rem",
                letterSpacing: "0.03em",
              }}
            >
              Discover fresh styles curated just for you
            </p>

            <Link to="/products" className="promo-btn">
              Explore Now →
            </Link>

          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section style={{ padding: "3.5rem 1.5rem 4rem" }}>

        {/* Section heading */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
            <span style={{ display: "block", height: "1px", width: "2rem", background: "#c9626b", opacity: 0.5 }} />
            <span
              className="home-jost"
              style={{ fontSize: "0.58rem", letterSpacing: "0.32em", textTransform: "uppercase", color: "#c9626b", fontWeight: 500 }}
            >
              Our Promise
            </span>
            <span style={{ display: "block", height: "1px", width: "2rem", background: "#c9626b", opacity: 0.5 }} />
          </div>

          <h2
            className="home-cormorant"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
              fontWeight: 500,
              color: "#1a0a0c",
              margin: 0,
              letterSpacing: "-0.01em",
              lineHeight: 1.1,
            }}
          >
            Why Choose <em style={{ color: "#c9626b", fontStyle: "italic" }}>Us</em>
          </h2>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1rem",
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          {[
            { icon: "💎", title: "Premium Quality", desc: "Handpicked fabrics & designs crafted for elegance" },
            { icon: "✨", title: "Trendy Styles", desc: "Latest fashion collections updated every season" },
            // { icon: "🚚", title: "Fast Delivery", desc: "Quick & safe shipping right to your door" },
            { icon: "🚚", title: "Free Delivery", desc: "Enjoy free & safe shipping on all orders" },
          ].map((item) => (
            <div
              key={item.title}
              className="feature-card"
              style={{ borderRadius: "12px", padding: "1.75rem 1.25rem", textAlign: "center" }}
            >
              <div className="feature-icon">{item.icon}</div>

              <p
                className="home-cormorant"
                style={{
                  fontSize: "1.05rem",
                  fontWeight: 500,
                  color: "#1a0a0c",
                  margin: "0 0 0.4rem",
                  letterSpacing: "0.01em",
                }}
              >
                {item.title}
              </p>

              <p
                className="home-jost"
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 300,
                  color: "#7a3d43",
                  margin: 0,
                  lineHeight: 1.7,
                  letterSpacing: "0.01em",
                }}
              >
                {item.desc}
              </p>

              {/* Bottom accent line */}
              <div
                style={{
                  height: "2px",
                  width: "2rem",
                  background: "linear-gradient(to right, #c9626b, #e8b5b9)",
                  margin: "1.1rem auto 0",
                  borderRadius: "2px",
                }}
              />
            </div>
          ))}
        </div>

      </section>

    </div>
  );
};

export default Home;