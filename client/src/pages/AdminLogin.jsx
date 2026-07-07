import React, { useState } from 'react'
import API from '../services/api'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function AdminLogin(){
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await API.post('/auth/login', { username, password })
      login(res.data.token)
      navigate('/dashboard')
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed. Please try again.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <form onSubmit={submit} className="bg-white p-6 rounded shadow w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Admin Login</h2>
        {error && <div className="mb-4 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}
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
        <button disabled={loading} className="w-full bg-blue-600 text-white p-2 rounded disabled:opacity-60">{loading ? 'Logging in...' : 'Login'}</button>
      </form>
    </div>
  )
}
