import React, {useState, useEffect, useRef, useContext} from 'react';
import './Map.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { RegionContext } from '../../app/regionContext';
import { useRides } from '../../utils/ride_utils';
import classNames from 'classnames';

mapboxgl.accessToken = 'pk.eyJ1IjoiY2liaWMtbWFwYm94IiwiYSI6ImNremoyd2tieTA1dXoyb21xN3E3anZsdmcifQ.ILbkkSjS8PpQkbr_VivhgQ';

export default function Map({Hidden}) {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);

  const {region_coords, region_id, CheckRegionWithCoord, GetRegion} = useContext(RegionContext);

  const [lng, setLng] = useState(region_coords[1]);
  const [lat, setLat] = useState(region_coords[0]);
  const [zoom, setZoom] = useState(10);

  const rides = useRides(region_id);

  const render_rides = (these_rides)=>{
    if(!map) return
    if (map.getLayer("rides")) {
      map.removeLayer("rides");
  }
  
  if (map.getSource("rides")) {
      map.removeSource("rides");
  }

    map.addSource('rides', {
           type:"geojson",
           data: these_rides
         })

    map.addLayer({
           "id": "rides",
           "type": "line",
           "source": "rides",
           'layout': {
             'line-join': 'round',
             'line-cap': 'round'
             },
             'paint': {
              'line-color': ["get", "web_viz_color"],
              'line-width': 4
             }
         })
  }

  // Run once on start
  useEffect(() => {

    // Get Closest City and region
    GetRegion()

    //If there is already a map, stop effect.
    if (map) return;

    // Create New Map
    let thisMap = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/cibic-mapbox/cl8265z24000214mooehh9my5',
      center: [lng, lat],
      zoom: zoom
    });
    
    // Set map state as map.
    setMap(thisMap)
  }, []);


  // Run Effect if map updates
  useEffect(() => {
    if (!map) return; // wait for map to initialize
    
    // Add a callback on movement
    map.on('move', () => {
      let newLat = map.getCenter().lat.toFixed(4)
      let newLong = map.getCenter().lng.toFixed(4)
      
      setLng(old=>newLong);
      setLat(old=>newLat);
      setZoom(old=>map.getZoom().toFixed(2));
      
      // Update Region With new coords
      CheckRegionWithCoord([newLat, newLong])
    });

    map.on('load', ()=>{
      render_rides(rides)
    })

    map.on('click',"rides" , (e)=>{
      console.log(e.features[0])
      let coordinates = e.features[0].geometry.coordinates[0];
      console.log(coordinates)
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
         
        new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(JSON.stringify(e.features[0].properties))
        .addTo(map);
    })

    map.on('mouseenter', 'rides', () => {
      map.getCanvas().style.cursor = 'pointer';
      });
       
      // Change it back to a pointer when it leaves.
      map.on('mouseleave', 'rides', () => {
      map.getCanvas().style.cursor = '';
      });
    
  }, [map, rides]);

  //Run if new map or if region coords change from dropdown
  useEffect(()=>{
    if (!map) return; // wait for map to initialize
    map.setCenter([region_coords[1], region_coords[0]])
  }, [region_coords, map])


  useEffect(()=>{

    if (!map) return; // wait for map to initialize
    //render_rides(rides)
    // Process and add them to the map as layers

  }, [rides])




  return (
    <div className={classNames({"hidden": !Hidden})} >
    <div id="map" ref={mapContainer}></div>
    </div>
  );
}

