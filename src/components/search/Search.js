import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoDBBasicURL, geoDBOptions } from "../../api";
import './Search.css'

const Search = ({onSearch}) => {
    const [search, setSearch] = useState('');
    const handleSearchChange = (searchData) => {
        setSearch(searchData);
        console.log(search)
        onSearch(searchData);
    }

    const loadOptions = (inputValue) => {
        // return fetch(`${geoDBBasicURL}cities?minPopulation=1000000&namePrefix=${inputValue}&languageCode=es`, geoDBOptions)
        return fetch(`${geoDBBasicURL}cities?namePrefix=${inputValue}&languageCode=es`, geoDBOptions)
        .then(response => response.json())
        .then(response => {
            return {
                options: response.data.map(city => {
                    return {
                        label: `${city.name} - ${city.countryCode}`,
                        lat: city.latitude,
                        lon: city.longitude,
                        value: city.latitude
                    }
                })
            }
        })
        .catch(error => console.log(error))
    }
    
    return(
        <div className="search-container">
            {/* <input className="search-input" type="text" /> */}
            <AsyncPaginate 
                className="search-input"
                placeholder="Consulta el tiempo en otra ciudad"
                value={search}
                onChange={handleSearchChange}
                debounceTimeout={1000}
                loadOptions={loadOptions}
            />
            {/* <button onClick={()=>getOptionsFromGeoDB(search)}>getOptionsFromGeoDB</button> */}
        </div>
    )
}

export default Search;