import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = process.env.REACT_APP_API_URL;
const Token = localStorage.getItem("token");


export const apiKhachHangMucTieu = createApi({
    reducerPath: 'apiKhachHangMucTieu',
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
      getAllKhachHangMucTieu: builder.query({
        query: () => `/KhachHangMucTieu/getallkhachhangmuctieu`,
      }),
      getKhachHangMucTieuById: builder.query({
        query: (id) => `/KhachHangMucTieu/getkhachhangmuctieubyid/${id}`,
      }),
      getKhachHangMucTieuByNguoiDungId: builder.query({
        query: () => `/KhachHangMucTieu/getkhachhangmuctieubynguoidungid/`,
      }),
      getKhachHangMucTieuByNguoiDungIdQuery: builder.query({
        query: (id) => `/KhachHangMucTieu/getkhachhangmuctieubynguoidungidquery/${id}`,
      }),
      getKhachHangMucTieuByPhongBanId: builder.query({
        query: () => `/KhachHangMucTieu/getkhachhangmuctieubyphongbanid/`,
      }),
      convertKhachHangMucTieu: builder.mutation({
        query: (data) => ({
          url: '/KhachHangMucTieu/convertkhachhangmuctieu',
          method: 'POST',
          body: data,
        }),
      }),
    //   getTemplates: builder.query({
    //     query: ({ path, filename }) => ({
    //       url: `KhachHangTiemNang/getTemplate`,
    //       params: { path, filename },
    //       responseHandler: (response) => response.blob(), 
    //     }),
    //   }),
      addKhachHangMucTieu: builder.mutation({
        query: (data) => ({
          url: '/KhachHangMucTieu/createkhachhangmuctieu',
          method: 'POST',
          body: data,
        }),
      }),
      ImportKhachHangMucTieu: builder.mutation({
        query: (file) => {
          const formData = new FormData();
          formData.append('file', file); 
          return {
            url: '/KhachHangMucTieu/UploadExcel',
            method: 'POST',
            body: formData,
          };
        },
      }),
      updateKhachHangTiemNangMucTieu: builder.mutation({
        query: (data) => ({
          url: '/KhachHangMucTieu/updatekhachhangmuctieu',
          method: 'PUT',
          body: data,
        }),
      }),
    //   bangiaoKhachHangMucTieu: builder.mutation({
    //     query: ({ id, userId }) => ({
    //       url: `/KhachHangTiemNang/bangiaokhachhangtiemnang?id=${id}&userId=${userId}`,
    //       method: 'PUT',
    //     }),
    //   }),
      deleteKhachHangMucTieu: builder.mutation({
        query: (id) => ({
          url: `/KhachHangMucTieu/deletekhachhangmuctieu/${id}`,
          method: 'DELETE',
        }),
      }),
      deletehangLoatKhachHangMucTieu: builder.mutation({
        query: (data) => ({
          url: '/KhachHangMucTieu/deletehangloatkhachhangmuctieu',
          method: 'DELETE',
          body: data,
        }),
      }),
    }),
  });
  export const { 
    useGetAllKhachHangMucTieuQuery,
    useGetKhachHangMucTieuByIdQuery,
    useGetKhachHangMucTieuByNguoiDungIdQuery,
    useGetKhachHangMucTieuByNguoiDungIdQueryQuery,
    useGetKhachHangMucTieuByPhongBanIdQuery,
    useImportKhachHangMucTieuMutation,
    useAddKhachHangMucTieuMutation,
    useUpdateKhachHangTiemNangMucTieuMutation,
    useConvertKhachHangMucTieuMutation,
    useDeleteKhachHangMucTieuMutation,
    useDeletehangLoatKhachHangMucTieuMutation
  } = apiKhachHangMucTieu;


export default apiKhachHangMucTieu.reducer;