export interface BicycleResponse {
    network: BicycleNetwork;
}

export interface BicycleNetwork {
    company: string[];
    href: string;
    id: string;
    location: BicycleNetworkLocation;
    name: string;
    stations: BicycleStation[];
}

export interface BicycleNetworkLocation {
    city: string;
    country: string;
    latitude: number;
    longitude: number;
}

export interface BicycleStation {
    empty_slots: number;
    extra: BicycleStationExtra;
    free_bikes: number;
    id: string;
    latitude: number;
    longitude: number;
    name: string;
    timestamp: string;
}

export interface BicycleStationExtra {
    address: string;
    status: string;
    uid: number;
}
