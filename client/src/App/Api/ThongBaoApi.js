import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = process.env.REACT_APP_API_URL;
const Token = localStorage.getItem("token");


export const apiThongBao = createApi({
    reducerPath: 'apiThongBao',
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
      getAllThongBao: builder.query({
        query: () => `/ThongBao/getallthongbao`,
      }),
      getThongBaoById: builder.query({
        query: (id) => `/ThongBao/getthongbaobyid/${id}`,
      }),
      getThongBaoByNguoiDungId: builder.query({
        query: () => `/ThongBao/getthongbaobynguoidungid`,
      }),
      addThongBao: builder.mutation({
        query: (data) => ({
          url: '/ThongBao/createthongbao',
          method: 'POST',
          body: data,
        }),
      }),
      checkThongBao: builder.mutation({
        query: (data) => ({
          url: '/ThongBao/checkthongbao',
          method: 'POST',
        }),
      }),
      deleteThongBao: builder.mutation({
        query: (id) => ({
          url: `/ThongBao/deletethongbao/${id}`,
          method: 'DELETE',
        }),
      }),
      updateThongBao: builder.mutation({
        query: (data) => ({
          url: `/ThongBao/updatethongbao`, 
          method: 'PUT', 
          body: data, 
        }),
      }),
    }),
  });
  export const { 
      useGetAllThongBaoQuery,
      useGetThongBaoByNguoiDungIdQuery,
      useGetThongBaoByIdQuery,
      useAddThongBaoMutation,
      useCheckThongBaoMutation,
      useUpdateThongBaoMutation,
      useDeleteThongBaoMutation
  } = apiThongBao;


export default apiThongBao.reducer;