import React, { useContext, useEffect } from 'react';
import './App.css';
import CurrentWeather from './components/current-weather/CurrentWeather';
import Forecast from './components/forecast/Forecast';
import Search from './components/search/Search';
import {OpenWeatherBasicURL, OpenWeatherAPIKey, geoDBOptions} from './api'
import { AppContext } from './Provider';
import Loader from './components/loader/Loader';

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
    setState({...state, isLoading: true})
    const currentWeatherFetch = fetch(`${OpenWeatherBasicURL}/weather?lat=${lat}&lon=${lon}&appid=${OpenWeatherAPIKey}&units=metric&lang=es`);
    const forecastFetch = fetch(`${OpenWeatherBasicURL}/forecast?lat=${lat}&lon=${lon}&appid=${OpenWeatherAPIKey}&units=metric`);
    let isoLat = lat > 0 ? `%2B${lat}` : lat;
    let isoLon = lon > 0 ? `%2B${lon}` : lon;
    const cityNameFetch = fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?location=${isoLat}${isoLon}&limit=1&languageCode=es`, geoDBOptions);
    
    Promise.all([currentWeatherFetch, forecastFetch, cityNameFetch])
    .then(async (response) => {
      const weatherResponse =  await response[0].json();
      const forecastResponse = await response[1].json();
      const cityName = await response[2].json();
      setState({...state, 
        weatherResponse, 
        forecastResponse, 
        cityName: cityName.data[0] ?? {}, 
        isLoading: false});
      console.log(state);
    })
  }

  useEffect(() => {
      getPosition();
    // eslint-disable-next-line  
  }, []);

  return (
      <div className="App">
          <Search onSearch={onSearch}/>
          {state.isLoading ? <Loader/> : <CurrentWeather/>}
          {state.forecastResponse && <Forecast/>}
      </div>
  );
}

export default App;
