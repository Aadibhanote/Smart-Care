import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("userToken");

  if (!token) {
    // 🚫 No token → redirect to login page
    return <Navigate to="/login" replace />;
  }

  // ✅ Token found → allow access
  return children;
};

export default ProtectedRoute;
