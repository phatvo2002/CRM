// import axios from "axios";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// const API_URL = process.env.REACT_APP_API_URL;
// const Token = localStorage.getItem("token");

// const GetAllMenu = () => {
//     return axios
//     .get(`${API_URL}/Menu/getallmenu`, {
//       headers: { Authorization: `Bearer ${Token}` },
//     })
//     .then((response) => response.data);
// }
// const GetMenuRoleById = (roleId) => {
//   return axios
//     .get(`${API_URL}/Menu/getmenurole/${roleId}`, {
//       headers: { Authorization: `Bearer ${Token}` },
//     })
//     .then((response) => response.data);
// }

// const UpdateMenuRole = (data) => {
//   return axios
//     .put(`${API_URL}/Menu/updategroup`, data ,{
//       headers: { Authorization: `Bearer ${Token}` },
//     })
//     .then((response) => response.data);
// }

// export default {
//     GetAllMenu,
//     GetMenuRoleById,
//     UpdateMenuRole
// };

const API_URL = process.env.REACT_APP_API_URL;
const Token = localStorage.getItem("token");


export const apiMenu = createApi({
    reducerPath: 'apiMenu',
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
      getAllMenu: builder.query({
        query: () => `/Menu/getallmenu`,
      }),
      getMenuRoleById: builder.query({
        query: (roleId) => `/Menu/getmenurole/${roleId}`,
      }),
      addMenu: builder.mutation({
        query: (data) => ({
          url: '/Menu/insertmenu',
          method: 'POST',
          body: data,
        }),
      }),
      UpdateMenuRole: builder.mutation({
        query: (data) => ({
          url: `/Menu/updategroup`, 
          method: 'PUT', 
          body: data, 
        }),
      }),
      UpdateMenu: builder.mutation({
        query: (data) => ({
          url: `/Menu/updatemenu`, 
          method: 'PUT', 
          body: data, 
        }),
      }),
      deleteMenu: builder.mutation({
        query: (id) => ({
          url: `/Menu/deletemenu?id=${id}`,
          method: 'DELETE',
        }),
      }),
    }),
  });
  export const { 
    useGetAllMenuQuery, 
    useGetMenuRoleByIdQuery, 
    useAddMenuMutation,
    useUpdateMenuRoleMutation,
    useUpdateMenuMutation,
    useDeleteMenuMutation
  } = apiMenu;


export default apiMenu.reducer;