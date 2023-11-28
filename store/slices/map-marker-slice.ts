import { BikeMapMarker } from "@/components/map/bike/bike-map.entity";
import { MapMarker } from "@/components/map/map.entity";
import { createSlice } from "@reduxjs/toolkit";

export interface SelectedMapMarkerState<T extends MapMarker> {
    marker: T | null;
}

export const mapMarkerSlice = createSlice({
    name: "mapMarker",
    initialState: { marker: null } as SelectedMapMarkerState<BikeMapMarker>,
    reducers: {
        setActiveBikeMarker: (state, payload) => {
            state.marker = payload.payload;
        },
    },
});

const reducer = mapMarkerSlice.reducer;
export default reducer;

export const { setActiveBikeMarker } = mapMarkerSlice.actions;
