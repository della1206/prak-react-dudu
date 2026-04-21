import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';

// Generate 30 Data JSON untuk Orders
const orderData = Array.from({ length: 30 }, (_, i) => ({
  id: `ORD-${1000 + i}`,
  customerName: ["Della", "Andi", "Budi", "Siti", "Rina"][i % 5],
  status: i % 3 === 0 ? "Completed" : i % 3 === 1 ? "Pending" : "Cancelled",
  totalPrice: `Rp ${(100000 + (Math.random() * 400000)).toLocaleString('id-ID', { maximumFractionDigits: 0 })}`,
  date: "2026-04-21"
}));

const Orders = () => {
  // State untuk menampilkan/menyembunyikan Modal Form
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-4">
      <PageHeader title="Order List" breadcrumb="Home > Orders">
        <button 
          className="bg-hijau text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors shadow-md" 
          onClick={() => setIsModalOpen(true)}
        >
          + Add Orders
        </button>
      </PageHeader>
      
      {/* Tabel Data Orders */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b text-gray-600">
            <tr>
              <th className="p-4 font-semibold">Order ID</th>
              <th className="p-4 font-semibold">Customer Name</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold">Total Price</th>
              <th className="p-4 font-semibold">Order Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orderData.map((order) => (
              <tr key={order.id} className="hover:bg-green-50 transition-colors">
                <td className="p-4 font-medium text-hijau">{order.id}</td>
                <td className="p-4">{order.customerName}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    order.status === 'Completed' ? 'bg-green-100 text-green-700' : 
                    order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 
                    'bg-red-100 text-red-700'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="p-4">{order.totalPrice}</td>
                <td className="p-4 text-gray-500">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Form Add Order */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 transform transition-all">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Create New Order</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hijau focus:border-transparent outline-none" placeholder="Enter customer name" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hijau outline-none">
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Price (Rp)</label>
                <input type="number" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hijau outline-none" placeholder="0" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Order Date</label>
                <input type="date" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hijau outline-none" />
              </div>

              <div className="flex space-x-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-2.5 bg-hijau text-white rounded-xl font-semibold hover:bg-green-700 transition shadow-lg shadow-green-200"
                >
                  Save Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;