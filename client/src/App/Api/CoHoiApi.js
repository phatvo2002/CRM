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
      getAllCoHoi: builder.query({
        query: ({tuNgay, denNgay}) => `/CoHoi/getallcohoi?tuNgay=${tuNgay}&denNgay=${denNgay}`,
      }),
      getCoHoiById: builder.query({
        query: (id) => `/CoHoi/getcohoibyid/${id}`,
      }),
      getCoHoiList: builder.query({
        query: () => `/CoHoi/getcohoilist`,
      }),
      convertCoHoi: builder.mutation({
        query: (data) => ({
          url: '/CoHoi/convertcohoi',
          method: 'POST',
          body: data,
        }),
      }),
      updateGiaiDoan: builder.mutation({
        query: ({ cohoiId, giaiDoanId }) => ({
          url: `/CoHoi/updategiaidoan?id=${cohoiId}&giaiDoanId=${giaiDoanId}`, 
          method: 'PUT', 
        }),
      }),     
      updateNgayKyVong: builder.mutation({
        query: ({ cohoiId, ngayKyVong }) => ({
          url: `/CoHoi/updatengaykyvong?id=${encodeURIComponent(cohoiId)}&ngayKyVong=${encodeURIComponent(ngayKyVong)}`, 
          method: 'PUT', 
        }),
      }),     
      updateSoTien: builder.mutation({
        query: ({ cohoiId, sotien }) => ({
          url: `/CoHoi/updatesotien?id=${cohoiId}&soTien=${sotien}`, 
          method: 'PUT', 
        }),
      }),      
      deleteCoHoi: builder.mutation({
        query: (id) => ({
          url: `/CoHoi/deletecohoi/${id}`,
          method: 'DELETE',
        }),
      }),
    }),
  });
  export const { 
    useGetAllCoHoiQuery,
    useGetCoHoiByIdQuery,
    useGetCoHoiListQuery,
    useConvertCoHoiMutation,
    useUpdateNgayKyVongMutation,
    useUpdateGiaiDoanMutation,
    useUpdateSoTienMutation,
    useDeleteCoHoiMutation,
  } = apiCoHoi;


export default apiCoHoi.reducer;