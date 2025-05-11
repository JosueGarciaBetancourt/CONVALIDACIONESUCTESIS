// src/components/PrivateRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import routes from "../routes";

const PrivateRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return <Outlet />;
  //if (loading) return <div className="text-center p-10">Cargando...</div>;
  
  return user ? <Outlet /> : <Navigate to={routes.login} />;
};

export default PrivateRoute;
