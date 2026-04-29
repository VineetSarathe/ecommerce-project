// import { useEffect, useState } from "react";
// import { useCart } from "../context/CartContext";
// import { placeOrder, createRazorpayOrder, verifyPayment } from "../services/orderApi";
// import { fetchDeliveryStates } from "../services/deliveryStateApi";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import { getAddresses, addAddress } from "../services/userApi";   // ✅ ADDED

// const Checkout = () => {
//   const navigate = useNavigate();
//   const { cartItems, totalPrice, clearCart } = useCart();

//   const [states, setStates] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [addresses, setAddresses] = useState([]);              // ✅ ADDED
//   const [selectedAddress, setSelectedAddress] = useState(null); // ✅ ADDED
//   const [saveAddress, setSaveAddress] = useState(false);        // ✅ ADDED

//   const [shippingAddress, setShippingAddress] = useState({
//     fullName: "",
//     phone: "",
//     address: "",
//     city: "",
//     state: "",
//     pincode: "",
//   });

//   // ✅ LOAD DELIVERY STATES
//   useEffect(() => {
//     loadStates();
//     loadAddresses();    // ✅ ADDED
//   }, []);

//   const loadStates = async () => {
//     try {
//       const res = await fetchDeliveryStates();
//       setStates(res.data);
//     } catch (err) {
//       console.error("Failed to load states");
//       toast.error("Failed to load delivery states");
//     }
//   };

//   // ✅ LOAD SAVED ADDRESSES
//   const loadAddresses = async () => {
//     try {
//       const res = await getAddresses();
//       setAddresses(res.data || []);
//     } catch (err) {
//       console.log("No saved addresses");
//     }
//   };

//   const handleChange = (e) => {
//     setShippingAddress({
//       ...shippingAddress,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const validateForm = () => {
//     if (!shippingAddress.fullName.trim())
//       return "Full name is required";

//     if (!shippingAddress.phone.trim())
//       return "Phone number is required";

//     const phone = shippingAddress.phone.replace(/\D/g, "");
//     if (phone.length !== 10)
//       return "Enter valid 10-digit phone number";

//     if (!shippingAddress.address.trim())
//       return "Address is required";

//     if (!shippingAddress.city.trim())
//       return "City is required";

//     if (!shippingAddress.state.trim())
//       return "State is required";

//     if (!shippingAddress.pincode.trim())
//       return "Pincode is required";

//     const pincode = shippingAddress.pincode.replace(/\D/g, "");
//     if (pincode.length !== 6)
//       return "Enter valid 6-digit pincode";

//     return null;
//   };

//   const validateSelections = () => {
//     const missingSelection = cartItems.some(
//       (item) =>
//         (item.product?.sizes?.length > 0 && !item.size) ||
//         (item.product?.colors?.length > 0 && !item.color)
//     );

//     if (missingSelection) {
//       toast.error("Please select size & color for all products 🛍");
//       return false;
//     }

//     return true;
//   };

//   const handlePlaceOrder = async () => {
//     if (cartItems.length === 0) {
//       toast.error("Cart is empty 🛒");
//       return;
//     }

//     if (!validateSelections()) return;

//     if (totalPrice <= 0) {
//       toast.error("Invalid cart total");
//       return;
//     }

//     const formError = validateForm();
//     if (formError) {
//       toast.error(formError);
//       return;
//     }

//     setLoading(true);

//     try {
//       // 1️⃣ CREATE ORDER (PENDING)
//       const orderData = {
//         items: cartItems.map((item) => ({
//           product: item.product._id,
//           name: item.name,
//           price: item.price,
//           quantity: item.quantity,
//           size: item.size || null,
//           color: item.color || null,
//         })),
//         shippingAddress: {
//           ...shippingAddress,
//           phone: shippingAddress.phone.replace(/\D/g, ""),
//           pincode: shippingAddress.pincode.replace(/\D/g, ""),
//         },
//         totalAmount: totalPrice,
//       };

//       const orderRes = await placeOrder(orderData);
//       const createdOrder = orderRes.data.data;

