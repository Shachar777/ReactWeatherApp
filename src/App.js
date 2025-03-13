import logo from './logo.svg';
import './App.css';


import { useEffect } from "react";

function App() {
  useEffect(() => {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=London&appid=5dac36117a64d2af1421292a8e499d90")
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  return <h1>Check the console for weather data!</h1>;
}


export default App;
