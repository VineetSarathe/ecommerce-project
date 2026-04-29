// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { getOrderById } from "../services/orderApi";

// const InvoicePage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchOrder = async () => {
//       try {
//         const { data } = await getOrderById(id);

//         if (data.data.paymentStatus !== "paid") {
//           navigate("/orders");
//           return;
//         }

//         setOrder(data.data);
//       } catch (error) {
//         navigate("/orders");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrder();
//   }, [id]);

//   const formatCurrency = (amount) =>
//     new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//     }).format(amount);

//   if (loading) return <p className="text-center p-10">Loading invoice...</p>;
//   if (!order) return null;

//   return (
//     <div className="min-h-screen bg-gray-100 p-6 print:bg-white">

//       <div className="invoice-container max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-10 print:shadow-none print:p-0">

//         {/* Accent Strip */}
//         <div className="h-2 bg-[#DD7A83] rounded-t-xl mb-8 print:hidden"></div>

//         {/* Header */}
//         <div className="flex justify-between items-start mb-8">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-800">
//               Roopswaroop
//             </h1>
//             <p className="text-gray-500 text-sm">
//               Girls Clothing Store
//             </p>
//             <p className="text-gray-500 text-sm">
//               India
//             </p>
//           </div>

//           <div className="text-right">
//             <h2 className="text-xl font-semibold tracking-wide text-gray-700">
//               INVOICE
//             </h2>
//             <p className="text-sm text-gray-500">
//               Invoice #: INV-{order._id.slice(-6)}
//             </p>
//             <p className="text-sm text-gray-500">
//               {new Date(order.createdAt).toLocaleDateString()}
//             </p>

//             <span className="inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
//               PAID
//             </span>
//           </div>
//         </div>

//         <div className="border-t border-gray-200 mb-8"></div>

//         {/* Billing + Payment */}
//         <div className="grid grid-cols-2 gap-10 mb-10">
//           <div>
//             <h3 className="text-xs uppercase tracking-wider text-gray-400 mb-2">
//               Bill To
//             </h3>
//             <p className="font-medium text-gray-800">
//               {order.shippingAddress.fullName}
//             </p>
//             <p className="text-gray-600 text-sm">
//               {order.shippingAddress.address}
//             </p>
//             <p className="text-gray-600 text-sm">
//               {order.shippingAddress.city}, {order.shippingAddress.state}
//             </p>
//             <p className="text-gray-600 text-sm">
//               {order.shippingAddress.pincode}
//             </p>
//             <p className="text-gray-600 text-sm mt-1">
//               Phone: {order.shippingAddress.phone}
//             </p>
//           </div>

//           <div>
//             <h3 className="text-xs uppercase tracking-wider text-gray-400 mb-2">
//               Payment Details
//             </h3>
//             <p className="text-gray-600 text-sm">
//               Method: {order.paymentMethod}
//             </p>
//             <p className="text-gray-600 text-sm">
//               Transaction: {order.razorpayPaymentId?.slice(-8)}
//             </p>
//           </div>
//         </div>

//         {/* Items Table */}
//         <div>
//           <table className="w-full text-sm">
//             <thead>
//               <tr className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
//                 <th className="text-left py-3">Item</th>
//                 <th className="text-center py-3">Qty</th>
//                 <th className="text-right py-3">Price</th>
//                 <th className="text-right py-3">Total</th>
//               </tr>
//             </thead>

//             <tbody>
//               {order.items.map((item, index) => {
//                 const price =
//                   item.discountPercent > 0
//                     ? item.discountedPrice
//                     : item.price;

//                 return (
//                   <tr
//                     key={index}
//                     className="border-t border-gray-100"
//                   >
//                     <td className="py-4">{item.name}</td>
//                     <td className="text-center py-4">
//                       {item.quantity}
//                     </td>
//                     <td className="text-right py-4">
//                       {formatCurrency(price)}
//                     </td>
//                     <td className="text-right py-4 font-medium">
//                       {formatCurrency(price * item.quantity)}
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>

//         {/* Totals */}
//         <div className="flex justify-end mt-10">
//           <div className="w-64">
//             <div className="flex justify-between text-sm text-gray-600">
//               <span>Subtotal</span>
//               <span>{formatCurrency(order.totalAmount)}</span>
//             </div>

//             <div className="border-t border-gray-300 mt-3 pt-3 flex justify-between text-lg font-semibold text-gray-800">
//               <span>Total</span>
//               <span>{formatCurrency(order.totalAmount)}</span>
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="mt-14 text-center text-xs text-gray-400 border-t pt-6">
//           This is a system-generated invoice.  
//           Thank you for shopping with us ❤️
//         </div>

//         {/* Print Button */}
//         <div className="text-center mt-8 print:hidden">
//           <button
//             onClick={() => window.print()}
//             className="bg-[#DD7A83] hover:bg-[#c9656e] text-white px-6 py-2 rounded-lg"
//           >
//             Download PDF 📄
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default InvoicePage;









import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOrderById } from "../services/orderApi";