//       // 2️⃣ CREATE RAZORPAY ORDER
//       // const razorpayRes = await createRazorpayOrder(totalPrice);
//       const razorpayRes = await createRazorpayOrder(createdOrder._id);
//       const razorpayOrder = razorpayRes.data.data;

//       // 3️⃣ OPEN RAZORPAY POPUP
//       const options = {
//         key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//         order_id: razorpayOrder.id,
//         name: "Girls Clothing Store",
//         description: "Order Payment",

//         handler: async function (response) {
//           await verifyPayment({
//             razorpay_order_id: response.razorpay_order_id,
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_signature: response.razorpay_signature,
//             orderId: createdOrder._id,
//           });

//           if (saveAddress) {
//             await addAddress(shippingAddress);
//           }

//           clearCart();
//           navigate(`/success/${createdOrder._id}`);
//         },

//         modal: {
//           ondismiss: function () {
//             toast.error("Payment popup closed ❌");
//           },
//         },

//         prefill: {
//           name: shippingAddress.fullName,
//           contact: shippingAddress.phone,
//         },

//         theme: { color: "#DD7A83" },
//       };

//       const rzp = new window.Razorpay(options);

//       setTimeout(() => {
//         toast("Payment session expired ⏳");
//       }, 5 * 60 * 1000);

//       rzp.open();

//       rzp.on("payment.failed", function (response) {
//         toast.error("Payment Failed ❌");
//       });

//     } catch (err) {
//       toast.error(err.response?.data?.message || "Payment failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-4 sm:p-6 max-w-6xl mx-auto 
//                     grid grid-cols-1 md:grid-cols-2 gap-8">

//       {/* SHIPPING FORM */}
//       <div className="bg-white/70 backdrop-blur-md
//                       border border-[#E3BFC3]
//                       rounded-2xl shadow-sm p-5">

//         <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">
//           Shipping Details 🚚
//         </h2>

//         {/* ✅ SAVED ADDRESSES */}
//         {addresses.length > 0 && (
//           <div className="mb-4">
//             <h3 className="font-semibold mb-2">
//               Saved Addresses 📍
//             </h3>

//             {addresses.map((addr) => (
//               <div
//                 key={addr._id}
//                 onClick={() => {
//                   setSelectedAddress(addr);
//                   setShippingAddress(addr);
//                 }}
//                 className={`border p-3 rounded-xl cursor-pointer mb-2 transition ${selectedAddress?._id === addr._id
//                   ? "border-[#DD7A83] bg-pink-50"
//                   : "border-gray-200 hover:border-[#E3BFC3]"
//                   }`}
//               >
//                 <p className="font-medium">{addr.fullName}</p>
//                 <p className="text-xs text-gray-500">
//                   {addr.address}, {addr.city}, {addr.state} - {addr.pincode}
//                 </p>
//               </div>
//             ))}
//           </div>
//         )}

//         <div className="grid gap-3">

//           <input name="fullName" placeholder="Full Name"
//             value={shippingAddress.fullName}
//             onChange={handleChange}
//             className="border border-[#E3BFC3] p-3 rounded-xl"
//           />

//           <input name="phone" placeholder="Phone" maxLength={10}
//             value={shippingAddress.phone}
//             onChange={(e) =>
//               handleChange({
//                 target: {
//                   name: "phone",
//                   value: e.target.value.replace(/\D/g, ""),
//                 },
//               })
//             }
//             className="border border-[#E3BFC3] p-3 rounded-xl"
//           />

//           <input name="address" placeholder="Address"
//             value={shippingAddress.address}
//             onChange={handleChange}
//             className="border border-[#E3BFC3] p-3 rounded-xl"
//           />

//           <input name="city" placeholder="City"
//             value={shippingAddress.city}
//             onChange={handleChange}
//             className="border border-[#E3BFC3] p-3 rounded-xl"
//           />

//           <select name="state"
//             value={shippingAddress.state}
//             onChange={handleChange}
//             className="border border-[#E3BFC3] p-3 rounded-xl"
//           >
//             <option value="">Select State</option>
//             {states.map((state) => (
//               <option key={state._id} value={state.name}>
//                 {state.name}
//               </option>
//             ))}
//           </select>

