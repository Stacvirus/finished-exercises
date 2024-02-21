import axios from "axios"

const api_key = import.meta.env.VITE_SOME_KEY
const weather_url = "https://api.openweathermap.org/data/2.5/weather?"

function getCountry() {
    const rq = axios.get("https://studies.cs.helsinki.fi/restcountries/api/all")
    return rq.then(resp => resp.data)
}

function getWeather(coord) {
    const rq = axios.get(`${weather_url}lat=${coord[0]}&lon=${coord[1]}&appid=${api_key}`)
    return rq.then(resp => resp.data)
}

export default { getCountry, getWeather }