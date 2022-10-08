console.log('mapManager initiated');
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

                document.getElementById('flyBA').addEventListener('select', () => {
                  console.log(this)
                    // mapMan.doAction('map', { method: 'flyTo', args: [{ center: [-34.602745750551776, -58.430084781580] }] })
                })
                document.getElementById('flyUCLA').addEventListener('select', () => {
                  console.log(this)
                    // mapMan.doAction('map', { method: 'flyTo', args: [{ center: [-118.4452, 34.0689] }] })
                })
                document.getElementById('zoomIn').addEventListener('click', () => {
                    mapMan.doAction('map', { method: 'zoomIn', args: [] })
                })
                document.getElementById('zoomOut').addEventListener('click', () => {
                    mapMan.doAction('map', { method: 'zoomOut', args: [] })
                })
                document.getElementById('currentLatLng').addEventListener('click', () => {
                    function handleGetCenter(name, results) {
                        if (name === 'mapGetCenterResult') {
                            if (results.success) {
                                console.log(results.success);
                                alert(results.success);
                            }
                            mapMan.removeJsResponseHandler(handleGetCenter);
                        }
                    }
                    mapMan.addJsResponseHandler(handleGetCenter);
                    mapMan.doAction('map', { method: 'getCenter', args: [], results: true })
                })

                document.getElementById('addGeoJSON').addEventListener('click', () => {
            mapMan.doAction('addGeoJson', {
                sourceId:'uclaline',
                layerStyles:{
                    type:'line',
                    layout: {
                    'line-join': 'round',
                    'line-cap': 'round'
                    },
                    paint: {
                    'line-color': '#2774AE',
                    'line-width': 8
                    }
                },
                geojson: {
                    "type": "Feature",
                    "properties": {},
                    "geometry": {
                        "type": "LineString",
                        "coordinates": [
                            [
                                -118.44823837280273,
                                34.06425000282253
                            ],
                            [
                                -118.44403266906738,
                                34.05870378737542
                            ],
                            [
                                -118.45184326171875,
                                34.055788323465855
                            ],
                            [
                                -118.43407630920412,
                                34.03103839734782
                            ],
                            [
                                -118.41390609741211,
                                34.03160744227741
                            ],
                            [
                                -118.40875625610352,
                                34.02982916420039
                            ],
                            [
                                -118.3952808380127,
                                34.0291889749689
                            ],
                            [
                                -118.37794303894042,
                                34.037582183607775
                            ],
                            [
                                -118.36541175842284,
                                34.03388358382995
                            ],
                            [
                                -118.34807395935059,
                                34.03509275919161,
                            ]
                        ]
                    }
                }
            })
        })
        document.getElementById('removeGeoJSON').addEventListener('click', () => {
            mapMan.doAction('removeGeoJson', {sourceId:'uclaline'});
        });


        document.getElementById('drawOnLine').addEventListener('click', () => {
            mapMan.doAction('drawOnLine', {
                sourceId: 'linedraw',
                stepAngle: 0.001,
                geojson: {
                    "type": "Feature",
                    "properties": {},
                    "geometry": {
                        "type": "LineString",
                        "coordinates": [
                            [
                                -118.44823837280273,
                                34.06425000282253
                            ],
                            [
                                -118.44403266906738,
                                34.05870378737542
                            ],
                            [
                                -118.45184326171875,
                                34.055788323465855
                            ],
                            [
                                -118.43407630920412,
                                34.03103839734782
                            ],
                            [
                                -118.41390609741211,
                                34.03160744227741
                            ],
                            [
                                -118.40875625610352,
                                34.02982916420039
                            ],
                            [
                                -118.3952808380127,
                                34.0291889749689
                            ],
                            [
                                -118.37794303894042,
                                34.037582183607775
                            ],
                            [
                                -118.36541175842284,
                                34.03388358382995
                            ],
                            [
                                -118.34807395935059,
                                34.03509275919161
                            ]
                        ]
                    }
                }
            })
        })
