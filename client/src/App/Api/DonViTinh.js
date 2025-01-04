import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = process.env.REACT_APP_API_URL;
const Token = localStorage.getItem("token");


export const apiDonViTinh = createApi({
    reducerPath: 'apiDonViTinh',
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
      getAllDonViTinh: builder.query({
        query: () => `/DonViTinh/getalldonvitinh`,
      }),
      getGetDonViTinhById: builder.query({
        query: (id) => `/DonViTinh/getdonvitinhbyid/${id}`,
      }),
      addDonViTinh: builder.mutation({
        query: (data) => ({
          url: '/DonViTinh/creatdonvitinh',
          method: 'POST',
          body: data,
        }),
      }),
      deleteDonViTinh: builder.mutation({
        query: (id) => ({
          url: `/DonViTinh/deletedonvitinh/${id}`,
          method: 'DELETE',
        }),
      }),
      updateDonViTinh: builder.mutation({
        query: (data) => ({
          url: `/DonViTinh/updatedonvitinh`, 
          method: 'PUT', 
          body: data, 
        }),
      }),
    }),
  });
  export const { 
   useGetAllDonViTinhQuery,
   useGetGetDonViTinhByIdQuery,
   useAddDonViTinhMutation,
   useUpdateDonViTinhMutation,
   useDeleteDonViTinhMutation
  } = apiDonViTinh;


export default apiDonViTinh.reducer;