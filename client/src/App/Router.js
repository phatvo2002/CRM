import { lazy ,Suspense  } from "react";


//quản trị hệ thống 
const BanLamViec = lazy(() =>
  import("./View/BanLamViec/BanLamViec")
);
const ThongTinNguoiDung = lazy(() =>
  import("./View/ThongTinNguoiDung")
);
const ThietLapNhanVien = lazy(() =>
  import("./View/ThietLap/ThietLap")
);
const ThemMoiNguoiDung = lazy(() =>
  import("./View/ThietLap/AddNguoiDung")
);
const ChangePassword = lazy(() =>
  import("./View/session/ChangePassword")
);
const ThietLapVaiTro = lazy(() =>
  import("./View/ThietLap/ThietLapVaiTro/Index")
);
const QuanLyPhongban = lazy(() =>
  import("./View/ThietLap/QuanLyPhongBan")
);
const QuanLyMenu = lazy(() =>
  import("./View/ThietLap/QuanLyMenu/index")
);
const DashBoardThietLap = lazy(() =>
  import("./View/ThietLap/DashBoardThietLap")
);
const KhachHangTiemNang = lazy(() =>
  import("./View/KhachHangTiemNang/index")
)
const ThemMoiKhachHangTiemNang = lazy(() => import("./View/KhachHangTiemNang/components/AddKhachHangTiemNang"));

const KhachHangTiemNangDetail = lazy(() => import("./View/KhachHangTiemNang/components/KhachHangTiemNangDetail"));
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

    // Khách hàng tiềm năng
    {
      path: "/tiemnang",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
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
];

export default RouteChild;
