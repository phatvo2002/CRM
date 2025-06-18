import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = process.env.REACT_APP_API_URL;
const Token = localStorage.getItem("token");


export const apiDonHang = createApi({
    reducerPath: 'apiDonHang',
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
      getAllDonHang: builder.query({
        query: () => `/DonHang/getalldonhang`,
      }),
      getGetDonHangList: builder.query({
        query: ({tuNgay , denNgay}) => `/DonHang/getdonhanglist?tuNgay=${tuNgay}&denNgay=${denNgay}`,
      }),
      getGetDonHangById: builder.query({
        query: (id) => `/DonHang/getdonhangbyid/${id}`,
      }),
       getGetLichSuMuaHang: builder.query({
        query: (khachHangId) => `/DonHang/getlichsumuahang/${khachHangId}`,
      }),
      addDonHang: builder.mutation({
        query: (data) => ({
          url: '/DonHang/convertdonhang',
          method: 'POST',
          body: data,
        }),
      }),
      deleteDonHang: builder.mutation({
        query: (id) => ({
          url: `/DonHang/deletedonhang/${id}`,
          method: 'DELETE',
        }),
      }),
      updateDonhang: builder.mutation({
        query: (data) => ({
          url: `/DonHang/updatedonhang`, 
          method: 'PUT', 
          body: data, 
        }),
      }),
      xacNhanDonhang: builder.mutation({
        query: (data) => ({
          url: `/DonHang/xacnhandonhang`, 
          method: 'PUT', 
          body : data
        }),
      }),
      updateThucThuDonHang: builder.mutation({
        query: ({id , soTien}) => ({
          url: `/DonHang/capnhatthucthudonhang?id=${id}&soTien=${soTien}`, 
          method: 'PUT', 
        }),
      }),
    }),
  });
  export const { 
   useGetAllDonHangQuery,
   useGetGetDonHangListQuery,
   useGetGetDonHangByIdQuery,
   useAddDonHangMutation,
   useUpdateDonhangMutation,
   useDeleteDonHangMutation,
   useXacNhanDonhangMutation,
   useUpdateThucThuDonHangMutation,
   useGetGetLichSuMuaHangQuery
  } = apiDonHang;


export default apiDonHang.reducer;