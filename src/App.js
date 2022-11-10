import React, { useEffect, useState } from 'react';
import './App.css';
import CurrentWeather from './components/current-weather/CurrentWeather';
import Forecast from './components/forecast/Forecast';
import Search from './components/search/Search';
import {OpenWeatherBasicURL, OpenWeatherAPIKey} from './api'

function App() {
  const [currentWeather, setCurrentWeather] = useState({});
  const [forecast, setForecast] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  console.log("se renderiza App");
  const getPosition = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      const {latitude, longitude} = position.coords;
      getData(latitude, longitude);
    });
  }

  const onSearch = (searchData) => {
    // console.log(searchData);
    const {lat, lon, label} = searchData;
    console.log(`latitud: ${lat}`);
    console.log(`longitude: ${lon}`);
    console.log(`label: ${label}`);
    getData(lat, lon);
  }
  const getUTC = () => {
    const date = new Date();
    const mSeconds = date.getTime();
    const offset = date.getTimezoneOffset() * 60000;
    // console.log(`miliseconds ${mSeconds}, offset ${offset}`);
    const utcMilliseconds = mSeconds + (offset);
    const utcDate = new Date(utcMilliseconds);
    // console.log(`UTC: ${utcDate}`);
    return utcMilliseconds;
  }

  const getData = (lat, lon) => {
    // setIsLoading(true)
    const currentWeatherFetch = fetch(`${OpenWeatherBasicURL}/weather?lat=${lat}&lon=${lon}&appid=${OpenWeatherAPIKey}&units=metric&lang=es`);
    const forecastFetch = fetch(`${OpenWeatherBasicURL}/forecast?lat=${lat}&lon=${lon}&appid=${OpenWeatherAPIKey}&units=metric`);

    const utcMilliseconds = getUTC();
    console.log(new Date(utcMilliseconds));

    Promise.all([currentWeatherFetch, forecastFetch])
    .then(async (response) => {
      const weatherResponse =  await response[0].json();
      const forecastResponse = await response[1].json();
      setCurrentWeather({cityLabel: weatherResponse.name, utc: utcMilliseconds,...weatherResponse});
      setForecast({cityLabel: forecastResponse.city.name, utc: utcMilliseconds,...forecastResponse});
      setIsLoading(false);
    })
    
  }

  useEffect(() => {
      getPosition();
  }, []);

  return (
    <div className="App">
      <Search onSearch={onSearch}/>
      {!isLoading && <CurrentWeather weatherData={currentWeather} />}
      {!isLoading && <Forecast forecastData={forecast}/>}
      {/* {Object.keys(forecast).length && <Forecast forecastData={forecast}/>} */}
    </div>
  );
}

export default App;
