import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = process.env.REACT_APP_API_URL;
const Token = localStorage.getItem("token");


export const apiMail = createApi({
    reducerPath: 'apiMail',
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
      AddMail: builder.mutation({
        query: (data) => {
          const formData = new FormData();
          formData.append('ToMail', data.ToMail);
          formData.append('Subject', data.Subject);
          formData.append('Body', data.Body);
          
          if (data.KhachHangTiemNangId) {
            formData.append('KhachHangTiemNangId', data.KhachHangTiemNangId);
          }
          
          if (data.KhachHangMucTieuId) {
            formData.append('KhachHangMucTieuId', data.KhachHangMucTieuId);
          }
          if (data.AttachtMent && data.AttachtMent.length > 0) {
            data.AttachtMent.forEach((file) => {
              formData.append('AttachtMent', file);
            });
          }
          return {
            url: '/Mail/GuiMail',
            method: 'POST',
            body: formData,
          };
        },
      }),   
      GuiMailBaoGia: builder.mutation({
        query: (data) => {
          const formData = new FormData();
          formData.append('ToMail', data.ToMail);
          formData.append('Subject', data.Subject);
          formData.append('Body', data.Body);
          
          if (data.KhachHangTiemNangId) {
            formData.append('KhachHangTiemNangId', data.KhachHangTiemNangId);
          }
          
          if (data.KhachHangMucTieuId) {
            formData.append('KhachHangMucTieuId', data.KhachHangMucTieuId);
          }
          if (data.AttachtMent && data.AttachtMent.length > 0) {
            data.AttachtMent.forEach((file) => {
              formData.append('AttachtMent', file);
            });
          }
          return {
            url: `/BaoGia/GuiMailBaoGia/${data?.BaoGiaId}/${data?.TrangThaiId}`,
            method: 'POST',
            body: formData,
          };
        },
      }),     
      GuiMailDonHang: builder.mutation({
        query: (data) => {
          const formData = new FormData();
          formData.append('ToMail', data.ToMail);
          formData.append('Subject', data.Subject);
          formData.append('Body', data.Body);
          
          if (data.KhachHangTiemNangId) {
            formData.append('KhachHangTiemNangId', data.KhachHangTiemNangId);
          }
          
          if (data.KhachHangMucTieuId) {
            formData.append('KhachHangMucTieuId', data.KhachHangMucTieuId);
          }
          if (data.AttachtMent && data.AttachtMent.length > 0) {
            data.AttachtMent.forEach((file) => {
              formData.append('AttachtMent', file);
            });
          }
          return {
            url: `/BaoGia/GuiMailBaoGia/${data?.BaoGiaId}/${data?.TrangThaiId}`,
            method: 'POST',
            body: formData,
          };
        },
      }),     
    }),
  });
  export const { 
   useAddMailMutation,
   useGuiMailBaoGiaMutation
  } = apiMail;


export default apiMail.reducer;