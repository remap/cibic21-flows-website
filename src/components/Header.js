import React from 'react';
import './Header.css';
import CitySelector from './CitySelector.js';
import About from './About.js';
import Translator from './Translator.js';
import globe from '../assets/globe.svg';
import help from '../assets/help.svg'


function Header() {

  function handleAbout() {
    let aboutPopup = document.getElementById('about');
    aboutPopup.classList.toggle('hidden');
  }

  function handleTranslator() {
    let languageSelector = document.getElementById('language-selector');
    languageSelector.classList.toggle('hidden');
  }

  return (
    <header>
      <div className="header-row">
        <h1 className="title">Flows</h1>
        <img className="icon" src={globe} alt="Language Translate" onClick={handleTranslator} />
      </div>
      <div className="header-row">
        <CitySelector />
        <img className="icon" src={help} alt="More Information" onClick={handleAbout} />
      </div>
      <About />
      <Translator />
    </header>
  );
}

export default Header;
