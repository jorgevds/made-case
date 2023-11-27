import { Icon, IconOptions, LatLngExpression } from "leaflet";

export interface BikeMapPopup {
    title: string;
    free: number;
    empty: number;
}

export interface BikeMapMarker {
    position: LatLngExpression;
    popup: BikeMapPopup;
}

export class EmptyBikeStationIcon<T extends IconOptions> extends Icon {
    constructor(options: T = { iconUrl: "/marker-icon-blue.png" } as T) {
        super(options);
    }
}

export class FreeBikeStationIcon<T extends IconOptions> extends Icon {
    constructor(options: T = { iconUrl: "/marker-icon-red.png" } as T) {
        super(options);
    }
}
