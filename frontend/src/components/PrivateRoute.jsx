import { Navigate, Outlet } from "react-router-dom";
import routes from "../routes";

const PrivateRoute = () => {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to={routes.login} />;
};

export default PrivateRoute;
