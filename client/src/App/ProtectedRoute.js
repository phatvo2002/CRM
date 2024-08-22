import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./Context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { authState } = useContext(AuthContext);

  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
};

export default ProtectedRoute;
