import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';

// Generate 30 Data Customers
const customerData = Array.from({ length: 30 }, (_, i) => ({
  id: `CUST-${2000 + i}`,
  name: ["Della", "Budi Santoso", "Siti Aminah", "Andi Wijaya", "Rina Pratama"][i % 5],
  email: `user${i}@pcr.ac.id`,
  phone: `0812-3456-78${i.toString().padStart(2, '0')}`,
  loyalty: i % 3 === 0 ? "Gold" : i % 3 === 1 ? "Silver" : "Bronze"
}));

const Customers = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="p-4">
      <PageHeader title="Customer List" breadcrumb="Home > Customers">
        <button 
          className="bg-hijau text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          onClick={() => setShowForm(true)}
        >
          + Add Customer
        </button>
      </PageHeader>

      {/* Tabel Data */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-semibold">
            <tr>
              <th className="p-4">Customer ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Loyalty</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {customerData.map((item) => (
              <tr key={item.id} className="border-t hover:bg-gray-50">
                <td className="p-4 font-medium text-hijau">{item.id}</td>
                <td className="p-3">{item.name}</td>
                <td className="p-3">{item.email}</td>
                <td className="p-3">{item.phone}</td>
                <td className="p-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    item.loyalty === 'Gold' ? 'bg-yellow-100 text-yellow-700' : 
                    item.loyalty === 'Silver' ? 'bg-gray-100 text-gray-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {item.loyalty}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Sederhana Modal Form Pop-up */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Add New Customer</h2>
            <form className="space-y-4">
              <input type="text" placeholder="Customer Name" className="w-full p-2 border rounded-lg focus:outline-hijau" />
              <input type="email" placeholder="Email" className="w-full p-2 border rounded-lg focus:outline-hijau" />
              <input type="text" placeholder="Phone Number" className="w-full p-2 border rounded-lg focus:outline-hijau" />
              <select className="w-full p-2 border rounded-lg focus:outline-hijau">
                <option>Bronze</option>
                <option>Silver</option>
                <option>Gold</option>
              </select>
              <div className="flex space-x-2 pt-4">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-2 bg-gray-200 rounded-lg">Cancel</button>
                <button type="submit" className="flex-1 py-2 bg-hijau text-white rounded-lg">Save Customer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers;