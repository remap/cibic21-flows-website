import { useEffect, useState } from "react"
import { GetGeoJSONFlows } from "../cibic_actions"




export const useRides = (region_id)=>{
	const [rides, setRides] = useState([])
	
	
	useEffect(()=>{
		GetGeoJSONFlows(region_id).then((data)=>{
			let lines = [] 
			for(const ride of data){
				let lineFeature = ride.features.find(e => e.geometry.type === "LineString") 
				let newRide = {geoData: lineFeature, properties:ride.properties} 
				lineFeature['properties'] = ride.properties
				lines.push(lineFeature)
			}
			let collection = {
				'type': 'FeatureCollection',
				'features': lines
			}
			setRides(collection)
		})
	}, [])

	return rides
}