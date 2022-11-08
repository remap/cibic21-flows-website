import React from 'react';
import './Switcher.css';

import map_on from '../assets/map-on.svg';
import map_off from '../assets/map-off.svg';
import sparkle_on from '../assets/sparkle-on.svg';
import sparkle_off from '../assets/sparkle-off.svg';


function Switcher() {
  function clickMap() {
    let mapDiv = document.getElementById('mapDiv');
    let artDiv = document.getElementById('sparkleDiv');
    let mapIconOn = document.getElementById('mapImgOn');
    let artIconOn = document.getElementById('sparkleImgOn');
    let mapIconOff = document.getElementById('mapImgOff');
    let artIconOff = document.getElementById('sparkleImgOff');
    let mapWindow = document.getElementById('map');
    let artWindow = document.getElementById('viz');

    if (!mapDiv.classList.contains('selected')) {
      mapDiv.classList.toggle('selected');
      artDiv.classList.toggle('selected');
      mapIconOn.classList.toggle('hidden');
      mapIconOff.classList.toggle('hidden');
      artIconOn.classList.toggle('hidden');
      artIconOff.classList.toggle('hidden');
      mapWindow.classList.toggle('hidden');
      artWindow.classList.toggle('hidden');
    }
  }

  function clickArt() {
    let mapDiv = document.getElementById('mapDiv');
    let artDiv = document.getElementById('sparkleDiv');
    let mapIconOn = document.getElementById('mapImgOn');
    let artIconOn = document.getElementById('sparkleImgOn');
    let mapIconOff = document.getElementById('mapImgOff');
    let artIconOff = document.getElementById('sparkleImgOff');
    let mapWindow = document.getElementById('map');
    let artWindow = document.getElementById('viz');

    if (!artDiv.classList.contains('selected')) {
      mapDiv.classList.toggle('selected');
      artDiv.classList.toggle('selected');
      mapIconOn.classList.toggle('hidden');
      mapIconOff.classList.toggle('hidden');
      artIconOn.classList.toggle('hidden');
      artIconOff.classList.toggle('hidden');
      mapWindow.classList.toggle('hidden');
      artWindow.classList.toggle('hidden');
    }
  }

  return (
      <div id="switcher">
        <div id="mapDiv" className="switch-view switch-map selected" onClick={clickMap}>
          <img id="mapImgOn" className="icon icon-map switch-map" src={map_on} alt="Map View - On" />
          <img id="mapImgOff" className="icon icon-map switch-map hidden" src={map_off} alt="Map View - Off" />
        </div>
        <div id="sparkleDiv" className="switch-view switch-art" onClick={clickArt}>
          <img id="sparkleImgOff" className="icon icon-art switch-art" src={sparkle_off} alt="Art View - Off"/>
          <img id="sparkleImgOn" className="icon icon-map switch-map hidden" src={sparkle_on} alt="Art View - On" />
        </div>
      </div>
  );
}

export default Switcher;
