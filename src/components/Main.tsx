import 'maplibre-gl/dist/maplibre-gl.css';
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import Map from "react-map-gl/maplibre";
import { Controller } from "../viewmodels/controller.viewmodel";
import { FilterSection } from "./FilterSection";
import { HexagonLayer } from "./HexagonLayer";

export const Main = observer(() => {
    const [controller] = useState(() => new Controller());

    useEffect(() => {
        controller.init();
    }, [controller]);

    return(
        <div>
            <FilterSection controller={controller} />
            <Map
                initialViewState={{ longitude: -122.34, latitude: 47.60, zoom: 11, pitch: 45 }}
                style={{ width: '100%', height: '50vh' }}
                mapStyle="https://tiles.openfreemap.org/styles/liberty"
            >
                {controller.allData.length > 0 && <HexagonLayer data={controller.filteredData} />}
            </Map>
        </div>
    )
})
