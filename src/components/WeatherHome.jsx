import React, { useState, useEffect } from 'react';
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, MapPin, Calendar, User, Sparkles,
  Thermometer, Droplets, Wind, Eye, Sunrise, Sunset, ChevronRight, Settings, SwatchBook
} from 'lucide-react';
import PersonalizationForm from '../components/PersonalizationForm';
import AnimatedBackground from '../components/AnimatedBackground';
import '../App.css';

const WeatherIcon = ({ condition, size = 24 }) => {
  const iconProps = { size };

  switch (condition?.toLowerCase()) {
    case "sunny": return <Sun {...iconProps} />;
    case "partly cloudy": return <Cloud {...iconProps} />;
    case "cloudy": return <Cloud {...iconProps} />;
    case "rain": case "rainy": return <CloudRain {...iconProps} />;
    case "thunderstorm": return <CloudLightning {...iconProps} />;
    case "snow": case "snowy": return <CloudSnow {...iconProps} />;
    default: return <Sun {...iconProps} />;
  }
};

function WeatherHome() {
  const [theme, setTheme] = useState('warm');
  const [showPersonalization, setShowPersonalization] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'warm' ? 'cool' : 'warm');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!location.trim()) return;
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:3000/weather?location=${encodeURIComponent(location)}`);
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error("Erreur météo:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`app ${theme}`}>
      <AnimatedBackground theme={theme} />

      <div className="app-container">
        <header className="app-header">
          <div className="header-brand">
            <div className={`brand-logo ${theme}`}><Sparkles className="brand-icon" /></div>
            <div className="brand-text">
              <h1 className="brand-title">Moodi</h1>
              <p className="brand-subtitle">Assistant Météo IA</p>
            </div>
          </div>
          <div className="header-actions">
            <button onClick={toggleTheme} className="action-button"><SwatchBook /></button>
            <button onClick={() => setShowPersonalization(true)} className="action-button"><Settings /></button>
          </div>
        </header>

        {/* 🔍 Formulaire de recherche météo */}
        <div className="weather-search">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Entrez une ville"
            />
            <button type="submit">Go</button>
          </form>
        </div>

        {/* 🌤️ Affichage météo dynamique */}
        {loading && <p>Chargement...</p>}

        {weather && !loading && (
          <div className="weather-card">
            <div className="weather-header">
              <div className="weather-location">
                <MapPin />
                <span>{weather.location.name}, {weather.location.country}</span>
              </div>
              <div className="weather-time">
                {currentTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>

            <div className="weather-main">
              <div className="weather-temp">
                <div className="temperature">{weather.current.temp_c}°</div>
                <div className="condition">{weather.current.condition.text}</div>
              </div>
              <div className="weather-icon-container">
                <img src={weather.current.condition.icon} alt="icon" />
              </div>
            </div>

            <div className="weather-details">
              <div className="detail-item">
                <Droplets />
                <div className="detail-label">Humidité</div>
                <div className="detail-value">{weather.current.humidity}%</div>
              </div>
              <div className="detail-item">
                <Wind />
                <div className="detail-label">Vent</div>
                <div className="detail-value">{weather.current.wind_kph} km/h - {weather.current.wind_dir}</div>
              </div>
              <div className="detail-item">
                <Thermometer />
                <div className="detail-label">UV</div>
                <div className="detail-value" style={{
                  color: weather.current.uv >= 7 ? 'red' :
                         weather.current.uv >= 4 ? 'orange' : 'green'
                }}>{weather.current.uv}</div>
              </div>
            </div>
          </div>
        )}



        {/* Modale de personnalisation */}
        <PersonalizationForm
          isOpen={showPersonalization}
          onClose={() => setShowPersonalization(false)}
          theme={theme}
        />
      </div>
    </div>
  );
}

export default WeatherHome;
