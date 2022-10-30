import React from 'react';
import './App.css';
import CurrentWeather from './components/current-weather/CurrentWeather';
import Forecast from './components/forecast/Forecast';
import Search from './components/search/Search';

function App() {
  return (
    <div className="App">
      <Search />
      <CurrentWeather />
      <Forecast />
    </div>
  );
}

export default App;
