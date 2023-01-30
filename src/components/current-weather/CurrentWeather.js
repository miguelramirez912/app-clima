import React, { useContext } from "react";
import { AppContext } from "../../Provider";
import DateComponent from "../date-component/DateComponent";
import './CurrentWeather.css'

const CurrentWeather = () => {
    // eslint-disable-next-line
    const [state, setState] = useContext(AppContext);
    const {cityName, forecastResponse, weatherResponse} = state;

    const getTimeFromMs = (seconds, timezone) => {
        const date = new Date((seconds) * 1000);
        const offset = date.getTimezoneOffset() * 60000;
        const utcSunMs = date.getTime() + offset;
        const utcSunTime = new Date(utcSunMs)
        const localSunTimeMs = utcSunTime.getTime() + (timezone * 1000);
        const localSunTime = new Date(localSunTimeMs);
        const hours = localSunTime.getHours();
        const formatedHours = hours < 10 ? `0${hours}` : hours 
        const minutes = localSunTime.getMinutes();
        const formatedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        return `${formatedHours}:${formatedMinutes} hrs`;
    }
    
    return(
        <div className="current-weather">
            <div className="date-container">
                <p className="date-container-city">{cityName.city}</p>
                <span className="date-container-country">{cityName.country}</span>
                <DateComponent />
            </div>
            <div className="weather-container">
                <div className="weather-resume">
                    <div className="weather-resume-img">
                        <img src={`http://openweathermap.org/img/wn/${weatherResponse.weather[0].icon}@2x.png`} alt="clima"/>
                    </div>
                    <label className="weather-resume-temp">{Math.round(weatherResponse.main.temp)}°C</label>
                </div>
                <div className="weather-details">
                    <div className="weather-detail">
                        <p>Humedad</p>
                        <p>{weatherResponse.main.humidity} %</p>
                    </div>
                    <div className="weather-detail">
                        <p>Presion</p>
                        <p>{`${weatherResponse.main.pressure} hPa`}</p>
                    </div>
                    <div className="weather-detail">
                        <p>Vel. del Viento</p>
                        <p>{`${weatherResponse.wind.speed} m/s`}</p>
                    </div>
                    <div className="weather-detail">
                        <p>Amanecer</p>
                        <p>{getTimeFromMs(weatherResponse.sys.sunrise, forecastResponse.city.timezone)}</p>
                    </div>
                    <div className="weather-detail">
                        <p>Puesta de Sol</p>
                        <p>{getTimeFromMs(weatherResponse.sys.sunset, forecastResponse.city.timezone)}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CurrentWeather;