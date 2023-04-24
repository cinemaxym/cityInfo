// The following program takes a city as input, and returns population, elevation and current temperature 

//fetch options for getId
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'ed31e7e0cfmsh4f11bdc1073d864p1bde6djsnba2f1b17f652',
		'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
	}
}

//fetch options for cityDetailes
const optionsWeather = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'ed31e7e0cfmsh4f11bdc1073d864p1bde6djsnba2f1b17f652',
		'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
	}
};

//API URLs 
const urlCities = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities?countryIds=ZA&types=CITY'; 
const urlCityDetails = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities/';
const urlWeather = 'https://weatherbit-v1-mashape.p.rapidapi.com/current?';

//Asks the user to input a city 
//Only 5 results for request beacause ot the limit of API
// 5 cities: Aberdeen, Adelaide, Aggeneys, Albertinia, Western Cape, Alberton
let city = prompt("What city in South Africa are you interested in ?")
// let city = 'Adelaide'

//the following part of code finds a city id using API
//calls another function with a city id as a parametr
  
async function getId(city) {
	try {
		const result = await fetch(urlCities, options);
		const res = await result.json();
		console.log(res.data);
		let cities = [];
		res.data.forEach((element) => {
			cities.push(element.city)
			if (element.city.indexOf(city) != -1) {
				setTimeout(cityDetails, 2000, element.id) //calls cityDetails function with element.id parametr  uses setTimeout() method because of API rate limit - one request per second
			}
		});
		if (cities.indexOf(city) == -1) {    //validation
		console.log(`${city} is not found`);
		}
	}
	catch (error) {
		console.log('Error')
	}
}

//the following part of code finds additional information of the city using API
//calls weatherInfo function with longitude, latitude, name, population, elevation parametrs   
async function cityDetails(id) {
	try {
		const result = await fetch(urlCityDetails+id, options);
		const res = await result.json();
		weatherInfo(res.data.longitude, res.data.latitude, res.data.city, res.data.population, res.data.elevationMeters); //calls weatherInfo function 
	}
	catch (error) {
		console.log('Error')
	}
}

//the following part of code finds information about a current weather in the particular city  
//logs name, population, elevation and current temperature of the city 
//Hard limit: Only 25 API Requests per day 

async function weatherInfo(lon,lat,city,population,elevation) {
	try {
		const result = await fetch(urlWeather+"lon="+lon+"&lat="+lat, optionsWeather);
		const res = await result.json();
		console.log(`City: ${city} \nPopulation: ${population} \nElevation: ${elevation} Metres \nCurrent temperature: ${res.data[0].app_temp} C`);
	}
	catch (error) {
		console.log('Error')
	}
}

getId(city) //calls getId function 
