import React from "react";
import ForecastCard from "../pure/ForecastCard";
import './Forecast.css'

const Forecast = ({forecastData}) => {
    console.log("Datos recibidos en Forecast Component: ", forecastData);
    return(
        <div className="forecast-container">
            <ForecastCard />
            <ForecastCard />
            <ForecastCard />
            <ForecastCard />
            <ForecastCard />
            
        </div>
    )
}

export default Forecast;