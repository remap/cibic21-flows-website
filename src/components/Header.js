import React from 'react';
import './Header.css';
import CitySelector from './CitySelector.js';

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
        <CitySelector />
        <img className="icon" src={help} alt="More Information" />
      </div>
    </header>
  );
}

export default Header;
