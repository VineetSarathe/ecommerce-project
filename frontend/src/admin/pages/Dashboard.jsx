import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import {
  getDashboardStats,
  getMonthlyRevenue,
} from "../../services/adminApi";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await getDashboardStats();
        setStats(data.data);
      } catch (error) {
        console.error("Stats load failed", error);
      }
    };

    const fetchMonthlyRevenue = async () => {
      try {
        const { data } = await getMonthlyRevenue();
        setMonthlyData(data.data);
      } catch (error) {
        console.error("Monthly revenue load failed", error);
      }
    };

    fetchStats();
    fetchMonthlyRevenue();
  }, []);

  return (
    <AdminLayout>

      <h2 className="text-lg sm:text-xl md:text-2xl 
                     font-bold mb-4 sm:mb-6 text-gray-800">
        Dashboard Overview 📊
      </h2>

      {!stats ? (
        <p className="text-gray-600 text-sm sm:text-base">
          Loading stats...
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 
                          sm:grid-cols-2 
                          lg:grid-cols-4 
                          gap-3 sm:gap-4">

            {/* Total Products */}
            <div className="bg-white/80 backdrop-blur-md
                            border border-[#E3BFC3]
                            p-3 sm:p-4
                            rounded-xl sm:rounded-2xl
                            shadow-sm">
              <p className="text-xs sm:text-sm text-gray-500">
                Total Products
              </p>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                {stats.totalProducts}
              </h3>
            </div>

            {/* Total Orders */}
            <div className="bg-white/80 backdrop-blur-md
                            border border-[#E3BFC3]
                            p-3 sm:p-4
                            rounded-xl sm:rounded-2xl
                            shadow-sm">
              <p className="text-xs sm:text-sm text-gray-500">
                Total Orders
              </p>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                {stats.totalOrders}
              </h3>
            </div>

            {/* Total Revenue */}
            <div className="bg-white/80 backdrop-blur-md
                            border border-[#E3BFC3]
                            p-3 sm:p-4
                            rounded-xl sm:rounded-2xl
                            shadow-sm">
              <p className="text-xs sm:text-sm text-gray-500">
                Total Revenue
              </p>
              <h3 className="text-xl sm:text-2xl font-bold text-[#DD7A83]">
                ₹{stats.totalRevenue}
              </h3>
            </div>

            {/* Paid Orders */}
            <div className="bg-white/80 backdrop-blur-md
                            border border-[#E3BFC3]
                            p-3 sm:p-4
                            rounded-xl sm:rounded-2xl
                            shadow-sm">
              <p className="text-xs sm:text-sm text-gray-500">
                Paid Orders
              </p>
              <h3 className="text-xl sm:text-2xl font-bold text-green-600">
                {stats.paidOrders}
              </h3>
            </div>

            {/* Delivered Orders */}
            <div className="bg-white/80 backdrop-blur-md
                            border border-[#E3BFC3]
                            p-3 sm:p-4
                            rounded-xl sm:rounded-2xl
                            shadow-sm">
              <p className="text-xs sm:text-sm text-gray-500">
                Delivered Orders
              </p>
              <h3 className="text-xl sm:text-2xl font-bold text-blue-600">
                {stats.deliveredOrders}
              </h3>
            </div>

            {/* Cancelled Orders */}
            <div className="bg-white/80 backdrop-blur-md
                            border border-[#E3BFC3]
                            p-3 sm:p-4
                            rounded-xl sm:rounded-2xl
                            shadow-sm">
              <p className="text-xs sm:text-sm text-gray-500">
                Cancelled Orders
              </p>
              <h3 className="text-xl sm:text-2xl font-bold text-red-600">
                {stats.cancelledOrders}
              </h3>
            </div>

            {/* Refunded Orders */}
            <div className="bg-white/80 backdrop-blur-md
                            border border-[#E3BFC3]
                            p-3 sm:p-4
                            rounded-xl sm:rounded-2xl
                            shadow-sm">
              <p className="text-xs sm:text-sm text-gray-500">
                Refunded Orders
              </p>
              <h3 className="text-xl sm:text-2xl font-bold text-purple-600">
                {stats.refundedOrders}
              </h3>
            </div>


            {/* Return Requested */}
            <div className="bg-white/80 backdrop-blur-md border border-[#E3BFC3]
                p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-sm">
              <p className="text-xs sm:text-sm text-gray-500">
                Return Requested
              </p>
              <h3 className="text-xl sm:text-2xl font-bold text-yellow-600">
                {stats.returnRequested}
              </h3>
            </div>

            {/* Return Approved */}
            <div className="bg-white/80 backdrop-blur-md border border-[#E3BFC3]
                p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-sm">
              <p className="text-xs sm:text-sm text-gray-500">
                Return Approved
              </p>
              <h3 className="text-xl sm:text-2xl font-bold text-blue-600">
                {stats.returnApproved}
              </h3>
            </div>

            {/* Return Rejected */}
            <div className="bg-white/80 backdrop-blur-md border border-[#E3BFC3]
                p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-sm">
              <p className="text-xs sm:text-sm text-gray-500">
                Return Rejected
              </p>
              <h3 className="text-xl sm:text-2xl font-bold text-red-600">
                {stats.returnRejected}
              </h3>
            </div>

            {/* Total Refund Amount */}
            <div className="bg-white/80 backdrop-blur-md border border-[#E3BFC3]
                p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-sm">
              <p className="text-xs sm:text-sm text-gray-500">
                Total Refund Amount
              </p>
              <h3 className="text-xl sm:text-2xl font-bold text-purple-600">
                ₹{stats.totalRefundAmount}
              </h3>
            </div>

            {/* Return Rate */}
            <div className="bg-white/80 backdrop-blur-md border border-[#E3BFC3]
                p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-sm">
              <p className="text-xs sm:text-sm text-gray-500">
                Return Rate
              </p>
              <h3 className="text-xl sm:text-2xl font-bold text-orange-600">
                {/* {stats.returnRate?.toFixed(2)}% */}
                {stats.returnRate?.toFixed(2)}%
              </h3>
            </div>

          </div>

          {/* ================= MONTHLY REVENUE GRAPH ================= */}
          <div className="mt-8 bg-white/80 backdrop-blur-md
                          border border-[#E3BFC3]
                          p-4 rounded-2xl shadow-sm">

            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Monthly Revenue 📈
            </h3>

            {monthlyData.length === 0 ? (
              <p className="text-gray-500 text-sm">
                No revenue data yet.
              </p>
            ) : (
              <Bar
                data={{
                  labels: monthlyData.map(
                    (item) => `${item._id.month}/${item._id.year}`
                  ),
                  datasets: [
                    {
                      label: "Monthly Revenue (₹)",
                      data: monthlyData.map((item) => item.total),
                      backgroundColor: "#DD7A83",
                    },
                  ],
                }}
              />
            )}
          </div>
        </>
      )}

    </AdminLayout>
  );
};

export default Dashboard;