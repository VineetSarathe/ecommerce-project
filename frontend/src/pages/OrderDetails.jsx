// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { getOrderById } from "../services/orderApi";
// import OrderTracking from "../components/OrderTracking";
// import { requestReturn } from "../services/orderApi";

// const OrderDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const [showReturnModal, setShowReturnModal] = useState(false);
//   const [returnReason, setReturnReason] = useState("");

//   const handleReturnSubmit = async () => {
//     if (!returnReason.trim()) return;

//     try {
//       await requestReturn(order._id, { reason: returnReason });
//       alert("Return request submitted");
//       setShowReturnModal(false);
//       window.location.reload();
//     } catch (error) {
//       alert(error.response?.data?.message || "Return failed");
//     }
//   };

//   useEffect(() => {
//     const fetchOrder = async () => {
//       try {
//         const { data } = await getOrderById(id);
//         setOrder(data.data);
//       } catch (error) {
//         console.error("Error fetching order", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrder();
//   }, [id]);

//   if (loading) {
//     return (
//       <p className="text-center p-10 text-gray-600">
//         Loading order...
//       </p>
//     );
//   }

//   if (!order) {
//     return (
//       <p className="text-center p-10 text-gray-600">
//         Order not found 😔
//       </p>
//     );
//   }

//   return (
//     <div className="p-4 sm:p-6 max-w-3xl mx-auto">

//       <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800">
//         Order Details 📦
//       </h2>

//       {/* ORDER INFO */}
//       <div className="bg-white/70 backdrop-blur-md
//                       border border-[#E3BFC3]
//                       rounded-2xl p-4 shadow-sm mb-4">

//         <p className="text-xs sm:text-sm text-gray-500 break-all">
//           Order ID: {order._id}
//         </p>

//         <p className="text-xs sm:text-sm text-gray-500">
//           Order Date: {new Date(order.createdAt).toLocaleString()}
//         </p>

//         <p className="mt-2 text-sm sm:text-base">
//           Status:
//           <span className="font-semibold ml-1 text-[#DD7A83] capitalize">
//             {order.orderStatus}
//           </span>
//         </p>

//         <p className="text-sm sm:text-base">
//           Total:
//           <span className="font-semibold ml-1 text-[#DD7A83]">
//             ₹{order.totalAmount}
//           </span>
//         </p>

//         {/* ✅ VIEW INVOICE BUTTON */}
//         {order.paymentStatus === "paid" && (
//           <button
//             onClick={() => navigate(`/invoice/${order._id}`)}
//             className="inline-block mt-4 bg-[#DD7A83] text-white px-4 py-2 rounded-xl text-sm hover:bg-[#c9656e]"
//           >
//             View Invoice 📄
//           </button>
//         )}
//       </div>

//       {order.returnStatus && order.returnStatus !== "none" && (
//   <div className="mt-2">
//     <span
//       className={`text-xs px-3 py-1 rounded-full capitalize ${
//         order.returnStatus === "requested"
//           ? "bg-yellow-100 text-yellow-700"
//           : order.returnStatus === "approved"
//           ? "bg-blue-100 text-blue-700"
//           : order.returnStatus === "rejected"
//           ? "bg-red-100 text-red-700"
//           : "bg-green-100 text-green-700"
//       }`}
//     >
//       Return Status: {order.returnStatus}
//     </span>
//   </div>
// )}

//       {/* TRACKING */}
//       <OrderTracking order={order} />

//       {/* SHIPPING ADDRESS */}
//       <div className="bg-white/70 backdrop-blur-md
//                       border border-[#E3BFC3]
//                       rounded-2xl p-4 shadow-sm mb-4">

//         <h3 className="font-semibold mb-2 text-gray-800">
//           Shipping Address 🚚
//         </h3>

//         <div className="text-sm text-gray-700 space-y-1">
//           <p>{order.shippingAddress.fullName}</p>
//           <p>{order.shippingAddress.phone}</p>
//           <p>{order.shippingAddress.address}</p>
//           <p>
//             {order.shippingAddress.city}, {order.shippingAddress.state}
//           </p>
//           <p>{order.shippingAddress.pincode}</p>
//         </div>
//       </div>

//       {/* ITEMS */}
//       <div className="bg-white/70 backdrop-blur-md
//                       border border-[#E3BFC3]
//                       rounded-2xl p-4 shadow-sm">

