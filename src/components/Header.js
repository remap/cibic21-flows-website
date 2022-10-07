import React from 'react';
import './Header.css';

import globe from '../assets/globe.svg';
import help from '../assets/help.svg'


function Header() {
  return (
    <header>
      <div className="header-row">
        <h1 className="title">Flows</h1>
        <img className="icon" src={globe} alt="Language Translate"/>
      </div>
      <div className="header-row">
        <select name="city-selector" id="city-selector">
          <option value="la" id="flyUCLA">Los Angeles</option>
          <option value="ba" id="flyBA">Buenos Aires</option>
        </select>
        <img className="icon" src={help} alt="More Information" />
      </div>
    </header>
  );
}

export default Header;
