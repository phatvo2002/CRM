
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


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
      getAllMenuParent: builder.query({
        query: () => `/Menu/getmenuparent`,
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
    useGetAllMenuParentQuery,
    useAddMenuMutation,
    useUpdateMenuRoleMutation,
    useUpdateMenuMutation,
    useDeleteMenuMutation
  } = apiMenu;


export default apiMenu.reducer;