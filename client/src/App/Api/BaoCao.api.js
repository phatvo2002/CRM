
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const API_URL = process.env.REACT_APP_API_URL;
const Token = localStorage.getItem("token");


export const baoCaoApi = createApi({
    reducerPath: 'baoCaoApi',
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
      getBaoTongThe: builder.query({
        query: ({tuNgay , denNgay}) => `/BaoCao/getbaocaotongthe?tuNgay=${tuNgay}&denNgay=${denNgay}`,
      }),

     
    }),
  });
  export const { 
    useGetBaoTongTheQuery
  } = baoCaoApi;


export default baoCaoApi.reducer;