//         <h3 className="font-semibold mb-2 text-gray-800">
//           Items 🛍
//         </h3>

//         {order.items.map((item, index) => {
//           const price =
//             item.discountPercent > 0
//               ? item.discountedPrice
//               : item.price;

//           return (
//             <div
//               key={index}
//               className="border-b border-[#f1d4d7] py-3 text-sm"
//             >
//               <div className="flex justify-between">
//                 <span className="font-medium">
//                   {item.name}
//                 </span>

//                 <span className="text-[#DD7A83] font-medium">
//                   ₹{price * item.quantity}
//                 </span>
//               </div>

//               <div className="text-xs text-gray-500 mt-1">
//                 Qty: {item.quantity}
//                 {item.size && <> | Size: {item.size}</>}
//                 {item.color && <> | Color: {item.color}</>}
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {order.orderStatus === "delivered" &&
//         order.paymentStatus === "paid" &&
//         (!order.returnStatus || order.returnStatus === "none") && (
//           <button
//             onClick={() => setShowReturnModal(true)}
//             className="mt-4 bg-red-500 text-white px-4 py-2 rounded-xl text-sm hover:bg-red-600"
//           >
//             Return Order 🔄
//           </button>
//         )}
//       {showReturnModal && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//           <div className="bg-white w-[90%] max-w-md rounded-2xl p-6 shadow-xl">

//             <h3 className="text-lg font-semibold mb-4 text-gray-800">
//               Return Order
//             </h3>

//             <textarea
//               value={returnReason}
//               onChange={(e) => setReturnReason(e.target.value)}
//               placeholder="Please tell us why you're returning this item..."
//               className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#DD7A83]"
//               rows="4"
//             />

//             <div className="flex justify-end gap-3 mt-4">
//               <button
//                 onClick={() => setShowReturnModal(false)}
//                 className="px-4 py-2 text-sm rounded-xl border border-gray-300"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={handleReturnSubmit}
//                 className="px-4 py-2 text-sm rounded-xl bg-red-500 text-white hover:bg-red-600"
//               >
//                 Submit Return
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrderDetails;














import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOrderById } from "../services/orderApi";
import OrderTracking from "../components/OrderTracking";
import { requestReturn } from "../services/orderApi";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showReturnModal, setShowReturnModal] = useState(false);
  const [returnReason, setReturnReason] = useState("");

  const handleReturnSubmit = async () => {
    if (!returnReason.trim()) return;

    try {
      await requestReturn(order._id, { reason: returnReason });
      alert("Return request submitted");
      setShowReturnModal(false);
      window.location.reload();
    } catch (error) {
      alert(error.response?.data?.message || "Return failed");
    }
  };

  // useEffect(() => {
  //   const fetchOrder = async () => {
  //     try {
  //       const { data } = await getOrderById(id);
  //       setOrder(data.data);
  //     } catch (error) {
  //       console.error("Error fetching order", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchOrder();
  // }, [id]);

  useEffect(() => {
    let interval;

    const fetchOrder = async () => {
      try {
        const { data } = await getOrderById(id);
        setOrder(data.data);
        console.log("Order response:", data);
      } catch (error) {
        console.error("Error fetching order", error);
      } finally {
        setLoading(false); // ✅ yaha important hai
      }
    };

    fetchOrder();

    interval = setInterval(fetchOrder, 30000);

    return () => clearInterval(interval);
  }, [id]);

  if (loading) {
    return (
      <p className="text-center p-10 text-gray-600">
        Loading order...
      </p>
    );
  }

  const isReturnAllowed = () => {
    if (!order?.deliveredAt) return false;

    const deliveryDate = new Date(order.deliveredAt);
    const now = new Date();

    const diffDays = (now - deliveryDate) / (1000 * 60 * 60 * 24);

    return diffDays <= 7;
  };

  if (!order) {
    return (
      <p className="text-center p-10 text-gray-600">
        Order not found 😔
      </p>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto">

      <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800">
        Order Details 📦
      </h2>

      {/* ORDER INFO */}
      <div className="bg-white/70 backdrop-blur-md
                      border border-[#E3BFC3]
                      rounded-2xl p-4 shadow-sm mb-4">

        <p className="text-xs sm:text-sm text-gray-500 break-all">
          Order ID: {order._id}
        </p>

        <p className="text-xs sm:text-sm text-gray-500">
          Order Date: {new Date(order.createdAt).toLocaleString()}
        </p>

        <p className="mt-2 text-sm sm:text-base">
          Status:
          <span className="font-semibold ml-1 text-[#DD7A83] capitalize">
            {order.orderStatus}
          </span>
        </p>

        <p className="text-sm sm:text-base">
          Total:
          <span className="font-semibold ml-1 text-[#DD7A83]">
            ₹{order.totalAmount}
          </span>
        </p>

        {/* ✅ VIEW INVOICE BUTTON */}
        {order.paymentStatus === "paid" && (
          <button
            onClick={() => navigate(`/invoice/${order._id}`)}
            className="inline-block mt-4 bg-[#DD7A83] text-white px-4 py-2 rounded-xl text-sm hover:bg-[#c9656e]"
          >
            View Invoice 📄
          </button>
        )}
      </div>

      {order.returnStatus && order.returnStatus !== "none" && (
        <div className="mt-2">
          <span
            className={`text-xs px-3 py-1 rounded-full capitalize ${order.returnStatus === "requested"
              ? "bg-yellow-100 text-yellow-700"
              : order.returnStatus === "approved"
                ? "bg-blue-100 text-blue-700"
                : order.returnStatus === "rejected"
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }`}
          >
            Return Status: {order.returnStatus}
          </span>
        </div>
      )}

      {/* TRACKING */}
      <OrderTracking order={order} />

      {/* SHIPPING ADDRESS */}
      <div className="bg-white/70 backdrop-blur-md
                      border border-[#E3BFC3]
                      rounded-2xl p-4 shadow-sm mb-4">

        <h3 className="font-semibold mb-2 text-gray-800">
          Shipping Address 🚚
        </h3>

        <div className="text-sm text-gray-700 space-y-1">
          <p>{order.shippingAddress.fullName}</p>
          <p>{order.shippingAddress.phone}</p>
          <p>{order.shippingAddress.address}</p>
          <p>
            {order.shippingAddress.city}, {order.shippingAddress.state}
          </p>
          <p>{order.shippingAddress.pincode}</p>
        </div>
      </div>

      {/* ITEMS */}
      <div className="bg-white/70 backdrop-blur-md
                      border border-[#E3BFC3]
                      rounded-2xl p-4 shadow-sm">

        <h3 className="font-semibold mb-2 text-gray-800">
          Items 🛍
        </h3>

        {order.items.map((item, index) => {
          const price =
            item.discountPercent > 0
              ? item.discountedPrice
              : item.price;

          return (
            <div
              key={index}
              className="border-b border-[#f1d4d7] py-3 text-sm"
            >
              <div className="flex justify-between">
                <span className="font-medium">
                  {item.name}
                </span>

                <span className="text-[#DD7A83] font-medium">
                  ₹{price * item.quantity}
                </span>
              </div>

              <div className="text-xs text-gray-500 mt-1">
                Qty: {item.quantity}
                {item.size && <> | Size: {item.size}</>}
                {item.color && <> | Color: {item.color}</>}
              </div>
            </div>
          );
        })}
      </div>

      {/* {order.orderStatus === "delivered" &&
        order.paymentStatus === "paid" &&
        (!order.returnStatus || order.returnStatus === "none") && ( */}
      {order.orderStatus === "delivered" &&
        order.paymentStatus === "paid" &&
        order.returnStatus === "none" &&
        isReturnAllowed() && (
          <button
            onClick={() => setShowReturnModal(true)}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-xl text-sm hover:bg-red-600"
          >
            Return Order 🔄
          </button>
        )}
      {showReturnModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-md rounded-2xl p-6 shadow-xl">

            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Return Order
            </h3>

            <textarea
              value={returnReason}
              onChange={(e) => setReturnReason(e.target.value)}
              placeholder="Please tell us why you're returning this item..."
              className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#DD7A83]"
              rows="4"
            />

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setShowReturnModal(false)}
                className="px-4 py-2 text-sm rounded-xl border border-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={handleReturnSubmit}
                className="px-4 py-2 text-sm rounded-xl bg-red-500 text-white hover:bg-red-600"
              >
                Submit Return
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;




