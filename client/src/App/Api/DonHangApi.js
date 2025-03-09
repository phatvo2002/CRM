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
        query: () => `/DonHang/getdonhanglist`,
      }),
      getGetDonHangById: builder.query({
        query: (id) => `/DonHang/getdonhangbyid/${id}`,
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
    }),
  });
  export const { 
   useGetAllDonHangQuery,
   useGetGetDonHangListQuery,
   useGetGetDonHangByIdQuery,
   useAddDonHangMutation,
   useUpdateDonhangMutation,
   useDeleteDonHangMutation
  } = apiDonHang;


export default apiDonHang.reducer;