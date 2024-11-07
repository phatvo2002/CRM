import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (token) {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Tính thời gian hiện tại
    if (decodedToken.exp < currentTime) {
      localStorage.removeItem('token'); // Xóa token hết hạn
      return <Navigate to="/login" />;
    }
    return children;
  } else {
    console.log("No token found");
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
