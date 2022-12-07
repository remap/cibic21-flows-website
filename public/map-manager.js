class MapManager {
  constructor({ wsUrl, postMessage, postMessageOrigin }) {
    if (mapboxgl === undefined) {
      throw Error('Mapbox sdk must be included before MapManager is constructed')
    }
    this.postMessageOrigin = postMessageOrigin;
    // websocket messaging
    this.outputs = []
    this.ws = null;
    if (wsUrl) {
      this.wsUrl = wsUrl;
      this.wsEvents = {};
      this.outputs.push(this.sendWs.bind(this));
      this.connectWs();
    }

    // Postmessage API
    if (postMessage) {
      window.addEventListener('message', (event) => {
        if (this.postMessageOrigin && this.postMessageOrigin != event.origin) {
          return
        }
        // don't listen to events we just sent
        if (event.source === window) {
          return
        }
        this.handelMessage(event.data)
      });
      this.outputs.push(this.sendPostMessage.bind(this));
    }

    this.mapDefaults = {
      container: 'map', // container ID
      style: 'mapbox://styles/cibic-mapbox/cl8265z24000214mooehh9my5', // style URL
      center: [-118.2355343774625, 34.04157251507084], // starting position [lng, lat]
      zoom: 10, // starting zoom,
      attributionControl: false
    }
    this.trackedProjections = {}
  }

  connectWs() {
    this.clearWsEvents();
    this.ws = new WebSocket(this.wsUrl)
    this.wsConnectTimeout = setTimeout(this.onWsTimeout.bind(this), 30 * 1000);
    this.wsEvents = {
      'message': this.wsHandelMessage.bind(this),
      'error': this.onWsError.bind(this),
      'close': this.connectWs.bind(this),
      'open': () => {
        clearTimeout(this.wsConnectTimeout);
        this.ws.send(JSON.stringify({
          response: 'ready'
        }));
      }
    }
    for (let event in this.wsEvents) {
      this.ws.addEventListener(event, this.wsEvents[event])
    }

  }
  clearWsEvents() {
    if (!this.ws) { return }
    for (let event in this.wsEvents) {
      this.ws.removeEventListener(event, this.wsEvents[event])
    }
  }
  onWsError(event) {
    console.log('ws error', event)
    this.clearWsEvents();
    this.ws = null;
    this.connectWs();
  }
  onWsTimeout(event) {
    console.log('ws failed to connect in time')
    this.clearWsEvents();
    this.ws = null;
    this.connectWs();
  }
  wsHandelMessage(event) {
    try {
      const obj = JSON.parse(event.data)
      this.handelMessage(obj);
    } catch (ex) {
      console.error(ex)
    }
  }
  sendWs(name, results) {
    if (!this.ws) { return }
    const responseObj = { response: name }
    if (results) {
      responseObj['results'] = results
    }
    this.ws.send(JSON.stringify(responseObj))
  }
  wsPing() {
    if (this.ws) {
      this.sendWs('pong');
    }
  }
  sendPostMessage(name, results) {
    const responseObj = { response: name }
    if (results) {
      responseObj['results'] = results
    }
    const target = this.postMessageOrigin || '*';
    if (window.parent) {
      window.parent.postMessage(responseObj, target);
    }
  }
  sendResponse(name, results) {
    this.outputs.forEach((o) => o(name, results))
  }

  addJsResponseHandler(handler) {
    this.outputs.push(handler)
  }
  removeJsResponseHandler(handler) {
    const index = this.outputs.indexOf(handler)
    if (index === -1) {
      // not found
      return false
    }
    this.outputs.splice(index, 1);
  }

  handelMessage(data) {
    // console.log(data)
    if ('action' in data) {
      if (data.action === 'map') {
        if (!this.map) { return; }
        try {
          const result = this.map[data.options.method].apply(this.map, data.options.args)
          if ('results' in data.options) {

            const responseName = `map${data.options.method[0].toLocaleUpperCase()}${data.options.method.substring(1)}Result`
            this.sendResponse(responseName, { success: result, key: data.options.results })
          }
        } catch (err) {
          if ('results' in data.options) {
            const responseName = `map${data.options.method[0].toLocaleUpperCase()}${data.options.method.substring(1)}Result`
            this.sendResponse(responseName, { error: err, key: data.options.results })
          }
        }
      }
      else if ('options' in data && data.options) {
        if (Array.isArray(data.options)) {
          this[data.action].apply(this, data.options);
        }
        else {
          this[data.action](data.options);
        }
      }
      else {
        this[data.action]();
      }
    }
  }
  doAction(action, options) {
    this.handelMessage({ action, options })
  }
  setToken({ accessToken }) {
    mapboxgl.accessToken = accessToken;
  }
  setMapDefaults({ defaults }) {
    this.mapDefaults = { ...this.mapDefaults, ...defaults };
  }
  init() {
    if (!mapboxgl.accessToken) {
      console.error('access token not set');
      return;
    }
    this.map = new mapboxgl.Map(this.mapDefaults);
    this.map.once('load', () => {
      this.sendResponse('loaded', { result: 'loaded' });
      this.sendStatus();
    })
    this.map.on('move', () => {
      this.sendStatus();
    })
  }
  sendStatus() {
    const { lng, lat } = this.map.getCenter();
    const zoom = this.map.getZoom();
    const bounds = this.map.getBounds();
    const bearing = this.map.getBearing();
    const results = { lat, lng, zoom, bounds, bearing };
    if (Object.keys(this.trackedProjections).length) {
      results.projections = {}
      for (let name in this.trackedProjections) {
        const xy = this.map.project(this.trackedProjections[name])
        results.projections[name] = xy;
      }
    }
    this.sendResponse('mapstatus', results);
  }
  trackProjection({ name, location }) {
    this.trackedProjections[name] = location;
  }
  untrackProjection({ name }) {
    delete this.trackedProjections[name];
  }
  clearTrackedProjections() {
    this.trackedProjections = {};
  }
  showBounds({ bounds, options, easeOptions={}, easeTo=true, moveData=null }) {
    if (!this.map) { console.error('map not initialized'); return }
    const camera = this.map.cameraForBounds(bounds, options);
    if(easeTo){
      const easeDetails = {...camera, ...easeOptions};
      console.log(easeDetails)
      this.map.easeTo(easeDetails, moveData ? {moveData}: undefined);
      if(moveData){
        this.map.once('moveend',(data)=>{
          this.sendResponse('showBoundsComplete',{moveData})
        })
      }
    }
    else{
      this.map.jumpTo(camera);
      if(moveData){
        this.sendResponse('showBoundsComplete',{moveData})
      }
    }
  }
}

