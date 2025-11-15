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
        getRoles: builder.query({
            query: () => "Role",
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
            query: (role:{userID:string,roleID:string}) => ({
                url: "UserRole/assign-user-to-role",
                method: "POST",
                body: role
            }),
            invalidatesTags: ["Role"]
        })
    })
});

export const {useAddRoleMutation,useAddUserRoleMutation,useGetRolesQuery} = RoleApi