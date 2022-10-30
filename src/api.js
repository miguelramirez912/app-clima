// GeoDB API

export const options = {
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

