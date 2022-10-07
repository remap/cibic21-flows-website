import React from 'react';
import './Switcher.css';

import map_on from '../assets/map-on.svg';
import map_off from '../assets/map-off.svg';
import sparkle_on from '../assets/sparkle-on.svg';
import sparkle_off from '../assets/sparkle-off.svg';


function Switcher() {
  return (
      <div id="switcher">
        <div className="switch-view switch-map selected">
          <img className="icon icon-map switch-map" src={map_on} alt="Map View - On" />
        </div>
        <div className="switch-view switch-art">
          <img className="icon icon-art switch-art" src={sparkle_off} alt="Art View - Off"/>
        </div>
      </div>
  );
}

export default Switcher;
