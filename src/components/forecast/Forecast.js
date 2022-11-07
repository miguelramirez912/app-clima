import React, { useEffect, useState } from "react";
import './Forecast.css'

const Forecast = ({forecastData}) => {
    console.log("se renderiza forecast component");
    console.log("Datos recibidos en Forecast Component: ", forecastData);
    const [forecast, setForecast] = useState([]);

    const days = ['Domingo','Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes','Sabado'];

    const getFiveDaysForecast = (forecastData) => {
        console.log(forecastData.list);
        const filteredForecast = forecastData.list.filter(forecast => /15:00:00/.test(forecast.dt_txt)).map(forecast => {
            const date = new Date(forecast.dt * 1000);
            return {...forecast, dayName: days[date.getDay()]};
        })
        console.log(filteredForecast);
        setForecast(filteredForecast);
    }

    useEffect(() => {
        getFiveDaysForecast(forecastData);
    }, []);

    return(
        <div className="forecast-container">
            {forecast.map(card => 
                <div className="forecast-card" key={card.dt}>
                    <div className="forecast-card--day">{card.dayName}</div>
                    <div className="forecast-card--details">
                        <div className="forecast-card--details-icon">
                            <img src={`http://openweathermap.org/img/wn/${card.weather[0].icon}@2x.png`} alt="weather-icon"/>
                            <p>{Math.round(card.main.temp)}°C</p>
                        </div>
                        <div className="forecast-card--details-info">
                            <div className="weather-detail">
                                <p>Humedad</p>
                                <p>{card.main.humidity} %</p>
                            </div>
                            <div className="weather-detail">
                                <p>P. de lluvia</p>
                                <p>{card.pop * 100}%</p>
                            </div>
                            {/* <p>Presión {card.main.pressure} hPa</p> */}
                            {/* <p>Prob. de lluvia {card.pop * 100}%</p> */}
                        </div>
                    </div>
                </div>
            )}

            {/* <ForecastCard />
            <ForecastCard />
            <ForecastCard />
            <ForecastCard />
            <ForecastCard /> */}
            
        </div>
    )
}

export default Forecast;