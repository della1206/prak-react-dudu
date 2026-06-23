import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../contexts/AuthContext";

export default function Dashboard() {
  const { isAdmin, profile } = useAuth();
  const [stats, setStats] = useState({
    orders: 0,
    points: 0,
    tier: "bronze",
    revenue: 0,
    lastStatus: "pending",
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-700",
    success: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  useEffect(() => {
    loadDashboard();
  }, [isAdmin, profile]);

  const loadDashboard = async () => {
    const [{ count: orders }, { count: members }, { data: orderRows }] = await Promise.all([
      supabase.from("orders").select("id", { count: "exact", head: true }),
      isAdmin
        ? supabase.from("profiles").select("id", { count: "exact", head: true }).eq("role", "member")
        : Promise.resolve({ count: profile?.total_points || 0 }),
      supabase
        .from("orders")
        .select("id, status, total_final, created_at, profiles(full_name)")
        .order("created_at", { ascending: false })
        .limit(5),
    ]);

    const revenue = (orderRows || []).reduce(
      (total, order) => total + Number(order.total_final || 0),
      0
    );

    setStats({
      orders: orders || 0,
      points: members || 0,
      tier: profile?.tier || "bronze",
      revenue,
      lastStatus: orderRows?.[0]?.status || "pending",
    });
    setRecentOrders(orderRows || []);
  };

  return (
    <div id="dashboard-container" className="bg-gray-50 min-h-screen">
      {/* 1. Header */}
      <PageHeader />

      <div className="p-5 space-y-8">
        {/* 2. Statistik Cards (Grid 4 Kolom) */}
        <div id="dashboard-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card - Total Orders */}
          <div className="flex items-center space-x-5 bg-white rounded-2xl shadow-sm p-6 transition-all duration-300 hover:shadow-md border border-gray-100">
            <div className="bg-green-100 rounded-2xl p-4 text-3xl text-green-600">
              <FaShoppingCart />
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-gray-800">{stats.orders}</span>
              <span className="text-gray-400 font-medium">Total Orders</span>
            </div>
          </div>

          {/* Card - Total Delivered */}
          <div className="flex items-center space-x-5 bg-white rounded-2xl shadow-sm p-6 transition-all duration-300 hover:shadow-md border border-gray-100">
            <div className="bg-blue-100 rounded-2xl p-4 text-3xl text-blue-600">
              <FaTruck />
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-gray-800">{stats.points}</span>
              <span className="text-gray-400 font-medium">{isAdmin ? "Total Members" : "My Points"}</span>
            </div>
          </div>

          {/* Card - Total Canceled */}
          <div className="flex items-center space-x-5 bg-white rounded-2xl shadow-sm p-6 transition-all duration-300 hover:shadow-md border border-gray-100">
            <div className="bg-red-100 rounded-2xl p-4 text-3xl text-red-600">
              <FaBan />
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-gray-800 capitalize">{stats.tier}</span>
              <span className="text-gray-400 font-medium">{isAdmin ? "Current Tier" : "My Tier"}</span>
            </div>
          </div>

          {/* Card - Total Revenue */}
          <div className="flex items-center space-x-5 bg-white rounded-2xl shadow-sm p-6 transition-all duration-300 hover:shadow-md border border-gray-100">
            <div className="bg-yellow-100 rounded-2xl p-4 text-3xl text-yellow-600">
              <FaDollarSign />
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-gray-800 capitalize">
                {isAdmin ? `Rp ${stats.revenue.toLocaleString("id-ID")}` : stats.lastStatus}
              </span>
              <span className="text-gray-400 font-medium">{isAdmin ? "Total Revenue" : "Last Order"}</span>
            </div>
          </div>
        </div>

        {/* 3. Tabel Recent Orders (Di Bawah Card) */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Recent Orders</h2>
            <button className="text-blue-600 text-sm font-semibold hover:underline">View All</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-400 border-b border-gray-100 text-sm">
                  <th className="pb-4 font-medium uppercase tracking-wider">Customer</th>
                  <th className="pb-4 font-medium uppercase tracking-wider text-center">Status</th>
                  <th className="pb-4 font-medium uppercase tracking-wider text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 font-semibold text-gray-700">
                      {order.profiles?.full_name || "Member"}
                    </td>
                    <td className="py-4 text-center">
                      <span className={`${statusStyles[order.status] || statusStyles.pending} px-4 py-1 rounded-full text-xs font-bold uppercase`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 text-right font-bold text-gray-800">
                      Rp {Number(order.total_final || 0).toLocaleString("id-ID")}
                    </td>
                  </tr>
                ))}
                {recentOrders.length === 0 && (
                  <tr>
                    <td className="py-4 text-center text-gray-400" colSpan="3">
                      Belum ada pesanan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
