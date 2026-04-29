// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { getMyOrders } from "../services/orderApi";

// const Orders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const { data } = await getMyOrders();
//         setOrders(data.data);
//       } catch (error) {
//         console.error("Error fetching orders", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   // ✅ STATUS COLOR FUNCTION (NEW)
//   const getStatusStyle = (status) => {
//     switch (status) {
//       case "placed":
//         return "bg-orange-100 text-orange-600";
//       case "shipped":
//         return "bg-blue-100 text-blue-600";
//       case "delivered":
//         return "bg-green-100 text-green-600";
//       case "cancelled":
//         return "bg-red-100 text-red-600";
//       default:
//         return "bg-gray-100 text-gray-600";
//     }
//   };

//   if (loading) {
//     return (
//       <p className="text-center p-10 text-gray-600">
//         Loading your orders...
//       </p>
//     );
//   }

//   if (orders.length === 0) {
//     return (
//       <p className="text-center p-10 text-gray-600">
//         No orders found 😔
//       </p>
//     );
//   }

//   return (
//     <div className="p-4 sm:p-6 max-w-3xl mx-auto">

//       <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800">
//         My Orders 📦
//       </h2>

//       <div className="space-y-4">
//         {orders.map((order) => (
//           <div
//             key={order._id}
//             className="bg-white/70 backdrop-blur-md
//                        border border-[#E3BFC3]
//                        rounded-2xl p-4 shadow-sm"
//           >
//             <p className="text-xs sm:text-sm text-gray-500 break-all">
//               Order ID: {order._id}
//             </p>

//             {/* ✅ ORDER DATE */}
//             <p className="text-xs sm:text-sm text-gray-500">
//               Order Date:{" "}
//               {new Date(order.createdAt).toLocaleString()}
//             </p>

//             <div className="text-sm mt-2 space-y-1">

//               <div>
//                 Order Status:
//                 <span
//                   className={`ml-2 text-xs px-2.5 py-1 rounded-full font-medium ${getStatusStyle(order.orderStatus)}`}
//                 >
//                   {order.orderStatus}
//                 </span>
//               </div>

//               <div>
//                 Payment:
//                 <span
//                   className={`ml-2 text-xs px-2.5 py-1 rounded-full font-medium ${order.paymentStatus === "paid"
//                       ? "bg-green-100 text-green-600"
//                       : order.paymentStatus === "failed"
//                         ? "bg-red-100 text-red-600"
//                         : "bg-yellow-100 text-yellow-600"
//                     }`}
//                 >
//                   {order.paymentStatus}
//                 </span>
//               </div>

//             </div>

//             <p className="text-sm">
//               Total:
//               <span className="font-semibold ml-1 text-[#DD7A83]">
//                 ₹{order.totalAmount}
//               </span>
//             </p>

//             {/* ✅ ITEMS (EXPANDED) */}
//             <div className="mt-3 space-y-2">
//               {order.items.map((item, index) => (
//                 <div
//                   key={index}
//                   className="text-sm border rounded-xl p-2.5"
//                 >
//                   <div className="flex justify-between">
//                     <span className="font-medium">
//                       {item.name}
//                     </span>

//                     {/* <span className="text-[#DD7A83] font-medium">
//                       ₹{item.price * item.quantity}
//                     </span> */}

//                     <span className="text-[#DD7A83] font-medium">
//                       ₹{(item.discountPercent > 0
//                         ? item.discountedPrice
//                         : item.price) * item.quantity}
//                     </span>
//                   </div>

//                   <div className="text-xs text-gray-500 mt-1">
//                     Qty: {item.quantity}
//                     {item.size && <> | Size: {item.size}</>}
//                     {item.color && <> | Color: {item.color}</>}
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* VIEW DETAILS BUTTON */}
//             <Link to={`/orders/${order._id}`}>
//               <button className="mt-4 bg-[#DD7A83] hover:bg-[#c9656e]
//                                  text-white px-4 py-2 rounded-xl
//                                  shadow-md transition text-sm">
//                 View Details 🔎
//               </button>
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Orders;

















