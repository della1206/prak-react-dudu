import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../contexts/AuthContext";

const Orders = () => {
  const { isAdmin, profile } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [members, setMembers] = useState([]);
  const [products, setProducts] = useState([]);
  const [dataForm, setDataForm] = useState({
    customer_id: "",
    product_id: "",
    quantity: 1,
  });

  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-700",
    success: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  useEffect(() => {
    loadOrders();
    loadOptions();
  }, [isAdmin, profile]);

  const loadOrders = async () => {
    const { data } = await supabase
      .from("orders")
      .select("id, customer_id, status, total_original, total_discount, total_final, points_earned, created_at, profiles(full_name)")
      .order("created_at", { ascending: false });

    setOrders(data || []);
  };

  const handleStatusChange = async (orderId, status) => {
    if (!isAdmin) return;

    await supabase
      .from("orders")
      .update({ status })
      .eq("id", orderId);

    loadOrders();
  };

  const loadOptions = async () => {
    const memberQuery = isAdmin
      ? supabase
          .from("profiles")
          .select("id, full_name, tier, total_points")
          .eq("role", "member")
          .order("full_name", { ascending: true })
      : Promise.resolve({ data: profile ? [profile] : [] });

    const [{ data: memberRows }, { data: productRows }] = await Promise.all([
      memberQuery,
      supabase
        .from("products")
        .select("id, name, price, stock")
        .gt("stock", 0)
        .order("name", { ascending: true }),
    ]);

    setMembers(memberRows || []);
    setProducts(productRows || []);
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const openEditModal = (order) => {
    if (!isAdmin) return;

    setEditingOrder({
      id: order.id,
      status: order.status,
    });
  };

  const closeEditModal = () => {
    setEditingOrder(null);
  };

  const handleEditChange = (evt) => {
    const { name, value } = evt.target;
    setEditingOrder((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!isAdmin || !editingOrder) return;

    const { error } = await supabase
      .from("orders")
      .update({ status: editingOrder.status })
      .eq("id", editingOrder.id);

    if (error) {
      console.error(error.message);
      return;
    }

    closeEditModal();
    loadOrders();
  };

  const handleDelete = async (orderId) => {
    if (!isAdmin) return;

    const confirmed = window.confirm("Hapus order ini?");
    if (!confirmed) return;

    const { error } = await supabase
      .from("orders")
      .delete()
      .eq("id", orderId);

    if (error) {
      console.error(error.message);
      return;
    }

    loadOrders();
  };

  const resetForm = () => {
    setDataForm({
      customer_id: "",
      product_id: "",
      quantity: 1,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const member = members.find((item) => item.id === dataForm.customer_id);
    const customerId = isAdmin ? dataForm.customer_id : profile?.id;
    const orderMember = isAdmin ? member : profile;
    const product = products.find((item) => item.id === dataForm.product_id);
    const quantity = Number(dataForm.quantity);

    if (!orderMember || !customerId || !product || quantity < 1 || product.stock < quantity) return;

    const { error } = await supabase.rpc("place_order", {
      p_customer_id: customerId,
      p_product_id: product.id,
      p_quantity: quantity,
    });

    if (error) {
      console.error(error.message);
      return;
    }

    setIsModalOpen(false);
    resetForm();
    await loadOrders();
    await loadOptions();
  };

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
              {isAdmin && <th className="p-4 font-semibold text-right">Action</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-green-50 transition-colors">
                <td className="p-4 font-medium text-hijau">ORD-{order.id.slice(0, 8)}</td>
                <td className="p-4">{order.profiles?.full_name || "Member"}</td>
                <td className="p-4">
                  {isAdmin ? (
                    <select
                      value={order.status}
                      onChange={(evt) => handleStatusChange(order.id, evt.target.value)}
                      className={`px-3 py-1 rounded-full text-xs font-bold capitalize outline-none ${statusStyles[order.status] || statusStyles.pending}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="success">Success</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  ) : (
                    <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${statusStyles[order.status] || statusStyles.pending}`}>
                      {order.status}
                    </span>
                  )}
                </td>
                <td className="p-4">Rp {Number(order.total_final).toLocaleString("id-ID")}</td>
                <td className="p-4 text-gray-500">
                  {new Date(order.created_at).toLocaleDateString("id-ID")}
                </td>
                {isAdmin && (
                  <td className="p-4">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => openEditModal(order)}
                        className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 text-sm font-semibold hover:bg-blue-100 transition"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(order.id)}
                        className="px-3 py-1.5 rounded-lg bg-red-50 text-red-600 text-sm font-semibold hover:bg-red-100 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={isAdmin ? 6 : 5} className="p-6 text-center text-gray-400">
                  Belum ada pesanan.
                </td>
              </tr>
            )}
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
                x
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {isAdmin ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                  <select
                    name="customer_id"
                    value={dataForm.customer_id}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hijau focus:border-transparent outline-none"
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select customer</option>
                    {members.map((member) => (
                      <option key={member.id} value={member.id}>
                        {member.full_name} - {member.tier}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                  <input
                    type="text"
                    value={`${profile?.full_name || "Member"} - ${profile?.tier || "bronze"}`}
                    className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50 outline-none"
                    disabled
                    readOnly
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product</label>
                <select
                  name="product_id"
                  value={dataForm.product_id}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hijau outline-none"
                  onChange={handleChange}
                  required
                >
                  <option value="">Select product</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name} - Stok {product.stock}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  min="1"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hijau outline-none"
                  placeholder="1"
                  value={dataForm.quantity}
                  onChange={handleChange}
                  required
                />
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

      {/* Modal Form Edit Order */}
      {editingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 transform transition-all">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Edit Order</h2>
              <button onClick={closeEditModal} className="text-gray-400 hover:text-gray-600">
                x
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleEditSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  value={editingOrder.status}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hijau outline-none capitalize"
                  onChange={handleEditChange}
                  required
                >
                  <option value="pending">Pending</option>
                  <option value="success">Success</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-hijau text-white rounded-xl font-semibold hover:bg-green-700 transition shadow-lg shadow-green-200"
                >
                  Save Changes
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
