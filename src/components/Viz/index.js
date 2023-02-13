import classNames from 'classnames';
import React from 'react';
import './Viz.css';


function Viz({Hidden}) {

  return (
    <div id="viz" className={classNames({"hidden": !Hidden})}>
    </div>
  );
}

export default Viz;
