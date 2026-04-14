import { FaHome, FaClipboardList, FaUsers, FaPlus } from "react-icons/fa";

export default function Sidebar() {
    return (
        <div id="sidebar" className="flex min-h-screen w-[360px] flex-col bg-white p-10 shadow-lg">
            <div id="sidebar-logo" className="flex flex-col">
                <span className="font-poppins text-[48px] text-gray-900">
                    Sedap <b className="text-hijau">.</b>
                </span>
                <span className="font-semibold text-gray-400">Modern Admin Dashboard</span>
            </div>

            <div className="mt-10">
                <ul className="space-y-3">
                    <li className="hover:text-hijau flex cursor-pointer items-center rounded-xl p-4 font-medium text-gray-600 hover:bg-green-100 hover:font-extrabold">
                        <FaHome className="mr-4 text-xl" /> Dashboard
                    </li>
                    <li className="hover:text-hijau flex cursor-pointer items-center rounded-xl p-4 font-medium text-gray-600 hover:bg-green-100 hover:font-extrabold">
                        <FaClipboardList className="mr-4 text-xl" /> Orders
                    </li>
                    <li className="hover:text-hijau flex cursor-pointer items-center rounded-xl p-4 font-medium text-gray-600 hover:bg-green-100 hover:font-extrabold">
                        <FaUsers className="mr-4 text-xl" /> Customers
                    </li>
                </ul>
            </div>

            <div className="mt-auto">
                <div className="bg-hijau px-4 py-4 rounded-2xl shadow-lg mb-10 flex items-center justify-between">
                    <div className="text-white text-sm pr-2">
                        <p>Please organize your menus through button below!</p>
                        <button className="flex justify-center items-center p-2 mt-3 bg-white rounded-md text-gray-600 text-xs font-bold w-full">
                            <FaPlus className="mr-2"/> Add Menus
                        </button>
                    </div>
                    <img className="w-16 h-16 rounded-full object-cover" src="/img/avatar.png" alt="avatar" />
                </div>
                <span className="font-bold text-gray-400 block text-sm">Sedap Restaurant Admin</span>
                <p className="font-light text-gray-400 text-xs"> 2025 All Right Reserved</p>
            </div>
        </div>
    );
}