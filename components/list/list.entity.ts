import { LatLngExpression } from "leaflet";

export interface ListItem {
    label: string;
    latLng: LatLngExpression;
    onClick: (x: any) => void;
}
