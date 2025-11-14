import { configureStore } from "@reduxjs/toolkit";
import { UsersApi } from "./api/Users";
import { loginApi } from "./api/AdminLogin";
import { propertyApi } from "./api/Property";

export const store = configureStore({
    reducer:{
        [UsersApi.reducerPath] : UsersApi.reducer,
        [loginApi.reducerPath] : loginApi.reducer,
        [propertyApi.reducerPath] : propertyApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware()
        .concat(UsersApi.middleware)
        .concat(loginApi.middleware)
        .concat(propertyApi.middleware)
    
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;