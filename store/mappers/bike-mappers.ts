import { BikeMapMarker } from "@/components/map/bike/bike-map.entity";
import { BicycleStation } from "../entities/bicycle.entity";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { ListItem } from "@/components/list/list.entity";
import { setActiveBikeMarker } from "../slices/map-marker-slice";

export type DefineMarkersSignature = (
    stations: BicycleStation[] | undefined
) => BikeMapMarker[];

export const defineMarkers: DefineMarkersSignature = (
    stations?: BicycleStation[]
) =>
    stations?.map((station) => ({
        position: [station.latitude, station.longitude],
        popup: {
            title: `${station.extra.uid} - ${station.extra.address}`,
            free: station.free_bikes,
            empty: station.empty_slots,
            id: station.id,
        },
    })) ?? [];

export const stationToListItem: (
    station: BicycleStation,
    dispatch: Dispatch<AnyAction>,
    marker: BikeMapMarker | undefined
) => ListItem = (
    station: BicycleStation,
    dispatch: Dispatch<AnyAction>,
    marker: BikeMapMarker | undefined
) => ({
    label: `${station.extra.uid} - ${station.extra.address}`,
    latLng: [station.latitude, station.longitude],
    onClick: () => dispatch(setActiveBikeMarker(marker)),
});
