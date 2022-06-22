export const weatherService = {
  getWeather,
}

const API_KEY = '31042fe910240451f5d529801c3a040a'

function getWeather({ lat, lng }) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}`
  return fetch(url)
    .then(res => res.json())
    .then(res => {
      return {
        weather: res.weather[0].main,
        temp: res.main.temp,
        minTemp: res.main['temp_min'],
        maxTemp: res.main['temp_max'],
        windSpeed: res.wind.speed,
        state: res.sys.country,
      }
    })
}
