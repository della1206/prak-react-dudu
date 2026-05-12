import { useEffect, useState } from "react"; // Tambahkan ini
import { Link } from "react-router-dom";
import axios from "axios"; // Tambahkan ini
import PageHeader from "../components/PageHeader";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((response) => {
        setProducts(response.data.products);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal mengambil data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-6 text-center">Menyiapkan menu...</div>;

  return (
    <div id="dashboard-container" className="p-6 bg-gray-50 min-h-screen">
      <PageHeader title="Products" />

      <div className="mt-6 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">ID</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Product</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase text-right">Price</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase text-center">Stock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-500">#{item.id}</td>
                  <td className="px-6 py-4">
                    {/* Link Detail Sesuai Modul */}
                    <Link 
                      to={`/products/${item.id}`} 
                      className="text-emerald-400 hover:text-emerald-500 font-bold"
                    >
                      {item.title}
                    </Link>
                    <div className="text-[10px] text-gray-400 font-mono uppercase">{item.brand}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.category}</td>
                  <td className="px-6 py-4 text-sm text-right font-semibold text-blue-600">
                    ${item.price}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.stock < 10 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {item.stock}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
