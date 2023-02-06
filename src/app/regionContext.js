import React, { useState } from 'react';
import { cities, findClosestCity } from '../utils/map_utils';

export const RegionContext = React.createContext({});


const RegionProvider = ({children})=>{
	const [userRegion, setUserRegion] = useState(cities[0].id)
	const [regionCoords, setRegionCoords] = useState([cities[0].lat, cities[0].long])
	const [userLang, setUserLang] = useState("en")


	const GetRegion = ()=>{
		navigator.geolocation.getCurrentPosition((data)=>{
			console.log('got coords')
			let region = findClosestCity(data.coords.latitude, data.coords.longitude)
			setRegionCoords([region.lat,region.long])
			setUserRegion(region.id)
			console.log("region: ", region)
		}, (err)=>{
			console.log(err)
		})
	}

	const CheckRegionWithCoord = (newCoords)=>{
		let region = findClosestCity(newCoords[0], newCoords[1])
		console.log(region)
		setUserRegion(region.id)
	}

	const UpdateRegionWithID = (id)=>{
		let region = cities.find( e => e.id === id)
		setRegionCoords([region.lat, region.long])
		console.log("Updated region: ", region.id)
		setUserRegion(region.id)
	}

	const GetLang = ()=>{
		let accepted_langs = ["en", "es", "zh"]
		let lang_code = navigator.language
		let lang ="en"
		if(lang_code.includes('-')){
			lang_code = lang_code.split('-')[0]
		}
		lang = lang_code
		setUserLang(lang)
	}


	const RegionData={
		lang: userLang,
		region_name: userRegion,
		region_coords: regionCoords,
		GetRegion: GetRegion,
		CheckRegionWithCoord: CheckRegionWithCoord,
		UpdateRegionWithID: UpdateRegionWithID
	}

	return (
		<RegionContext.Provider value={RegionData}>
			{children}
		</RegionContext.Provider>
	)

}




export default RegionProvider