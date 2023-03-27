import React, {useContext} from 'react';
import logo from '../../assets/cibic_logo.png';
import './Footer.css';
import Switcher from '../Switcher';

import { RegionContext } from '../../app/regionContext';
import translations from '../../assets/translations.json'


function Footer({ChangeView}) {


  const {lang} = useContext(RegionContext)

  return (
    <footer>
        <Switcher OnChange={ChangeView} />
        <div className="logo-footer">
          <a href="https://cibic.bike/" target="_blank" rel="noopener noreferrer"><img src={logo} className="logo" alt="CiBiC Civic Bicycle Commuting" /></a>
          <p id="copytext" className="footer-small">{translations.copytext[lang]}</p>
        </div>
    </footer>
  );
}

export default Footer;
