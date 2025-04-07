import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = process.env.REACT_APP_API_URL;
const Token = localStorage.getItem("token");


export const apiKPINhanVien = createApi({
    reducerPath: 'apiKPINhanVien',
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
      getAllKPINhanVien: builder.query({
        query: () => `/KPINhanVien/getall`,
      }),
      getKPINhanVienById: builder.query({
        query: (id) => `/KPINhanVien/getById/${id}`,
      }),
      addKPINhanVien: builder.mutation({
        query: (data) => ({
          url: '/KPINhanVien/create',
          method: 'POST',
          body: data,
        }),
      }),
      deleteKPINhanVien: builder.mutation({
        query: (id) => ({
          url: `/KPINhanVien/delete/${id}`,
          method: 'DELETE',
        }),
      }),
      updateKPINhanVien: builder.mutation({
        query: (data) => ({
          url: `/KPINhanVien/update`, 
          method: 'PUT', 
          body: data, 
        }),
      }),
    }),
  });
  export const { 
   useGetAllKPINhanVienQuery,
   useGetKPINhanVienByIdQuery,
   useAddKPINhanVienMutation,
   useUpdateKPINhanVienMutation,
   useDeleteKPINhanVienMutation
  } = apiKPINhanVien;


export default apiKPINhanVien.reducer;