import http from "http";
import Router from "@koa/router";
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";
import {
  Client,
  PlacesNearbyRanking,
} from "@googlemaps/google-maps-services-js";
import "dotenv/config";

// get apikey from dot env
export const apiKey = process.env.API_KEY;

async function serve(app: Koa): Promise<void> {
  return new Promise<void>((resolve) => {
    const port = process.env.PORT;
    const listener = http.createServer(app.callback());
    listener.on("close", resolve);
    listener.listen(port);
    // added port value to dot env
    console.info(`API available on port http://localhost:${port}`);

    process.on("SIGINT", () => {
      console.info("trapped SIGINT, terminating");
      listener.close();
    });
  });
}

export const runServer = async (): Promise<void> => {
  const app = new Koa();

  app.use(bodyParser());
  // implement cors for better communication between localhost from client and server
  app.use(
    cors({
      origin: "http://localhost:1234",
    })
  );

  const router = new Router();

  const client = new Client({});

  router.get("/gps", async (ctx) => {
    const { lat, lng } = ctx.request.query;

    if (!lat || !lng) {
      throw new Error(`Last and Lng must be provided.`);
    }

    try {
      const placesResponse = await client.placesNearby({
        params: {
          location: {
            lat: parseFloat(lat as string),
            lng: parseFloat(lng as string),
          },
          keyword: "doctor",
          key: apiKey as string,
          rankby: PlacesNearbyRanking.distance,
          type: "health",
        },
        timeout: 6000,
      });

      let allPlaces: any = [...placesResponse.data.results];
      // extract next page token from placeResponse.data.next_page_token and store to read from env
      const token = process.env.NEXT_PAGE_TOKEN as string;

      // token can be used for multiple request
      // use token to loop through client request to retrieve more results
      if (placesResponse.data.status === "OK") {
        for (let i = 0; i < 4; i++) {
          let moreResults: any;
          moreResults = await client.placesNearby({
            params: {
              location: {
                lat: parseFloat(lat as string),
                lng: parseFloat(lng as string),
              },
              keyword: "doctor",
              key: apiKey as string,
              type: "health",
              radius: 50000, //covers a larger scope
              pagetoken: token,
            },
            timeout: 2000,
          });
          allPlaces.push(...moreResults.data.results);
        }
      }

      const gps = allPlaces.map((place: any) => ({
        name: place.name,
        address: place.vicinity,
        location: place.geometry?.location,
      }));
      ctx.body = gps;
    } catch (e) {
      console.error(JSON.stringify(e));
    }
  });

  app.use(router.routes()).use(router.allowedMethods());

  await serve(app);
};

runServer().then(
  (): void => {
    process.exit(0);
  },
  (e): void => {
    console.error(e);
    process.exit(1);
  }
);
