// API_KEY = ""
// RequestURI = ""

/** Requests and returns GEOJSON features from Cibic backend resources
 *
 * @returns Valid GEOJSON Features to display in mapbox
 */
export const GetGeoJSONFlows = async (region) =>{
	//TODO Differentiate regions
	return fetch("https://flows.cibic.bike/data/web_viz.json").then(data=>{
		return data.json()
	})
}


/** Requests and returns Rendered Graph Views from the visualization server for display in webpage
 *
 * @returns An Array of URI, Timestamps
 */
export const GetRenderedGraphViews = async () =>{

	return [{uri: "https://flows.cibic.bike/LA-recent.jpg", timestamp: 0}]
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


export const GetPhotoList = async(region_id)=>{
	let cdn_photo_url = "https://flows.cibic.bike/photos/"

	if(region_id === "la"){
		return fetch('https://flows.cibic.bike/data/LA-gallery.json').then((data)=>{
			return data.json()
		}).then((data)=>{
			return data.map((e)=> cdn_photo_url+e)
		})
	}
	if(region_id === "ba"){
		return fetch('https://flows.cibic.bike/data/BA-gallery.json').then((data)=>{
			return data.json()
		}).then((data)=>{
			return data.map((e)=> cdn_photo_url+e)
		})
	}
}

export const GetVizPhotoList = async(region_id)=>{
 
	let renderids = ["-01.jpg", "-02.jpg", "-03.jpg", "-04.jpg", "-05.jpg", "-06.jpg", "-07.jpg", "-08.jpg"]

	let cdn_photo_url = "https://flows.cibic.bike/renderings/"

	let photolist = renderids.map((e)=>cdn_photo_url+ region_id.toUpperCase() +e)
	return photolist

}