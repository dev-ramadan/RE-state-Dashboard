import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ICredentials, ILoginResponse } from "../../types/loginTypes";
const BaseUrl = import.meta.env.VITE_BASE_URL;

export const loginApi = createApi({
    reducerPath: "loginApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BaseUrl,
        prepareHeaders(headers) {
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    endpoints: (builder) => ({
        login: builder.mutation<ILoginResponse,ICredentials>({
            query: (credintial) => ({
                url: "/Auth/login",
                method:"POST",
                body: credintial
            })
        })
    })
});
export const {useLoginMutation} = loginApi 