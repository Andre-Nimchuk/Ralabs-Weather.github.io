import React from "react";
import Info from "./Components/info";
import Form from "./Components/form";
import Weather from "./Components/weather";

const API_KEY = "478ffc1c2cec1838455fe919452884e1";

class App extends React.Component {
constructor(props) {
  super(props);
    this.state = {
      temp: undefined,
      city: undefined,
      country: undefined,
      description: undefined,
      main: undefined,
      sunset: undefined,
      loading: true,
      inputValue: '',
      error: undefined
    };
  }

    onChange = (e) => {
      this.setState({
          inputValue: e.target.value
      })
    }

    async gettingWeatherImmediately(lat, lon) {

      const geo_url = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
      const dataGeo = await geo_url.json();
      console.log(dataGeo, 'GEO')
      let sunset = dataGeo.sys.sunset;
      let date = new Date(sunset * 1000);
      let sunset_date = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
      // console.log(date1, 'date1')
      // current date
      /* let currentDate = new Date();
      currentDate = currentDate.getUTCDate() + '.' + (currentDate.getUTCMonth() + 1) + '.' + currentDate.getUTCFullYear(); */
      // console.log(currentDate) 
      let celcius = dataGeo.main.temp - 273

      this.setState({
          temp: Math.round(celcius),
          city: dataGeo.name,
          inputValue: dataGeo.name,
          country: dataGeo.sys.country,
          description: dataGeo.weather[0].description,
          main: dataGeo.weather[0].main,
          sunset: sunset_date,
          // date: currentDate,
          loadin: false,
          error: undefined
      })
  }

    componentDidMount() {
      if (navigator.geolocation) {
          this.getPosition()
              .then((position) => {
                  this.gettingWeatherImmediately(position.coords.latitude, position.coords.longitude);
              })
          navigator.geolocation.getCurrentPosition(async function (position) {
              // const lat = position.coords.latitude;
              // const lon = position.coords.longitude;
              //     let city = 'lviv';
              console.log("Latitude is: ", position.coords.latitude)
              console.log("Longitude is: ", position.coords.longitude)
              //     const geo_url = await fetch(https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric)
              //     const dataGeo = await geo_url.json();
              //     console.log(geo_url, 'GEO')
          });
      }
  }

    getPosition = (options) => {
      return new Promise(function (resolve, reject) {
          navigator.geolocation.getCurrentPosition(resolve, reject, options);
      });
  };

  gettingWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    

    if (city) {
        const api_url = await 
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await api_url.json();
        /* console.log(data); */
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
                <Form weatherMethod={this.gettingWeather} onChange={this.onChange} value={this.state.inputValue}/>
                  <Weather 
                    temp={this.state.temp}
                    city={this.state.city}
                    loading={this.state.loading}
                    country={this.state.country}
                    description={this.state.description}
                    main={this.state.main}
                    sunset={this.state.sunset}
                    loading={this.state.loading}
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
