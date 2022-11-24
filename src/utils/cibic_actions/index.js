// API_KEY = ""
// RequestURI = ""

/** Requests and returns GEOJSON features from Cibic backend resources
 *
 * @returns Valid GEOJSON Features to display in mapbox
 */
export const GetGeoJSONFlows = async () =>{
	return fetch("https://sudo-cibic-renderings.s3.us-west-1.amazonaws.com/latest/latest_flows.json").then(data=>{
		return data.json()
	})
}


/** Requests and returns Rendered Graph Views from the visualization server for display in webpage
 *
 * @returns An Array of URI, Timestamps
 */
export const GetRenderedGraphViews = async () =>{

	return [{uri: "https://sudo-cibic-renderings.s3.us-west-1.amazonaws.com/latest/latest_render.png", timestamp: 0}]
}



/** Requests and returns Rendered Map Views from the visualization server for display on mapbox map
 *  using this method: https://docs.mapbox.com/mapbox-gl-js/example/image-on-a-map/
 *
 * @param {Date} startDate The Start Date for the query
 * @param {Date} endDate The End Date for the query
 * @returns An Array of URI, Timestamps, and Coordinates.
 */
export const GetRenderedMapViews = async (startDate, endDate) => {
	// Formats request and headers for web request
	// Makes a web request to backend resource
	// Waits for response
	// formats response for frontend

	// [?] This can return either a promise or will hang until request returns

	return [{uri:"", timestamp:0, coords:[[-80.425, 46.437],[-71.516, 46.437],[-71.516, 37.936],[-80.425, 37.936]]}]
}