import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getMyOrders,
  cancelOrder,
  createRazorpayOrder,
  verifyPayment,
} from "../services/orderApi";
import toast from "react-hot-toast";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const { data } = await getMyOrders();
      setOrders(data.data);
    } catch (error) {
      console.error("Error fetching orders", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case "placed":
        return "bg-orange-100 text-orange-600";
      case "shipped":
        return "bg-blue-100 text-blue-600";
      case "delivered":
        return "bg-green-100 text-green-600";
      case "cancelled":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getPaymentStyle = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-600";
      case "failed":
        return "bg-red-100 text-red-600";
      default:
        return "bg-yellow-100 text-yellow-600";
    }
  };

  // ✅ Cancel Order
  const handleCancel = async (id) => {
    try {
      await cancelOrder(id);
      toast.success("Order Cancelled ❌");
      fetchOrders();
    } catch (err) {
      toast.error(err.response?.data?.message || "Cancel failed");
    }
  };

  // ✅ Retry Payment
  const handleRetry = async (order) => {
    try {
      const { data } = await createRazorpayOrder(order._id);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        order_id: data.data.id,
        handler: async function (response) {
          await verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            orderId: order._id,
          });

          toast.success("Payment Successful 🎉");
          fetchOrders();
        },
        theme: { color: "#DD7A83" },
      };

      // const rzp = new window.Razorpay(options);
      if (!window.Razorpay) {
        toast.error("Payment system not loaded");
        return;
      }

      const rzp = new window.Razorpay(options);

      rzp.open();

      rzp.on("payment.failed", function () {
        toast.error("Payment Failed ❌");
      });


    } catch (err) {
      toast.error("Retry failed");
    }
  };

  if (loading) {
    return (
      <p className="text-center p-10 text-gray-600">
        Loading your orders...
      </p>
    );
  }

  if (orders.length === 0) {
    return (
      <p className="text-center p-10 text-gray-600">
        No orders found 😔
      </p>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800">
        My Orders 📦
      </h2>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white/70 backdrop-blur-md
                       border border-[#E3BFC3]
                       rounded-2xl p-4 shadow-sm"
          >
            <p className="text-xs text-gray-500 break-all">
              Order ID: {order._id}
            </p>

            <p className="text-xs text-gray-500">
              {new Date(order.createdAt).toLocaleString()}
            </p>

            {/* STATUS SECTION */}
            <div className="text-sm mt-2 space-y-1">
              <div>
                Order Status:
                <span
                  className={`ml-2 text-xs px-2.5 py-1 rounded-full font-medium ${getStatusStyle(
                    order.orderStatus
                  )}`}
                >
                  {order.orderStatus}
                </span>
              </div>

              <div>
                Payment:
                <span
                  className={`ml-2 text-xs px-2.5 py-1 rounded-full font-medium ${getPaymentStyle(
                    order.paymentStatus
                  )}`}
                >
                  {order.paymentStatus}
                </span>
              </div>
            </div>

            <p className="text-sm mt-2">
              Total:
              <span className="font-semibold ml-1 text-[#DD7A83]">
                ₹{order.totalAmount}
              </span>
            </p>

            {/* ITEMS */}
            <div className="mt-3 space-y-2">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="text-sm border rounded-xl p-2.5"
                >
                  <div className="flex justify-between">
                    <span className="font-medium">
                      {item.name}
                    </span>

                    <span className="text-[#DD7A83] font-medium">
                      ₹
                      {(item.discountPercent > 0
                        ? item.discountedPrice
                        : item.price) * item.quantity}
                    </span>
                  </div>

                  <div className="text-xs text-gray-500 mt-1">
                    Qty: {item.quantity}
                    {item.size && <> | Size: {item.size}</>}
                    {item.color && <> | Color: {item.color}</>}
                  </div>
                </div>
              ))}
            </div>

            {/* ACTION BUTTONS */}
            <div className="mt-4 flex gap-2 flex-wrap">

              {order.orderStatus === "placed" &&
                order.paymentStatus !== "paid" && order.returnStatus === "none" && (
                  <button
                    onClick={() => handleCancel(order._id)}
                    className="bg-red-500 hover:bg-red-600
                               text-white px-4 py-2 rounded-xl text-sm"
                  >
                    Cancel ❌
                  </button>
                )}

              {order.paymentStatus === "failed" && (
                <button
                  onClick={() => handleRetry(order)}
                  className="bg-yellow-500 hover:bg-yellow-600
                             text-white px-4 py-2 rounded-xl text-sm"
                >
                  Retry Payment 💳
                </button>
              )}

              {order.orderStatus === "delivered" &&
                order.returnStatus === "none" && (
                  <Link to={`/orders/${order._id}`}>
                    <button
                      className="bg-purple-500 hover:bg-purple-600
                   text-white px-4 py-2 rounded-xl text-sm"
                    >
                      Request Return 🔁
                    </button>
                  </Link>
                )}

              <Link to={`/orders/${order._id}`}>
                <button
                  className="bg-[#DD7A83] hover:bg-[#c9656e]
                             text-white px-4 py-2 rounded-xl
                             text-sm"
                >
                  View Details 🔎
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;