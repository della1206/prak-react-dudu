
import Header from "./pertemuan-5/layouts/Header";
import "./assets/tailwind.css";
import { Route, Routes } from "react-router-dom";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import Sidebar from "./layouts/Sidebar";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div id="app-container" className="bg-gray-100 min-h-screen flex">
      
      {/* 1. Sidebar tetap di sebelah kiri */}
      <Sidebar />

      {/* 2. Area Konten Utama */}
      <div id="main-content" className="flex-1 flex flex-col">
        
        {/* Header paling atas */}
        <Header />
        
        {/* 3. Area Halaman (Berubah sesuai Menu) */}
        <main className="flex-1 p-6">
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/customers" element={<Customers />} />
          </Routes>
        </main>

      </div>
    </div>
  );
}

export default App;