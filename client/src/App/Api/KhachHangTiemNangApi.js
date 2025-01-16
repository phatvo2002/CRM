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
      getKhachHangTiemNangByrole: builder.query({
        query: (id) => `/KhachHangTiemNang/getkhachhangbyrole`,
      }),
      getKhachHangTiemNangDaXoa: builder.query({
        query: (id) => `/KhachHangTiemNang/getkhachhangtiemnangdaxoa`,
      }),
      getTemplates: builder.query({
        query: ({ path, filename }) => ({
          url: `KhachHangTiemNang/getTemplate`,
          params: { path, filename },
          responseHandler: (response) => response.blob(), 
        }),
      }),
     
      addKhachHangTiemNang: builder.mutation({
        query: (data) => ({
          url: '/KhachHangTiemNang/createkhachhangtiemnang',
          method: 'POST',
          body: data,
        }),
      }),
      ImportKhachHang: builder.mutation({
        query: (file) => {
          const formData = new FormData();
          formData.append('file', file); 
          return {
            url: '/KhachHangTiemNang/ImportKhachHang',
            method: 'POST',
            body: formData,
          };
        },
      }),
      updateKhachHangTiemNang: builder.mutation({
        query: (data) => ({
          url: '/KhachHangTiemNang/updatekhachhangtiemnang',
          method: 'PUT',
          body: data,
        }),
      }),
      bangiaoKhachHangTiemNang: builder.mutation({
        query: ({ id, userId }) => ({
          url: `/KhachHangTiemNang/bangiaokhachhangtiemnang?id=${id}&userId=${userId}`,
          method: 'PUT',
        }),
      }),
      deleteKhachHangTiemNang: builder.mutation({
        query: (id) => ({
          url: `/KhachHangTiemNang/deletekhachhangtiemnang/${id}`,
          method: 'DELETE',
        }),
      }),
      deletehangLoatKhachHangTiemNang: builder.mutation({
        query: (data) => ({
          url: '/KhachHangTiemNang/deletehangloat',
          method: 'DELETE',
          body: data,
        }),
      }),
    }),
  });
  export const { 
    useGetAllKhachHangTiemNangQuery, 
    useGetKhachHangTiemNangByIdQuery,
    useGetKhachHangTiemNangByNguoiDungIdQuery,
    useGetKhachHangTiemNangByPhongBanIdQuery,
    useGetKhachHangTiemNangByroleQuery,
    useGetKhachHangTiemNangDaXoaQuery,
    useGetTemplatesQuery,
    useAddKhachHangTiemNangMutation,
    useUpdateKhachHangTiemNangMutation,
    useBangiaoKhachHangTiemNangMutation,
    useImportKhachHangMutation,
    useDeleteKhachHangTiemNangMutation,
    useDeletehangLoatKhachHangTiemNangMutation
  } = apiKhachHangTiemNang;


export default apiKhachHangTiemNang.reducer;