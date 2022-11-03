import React from "react";
import './CurrentWeather.css'
import imgs from "../../assets/imgs";

const CurrentWeather = ({weatherData}) => {
    console.log("Datos recibidos en CurrentWeather Component: ", weatherData);
    return(
        <div className="current-weather">
            <div className="date-container">
                <p className="date-container-city">Ciudad de Mexico<span>/MX</span></p>
                <p className="date-container-time">12:00 <span className="am-pm">PM</span></p>
                <p className="date-container-date">Sabado, 29 Oct </p>
            </div>
            <div className="weather-container">
                <div className="weather-resume">
                    <div className="weather-resume-img">
                        <img src={[imgs[0]]} alt="clima" />
                    </div>
                    <label className="weather-resume-temp">28°C</label>
                </div>
                <div className="weather-details">
                    <div className="weather-detail">
                        <p>Humedad</p>
                        <p>72%</p>
                    </div>
                    <div className="weather-detail">
                        <p>Presion</p>
                        <p>72%</p>
                    </div>
                    <div className="weather-detail">
                        <p>Velocidad del Viento</p>
                        <p>72%</p>
                    </div>
                    <div className="weather-detail">
                        <p>Puesta de Sol</p>
                        <p>72%</p>
                    </div>
                    <div className="weather-detail">
                        <p>Amanecer</p>
                        <p>72%</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CurrentWeather;