import React, { useContext, useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoDBBasicURL, geoDBOptions } from "../../api";
import { AppContext } from "../../Provider";
import './Search.css'

const Search = ({onSearch}) => {
    const [search, setSearch] = useState('');
    const [state, setState] = useContext(AppContext);
    const handleSearchChange = (searchData) => {
        setSearch(searchData);
        // console.log(search)
        onSearch(searchData);
    }
    // console.log('Hola desde search accediendo al mensaje del estado compartido: ', state);
    const loadOptions = (inputValue) => {
        return fetch(`${geoDBBasicURL}cities?namePrefix=${inputValue}&languageCode=es`, geoDBOptions)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            return {
                options: response.data.map(city => {
                    return {
                        label: `${city.name} - ${city.country}`,
                        lat: city.latitude,
                        lon: city.longitude,
                    }
                })
            }
        })
        .catch(error => console.log(error))
    }
    
    return(
        <div className="search-container">
            <AsyncPaginate 
                className="search-input"
                placeholder="Consulta el tiempo en otra ciudad"
                value={search}
                onChange={handleSearchChange}
                debounceTimeout={1000}
                loadOptions={loadOptions}
            />
        </div>
    )
}

export default Search;