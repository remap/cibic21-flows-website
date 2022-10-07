import React, { useRef, useEffect, useState } from 'react';
import './Map.css';
import MapManager from './MapManager.js';
import 'mapbox-gl/dist/mapbox-gl.css';

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = 'pk.eyJ1IjoiY2liaWMtbWFwYm94IiwiYSI6ImNremoyd2tieTA1dXoyb21xN3E3anZsdmcifQ.ILbkkSjS8PpQkbr_VivhgQ';


function Map() {

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-118.4452);
  const [lat, setLat] = useState(34.0689);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
  if (map.current) return; // initialize map only once
  map.current = new mapboxgl.Map({
  container: mapContainer.current,
  style: 'mapbox://styles/cibic-mapbox/cl8265z24000214mooehh9my5',
  center: [lng, lat],
  zoom: zoom
  });
  });



  return (
    <div>
      <div id="map" ref={mapContainer} className="map-container" />

        <div id="mapActions">
                <button id="drawOnLine">Draw on Line</button>
                <button id="removeDrawOnLine">Remove Draw Line</button>
                <button id="addGeoJSON">Add GeoJSON</button>
                <button id="removeGeoJSON">Remove GeoJSON</button>
                <button id="flyBA">Fly to Buenos Aires</button>
                <button id="flyUCLA">Fly to UCLA</button>
                <button id="zoomIn">+</button>
                <button id="zoomOut">—</button>
                <button id="currentLatLng">Show Current Lat Lng</button>
        </div>
        </div>
  );
}

export default Map;
