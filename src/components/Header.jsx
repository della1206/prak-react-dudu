import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBell, FaSearch } from "react-icons/fa";
import { FcAreaChart } from "react-icons/fc";
import { SlSettings } from "react-icons/sl";
import { useAuth } from "../contexts/AuthContext";

export default function Header() {
    const navigate = useNavigate();
    const { user, profile, signOut } = useAuth();
    const [open, setOpen] = useState(false);

    const isEmailValue = (value) => typeof value === "string" && value.includes("@");
    const profileName = profile?.full_name?.trim();
    const metadataName = user?.user_metadata?.full_name?.trim();
    const displayName = !isEmailValue(profileName) && profileName
        ? profileName
        : !isEmailValue(metadataName) && metadataName
            ? metadataName
            : user?.email?.split("@")[0] || "Member";

    const handleLogout = async () => {
        await signOut?.();
        setOpen(false);
        navigate("/login");
    };

    return (
        <div className="flex justify-between items-center p-6 bg-transparent">
            <div className="relative w-full max-w-lg">
                <input
                    className="border-none p-3 pr-10 bg-white w-full rounded-xl shadow-sm outline-none focus:ring-2 focus:ring-hijau transition-all"
                    type="text"
                    placeholder="Search Here..."
                />
                <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300" />
            </div>

            <div className="flex items-center space-x-4">
                {/* Lonceng dengan Animasi Ping */}
                <div className="relative p-3 bg-blue-100 rounded-2xl text-blue-500 cursor-pointer">
                    <FaBell />
                    <span className="absolute top-2 right-2 h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500 border-2 border-white"></span>
                    </span>
                </div>
                
                <div className="p-3 bg-blue-100 rounded-2xl cursor-pointer text-blue-500"><FcAreaChart /></div>
                <div className="p-3 bg-red-100 rounded-2xl text-red-500 cursor-pointer"><SlSettings /></div>

                <div className="relative flex items-center space-x-4 border-l pl-4 border-gray-300">
                    <span className="text-sm">Hello, <b>{displayName}</b></span>
                    <button
                        type="button"
                        className="relative"
                        onClick={() => setOpen((prev) => !prev)}
                        aria-haspopup="menu"
                        aria-expanded={open}
                    >
                        <img src="/img/avatar.png" className="w-10 h-10 rounded-full" alt="profile" />
                    </button>

                    {open && (
                        <div className="absolute right-0 top-full mt-2 w-36 rounded-xl border border-gray-200 bg-white shadow-xl z-10">
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
