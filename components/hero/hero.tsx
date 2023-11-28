"use client";
import { BicycleStation, useAntwerpQuery } from "@/store";
import { MapHeight } from "../map/map.entity";
import { BikeMapMarker } from "../map/bike/bike-map.entity";
import { HeroLoading } from "./hero-loading";
import { HeroError } from "./hero-error";
import { BikeStationMap } from "../map/bike/bike-map";

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

export const Hero = () => {
    const { data, isLoading, error } = useAntwerpQuery();
    const mapSizing = { size: MapHeight.HALF, opts: { pixels: "" } };

    const markers = defineMarkers(data?.network.stations);

    return (
        <article className="h-4/5 w-full bg-amber-100 text-center">
            <section className="flex flex-col m-auto w-4/5">
                {error ? (
                    <HeroError />
                ) : isLoading ? (
                    <HeroLoading />
                ) : (
                    <>
                        <p className="text-lg font-normal py-8 ">
                            Looking for a <i>velo</i>? Look no further; find one
                            now!
                        </p>
                        <BikeStationMap markers={markers} sizing={mapSizing} />
                    </>
                )}
            </section>
        </article>
    );
};
