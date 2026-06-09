import {
  MdSpaceDashboard,
  MdListAlt,
  MdPeople,
  MdReportProblem,
  MdLockPerson,
  MdBlock,
  MdExtension,
} from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

export default function Sidebar() {
  const menuClass = ({ isActive }) =>
    `flex cursor-pointer items-center rounded-xl p-4 space-x-2
        ${
          isActive
            ? "text-hijau bg-green-200 font-extrabold"
            : "text-gray-600 hover:text-hijau hover:bg-green-200 hover:font-extrabold"
        }`;

  return (
    <div
      id="sidebar"
      className="flex min-h-screen w-[360px] flex-col bg-white p-10 shadow-lg"
    >
      <div id="sidebar-logo" className="flex flex-col">
        <span className="font-poppins text-[48px] text-gray-900">
          Sedap <b className="text-hijau">.</b>
        </span>
        <span className="font-semibold text-gray-400">
          Modern Admin Dashboard
        </span>
      </div>

      <div className="mt-10">
        <div id="sidebar-menu" className="mt-10">
          <ul id="menu-list" className="space-y-3">
            {/* MENU DASHBOARD */}
            <li>
              <NavLink to="/" className={menuClass}>
                <MdSpaceDashboard className="mr-4 text-xl" />
                Dashboard
              </NavLink>
            </li>

            {/* MENU ORDERS */}
            <li>
              <NavLink to="/orders" className={menuClass}>
                <MdListAlt className="mr-4 text-xl" />
                Order
              </NavLink>
            </li>

            {/* MENU CUSTOMERS */}
            <li>
              <NavLink to="/customers" className={menuClass}>
                <MdPeople className="mr-4 text-xl" />
                Customer
              </NavLink>
            </li>

            {/* MENU PRODUCTS */}
            <li>
              <NavLink to="/products" className={menuClass}>
                <MdPeople className="mr-4 text-xl" />
                Products
              </NavLink>
            </li>

            {/* MENU COMPONENTS (Tambahan Modul Pertemuan 10) */}
            <li>
              <NavLink to="/components" className={menuClass}>
                <MdExtension className="mr-4 text-xl" />
                Components
              </NavLink>
            </li>

            <li>
              <NavLink to="/fitur-xyz" className={menuClass}>
                <MdExtension className="mr-4 text-xl" />
                Fitur XYZ
              </NavLink>
            </li>

            <li>
              <NavLink to="/notes" className={menuClass}>
                <MdListAlt className="mr-4 text-xl" />
                Notes
              </NavLink>
            </li>

            {/* --- SEPARATOR UNTUK ERROR TESTING --- */}
            <div className="pt-4 pb-2">
              <hr className="border-gray-100" />
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Error Pages
              </span>
            </div>

            {/* MENU ERROR 400 */}
            <li>
              <NavLink to="/error-400" className={menuClass}>
                <MdReportProblem className="mr-4 text-xl text-orange-400" />
                Error 400
              </NavLink>
            </li>

            {/* MENU ERROR 401 */}
            <li>
              <NavLink to="/error-401" className={menuClass}>
                <MdLockPerson className="mr-4 text-xl text-red-400" />
                Error 401
              </NavLink>
            </li>

            {/* MENU ERROR 403 */}
            <li>
              <NavLink to="/error-403" className={menuClass}>
                <MdBlock className="mr-4 text-xl text-red-600" />
                Error 403
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-auto">
        <div className="bg-hijau px-4 py-4 rounded-2xl shadow-lg mb-10 flex items-center justify-between">
          <div className="text-white text-sm pr-2">
            <p>Please organize your menus through button below!</p>
            <button className="flex justify-center items-center p-2 mt-3 bg-white rounded-md text-gray-600 text-xs font-bold w-full">
              <FaPlus className="mr-2" /> Add Menus
            </button>
          </div>
          <img
            className="w-16 h-16 rounded-full object-cover"
            src="/img/avatar.png"
            alt="avatar"
          />
        </div>
        <span className="font-bold text-gray-400 block text-sm">
          Sedap Restaurant Admin
        </span>
        <p className="font-light text-gray-400 text-xs">
          {" "}
          @2026 All Right Reserved
        </p>
      </div>
    </div>
  );
}
