import React from "react";
import Info from "./Components/info";
import Form from "./Components/form";
import Weather from "./Components/weather";

const API_KEY = "478ffc1c2cec1838455fe919452884e1";

class App extends React.Component {

  state = {
    temp: undefined,
    city: undefined,
    country: undefined,
    description: undefined,
    main: undefined,
    sunset: undefined,
    error: undefined
  }

  gettingWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    

    if (city) {
        const api_url = await 
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await api_url.json();
        console.log(data);

        let sunset = data.sys.sunset;
        let date = new Date();
        date.setTime(sunset);
        let sunset_date = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

      this.setState({
        temp: data.main.temp,
        city: data.name,
        country: data.sys.country,
        description: data.weather[0].description,
        main: data.weather[0].main,
        sunset: sunset_date,
        error: undefined
      });
    } else {
        this.setState({
          temp: undefined,
          city: undefined,
          country: undefined,
          description: undefined,
          main: undefined,
          sunset: undefined,
          error: "Enter the city name"
        });
      }
   }

  render() {
    return (
      <div className="wrapper">
        <div className="main">
          <div className="container">
            <div className="row">
             <div className="col-sm-5 info">
              <Info />
             </div>
              <div className="col-sm-7 form">
                <Form weatherMethod={this.gettingWeather} />
                  <Weather 
                    temp={this.state.temp}
                    city={this.state.city}
                    country={this.state.country}
                    description={this.state.description}
                    main={this.state.main}
                    sunset={this.state.sunset}
                    error={this.state.error}
                  />
              </div>
            </div>
            </div>
          </div>
      </div>
    );
  }
}

export default App;
