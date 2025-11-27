import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { CommercialProperties, GalleryImage, PropertyPropse, ResidentialProperties } from "../../types/property";
const baseUrl = import.meta.env.VITE_BASE_URL;
export interface GetPropertiesArgs {
    pageNumber?: number;
    pageSize?: number;
    city?: string;
    type?: string;
    title?: string;
    address?: string
}
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
    tagTypes: ["Property"],
    endpoints: (builder) => ({
        // get all property
        getProperty: builder.query<PropertyPropse[], GetPropertiesArgs>({
            query: ({ pageNumber, pageSize, city, address, type }) =>
                `Property?City=${city ?? ""}&Address=${address ?? ""}&PropertyType=${type ?? ""}&PageNumber=${pageNumber}&PageSize=${pageSize}`,
            transformResponse: (response: { isSuccess: boolean; message: string; data: { items: PropertyPropse[] } }) => {
                return response.data.items;
            },
            providesTags: ["Property"]
        }),

        // get  commercial by id
        getCommercialById: builder.query<CommercialProperties, string>({
            query: (id) => ({
                url: `CommercialProperty/${id}`
            }),
            transformResponse: (response: { isSuccess: boolean; message: string; data: CommercialProperties }) => {
                return response.data
            },
        }),

        // get  commercial by id
        getResidentialById: builder.query<ResidentialProperties, string>({
            query: (id) => ({
                url: `ResidentialProperty/${id}`
            }),
            transformResponse: (response: { isSuccess: boolean; message: string; data:  ResidentialProperties }) => {
                return response.data
            },
        }),

        //update Commercial Property
        updateCommercialProperty: builder.mutation({
            query: (data: { id: string, body: CommercialProperties }) => ({
                url: `CommercialProperty/${data.id}`,
                method: "PUT",
                body: data.body
            }),
            invalidatesTags: ["Property"]
        }),

        //delete Commercial Property 
        deleteCommercialProperty: builder.mutation({
            query: (id: string) => ({
                url: `CommercialProperty/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Property"]
        }),

        //update Residential Property
        updateResidentialProperties: builder.mutation({
            query: (data: { id: string, body: ResidentialProperties }) => ({
                url: `ResidentialProperty/${data.id}`,
                method: "PUT",
                body: data.body
            }),
            invalidatesTags: ["Property"]
        }),

        //delete Residential Property 
        deleteResidentialProperties: builder.mutation({
            query: (id: string) => ({
                url: `ResidentialProperty/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Property"]
        }),

        // property Image
        getPropertyImage:builder.query<GalleryImage,any>({
            query:(id)=>`PropertyGallery/${id}`,
            providesTags:["Property"]
        }),
    }),
});

export const { useGetPropertyQuery,
    useUpdateCommercialPropertyMutation,
    useDeleteCommercialPropertyMutation,
    useUpdateResidentialPropertiesMutation,
    useDeleteResidentialPropertiesMutation,
    useGetCommercialByIdQuery,
    useGetResidentialByIdQuery,
    useGetPropertyImageQuery
} = propertyApi;
