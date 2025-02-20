import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = process.env.REACT_APP_API_URL;
const Token = localStorage.getItem("token");


export const apiBaoGia = createApi({
    reducerPath: 'apiBaoGia',
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
      getBaoGiaList: builder.query({
        query: () => `/BaoGia/getbaogialist`,
      }),
      convertBaoGia: builder.mutation({
        query: (data) => ({
          url: '/BaoGia/covertbaogia',
          method: 'POST',
          body: data,
        }),
      }),
      updateBaoGia: builder.mutation({
        query: (data) => ({
            url: `/BaoGia/updatebaogia`, 
            method: 'PUT', 
            body: data, 
          }),
      }),
      updateTongTien: builder.mutation({
        query: ({baoGiaId , tongTien}) => ({
            url: `/BaoGia/updatetongtien?baoGiaId=${baoGiaId}&soTien=${tongTien}`, 
            method: 'PUT', 
          }),
      }),
      deleteBaoGia: builder.mutation({
        query: (id) => ({
          url: `/BaoGia/deletebaogia/${id}`,
          method: 'DELETE',
        }),
      }),
    }),
  });
  export const { 
    useGetBaoGiaListQuery,
    useConvertBaoGiaMutation,
    useUpdateBaoGiaMutation,
    useUpdateTongTienMutation,
    useDeleteBaoGiaMutation
  } = apiBaoGia;


export default apiBaoGia.reducer;