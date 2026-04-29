// import { useAuth } from "../context/AuthContext";
// import { Link } from "react-router-dom";

// const Profile = () => {
//   const { user, logout } = useAuth();

//   if (!user) {
//     return (
//       <p className="text-center p-10 text-gray-600">
//         Please login
//       </p>
//     );
//   }

//   return (
//     <div className="p-4 sm:p-6 max-w-2xl mx-auto">

//       <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800">
//         My Profile 👤
//       </h2>

//       <div className="bg-white/70 backdrop-blur-md
//                       border border-[#E3BFC3]
//                       shadow-sm rounded-2xl
//                       p-4 space-y-2 text-sm sm:text-base">

//         <p>
//           <span className="font-semibold text-gray-800">Name:</span>{" "}
//           <span className="text-gray-700">{user.name}</span>
//         </p>

//         <p>
//           <span className="font-semibold text-gray-800">Email:</span>{" "}
//           <span className="text-gray-700 break-all">{user.email}</span>
//         </p>

//         <p>
//           <span className="font-semibold text-gray-800">Role:</span>{" "}
//           <span className="text-[#DD7A83] font-medium">{user.role}</span>
//         </p>
//       </div>

//       {/* ACTION BUTTONS */}
//       <div className="mt-6 flex flex-col sm:flex-row gap-3">

//         <Link to="/orders" className="w-full sm:w-auto">
//           <button className="w-full bg-[#DD7A83] hover:bg-[#c9656e]
//                              text-white px-5 py-2.5 rounded-xl
//                              shadow-md transition">
//             My Orders 📦
//           </button>
//         </Link>

//         <button
//           onClick={logout}
//           className="w-full sm:w-auto border border-[#DD7A83]
//                      text-[#DD7A83]
//                      px-5 py-2.5 rounded-xl
//                      hover:bg-[#DD7A83] hover:text-white
//                      transition"
//         >
//           Logout 🚪
//         </button>

//       </div>
//     </div>
//   );
// };

// export default Profile;








import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import {
  getAddresses,
  addAddress,
  deleteAddress,
} from "../services/userApi";

import { fetchDeliveryStates } from "../services/deliveryStateApi";

const Profile = () => {
  const { user, logout } = useAuth();

  const [addresses, setAddresses] = useState([]);
  const [states, setStates] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [newAddress, setNewAddress] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  // ✅ LOAD STATES (Delivery-enabled only)
  useEffect(() => {
    loadStates();
  }, []);

  const loadStates = async () => {
    try {
      const res = await fetchDeliveryStates();
      setStates(res.data);
    } catch {
      toast.error("Failed to load delivery states");
    }
  };

  // ✅ LOAD ADDRESSES
  useEffect(() => {
    if (user) loadAddresses();
  }, [user]);

  const loadAddresses = async () => {
    try {
      const res = await getAddresses();
      setAddresses(res.data);
    } catch {
      console.log("No addresses");
    }
  };

  const handleChange = (e) => {
    setNewAddress({
      ...newAddress,
      [e.target.name]: e.target.value,
    });
  };

  const validateAddress = () => {
    const { fullName, phone, address, city, state, pincode } = newAddress;

    if (!fullName || !phone || !address || !city || !state || !pincode)
      return "All fields required";

    if (phone.length !== 10)
      return "Enter valid 10-digit phone";

    if (pincode.length !== 6)
      return "Enter valid 6-digit pincode";

    return null;
  };

  const handleAddAddress = async () => {
    const error = validateAddress();

    if (error) {
      toast.error(error);
      return;
    }

    try {
      const res = await addAddress(newAddress);

      setAddresses(res.data.addresses || res.data);
      toast.success("Address added ✅");

      setShowForm(false);
      setNewAddress({
        fullName: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
      });

    } catch {
      toast.error("Failed to add address");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await deleteAddress(id);
      setAddresses(res.data.addresses || res.data);
      toast.success("Address removed 🗑");
    } catch {
      toast.error("Delete failed");
    }
  };

  if (!user) {
    return (
      <p className="text-center p-10 text-gray-600">
        Please login
      </p>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto">

      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        My Profile 👤
      </h2>

      {/* USER INFO */}
      <div className="bg-white/70 backdrop-blur-md
                      border border-[#E3BFC3]
                      shadow-sm rounded-2xl
                      p-4 space-y-1 text-sm">

        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>

      {/* ADDRESS SECTION */}
      <div className="mt-8">

        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold text-gray-800">
            Saved Addresses 📍
          </h3>

          <button
            onClick={() => setShowForm(!showForm)}
            className="text-sm bg-[#DD7A83] text-white px-3 py-1.5 rounded-lg"
          >
            {showForm ? "Cancel" : "Add Address"}
          </button>
        </div>

        {/* ✅ ADDRESS FORM */}
        {showForm && (
          <div className="bg-pink-50 border border-[#E3BFC3]
                          rounded-xl p-3 space-y-2 mb-4">

            <input
              name="fullName"
              placeholder="Full Name"
              value={newAddress.fullName}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
            />

            <input
              name="phone"
              placeholder="Phone"
              maxLength={10}
              value={newAddress.phone}
              onChange={(e) =>
                handleChange({
                  target: {
                    name: "phone",
                    value: e.target.value.replace(/\D/g, ""),
                  },
                })
              }
              className="w-full border p-2 rounded-lg"
            />

            <input
              name="address"
              placeholder="Address"
              value={newAddress.address}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
            />

            <input
              name="city"
              placeholder="City"
              value={newAddress.city}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
            />

            {/* ✅ STATE DROPDOWN (SAFE) */}
            <select
              name="state"
              value={newAddress.state}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
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
              value={newAddress.pincode}
              onChange={(e) =>
                handleChange({
                  target: {
                    name: "pincode",
                    value: e.target.value.replace(/\D/g, ""),
                  },
                })
              }
              className="w-full border p-2 rounded-lg"
            />

            <button
              onClick={handleAddAddress}
              className="w-full bg-[#DD7A83] text-white py-2 rounded-lg"
            >
              Save Address ✅
            </button>
          </div>
        )}

        {/* ✅ ADDRESS LIST */}
        {addresses.length === 0 ? (
          <p className="text-sm text-gray-500">
            No saved addresses
          </p>
        ) : (
          addresses.map((addr) => (
            <div
              key={addr._id}
              className="border border-gray-200 rounded-xl p-3 mb-2
                         bg-white shadow-sm flex justify-between"
            >
              <div className="text-sm">
                <p className="font-medium">{addr.fullName}</p>
                <p className="text-xs text-gray-500">
                  {addr.address}, {addr.city}, {addr.state} - {addr.pincode}
                </p>
              </div>

              <button
                onClick={() => handleDelete(addr._id)}
                className="text-xs text-red-500"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      {/* ACTION BUTTONS */}
      <div className="mt-6 flex gap-3">

        <Link to="/orders">
          <button className="bg-[#DD7A83] text-white px-4 py-2 rounded-xl">
            My Orders 📦
          </button>
        </Link>

        <button
          onClick={logout}
          className="border border-[#DD7A83] text-[#DD7A83]
                     px-4 py-2 rounded-xl"
        >
          Logout 🚪
        </button>

      </div>
    </div>
  );
};

export default Profile;