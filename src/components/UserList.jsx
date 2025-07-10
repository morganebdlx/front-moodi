import React, { useEffect, useState } from 'react'
import api from '../api/axios'

export default function UserList() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    api.get('/users') // Rails route: GET /users
      .then(response => setUsers(response.data))
      .catch(error => console.error('Erreur API :', error))
  }, [])

  return (
    <div>
      <h2>Liste des utilisateurs</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} - {user.location}</li>
        ))}
      </ul>
    </div>
  )
}

