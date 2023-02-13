import React from 'react';
import './Switcher.css';

import classNames from 'classnames';

import map_on from '../../assets/map-on.svg';
import map_off from '../../assets/map-off.svg';
import sparkle_on from '../../assets/sparkle-on.svg';
import sparkle_off from '../../assets/sparkle-off.svg';
import gallery_on from '../../assets/photo-library-on.svg';
import gallery_off from '../../assets/photo-library-off.svg';
import { useState } from 'react';


function Switcher({OnChange}) {
  const [Selected, setSelected] = useState(0)

  const handleChange = (index)=>{
    console.log("switching to ", index)
    setSelected(index)
    OnChange(index)
  }


  return (
      <div id="switcher">
        <div id="mapDiv" className={classNames("switch-view", {"selected": Selected===0})} onClick={()=>{handleChange(0)}}>
          {Selected===0?(
            <img id="mapImgOn" className="icon icon-map switch-map" src={map_on} alt="Map View - On" />
            ):(
              <img id="mapImgOff" className="icon icon-map switch-map" src={map_off} alt="Map View - Off" />
            )}
        </div>
        <div id="sparkleDiv" className={classNames("switch-view", {"selected": Selected===1})} onClick={()=>{handleChange(1)}}>
          {Selected===1?(
            <img id="sparkleImgOn" className="icon" src={sparkle_on} alt="Art View - On" />
            ):(
              <img id="sparkleImgOff" className="icon" src={sparkle_off} alt="Art View - Off"/>
            )}
        </div>
        <div id="galleryDiv" className={classNames("switch-view", {"selected": Selected===2})} onClick={()=>{handleChange(2)}}>
          {Selected===2?(
              <img id="galleryImgOn" className="icon" src={gallery_on} alt="Gallery View - On" />
            ):(
              <img id="galleryImgOff" className="icon" src={gallery_off} alt="Gallery View - Off"/>
            )}
        </div>
      </div>
  );
}

export default Switcher;
