import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = process.env.REACT_APP_API_URL;
const Token = localStorage.getItem("token");


export const apiKhachHangTiemNang = createApi({
    reducerPath: 'apiKhachHangTiemNang',
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
      getAllKhachHangTiemNang: builder.query({
        query: () => `/KhachHangTiemNang/getallkhachhangtiemnang`,
      }),
      getKhachHangTiemNangById: builder.query({
        query: (id) => `/KhachHangTiemNang/getkhachhangtiemnangbyid/${id}`,
      }),
      getKhachHangTiemNangByNguoiDungId: builder.query({
        query: (id) => `/KhachHangTiemNang/getkhachhangtiemnangbynguoidungid/${id}`,
      }),
      getKhachHangTiemNangByPhongBanId: builder.query({
        query: (id) => `/KhachHangTiemNang/getkhachhangtiemnangbyPhongbanId/${id}`,
      }),
      addKhachHangTiemNang: builder.mutation({
        query: (data) => ({
          url: '/KhachHangTiemNang/createkhachhangtiemnang',
          method: 'POST',
          body: data,
        }),
      }),
      updateKhachHangTiemNang: builder.mutation({
        query: (data) => ({
          url: '/KhachHangTiemNang/updatekhachhangtiemnang',
          method: 'PUT',
          body: data,
        }),
      }),
      deleteKhachHangTiemNang: builder.mutation({
        query: (id) => ({
          url: `/KhachHangTiemNang/deletekhachhangtiemnang/${id}`,
          method: 'DELETE',
        }),
      }),
    }),
  });
  export const { 
    useGetAllKhachHangTiemNangQuery, 
    useGetKhachHangTiemNangByIdQuery,
    useGetKhachHangTiemNangByNguoiDungIdQuery,
    useGetKhachHangTiemNangByPhongBanIdQuery,
    useAddKhachHangTiemNangMutation,
    useUpdateKhachHangTiemNangMutation,
    useDeleteKhachHangTiemNangMutation,
  } = apiKhachHangTiemNang;


export default apiKhachHangTiemNang.reducer;