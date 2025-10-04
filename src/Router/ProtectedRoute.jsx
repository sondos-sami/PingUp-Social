import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("token");

  return isLoggedIn ? children : <Navigate to={"/auth/login"} />;
}

export default ProtectedRoute;
