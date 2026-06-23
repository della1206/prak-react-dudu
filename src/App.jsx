import "./assets/tailwind.css";
import { Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import Loading from "./components/Loading";
import AdminRoute from "./components/AdminRoute";

const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Orders = React.lazy(() => import("./pages/Orders"));
const Customers = React.lazy(() => import("./pages/Customers"));
const Products = React.lazy(() => import("./pages/Products"));
const ErrorPage = React.lazy(() => import("./pages/ErrorPage"));
const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));
const ProductDetail = React.lazy(() => import("./pages/ProductDetail"));
const ComponentsPage = React.lazy(() => import("./pages/Components"));
const FiturXyz = React.lazy(() => import("./pages/FiturXyz"));
const Notes = React.lazy(() => import("./pages/Notes"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Wrapper Main Layout */}
        <Route element={<MainLayout />}>
          <Route element={<AdminRoute allowedRoles={["admin", "member"]} />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
          </Route>
          <Route element={<AdminRoute allowedRoles={["admin"]} />}>
            <Route path="/customers" element={<Customers />} />
            <Route path="/products" element={<Products />} />
            {/* Route baru untuk detail produk */}
            <Route path="/products/:id" element={<ProductDetail />} />
            {/* Route baru untuk halaman playground components */}
            <Route path="/components" element={<ComponentsPage />} />
            <Route path="/fitur-xyz" element={<FiturXyz />} /> 
            <Route path="/notes" element={<Notes />} /> 
          </Route>
        </Route>

        {/* Wrapper Auth Layout */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>

        {/* Catch-all 404 Route */}
        <Route path="*" element={<ErrorPage errorCode="404" title="Not Found" />} />
      </Routes>
    </Suspense>
  );
}

export default App;
