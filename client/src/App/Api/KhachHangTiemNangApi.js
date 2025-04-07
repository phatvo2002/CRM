import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import fileDownload from "js-file-download";
const API_URL = process.env.REACT_APP_API_URL;
const Token = localStorage.getItem("token");

export const apiKhachHangTiemNang = createApi({
  reducerPath: "apiKhachHangTiemNang",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      if (Token) {
        headers.set("Authorization", `Bearer ${Token}`);
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
      query: (id) =>
        `/KhachHangTiemNang/getkhachhangtiemnangbynguoidungid/${id}`,
    }),
    getKhachHangTiemNangByPhongBanId: builder.query({
      query: (id) =>
        `/KhachHangTiemNang/getkhachhangtiemnangbyPhongbanId/${id}`,
    }),
    getKhachHangTiemNangByPhongBanIdContext: builder.query({
      query: () => `/KhachHangTiemNang/getkhachhangtiemnangbyphongbanidcontext`,
    }),
    getKhachHangTiemNangByrole: builder.query({
      query: ({ tuNgay, denNgay }) =>
        `/KhachHangTiemNang/getkhachhangbyrole?tuNgay=${tuNgay}&denNgay=${denNgay}`,
    }),
    getKhachHangTiemNangDaXoa: builder.query({
      query: () => `/KhachHangTiemNang/getkhachhangtiemnangdaxoa`,
    }),
    // getTemplates: builder.query({
    //   query: ({ path, filename }) => ({
    //     url: `KhachHangTiemNang/getTemplate`,
    //     params: { path, filename },
    //     responseHandler: (response) => response.blob(),
    //   }),
    // }),

    getTemplates: builder.mutation({
      queryFn: async ({ path, filename }, api, extraOptions, baseQuery) => {
        const result = await baseQuery({
          url: `KhachHangTiemNang/getTemplate`,
          method: "POST",
          params: { path, filename },
          responseHandler: (response) => response.blob(),
        });
    
        if (result.error) {
          return { error: result.error };
        }
    
        fileDownload(result.data, "Template_TiemNang.xlsx");
        return { data: null };
      },
    }),
    

    addKhachHangTiemNang: builder.mutation({
      query: (data) => ({
        url: "/KhachHangTiemNang/createkhachhangtiemnang",
        method: "POST",
        body: data,
      }),
    }),
    ImportKhachHang: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append("file", file);
        return {
          url: "/KhachHangTiemNang/ImportKhachHang",
          method: "POST",
          body: formData,
        };
      },
    }),
    updateKhachHangTiemNang: builder.mutation({
      query: (data) => ({
        url: "/KhachHangTiemNang/updatekhachhangtiemnang",
        method: "PUT",
        body: data,
      }),
    }),
    bangiaoKhachHangTiemNang: builder.mutation({
      query: ({ id, userId }) => ({
        url: `/KhachHangTiemNang/bangiaokhachhangtiemnang?id=${id}&userId=${userId}`,
        method: "PUT",
      }),
    }),
    PhucHoiHangLoatKhachHangTiemNang: builder.mutation({
      query: (data) => ({
        url: "/KhachHangTiemNang/phuchoihangloat",
        method: "PUT",
        body: data,
      }),
    }),
    deleteKhachHangTiemNang: builder.mutation({
      query: (id) => ({
        url: `/KhachHangTiemNang/deletekhachhangtiemnang/${id}`,
        method: "DELETE",
      }),
    }),

    deletehangLoatKhachHangTiemNang: builder.mutation({
      query: (data) => ({
        url: "/KhachHangTiemNang/deletehangloat",
        method: "DELETE",
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
  useGetKhachHangTiemNangByPhongBanIdContextQuery,
  useGetKhachHangTiemNangByroleQuery,
  useGetKhachHangTiemNangDaXoaQuery,
  useGetTemplatesMutation,
  useAddKhachHangTiemNangMutation,
  useUpdateKhachHangTiemNangMutation,
  useBangiaoKhachHangTiemNangMutation,
  usePhucHoiHangLoatKhachHangTiemNangMutation,
  useImportKhachHangMutation,
  useDeleteKhachHangTiemNangMutation,
  useDeletehangLoatKhachHangTiemNangMutation,
} = apiKhachHangTiemNang;

export default apiKhachHangTiemNang.reducer;
