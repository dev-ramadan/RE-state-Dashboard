import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Broker, Users } from "../../types/usersTypes";
const baseUrl = import.meta.env.VITE_BASE_URL;
export const BrokerApi = createApi({
    reducerPath: "BrokersApi",
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
    tagTypes: ["Broker"],
    endpoints: (builder) => ({
        getBroker: builder.query<Broker[], void>({
            query: () => "Broker",
            transformResponse: (response: { isSuccess: boolean; message: string; data: { items: Broker[] } }) => {
                return response.data.items
            },
            providesTags: ["Broker"],
        }),
        getBrokerById: builder.query<Users, string>({
            query: (id) => `Broker/${id}`,
            providesTags: ["Broker"],
        }),
        deleteBroker: builder.mutation<void, string>({
            query: (id) => ({
                url: `Broker/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Broker"],
        }),
    })

});

export const { useGetBrokerByIdQuery,useGetBrokerQuery,useDeleteBrokerMutation } = BrokerApi