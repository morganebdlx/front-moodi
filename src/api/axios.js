import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000', // l’URL du ton back Rails
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true // pour envoyer les cookies de session
})

export default api
