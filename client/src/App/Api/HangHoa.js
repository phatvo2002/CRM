import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = process.env.REACT_APP_API_URL;
const Token = localStorage.getItem("token");


export const apiHangHoa = createApi({
    reducerPath: 'apiHangHoa',
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
      getAllHangHoa: builder.query({
        query: () => `/HangHoa/getallhanghoa`,
      }),
      getHangHoaById: builder.query({
        query: (id) => `/HangHoa/gethanghoabyid/${id}`,
      }),
      addHangHoa: builder.mutation({
        query: (data) => ({
          url: '/HangHoa/creathanghoa',
          method: 'POST',
          body: data,
        }),
      }),
      deleteHangHoa: builder.mutation({
        query: (id) => ({
          url: `/HangHoa/deletehanghoa/${id}`,
          method: 'DELETE',
        }),
      }),
      updateHangHoa: builder.mutation({
        query: (data) => ({
          url: `/HangHoa/updatehanghoa`, 
          method: 'PUT', 
          body: data, 
        }),
      }),
    }),
  });
  export const { 
   useGetAllHangHoaQuery,
   useGetHangHoaByIdQuery,
   useAddHangHoaMutation,
   useUpdateHangHoaMutation,
   useDeleteHangHoaMutation
  } = apiHangHoa;


export default apiHangHoa.reducer;