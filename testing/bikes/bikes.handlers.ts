import { HttpResponse, http, delay } from "msw";
import { bikesStationsResponse } from "./bikes.mock";

const antwerpBikesGetAll = http.get(
    "http://api.citybik.es/v2/networks/velo-antwerpen",
    async () => {
        await delay(250);
        return HttpResponse.json(bikesStationsResponse);
    }
);

export const bikeHandlers = [antwerpBikesGetAll];
