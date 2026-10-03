import { HexagonLayer as DeckHexagonLayer } from "@deck.gl/aggregation-layers";
import { MapboxOverlay } from "@deck.gl/mapbox";
import { useEffect, type FC } from "react";
import { useControl } from "react-map-gl/maplibre";
import type { Point } from "../viewmodels/controller.viewmodel";

interface Props {
    data: Point[]
}
export const HexagonLayer: FC<Props> = ({ data} ) => {
    const overlay = useControl(() => new MapboxOverlay({
        getTooltip: (data) =>  data.object ? JSON.stringify(data.object.count) : null
    }));

    useEffect(() => {
        overlay.setProps({
            layers: [
                new DeckHexagonLayer<Point>({
                    id: "requests-hexagons",
                    data,
                    getPosition: ([lng, lat]) => [lng, lat],
                    radius: 200,
                    elevationScale: 4,
                    extruded: true,
                    pickable: true,
                }),
            ],
        });
    }, [overlay, data]);

    return null;
}
