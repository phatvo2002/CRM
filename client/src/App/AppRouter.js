import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import JwtLogin from "./View/session/JwtLogin";
import UserProfile from "./View/UserProfile";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "./View/Dashbroad/Dashbroad";
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<JwtLogin />} />
      <Route
        path="/user/profile"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRouter;
