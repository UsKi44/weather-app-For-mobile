import React, { useState }from 'react';
const api = {
  key : "5382325fc9f1231bd3884fd0becf9543",
  home : "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuerry] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.home}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuerry('');
          console.log(result);
        });
          
    }
  }

  const dateFinder = (d) => {
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    
    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={(typeof weather.main != "undefined") ? (weather.main.temp > 0) ? 'app ' : 'app cold ' : 'app cold'}>
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Type here"
            onChange={e => setQuerry(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name},{weather.sys.country}</div>
            <div className="date">{dateFinder(new Date())}</div>
          </div>
        
          <div className="weather-box">
            <div className="temperature">
              {Math.round(weather.main.temp)}°
            </div>
            <div className="weather">
              {weather.weather[0].main}
            </div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}


   

export default App;
