import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = process.env.REACT_APP_API_URL;
const Token = localStorage.getItem("token");


export const apiLienHe = createApi({
    reducerPath: 'apiLienHe',
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
      getAllLienHe: builder.query({
        query: () => `/LienHe/getalllienhe`,
      }),
      getLienHeById: builder.query({
        query: (id) => `/LienHe/getlienhebyid/${id}`,
      }),
      getLienHeByKhachHangTiemNangId: builder.query({
        query: (id) => `/LienHe/getlienhebykhachhangtiemnangid/${id}`,
      }),
      addLienHe: builder.mutation({
        query: (data) => ({
          url: '/LienHe/creatlienhe',
          method: 'POST',
          body: data,
        }),
      }),
      deleteLienHe: builder.mutation({
        query: (id) => ({
          url: `/LienHe/deletelienhe/${id}`,
          method: 'DELETE',
        }),
      }),
      updateLienHe: builder.mutation({
        query: (data) => ({
          url: `/LienHe/updatelienhe`, 
          method: 'PUT', 
          body: data, 
        }),
      }),
    }),
  });
  export const { 
    useGetAllLienHeQuery,
    useGetLienHeByIdQuery,
    useGetLienHeByKhachHangTiemNangIdQuery,
    useAddLienHeMutation,
    useUpdateLienHeMutation,
    useDeleteLienHeMutation
  } = apiLienHe;


export default apiLienHe.reducer;