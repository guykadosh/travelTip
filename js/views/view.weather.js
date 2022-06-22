export const weatherView = {
  renderWeather,
}

function renderWeather(weather) {
  document.querySelector('.weather-main').innerText = weather.weather
  document.querySelector('.weather-state').innerText = weather.state
  document.querySelector('.temp').innerText = weather.temp + '°'
  document.querySelector('.min-temp').innerText = weather.minTemp + '°'
  document.querySelector('.max-temp').innerText = weather.maxTemp + '°'
  document.querySelector('.speed').innerText = weather.windSpeed
}
