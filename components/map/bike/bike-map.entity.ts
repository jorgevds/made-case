import { Icon, IconOptions } from "leaflet";
import { MapMarker } from "../map.entity";

export interface BikeMapPopup {
    title: string;
    free: number;
    empty: number;
    id: string;
}

export interface BikeMapMarker extends MapMarker {
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
