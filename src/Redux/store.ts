import { configureStore } from "@reduxjs/toolkit";
import { UsersApi } from "./api/Users";
import { loginApi } from "./api/AdminLogin";
import { propertyApi } from "./api/Property";
import { BrokerApi } from "./api/Broker";
import { AgentApi } from "./api/Agent";
import { RoleApi } from "./api/Role";

export const store = configureStore({
    reducer:{
        [UsersApi.reducerPath] : UsersApi.reducer,
        [loginApi.reducerPath] : loginApi.reducer,
        [propertyApi.reducerPath] : propertyApi.reducer,
        [BrokerApi.reducerPath] : BrokerApi.reducer,
        [AgentApi.reducerPath] : AgentApi.reducer,
        [RoleApi.reducerPath] : RoleApi.reducer,

    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware()
        .concat(UsersApi.middleware)
        .concat(loginApi.middleware)
        .concat(propertyApi.middleware)
        .concat(BrokerApi.middleware)
        .concat(AgentApi.middleware)
        .concat(RoleApi.middleware)


    
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;