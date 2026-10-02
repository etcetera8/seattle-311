import { HexagonLayer as DeckHexagonLayer } from "@deck.gl/aggregation-layers";
import { MapboxOverlay } from "@deck.gl/mapbox";
import { useEffect, useState } from "react";
import { useControl } from "react-map-gl/maplibre";

type Point = [longitude: number, latitude: number];

export const HexagonLayer = () => {
    const [requestData, setRequestData] = useState<Point[]>([]);

    useEffect(() => {
        const controller = new AbortController();
        fetch("/requests.json", { signal: controller.signal })
            .then((res) => res.json())
            .then((points: Point[]) => setRequestData(points))
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
                    getPosition: (d) => d,
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
