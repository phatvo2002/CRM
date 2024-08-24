import { lazy } from "react";

import BanLamViec from "./View/BanLamViec/BanLamViec";

import ThongTinNguoiDung from "./View/ThongTinNguoiDung/ThongTinNguoiDung";

import ThietLap from "./View/ThietLap/ThietLap";

import ThemMoiNguoiDung from "./View/ThietLap/AddNguoiDung";

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
    path: "/nguoidung/themmoi",
    element: <ThemMoiNguoiDung />,
  },
];

export default RouteChild;
