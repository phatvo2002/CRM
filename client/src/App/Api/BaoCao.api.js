
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const API_URL = process.env.REACT_APP_API_URL;
const Token = localStorage.getItem("token");


export const baoCaoApi = createApi({
    reducerPath: 'baoCaoApi',
    baseQuery: fetchBaseQuery({
      baseUrl: API_URL,
      prepareHeaders: (headers) => {
        if (Token) {
          headers.set('Authorization', `Bearer ${Token}`);
        }
        return headers;
      },
    }),
    endpoints: (builder) => ({
      getBaoTongThe: builder.query({
        query: ({tuNgay , denNgay}) => `/BaoCao/getbaocaotongthe?tuNgay=${tuNgay}&denNgay=${denNgay}`,
      }),
      getBaoCaoHoatDong: builder.query({
        query: ({tuNgay , denNgay}) => `/BaoCao/getbaocaotongthehoatdong?tuNgay=${tuNgay}&denNgay=${denNgay}`,
      }),
      getBaoCaoTheoCoHoi: builder.query({
        query: ({tuNgay , denNgay}) => `/BaoCao/getbaocaotheocohoi?tuNgay=${tuNgay}&denNgay=${denNgay}`,
      }),
      getBaoCaoTheoBaoGia: builder.query({
        query: ({tuNgay , denNgay}) => `/BaoCao/getbaocaobaogia?tuNgay=${tuNgay}&denNgay=${denNgay}`,
      }),
      getBaoCaoTheoDonHang: builder.query({
        query: ({tuNgay , denNgay}) => `/BaoCao/getbaocaodonhang?tuNgay=${tuNgay}&denNgay=${denNgay}`,
      }),
      getTop5KhachHangTuongTac: builder.query({
        query: ({tuNgay , denNgay}) => `/BaoCao/gettop5khachhangtuongtacganday?tuNgay=${tuNgay}&denNgay=${denNgay}`,
      }),
      getCuocGoiTheoTrangThai: builder.query({
        query: ({tuNgay , denNgay}) => `/BaoCao/getbaocaocuocgoitheotrangthai?tuNgay=${tuNgay}&denNgay=${denNgay}`,
      }),
      getBaoCaoDoanhThu: builder.query({
        query: ({tuNgay , denNgay}) => `/BaoCao/getbaocaodoanhthu?tuNgay=${tuNgay}&denNgay=${denNgay}`,
      }),
      getBaoCaoDoanhThuTheoNam: builder.query({
        query: ({nam}) => `/BaoCao/getbaocaodoanhthutheonam?nam=${nam}`,
      }),
      getBaoCaoDoanhThuTheoPhongBan: builder.query({
        query: ({tuNgay , denNgay}) => `/BaoCao/getbaocaodoanhthutheophongban?tuNgay=${tuNgay}&denNgay=${denNgay}`,
      }),
      getBaoCaoSoSanhMucTieuDoanhSo: builder.query({
        query: ({tuNgay , denNgay,nam}) => `/BaoCao/getbaocaososanhmuctieudoanhso?tuNgay=${tuNgay}&denNgay=${denNgay}&nam=${nam}`,
      }),
      getBaoCaoNguonGocKhachHang: builder.query({
        query: ({tuNgay , denNgay}) => `/BaoCao/getbaocaonguongockhachhang?tuNgay=${tuNgay}&denNgay=${denNgay}`,
      }),
      getBaoCaoTop5NhanVienSuatSacNhat: builder.query({
        query: ({tuNgay , denNgay , type}) => `/BaoCao/getbaocaotop5nhanviensuatsacnhat?tuNgay=${tuNgay}&denNgay=${denNgay}&type=${type}`,
      }),
      getBaoCaoTop5NhanVienCoDoanhThuCaoNhat: builder.query({
        query: ({tuNgay , denNgay }) => `/BaoCao/getbaocaotop5nhanviencodoanhthucaonhat?tuNgay=${tuNgay}&denNgay=${denNgay}`,
      }),
      getBaoCaoSoSanhDoanhThuNhanVien: builder.query({
        query: ({tuNgay , denNgay }) => `/BaoCao/getbaocaososanhdoanhthunhanvien?tuNgay=${tuNgay}&denNgay=${denNgay}`,
      }),
      getBaoCaoNhiemVu: builder.query({
        query: ({tuNgay , denNgay }) => `/BaoCao/getbaocaonhiemvu?tuNgay=${tuNgay}&denNgay=${denNgay}`,
      }),
      getBaoCaoTop3NhanVienHoanThanhNhiemVu: builder.query({
        query: ({tuNgay , denNgay }) => `/BaoCao/getbaocaotop3nhanvienhoanthanhnhiemvu?tuNgay=${tuNgay}&denNgay=${denNgay}`,
      }),
      getBaoCaoNhiemVuTheoTrangThai: builder.query({
        query: ({tuNgay , denNgay }) => `/BaoCao/getbaocaonhiemvutheotrangthai?tuNgay=${tuNgay}&denNgay=${denNgay}`,
      }),
       getBaoCaoKhaoSat: builder.query({
        query: ({tuNgay , denNgay }) => `/BaoCao/getbaocaokhaosat?tuNgay=${tuNgay}&denNgay=${denNgay}`,
      }),
    }),
  });
  export const { 
    useGetBaoTongTheQuery,
    useGetBaoCaoTheoCoHoiQuery,
    useGetBaoCaoTheoBaoGiaQuery,
    useGetBaoCaoTheoDonHangQuery,
    useGetBaoCaoHoatDongQuery,
    useGetTop5KhachHangTuongTacQuery,
    useGetCuocGoiTheoTrangThaiQuery,
    useGetBaoCaoDoanhThuQuery,
    useGetBaoCaoDoanhThuTheoNamQuery,
    useGetBaoCaoDoanhThuTheoPhongBanQuery,
    useGetBaoCaoSoSanhMucTieuDoanhSoQuery,
    useGetBaoCaoNguonGocKhachHangQuery,
    useGetBaoCaoTop5NhanVienSuatSacNhatQuery,
    useGetBaoCaoTop5NhanVienCoDoanhThuCaoNhatQuery,
    useGetBaoCaoSoSanhDoanhThuNhanVienQuery,
    useGetBaoCaoNhiemVuQuery,
    useGetBaoCaoTop3NhanVienHoanThanhNhiemVuQuery,
    useGetBaoCaoNhiemVuTheoTrangThaiQuery,
    useGetBaoCaoKhaoSatQuery
  } = baoCaoApi;


export default baoCaoApi.reducer;