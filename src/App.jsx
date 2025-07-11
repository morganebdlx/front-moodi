import { useEffect, useState } from "react";
import api from "./api/axios";// instance Axios pointant vers Rails
import WeatherHome from "./components/WeatherHome";
import AnimatedBackground from "./components/AnimatedBackground";
import LoginForm from "./components/LoginForm";
import './App.css';
import Recommendations from "./components/RecommendationsCard";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  // Vérification de l'authentification à l'initialisation
  useEffect(() => {
    api.get('/current_user') // Rails route pour récupérer l'utilisateur connecté
      .then(response => {
        if (response.data.user) {
          setCurrentUser(response.data.user);
        }
      })
      .catch(error => {
        console.error('Erreur lors de la récupération de l’utilisateur :', error);
      });
  }, []);

  // Récupération des utilisateurs après login

 useEffect(() => {
  if (currentUser) {
    api.get('/users')
      .then(response => {
        console.log("Utilisateurs récupérés :", response.data)
      })
      .catch(error => {
        console.error('Erreur API :', error)
      })
  }
}, [currentUser]) // déclenche seulement après login


   return (
    <div>
      <h1>Moodi</h1>
      <WeatherHome />
      <AnimatedBackground />

      <Recommendations />

       {!currentUser ? (
        <LoginForm onLoginSuccess={(user) => setCurrentUser(user)} />
      ) : (
        <p>Bienvenue, {currentUser.email} !</p>
      )}

    </div>
  )
}

export default App
