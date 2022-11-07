import React, { useEffect } from "react";
import DateComponent from "../pure/DateComponent";
import './CurrentWeather.css'

const CurrentWeather = ({weatherData}) => {
    console.log("Datos recibidos en CurrentWeather Component: ", weatherData);
    console.log("Se renderiza CurrentWeather Container");
    const getTimeFromMs = (seconds) => {
        const date = new Date((seconds) * 1000);
        const hours = date.getHours();
        const formatedHours = hours < 10 ? `0${hours}` : hours 
        const minutes = date.getMinutes();
        const formatedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        return `${formatedHours}:${formatedMinutes} hrs`;
    }

    useEffect(() => {
        console.log("Se renderiza CurrentWeather Container");
    }, []);
    return(
        <div className="current-weather">
            <div className="date-container">
                <p className="date-container-city">{weatherData.cityLabel}<span>/{weatherData.sys.country}</span></p>
                <DateComponent timezone={weatherData.timezone}/>
            </div>
            <div className="weather-container">
                <div className="weather-resume">
                    <div className="weather-resume-img">
                        <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="clima"/>
                    </div>
                    <label className="weather-resume-temp">{Math.round(weatherData.main.temp)}°C</label>
                </div>
                <div className="weather-details">
                    <div className="weather-detail">
                        <p>Humedad</p>
                        <p>{weatherData.main.humidity} %</p>
                    </div>
                    <div className="weather-detail">
                        <p>Presion</p>
                        <p>{`${weatherData.main.pressure} hPa`}</p>
                    </div>
                    <div className="weather-detail">
                        <p>Velocidad del Viento</p>
                        <p>{`${weatherData.wind.speed} m/s`}</p>
                    </div>
                    <div className="weather-detail">
                        <p>Amanecer</p>
                        <p>{getTimeFromMs(weatherData.sys.sunrise)}</p>
                    </div>
                    <div className="weather-detail">
                        <p>Puesta de Sol</p>
                        <p>{getTimeFromMs(weatherData.sys.sunset)}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CurrentWeather;