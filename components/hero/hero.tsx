"use client";
import {
    defineMarkers,
    stationToListItem,
    useAntwerpQuery,
} from "@/store/index";
import { MapHeight } from "../map/map.entity";
import { HeroLoading } from "./hero-loading";
import { HeroError } from "./hero-error";

import dynamic from "next/dynamic";
const BikeStationMap = dynamic(
    () =>
        import("../map/bike/bike-map").then((module) => module.BikeStationMap),
    {
        ssr: false,
    }
);
import { useState } from "react";
import { ListItem } from "../list/list.entity";
import { useDispatch } from "react-redux";
import { List } from "../list/list";
import { Button } from "../atoms/button";

const nMinutesInMs = (minutes: number) => 1000 * 60 * minutes;

export const Hero = () => {
    const [listVisible, setListVisible] = useState<boolean>(false);

    const { data, isLoading, error } = useAntwerpQuery(undefined, {
        pollingInterval: nMinutesInMs(5),
    });
    const dispatch = useDispatch();

    const mapSizing = { size: MapHeight.HALF, opts: { pixels: "" } };

    const markers = defineMarkers(data?.network.stations);

    const listItems: ListItem[] =
        data?.network.stations
            ?.slice()
            .sort((a, b) => a.extra.uid - b.extra.uid)
            .map((station) =>
                stationToListItem(
                    station,
                    dispatch,
                    markers.find((marker) => marker.popup.id === station.id)
                )
            ) ?? [];

    return (
        <article className="h-full flex-grow w-full bg-amber-100 text-center">
            <section className="flex flex-col m-auto sm:w-4/5 w-11/12">
                {error ? (
                    <HeroError />
                ) : isLoading ? (
                    <HeroLoading />
                ) : (
                    <>
                        <p className="text-2xl font-normal py-8">
                            Looking for a <i>velo</i>? Look no further; find one
                            now!
                        </p>
                        <BikeStationMap markers={markers} sizing={mapSizing} />

                        <div className="flex m-auto my-4">
                            <Button
                                style="primary"
                                onClick={() => setListVisible(!listVisible)}
                            >
                                {listVisible
                                    ? "Hide all bicycle stations"
                                    : "List all bicycle stations"}
                            </Button>
                        </div>

                        <p className="py-8">
                            Total active stations:{" "}
                            {data?.network.stations.length}
                        </p>

                        {listVisible ? (
                            <div className="contents" data-testid="bike-list">
                                <List items={listItems} />
                            </div>
                        ) : null}
                    </>
                )}
            </section>
        </article>
    );
};
