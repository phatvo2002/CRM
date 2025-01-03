import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = process.env.REACT_APP_API_URL;
const Token = localStorage.getItem("token");


export const apiFile = createApi({
    reducerPath: 'apiFile',
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
      getFileImage: builder.query({
        query: (path) => `/File/image?path=${path}`,
      }),
    }),
  });
  export const { 
   useGetFileImageQuery,
  } = apiFile;


export default apiFile.reducer;