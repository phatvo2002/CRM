import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = process.env.REACT_APP_API_URL;
const Token = localStorage.getItem("token");
export const apiGiaiDoanBanHang = createApi({
    reducerPath: 'apiGiaiDoanBanHang',
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
      getAllGiaiDoanBanHang: builder.query({
        query: () => `/GiaiDoanBanHang/getallGiaiDoanBanHang`,
      }),
      getGiaiDoanBanHangById: builder.query({
        query: (id) => `/GiaiDoanBanHang/getgiaidoanbanhangbyid/${id}`,
      }),
      addGiaiDoanBanHang: builder.mutation({
        query: (data) => ({
          url: '/GiaiDoanBanHang/creategiaidoanbanhang',
          method: 'POST',
          body: data,
        }),
      }),
      deleteGiaiDoanBanHang: builder.mutation({
        query: (id) => ({
          url: `/GiaiDoanBanHang/deletegiaidoanbanhang/${id}`,
          method: 'DELETE',
        }),
      }),
      updateGiaiDoanBanHang: builder.mutation({
        query: (data) => ({
          url: `/GiaiDoanBanHang/updategiaidoanbanhang`, 
          method: 'PUT', 
          body: data, 
        }),
      }),
    }),
  });
  export const { 
     useGetAllGiaiDoanBanHangQuery,
     useGetGiaiDoanBanHangByIdQuery,
     useAddGiaiDoanBanHangMutation,
     useUpdateGiaiDoanBanHangMutation,
     useDeleteGiaiDoanBanHangMutation
  } = apiGiaiDoanBanHang;


export default apiGiaiDoanBanHang.reducer;