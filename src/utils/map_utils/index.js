
export const cities = [
	{
		id:"la",
		lat:34.0522,
		long:-118.2437
	},
	{	
		id:"ba",
		lat:-34.6037,
		long:-58.3816
	}
]


export function findClosestCity(lat, long){
	let shortestIndex = null
	let current_shortest_distance = 50000
	for(const [index, city] of cities.entries()){
		let dist = getDistanceFromLatLonInKm(lat, long, city.lat, city.long)
		if (dist < current_shortest_distance){
			shortestIndex = index
			current_shortest_distance = dist
		}
	}
	return cities[shortestIndex]
}


function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
	var R = 6371; // Radius of the earth in km
	var dLat = deg2rad(lat2-lat1);  // deg2rad below
	var dLon = deg2rad(lon2-lon1); 
	var a = 
	  Math.sin(dLat/2) * Math.sin(dLat/2) +
	  Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
	  Math.sin(dLon/2) * Math.sin(dLon/2)
	  ; 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c; // Distance in km
	return d;
      }
      
      function deg2rad(deg) {
	return deg * (Math.PI/180)
      }