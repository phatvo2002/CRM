import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = process.env.REACT_APP_API_URL;
const Token = localStorage.getItem("token");


export const apiHangHoaQuanTam = createApi({
    reducerPath: 'apiHangHoaQuanTam',
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
      getAllHangHoaQuanTam: builder.query({
        query: () => `/HangHoaQuanTam/getallhanghoaquantam`,
      }),
      getHangHoaQuanTamById: builder.query({
        query: (id) => `/HangHoaQuanTam/gethanghoaquantambyid/${id}`,
      }),
      getHangHoaQuanTamByKhachHangTiemNangId: builder.query({
        query: (id) => `/HangHoaQuanTam/gethanghoaquantambykhachhangtiemnangid/${id}`,
      }),
      addHangHoaQuanTam: builder.mutation({
        query: (data) => ({
          url: '/HangHoaQuanTam/creathanghoaquantam',
          method: 'POST',
          body: data,
        }),
      }),   
      deleteHangHoaQuanTam: builder.mutation({
        query: (id) => ({
          url: `/HangHoaQuanTam/deletehanghoaquantam/${id}`,
          method: 'DELETE',
        }),
      }),
      updateHangHoaQuanTam: builder.mutation({
        query: (data) => ({
            url: `/HangHoaQuanTam/updatehanghoaquantam`, 
            method: 'PUT', 
            body: data, 
          }),
      }),
    }),
  });
  export const { 
   useGetAllHangHoaQuanTamQuery,
   useGetHangHoaQuanTamByIdQuery,
   useGetHangHoaQuanTamByKhachHangTiemNangIdQuery,
   useAddHangHoaQuanTamMutation,
   useUpdateHangHoaQuanTamMutation,
   useDeleteHangHoaQuanTamMutation
  } = apiHangHoaQuanTam;


export default apiHangHoaQuanTam.reducer;