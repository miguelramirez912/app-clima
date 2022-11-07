import React, { useEffect, useState } from 'react';
import './App.css';
import CurrentWeather from './components/current-weather/CurrentWeather';
import Forecast from './components/forecast/Forecast';
import Search from './components/search/Search';
import {getCurrentWeather, getForecast, OpenWeatherBasicURL, OpenWeatherAPIKey} from './api'

function App() {
  const [currentWeather, setCurrentWeather] = useState({});
  const [forecast, setForecast] = useState([]);

  const getPosition = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      const {latitude, longitude} = position.coords;
      getData(latitude, longitude);
    });
  }

  const getData = (lat, lon) => {
    const currentWeatherFetch = fetch(`${OpenWeatherBasicURL}/weather?lat=${lat}&lon=${lon}&appid=${OpenWeatherAPIKey}&units=metric`);
    const forecastFetch = fetch(`${OpenWeatherBasicURL}/forecast?lat=${lat}&lon=${lon}&appid=${OpenWeatherAPIKey}&units=metric`);

    Promise.all([currentWeatherFetch, forecastFetch])
    .then(async (response) => {
      const weatherResponse =  await response[0].json();
      const forecastResponse = await response[1].json();
      setCurrentWeather({cityLabel: weatherResponse.name,...weatherResponse});
      setForecast({cityLabel: forecastResponse.city.name,...forecastResponse});
    })
  }

  useEffect(() => {
      getPosition();
      // timer();
  }, []);

  // const timer = () => setInterval(() => {
  //   console.log("Listo para consultar el clima de nuevo");
  //   console.log("---------")
  // }, 2000);

  return (
    <div className="App">
      <Search />
      {Object.keys(currentWeather).length && <CurrentWeather weatherData={currentWeather} />}
      {/* {forecast.length < 0 && <Forecast forecastData={forecast}/>} */}
      <Forecast forecastData={forecast}/>
      
    </div>
  );
}

export default App;
