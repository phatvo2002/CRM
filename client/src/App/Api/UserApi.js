import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const API_URL = process.env.REACT_APP_API_URL;

const Token = localStorage.getItem("token");


export const apiUser = createApi({
  reducerPath: "apiUser", 
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL, 
    prepareHeaders: (headers) => {
      if (Token) {
        headers.set("Authorization", `Bearer ${Token}`);
      } else {
        console.warn("Token is not available or expired");
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Fetch all users
    getUserAll: builder.query({
      query: () => `/User/getAllUser`,
    }),
    // Fetch user by ID
    getUserById: builder.query({
      query: () => `/User/getUserById`,
    }),
    getUserByPhongBanId: builder.query({
      query: () => `/User/getuserbyphongbanid`,
    }),
    // Add a new user
    addUser: builder.mutation({
      query: (data) => ({
        url: `/User/createUser`,
        method: "POST",
        body: data,
      }),
    }),
    // Delete a user by ID
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/User/deleteUserById/${id}`,
        method: "DELETE",
      }),
    }),
    // Update user permissions
    updateUserPermission: builder.mutation({
      query: ({userId,roleId,roleName}) => ({
        url: `/User/userRolePermission?id=${userId}&roleId=${roleId}&roleName=${roleName}`,
        method: "PUT",
      }),
    }),
    updateUserDepartment: builder.mutation({
      query: ({userId,departmentId}) => ({
        url: `/User/userdepartment?userId=${userId}&departmentId=${departmentId}`,
        method: "PUT",
      }),
    }),
    upLoadImage: builder.mutation({
      query: (data) => {
        const formData = new FormData();
        if (data.file) {
            formData.append('formFile', data.file);
        }
        return {
          url: '/User/uploadimage',
          method: 'PUT',
          body: formData,
        };
      }
    }),

  }),
});

// Export hooks for usage in components
export const { 
  useGetUserAllQuery, 
  useGetUserByIdQuery, 
  useGetUserByPhongBanIdQuery,
  useAddUserMutation, 
  useDeleteUserMutation,
  useUpdateUserPermissionMutation,
  useUpdateUserDepartmentMutation,
  useUpLoadImageMutation
} = apiUser;

export default apiUser.reducer;