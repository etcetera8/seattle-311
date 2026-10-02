import { HexagonLayer as DeckHexagonLayer } from "@deck.gl/aggregation-layers";
import { MapboxOverlay } from "@deck.gl/mapbox";
import { useEffect, useState } from "react";
import { useControl } from "react-map-gl/maplibre";

type RawPoint = [longitude: number, latitude: number, typeIndex: number, unixDate: number];
type CityData = {
    types: string[],
    points: RawPoint[]
}
type Point = [longitude: number, latitude: number, type: string, unixDate: number];

const mapData = ({ types, points }: CityData): Point[] =>
    points.map(([lng, lat, typeIndex, unixDate]) => [lng, lat, types[typeIndex], unixDate]);

export const HexagonLayer = () => {
    const [requestData, setRequestData] = useState<Point[]>([]);

    useEffect(() => {
        const controller = new AbortController();
        fetch("/requests.json", { signal: controller.signal })
            .then((res) => res.json())  
            .then((cityData: CityData) => setRequestData(mapData(cityData)))
            .catch((err) => {
                if (err.name !== "AbortError") console.error("oops, there was an issue importing the data", err);
            });
        return () => controller.abort();
    }, []);

    const overlay = useControl(() => new MapboxOverlay({
        getTooltip: (data) =>  data.object ? JSON.stringify(data.object.count) : null
    }));

    useEffect(() => {
        overlay.setProps({
            layers: [
                new DeckHexagonLayer<Point>({
                    id: "requests-hexagons",
                    data: requestData,
                    getPosition: ([lng, lat]) => [lng, lat],
                    radius: 200,
                    elevationScale: 4,
                    extruded: true,
                    pickable: true,
                }),
            ],
        });
    }, [overlay, requestData]);

    return null;
}
