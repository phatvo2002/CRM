import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = process.env.REACT_APP_API_URL;
const Token = localStorage.getItem("token");


export const apiGetData = createApi({
    reducerPath: 'apiGetData',
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
      getAllPhongBanKhachHang: builder.query({
        query: () => `/GetData/getallphongbankhachhang`,
      }),
      getAllNguonGocKhachHang: builder.query({
        query: () => `/GetData/getallnguongockhachhang`,
      }),
      getAllLoaiTiemNang: builder.query({
        query: () => `/GetData/getallloaitiemnang`,
      }),
      getAllLoaiHinhNgheNghiep: builder.query({
        query: () => `/GetData/getallloaihinhnghenghiep`,
      }),
      getAllLinhVucNgheNghiep: builder.query({
        query: () => `/GetData/getalllinhvucnghenghiep`,
      }),
      getAllNganhNgheByLinhVucId: builder.query({
        query: (linhVucId) => `/GetData/getallnganhnghebylinhvuc/${linhVucId}`,
      }),
      getAllDoanhThu: builder.query({
        query: () => `/GetData/getalldoanhthu`,
      }),
      getAllTrangThaiThucHien: builder.query({
        query: () => `/GetData/getalltrangthaithuchien`,
      }),
      getAllMucDoUuTien: builder.query({
        query: () => `/GetData/getallmucdouutien`,
      }),
      getAllLoaiCuocGoi: builder.query({
        query: () => `/GetData/getallloaicuocgoi`,
      }),
      getAllKetQuaCuocGoi: builder.query({
        query: () => `/GetData/getallketquacuocgoi`,
      }),
    }),
  });
  export const { 
    useGetAllPhongBanKhachHangQuery, 
    useGetAllNguonGocKhachHangQuery,
    useGetAllLoaiTiemNangQuery, 
    useGetAllLoaiHinhNgheNghiepQuery, 
    useGetAllLinhVucNgheNghiepQuery, 
    useGetAllNganhNgheByLinhVucIdQuery, 
    useGetAllDoanhThuQuery, 
    useGetAllTrangThaiThucHienQuery, 
    useGetAllMucDoUuTienQuery, 
    useGetAllLoaiCuocGoiQuery, 
    useGetAllKetQuaCuocGoiQuery
  } = apiGetData;


export default apiGetData.reducer;