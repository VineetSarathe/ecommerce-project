// import { Link, useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { CheckCircle } from "lucide-react";
// import { getOrderById } from "../services/orderApi";

// const OrderSuccess = () => {
//   const { id } = useParams();
//   const [order, setOrder] = useState(null);

//   useEffect(() => {
//     const shown = sessionStorage.getItem("orderToastShown");

//     if (!shown) {
//       toast.success("Your order has been placed 🎉");
//       sessionStorage.setItem("orderToastShown", "true");
//     }

//     loadOrder();
//   }, []);

//   const loadOrder = async () => {
//     try {
//       const res = await getOrderById(id);
//       setOrder(res.data.data);
//     } catch (err) {
//       console.error("Failed to load order");
//     }
//   };

//   return (
//     <div
//       className="flex justify-center items-center min-h-screen
//                  bg-gradient-to-br from-[#E3BFC3] via-[#f5d6da] to-[#DD7A83]
//                  p-4"
//     >
//       <div
//         className="bg-white/80 backdrop-blur-md
//                    shadow-xl rounded-2xl
//                    p-6 sm:p-8 text-center
//                    max-w-md w-full"
//       >
//         <div className="flex justify-center mb-3">
//           <CheckCircle size={60} className="text-green-500" />
//         </div>

//         <h2 className="text-2xl sm:text-3xl font-bold text-[#DD7A83]">
//           Payment Successful 🎉
//         </h2>

//         <p className="text-gray-600 mt-3 text-sm">
//           Thank you for shopping with us!
//         </p>

//         {order && (
//           <div className="mt-4 text-sm bg-pink-50 p-3 rounded-xl text-left">
//             <p><strong>Order ID:</strong> {order._id}</p>
//             <p><strong>Amount Paid:</strong> ₹{order.totalAmount}</p>
//             <p><strong>Payment ID:</strong> {order.razorpayPaymentId}</p>
//             <p>
//               <strong>Status:</strong>{" "}
//               <span className="text-green-600 font-semibold">
//                 {order.paymentStatus}
//               </span>
//             </p>
//           </div>
//         )}

//         <div className="mt-6 space-y-3">
//           <Link to="/orders">
//             <button
//               className="w-full bg-[#DD7A83] hover:bg-[#c9656e]
//                          text-white py-2.5 rounded-xl shadow-md"
//             >
//               View My Orders 🧾
//             </button>
//           </Link>

//           <Link to="/products">
//             <button
//               className="w-full border border-[#DD7A83]
//                          text-[#DD7A83]
//                          py-2.5 rounded-xl
//                          hover:bg-[#DD7A83] hover:text-white"
//             >
//               Continue Shopping 👗
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderSuccess;












// import { Link, useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { CheckCircle } from "lucide-react";
// import { getOrderById } from "../services/orderApi";

// const OrderSuccess = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [order, setOrder] = useState(null);

//   useEffect(() => {
//     const shown = sessionStorage.getItem("orderToastShown");

//     if (!shown) {
//       toast.success("Your order has been placed 🎉");
//       sessionStorage.setItem("orderToastShown", "true");
//     }

//     loadOrder();
//   }, []);

//   const loadOrder = async () => {
//     try {
//       const res = await getOrderById(id);
//       const fetchedOrder = res.data.data;

//       // 🔒 Prevent fake access to success page
//       if (fetchedOrder.paymentStatus !== "paid") {
//         navigate("/orders");
//         return;
//       }

//       setOrder(fetchedOrder);
//     } catch (err) {
//       console.error("Failed to load order");
//       navigate("/orders");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen
//                     bg-gradient-to-br from-[#E3BFC3] via-[#f5d6da] to-[#DD7A83]
//                     p-4">
//       <div className="bg-white/80 backdrop-blur-md
//                       shadow-xl rounded-2xl
//                       p-6 sm:p-8 text-center
//                       max-w-md w-full">

//         <div className="flex justify-center mb-3">
//           <CheckCircle size={60} className="text-green-500" />
//         </div>

//         <h2 className="text-2xl sm:text-3xl font-bold text-[#DD7A83]">
//           Payment Successful 🎉
//         </h2>

//         {order && (
//           <div className="mt-4 text-sm bg-pink-50 p-3 rounded-xl text-left">
//             <p><strong>Order ID:</strong> {order._id}</p>
//             <p><strong>Amount Paid:</strong> ₹{order.totalAmount}</p>
//             <p><strong>Payment ID:</strong> {order.razorpayPaymentId}</p>
//           </div>
//         )}

//         <div className="mt-6 space-y-3">
//           <Link to="/orders">
//             <button className="w-full bg-[#DD7A83] hover:bg-[#c9656e]
//                                text-white py-2.5 rounded-xl shadow-md">
//               View My Orders 🧾
//             </button>
//           </Link>

//           <Link to="/products">
//             <button className="w-full border border-[#DD7A83]
//                                text-[#DD7A83]
//                                py-2.5 rounded-xl
//                                hover:bg-[#DD7A83] hover:text-white">
//               Continue Shopping 👗
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderSuccess;












import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CheckCircle } from "lucide-react";
import { getOrderById } from "../services/orderApi";

const OrderSuccess = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const shown = sessionStorage.getItem("orderToastShown");

    if (!shown) {
      toast.success("Your order has been placed 🎉");
      sessionStorage.setItem("orderToastShown", "true");
    }

    loadOrder();
  }, []);

  const loadOrder = async () => {
    try {
      const res = await getOrderById(id);
      const fetchedOrder = res.data.data;

      // 🔒 Prevent fake access to success page
      if (fetchedOrder.paymentStatus !== "paid") {
        navigate("/orders");
        return;
      }

      setOrder(fetchedOrder);
    } catch (err) {
      console.error("Failed to load order");
      navigate("/orders");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen
                    bg-gradient-to-br from-[#E3BFC3] via-[#f5d6da] to-[#DD7A83]
                    p-4">
      <div className="bg-white/80 backdrop-blur-md
                      shadow-xl rounded-2xl
                      p-6 sm:p-8 text-center
                      max-w-md w-full">

        <div className="flex justify-center mb-3">
          <CheckCircle size={60} className="text-green-500" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-[#DD7A83]">
          Payment Successful 🎉
        </h2>

        {order && (
          <div className="mt-4 text-sm bg-pink-50 p-3 rounded-xl text-left">
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Amount Paid:</strong> ₹{order.totalAmount}</p>
          </div>
        )}

        <div className="mt-6 space-y-3">
          <Link to="/orders">
            <button className="w-full bg-[#DD7A83] hover:bg-[#c9656e]
                               text-white py-2.5 rounded-xl shadow-md">
              View My Orders 🧾
            </button>
          </Link>

          <Link to="/products">
            <button className="w-full border border-[#DD7A83]
                               text-[#DD7A83]
                               py-2.5 rounded-xl
                               hover:bg-[#DD7A83] hover:text-white">
              Continue Shopping 👗
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;