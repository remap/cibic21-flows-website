import React from 'react';
import './Translator.css';


function Translator() {

  function handleTranslation(e) {
    document.getElementById('language-selector').classList.toggle('hidden');

    let cityLA = document.getElementById('flyUCLA');
    let cityBA = document.getElementById('flyBA');
    let aboutP1 = document.getElementById('about-p1');
    let aboutP2 = document.getElementById('about-p2');
    let aboutP3 = document.getElementById('about-p3');
    let cibicLink = document.createElement("a");
    cibicLink.setAttribute('href', 'https://google.com');
    cibicLink.setAttribute('target', '_blank');

    switch(e.target.id) {
      case "translate-spanish":
        cityLA.text = "Los Angeles";
        cityBA.text = "Buenos Aires";
        aboutP1.textContent = "CiBiC: Civic Bicycle Commuting. Es un proyecto de investigación sobre transporte, en fase piloto, que busca impulsar a la gente a trasladarse grupalmente al trabajo en bicicleta.";
        aboutP2.textContent = "CiBiC es un proyecto de investigación participativo dirigido por UCLA, con el apoyo financiero de la National Science Foundation. CiBiC estudia cómo apoyar el traslado diario en bicicleta.";
        aboutP3.textContent = "Para conocer más acerca de cómo participar en CiBiC ";
        cibicLink.textContent = '¡visita nuestro Website!';
        aboutP3.appendChild(cibicLink);
        break;
      case "translate-chinese":
        cityLA.text = "洛杉磯";
        cityBA.text = "布宜諾斯艾利斯";
        aboutP1.textContent = "CiBiC 是由加州大學洛杉磯分校指導，國家科學基金會資助等，一項合作研究的專案。 CiBiC 研究如何扶助支的自車通勤。";
        aboutP2.textContent = "";
        aboutP3.textContent = "若您想瞭解更多有關參與 CiBiC 的資訊，";
        cibicLink.textContent = '請造訪我們的網站！';
        aboutP3.appendChild(cibicLink);
        break;
      default:
        cityLA.text = "Los Angeles";
        cityBA.text = "Buenos Aires";
        aboutP1.textContent = "CiBiC stands for Civic Bicycle Commuting and is a pilot transportation research project to encourage people to try commuting to work on bicycles in groups. It’s like carpooling but on bikes! The goal is to create a community-driven group bicycling system.";
        aboutP2.textContent = "CiBiC is a collaborative research project led by UCLA and funded by the National Science Foundation. CiBiC studies how to support bicycle commuting.";
        aboutP3.textContent = `To learn more about getting involved with CiBiC please `
        cibicLink.textContent = 'visit our website!';
        aboutP3.appendChild(cibicLink);
        break;
    }
  }

  return (
      <div id="language-selector" onClick={handleTranslation} className="language-selector hidden">
        <ul>
          <li id="translate-english" className="translator-option">English</li>
          <li id="translate-spanish" className="translator-option">Español</li>
          <li id="translate-chinese" className="translator-option">简体中文</li>
        </ul>
      </div>
  );
}

export default Translator;
