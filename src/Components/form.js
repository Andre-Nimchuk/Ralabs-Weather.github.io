import React from "react";

const Form = props => (
    <form onSubmit={props.weatherMethod}>
        <input type="text" name="city" value={props.value} onChange={props.onChange} placeholder="City"/>
        <button>Get weather information</button>
    </form>
);

export default Form;