import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Compound } from "../../types/propertyTypes";
const baseUrl = import.meta.env.VITE_BASE_URL;

export const propertyApi = createApi({
    reducerPath: "propertyApi",
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
    endpoints: (builder) => ({
        getCompound: builder.query<Compound[],void>({
            query: () => "Compound",
            transformResponse: (response: { isSuccess: boolean; message: string; data: { items: Compound[] } }) => {
                return response.data.items
            },
        }),
    }),
});

export const { useGetCompoundQuery } = propertyApi;