//           <input name="pincode" placeholder="Pincode" maxLength={6}
//             value={shippingAddress.pincode}
//             onChange={(e) =>
//               handleChange({
//                 target: {
//                   name: "pincode",
//                   value: e.target.value.replace(/\D/g, ""),
//                 },
//               })
//             }
//             className="border border-[#E3BFC3] p-3 rounded-xl"
//           />

//           {/* ✅ SAVE ADDRESS */}
//           <label className="flex items-center gap-2 text-sm">
//             <input
//               type="checkbox"
//               checked={saveAddress}
//               onChange={(e) => setSaveAddress(e.target.checked)}
//             />
//             Save this address for future orders
//           </label>
//         </div>
//       </div>

//       {/* SUMMARY */}
//       <div className="bg-white/70 backdrop-blur-md
//                       border border-[#E3BFC3]
//                       rounded-2xl shadow-sm p-5">

//         <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">
//           Order Summary 🧾
//         </h2>

//         <div className="space-y-3 text-sm">

//           {cartItems.map((item) => (
//             <div key={`${item._id}-${item.size}-${item.color}`}
//               className="flex justify-between"
//             >
//               <span>{item.name} × {item.quantity}</span>

//               <span className="text-[#DD7A83] font-medium">
//                 {/* ₹{(item.discountPercent > 0
//                   ? item.discountedPrice
//                   : item.price) * item.quantity} */}

//                 ₹{(() => {
//                   const product = item.product;
//                   if (!product) return 0;

//                   const basePrice = product.price ?? 0;
//                   const discountPercent = product.discountPercent ?? 0;

//                   const finalPrice =
//                     discountPercent > 0
//                       ? product.discountedPrice ?? basePrice
//                       : basePrice;

//                   return finalPrice * (item.quantity ?? 1);
//                 })()}
//               </span>
//             </div>
//           ))}

//           <hr />

//           <div className="flex justify-between font-bold text-base">
//             <span>Total</span>
//             <span className="text-[#DD7A83]">₹{totalPrice}</span>
//           </div>

//           <button
//             onClick={handlePlaceOrder}
//             disabled={loading || cartItems.length === 0}
//             className="w-full bg-[#DD7A83] hover:bg-[#c9656e]
//                        text-white py-3 rounded-xl mt-3"
//           >
//             {loading ? "Placing Order..." : "Place Order 🛍"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;
















import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { placeOrder, createRazorpayOrder, verifyPayment } from "../services/orderApi";
import { fetchDeliveryStates } from "../services/deliveryStateApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getAddresses, addAddress } from "../services/userApi";   // ✅ ADDED
import { checkPincode } from "../services/orderApi";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, totalPrice, clearCart } = useCart();

  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(false);

  const [addresses, setAddresses] = useState([]);              // ✅ ADDED
  const [selectedAddress, setSelectedAddress] = useState(null); // ✅ ADDED
  const [saveAddress, setSaveAddress] = useState(false);        // ✅ ADDED

  const [pincodeError, setPincodeError] = useState("");
