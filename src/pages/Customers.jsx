import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { supabase } from "../lib/supabaseClient";
import { getTierByPoints } from "../lib/memberRules";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [dataForm, setDataForm] = useState({
    full_name: "",
    role: "member",
    tier: "bronze",
    total_points: 0,
  });

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("id, full_name, role, tier, total_points, updated_at")
      .order("updated_at", { ascending: false });

    setCustomers(data || []);
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    const nextForm = {
      ...dataForm,
      [name]: value,
    };

    if (name === "total_points") {
      nextForm.tier = getTierByPoints(Number(value));
    }

    setDataForm(nextForm);
  };

  const openEditForm = (customer) => {
    setSelectedCustomer(customer);
    setDataForm({
      full_name: customer.full_name,
      role: customer.role,
      tier: customer.tier,
      total_points: customer.total_points,
    });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await supabase
      .from("profiles")
      .update({
        full_name: dataForm.full_name,
        role: dataForm.role,
        tier: dataForm.tier,
        total_points: Number(dataForm.total_points),
      })
      .eq("id", selectedCustomer.id);

    setShowForm(false);
    loadCustomers();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus member ini?")) {
      await supabase.from("profiles").delete().eq("id", id);
      loadCustomers();
    }
  };

  return (
    <div className="p-4">
      <PageHeader title="Customer List" breadcrumb="Home > Customers" />

      {/* Tabel Data */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-semibold">
            <tr>
              <th className="p-4">Customer ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Role</th>
              <th className="p-3">Points</th>
              <th className="p-3">Tier</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {customers.map((item) => (
              <tr key={item.id} className="border-t hover:bg-gray-50">
                <td className="p-4 font-medium text-hijau">{item.id.slice(0, 8)}</td>
                <td className="p-3">{item.full_name}</td>
                <td className="p-3 capitalize">{item.role}</td>
                <td className="p-3">{item.total_points}</td>
                <td className="p-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    item.tier === "gold" || item.tier === "platinum" ? "bg-yellow-100 text-yellow-700" :
                    item.tier === "silver" ? "bg-gray-100 text-gray-700" : "bg-orange-100 text-orange-700"
                  }`}>
                    {item.tier}
                  </span>
                </td>
                <td className="p-3 space-x-2">
                  <button
                    type="button"
                    onClick={() => openEditForm(item)}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-bold"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-xs font-bold"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
            {customers.length === 0 && (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-400">
                  Belum ada member.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Sederhana Modal Form Pop-up */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Edit Customer</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="full_name"
                value={dataForm.full_name}
                placeholder="Customer Name"
                className="w-full p-2 border rounded-lg focus:outline-hijau"
                onChange={handleChange}
                required
              />
              <select
                name="role"
                value={dataForm.role}
                className="w-full p-2 border rounded-lg focus:outline-hijau"
                onChange={handleChange}
              >
                <option value="admin">Admin</option>
                <option value="member">Member</option>
                <option value="guest">Guest</option>
              </select>
              <input
                type="number"
                name="total_points"
                value={dataForm.total_points}
                placeholder="Total Points"
                className="w-full p-2 border rounded-lg focus:outline-hijau"
                onChange={handleChange}
                required
              />
              <select
                name="tier"
                value={dataForm.tier}
                className="w-full p-2 border rounded-lg focus:outline-hijau"
                onChange={handleChange}
              >
                <option value="bronze">Bronze</option>
                <option value="silver">Silver</option>
                <option value="gold">Gold</option>
                <option value="platinum">Platinum</option>
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
