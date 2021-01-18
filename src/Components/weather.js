import React from "react";

const Weather = props => (
        <div className="infoWeath">
        { (props.loading === false || props.city) ? 
        <div>
            <p>Location: {props.city}, {props.country}</p>
            <p>Temperature: {props.temp}</p>
            <p>Weather details: {props.main}, {props.description}</p>
            <p>Sunset: {props.sunset}</p>
         </div> : 
         <h1>Wait few seconds your information download...</h1>}
         <p className="error">{props.error}</p>
         </div>
    );

export default Weather;