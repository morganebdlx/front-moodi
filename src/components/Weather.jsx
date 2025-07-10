import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Weather() {
  const [location, setLocation] = useState("Bordeaux")
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchWeather = () => {
    setLoading(true)
    axios.get(`http://localhost:3000/weather?location=${location}`)
      .then(response => {
        setWeather(response.data)
        setLoading(false)
      })
      .catch(error => {
        console.error("Erreur lors de la récupération météo :", error)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchWeather()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchWeather()
  }

  return (
    <div className="weather-container">
      <h2>Météo</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={location}
          onChange={e => setLocation(e.target.value)}
          placeholder="Entrez une ville"
        />
        <button type="submit">Go</button>
      </form>

      {loading && <p>Chargement...</p>}

      {weather && !loading && (
        <div className="weather-card">
          <h3>{weather.location.name}, {weather.location.country}</h3>
          <img src={weather.current.condition.icon} alt="icon" />
          <p><strong>{weather.current.temp_c}°C</strong> - {weather.current.condition.text}</p>
          <p><strong>UV :</strong> <span style={{
            color: weather.current.uv >= 7 ? 'red' : weather.current.uv >= 4 ? 'orange' : 'green'
          }}>{weather.current.uv}</span></p>
          <p><strong>Vent :</strong> {weather.current.wind_kph} km/h - {weather.current.wind_dir}</p>
        </div>
      )}
    </div>
  )
}
