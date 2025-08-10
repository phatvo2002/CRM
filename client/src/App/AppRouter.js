import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import JwtLogin from "./View/session/JwtLogin";
import ProtectedRoute from "./ProtectedRoute";
import RootLayout from "./View/Dashbroad/RootLayout";
import RouteChild, { RouteDefault } from "./Router";
import NotFound from "./View/session/NotFound";
import XacNhanPage from "./View/session/XacNhanPage";
import ChiTietDonHang from "./View/session/ChiTietDonHang";
import KhaoSat from "./View/session/KhaoSat";
import { useGetMenuRoleByIdQuery } from "./Api/MenuApi";
import ThongTinNguoiDung from "./View/ThongTinNguoiDung";
const AppRouter = () => {
  const [menu, setMenu] = React.useState([]);
  const roleId = localStorage.getItem("roleId");
  const {
    data: menuRoleData,
    error,
    isLoading,
  } = useGetMenuRoleByIdQuery(roleId, {
    skip: !roleId,
  });

  useEffect(() => {
    if (menuRoleData) {
      setMenu(menuRoleData.flatMap(r => r.menu?.menuChildrent || []));
    }
  }, [menuRoleData])
  return (
    <Routes>
      <Route
        element={
          <ProtectedRoute>
            <RootLayout />
          </ProtectedRoute>
        }
      >
        {/* Public routes */}
        {RouteDefault.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
        {menu
          .filter(routeRoot => RouteChild.some(route => routeRoot.url === route.path))
          .map((routeRoot, indexRoot) => {
            const matchedRoute = RouteChild.find(route => routeRoot.url === route.path);
            return matchedRoute ? (
              <Route
                key={indexRoot}
                path={matchedRoute.path}
                element={matchedRoute.element}
              />
            ) : null;
          })}

      </Route>
      <Route path="/" element={<Navigate to="/user/profile" />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/XemBaoGia/:id" element={<XacNhanPage />} />
      <Route path="/donhang/chitietdonhang/:id" element={<ChiTietDonHang />} />
      <Route path="/khaosat/:donhangid" element={<KhaoSat />} />
      <Route path="/login" element={<JwtLogin />} />
    </Routes>
  );
};

export default AppRouter;
