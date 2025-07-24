import React, { useEffect, useRef, useState } from 'react'
import "./weather.css"
import search_icon from "../assets/search.png"
import clear_icon from "../assets/clear.png"
import cloud_icon from "../assets/cloud.png"
import drizzle_icon from "../assets/drizzle.png"
import humidity_icon from "../assets/humidity.png"
import rain_icon from "../assets/rain.png"
import snow_icon from "../assets/snow.png"
import wind_icon from "../assets/wind.png"
import Loader from './Loader.jsx'

const Weather = () => {

    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);

    const all_icons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": drizzle_icon,
        "03n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,
        "50d": cloud_icon,
        "50n": cloud_icon
    };

    const inputRef = useRef();

    const search = async (city) => {

        try {
            setLoading(true); //start loader
            const apiKey = import.meta.env.VITE_APP_ID;
            console.log(apiKey);

            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`

            const response = await fetch(url);
            const data = await response.json();
            console.log("Weather data :", data);

            const iconCode = data.weather[0].icon;
            const iconUrl = all_icons[iconCode] || clear_icon //static way
            // const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png` //it works dynamically

            setWeatherData({
                humidity: data.main.humidity,
                wind: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: iconUrl,
            })

        } catch (error) {
            console.log("Failed to fetch weather: ", error.message)
        }
        finally {
            setLoading(false); //stop loader
        }
    }

    useEffect(() => {
        search("London");
    }, []);

    if (loading || !weatherData) {
        return (
            <div className=' p-10 text-white flex justify-center items-center h-screen'>
                <Loader />
            </div>
        )
    }

    return (
        <div className='weather p-10 text-white'>
            <div className='search-bar'>
                <input
                    ref={inputRef}
                    className='bg-white'
                    type="text"
                    placeholder='Search'
                />
                <img
                    src={search_icon}
                    alt=""
                    onClick={()=>{
                        const city = inputRef.current.value.trim();
                        if (city) search(city)
                    }}
                />
            </div>
            <img src={weatherData.icon} alt="" className='weather-icon' />
            <p className='temperature'>{weatherData.temperature}°c</p>
            <p className='location'>{weatherData.location}</p>
            <div className="weather-data">
                <div className="col">
                    <img src={humidity_icon} alt="" />
                    <div>
                        <p>{weatherData.humidity}%</p>
                        <span>Humidity</span>
                    </div>
                </div>
                <div className="col">
                    <img src={wind_icon} alt="" />
                    <div>
                        <p>{weatherData.wind} km/h</p>
                        <span>Wind Speed</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Weather