const [isCheckingPin, setIsCheckingPin] = useState(false);

  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  // ✅ LOAD DELIVERY STATES
  useEffect(() => {
    loadStates();
    loadAddresses();    // ✅ ADDED
  }, []);

  const loadStates = async () => {
    try {
      const res = await fetchDeliveryStates();
      setStates(res.data);
    } catch (err) {
      console.error("Failed to load states");
      toast.error("Failed to load delivery states");
    }
  };

  // ✅ LOAD SAVED ADDRESSES
  const loadAddresses = async () => {
    try {
      const res = await getAddresses();
      setAddresses(res.data || []);
    } catch (err) {
      console.log("No saved addresses");
    }
  };

  const handleChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    });
  };

  const handlePincodeChange = async (value) => {
  const cleanPin = value.replace(/\D/g, "");

  setShippingAddress({
    ...shippingAddress,
    pincode: cleanPin,
  });

  setPincodeError("");

  if (cleanPin.length === 6) {
    try {
      setIsCheckingPin(true);

      const res = await checkPincode(cleanPin);

      if (!res.data.serviceable) {
        setPincodeError("Not deliverable to this pincode");
      }
    } catch (err) {
      setPincodeError("Not deliverable to this pincode");
    } finally {
      setIsCheckingPin(false);
    }
  }
};

  const validateForm = () => {
    if (!shippingAddress.fullName.trim())
      return "Full name is required";

    if (!shippingAddress.phone.trim())
      return "Phone number is required";

    const phone = shippingAddress.phone.replace(/\D/g, "");
    if (phone.length !== 10)
      return "Enter valid 10-digit phone number";

    if (!shippingAddress.address.trim())
      return "Address is required";

    if (!shippingAddress.city.trim())
      return "City is required";

    if (!shippingAddress.state.trim())
      return "State is required";

    if (!shippingAddress.pincode.trim())
      return "Pincode is required";

    const pincode = shippingAddress.pincode.replace(/\D/g, "");
    if (pincode.length !== 6)
      return "Enter valid 6-digit pincode";

    return null;
  };

  const validateSelections = () => {
    const missingSelection = cartItems.some(
      (item) =>
        (item.product?.sizes?.length > 0 && !item.size) ||
        (item.product?.colors?.length > 0 && !item.color)
    );

    if (missingSelection) {
      toast.error("Please select size & color for all products 🛍");
      return false;
    }

    return true;
  };

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      toast.error("Cart is empty 🛒");
      return;
    }

    if (!validateSelections()) return;

    if (totalPrice <= 0) {
      toast.error("Invalid cart total");
      return;
    }

    const formError = validateForm();
    if (formError) {
      toast.error(formError);
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ CREATE ORDER (PENDING)
      const orderData = {
        items: cartItems.map((item) => ({
          product: item.product._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          size: item.size || null,
          color: item.color || null,
        })),
        shippingAddress: {
          ...shippingAddress,
          phone: shippingAddress.phone.replace(/\D/g, ""),
          pincode: shippingAddress.pincode.replace(/\D/g, ""),
        },
        totalAmount: totalPrice,
      };

      const orderRes = await placeOrder(orderData);
      const createdOrder = orderRes.data.data;

      // 2️⃣ CREATE RAZORPAY ORDER
      // const razorpayRes = await createRazorpayOrder(totalPrice);
      const razorpayRes = await createRazorpayOrder(createdOrder._id);
      const razorpayOrder = razorpayRes.data.data;

      // 3️⃣ OPEN RAZORPAY POPUP
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        order_id: razorpayOrder.id,
        name: "Girls Clothing Store",
        description: "Order Payment",

        handler: async function (response) {
          await verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            orderId: createdOrder._id,
          });

          if (saveAddress) {
            await addAddress(shippingAddress);
          }

          clearCart();
          navigate(`/success/${createdOrder._id}`);
        },

        modal: {
          ondismiss: function () {
            toast.error("Payment popup closed ❌");
          },
        },

        prefill: {
          name: shippingAddress.fullName,
          contact: shippingAddress.phone,
        },

        theme: { color: "#DD7A83" },
      };

      const rzp = new window.Razorpay(options);

      setTimeout(() => {
        toast("Payment session expired ⏳");
      }, 5 * 60 * 1000);

      rzp.open();

      rzp.on("payment.failed", function (response) {
        toast.error("Payment Failed ❌");
      });

    } catch (err) {
      toast.error(err.response?.data?.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto 
                    grid grid-cols-1 md:grid-cols-2 gap-8">

      {/* SHIPPING FORM */}
      <div className="bg-white/70 backdrop-blur-md
                      border border-[#E3BFC3]
                      rounded-2xl shadow-sm p-5">

        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">
          Shipping Details 🚚
        </h2>

        {/* ✅ SAVED ADDRESSES */}
        {addresses.length > 0 && (
          <div className="mb-4">
            <h3 className="font-semibold mb-2">
              Saved Addresses 📍
            </h3>

            {addresses.map((addr) => (
              <div
                key={addr._id}
                onClick={() => {
                  setSelectedAddress(addr);
                  setShippingAddress(addr);
                }}
                className={`border p-3 rounded-xl cursor-pointer mb-2 transition ${selectedAddress?._id === addr._id
                  ? "border-[#DD7A83] bg-pink-50"
                  : "border-gray-200 hover:border-[#E3BFC3]"
                  }`}
              >
                <p className="font-medium">{addr.fullName}</p>
                <p className="text-xs text-gray-500">
                  {addr.address}, {addr.city}, {addr.state} - {addr.pincode}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="grid gap-3">

          <input name="fullName" placeholder="Full Name"
            value={shippingAddress.fullName}
            onChange={handleChange}
            className="border border-[#E3BFC3] p-3 rounded-xl"
          />

          <input name="phone" placeholder="Phone" maxLength={10}
            value={shippingAddress.phone}
            onChange={(e) =>
              handleChange({
                target: {
                  name: "phone",
                  value: e.target.value.replace(/\D/g, ""),
                },
              })
            }
            className="border border-[#E3BFC3] p-3 rounded-xl"
          />

          <input name="address" placeholder="Address"
            value={shippingAddress.address}
            onChange={handleChange}
            className="border border-[#E3BFC3] p-3 rounded-xl"
          />

          <input name="city" placeholder="City"
            value={shippingAddress.city}
            onChange={handleChange}
            className="border border-[#E3BFC3] p-3 rounded-xl"
          />

          <select name="state"
            value={shippingAddress.state}
            onChange={handleChange}
            className="border border-[#E3BFC3] p-3 rounded-xl"
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state._id} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>

          <input
  name="pincode"
  placeholder="Pincode"
  maxLength={6}
  value={shippingAddress.pincode}
  onChange={(e) => handlePincodeChange(e.target.value)}
  className={`p-3 rounded-xl border transition
    ${pincodeError
      ? "border-red-500 bg-red-50"
      : "border-[#E3BFC3]"
    }`}
/>

{isCheckingPin && (
  <p className="text-gray-400 text-xs mt-1">
    Checking availability...
  </p>
)}

{pincodeError && (
  <p className="text-red-500 text-sm mt-1">
    {pincodeError}
  </p>
)}

          {/* ✅ SAVE ADDRESS */}
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={saveAddress}
              onChange={(e) => setSaveAddress(e.target.checked)}
            />
            Save this address for future orders
          </label>
        </div>
      </div>

      {/* SUMMARY */}
      <div className="bg-white/70 backdrop-blur-md
                      border border-[#E3BFC3]
                      rounded-2xl shadow-sm p-5">

        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">
          Order Summary 🧾
        </h2>

        <div className="space-y-3 text-sm">

          {cartItems.map((item) => (
            <div key={`${item._id}-${item.size}-${item.color}`}
              className="flex justify-between"
            >
              <span>{item.name} × {item.quantity}</span>

              <span className="text-[#DD7A83] font-medium">
                {/* ₹{(item.discountPercent > 0
                  ? item.discountedPrice
                  : item.price) * item.quantity} */}

                ₹{(() => {
                  const product = item.product;
                  if (!product) return 0;

                  const basePrice = product.price ?? 0;
                  const discountPercent = product.discountPercent ?? 0;

                  const finalPrice =
                    discountPercent > 0
                      ? product.discountedPrice ?? basePrice
                      : basePrice;

                  return finalPrice * (item.quantity ?? 1);
                })()}
              </span>
            </div>
          ))}

          <hr />

          <div className="flex justify-between font-bold text-base">
            <span>Total</span>
            <span className="text-[#DD7A83]">₹{totalPrice}</span>
          </div>

          <button
  onClick={handlePlaceOrder}
  disabled={
    loading ||
    cartItems.length === 0 ||
    pincodeError ||
    isCheckingPin
  }
  className="w-full bg-[#DD7A83] hover:bg-[#c9656e]
             text-white py-3 rounded-xl mt-3
             disabled:opacity-50 disabled:cursor-not-allowed"
>
            {loading ? "Placing Order..." : "Place Order 🛍"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;






