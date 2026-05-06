import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(StoreContext);
  const location = useLocation();

  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname + location.search }}
      />
    );
  }

  return children;
};

export default ProtectedRoute;
