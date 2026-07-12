import clearSky from "../img/clearSky.png"
import cloudySky from "../img/cloudy.jpg"
import rainySky from "../img/raining.jpg"
import thunderstorm from "../img/raining.jpg"
import snow from "../img/snow.png"
import foggy from "../img/foggy.png"

import { useEffect, useState } from "react";

function SearchBar() {
  const [city, setCity] = useState("")
  const [cityData, setCityData] = useState(null)

  const getData = async (city) => {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_WEATHER_API}&units=metric`)

    const data = await res.json()
    console.log(data);
    setCityData({
      name: data.name,
      temp: data.main.temp,
      maxTemp: data.main.temp_max,
      minTemp: data.main.temp_min,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      weather: data.weather[0].description,
      img: data.weather[0].icon,
      condition: data.weather[0].main
    })

  }

  useEffect(() => {
    const fetchWeather = async () => {
      await getData("lucknow")
    }

    fetchWeather()
  }, [])

  const weatherImages = {
    Clear: clearSky,
    Clouds: cloudySky,
    Rain: rainySky,
    Drizzle: rainySky,
    Thunderstorm: thunderstorm,
    Snow: snow,
    Mist: foggy,
    Fog: foggy,
    Haze: foggy
  }

  return (
    <>
      {cityData && (
        <div className="mx-auto max-w-3xl min-h-screen bg-cover bg-center" style={{
          backgroundImage: `url(${weatherImages[cityData.condition]})`
        }}>
          <div className="text-center">
            <input onChange={(e) => setCity(e.target.value)} type="text" placeholder="Enter city name" />
            <button onClick={() => getData(city)}>Search</button>
          </div>
          <h1 className="text-center text-5xl font-bold">{cityData.name}</h1>
          <div className="text-center">
            <img className="mx-auto" src={`https://openweathermap.org/payload/api/media/file/${cityData.img}.png`} alt="" />
            <p>{cityData.weather}</p>
          </div>
          <h2 className="text-center text-5xl font-bold">{Math.floor(cityData.temp)}&deg;C</h2>
        </div>
      )
      }

    </>
  )
}

export default SearchBar
