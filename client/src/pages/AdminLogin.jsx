import React, { useState } from 'react'
import API from '../services/api'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function AdminLogin(){
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { login } = useAuth()

  const submit = async (e) => {
    e.preventDefault()
    try {
      const res = await API.post('/auth/login', { username, password })
      login(res.data.token)
      navigate('/dashboard')
    } catch (err) {
      alert('Login failed. Use admin / admin123')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <form onSubmit={submit} className="bg-white p-6 rounded shadow w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Admin Login</h2>
        <label className="block mb-2">
          <span className="text-sm font-medium text-gray-700">Username</span>
          <input
            className="w-full p-2 border rounded mt-1"
            placeholder="Username"
            value={username}
            onChange={e=>setUsername(e.target.value)}
          />
        </label>
        <label className="block mb-4">
          <span className="text-sm font-medium text-gray-700">Password</span>
          <input
            type="password"
            className="w-full p-2 border rounded mt-1"
            placeholder="Password"
            value={password}
            onChange={e=>setPassword(e.target.value)}
          />
        </label>
        <button className="w-full bg-blue-600 text-white p-2 rounded">Login</button>
      </form>
    </div>
  )
}
