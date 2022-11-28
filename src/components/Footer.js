import React from 'react';
import logo from '../assets/cibic_logo.png';
import './Footer.css';
import Switcher from './Switcher.js'


function Footer() {
  return (
    <footer>
        <Switcher />
        <a href="https://cibic.bike/" target="_blank"><img src={logo} className="logo" alt="CiBiC Civic Bicycle Commuting" /></a>
    </footer>
  );
}

export default Footer;
