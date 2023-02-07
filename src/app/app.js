import React from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer';
import Map from '../components/Map/Map';
import Viz from '../components/Viz';

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import RegionProvider from './regionContext';

mapboxgl.accessToken = 'pk.eyJ1IjoiY2liaWMtbWFwYm94IiwiYSI6ImNremoyd2tieTA1dXoyb21xN3E3anZsdmcifQ.ILbkkSjS8PpQkbr_VivhgQ';


function App() {
  return (
    <div className="App">
      <RegionProvider>
      <Header />
      <Map />
      <Viz />
      <Footer />
      </RegionProvider>
    </div>
  );
}

export default App;
