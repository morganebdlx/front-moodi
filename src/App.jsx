import { useEffect, useState } from "react"
import api from "./api/axios" // instance Axios pointant vers Rails
import WeatherHome from "./components/WeatherHome"
import AnimatedBackground from "./components/AnimatedBackground"
import PersonalizationForm from "./components/PersonalizationForm"
import './App.css'

function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    api.get('/users') // Rails route: GET /users
      .then(response => setUsers(response.data))
      .catch(error => console.error('Erreur API :', error))
  }, [])

   return (
    <div>
      <h1>Moodi</h1>
      <WeatherHome />
      <AnimatedBackground />
      <PersonalizationForm />

      <ul>
        {users.map(user => (
          <li key={user.id}>{user.email}</li>
        ))}
      </ul>

    </div>
  )
}

export default App
