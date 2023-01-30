import { createContext, useState } from "react"

const Provider = ({children}) => {

    const [state, setState] = useState({
        cityName: {}, 
        isLoading: true,
        getLocalDate(timezone)  {
            let date = new Date();
            const mSeconds = date.getTime();
            const offset = date.getTimezoneOffset() * 60000;
            const utcMilliseconds = mSeconds + (offset);
            const utcDate = new Date(utcMilliseconds);
            const utcDateMs = utcDate.getTime();
            const localDateMs = utcDateMs + (timezone * 1000);
            const localDate = new Date(localDateMs);
            return localDate;
        }
    });

    return (
        <AppContext.Provider value={[state, setState]}>
            {children}
        </AppContext.Provider>
    )
}

export default Provider;

export const AppContext = createContext();