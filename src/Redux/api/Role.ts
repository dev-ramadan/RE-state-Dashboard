import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseUrl = import.meta.env.VITE_BASE_URL;
export const RoleApi = createApi({
    reducerPath: "RoleApi",
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            headers.set("Content-Type", "application/json");
            return headers;
        },
    }),
    tagTypes: ["Role"],
    endpoints: (builder) => ({
        getRoles: builder.query<any[], void>({
            query: () => "Role",
            transformResponse: (response: { isSuccess: boolean; message: string; data: any[] }) => {
                return response.data;
            },
            providesTags: ["Role"]
        }),
        addRole: builder.mutation({
            query: (role: string) => ({
                url: "Role",
                method: "POST",
                body: role
            }),
            invalidatesTags: ["Role"]
        }),
        addUserRole: builder.mutation({
            query: (role: { userId: string, roleId: string }) => ({
                url: "UserRole/assign-user-to-role",
                method: "POST",
                body: role
            }),
            invalidatesTags: ["Role"]
        }),
        removeUserRole: builder.mutation({
            query: (role: { userId: string, roleId: string }) => ({
                url: "UserRole/remove-user-from-role",
                method: "DELETE",
                body: role
            }),
            invalidatesTags: ["Role"]
        }),

    })
});

export const { useAddRoleMutation, useAddUserRoleMutation, useGetRolesQuery ,useRemoveUserRoleMutation} = RoleApi