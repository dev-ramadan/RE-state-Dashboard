import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Agent } from "../../types/usersTypes";
const baseUrl = import.meta.env.VITE_BASE_URL;
export const AgentApi = createApi({
    reducerPath: "AgentApi",
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
    tagTypes: ["Agent"],
    endpoints: (builder) => ({
        getAgent: builder.query<Agent[], void>({
            query: () => "Agent",
            transformResponse: (response: { isSuccess: boolean; message: string; data: { items: Agent[] } }) => {
                return response.data.items
            },
            providesTags: ["Agent"],
        }),
        getAgentById: builder.query<Agent, string>({
            query: (id) => `Agent/${id}`,
            providesTags: ["Agent"],
        }),
        deleteAgent: builder.mutation<void, string>({
            query: (id) => ({
                url: `Agent/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Agent"],
        }),
    })

});

export const { useGetAgentByIdQuery,useGetAgentQuery,useDeleteAgentMutation } = AgentApi