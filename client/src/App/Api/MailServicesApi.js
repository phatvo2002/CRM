import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = process.env.REACT_APP_API_URL;
const Token = localStorage.getItem("token");

export const apiMail = createApi({
  reducerPath: "apiMail",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      if (Token) {
        headers.set("Authorization", `Bearer ${Token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    AddMail: builder.mutation({
      query: (data) => {
        const formData = new FormData();
        formData.append("ToMail", data.ToMail);
        formData.append("Subject", data.Subject);
        formData.append("Body", data.Body);
     
        if (data.KhachHangTiemNangId) {
          formData.append("KhachHangTiemNangId", data.KhachHangTiemNangId);
        }

        if (data.KhachHangMucTieuId) {
          formData.append("KhachHangMucTieuId", data.KhachHangMucTieuId);
        }
        if (data.AttachtMent && data.AttachtMent.length > 0) {
          data.AttachtMent.forEach((item) => {
            if (item.file instanceof File) {
              formData.append("AttachtMent", item.file, item.file.name);
            }
          });
        }             
        return {
          url: "/Mail/GuiMail",
          method: "POST",
          body: formData,
        };
      },
    }),
    GuiMailBaoGia: builder.mutation({
      query: ({ baoGiaId : baoGiaId}) => {
        return {
          url: `/Mail/GuiMailBaoGia/${baoGiaId}`,
          method: "POST",
        };
      },
    }),
    GuiMailDonHang: builder.mutation({
      query: ({data : data , donHangId : donHangId}) => {
        return {
          url: `/Mail/GuiMailDonHang/${donHangId}`,
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});
export const {
  useAddMailMutation,
  useGuiMailBaoGiaMutation,
  useGuiMailDonHangMutation,
} = apiMail;

export default apiMail.reducer;
