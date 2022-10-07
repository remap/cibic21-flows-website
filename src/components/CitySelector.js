import React from 'react';
import './CitySelector.css';


function CitySelector() {
  return (
      <select name="city-selector" id="city-selector">
          <option value="la" id="flyUCLA">Los Angeles</option>
          <option value="ba" id="flyBA">Buenos Aires</option>
      </select>
  );
}

export default CitySelector;
