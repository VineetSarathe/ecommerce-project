const OrderTracking = ({ order }) => {
  if (!order) return null;

  const trackingSteps = [
    { key: "SHIPPED", label: "Shipped 🚚" },
    { key: "IN_TRANSIT", label: "In Transit 🛣" },
    { key: "OUT_FOR_DELIVERY", label: "Out For Delivery 📦" },
    { key: "DELIVERED", label: "Delivered ✅" },
  ];

  const isCancelled = order.orderStatus === "cancelled";

  const currentIndex = trackingSteps.findIndex(
    (s) => s.key === order.trackingStatus
  );

  const returnIndex = trackingSteps.findIndex(
    (s) => s.key === order.returnTrackingStatus
  );

  const statusColor = {
    SHIPPED: "bg-blue-100 text-blue-600",
    IN_TRANSIT: "bg-indigo-100 text-indigo-600",
    OUT_FOR_DELIVERY: "bg-orange-100 text-orange-600",
    DELIVERED: "bg-green-100 text-green-600",
    RTO: "bg-red-100 text-red-600",
  };

  return (
    <div className="bg-white border rounded-2xl p-5 mt-4 shadow-sm">

      {/* ================= FORWARD TRACKING ================= */}
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Live Tracking 🚀</h3>

        {order.trackingStatus && (
          <span
            className={`text-xs px-3 py-1 rounded-full font-medium 
              ${statusColor[order.trackingStatus] || "bg-gray-100 text-gray-600"}`}
          >
            {order.trackingStatus.replaceAll("_", " ")}
          </span>
        )}
      </div>

      {!isCancelled && (
        <div className="mt-5">
          {trackingSteps.map((step, index) => {
            const isActive = index <= currentIndex;

            return (
              <div key={step.key} className="flex items-start gap-3 mb-4">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold
                    ${isActive ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"}`}
                >
                  {isActive ? "✓" : index + 1}
                </div>

                <div className="flex-1">
                  <p
                    className={`text-sm font-medium 
                      ${isActive ? "text-gray-800" : "text-gray-400"}`}
                  >
                    {step.label}
                  </p>

                  {index !== trackingSteps.length - 1 && (
                    <div
                      className={`h-6 w-[2px] ml-3 mt-1
                        ${index < currentIndex ? "bg-green-500" : "bg-gray-200"}`}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {order.trackingId && (
        <div className="mt-4 text-sm">
          <p><b>Courier:</b> {order.courier}</p>
          <p><b>Tracking ID:</b> {order.trackingId}</p>
        </div>
      )}

      {/* ================= RETURN TRACKING ================= */}
      {order.returnTrackingId && (
        <div className="mt-8 border-t pt-6">

          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-red-600">
              Return Tracking 🔁
            </h3>

            {order.returnTrackingStatus && (
              <span className="text-xs px-3 py-1 rounded-full font-medium bg-red-100 text-red-600">
                {order.returnTrackingStatus.replaceAll("_", " ")}
              </span>
            )}
          </div>

          <div className="mt-5">
            {trackingSteps.map((step, index) => {
              const isActive = index <= returnIndex;

              return (
                <div key={step.key} className="flex items-start gap-3 mb-4">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold
                      ${isActive ? "bg-red-500 text-white" : "bg-gray-200 text-gray-500"}`}
                  >
                    {isActive ? "✓" : index + 1}
                  </div>

                  <div className="flex-1">
                    <p
                      className={`text-sm font-medium 
                        ${isActive ? "text-gray-800" : "text-gray-400"}`}
                    >
                      {step.label}
                    </p>

                    {index !== trackingSteps.length - 1 && (
                      <div
                        className={`h-6 w-[2px] ml-3 mt-1
                          ${index < returnIndex ? "bg-red-500" : "bg-gray-200"}`}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 text-sm">
            <p><b>Return Courier:</b> {order.returnCourier}</p>
            <p><b>Return Tracking ID:</b> {order.returnTrackingId}</p>
          </div>

        </div>
      )}

    </div>
  );
};

export default OrderTracking;