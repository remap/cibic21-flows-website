import React, {useContext} from 'react';
import './About.css';
import closeX from '../../assets/x.svg';
import logo from '../../assets/cibic_round.png';

import { RegionContext } from '../../app/regionContext';
import translations from '../../assets/translations.json';

function About() {
  const {lang} = useContext(RegionContext)

  function handleAbout(e) {
    if(e.target.classList.contains('about-close')) {
      let aboutPopup = document.getElementById('about');
      aboutPopup.classList.toggle('hidden');
    }
  }

  return (
      <div id="about" onClick={handleAbout} className="about-close hidden">
        <div id="about-focus">
          <div className="about-header about-close" onClick={handleAbout}>
            <img className="x-icon about-close" src={closeX} alt="Close About" onClick={handleAbout} />
          </div>
          <div className="about-content">
            <a href="https://cibic.bike/" target="_blank" rel="noopener noreferrer"><img src={logo} alt="CiBiC" width="150px" /></a>
            <p id="about-p1">{translations.aboutP1[lang]}</p>
            <p id="about-p2">{translations.aboutP2[lang]}</p>
            <p id="about-p3">{translations.aboutP3[lang]+" "}<a href="https://cibic.bike/" target="_blank" rel="noopener noreferrer">{translations.cibicLink[lang]}</a></p>
            <p id="about-footer">{translations.aboutfooter[lang]}</p>
          </div>
        </div>
      </div>
  );
}

export default About;
