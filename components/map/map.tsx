"use client";
import { MapContainer, TileLayer, useMap, useMapEvent } from "react-leaflet";
import { MapHeight, MapSizing } from "./map.entity";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/index";
import { LatLngTuple } from "leaflet";

const computeMapHeight = ({ size, opts }: MapSizing) => {
    const dict: Record<MapHeight, ({ pixels }: { pixels: string }) => string> =
        {
            [MapHeight.FULL]: () => "100vh",
            [MapHeight.HALF]: () => "50vh",
            [MapHeight.THIRD]: () => "33vh",
            [MapHeight.FOURTH]: () => "25vh",
            [MapHeight.FIXED]: ({ pixels }: { pixels: string }) =>
                `${pixels}px`,
        };

    return dict[size](opts);
};

export interface MapProps {
    sizing: MapSizing;
    children: React.ReactNode;
}

const MapController = () => {
    const currentMap = useMap();
    const selectedMapMarker = useSelector(
        (state: RootState) => state.mapMarker.marker
    );

    useEffect(() => {
        if (!selectedMapMarker) {
            currentMap.setView([51.217222, 4.421111], 14);
            currentMap.eachLayer((layer) => layer.closePopup());
            return;
        }

        currentMap.flyTo(selectedMapMarker.position, 15);
    }, [selectedMapMarker, currentMap]);

    const map = useMapEvent("moveend", () => {
        if (!selectedMapMarker) return;
        map.eachLayer((layer) => {
            // Object.hasOwn doesn't type narrow _latlng into existence unfortunately
            if (
                (layer as any)._latlng &&
                (layer as any)._latlng.lat ===
                    (selectedMapMarker.position as LatLngTuple)[0]
            ) {
                layer.openPopup(selectedMapMarker.position);
            }
        });
    });

    return null;
};

export const Map: React.FC<MapProps> = ({ sizing, children }) => {
    const height = computeMapHeight(sizing);

    return useMemo(
        () => (
            <MapContainer
                center={[51.217222, 4.421111]}
                zoom={14}
                style={{ height: height, width: "100%" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapController />
                {children}
            </MapContainer>
        ),
        []
    );
};
