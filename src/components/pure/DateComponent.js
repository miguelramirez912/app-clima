import React, { useEffect, useState } from "react"

const DateComponent = ({timezone}) => {
    const [localTime, setLocalTime] = useState({hrs: 0, mins: 0, sec: 0});
    const [localDate, setLocalDate] = useState({dayName: '', dayNumber: 0, month: ''});

    const getUTCMiliseconds = () => {
        const date = new Date();
        const offset = date.getTimezoneOffset() // Devuelve minutos
        const utcMilliseconds = date.getTime() + (offset * 60000);// s -> ms
        return utcMilliseconds;
    }

    // console.log("Se renderiza reloj");
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
        const utcMilliseconds = getUTCMiliseconds();
        let localMilliseconds = utcMilliseconds + (timezone * 1000)  
        setInterval(() => {
            localMilliseconds += 1000;
            getLocalDate(localMilliseconds);
        }, 1000);
    }, [])

    return(
        <div>
            <p className="date-container-time">{`${localTime.hrs}:${localTime.mins}:${localTime.sec}`}<span className="am-pm"> hrs</span></p>
            <p className="date-container-date">{`${localDate.dayName}, ${localDate.dayNumber} ${localDate.month}`}</p>
        </div>
    )
}

export default DateComponent;