// geojson-drawing.js
if (MapManager) {
  MapManager.prototype.addGeoJson = function addGeoJson({ geojson, sourceId, layerStyles, beforeId, layerId }) {
    this.addGeoJsonSource({ geojson, sourceId });
    this.addGeoJsonLayer({sourceId, layerId: (layerId || `${sourceId}Layer`), layerStyles, beforeId });
  }
  MapManager.prototype.addGeoJsonSource = function addGeoJsonSource({ geojson, sourceId }) {
    this.idToGJSource = this.idToGJSource || {};
    if (this.idToGJSource[sourceId]) {
      this.updateGeoJsonSource({ geojson, sourceId });
      return
    }
    this.map.addSource(sourceId, {
      type: 'geojson',
      data: geojson
    });
    this.idToGJSource[sourceId] = this.map.getSource(sourceId);
  }
  MapManager.prototype.addGeoJsonLayer = function addGeoJsonLayer({ layerId, sourceId, layerStyles, beforeId }) {
    this.gjLayerIds = this.gjLayerIds || [];
    if (this.gjLayerIds.includes(layerId)) {
      this.updateGeoJsonLayer({ layerId, layerStyles });
      return;
    }
    this.gjLayerIds.push(layerId);
    const layerProps = {
      id: layerId,
      type: layerStyles['type'] || 'line',
      source: sourceId,
      layout: layerStyles['layout'] || {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: layerStyles['paint'] || {
        'line-color': '#f00',
        'line-width': 1
      }
    };
    if (layerStyles['filter'] !== undefined) {
      layerProps['filter'] = layerStyles['filter'];
    }
    this.map.addLayer(layerProps, beforeId);
  }
  MapManager.prototype.updateGeoJson = function updateGeoJson({ geojson, sourceId, layerStyles, beforeId, layerId }) {
    this.updateGeoJsonSource({ geojson, sourceId });
    this.updateGeoJsonLayer({sourceId, layerId: (layerId || `${sourceId}Layer`), layerStyles, beforeId });
  }
  MapManager.prototype.updateGeoJsonSource = function updateGeoJsonSource({ geojson, sourceId }) {
    this.idToGJSource = this.idToGJSource || {};
    if (!this.idToGJSource[sourceId]) {
      console.log(`failed to update: source "${sourceId}" not found`);
      return;
    }
    this.idToGJSource[sourceId].setData(geojson);
  }

  MapManager.prototype.updateGeoJsonLayer = function updateGeoJsonLayer({ layerId, layerStyles }) {
    this.gjLayerIds = this.gjLayerIds || [];
    if (!this.gjLayerIds.includes(layerId)) {
      console.log(`failed to update: layer "${layerId}" not found`);
      return;
    }
    if (layerStyles['paint']) {
      for (let prop in layerStyles['paint']) {
        this.map.setPaintProperty(layerId, prop, layerStyles['paint'][prop]);
      }
    }
    if (layerStyles['layout']) {
      for (let prop in layerStyles['layout']) {
        this.map.setLayoutProperty(layerId, prop, layerStyles['layout'][prop]);
      }
    }
    if (layerStyles['filter'] !== undefined) {
      this.map.setFilter(layerId, layerStyles['filter']);
    }
  }

  MapManager.prototype.removeGeoJson = function removeGeoJson({ sourceId, layerId }) {
    const layerIdToRemove = layerId || `${sourceId}Layer`;
    this.removeGeoJsonLayer({layerId:layerIdToRemove});
    this.removeGeoJsonSource({sourceId});
  }

  MapManager.prototype.removeGeoJsonSource = function removeGeoJsonSource({ sourceId }) {
    this.idToGJSource = this.idToGJSource || {};
    if (!this.idToGJSource[sourceId]) {
      console.log(`failed to remove: source "${sourceId}" not found`);
      return;
    }
    this.map.removeSource(sourceId);
    delete this.idToGJSource[sourceId];
  }
  MapManager.prototype.removeGeoJsonLayer = function removeGeoJsonLayer({ layerId }) {
    this.gjLayerIds = this.gjLayerIds || [];
    if (!this.gjLayerIds.includes(layerId)) {
      console.log(`failed to remove: layer "${layerId}" not found`);
      return;
    }
    this.map.removeLayer(layerId);
    this.gjLayerIds.splice(this.gjLayerIds.indexOf(layerId),1);
  }

  MapManager.prototype.getGeoJson = function getGeoJson() {
    this.idToGJSource = this.idToGJSource || {};
    this.gjLayerIds = this.gjLayerIds || [];
    return {sources: Object.keys(this.idToGJSource), layers: this.gjLayerIds};
  }
  MapManager.prototype.getGeoJsonSources = function getGeoJsonSources() {
    this.idToGJSource = this.idToGJSource || {};
    return Object.keys(this.idToGJSource);
  }
  MapManager.prototype.getGeoJsonLayers = function getGeoJsonLayers() {
    this.gjLayerIds = this.gjLayerIds || [];
    return this.gjLayerIds;
  }
}


// line-draw-extension
if (MapManager) {
  MapManager.prototype.drawGeoJson = function drawGeoJson({ geojson }) {
    this.map.addSource('geodraw', {
      type: 'geojson',
      data: geojson
    })
    this.map.addLayer({
      id: 'line',
      type: 'line',
      source: 'geodraw',
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#888',
        'line-width': 8
      }
    });
  }
  MapManager.prototype.drawOnLine = function drawOnLine({ geojson, stepAngle = 0.001 }) {
    if(this.drawingOnLine){
      return
    }
    this.drawingOnLine = true;
    // subdivide line
    let segments = [geojson.geometry.coordinates[0]];
    for (let i = 1, l = geojson.geometry.coordinates.length; i < l; i++) {
      const start = geojson.geometry.coordinates[i - 1];
      const end = geojson.geometry.coordinates[i];
      const dLat = end[0] - start[0];
      const dLng = end[1] - start[1];
      const length = Math.sqrt(Math.pow(dLat, 2) + Math.pow(dLng, 2));
      const segmentCount = Math.ceil(length / stepAngle);
      const sLat = dLat / segmentCount;
      const sLng = dLng / segmentCount;
      const subSegments = [];
      for (s = 1; s <= segmentCount; s++) {
        subSegments.push([start[0] + sLat * s, start[1] + sLng * s]);
      }
      segments = segments.concat(subSegments);
    }



    const ongoing = {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "LineString",
        "coordinates": [
          segments[0],
          segments[1]
        ]
      }
    };
    let currentIndex = 1;
    let source = this.map.getSource('livedraw');
    if (!source) {
      this.map.addSource('livedraw', {
        type: 'geojson',
        data: ongoing
      });
      source = this.map.getSource('livedraw');
    }
    if (!this.map.getLayer('line')) {
      this.map.addLayer({
        id: 'line',
        type: 'line',
        source: 'livedraw',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#800',
          'line-width': 8
        }
      });
    }
    this.map.jumpTo({ center: segments[0] });
    const addSegment = () => {
      currentIndex++;
      if (segments.length === currentIndex) {
        this.drawingOnLine = false;
        return;
      }
      ongoing.geometry.coordinates.push(segments[currentIndex]);
      source.setData(ongoing);
      this.map.jumpTo({ center: segments[currentIndex], speed: 0.5 });
      requestAnimationFrame(addSegment);
    }
    requestAnimationFrame(addSegment);

  }
} else {
  throw Error('MapManager sdk must be included before applying an extension');
}


