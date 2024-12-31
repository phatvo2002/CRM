import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = process.env.REACT_APP_API_URL;
const Token = localStorage.getItem("token");


export const apiLoaiHangHoa = createApi({
    reducerPath: 'apiLoaiHangHoa',
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
      getAllLoaiHangHoa: builder.query({
        query: () => `/LoaiHangHoa/getallloaihanghoa`,
      }),
      getLoaiHangHoaById: builder.query({
        query: (id) => `/LoaiHangHoa/getloaihanghoabyid/${id}`,
      }),
      addLoaiHangHoa: builder.mutation({
        query: (data) => ({
          url: '/LoaiHangHoa/creatloaihanghoa',
          method: 'POST',
          body: data,
        }),
      }),
      deleteLoaiHangHoa: builder.mutation({
        query: (id) => ({
          url: `/LoaiHangHoa/deleteloaihanghoa/${id}`,
          method: 'DELETE',
        }),
      }),
      updateLoaiHangHoa: builder.mutation({
        query: (data) => ({
          url: `/LoaiHangHoa/updateloaihanghoa`, 
          method: 'PUT', 
          body: data, 
        }),
      }),
    }),
  });
  export const { 
    useGetAllLoaiHangHoaQuery,
    useGetLoaiHangHoaByIdQuery,
    useAddLoaiHangHoaMutation,
    useDeleteLoaiHangHoaMutation,
    useUpdateLoaiHangHoaMutation
  } = apiLoaiHangHoa;


export default apiLoaiHangHoa.reducer;