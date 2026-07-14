import clearSky from "../img/clearSky.png"
import cloudySky from "../img/cloudy.jpg"
import rainySky from "../img/raining.jpg"
import thunderstorm from "../img/raining.jpg"
import snow from "../img/snow.png"
import foggy from "../img/foggy.png"
import search from "../img/icons8-search-48.png"

import { useEffect, useState } from "react";

function SearchBar() {
  const [city, setCity] = useState("")
  const [cityData, setCityData] = useState(null)
  const [forecast, setForecast] = useState([])

  const getWindDirection = (deg) => {

    if (deg >= 337.5 || deg < 22.5) return "North";
    if (deg >= 22.5 && deg < 67.5) return "North East";
    if (deg >= 67.5 && deg < 112.5) return "East";
    if (deg >= 112.5 && deg < 157.5) return "South East";
    if (deg >= 157.5 && deg < 202.5) return "South";
    if (deg >= 202.5 && deg < 247.5) return "South West";
    if (deg >= 247.5 && deg < 292.5) return "West";
    if (deg >= 292.5 && deg < 337.5) return "North West";

  }

  const getData = async (city) => {
    try {
      const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_WEATHER_API}&units=metric`)
      const weatherData = await weatherRes.json()

      if (weatherData.cod !== 200) {
        alert("City not found")
        return;
      }

      const forecastRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${import.meta.env.VITE_WEATHER_API}&units=metric`)
      const forecastData = await forecastRes.json()

      setForecast(forecastData.list.filter((item) =>
        item.dt_txt.includes("12:00:00")))


      console.log(weatherData);


      const sunrise = new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      const sunset = new Date(weatherData.sys.sunset * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      const windSpeed = Math.floor(weatherData.wind.speed * 3.6);

      setCityData({
        name: weatherData.name,
        temp: weatherData.main.temp,
        feelsLike: weatherData.main.feels_like,
        pressure: weatherData.main.pressure,
        maxTemp: weatherData.main.temp_max,
        minTemp: weatherData.main.temp_min,
        humidity: weatherData.main.humidity,
        windSpeed: windSpeed,
        windDirection: getWindDirection(weatherData.wind.deg),
        windDeg: weatherData.wind.deg,
        sunrise: sunrise,
        sunset: sunset,
        weather: weatherData.weather[0].description,
        img: weatherData.weather[0].icon,
        condition: weatherData.weather[0].main
      })
    }
    catch (error) {
      console.log(error)
      alert("Something went wrong")
    }

  }
  console.log(forecast);


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
        <div className="mx-auto w-full max-w-3xl min-h-screen bg-cover bg-center pt-4" style={{
          backgroundImage: `url(${weatherImages[cityData.condition]})`
        }}>
          <div className="text-center flex justify-center gap-2 pt-2">
            <input onChange={(e) => setCity(e.target.value)} type="text" placeholder="Enter city name" className="border border-white rounded-xl px-4" />
            <img className="w-8 cursor-pointer" src={search} onClick={() => getData(city)} />
          </div>
          <h1 className="text-center text-5xl font-bold mt-4">{cityData.name}</h1>
          <div className="text-center">
            <img className="mx-auto" src={`https://openweathermap.org/payload/api/media/file/${cityData.img}.png`} alt="" />
            <p>{cityData.weather}</p>
          </div>
          <h2 className="text-center text-5xl font-bold">{Math.floor(cityData.temp)}&deg;C</h2>
          <div className="grid grid-cols-1  mx-auto md:grid-cols-2 md:w-full mt-4 gap-2 p-2">
            <div className="p-2 bg-gray-200/25 shadow-lg text-white font-bold backdrop-blur-md rounded-3xl">
              <p>5 day forecast</p>
              <div>

                {forecast.map((day) => (
                  <div className="flex justify-between" key={day.dt_txt}>
                    <div className="flex gap-4">
                      <img src={`https://openweathermap.org/payload/api/media/file/${day.weather[0].icon}.png`} alt="" className="w-8" />
                      <p>
                        {
                          new Date(day.dt_txt).toDateString() === new Date().toDateString()
                            ? "Today"
                            : new Date(day.dt_txt).toLocaleDateString("en-US", {
                              weekday: "short"
                            })
                        }
                      </p>
                      <p >{(day.weather[0].description)[0].toUpperCase() + (day.weather[0].description.slice(1).toLowerCase())}</p>
                    </div>
                    <p>
                      {Math.floor(day.main.temp_min)}°/
                      {Math.floor(day.main.temp_max)}°
                    </p>
                  </div>
                ))
                }

              </div>


            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 font-bold ">
              <div className="grid grid-rows-2 gap-2">
                <div className="flex justify-between bg-gray-200/25 shadow-lg backdrop-blur text-white p-2 rounded-3xl">
                  <div>
                    <p>{cityData.windDirection}</p>
                    <p>{cityData.windSpeed} km/h</p>
                  </div>
                  <div className="border relative w-24 h-24 rounded-full">

                    <p className="absolute top-0 left-1/2 -translate-x-1/2">
                      N
                    </p>
                    <p className="absolute right-2 top-1/2 -translate-y-1/2">
                      E
                    </p>
                    <p className="absolute bottom-0 left-1/2 -translate-x-1/2">
                      S
                    </p>
                    <p className="absolute left-2 top-1/2 -translate-y-1/2">
                      W
                    </p>
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{
                        transform: `rotate(${cityData.windDeg}deg)`
                      }}
                    >
                      <span className="text-3xl">↑</span>
                    </div>
                  </div>

                </div>



                <div className="bg-gray-200/25 shadow-lg backdrop-blur text-white p-2 rounded-3xl">
                  <p>Sunrise {cityData.sunrise}</p>
                  <p>Sunset {cityData.sunset}</p>
                </div>
              </div>
              <div className="bg-gray-200/25 shadow-lg backdrop-blur text-white p-2 rounded-3xl">
                <div className="flex justify-between mb-2">
                  <p>Humidity</p>
                  <p>{cityData.humidity}%</p>
                </div>
                <div className="flex justify-between mb-2">
                  <p>Feels like </p>
                  <p>{Math.floor(cityData.feelsLike)}°</p>
                </div>
                <div className="flex justify-between mb-2">
                  <p>Pressure </p>
                  <p>{cityData.pressure}mbar</p>
                </div>
                <div className="flex justify-between">
                  <p>Chance of rain </p>
                  <p>{Math.floor(forecast[0].pop * 100)}%</p>
                </div>

              </div>

            </div>
          </div>
        </div>
      )
      }

    </>
  )
}

export default SearchBar
