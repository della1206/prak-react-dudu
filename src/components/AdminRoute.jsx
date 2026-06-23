import { Navigate, Outlet } from "react-router-dom";
import Loading from "./Loading";
import { useAuth } from "../contexts/AuthContext";

export default function AdminRoute({ allowedRoles = ["admin"] }) {
  const { loading, user, profile } = useAuth();

  if (loading) return <Loading />;
  if (!user) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(profile?.role)) return <Navigate to="/" replace />;

  return <Outlet />;
}
