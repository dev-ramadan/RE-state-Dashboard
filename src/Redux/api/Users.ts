import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Users } from "../../types/usersTypes";
const BaseUrl = import.meta.env.VITE_BASE_URL;
export type PaginatedResponse<T> = {
  items: T[];
  pageNumber: number;
  totalCount: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
};

export const UsersApi = createApi({
    reducerPath: "UsersApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BaseUrl,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            headers.set("Content-Type", "application/json");
            return headers;
        },
    }),
    tagTypes: ["Users"],
    endpoints: (builder) => ({
        getCustomers: builder.query<PaginatedResponse<Users>, any>({
            query: ({pageNumber,pageSize}) => `user?PageSize=${pageSize ?? ""}&PageNumber=${pageNumber ??""}`,
            transformResponse: (response: { isSuccess: boolean; message: string; data:PaginatedResponse<any> }) => {
                return response.data
            },
            providesTags: ["Users"],
        }),
        getUserById: builder.query<any, string>({
            query: (id) => `user/${id}`,

            providesTags: ["Users"],
        }),
        deleteUser: builder.mutation<void, string>({
            query: (id) => ({
                url: `user/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Users"],
        }),
    })

});

export const { useGetCustomersQuery, useDeleteUserMutation, useGetUserByIdQuery } = UsersApi