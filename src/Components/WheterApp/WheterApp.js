import React, { useState } from 'react'
import './WheterApp.css';

import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';
import humidity_icon from '../Assets/humidity.png';

export const WheterApp = () => {
    const api_key = "55d8fec50b0f8cb888a9eaacae623a48";
    const [wicon, setWicon] = useState(cloud_icon);

    const search = async () => {
        const element = document.getElementsByClassName("city_input");
        if (element[0].value === "") {
            return 0;
        }
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

        let response = await fetch(url);
        let data = await response.json();
        const humidity = document.getElementsByClassName("humidity-percent")[0];
        const wind = document.getElementsByClassName("wind-rate")[0];
        const temperature = document.getElementsByClassName("weather-temp")[0];
        const location = document.getElementsByClassName("weather-location")[0];

        humidity.innerHTML = data.main.humidity + " %";
        wind.innerHTML = data.wind.speed + " km/h";
        temperature.innerHTML = data.main.temp + " °C";
        location.innerHTML = data.name;

        if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
            setWicon(clear_icon);
        } else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
            setWicon(cloud_icon);
        } else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n") {
            setWicon(drizzle_icon);
        } else if (data.weather[0].icon === "04d" || data.weather[0].icon === "04n") {
            setWicon(drizzle_icon);
        }else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n") {
            setWicon(rain_icon);
        }else if (data.weather[0].icon === "10d" || data.weather[0].icon === "10n") {
            setWicon(rain_icon);
        }else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n") {
            setWicon(snow_icon);
        }else{
            setWicon(clear_icon)
        }

    }

    return (
        <div className='container'>
            <div className='top-bar'>
                <input type="text" className="form-control city_input" name="city_input" id="city_input" placeholder="Search..." aria-describedby="helpId" />
                <div className='search-icon' onClick={() => search()}>
                    <img src={search_icon} alt='' />
                </div>
            </div>
            <div className='weather-image'>
                <img src={wicon} alt='' />
            </div>
            <div className='weather-temp'>24°c</div>
            <div className='weather-location' id='weather-location'>London</div>
            <div className='data-container'>
                <div className='element'>
                    <img src={humidity_icon} alt='' className='icon' />
                    <div className='data'>
                        <div className='humidity-percent'>64%</div>
                        <div className='humidity-percent-text'>Humidity</div>
                    </div>
                </div>
                <div className='element'>
                    <img src={wind_icon} alt='' className='icon' />
                    <div className='data'>
                        <div className='wind-rate'>18 km/h</div>
                        <div className='wind-rate-text'>Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
