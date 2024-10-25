import { lazy } from "react";

import BanLamViec from "./View/BanLamViec/BanLamViec";

import ThongTinNguoiDung from "./View/ThongTinNguoiDung/ThongTinNguoiDung";

import ThietLapNhanVien from "./View/ThietLap/ThietLap";

import ThemMoiNguoiDung from "./View/ThietLap/AddNguoiDung";

import ChangePassword from "./View/session/ChangePassword";

import ThietLapVaiTro from "./View/ThietLap/ThietLapVaiTro/Index";

import DashBoardThietLap from "./View/ThietLap/DashBoardThietLap";

import QuanLyPhongban from "./View/ThietLap/QuanLyPhongBan";
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
    element: <DashBoardThietLap />,
  },
  {
    path: "/thietlap/thietlapvaitro",
    element: <ThietLapVaiTro />,
  },
  {
    path: "/thietlap/quanlyphongban",
    element: <QuanLyPhongban />,
  },
  {
    path: "/thietlap/thietlapnhanvien",
    element: <ThietLapNhanVien />,
  },
  {
    path: "/nguoidung/themmoi",
    element: <ThemMoiNguoiDung />,
  },

  {
    path: "/doimatkhau",
    element: <ChangePassword />,
  },
  {
    path: "/quantrihethong",
    element: <DashBoardThietLap />,
  },


];

export default RouteChild;
