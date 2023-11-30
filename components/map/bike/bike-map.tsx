"use client";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("../map").then((module) => module.Map), {
    ssr: false,
});
import { MapProps } from "../map";

import { Marker, Popup } from "react-leaflet";

import {
    BikeMapMarker,
    EmptyBikeStationIcon,
    FreeBikeStationIcon,
} from "./bike-map.entity";
import { BikeMapLegend } from "./bike-map-legend";
import { BikeMapSearch } from "./bike-map-search";

export interface BikeStationMapProps<
    T extends Pick<BikeMapMarker, "position">[] = [{ position: [0, 0] }],
> extends Omit<MapProps, "children"> {
    markers: T;
}

export const BikeStationMap: React.FC<BikeStationMapProps<BikeMapMarker[]>> = ({
    markers,
    sizing,
}) => {
    return (
        <>
            <BikeMapSearch />
            <BikeMapLegend />
            <Map sizing={sizing}>
                {markers.length > 0
                    ? markers.map((m: BikeMapMarker) =>
                        m.popup.free === 0 ? (
                            <Marker
                                icon={new EmptyBikeStationIcon()}
                                key={`MapMarker key: ${JSON.stringify(
                                    m.position
                                )}`}
                                position={m.position}
                            >
                                <Popup>
                                    <p>{m.popup.title}</p>
                                    <p>Empty: {m.popup.empty}</p>
                                    <p>Free: {m.popup.free}</p>
                                </Popup>
                            </Marker>
                        ) : (
                            <Marker
                                icon={new FreeBikeStationIcon()}
                                key={`MapMarker key: ${JSON.stringify(
                                    m.position
                                )}`}
                                position={m.position}
                            >
                                <Popup>
                                    <p>{m.popup.title}</p>
                                    <p>Empty: {m.popup.empty}</p>
                                    <p>Free: {m.popup.free}</p>
                                </Popup>
                            </Marker>
                        )
                    )
                    : null}
            </Map>
        </>
    );
};
