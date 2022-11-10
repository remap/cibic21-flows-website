import React from 'react';
import './Header.css';
import CitySelector from './CitySelector.js';
import About from './About.js';
import globe from '../assets/globe.svg';
import help from '../assets/help.svg'


function Header() {

  function handleAbout() {
    console.log('handleAbout');
    let aboutPopup = document.getElementById('about');
    aboutPopup.classList.toggle('hidden');
  }

  return (
    <header>
      <div className="header-row">
        <h1 className="title">Flows</h1>
        <img className="icon" src={globe} alt="Language Translate"/>
      </div>
      <div className="header-row">
        <CitySelector />
        <img className="icon" src={help} alt="More Information" onClick={handleAbout} />
      </div>
      <About />
    </header>
  );
}

export default Header;
