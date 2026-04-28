import "./assets/tailwind.css";
import { Route, Routes } from "react-router-dom";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import Dashboard from "./pages/Dashboard";
import ErrorPage from "./pages/ErrorPage"; 
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Forgot from "./pages/auth/Forgot";
import AuthLayout from "./layouts/AuthLayout";

function App() {
  return (
    <Routes>
      {/* Wrapper Layout */}
      <Route element={<MainLayout />}> 
        {/* Main Routes */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/customers" element={<Customers />} />

         <Route element={<AuthLayout/>}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/forgot" element={<Forgot/>} />
        </Route>

        {/* Specific Error Routes */}
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

        {/* Catch-all 404 Route */}
        <Route
          path="*"
          element={
            <ErrorPage
              errorCode="404"
              title="Not Found"
              description="Halaman yang kamu cari nggak ada di sini."
              imageUrl="https://illustrations.popsy.co/gray/falling.svg"
            />
          }
        />
      </Route>
    </Routes>
  );
}

export default App;