import { useEffect, useState } from "react"
import api from "./api/axios" // ton instance Axios pointant vers Rails
import Weather from "./components/Weather"

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
      <Weather />
    </div>
  )
}

export default App
