import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = process.env.REACT_APP_API_URL;
const Token = localStorage.getItem("token");


export const apiNhiemVu = createApi({
    reducerPath: 'apiNhiemVu',
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
      getAllNhiemVu: builder.query({
        query: () => `/NhiemVu/getallnhiemvu`,
      }),
      getNhiemVuByNguoiDungId: builder.query({
        query: () => `/NhiemVu/getnhiemvubynguoidung`,
      }),
      getNhiemVuByKhachHangTiemNangId: builder.query({
        query: (id) => `/NhiemVu/getnhiemvubykhachhangtiemnangid/${id}`,
      }),
      getNhiemVuByKhachHangId: builder.query({
        query: (id) => `/NhiemVu/getnhiemvubykhachhangid/${id}`,
      }),
      getNhiemVuByPhongBanId: builder.query({
        query: ({tuNgay , denNgay}) => `/NhiemVu/getnhiemvubyphongban?tuNgay=${tuNgay}&denNgay=${denNgay}`,
      }),
      getNhiemVuById: builder.query({
        query: (id) => `/NhiemVu/getnhiemvuid/${id}`,
      }),
      addNhiemVu: builder.mutation({
        query: (data) => ({
          url: '/NhiemVu/createnhiemvu',
          method: 'POST',
          body: data,
        }),
      }),
      deleteNhiemVu: builder.mutation({
        query: (id) => ({
          url: `/NhiemVu/deletenhiemvu/${id}`,
          method: 'DELETE',
        }),
      }),
      updateNhiemVu: builder.mutation({
        query: (data) => ({
          url: `/NhiemVu/updatenhiemvu`, 
          method: 'PUT', 
          body: data, 
        }),
      }),
    }),
  });
  export const { 
   useGetAllNhiemVuQuery,
   useGetNhiemVuByIdQuery,
   useGetNhiemVuByKhachHangTiemNangIdQuery,
   useGetNhiemVuByKhachHangIdQuery,
   useGetNhiemVuByNguoiDungIdQuery,
   useGetNhiemVuByPhongBanIdQuery,
   useAddNhiemVuMutation,
   useDeleteNhiemVuMutation,
   useUpdateNhiemVuMutation
  } = apiNhiemVu;


export default apiNhiemVu.reducer;