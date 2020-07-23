import React, { useState,useEffect } from 'react';


const api = {
  key: "9da26821f8d00fc380492d21044a80e4",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      console.log('position: ', position);
      const { latitude, longitude } = position.coords;
      getWeather(latitude,longitude)
    });
  }, [] )


  const getWeather = (lat,long) => {
    const param = lat ? `lat=${lat}&lon=${long}` : `q=${query}`
    fetch(`${api.base}weather?${param}&units=metric&APPID=${api.key}`)
    .then(res => res.json())
    .then(result => {
      setWeather(result);
      console.log(result)
      setQuery('');
    });
  }

  
  const search = evt => {
    if (evt.key === "Enter") {
      getWeather()
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }
  return (
    <div className="app">
      <main>
        <div className="search-box">
          <input type="text" className="search-bar" placeholder="Search"
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search} />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name},{weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp text-danger ">{Math.round(weather.main.temp)}oC</div>
              <div className="weather">{weather.weather[0].description}</div>
            </div>
          </div>
        ) : ('')}
      </main>


    </div>
  );
}

export default App;