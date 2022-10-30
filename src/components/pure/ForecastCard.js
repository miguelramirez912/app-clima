import React from "react";
import './ForecastCard.css'
import WeatherIcons from '../../assets/imgs.js'

const ForecastCard = () => {
    return (
        <div className="forecast-card">
            <div className="forecast-card--day">Domingo</div>
            <div className="forecast-card--details">
                <div className="forecast-card--details-icon">
                    <img src={WeatherIcons[0]} alt="weather-icon"/>
                    <p>28°C</p>
                </div>
                <div className="forecast-card--details-info">
                    <p>Noche - 24.98°C</p>
                    <p>Noche - 24.98°C</p>
                </div>
            </div>
        </div>
    )
}

export default ForecastCard;