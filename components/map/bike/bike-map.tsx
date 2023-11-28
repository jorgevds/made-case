"use client";
import { Map, MapProps } from "../map";

import { Dispatch, useState } from "react";
import { List } from "../../list/list";
import { LayersControl, Marker, Popup } from "react-leaflet";

import {
    BikeMapMarker,
    EmptyBikeStationIcon,
    FreeBikeStationIcon,
} from "./bike-map.entity";
import { BikeMapLegend } from "./bike-map-legend";
import { BicycleStation, setActiveBikeMarker, useAntwerpQuery } from "@/store";
import { ListItem } from "@/components/list/list.entity";
import { useDispatch } from "react-redux";
import { AnyAction } from "@reduxjs/toolkit";

export const stationToListItem: (
    station: BicycleStation,
    dispatch: Dispatch<AnyAction>,
    marker: BikeMapMarker | undefined
) => ListItem = (
    station: BicycleStation,
    dispatch: Dispatch<AnyAction>,
    marker: BikeMapMarker | undefined
) => ({
    label: `${station.extra.uid} - ${station.extra.address}`,
    latLng: [station.latitude, station.longitude],
    onClick: () => dispatch(setActiveBikeMarker(marker)),
});

export interface BikeStationMapProps<
    T extends Pick<BikeMapMarker, "position">[] = [{ position: [0, 0] }],
> extends Omit<MapProps, "children"> {
    markers: T;
}

export const BikeStationMap: React.FC<BikeStationMapProps<BikeMapMarker[]>> = ({
    markers,
    sizing,
}) => {
    const [listVisible, setListVisible] = useState<boolean>(false);
    const { data } = useAntwerpQuery();
    const dispatch = useDispatch();

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
        <>
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
            <div className="flex m-auto my-4">
                <button
                    onClick={() => setListVisible(!listVisible)}
                    className="bg-red-500 text-white px-4 py-2"
                >
                    List all the bicycle stations
                </button>
            </div>
            <p className="py-8">
                Total active stations: {data?.network.stations.length}
            </p>
            {listVisible ? <List items={listItems} /> : null}
        </>
    );
};
