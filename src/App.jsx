import Sidebar from "./pertemuan-5/layouts/Sidebar";
import Header from "./pertemuan-5/layouts/Header";
import Dashboard from "./pertemuan-5/pages/Dashboard";

function App() {
  return (
    // app-container: Background abu-abu, tinggi layar penuh, layout horizontal
    <div id="app-container" className="bg-gray-100 min-h-screen flex">
      
      {/* layout-wrapper: Pembungkus utama Sidebar dan Konten */}
      <div id="layout-wrapper" className="flex flex-row flex-1">
        
        {/* SISI KIRI: Sidebar (lebar tetap) */}
        <Sidebar />

        {/* SISI KANAN: Konten Utama (Header & Dashboard) */}
        <div id="main-content" className="flex-1 flex flex-col">
          <Header />
          
          {/* Dashboard berisi PageHeader dan Grid Card */}
          <main className="p-4">
            <Dashboard />
          </main>
        </div>

      </div>
    </div>
  );
}

export default App;