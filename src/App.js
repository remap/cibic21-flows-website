import React from 'react';
import './App.css';
import Header from './components/Header.js'
import Footer from './components/Footer.js';
import Map from './components/Map/Map.js';
import Viz from './components/Viz.js';

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = 'pk.eyJ1IjoiY2liaWMtbWFwYm94IiwiYSI6ImNremoyd2tieTA1dXoyb21xN3E3anZsdmcifQ.ILbkkSjS8PpQkbr_VivhgQ';



function App() {
  return (
    <div className="App">
      <Header />
      <Map />
      <Viz />
      <Footer />
    </div>
  );
}

export default App;
