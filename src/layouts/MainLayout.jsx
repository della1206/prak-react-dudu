import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function MainLayout( ) {
    return(
        <div id="app-container" className="bg-gray-100 min-h-screen flex">
      {/* 1. Sidebar tetap di sebelah kiri */}
      <Sidebar />

      {/* 2. Area Konten Utama */}
      <div id="main-content" className="flex-1 flex flex-col">
        {/* Header paling atas */}
        <Header />

        <Outlet />
      </div>
    </div>
    )
}