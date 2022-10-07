import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header.js'
import Footer from './components/Footer.js';
import Viz from './components/Viz.js';

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = 'pk.eyJ1IjoiY2liaWMtbWFwYm94IiwiYSI6ImNremoyd2tieTA1dXoyb21xN3E3anZsdmcifQ.ILbkkSjS8PpQkbr_VivhgQ';



function App() {

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
    <div className="App">
      <Header />
      <div>
        <div ref={mapContainer} className="map-container" />
      </div>
      <Footer />
    </div>
  );
}

export default App;
