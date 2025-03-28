import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import JwtLogin from "./View/session/JwtLogin";
import ProtectedRoute from "./ProtectedRoute";
import RootLayout from "./View/Dashbroad/RootLayout";
import RouteChild from "./Router";
import NotFound from "./View/session/NotFound";
import XacNhanPage from "./View/session/XacNhanPage";
import ChiTietDonHang from "./View/session/ChiTietDonHang";
const AppRouter = () => {
  return (
    <Routes>
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
      </Route>
     <Route path="/" element={<Navigate to="/user/profile" />} />
     <Route path="*" element={<NotFound />} />
     <Route path="/XemBaoGia/:id" element={<XacNhanPage />} />
     <Route path="/donhang/chitietdonhang/:id" element={<ChiTietDonHang />} />
     <Route path="/login" element={<JwtLogin />} />
    </Routes>
  );
};

export default AppRouter;
