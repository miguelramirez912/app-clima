import React, { useContext, useEffect } from 'react';
import './App.css';
import CurrentWeather from './components/current-weather/CurrentWeather';
import Forecast from './components/forecast/Forecast';
import Search from './components/search/Search';
import {OpenWeatherBasicURL, OpenWeatherAPIKey, geoDBOptions} from './api'
import { AppContext } from './Provider';

function App() {
  const [state, setState] = useContext(AppContext);
  const getPosition = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const {latitude, longitude} = position.coords;
      getData(latitude, longitude);
    });
  }

  const onSearch = (searchData) => {
    // console.log(searchData);
    const {lat, lon} = searchData;
    getData(lat, lon);
  }

  const getData = (lat, lon) => {
    const currentWeatherFetch = fetch(`${OpenWeatherBasicURL}/weather?lat=${lat}&lon=${lon}&appid=${OpenWeatherAPIKey}&units=metric&lang=es`);
    const forecastFetch = fetch(`${OpenWeatherBasicURL}/forecast?lat=${lat}&lon=${lon}&appid=${OpenWeatherAPIKey}&units=metric`);
    let isoLat = lat > 0 ? `%2B${lat}` : lat;
    let isoLon = lon > 0 ? `%2B${lon}` : lon;
    const cityNameFetch = fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?location=${isoLat}${isoLon}&limit=1&languageCode=es`, geoDBOptions);
    const getLocalDate = timezone => {
      let date = new Date();
      const mSeconds = date.getTime();
      const offset = date.getTimezoneOffset() * 60000;
      const utcMilliseconds = mSeconds + (offset);
      const utcDate = new Date(utcMilliseconds);
      const utcDateMs = utcDate.getTime();
      const localDateMs = utcDateMs + (timezone * 1000);
      const localDate = new Date(localDateMs);
      return localDate;
    }

    Promise.all([currentWeatherFetch, forecastFetch, cityNameFetch])
    .then(async (response) => {
      const weatherResponse =  await response[0].json();
      const forecastResponse = await response[1].json();
      const cityName = await response[2].json();
      const localDate = getLocalDate(weatherResponse.timezone);
      setState({...state, 
        weatherResponse, 
        forecastResponse, 
        localDate,
        cityName: cityName.data[0] ?? {}, 
        isLoading: false});
      console.log(state);
    })
  }

  useEffect(() => {
      getPosition();
      //eslint-disable-next-line
  }, []);


  return (
      <div className="App">
        <Search onSearch={onSearch}/>
        {state.weatherResponse && < CurrentWeather />}
        {state.forecastResponse && <Forecast/>}
      </div>
  );
}

export default App;
