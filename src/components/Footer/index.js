import React from 'react';
import logo from '../../assets/cibic_logo.png';
import './Footer.css';
import Switcher from '../Switcher'


function Footer({ChangeView}) {
  return (
    <footer>
        <Switcher OnChange={ChangeView} />
        <div class="logo-footer">
          <a href="https://cibic.bike/" target="_blank" rel="noopener noreferrer"><img src={logo} className="logo" alt="CiBiC Civic Bicycle Commuting" /></a>
          <p class="footer-small">Supported by the CIVIC Innovation Challenge: Communities and Mobility, a collaboration between the National Science Foundation and the Department of Energy, Vehicle Transportation Office. NSF Award Number CNS-2133309. Any opinions, findings, conclusions or recommendations expressed in this material are those of the author(s) and do not necessarily reflect those of the National Science Foundation.</p>
          <p class="footer-small">&copy; Copyright 2022 Regents of the University of California. All rights reserved.</p>
        </div>
    </footer>
  );
}

export default Footer;
