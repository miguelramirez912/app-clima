import React, { useContext, useEffect, useState } from "react"
import { AppContext } from "../../Provider";
import './DateComponent.css';

const DateComponent = () => {
    //eslint-disable-next-line
    const [state, setState] = useContext(AppContext);
    //console.log("Estado compartido desde DateComponent: ", state);
    const [localTime, setLocalTime] = useState({});
    const [localDate, setLocalDate] = useState({});
    
    const getLocalDateDetails = (localDate) => {
        const localHours = localDate.getHours();
        const formatedHours = localHours < 10 ? `0${localHours}` : localHours;
        const localMinutes = localDate.getMinutes();
        const formatedMinutes = localMinutes < 10 ? `0${localMinutes}` : localMinutes;
        const localSeconds = localDate.getSeconds();
        const formatedSeconds = localSeconds < 10 ? `0${localSeconds}` : localSeconds;
        const days = ['Domingo','Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes','Sabado'];
        const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        const dayName = days[localDate.getDay()];
        const dayNumber = localDate.getDate();
        const month = months[localDate.getMonth()];

        setLocalTime({hrs: formatedHours, mins: formatedMinutes, sec: formatedSeconds});
        setLocalDate({dayName, dayNumber, month});
    }

    useEffect(() => {
       let clock = setInterval(() => {
            const localDate = state.getLocalDate(state.weatherResponse.timezone);
            getLocalDateDetails(localDate);
        }, 1000);
        return(() => {
            clearInterval(clock)
        })
    // eslint-disable-next-line    
    }, [state.localDate]);

    return(
        <div>
            {Object.keys(localTime).length && 
            <div>
                <p className="date-container-time">{`${localTime.hrs}:${localTime.mins}`}
                    <span className="date-container-seconds">{localTime.sec}</span>
                    <span className="am-pm"> hrs</span>
                </p>
                <p className="date-container-date">{`${localDate.dayName}, ${localDate.dayNumber} ${localDate.month}`}</p>
            </div>
            }
        </div>
    )
}

export default DateComponent;