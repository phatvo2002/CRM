import { Box, CircularProgress } from "@mui/material";
import { lazy, Suspense } from "react";
import { Lazy } from "yup";

//quản trị hệ thống
const BanLamViec = lazy(() => import("./View/BanLamViec/BanLamViec"));
const BanLamViecNV = lazy(() => import("./View/BanLamViec/NhanVien"));
const BanLamViecTP = lazy(() => import("./View/BanLamViec/TruongPhong"));
const ThongTinNguoiDung = lazy(() => import("./View/ThongTinNguoiDung"));
const ThietLapNhanVien = lazy(() => import("./View/ThietLap/ThietLap"));
const ThemMoiNguoiDung = lazy(() => import("./View/ThietLap/AddNguoiDung"));
const ChangePassword = lazy(() => import("./View/session/ChangePassword"));
const XepLoai = lazy(()=> import("./View/ThietLap/QuanLyXepLoai"))
const ThietLapVaiTro = lazy(
  () => import("./View/ThietLap/ThietLapVaiTro/Index")
);
const QuyTrinhBanHang = lazy(
  () => import("./View/ThietLap/QuyTrinhBanHang/index")
);
const QuanLyPhongban = lazy(() => import("./View/ThietLap/QuanLyPhongBan"));
const QuanLyMenu = lazy(() => import("./View/ThietLap/QuanLyMenu/index"));
const DashBoardThietLap = lazy(
  () => import("./View/ThietLap/DashBoardThietLap")
);
const ThietLapMail = lazy(() => import("./View/ThietLap/ThietLapMail/index"));
// khách hàng tiềm năng
const KhachHangTiemNang = lazy(() => import("./View/KhachHangTiemNang/index"));
const ThemMoiKhachHangTiemNang = lazy(
  () => import("./View/KhachHangTiemNang/components/AddKhachHangTiemNang")
);
const KhachHangTiemNangDetail = lazy(
  () => import("./View/KhachHangTiemNang/components/KhachHangTiemNangDetail")
);
const ImportKhachHangTiemNang = lazy(
  () => import("./View/KhachHangTiemNang/components/ImportKhachHang")
);
// Khách hàng mục tiêu
const KhachHangMucTieu = lazy(() => import("./View/KhachHangMucTieu/index"));
const ThemMoiKhachHangMucTieu = lazy(
  () => import("./View/KhachHangMucTieu/Pages/AddKhachHangMucTieu")
);
const KhachHangMucTieuDetail = lazy(
  () => import("./View/KhachHangMucTieu/Pages/KhachHangMucTieuDetail")
);
// Hàng hóa
const HangHoa = lazy(() => import("./View/HangHoa/index"));
const ThongBaoDetail = lazy(
  () => import("./Components/CustomNotification/NotificationList")
);
// cơ hội
const CoHoi = lazy(() => import("./View/CoHoi/index"));

const CoHoiDetail = lazy(() => import("./View/CoHoi/Pages/CoHoiDetail/index"));
// báo giá
const BaoGia = lazy(() => import("./View/BaoGia/index"));
const ChiTietBaoGia = lazy(() => import("./View/BaoGia/pages/chitiet/index"));

// đơn hàng
const DonHang = lazy(() => import("./View/DonHang/index"));
const NhiemVu = lazy(() => import("./View/NhiemVu/index"));
// Mục tiêu
const MucTieu = lazy(() => import("./View/MucTieu/index"));