/* ─────────────────────────────────────────────
   Inline styles & keyframes injected once
───────────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .inv-root * { box-sizing: border-box; margin: 0; padding: 0; }
  .inv-root {
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
    background: #f5f0eb;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
  }

  /* ── card ── */
  .inv-card {
    background: #fffcf9;
    width: 100%;
    max-width: 780px;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0 2px 6px rgba(0,0,0,.06), 0 20px 60px rgba(180,120,100,.12);
    animation: fadeUp .55s cubic-bezier(.22,.68,0,1.2) both;
  }

  /* ── top bar ── */
  .inv-topbar {
    height: 5px;
    background: linear-gradient(90deg, #c4707a, #e8a87c, #c4707a);
    background-size: 300% 100%;
    animation: shimmer 4s linear infinite;
  }

  /* ── header ── */
  .inv-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 40px 48px 28px;
    border-bottom: 1px solid #ede8e2;
  }
  .inv-brand-name {
    font-family: 'Playfair Display', serif;
    font-size: 26px;
    font-weight: 600;
    color: #2b1f1a;
    letter-spacing: .01em;
  }
  .inv-brand-sub {
    font-size: 11px;
    font-weight: 400;
    color: #a8998e;
    margin-top: 3px;
    letter-spacing: .12em;
    text-transform: uppercase;
  }
  .inv-meta { text-align: right; }
  .inv-label {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    color: #c4707a;
    letter-spacing: .14em;
    font-weight: 400;
    font-style: italic;
  }
  .inv-num, .inv-date {
    font-size: 12px;
    color: #a8998e;
    margin-top: 4px;
    letter-spacing: .04em;
  }
  .inv-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    margin-top: 10px;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: .1em;
    text-transform: uppercase;
    background: #e8f5ee;
    color: #3a8a5c;
    border: 1px solid #b8dfc9;
  }
  .inv-badge::before {
    content: '';
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #3a8a5c;
  }

  /* ── body ── */
  .inv-body { padding: 36px 48px; }

  /* ── grid ── */
  .inv-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
    margin-bottom: 40px;
  }
  .inv-section-label {
    font-size: 9px;
    letter-spacing: .18em;
    text-transform: uppercase;
    color: #c4707a;
    margin-bottom: 12px;
    font-weight: 500;
  }
  .inv-addr-name {
    font-size: 15px;
    font-weight: 500;
    color: #2b1f1a;
    margin-bottom: 6px;
  }
  .inv-addr-line {
    font-size: 13px;
    color: #7a6e68;
    line-height: 1.7;
  }

  /* ── divider ── */
  .inv-divider {
    height: 1px;
    background: linear-gradient(to right, #ede8e2, #c4707a22, #ede8e2);
    margin-bottom: 28px;
  }

  /* ── table ── */
  .inv-table { width: 100%; border-collapse: collapse; }
  .inv-table thead tr {
    border-bottom: 1px solid #ede8e2;
  }
  .inv-table th {
    padding: 10px 0;
    font-size: 9px;
    letter-spacing: .16em;
    text-transform: uppercase;
    color: #a8998e;
    font-weight: 500;
  }
  .inv-table th:first-child { text-align: left; }
  .inv-table th:not(:first-child) { text-align: right; }
  .inv-table td { padding: 16px 0; }
  .inv-table tbody tr { border-bottom: 1px solid #f3eeea; }
  .inv-table tbody tr:last-child { border-bottom: none; }
  .inv-item-name {
    font-size: 14px;
    color: #2b1f1a;
    font-weight: 400;
  }
  .inv-item-sub {
    font-size: 11px;
    color: #a8998e;
    margin-top: 3px;
  }
  .inv-cell-right {
    text-align: right;
    font-size: 14px;
    color: #4a3f39;
  }
  .inv-cell-right.bold { font-weight: 500; color: #2b1f1a; }

  /* ── totals ── */
  .inv-totals {
    display: flex;
    justify-content: flex-end;
    margin-top: 32px;
  }
  .inv-totals-box { width: 240px; }
  .inv-total-row {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    color: #7a6e68;
    padding: 6px 0;
  }
  .inv-total-final {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1.5px solid #2b1f1a;
    margin-top: 10px;
    padding-top: 14px;
  }
  .inv-total-final span:first-child {
    font-family: 'Playfair Display', serif;
    font-size: 17px;
    color: #2b1f1a;
  }
  .inv-total-final span:last-child {
    font-size: 20px;
    font-weight: 500;
    color: #2b1f1a;
    letter-spacing: .01em;
  }

  /* ── footer ── */
  .inv-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 48px;
    border-top: 1px solid #ede8e2;
    background: #faf6f2;
    margin-top: 40px;
  }
  .inv-footer-note {
    font-size: 11px;
    color: #a8998e;
    line-height: 1.6;
  }
  .inv-print-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #2b1f1a;
    color: #fffcf9;
    border: none;
    padding: 12px 24px;
    border-radius: 3px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: .06em;
    cursor: pointer;
    transition: background .2s, transform .15s;
  }
  .inv-print-btn:hover {
    background: #c4707a;
    transform: translateY(-1px);
  }
  .inv-print-btn svg { flex-shrink: 0; }

  /* ── loading / error ── */
  .inv-loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    font-family: 'DM Sans', sans-serif;
    color: #a8998e;
    gap: 18px;
    background: #f5f0eb;
  }
  .inv-spinner {
    width: 36px; height: 36px;
    border: 2px solid #ede8e2;
    border-top-color: #c4707a;
    border-radius: 50%;
    animation: spin .8s linear infinite;
  }

  /* ── print ── */
  @media print {
    .inv-root { background: white; padding: 0; }
    .inv-card { box-shadow: none; }
    .inv-topbar { display: none; }
    .inv-footer { background: white; }
    .inv-print-btn { display: none; }
  }
