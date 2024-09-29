import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = "https://localhost:7211/api/v1";
const Token = localStorage.getItem("token");


export const apiPhongban = createApi({
    reducerPath: 'api',
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
      getPhongban: builder.query({
        query: () => `/PhongBan/getAllphongban`,
      }),
      getPhongbanById: builder.query({
        query: (id) => `/PhongBan/getphongbanbyid/${id}`,
      }),
      addPhongban: builder.mutation({
        query: (data) => ({
          url: '/PhongBan/insertphongban',
          method: 'POST',
          body: data,
        }),
      }),
      deletePhongBan: builder.mutation({
        query: (id) => ({
          url: `/PhongBan/delete?id=${id}`,
          method: 'DELETE',
        }),
      }),
      updatePhongBan: builder.mutation({
        query: (data) => ({
          url: `/PhongBan/updatephongban/${data.id}`, 
          method: 'PUT', 
          body: data, 
        }),
      }),
    }),
  });
  export const { 
    useGetPhongbanQuery, 
    useGetPhongbanByIdQuery, 
    useAddPhongbanMutation, 
    useDeletePhongBanMutation,
    useUpdatePhongBanMutation,
  } = apiPhongban;


export default apiPhongban.reducer;