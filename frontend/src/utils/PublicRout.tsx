import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const token = localStorage.getItem("token");
  console.log("PublicRoute token:", token);
  return token ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default PublicRoute;