`;

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */
const InvoicePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = GLOBAL_CSS;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await getOrderById(id);
        if (data.data.paymentStatus !== "paid") { navigate("/orders"); return; }
        setOrder(data.data);
      } catch {
        navigate("/orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  const fmt = (n) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(n);

  if (loading)
    return (
      <div className="inv-loading">
        <div className="inv-spinner" />
        <span style={{ fontSize: 13, letterSpacing: ".1em" }}>Preparing your invoice…</span>
      </div>
    );
  if (!order) return null;

  const subtotal = order.items.reduce((acc, item) => {
    const price = item.discountPercent > 0 ? item.discountedPrice : item.price;
    return acc + price * item.quantity;
  }, 0);

  return (
    <div className="inv-root">
      <div className="inv-card">
        {/* shimmer top bar */}
        <div className="inv-topbar" />

        {/* ── Header ── */}
        <div className="inv-header">
          <div>
            <div className="inv-brand-name">Roopswaroop</div>
            <div className="inv-brand-sub">Girls Clothing · India</div>
          </div>
          <div className="inv-meta">
            <div className="inv-label">Invoice</div>
            <div className="inv-num">No. INV-{order._id.slice(-6).toUpperCase()}</div>
            <div className="inv-date">{new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</div>
            <div className="inv-badge">Paid</div>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="inv-body">
          {/* Billing + Payment */}
          <div className="inv-grid">
            <div>
              <div className="inv-section-label">Bill To</div>
              <div className="inv-addr-name">{order.shippingAddress.fullName}</div>
              <div className="inv-addr-line">
                {order.shippingAddress.address}<br />
                {order.shippingAddress.city}, {order.shippingAddress.state} – {order.shippingAddress.pincode}<br />
                <span style={{ marginTop: 4, display: "inline-block" }}>📞 {order.shippingAddress.phone}</span>
              </div>
            </div>
            <div>
              <div className="inv-section-label">Payment Details</div>
              <div className="inv-addr-line" style={{ lineHeight: 2 }}>
                <span style={{ display: "block" }}>
                  <span style={{ color: "#a8998e", fontSize: 11 }}>Method</span><br />
                  <span style={{ color: "#2b1f1a", fontSize: 14, fontWeight: 500 }}>{order.paymentMethod}</span>
                </span>
                <span style={{ display: "block", marginTop: 10 }}>
                  <span style={{ color: "#a8998e", fontSize: 11 }}>Transaction ID</span><br />
                  <span style={{ color: "#2b1f1a", fontSize: 13, fontFamily: "monospace" }}>···{order.razorpayPaymentId?.slice(-8)}</span>
                </span>
              </div>
            </div>
          </div>

          <div className="inv-divider" />

          {/* Items */}
          <table className="inv-table">
            <thead>
              <tr>
                <th>Item</th>
                <th style={{ textAlign: "right" }}>Qty</th>
                <th style={{ textAlign: "right" }}>Unit Price</th>
                <th style={{ textAlign: "right" }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, i) => {
                const price = item.discountPercent > 0 ? item.discountedPrice : item.price;
                return (
                  <tr key={i}>
                    <td>
                      <div className="inv-item-name">{item.name}</div>
                      {item.discountPercent > 0 && (
                        <div className="inv-item-sub">{item.discountPercent}% discount applied</div>
                      )}
                    </td>
                    <td className="inv-cell-right">{item.quantity}</td>
                    <td className="inv-cell-right">{fmt(price)}</td>
                    <td className="inv-cell-right bold">{fmt(price * item.quantity)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Totals */}
          <div className="inv-totals">
            <div className="inv-totals-box">
              <div className="inv-total-row">
                <span>Subtotal</span>
                <span>{fmt(subtotal)}</span>
              </div>
              <div className="inv-total-row">
                <span>Shipping</span>
                <span style={{ color: "#3a8a5c" }}>Free</span>
              </div>
              <div className="inv-total-final">
                <span>Total</span>
                <span>{fmt(order.totalAmount)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="inv-footer">
          <div className="inv-footer-note">
            System-generated invoice · No signature required<br />
            Thank you for shopping with Roopswaroop ♡
          </div>
          <button className="inv-print-btn" onClick={() => window.print()}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 6 2 18 2 18 9" />
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
              <rect x="6" y="14" width="12" height="8" />
            </svg>
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;