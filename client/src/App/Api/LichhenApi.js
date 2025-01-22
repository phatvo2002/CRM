import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = process.env.REACT_APP_API_URL;
const Token = localStorage.getItem("token");
export const apiLichHen = createApi({
    reducerPath: 'apiLichHen',
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
      getAllLichHen: builder.query({
        query: () => `/Lichhen/getalllichhen`,
      }),
      getLichHenByNguoiDungId: builder.query({
        query: () => `/Lichhen/getlichhenbynguoidung`,
      }),
      getLichHenByKhachHangTiemNangId: builder.query({
        query: (id) => `/Lichhen/getlichhenbykhachhangtiemnangid/${id}`,
      }),
      getLichHenByKhachHangId: builder.query({
        query: (id) => `/Lichhen/getlichhenbykhachhangid/${id}`,
      }),
      getLichHenById: builder.query({
        query: (id) => `/Lichhen/getlichhenbyid/${id}`,
      }),
      addLichHen: builder.mutation({
        query: (data) => ({
          url: '/Lichhen/createlichhen',
          method: 'POST',
          body: data,
        }),
      }),
      deleteLichHen: builder.mutation({
        query: (id) => ({
          url: `/Lichhen/deletelichhen/${id}`,
          method: 'DELETE',
        }),
      }),
      updateLichHen: builder.mutation({
        query: (data) => ({
          url: `/Lichhen/updatelichhen`, 
          method: 'PUT', 
          body: data, 
        }),
      }),
    }),
  });
  export const { 
   useGetAllLichHenQuery,
   useGetLichHenByIdQuery,
   useGetLichHenByKhachHangTiemNangIdQuery,
   useGetLichHenByKhachHangIdQuery,
   useGetLichHenByNguoiDungIdQuery,
   useAddLichHenMutation,
   useDeleteLichHenMutation,
   useUpdateLichHenMutation
  } = apiLichHen;


export default apiLichHen.reducer;