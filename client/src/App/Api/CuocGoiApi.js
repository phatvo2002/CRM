import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = process.env.REACT_APP_API_URL;
const Token = localStorage.getItem("token");

export const apiCuocGoi = createApi({
  reducerPath: "apiCuocGoi",
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
    getAllCuocGoi: builder.query({
      query: () => `/CuocGoi/getallcuocgoi`,
    }),
    getCuocGoiByNguoiDung: builder.query({
      query: () => `/CuocGoi/getcuocgoibynguoidung`,
    }),
    getCuocGoiByKhachHangTiemNangId: builder.query({
      query: (id) => `/CuocGoi/getcuocgoibykhachhangtiemnangid/${id}`,
    }),
    getCuocGoiByKhachHangId: builder.query({
      query: (id) => `/CuocGoi/getcuocgoibykhachhangid/${id}`,
    }),
    getCuocGoiById: builder.query({
      query: (id) => `/CuocGoi/getcuocgoibyid/${id}`,
    }),

    getCuocGoiDaHoanThanhById: builder.query({
      query: (id) => `/CuocGoi/getCuocGoiDaHoanThanh/${id}`,
    }),

    getCuocGoiChuaHoanThanhById: builder.query({
      query: (id) => `/CuocGoi/getCuocGoiChuaHoanThanh/${id}`,
    }),

    addCuocGoi: builder.mutation({
      query: (data) => ({
        url: "/CuocGoi/createcuocgoi",
        method: "POST",
        body: data,
      }),
    }),
    deleteCuocGoi: builder.mutation({
      query: (id) => ({
        url: `/CuocGoi/deletecuocgoi/${id}`,
        method: "DELETE",
      }),
    }),
    updateCuocGoi: builder.mutation({
      query: (data) => ({
        url: `/CuocGoi/updatecuocgoi`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});
export const {
  useGetAllCuocGoiQuery,
  useGetCuocGoiByNguoiDungQuery,
  useGetCuocGoiByKhachHangTiemNangIdQuery,
  useGetCuocGoiByKhachHangIdQuery,
  useGetCuocGoiByIdQuery,
  useGetCuocGoiDaHoanThanhByIdQuery,
  useGetCuocGoiChuaHoanThanhByIdQuery,
  useAddCuocGoiMutation,
  useDeleteCuocGoiMutation,
  useUpdateCuocGoiMutation,
} = apiCuocGoi;

export default apiCuocGoi.reducer;
