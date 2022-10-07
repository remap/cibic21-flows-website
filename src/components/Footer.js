import React from 'react';
import logo from '../assets/cibic_logo.png';
import './Footer.css';
import Switcher from './Switcher.js'


function Footer() {
  return (
    <footer>
        <Switcher />
        <img src={logo} className="logo" />
    </footer>
  );
}

export default Footer;
