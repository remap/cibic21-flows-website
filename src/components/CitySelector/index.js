import React, { useState, useContext, useEffect } from 'react';
import './CitySelector.css';

import { RegionContext } from '../../app/regionContext';

function CitySelector() {
  const {region_name, UpdateRegionWithID} = useContext(RegionContext)
  const [selectedRegion, setSelectedRegion] = useState(region_name)

  const handleSelection = (e)=>{
    const regionID = e.target.value
    UpdateRegionWithID(regionID)
    setSelectedRegion(regionID)
  }

  useEffect(()=>{
    setSelectedRegion(region_name)
  }, [region_name])

  return (
      <select name="city-selector" id="city-selector" value={selectedRegion} onChange={handleSelection}>
          <option value="la" id="flyUCLA">Los Angeles</option>
          <option value="ba" id="flyBA">Buenos Aires</option>
      </select>
  );
}

export default CitySelector;
