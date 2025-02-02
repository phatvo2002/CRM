import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = process.env.REACT_APP_API_URL;
const Token = localStorage.getItem("token");


export const apiCoHoi = createApi({
    reducerPath: 'apiCoHoi',
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
      convertCoHoi: builder.mutation({
        query: (data) => ({
          url: '/CoHoi/convertcohoi',
          method: 'POST',
          body: data,
        }),
      }),
    }),
  });
  export const { 
    useConvertCoHoiMutation,
  } = apiCoHoi;


export default apiCoHoi.reducer;