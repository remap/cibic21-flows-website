import classNames from 'classnames';
import React, {useContext} from 'react';
import './Viz.css';

import { RegionContext } from '../../app/regionContext';

function Viz({Hidden}) {
  const {region_name} = useContext(RegionContext);
  return (
    <div id="viz" className={classNames({"hidden": !Hidden, "region-LA":region_name==="la", "region-BA":region_name==="ba"})}>
    </div>
  );
}

export default Viz;
