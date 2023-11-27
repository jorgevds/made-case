import { configureStore } from "@reduxjs/toolkit";
import { bicycleSlice } from "./slices/bicycle-slice";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: {
        [bicycleSlice.reducerPath]: bicycleSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(bicycleSlice.middleware),
});

setupListeners(store.dispatch);
