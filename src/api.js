// GeoDB API
export const geoDBOptions = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'f8534f9f60msh6d91453af48bcd7p1ad0f3jsn7090a77951dd',
		'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
	}
};

export const geoDBBasicURL = 'https://wft-geo-db.p.rapidapi.com/v1/geo/';

// export const getCities = (prefix) => {
//     fetch(geoDBBasicURL+`cities?minPopulation=1000000&namePrefix=${prefix}&languageCode=spanish`, options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));
// }

// OpenWeather API
export const OpenWeatherAPIKey = "4f2994419d9e0cad749b40a3e1b2814e";
export const OpenWeatherBasicURL = "https://api.openweathermap.org/data/2.5"

// export const getCurrentWeather = (lat, lon) => {
// 	fetch(`${OpenWeatherBasicURL}/weather?lat=${lat}&lon=${lon}&appid=${OpenWeatherAPIKey}&units=metric`)
// 	// .then(response => response.json())
// 	// .then(response => console.log(response))
// 	// .catch(error => console.log(error))
// }

// export const getForecast = (lat, lon) => {
// 	fetch(`${OpenWeatherBasicURL}/forecast?lat=${lat}&lon=${lon}&appid=${OpenWeatherAPIKey}&units=metric`)
// 	// .then(response => response.json())
// 	// .then(response => console.log(response))
// 	// .catch(error => console.log(error))
// }