const RouteChild = [
  {
    path: "/banlamviec",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <BanLamViec />
      </Suspense>
    ),
  },
  {
    path: "/nvbanlamviec",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <BanLamViecNV />
      </Suspense>
    ),
  },
  {
    path: "/tpbanlamviecj",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <BanLamViecTP />
      </Suspense>
    ),
  },
  {
    path: "/user/profile",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <ThongTinNguoiDung />
      </Suspense>
    ),
  },
  // {
  //   path: "/thietlap",
  //   element: (
  //     <Suspense fallback={<div>Loading...</div>}>
  //       <DashBoardThietLap />
  //     </Suspense>
  //   ),
  // },

  // Quản trị hệ thống
  {
    path: "/quantrihethong/thietlapvaitro",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <ThietLapVaiTro />
      </Suspense>
    ),
  },
  {
    path: "/quantrihethong/quanlyphongban",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <QuanLyPhongban />
      </Suspense>
    ),
  },
  {
    path: "/quantrihethong/quanlymenu",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <QuanLyMenu />
      </Suspense>
    ),
  },
  {
    path: "/quantrihethong/thietlapnhanvien",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <ThietLapNhanVien />
      </Suspense>
    ),
  },
  {
    path: "/quantrihethong/quytrinhbanhang",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <QuyTrinhBanHang />
      </Suspense>
    ),
  },
  {
    path: "/nguoidung/themmoi",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <ThemMoiNguoiDung />
      </Suspense>
    ),
  },

  {
    path: "/doimatkhau",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <ChangePassword />
      </Suspense>
    ),
  },
  {
    path: "/quantrihethong",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <DashBoardThietLap />
      </Suspense>
    ),
  },
  {
    path: "/thietlapmail",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <ThietLapMail />
      </Suspense>
    ),
  },
  {
    path: "/quantrihethong/xeploai",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <XepLoai />
      </Suspense>
    ),
  },

  // Khách hàng tiềm năng
  {
    path: "/tiemnang",
    element: (
      <Suspense
        fallback={
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              width: "100vw",
            }}
          >
            <CircularProgress />
          </Box>
        }
      >
        <KhachHangTiemNang />
      </Suspense>
    ),
  },
  {
    path: "/tiemnang/themmoikhachhangtiemnang",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <ThemMoiKhachHangTiemNang />
      </Suspense>
    ),
  },
  {
    path: "/tiemnang/:id",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <KhachHangTiemNangDetail />
      </Suspense>
    ),
  },
  {
    path: "/tiemnang/uploadkhachhang",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <ImportKhachHangTiemNang />
      </Suspense>
    ),
  },
  // Khách hàng mục tiêu
  {
    path: "/khachhang",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <KhachHangMucTieu />
      </Suspense>
    ),
  },
  {
    path: "/khachhang/themmoikhachhang",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <ThemMoiKhachHangMucTieu />
      </Suspense>
    ),
  },
  {
    path: "/khachhang/:id",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <KhachHangMucTieuDetail />
      </Suspense>
    ),
  },
  // hàng hóa
  {
    path: "/hanghoa",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <HangHoa />
      </Suspense>
    ),
  },
  // thông báo
  {
    path: "/thongbao",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <ThongBaoDetail />
      </Suspense>
    ),
  },
  // nhiệm vụ
  {
    path: "/nhiemvu",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <NhiemVu />
      </Suspense>
    ),
  },
  // Cơ hội
  {
    path: "/cohoi",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <CoHoi />
      </Suspense>
    ),
  },
  {
    path: "/cohoi/:id",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <CoHoiDetail />
      </Suspense>
    ),
  },

  // báo giá
  {
    path: "/baogia",
    element: (
      <Suspense
        fallback={
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              width: "100vw",
            }}
          >
            <CircularProgress />
          </Box>
        }
      >
        <BaoGia />
      </Suspense>
    ),
  },
  {
    path: "/baogia/:id",
    element: (
      <Suspense
        fallback={
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              width: "100vw",
            }}
          >
            <CircularProgress />
          </Box>
        }
      >
        <ChiTietBaoGia />
      </Suspense>
    ),
  },

  // đơn hàng
  {
    path: "/donhang",
    element: (
      <Suspense
        fallback={
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              width: "100vw",
            }}
          >
            <CircularProgress />
          </Box>
        }
      >
        <DonHang />
      </Suspense>
    ),
  },
  {
    path: "/muctieu",
    element: (
      <Suspense
        fallback={
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              width: "100vw",
            }}
          >
            <CircularProgress />
          </Box>
        }
      >
        <MucTieu />
      </Suspense>
    ),
  },
];

export default RouteChild;
