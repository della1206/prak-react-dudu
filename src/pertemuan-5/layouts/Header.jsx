import { FaBell, FaSearch } from "react-icons/fa";
import { FcAreaChart } from "react-icons/fc";
import { SlSettings } from "react-icons/sl";

export default function Header() {
    return (
        <div className="flex justify-between items-center p-6 bg-transparent">
            <div className="relative w-full max-w-lg">
                <input
                    className="border-none p-3 pr-10 bg-white w-full rounded-xl shadow-sm outline-none"
                    type="text"
                    placeholder="Search Here..."
                />
                <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300" />
            </div>

            <div className="flex items-center space-x-4">
                <div className="relative p-3 bg-blue-100 rounded-2xl text-blue-500 cursor-pointer">
                    <FaBell />
                    <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white rounded-full px-1.5 py-0.5 text-[10px]">50</span>
                </div>
                <div className="p-3 bg-blue-100 rounded-2xl cursor-pointer text-blue-500"><FcAreaChart /></div>
                <div className="p-3 bg-red-100 rounded-2xl text-red-500 cursor-pointer"><SlSettings /></div>

                <div className="flex items-center space-x-4 border-l pl-4 border-gray-300">
                    <span className="text-sm">Hello, <b>Della Marcelina</b></span>
                    <img src="/img/avatar.png" className="w-10 h-10 rounded-full" alt="profile" />
                </div>
            </div>
        </div>
    );
}

