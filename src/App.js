import './App.css';
import { useEffect, useState } from "react";

function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("London");
  const [inputCity, setInputCity] = useState("");

  useEffect(() => {
    if (city) {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=MY_API_KEY`)
        .then(response => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then(data => {
          if (data.cod !== 200) {
            throw new Error(data.message);
          }
          setWeather(data);
          setError(null); // Clear any previous errors
        })
        .catch(error => setError("Error fetching data: " + error.message));
    }
  }, [city]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCity(inputCity);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={inputCity} 
          onChange={(e) => setInputCity(e.target.value)} 
          placeholder="Enter city name" 
        />
        <button type="submit">Get Weather</button>
      </form>
      {error ? (
        <h1>{error}</h1>
      ) : !weather ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <h1>Weather in {weather.name}</h1>
          <p>Temperature: {Math.round(weather.main.temp - 273.15)}°C</p>
          <p>Weather: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </>
      )}
    </div>
  );
}

export default App;
