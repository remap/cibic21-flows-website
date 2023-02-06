import React, {useState, useEffect, useRef, useContext} from 'react';
import './Map.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import ScriptTag from 'react-script-tag';
import { RegionContext } from '../../app/regionContext';

mapboxgl.accessToken = 'pk.eyJ1IjoiY2liaWMtbWFwYm94IiwiYSI6ImNremoyd2tieTA1dXoyb21xN3E3anZsdmcifQ.ILbkkSjS8PpQkbr_VivhgQ';

export default function Map() {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);

  const {region_coords, region_id, CheckRegionWithCoord, GetRegion} = useContext(RegionContext);

  const [lng, setLng] = useState(region_coords[1]);
  const [lat, setLat] = useState(region_coords[0]);
  const [zoom, setZoom] = useState(10);

  
  useEffect(() => {
    GetRegion()
    if (map) return; // initialize map only once
    let thisMap = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/cibic-mapbox/cl8265z24000214mooehh9my5',
      center: [lng, lat],
      zoom: zoom
    });
    setMap(thisMap)
  }, []);

  useEffect(() => {
    if (!map) return; // wait for map to initialize
    
    console.log('adds move callback')
    map.on('move', () => {
      console.log('moving')
      let newLat = map.getCenter().lat.toFixed(4)
      let newLong = map.getCenter().lng.toFixed(4)
      setLng(old=>newLong);
      setLat(old=>newLat);
      setZoom(old=>map.getZoom().toFixed(2));
      CheckRegionWithCoord([newLat, newLong])
    });
    
  }, [map]);

  useEffect(()=>{
    if (!map) return; // wait for map to initialize
    console.log('updating region coords')
    map.setCenter([region_coords[1], region_coords[0]])
  }, [region_coords, map])


// ref={mapContainer}
// ^^^ used in <div className="map-container" ref={mapContainer}></div>

// THESE ARE DUMMY CONTROLLERS FOR TESTING PURPOSES, div can be added to the map-container:
// <div id="mapActions">
//                 <button id="drawOnLine">Draw on Line</button>
//                 <button id="addGeoJSON">Add GeoJSON</button>
//                 <button id="removeGeoJSON">Remove GeoJSON</button>
//                 <button id="zoomIn">+</button>
//                 <button id="zoomOut">—</button>
//                 <button id="currentLatLng">Show Current Lat Lng</button>
//         </div>
//<ScriptTag type="text/javascript" src="/map-manager.js" />

  return (
    <div id="map" ref={mapContainer}></div>
  );
}

