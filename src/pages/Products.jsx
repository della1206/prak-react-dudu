import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { supabase } from "../lib/supabaseClient";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [dataForm, setDataForm] = useState({
    name: "",
    price: "",
    stock: "",
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("products")
      .select("id, name, price, stock, created_at")
      .order("created_at", { ascending: false });

    setProducts(data || []);
    setLoading(false);
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const openCreateForm = () => {
    setEditingProduct(null);
    setDataForm({ name: "", price: "", stock: "" });
    setShowForm(true);
  };

  const openEditForm = (product) => {
    setEditingProduct(product);
    setDataForm({
      name: product.name,
      price: product.price,
      stock: product.stock,
    });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: dataForm.name,
      price: Number(dataForm.price),
      stock: Number(dataForm.stock),
    };

    if (editingProduct) {
      await supabase.from("products").update(payload).eq("id", editingProduct.id);
    } else {
      await supabase.from("products").insert(payload);
    }

    setShowForm(false);
    loadProducts();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
      await supabase.from("products").delete().eq("id", id);
      loadProducts();
    }
  };

  if (loading) return <div className="p-6 text-center">Menyiapkan menu...</div>;

  return (
    <div id="dashboard-container" className="p-6 bg-gray-50 min-h-screen">
      <PageHeader title="Products">
        <button
          className="bg-hijau text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          onClick={openCreateForm}
        >
          + Add Product
        </button>
      </PageHeader>

      <div className="mt-6 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">ID</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Product</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase text-right">Price</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase text-center">Stock</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-500">#{item.id.slice(0, 8)}</td>
                  <td className="px-6 py-4">
                    <span className="text-emerald-400 font-bold">{item.name}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-right font-semibold text-blue-600">
                    Rp {Number(item.price).toLocaleString("id-ID")}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.stock < 10 ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                    }`}>
                      {item.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center space-x-2">
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
              {products.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-400">
                    Belum ada produk.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              {editingProduct ? "Edit Product" : "Add New Product"}
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={dataForm.name}
                placeholder="Product Name"
                className="w-full p-2 border rounded-lg focus:outline-hijau"
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="price"
                value={dataForm.price}
                placeholder="Price"
                className="w-full p-2 border rounded-lg focus:outline-hijau"
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="stock"
                value={dataForm.stock}
                placeholder="Stock"
                className="w-full p-2 border rounded-lg focus:outline-hijau"
                onChange={handleChange}
                required
              />
              <div className="flex space-x-2 pt-4">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-2 bg-gray-200 rounded-lg">
                  Cancel
                </button>
                <button type="submit" className="flex-1 py-2 bg-hijau text-white rounded-lg">
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
