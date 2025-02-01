import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = process.env.REACT_APP_API_URL;
const Token = localStorage.getItem("token");


export const apiMail = createApi({
    reducerPath: 'apiMail',
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
      addMail: builder.mutation({
        query: (data) => ({
          url: '/Mail/GuiMail',
          method: 'POST',
          body: data,
        }),
      }),
    }),
  });
  export const { 
   useGetAllDonViTinhQuery,

  } = apiMail;


export default apiMail.reducer;