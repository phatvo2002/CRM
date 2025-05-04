
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const API_URL = process.env.REACT_APP_API_URL;
const Token = localStorage.getItem("token");


export const khaoSatApi = createApi({
    reducerPath: 'khaoSatApi',
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
        query: () => `/KhaoSat/getall`,
      }),
      getById: builder.query({
        query: (id) => `/KhaoSat/getbyid/${id}`,
      }),
      create: builder.mutation({
        query: (data) => ({
          url: '/KhaoSat/create',
          method: 'POST',
          body: data,
        }),
      }),
      update: builder.mutation({
        query: (data) => ({
          url: `/KhaoSat/update`, 
          method: 'PUT', 
          body: data, 
        }),
      }),
      delete: builder.mutation({
        query: (id) => ({
          url: `/KhaoSat/delete/${id}`,
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
  } = khaoSatApi;


export default khaoSatApi.reducer;