// mapman-init initializer
const mapMan = new MapManager({ wsUrl: '', postMessage: '', postMessageOrigin: '' })
mapMan.addJsResponseHandler((name, options) => {
                        console.log(name, options);
})
mapMan.doAction('setToken', { accessToken: 'pk.eyJ1IjoiY2liaWMtbWFwYm94IiwiYSI6ImNremoyd2tieTA1dXoyb21xN3E3anZsdmcifQ.ILbkkSjS8PpQkbr_VivhgQ' });
mapMan.doAction('init');

const citySelector = document.getElementById('city-selector');
citySelector.addEventListener('change', () => {
  if(citySelector.value == 'ba') {
    mapMan.doAction('map', { method: 'flyTo', args: [{ center: [-58.428685708026535, -34.6029001441812136] }] })
  } else {
    mapMan.doAction('map', { method: 'flyTo', args: [{ center: [-118.4452, 34.0689] }] })
  }
                    // mapMan.doAction('map', { method: 'flyTo', args: [{ center: [-34.602745750551776, -58.430084781580] }] })
})

// THE FOLLOWING IS FOR TESTING PURPOSES

// document.getElementById('zoomIn').addEventListener('click', () => {
//     mapMan.doAction('map', { method: 'zoomIn', args: [] })
// })

