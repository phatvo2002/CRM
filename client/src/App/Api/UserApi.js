import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const API_URL = "https://localhost:7211/api/v1";

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
      query: (id) => `/User/getUserById?id=${id}`,
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
        url: `/User?id=${id}`,
        method: "DELETE",
      }),
    }),
    // Update user permissions
    updateUserPermission: builder.mutation({
      query: (userId,roleId,roleName) => ({
        url: `/User/userRolePermission?id=${userId}&roleId=${roleId}&roleName=${roleName}`,
        method: "PUT",
      }),
    }),
  }),
});

// Export hooks for usage in components
export const { 
  useGetUserAllQuery, 
  useGetUserByIdQuery, 
  useAddUserMutation, 
  useDeleteUserMutation,
  useUpdateUserPermissionMutation 
} = apiUser;

export default apiUser.reducer;