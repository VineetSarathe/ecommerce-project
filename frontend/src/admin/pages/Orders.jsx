import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import {
  getAllOrders,
  updateOrderStatus,
  shipOrder,
  refundOrder,
  approveReturn,
  confirmReturn,
  rejectReturn,
} from "../../services/orderApi";

import Swal from "sweetalert2";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchOrders = async (query = "") => {
    try {
      setLoading(true);
      const { data } = await getAllOrders(query);
      setOrders(data.data);
    } catch (error) {
      console.error("Error loading orders", error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchOrders();
  // }, []);

  useEffect(() => {
    let interval;

    fetchOrders();

    interval = setInterval(() => {
      fetchOrders(buildQuery(startDate, endDate));
    }, 30000); // 30 sec auto refresh

    return () => clearInterval(interval);
  }, [startDate, endDate]);


  const buildQuery = (start, end) => {
    if (!start || !end) return "";
    return `?startDate=${start}&endDate=${end}`;
  };

  const handleFilter = () => {
    fetchOrders(buildQuery(startDate, endDate));
  };

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  const handleReset = () => {
    setStartDate("");
    setEndDate("");
    fetchOrders();
  };

  const handleStatusChange = async (orderId, status) => {
    try {
      await updateOrderStatus(orderId, status);
      fetchOrders(buildQuery(startDate, endDate));
    } catch (error) {
      console.error("Status update failed", error);
    }
  };

  const handleShip = async (orderId) => {
    try {
      await shipOrder(orderId);
      fetchOrders(buildQuery(startDate, endDate));
    } catch (error) {
      Swal.fire("Error!", error.response?.data?.message || "Shipping failed", "error");
    }
  };

  const handleRefund = async (orderId) => {
    // const confirmRefund = window.confirm(
    //   "Are you sure you want to refund this order?"
    // );

    // if (!confirmRefund) return;

    // try {
    //   await refundOrder(orderId);
    //   alert("Order refunded successfully");
    //   fetchOrders(buildQuery(startDate, endDate));
    // } catch (error) {
    //   alert(error.response?.data?.message || "Refund failed");
    // }

    const result = await Swal.fire({
      title: "Refund Order?",
      text: "Are you sure you want to refund this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD7A83",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Yes"
    });

    if (!result.isConfirmed) return;

    Swal.fire({
      title: "Processing...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });


    await refundOrder(orderId);

    Swal.fire("Success!", "Order refunded successfully.", "success");

    fetchOrders(buildQuery(startDate, endDate));   // ✅ ADD THIS
  };

  const handleRejectReturn = async (orderId) => {
    // const confirmAction = window.confirm("Reject this return request?");

    // if (!confirmAction) return;

    // try {
    //   await rejectReturn(orderId);
    //   alert("Return rejected");
    //   fetchOrders(buildQuery(startDate, endDate));
    // } catch (error) {
    //   alert(error.response?.data?.message || "Rejection failed");
    // }

    const result = await Swal.fire({
      title: "Reject Return?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e3342f",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Yes, Reject"
    });

    if (!result.isConfirmed) return;

    // ✅ ADD LOADER HERE
    Swal.fire({
      title: "Processing...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    await rejectReturn(orderId);

    Swal.fire("Rejected!", "Return has been rejected.", "success");

    fetchOrders(buildQuery(startDate, endDate));   // ✅ ADD THIS
  };

  const handleApproveReturn = async (orderId) => {

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Approve this return request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD7A83",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Yes"
    });

    if (!result.isConfirmed) return;

    // ✅ ADD LOADER HERE
    Swal.fire({
      title: "Processing...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      await approveReturn(orderId);

      Swal.fire("Success!", "Return approved.", "success");

      fetchOrders(buildQuery(startDate, endDate));

    } catch (error) {
      Swal.fire("Error!", error.response?.data?.message || "Approval failed", "error");
    }
  };

  const handleConfirmReturn = async (orderId) => {
    // const confirmAction = window.confirm(
    //   "Confirm product received and issue refund?"
    // );

    // if (!confirmAction) return;

    // try {
    //   await confirmReturn(orderId);
    //   alert("Return completed & refund issued");
    //   fetchOrders(buildQuery(startDate, endDate));
    // } catch (error) {
    //   alert(error.response?.data?.message || "Return failed");
    // }
    const result = await Swal.fire({
      title: "Confirm Return?",
      text: "Product received & issue refund?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6b21a8",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Yes"
    });

    if (!result.isConfirmed) return;

    // ✅ ADD LOADER HERE
    Swal.fire({
      title: "Processing...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    await confirmReturn(orderId);

    Swal.fire("Success!", "Refund issued successfully.", "success");

    fetchOrders(buildQuery(startDate, endDate));   // ✅ ADD THIS
  };

  const handleTodayFilter = () => {
    const today = new Date();
    const formatted = formatDate(today);

    setStartDate(formatted);
    setEndDate(formatted);

    fetchOrders(buildQuery(formatted, formatted));
  };

  const handleLast7DaysFilter = () => {
    const today = new Date();
    const last7 = new Date();
    last7.setDate(today.getDate() - 6); // includes today

    const start = formatDate(last7);
    const end = formatDate(today);

    setStartDate(start);
    setEndDate(end);

    fetchOrders(buildQuery(start, end));
  };

  const handlePrint = () => {
    window.print();
  };

  const statusColors = {
    placed: "bg-orange-100 text-orange-600",
    shipped: "bg-blue-100 text-blue-600",
    delivered: "bg-green-100 text-green-600",
    cancelled: "bg-red-100 text-red-600",
  };

  const trackingColors = {
    PENDING: "bg-gray-100 text-gray-600",
    SHIPPED: "bg-blue-100 text-blue-600",
    IN_TRANSIT: "bg-yellow-100 text-yellow-700",
    OUT_FOR_DELIVERY: "bg-orange-100 text-orange-600",
    DELIVERED: "bg-green-100 text-green-600",
  };


const steps = ["placed", "shipped", "delivered"];

return (
  <AdminLayout>
    <h2 className="text-lg sm:text-xl font-bold mb-6 text-gray-800">
      Manage Orders 🧾
    </h2>

    {/* FILTER BAR */}
    <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-6 print:hidden">

      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="border border-[#E3BFC3] p-2 rounded-xl text-sm"
      />

      <span className="text-gray-500 text-sm">to</span>

      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="border border-[#E3BFC3] p-2 rounded-xl text-sm"
      />

      <button
        onClick={handleFilter}
        className="bg-[#DD7A83] text-white px-4 py-2 rounded-xl text-sm"
      >
        Filter 📅
      </button>

      <button
        onClick={handleReset}
        className="border border-[#DD7A83] text-[#DD7A83] px-4 py-2 rounded-xl text-sm"
      >
        Reset
      </button>

      {/* ✅ QUICK FILTERS */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={handleTodayFilter}
          className="bg-green-500 hover:bg-green-600
                 text-white px-4 py-2 rounded-xl text-sm"
        >
          Today
        </button>

        <button
          onClick={handleLast7DaysFilter}
          className="bg-blue-500 hover:bg-blue-600
                 text-white px-4 py-2 rounded-xl text-sm"
        >
          Last 7 Days
        </button>
      </div>

    </div>

    {/* CONTENT */}
    {loading ? (
      <p className="text-gray-600">Loading orders...</p>
    ) : orders.length === 0 ? (
      <p className="text-gray-600">No orders found</p>
    ) : (
      <div className="space-y-4 print:bg-white">
        {orders.map((order) => {
          const currentStepIndex = steps.indexOf(order.orderStatus);

          return (
            <div
              key={order._id}
              className="bg-white/80 border border-[#E3BFC3]
                           p-4 rounded-2xl shadow-sm"
            >
              {/* TOP */}
              <div className="flex justify-between flex-wrap gap-3">
                <div>
                  <p className="text-xs text-gray-500">Order ID</p>
                  <p className="font-semibold text-sm break-all">
                    {order._id}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500  print-hide-progress">Amount</p>
                  <p className="font-semibold text-sm text-[#DD7A83]  print-hide-progress">
                    ₹{order.totalAmount}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 print-hide-progress">Status</p>
                  {/* <span
                      className={`text-xs px-3 py-1 rounded-full font-medium capitalize  print-hide-progress
                        ${statusColors[order.orderStatus]}`}
                    > */}
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium capitalize print-hide-progress
    ${statusColors[order.orderStatus] || "bg-gray-100 text-gray-600"}`}
                  >
                    {order.orderStatus}
                  </span>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Payment</p>
                  <span
                    className={`text-xs px-3 py-1 rounded-full ${order.paymentStatus === "paid"
                      ? "bg-green-100 text-green-600"
                      : order.paymentStatus === "failed"
                        ? "bg-red-100 text-red-600"
                        : order.paymentStatus === "refunded"
                          ? "bg-purple-100 text-purple-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                  >
                    {order.paymentStatus}
                  </span>

                  {/* RETURN STATUS BADGE */}
                  {order.returnStatus && order.returnStatus !== "none" && (
                    <div className="mt-2">
                      <span
                        className={`text-xs px-3 py-1 rounded-full capitalize ${order.returnStatus === "requested"
                          ? "bg-yellow-100 text-yellow-700"
                          : order.returnStatus === "approved"
                            ? "bg-blue-100 text-blue-700"
                            : order.returnStatus === "rejected"
                              ? "bg-red-100 text-red-700"
                              : order.returnStatus === "returned"
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-600"
                          }`}
                      >
                        Return: {order.returnStatus}
                      </span>

                      {/* RETURN REASON */}
                      {order.returnReason && (
                        <div className="mt-2 text-xs text-gray-600 bg-gray-50 p-2 rounded-lg border">
                          <strong>Reason:</strong> {order.returnReason}
                        </div>
                      )}

                      {/* 🔥 ADD THIS – RETURN REQUEST DATE */}
                      {order.returnRequestedAt && (
                        <div className="text-xs text-gray-500 mt-1">
                          Requested At: {new Date(order.returnRequestedAt).toLocaleString()}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>


              {/* ✅ FULL SHIPPING DETAILS (RESTORED) */}
              <div className="mt-3 border-t pt-3">
                <p className="text-sm font-semibold mb-1">
                  Shipping Details 🚚
                </p>

                <p className="text-sm font-medium">
                  {order.shippingAddress.fullName}
                </p>

                <p className="text-sm text-gray-600">
                  📞 {order.shippingAddress.phone}
                </p>

                <p className="text-sm text-gray-600">
                  {order.shippingAddress.address}
                </p>

                <p className="text-sm text-gray-600">
                  {order.shippingAddress.city}, {order.shippingAddress.state}
                </p>

                <p className="text-sm text-gray-600">
                  {order.shippingAddress.pincode}
                </p>
              </div>

              {/* ✅ FULL ITEM DETAILS (RESTORED) */}
              <div className="mt-3 space-y-1">
                <p className="text-sm font-semibold">
                  Items 🛍
                </p>

                {order.items.map((item, i) => (
                  <div key={i} className="text-sm text-gray-700">
                    {item.name} × {item.quantity}

                    <span className="text-xs text-gray-500 ml-2">
                      {item.discountPercent > 0 && item.discountedPrice ? (
                        <>
                          <span className="line-through text-gray-400 mr-1">
                            ₹{item.price}
                          </span>

                          <span className="text-[#DD7A83] font-semibold">
                            ₹{item.discountedPrice}
                          </span>

                          <span className="ml-1 bg-black text-white px-1.5 py-0.5 rounded">
                            {item.discountPercent}% OFF
                          </span>
                        </>
                      ) : (
                        <>
                          ₹{item.discountedPrice || item.price}
                        </>
                      )}
                    </span>

                    {item.size && (
                      <span className="text-xs text-[#DD7A83] ml-2">
                        Size: {item.size}
                      </span>
                    )}

                    {item.color && (
                      <span className="text-xs text-[#DD7A83] ml-2">
                        Color: {item.color}
                      </span>
                    )}
                  </div>
                ))}
              </div>


              {/* 🔥 LIVE TRACKING SECTION */}
              {order.trackingId && (
                <div className="mt-4 p-3 rounded-xl bg-blue-50 border border-blue-100 print-hide-tracking">

                  <p className="text-xs text-gray-500 mb-1">
                    Live Tracking 🚚
                  </p>

                  <div className="flex flex-wrap gap-3 items-center">

                    <div>
                      <p className="text-xs text-gray-500">Courier</p>
                      <p className="text-sm font-medium">
                        {order.courier || "N/A"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">Tracking ID</p>
                      <p className="text-sm font-semibold text-blue-700">
                        {order.trackingId}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">Status</p>
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-medium ${trackingColors[order.trackingStatus?.toUpperCase()] ||
                          "bg-gray-100 text-gray-600"
                          }`}
                      >
                        {/* {order.trackingStatus} */}
                        {order.trackingStatus?.toUpperCase()}
                      </span>
                    </div>

                  </div>

                  {/* RETURN TRACKING */}
{order.returnTrackingId && (
  <div className="mt-3 pt-3 border-t border-blue-200">

    <p className="text-xs text-gray-500 mb-1">
      Return Tracking 🔁
    </p>

    <div className="flex flex-wrap gap-3 items-center">

      <div>
        <p className="text-xs text-gray-500">Return Courier</p>
        <p className="text-sm font-medium text-red-600">
          {order.returnCourier || "N/A"}
        </p>
      </div>

      <div>
        <p className="text-xs text-gray-500">Return Tracking ID</p>
        <p className="text-sm font-semibold text-red-700">
          {order.returnTrackingId}
        </p>
      </div>

      {order.returnTrackingStatus && (
        <div>
          <p className="text-xs text-gray-500">Return Status</p>
          <span className="text-xs px-3 py-1 rounded-full font-medium bg-red-100 text-red-600">
            {order.returnTrackingStatus.replaceAll("_", " ")}
          </span>
        </div>
      )}

    </div>
  </div>
)}
                </div>
              )}

              {/* CONTROLS */}
              <div className="mt-3 border-t pt-3 flex gap-3 flex-wrap print:hidden">
                <select
                  value={order.orderStatus}
                  disabled={order.orderStatus === "delivered"}
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                  className="border border-[#E3BFC3] p-2 rounded-xl text-sm"
                >
                  <option value="placed">Placed</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                {order.orderStatus === "placed" &&
                  order.paymentStatus === "paid" && (
                    <button
                      onClick={() => handleShip(order._id)}
                      className="bg-blue-500 hover:bg-blue-600
                                 text-white px-4 py-2 rounded-xl text-sm "
                    >
                      Ship 🚚
                    </button>
                  )}

                {order.paymentStatus === "paid" &&
                  order.orderStatus !== "cancelled" &&
                  order.orderStatus !== "delivered" &&
                  order.returnStatus === "none" && (
                    <button
                      onClick={() => handleRefund(order._id)}
                      className="bg-red-500 hover:bg-red-600
               text-white px-4 py-2 rounded-xl text-sm"
                    >
                      Refund 💰
                    </button>
                  )}


                {/* APPROVE / REJECT RETURN */}
                {order.returnStatus === "requested" && (
                  <>
                    <button
                      onClick={() => handleApproveReturn(order._id)}
                      className="bg-yellow-500 hover:bg-yellow-600
                 text-white px-4 py-2 rounded-xl text-sm"
                    >
                      Approve Return ✅
                    </button>

                    <button
                      onClick={() => handleRejectReturn(order._id)}
                      className="bg-red-500 hover:bg-red-600
                 text-white px-4 py-2 rounded-xl text-sm"
                    >
                      Reject Return ❌
                    </button>
                  </>
                )}

                {/* CONFIRM RETURN & REFUND */}
                {order.returnStatus === "approved" && (
                  <button
                    onClick={() => handleConfirmReturn(order._id)}
                    className="bg-purple-500 hover:bg-purple-600
               text-white px-4 py-2 rounded-xl text-sm"
                  >
                    Confirm Return & Refund 🔄💰
                  </button>
                )}

                <button
                  onClick={handlePrint}
                  className="bg-[#DD7A83] text-white px-4 py-2 rounded-xl text-sm  print-hide-progress"
                >
                  Print 🖨️
                </button>
              </div>

              {/* ✅ TRACKING PREVIEW (❌ Hidden in print) */}
              {/* {order.trackingId && (
                  <div className="mt-2 text-xs text-gray-600 print-hide-tracking">
                    🚚 {order.courier} | Tracking ID: {order.trackingId}
                  </div>
                )} */}


              {/* ✅ PROGRESS BAR (❌ Hidden in print) */}
              {order.orderStatus !== "cancelled" && (
                <div className="flex gap-2 mt-3 print-hide-progress">
                  {steps.map((step, i) => (
                    <div key={step} className="flex-1">
                      <div
                        className={`h-2 rounded-full ${i <= currentStepIndex
                          ? "bg-green-500"
                          : "bg-gray-200"
                          }`}
                      />
                      <p className="text-[10px] text-gray-500 mt-1 capitalize">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    )}
  </AdminLayout>
);
};

export default AdminOrders;
