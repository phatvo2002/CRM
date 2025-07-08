
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const API_URL = process.env.REACT_APP_API_URL;
const Token = localStorage.getItem("token");


export const chiNhanhApi = createApi({
    reducerPath: 'chiNhanhApi',
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
        query: () => `/ChiNhanh/getall`,
      }),
      getById: builder.query({
        query: (id) => `/ChiNhanh/${id}`,
      }),
      create: builder.mutation({
        query: (data) => ({
          url: '/ChiNhanh/create',
          method: 'POST',
          body: data,
        }),
      }),
      update: builder.mutation({
        query: (data) => ({
          url: `/ChiNhanh/update`, 
          method: 'PUT', 
          body: data, 
        }),
      }),
      delete: builder.mutation({
        query: (id) => ({
          url: `/ChiNhanh/delete/${id}`,
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
  } = chiNhanhApi;


export default chiNhanhApi.reducer;