// document.getElementById('zoomOut').addEventListener('click', () => {
//     mapMan.doAction('map', { method: 'zoomOut', args: [] })
// })

// document.getElementById('currentLatLng').addEventListener('click', () => {
//     function handleGetCenter(name, results) {
//         if (name === 'mapGetCenterResult') {
//             if (results.success) {
//                 console.log(results.success);
//                 alert(results.success);
//             }
//             mapMan.removeJsResponseHandler(handleGetCenter);
//         }
//     }
//     mapMan.addJsResponseHandler(handleGetCenter);
//     mapMan.doAction('map', { method: 'getCenter', args: [], results: true })
// })

// document.getElementById('addGeoJSON').addEventListener('click', () => {
//     mapMan.doAction('addGeoJson', {
//         sourceId:'uclaline',
//         layerStyles:{
//             type:'line',
//             layout: {
//             'line-join': 'round',
//             'line-cap': 'round'
//             },
//             paint: {
//             'line-color': '#2774AE',
//             'line-width': 8
//             }
//         },
//         geojson: {
//             "type": "Feature",
//             "properties": {},
//             "geometry": {
//                 "type": "LineString",
//                 "coordinates": [
//                     [
//                         -118.44823837280273,
//                         34.06425000282253
//                     ],
//                     [
//                         -118.44403266906738,
//                         34.05870378737542
//                     ],
//                     [
//                         -118.45184326171875,
//                         34.055788323465855
//                     ],
//                     [
//                         -118.43407630920412,
//                         34.03103839734782
//                     ],
//                     [
//                         -118.41390609741211,
//                         34.03160744227741
//                     ],
//                     [
//                         -118.40875625610352,
//                         34.02982916420039
//                     ],
//                     [
//                         -118.3952808380127,
//                         34.0291889749689
//                     ],
//                     [
//                         -118.37794303894042,
//                         34.037582183607775
//                     ],
//                     [
//                         -118.36541175842284,
//                         34.03388358382995
//                     ],
//                     [
//                         -118.34807395935059,
//                         34.03509275919161,
//                     ]
//                 ]
//             }
//         }
//     })
// })
// document.getElementById('removeGeoJSON').addEventListener('click', () => {
//     mapMan.doAction('removeGeoJson', {sourceId:'uclaline'});
// });


// document.getElementById('drawOnLine').addEventListener('click', () => {
//     mapMan.doAction('drawOnLine', {
//         sourceId: 'linedraw',
//         stepAngle: 0.001,
//         geojson: {
//             "type": "Feature",
//             "properties": {},
//             "geometry": {
//                 "type": "LineString",
//                 "coordinates": [
//                     [
//                         -118.44823837280273,
//                         34.06425000282253
//                     ],
//                     [
//                         -118.44403266906738,
//                         34.05870378737542
//                     ],
//                     [
//                         -118.45184326171875,
//                         34.055788323465855
//                     ],
//                     [
//                         -118.43407630920412,
//                         34.03103839734782
//                     ],
//                     [
//                         -118.41390609741211,
//                         34.03160744227741
//                     ],
//                     [
//                         -118.40875625610352,
//                         34.02982916420039
//                     ],
//                     [
//                         -118.3952808380127,
//                         34.0291889749689
//                     ],
//                     [
//                         -118.37794303894042,
//                         34.037582183607775
//                     ],
//                     [
//                         -118.36541175842284,
//                         34.03388358382995
//                     ],
//                     [
//                         -118.34807395935059,
//                         34.03509275919161
//                     ]
//                 ]
//             }
//         }
//     })
// })


