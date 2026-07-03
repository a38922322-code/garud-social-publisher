import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import API from '../../services/api'

export default function Dashboard(){
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [stats, setStats] = useState({ totalPosts: 0, publishedPosts: 0, totalUsers: 0 })
  const [error, setError] = useState('')

  useEffect(()=>{
    const fetchStats = async () => {
      try {
        const [postsRes, usersRes] = await Promise.all([
          API.get('/posts/admin/all'),
          API.get('/auth/users/count')
        ])
        const allPosts = postsRes.data || []
        setStats({
          totalPosts: allPosts.length,
          publishedPosts: allPosts.filter(item => item.status === 'published').length,
          totalUsers: usersRes.data?.total || 0
        })
      } catch (err) {
        setError('Unable to load dashboard metrics.')
      }
    }
    fetchStats()
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-3xl bg-white p-6 shadow">
          <div className="flex flex-col gap-3">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-blue-700">Admin</p>
              <h2 className="mt-2 text-2xl font-bold text-slate-900">Garud Panel</h2>
            </div>
            <nav className="space-y-3 pt-4">
              <Link className="block rounded-2xl px-4 py-3 text-slate-700 hover:bg-slate-100" to="/dashboard">Dashboard</Link>
              <Link className="block rounded-2xl px-4 py-3 text-slate-700 hover:bg-slate-100" to="/create-post">Create Post</Link>
              <Link className="block rounded-2xl px-4 py-3 text-slate-700 hover:bg-slate-100" to="/manage-posts">Manage Posts</Link>
              <Link className="block rounded-2xl px-4 py-3 text-slate-700 hover:bg-slate-100" to="/">Public Website</Link>
              <button onClick={handleLogout} className="w-full rounded-2xl bg-red-600 px-4 py-3 text-white hover:bg-red-700">Logout</button>
            </nav>
          </div>
        </aside>

        <main className="space-y-6">
          <div className="rounded-3xl bg-white p-6 shadow">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-blue-700">Dashboard</p>
                <h1 className="text-3xl font-bold text-slate-900">Welcome back</h1>
              </div>
              <div className="rounded-full bg-blue-50 px-4 py-2 text-blue-700">Admin user</div>
            </div>
            <p className="mt-3 text-slate-600">Use the left menu to create and manage posts, or return to the public website.</p>
          </div>

          {error && <div className="rounded-3xl border border-rose-200 bg-rose-50 p-4 text-rose-700">{error}</div>}

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-blue-700 p-6 text-white shadow-xl">
              <p className="text-sm uppercase tracking-[0.3em]">Total Posts</p>
              <p className="mt-4 text-4xl font-bold">{stats.totalPosts}</p>
            </div>
            <div className="rounded-3xl bg-gradient-to-br from-green-700 to-teal-600 p-6 text-white shadow-xl">
              <p className="text-sm uppercase tracking-[0.3em]">Published Posts</p>
              <p className="mt-4 text-4xl font-bold">{stats.publishedPosts}</p>
            </div>
            <div className="rounded-3xl bg-gradient-to-br from-indigo-700 to-violet-600 p-6 text-white shadow-xl">
              <p className="text-sm uppercase tracking-[0.3em]">Total Users</p>
              <p className="mt-4 text-4xl font-bold">{stats.totalUsers}</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
