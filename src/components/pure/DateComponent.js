import React, { useEffect, useState } from "react"

const DateComponent = ({timezone, utc}) => {
    // console.log('Se rederiza DateComponent');
    const [localTime, setLocalTime] = useState({hrs: 0, mins: 0, sec: 0});
    const [localDate, setLocalDate] = useState({dayName: '', dayNumber: 0, month: ''});
    const [timeZone, setTimeZone] = useState(0);

    
    // console.log(`Estado timezone en DateComponent: ${timeZone}`);
    const getLocalDate = (miliseconds) => {
        const localDate = new Date(miliseconds);
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
        if(timezone){
            setTimeZone(timezone);
        }
        let intervalID = setInterval(() => {
            let date = new Date();
            const mSeconds = date.getTime();
            const offset = date.getTimezoneOffset() * 60000;
            const utcMilliseconds = mSeconds + (offset);
            const utcDate = new Date(utcMilliseconds);
            // console.log(`UTCDate: ${utcDate}`);
            const utcDateMs = utcDate.getTime();
            // console.log(`milisegundos ${utcDateMs} + timezone ${timezone * 1000} = ${utcDateMs + (timezone*1000)}`);
            const localDateMs = utcDateMs + (timezone * 1000);
            const localDate = new Date(localDateMs);
            // console.log(`LocalTime: ${localDate}`);
            getLocalDate(localDate.getTime());
        }, 1000);
        // console.log(`Estado timezone de DateComponent: ${timeZone}`);
        return(() => {
            clearInterval(intervalID)
        })
    }, [timezone]);
    return(
        <div>
            <p className="date-container-time">{`${localTime.hrs}:${localTime.mins}:${localTime.sec}`}<span className="am-pm"> hrs</span></p>
            <p className="date-container-date">{`${localDate.dayName}, ${localDate.dayNumber} ${localDate.month}`}</p>
        </div>
    )
}

export default DateComponent;