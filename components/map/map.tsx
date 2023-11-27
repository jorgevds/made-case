"use client";
import { MapContainer, TileLayer, useMap } from "react-leaflet"
import { MapHeight, MapSizing } from "./map.entity";
import { useMemo } from "react";
import { useStore } from "react-redux";
import { setMap } from "@/store/slices/map-slice";

const computeMapHeight = ({ size, opts }: MapSizing) => {
    const dict: Record<MapHeight, ({ pixels }: { pixels: string }) => string> = {
        [MapHeight.FULL]: () => "100vh",
        [MapHeight.HALF]: () => "50vh",
        [MapHeight.THIRD]: () => "33vh",
        [MapHeight.FOURTH]: () => "25vh",
        [MapHeight.FIXED]: ({ pixels }: { pixels: string }) => `${pixels}px`
    }

    return dict[size](opts)
}


export interface MapProps {
    sizing: MapSizing
    children: React.ReactNode
}

const GetMapReference = () => {
    const currentMap = useMap()
    const store = useStore()
    store.dispatch(setMap(currentMap))
    return null
}

export const Map: React.FC<MapProps> = ({ sizing, children }) => {
    const height = computeMapHeight(sizing)

    return useMemo(() =>
        <MapContainer center={[51.217222, 4.421111]} zoom={14} style={{ height: height, width: "100%" }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <GetMapReference />
            {children}
        </MapContainer>, [])
}
