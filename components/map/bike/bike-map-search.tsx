import { Button } from "@/components/atoms/button";
import {
    BicycleStation,
    defineMarkers,
    setActiveBikeMarker,
    useAntwerpQuery,
} from "@/store/index";
import { useState } from "react";
import { useDispatch } from "react-redux";

export const BikeMapSearch = () => {
    const [stationId, setStationId] = useState<string>("");
    const { data } = useAntwerpQuery();
    const dispatch = useDispatch();

    const submit = () => {
        const stationById: BicycleStation | undefined =
            data?.network.stations.find(
                (station) => station.extra.uid === parseInt(stationId, 10)
            );
        if (!stationById) return;

        const activeMarker = defineMarkers([stationById])[0];

        dispatch(setActiveBikeMarker(activeMarker));
    };

    const reset = () => {
        dispatch(setActiveBikeMarker(null));
    };

    return (
        <article className="flex w-full flex-col sm:flex-row pb-4">
            <label
                className="flex flex-col text-left w-full sm:w-2/12 sm:p-0 pb-2"
                htmlFor="station-nr"
            >
                Station number:
                <input
                    type="text"
                    id="station-nr"
                    value={stationId}
                    placeholder="Station number"
                    onChange={(e) => setStationId(e.target.value)}
                    className="py-1 px-1 sm:mr-4"
                />
            </label>
            <section className="flex flex-col sm:flex-row">
                <div className="flex flex-col sm:flex-row sm:p-0 pb-2">
                    <Button style="primary" onClick={() => submit()}>
                        Search
                    </Button>
                </div>
                <div className="flex flex-col sm:flex-row">
                    <Button style="secondary" onClick={() => reset()}>
                        Reset
                    </Button>
                </div>
            </section>
        </article>
    );
};
