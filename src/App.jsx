import Header from "./pertemuan-5/layouts/Header";
import "./assets/tailwind.css";
import { Route, Routes } from "react-router-dom";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import Sidebar from "./layouts/Sidebar";
import Dashboard from "./pages/Dashboard";
import ErrorPage from "./pages/ErrorPage"; 

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
            {/* Route Utama */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/customers" element={<Customers />} />

            {/* Error 400 */}
            <Route
              path="/error-400"
              element={
                <ErrorPage
                  errorCode="400"
                  title="Bad Request"
                  description="Sistem bingung nih, ada yang salah dengan permintaan kamu."
                  imageUrl="https://illustrations.popsy.co/gray/crashed-error.svg"
                />
              }
            />

            {/* Error 401 */}
            <Route
              path="/error-401"
              element={
                <ErrorPage
                  errorCode="401"
                  title="Unauthorized"
                  description="Opps! Kamu nggak punya kunci buat masuk ke pintu ini."
                  imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMDdKqiQ2yUWdtcyb1uRtgzD19LOaFdRQipA&s"
                />
              }
            />

            {/* Error 403 */}
            <Route
              path="/error-403"
              element={
                <ErrorPage
                  errorCode="403"
                  title="Forbidden"
                  description="Area terlarang! Kamu dilarang keras mengakses halaman ini."
                  imageUrl="https://apisimhpnas.bpkp.go.id/img/HauntedHouseForeground.png"
                />
              }
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
