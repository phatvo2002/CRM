
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const API_URL = process.env.REACT_APP_API_URL;
const Token = localStorage.getItem("token");


export const mailDaGuiApi = createApi({
    reducerPath: 'mailDaGuiApi',
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
        query: () => `/MailDaGui/getall`,
      }),
      getById: builder.query({
        query: (id) => `/MailDaGui/getbyid/${id}`,
      }),
      getByTiemNangId: builder.query({
        query: (id) => `/MailDaGui/getallbytiemnangid/${id}`,
      }),
      create: builder.mutation({
        query: (data) => ({
          url: '/MailDaGui/create',
          method: 'POST',
          body: data,
        }),
      }),
      update: builder.mutation({
        query: (data) => ({
          url: `/MailDaGui/update`, 
          method: 'PUT', 
          body: data, 
        }),
      }),
      delete: builder.mutation({
        query: (id) => ({
          url: `/MailDaGui/delete/${id}`,
          method: 'DELETE',
        }),
      }),
    }),
  });
  export const { 
     useGetAllQuery,
     useGetByIdQuery,
     useGetByTiemNangIdQuery,
     useCreateMutation,
     useUpdateMutation,
     useDeleteMutation
  } = mailDaGuiApi;


export default mailDaGuiApi.reducer;