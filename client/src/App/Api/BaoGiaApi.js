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
      convertBaoGia: builder.mutation({
        query: (data) => ({
          url: '/BaoGia/covertbaogia',
          method: 'POST',
          body: data,
        }),
      }),
    }),
  });
  export const { 
    useConvertBaoGiaMutation,
   
  } = apiBaoGia;


export default apiBaoGia.reducer;