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
import RootLayout from "./View/Dashbroad/RootLayout";
import BanLamViec from "./View/BanLamViec/BanLamViec";
import ThongTinNguoiDung from "./View/ThongTinNguoiDung/ThongTinNguoiDung";
import RouteChild from "./Router";
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<JwtLogin />} />
      <Route
        element={
          <ProtectedRoute>
            <RootLayout />
          </ProtectedRoute>
        }
      >
        {RouteChild.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
        {/* <Route path="/user/profile" element={<ThongTinNguoiDung />} />
        <Route path="/banlamviec" element={<BanLamViec />} /> */}
        {/* Add other protected routes here */}
      </Route>
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRouter;
