import React from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer';
import Map from '../components/Map/Map';
import Viz from '../components/Viz';

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import RegionProvider from './regionContext';
import { useState } from 'react';
import Gallery from '../components/Gallery';

mapboxgl.accessToken = 'pk.eyJ1IjoiY2liaWMtbWFwYm94IiwiYSI6ImNremoyd2tieTA1dXoyb21xN3E3anZsdmcifQ.ILbkkSjS8PpQkbr_VivhgQ';


function App() {

  const [viewIndex, setViewIndex] = useState(0)
  
  const changeView = (viewIndex)=>{
    setViewIndex(viewIndex)
  }

  return (
    <div className="App">
      <RegionProvider>
      <Header />
        <Map Hidden={viewIndex===0}/>
        <Viz Hidden={viewIndex===1}/>
        <Gallery Hidden={viewIndex===2}/>
      <Footer ChangeView={changeView}/>
      </RegionProvider>
    </div>
  );
}

export default App;
