import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = process.env.REACT_APP_API_URL;
const Token = localStorage.getItem("token");


export const apiMucTieuDoanhSo = createApi({
    reducerPath: 'apiMucTieuDoanhSo',
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
      getAllMucTieuDoanhSo: builder.query({
        query: ({tuNgay, denNgay}) => `/MucTieuDoanhSo/getall?tuNgay=${tuNgay}&denNgay=${denNgay}`,
      }),
      getMucTieuDoanhSoById: builder.query({
        query: (id) => `/MucTieuDoanhSo/getById/${id}`,
      }),
      addMucTieuDoanhSo: builder.mutation({
        query: (data) => ({
          url: '/MucTieuDoanhSo/create',
          method: 'POST',
          body: data,
        }),
      }),
      deleteMucTieuDoanhSo: builder.mutation({
        query: (id) => ({
          url: `/MucTieuDoanhSo/delete/${id}`,
          method: 'DELETE',
        }),
      }),
      updateMucTieuDoanhSo: builder.mutation({
        query: (data) => ({
          url: `/MucTieuDoanhSo/update`, 
          method: 'PUT', 
          body: data, 
        }),
      }),
    }),
  });
  export const { 
   useGetAllNhiemVuQuery,
       useGetAllMucTieuDoanhSoQuery,
       useGetMucTieuDoanhSoByIdQuery,
       useAddMucTieuDoanhSoMutation,
       useUpdateMucTieuDoanhSoMutation,
       useDeleteMucTieuDoanhSoMutation
  } = apiMucTieuDoanhSo;


export default apiMucTieuDoanhSo.reducer;