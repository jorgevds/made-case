import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { bicycleSlice } from "./slices/bicycle-slice";
import { mapMarkerSlice } from "./slices/map-marker-slice";

export type RootState = ReturnType<typeof store.getState>;

export const store = configureStore({
    reducer: {
        [bicycleSlice.reducerPath]: bicycleSlice.reducer,
        [mapMarkerSlice.name]: mapMarkerSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(bicycleSlice.middleware),
});
setupListeners(store.dispatch);
