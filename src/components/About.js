import React from 'react';
import './About.css';
import closeX from '../assets/x.svg';
import logo from '../assets/cibic_round.png';


function About() {

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
            <img src={logo} alt="CiBiC" width="150px" />
            <p>CiBiC stands for Civic Bicycle Commuting and is a pilot transportation research project to encourage people to try commuting to work on bicycles in groups. It’s like carpooling but on bikes! The goal is to create a community-driven group bicycling system.</p>
            <p>CiBiC is a collaborative research project led by UCLA and funded by the National Science Foundation. CiBiC studies how to support bicycle commuting.</p>
            <p>To learn more about getting involved with CiBiC please visit our website!</p>
          </div>
        </div>
      </div>
  );
}

export default About;
