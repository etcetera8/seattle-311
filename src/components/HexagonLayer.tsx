import { Deck, PickingInfo } from '@deck.gl/core';
import { H3HexagonLayer } from '@deck.gl/geo-layers';
import { MapboxOverlay, type MapboxOverlayProps } from "@deck.gl/mapbox";
import { useControl } from "react-map-gl/maplibre";

export const HexagonLayer = () => {
    const data: MapboxOverlayProps;
    const overlay = useControl(( () => new MapboxOverlay(data)))
    return null
}