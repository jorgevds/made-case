import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BicycleResponse } from "../entities/bicycle.entity";

export const bicycleSlice = createApi({
    reducerPath: "bicycles",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://api.citybik.es/v2/networks/",
    }),
    endpoints: (builder) => ({
        antwerp: builder.query<BicycleResponse, void>({
            query: () => "velo-antwerpen",
        }),
    }),
});

export const { useAntwerpQuery } = bicycleSlice;
