import React, { useContext } from 'react';
import './Translator.css';
import { RegionContext } from '../../app/regionContext';


function Translator() {
  const {SetLang} = useContext(RegionContext)

  function handleTranslation(e){
    SetLang(e.target.id)
    document.getElementById('language-selector').classList.add('hidden');
  }

  function closeSelector(e) {
    document.getElementById('language-selector').classList.add('hidden');
  }

  return (
      <div id="language-selector" className="language-selector hidden" onClick={closeSelector}>
        <ul>
          <li id="en" className="translator-option" onClick={handleTranslation}>English</li>
          <li id="es" className="translator-option" onClick={handleTranslation}>Español</li>
          <li id="zh" className="translator-option" onClick={handleTranslation}>简体中文</li>
        </ul>
      </div>
  );
}

export default Translator;
