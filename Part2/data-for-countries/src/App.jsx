import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [countries, setCountries] = useState([])
  const [value, setValue] = useState('')
  const [weather, setWeather] = useState(null)
  const [latlng, setLatlng] = useState([])

  const handleInputChange = (event) => {
    setValue(event.target.value)
  }

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        console.log(response.data)
        setCountries(response.data)
      })
  }, [])

  useEffect(() => {
    if (latlng.length === 0) {
      return
    }

    const [lat, lng] = latlng
    console.log('lat and lng', lat, lng)
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${import.meta.env.VITE_WEATHER_KEY}`
    axios
      .get(weatherUrl)
      .then(response => {
        console.log(response.data)
        setWeather(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [latlng])

  const searchResults = countries.filter(country => country.name.common.toLowerCase().includes(value.toLowerCase()))

  useEffect(() => {
    if (searchResults.length === 1) {
      setLatlng(searchResults[0].capitalInfo.latlng);
    } else {
      setLatlng([]);
    }
  }, [searchResults.length]);

  const kelvinToCelsius = (kelvin) => (kelvin - 273.15).toFixed(2)

  let content
  if (searchResults.length > 10) {
    content = 'Too many matches, specify another filter'
  } else if (searchResults.length === 1) {
    const country = searchResults[0]
    console.log(country)

    content = (
      <div>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>
        <h2>Languages</h2>
        <ul>
          {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
        </ul>
        <img src={country.flags.png} alt={`Flag of ${country.name.common}`}/>
        {weather && (
          <div>
            <h2>Weather in {country.capital}</h2>
            <div>Temperature {kelvinToCelsius(weather.main.temp)} Celsius</div>
            <div>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
              />
            </div>
            <div>Wind {weather.wind.speed} m/s</div>
          </div>
        )}
      </div>
    )
  } else {
    content = (
      <ul>
        {searchResults.map(result => {
          return (
            <li key={result.name.common}>
                {result.name.common}
                <button onClick={() => setValue(result.name.common)}>Show</button>
            </li>
          )}
        )}
      </ul>
    )
  }

  return (
    <div>
      <label>
        find countries <input value={value} onChange={handleInputChange}/>
      </label>
      <div>
        {content}
      </div>
    </div>
  )
}

export default App
