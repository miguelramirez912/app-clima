import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Provider";
import './Forecast.css'

const Forecast = () => {
    //eslint-disable-next-line
    const [state, setState] = useContext(AppContext);
    const {forecastResponse} = state;
    const [filteredForecast, setFilteredForecast] = useState([]);
    const days = ['Domingo','Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes','Sabado'];

    const getFiveDaysForecast = (forecastResponse) => {
        const filteredArray = forecastResponse.list.filter(forecast => /15:00:00/.test(forecast.dt_txt)).map(forecast => {
            const date = new Date(forecast.dt_txt)
            return {...forecast, dayName: days[date.getDay()], dayMonth: date.getDate()};
        })
        setFilteredForecast(filteredArray);
    }

    useEffect(() => {
        getFiveDaysForecast(forecastResponse);
        //eslint-disable-next-line
    }, [state.forecastResponse]);

    return(
        <div className="forecast-container">
            <div className="forecast-slider">
                {filteredForecast.map(card => 
                    <div className="forecast-card" key={card.dt}>
                        <div className="forecast-card--day">{card.dayName} {card.dayMonth}</div>
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
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Forecast;