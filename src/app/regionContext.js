import React, { useEffect, useState } from 'react';
import { cities, findClosestCity } from '../utils/map_utils';

export const RegionContext = React.createContext({});


let accepted_langs = ["en", "es", "zh"]

const RegionProvider = ({children})=>{
	const [userRegion, setUserRegion] = useState(cities[0].id)
	const [regionCoords, setRegionCoords] = useState([cities[0].lat, cities[0].long])
	const [userLang, setUserLang] = useState("en")
  const [cityZoom, setCityZoom] = useState(cities[0].zoom)

	useEffect(()=>{
		GetLang()
	}, [])

	const GetRegion = ()=>{
		navigator.geolocation.getCurrentPosition((data)=>{
			let region = findClosestCity(data.coords.latitude, data.coords.longitude)
			setRegionCoords([region.lat,region.long])
      setCityZoom(region.zoom)
			setUserRegion(region.id)
		}, (err)=>{
			console.log(err)
		})
	}

	const CheckRegionWithCoord = (newCoords)=>{
		let region = findClosestCity(newCoords[0], newCoords[1])
		setUserRegion(region.id)
	}

	const UpdateRegionWithID = (id)=>{
		let region = cities.find( e => e.id === id)
		setRegionCoords([region.lat, region.long])
		setUserRegion(region.id)
    setCityZoom(region.zoom)
	}

	const GetLang = ()=>{
		let lang_code = navigator.language
		let lang ="en"
		if(lang_code.includes('-')){
			lang_code = lang_code.split('-')[0]
		}
		lang = lang_code
		if(accepted_langs.includes(lang)){
			setUserLang(lang)
		}
	}

	const SetLang =(lang_code)=>{
		if(accepted_langs.includes(lang_code)){
			setUserLang(lang_code)
		}
	}


	const RegionData={
		lang: userLang,
		region_name: userRegion,
		region_coords: regionCoords,
    city_zoom: cityZoom,
		GetRegion: GetRegion,
		CheckRegionWithCoord: CheckRegionWithCoord,
		UpdateRegionWithID: UpdateRegionWithID,
		SetLang:SetLang
	}

	return (
		<RegionContext.Provider value={RegionData}>
			{children}
		</RegionContext.Provider>
	)

}




export default RegionProvider
