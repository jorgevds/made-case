import { LatLngExpression } from "leaflet";

export enum MapHeight {
    FULL = "FULL",
    HALF = "HALF",
    THIRD = "THIRD",
    FOURTH = "FOURTH",
    FIXED = "FIXED",
}

export interface MapSizing {
    size: MapHeight;
    opts: { pixels: string };
}

export interface MapMarker {
    position: LatLngExpression;
}
