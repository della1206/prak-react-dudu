import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";
import PageHeader from "../components/PageHeader";

export default function Dashboard() {
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
              <span className="text-3xl font-bold text-gray-800">75</span>
              <span className="text-gray-400 font-medium">Total Orders</span>
            </div>
          </div>

          {/* Card - Total Delivered */}
          <div className="flex items-center space-x-5 bg-white rounded-2xl shadow-sm p-6 transition-all duration-300 hover:shadow-md border border-gray-100">
            <div className="bg-blue-100 rounded-2xl p-4 text-3xl text-blue-600">
              <FaTruck />
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-gray-800">357</span>
              <span className="text-gray-400 font-medium">Total Delivered</span>
            </div>
          </div>

          {/* Card - Total Canceled */}
          <div className="flex items-center space-x-5 bg-white rounded-2xl shadow-sm p-6 transition-all duration-300 hover:shadow-md border border-gray-100">
            <div className="bg-red-100 rounded-2xl p-4 text-3xl text-red-600">
              <FaBan />
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-gray-800">65</span>
              <span className="text-gray-400 font-medium">Total Canceled</span>
            </div>
          </div>

          {/* Card - Total Revenue */}
          <div className="flex items-center space-x-5 bg-white rounded-2xl shadow-sm p-6 transition-all duration-300 hover:shadow-md border border-gray-100">
            <div className="bg-yellow-100 rounded-2xl p-4 text-3xl text-yellow-600">
              <FaDollarSign />
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-gray-800">$128</span>
              <span className="text-gray-400 font-medium">Total Revenue</span>
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
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 font-semibold text-gray-700">Della Marcelina</td>
                  <td className="py-4 text-center">
                    <span className="bg-green-100 text-green-600 px-4 py-1 rounded-full text-xs font-bold uppercase">
                      Completed
                    </span>
                  </td>
                  <td className="py-4 text-right font-bold text-gray-800">$45.00</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 font-semibold text-gray-700">Samantha Smith</td>
                  <td className="py-4 text-center">
                    <span className="bg-orange-100 text-orange-600 px-4 py-1 rounded-full text-xs font-bold uppercase">
                      Pending
                    </span>
                  </td>
                  <td className="py-4 text-right font-bold text-gray-800">$12.50</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}