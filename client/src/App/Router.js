import { lazy } from "react";

import BanLamViec from "./View/BanLamViec/BanLamViec";

import ThongTinNguoiDung from "./View/ThongTinNguoiDung/ThongTinNguoiDung";

import ThietLap from "./View/ThietLap/ThietLap";

import ThemMoiNguoiDung from "./View/ThietLap/AddNguoiDung";

import ChangePassword from "./View/session/ChangePassword";

import ThietLapVaiTro from "./View/ThietLap/ThietLapVaiTro/Index";

const RouteChild = [
  {
    path: "/banlamviec",
    element: <BanLamViec />,
  },
  {
    path: "/user/profile",
    element: <ThongTinNguoiDung />,
  },
  {
    path: "/thietlap",
    element: <ThietLap />,
  },

  {
    path: "/thietlapvaitro",
    element: <ThietLapVaiTro />,
  },

  {
    path: "/nguoidung/themmoi",
    element: <ThemMoiNguoiDung />,
  },

  {
    path: "/doimatkhau",
    element: <ChangePassword />,
  },



];

export default RouteChild;
