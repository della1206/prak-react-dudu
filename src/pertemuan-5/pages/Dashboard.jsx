import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";
/* 2️⃣ Tambahkan Komponen PageHeader */
import PageHeader from "../components/PageHeader";

export default function Dashboard() {
    return (
        <div id="dashboard-container">
            <PageHeader />

            {/* 3️⃣ Terapkan layout dan flexbox di dashboard-grid */}
            <div id="dashboard-grid" className="p-5 grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                </div>
                {/* Komponen Baru: Tabel Recent Orders */}
                <div className="mt-8 p-6 bg-white rounded-2xl shadow-sm mx-5">
                    <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
                    <table className="w-full text-left">
                        <tr className="text-gray-400 border-b text-sm">
                            <th className="pb-3">Customer</th>
                            <th className="pb-3">Status</th>
                        </tr>
                        <tr className="border-b">
                            <td className="py-3 font-medium">Della Marcelina</td>
                            <td><span className="text-hijau bg-green-100 px-3 py-1 rounded-full text-xs">Completed</span></td>
                        </tr>
                    </table>
                </div>
                
                {/* 4️⃣ Styling Card Count - Total Orders */}
                <div id="dashboard-orders" className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4 transition-all 
                duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
                    <div id="orders-icon" className="bg-hijau rounded-full p-4 text-3xl text-white">
                        <FaShoppingCart />
                    </div>
                    <div id="orders-info" className="flex flex-col">
                        <span id="orders-count" className="text-2xl font-bold">75</span>
                        <span id="orders-text" className="text-gray-400">Total Orders</span>
                    </div>
                </div>

                {/* Card - Total Delivered */}
                <div id="dashboard-delivered" className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4">
                    <div id="delivered-icon" className="bg-biru rounded-full p-4 text-3xl text-white">
                        <FaTruck />
                    </div>
                    <div id="delivered-info" className="flex flex-col">
                        <span id="delivered-count" className="text-2xl font-bold">175</span>
                        <span id="delivered-text" className="text-gray-400">Total Delivered</span>
                    </div>
                </div>

                {/* Card - Total Canceled */}
                <div id="dashboard-canceled" className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4">
                    <div id="canceled-icon" className="bg-merah rounded-full p-4 text-3xl text-white">
                        <FaBan />
                    </div>
                    <div id="canceled-info" className="flex flex-col">
                        <span id="canceled-count" className="text-2xl font-bold">40</span>
                        <span id="canceled-text" className="text-gray-400">Total Canceled</span>
                    </div>
                </div>

                {/* Card - Total Revenue */}
                <div id="dashboard-revenue" className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4">
                    <div id="revenue-icon" className="bg-kuning rounded-full p-4 text-3xl text-white">
                        <FaDollarSign />
                    </div>
                    <div id="revenue-info" className="flex flex-col">
                        <span id="revenue-amount" className="text-2xl font-bold">Rp.128</span>
                        <span id="revenue-text" className="text-gray-400">Total Revenue</span>
                    </div>
                </div>

            </div>
    );
}