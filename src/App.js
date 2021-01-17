import React from "react";
import Info from "./Components/info";
import Form from "./Components/form";
import Weather from "./Components/weather";

const API_KEY = "478ffc1c2cec1838455fe919452884e1";

class App extends React.Component {

  gettingWeather = async () => {
    const api_url = await 
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=Kiev&appid=${API_KEY}&units=metric`);
    const data = await api_url.json();
    console.log(data);
  }

  render() {
    return (
      <div>
        <Info />
        <Form />
        <Weather />
      </div>
    );
  }
}

export default App;
