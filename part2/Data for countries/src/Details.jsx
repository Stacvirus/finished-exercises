import Lang from "./Lang"
import dataServer from "./Fetching"
import { useEffect, useState } from "react";
import cloud from "./assets/weatherIcon.png"

function Details({ country }) {
    const [temps, setTemps] = useState({ temperature: "", img: "", wind: "" })
    const [icon, setIcon] = useState('')
    const lonlat = country.latlng
    useEffect(() => {
        dataServer.getWeather(lonlat)
            .then(resp => {
                const weatherObject = {
                    temperature: resp.main.temp,
                    img: cloud,
                    wind: resp.wind.speed
                }
                setTemps(weatherObject)
                setIcon(`https://openweathermap.org/img/wn/${resp.weather[0].icon}@2x.png`)
            })
    }, [])
    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
            <h2>languages: </h2>
            <Lang languages={country.languages} />
            <img src={country.flags.png} alt="flag" />
            <div>
                <p>temperature {temps.temperature} Celcius</p>
                {icon && <img src={icon} alt="cloud image" />}
                <p>wind {temps.wind} m/s</p>
            </div>
        </div>
    )
}

export default Details;