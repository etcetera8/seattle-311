import Map from "react-map-gl/maplibre"
import 'maplibre-gl/dist/maplibre-gl.css';

export const Main = () => {
    return(
        <div>
            <Map
                initialViewState={{ longitude: -123.09, latitude: 44.05, zoom: 12 }}
                style={{ width: '50%', height: '50vh' }}
                mapStyle="https://tiles.openfreemap.org/styles/liberty"
            />
        </div>
    )
}