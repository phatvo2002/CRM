import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import fileDownload from "js-file-download";
const API_URL = process.env.REACT_APP_API_URL;
const Token = localStorage.getItem("token");


export const apiFile = createApi({
    reducerPath: 'apiFile',
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
      getFileImage: builder.query({
        query: (path) => `/File/image?path=${path}`,
      }),
      downloadFile: builder.mutation({
        queryFn: async (baoGiaId, api, extraOptions, baseQuery) => {
          const result = await baseQuery({
            url: `/File/exportbaogia/${baoGiaId}`, 
            method: "POST", 
            responseHandler: (response) => response.blob(),
          });
  
          if (result.error) {
            return { error: result.error };
          }
  
          fileDownload(result.data,"baogia_file.docx");
          return { data: null };
        },
      }),
      downloadFileDonHang: builder.mutation({
        queryFn: async (donHangId, api, extraOptions, baseQuery) => {
          const result = await baseQuery({
            url: `/File/exportdonhang/${donHangId}`, 
            method: "GET", 
            responseHandler: (response) => response.blob(),
          });
  
          if (result.error) {
            return { error: result.error };
          }
  
          fileDownload(result.data,"donhang.docx");
          return { data: null };
        },
      }),
    }),
  });
  export const { 
   useGetFileImageQuery,
   useDownloadFileMutation,
   useDownloadFileDonHangMutation
  } = apiFile;


export default apiFile.reducer;