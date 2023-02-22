import React from 'react';
import logo from '../../assets/cibic_logo.png';
import './Footer.css';
import Switcher from '../Switcher'


function Footer({ChangeView}) {
  return (
    <footer>
        <Switcher OnChange={ChangeView} />
        <a href="https://cibic.bike/" target="_blank" rel="noopener noreferrer"><img src={logo} className="logo" alt="CiBiC Civic Bicycle Commuting" /></a>
    </footer>
  );
}

export default Footer;
