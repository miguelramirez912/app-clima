import React from "react";
import loader from "../../assets/loader_2.svg";
import "./Loader.css";

const Loader = () => {
    return(
        <div className="loader-container">
            <h2>Obteniendo la ubicación...</h2>
            <img src={loader} alt="loading"/>
        </div>
    );
}

export default Loader;