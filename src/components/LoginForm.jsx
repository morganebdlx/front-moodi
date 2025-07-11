import { useState } from 'react'
import api from '../api/axios'

const LoginForm = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await api.post('/api/login', { email, password })
      onLoginSuccess(response.data.user)
    } catch (err) {
      console.error(err)
      setError('Email ou mot de passe invalide')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Connexion</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label htmlFor="email">Email :</label>
        <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="password">Mot de passe :</label>
        <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      </div>
      <button type="submit">Se connecter</button>
    </form>
  )
}

export default LoginForm
