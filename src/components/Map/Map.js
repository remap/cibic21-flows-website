import React, {useState, useEffect, useRef, useContext} from 'react';
import { createRoot } from "react-dom/client";
import './Map.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { RegionContext } from '../../app/regionContext';
import { useRides } from '../../utils/ride_utils';
import classNames from 'classnames';

import translations from '../../assets/translations.json'

mapboxgl.accessToken = 'pk.eyJ1IjoiY2liaWMtbWFwYm94IiwiYSI6ImNremoyd2tieTA1dXoyb21xN3E3anZsdmcifQ.ILbkkSjS8PpQkbr_VivhgQ';



const Popup = ({lang, flow, pod, satisfaction, rideChar, rideDes})=>(
  <div className='ride-info'>
          <h3>{translations.popup.rideData[lang]}</h3>
          <ul>
            <li><b>{translations.popup.flow[lang]}:</b> {flow}</li>
            <li><b>{translations.popup.pod[lang]}:</b> {pod}</li>
            <li><b>{translations.popup.satisfaction[lang]}:</b> {satisfaction}</li>
            <li><b>{translations.popup.rideCharacteristics[lang]}:</b> {rideChar}</li>
            <li><b>{translations.popup.rideDescription[lang]}:</b> {rideDes}</li>
          </ul>
        </div> 

)





export default function Map({Hidden}) {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);
  const [selectedRide, setSelectedRide] = useState(null) 

  const {region_coords, region_id, CheckRegionWithCoord, GetRegion, lang} = useContext(RegionContext);

  const rootElement = document.createElement("div")
  const popupNode = createRoot(rootElement)

  const langRef = useRef({}).current
  langRef.value = lang


  const popUpRef = useRef(new mapboxgl.Popup({ offset: 15 }))

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

    const handleShowInfo = (e)=>{

      let coordinates = e.features[0].geometry.coordinates[0];
      
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        let journal_answers = e.features[0].properties['answers']?JSON.parse(e.features[0].properties['answers']):null
        let journal = e.features[0].properties['journal']?JSON.parse(e.features[0].properties['journal']):null

        let flowName = e.features[0].properties['flowName']?e.features[0].properties['flowName']:"Unknown"
        let podName = e.features[0].properties['podName']?e.features[0].properties['podName']:"Unknown"
        let satisfaction = journal_answers?journal[0].options[journal_answers[0]]["label"][langRef.value]:"Unknown"
        let ride_characteristics = journal_answers?journal_answers[1].map((e)=>e[langRef.value]).join(', '):"Unknown"
        let ride_description = journal_answers?journal_answers[2]:"Unknown"
        setSelectedRide(oldRide=>(
          {
            flowName:flowName,
            podName:podName,
            satisfaction:satisfaction,
            ride_characteristics:ride_characteristics,
            ride_description:ride_description
          }
        ))
        popupNode.render(
          <Popup 
            lang={lang} 
            flow={flowName} 
            pod={podName} 
            satisfaction={satisfaction} 
            rideChar={ride_characteristics} 
            rideDes={ride_description}
          />
        )

        popUpRef.current
          .setLngLat(coordinates)
          .setDOMContent(rootElement)
          .addTo(map)
        // below is used to stop propagation
       e.originalEvent.stopPropagation();
    }

    const handleMouseEnter = (e)=>{
      map.getCanvas().style.cursor = 'pointer';
    }

    const handleMouseExit = (e)=>{
      map.getCanvas().style.cursor = '';
    }

    map.on('click', "rides", handleShowInfo)

    map.on('mouseenter', 'rides', handleMouseEnter);
       
    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'rides', handleMouseExit);

    return function(){
    }
    
  }, [map]);

  useEffect(()=>{
    if (!selectedRide) return
    popupNode.render(
      <Popup 
        lang={lang} 
        flow={selectedRide.flowName} 
        pod={selectedRide.podName} 
        satisfaction={selectedRide.satisfaction} 
        rideChar={selectedRide.ride_characteristics} 
        rideDes={selectedRide.ride_description}
      />
    )
    popUpRef.current.setDOMContent(rootElement)

  }, [lang])

  useEffect(()=>{
    if (!map) return; // wait for map to initialize
    map.on('load', ()=>{
      render_rides(rides)
    })
  },[map, rides])

  //Run if new map or if region coords change from dropdown
  useEffect(()=>{
    if (!map) return; // wait for map to initialize
    map.setCenter([region_coords[1], region_coords[0]])
  }, [region_coords, map])




  return (
    <div className={classNames({"hidden": !Hidden})} >
    <div id="map" ref={mapContainer}></div>
    </div>
  );
}

