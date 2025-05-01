
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
      getBaoCaoTheoCoHoi: builder.query({
        query: ({tuNgay , denNgay}) => `/BaoCao/getbaocaotheocohoi?tuNgay=${tuNgay}&denNgay=${denNgay}`,
      }),
      getBaoCaoTheoBaoGia: builder.query({
        query: ({tuNgay , denNgay}) => `/BaoCao/getbaocaobaogia?tuNgay=${tuNgay}&denNgay=${denNgay}`,
      }),
      getBaoCaoTheoDonHang: builder.query({
        query: ({tuNgay , denNgay}) => `/BaoCao/getbaocaodonhang?tuNgay=${tuNgay}&denNgay=${denNgay}`,
      }),
    }),
  });
  export const { 
    useGetBaoTongTheQuery,
    useGetBaoCaoTheoCoHoiQuery,
    useGetBaoCaoTheoBaoGiaQuery,
    useGetBaoCaoTheoDonHangQuery
  } = baoCaoApi;


export default baoCaoApi.reducer;