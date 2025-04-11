
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const API_URL = process.env.REACT_APP_API_URL;
const Token = localStorage.getItem("token");


export const xepLoaiApi = createApi({
    reducerPath: 'xepLoaiApi',
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
      getAll: builder.query({
        query: () => `/XepLoai/getall`,
      }),
      getById: builder.query({
        query: (id) => `/XepLoai/${id}`,
      }),
      create: builder.mutation({
        query: (data) => ({
          url: '/XepLoai/create',
          method: 'POST',
          body: data,
        }),
      }),
      update: builder.mutation({
        query: (data) => ({
          url: `/XepLoai/update`, 
          method: 'PUT', 
          body: data, 
        }),
      }),
      delete: builder.mutation({
        query: (id) => ({
          url: `/XepLoai/delete/${id}`,
          method: 'DELETE',
        }),
      }),
    }),
  });
  export const { 
       useGetAllQuery,
       useGetByIdQuery,
       useCreateMutation,
       useUpdateMutation,
       useDeleteMutation
  } = xepLoaiApi;


export default xepLoaiApi.reducer;