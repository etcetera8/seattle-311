import Map from "react-map-gl/maplibre"
import 'maplibre-gl/dist/maplibre-gl.css';
import { HexagonLayer } from "./HexagonLayer";

export const Main = () => {
    return(
        <div>
            <Map
                initialViewState={{ longitude: -122.34, latitude: 47.60, zoom: 12 }}
                style={{ width: '50%', height: '50vh' }}
                mapStyle="https://tiles.openfreemap.org/styles/liberty"
            >
                <HexagonLayer />
            </Map>
        </div>
    )
}