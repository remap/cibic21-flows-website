import React from 'react';
import './Map.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import ScriptTag from 'react-script-tag';

mapboxgl.accessToken = 'pk.eyJ1IjoiY2liaWMtbWFwYm94IiwiYSI6ImNremoyd2tieTA1dXoyb21xN3E3anZsdmcifQ.ILbkkSjS8PpQkbr_VivhgQ';

export default function Map() {
  // const mapContainer = useRef(null);
  // const map = useRef(null);
  // const [lng, setLng] = useState(-118.4452);
  // const [lat, setLat] = useState(34.0689);
  // const [zoom, setZoom] = useState(10);



  // useEffect(() => {
  // if (map.current) return; // initialize map only once
  // map.current = new mapboxgl.Map({
  // container: mapContainer.current,
  // style: 'mapbox://styles/cibic-mapbox/cl8265z24000214mooehh9my5',
  // center: [lng, lat],
  // zoom: zoom
  // });
  // });



// ref={mapContainer}
// ^^^ used in <div className="map-container" ref={mapContainer}></div>

// THESE ARE DUMMY CONTROLLERS FOR TESTING PURPOSES, div can be added to the map-container:
// <div id="mapActions">
//                 <button id="drawOnLine">Draw on Line</button>
//                 <button id="addGeoJSON">Add GeoJSON</button>
//                 <button id="removeGeoJSON">Remove GeoJSON</button>
//                 <button id="zoomIn">+</button>
//                 <button id="zoomOut">—</button>
//                 <button id="currentLatLng">Show Current Lat Lng</button>
//         </div>

  return (
    <div id="map">
      <div className="map-container"></div>
      <ScriptTag type="text/javascript" src="/map-manager.js" />
    </div>
  );
}