const GetGeoJSONFlows = async () =>{
  return fetch("https://sudo-cibic-renderings.s3.us-west-1.amazonaws.com/latest/latest_flows.json").then(async data=>{
    return data.json()
  })
}

const rideDataClean = [];

let rideData = GetGeoJSONFlows()


// RANDOM COLORS ARRAY FOR TESTING PURPOSES
// const colors = [];
// while (colors.length < 100) {
//     do {
//         var color = Math.floor((Math.random()*1000000)+1);
//     } while (colors.indexOf(color) >= 0);
//     colors.push("#" + ("000000" + color.toString(16)).slice(-6));
// }


GetGeoJSONFlows().then(data=>{
  let rideData = data
  rideData.forEach(ride => {
    let rideProps = ride.properties;
    ride.features.forEach(rideItem => {
      if (rideItem.geometry.type === "LineString" && rideItem.geometry.coordinates) {
        rideItem.properties = rideProps;
        let cleanCoordinates = []
        rideItem.geometry.coordinates.forEach(rideItemCoordinates => {
          let newCoordinates = [rideItemCoordinates[0], rideItemCoordinates[1]];
          cleanCoordinates.push(newCoordinates);
        })
        rideItem.geometry.coordinates = cleanCoordinates;
        rideDataClean.push(rideItem);
      }
    })
})

const sourceNameList = [];

// ADD GEOJSON FLOWS:
setTimeout(() => {
let i = 0;
rideDataClean.forEach(data => {
  let sourceName = `line${i}`;
  sourceNameList.push(sourceName);
  mapMan.doAction('addGeoJson', {
        sourceId: sourceName,
        layerStyles:{
            type:'line',
            layout: {
            'line-join': 'round',
            'line-cap': 'round'
            },
            paint: {
            'line-color': data.properties.web_viz_color,
            'line-width': 5
            }
        },
        geojson: data
    })
  i++;
  }
);
}, "2000");
})

// rideData.forEach(ride => {
//     let rideProps = ride.properties;
//     ride.features.forEach(rideItem => {
//       if (rideItem.geometry.type === "LineString" && rideItem.geometry.coordinates) {
//         // console.log(rideItem);
//         rideItem.properties = rideProps;
//         let cleanCoordinates = []
//         rideItem.geometry.coordinates.forEach(rideItemCoordinates => {
//           let newCoordinates = [rideItemCoordinates[0], rideItemCoordinates[1]];
//           cleanCoordinates.push(newCoordinates);
//           // console.log(cleanCoordinates);
//         })
//         rideItem.geometry.coordinates = cleanCoordinates;
//         rideDataClean.push(rideItem);
//       }
//     })
// })
//
// const sourceNameList = [];
//
// // ADD GEOJSON FLOWS:
// setTimeout(() => {
// let i = 0;
// rideDataClean.forEach(data => {
//   let sourceName = `line${i}`;
//   sourceNameList.push(sourceName);
//   mapMan.doAction('addGeoJson', {
//         sourceId: sourceName,
//         layerStyles:{
//             type:'line',
//             layout: {
//             'line-join': 'round',
//             'line-cap': 'round'
//             },
//             paint: {
//             'line-color': colors[i],
//             'line-width': 5
//             }
//         },
//         geojson: data
//     })
//   i++;
//   }
// );
// }, "2000");
//


// DRAW ON LINE ATTEMPTS:
// setTimeout(() => {
// let i = 0;
// rideDataClean.forEach(data => {
//   // console.log(`attempting ${i}`);
//   // console.log(data);
//   let sourceName = `line${i}`;
//   sourceNameList.push(sourceName);
//   mapMan.doAction('drawOnLine', {
//         sourceId: sourceName,
//         stepAngle: 0.001,
//         layerStyles:{
//             type:'line',
//             layout: {
//             'line-join': 'round',
//             'line-cap': 'round'
//             },
//             paint: {
//             'line-color': colors[i],
//             'line-width': 5
//             }
//         },
//         geojson: data
//     })
//   i++;
//   }
// );
// }, "2000");

