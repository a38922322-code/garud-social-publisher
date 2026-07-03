import React, { useEffect, useState } from 'react'
import API from '../services/api'
import { Link } from 'react-router-dom'

export default function Home(){
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(()=>{
    API.get('/posts')
      .then(r => setPosts(r.data))
      .catch(() => setError('Unable to load posts.'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_420px] lg:items-center">
          <div>
            <p className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold uppercase tracking-[0.28em] text-blue-700">
              Publish smarter
            </p>
            <h1 className="text-5xl font-bold leading-tight text-slate-900 sm:text-6xl">Create, publish, and manage posts from a single dashboard.</h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-600">Garud Social Publisher helps you write posts, publish quickly, and keep your public website updated with real content. Your admin controls and public page work together seamlessly.</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/posts" className="inline-flex items-center justify-center rounded-full bg-blue-700 px-7 py-3 text-base font-semibold text-white shadow-lg shadow-blue-600/10 transition hover:bg-blue-800">Latest Posts</Link>
              <Link to="/login" className="inline-flex items-center justify-center rounded-full border border-blue-700 bg-white px-7 py-3 text-base font-semibold text-blue-700 transition hover:bg-blue-50">Admin Login</Link>
            </div>
          </div>

          <div className="rounded-[2rem] bg-gradient-to-br from-blue-700 to-slate-900 p-10 text-white shadow-2xl shadow-slate-900/10">
            <p className="text-sm uppercase tracking-[0.3em] text-blue-200">Why Garud?</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight">Beautiful public pages, secure admin, and fast publishing.</h2>
            <p className="mt-5 text-slate-200">Build posts with image upload and publish immediately to your public homepage without breaking the app. The admin panel includes posts management, create/edit, and dashboard metrics.</p>
            <div className="mt-8 grid gap-4 rounded-3xl bg-white/10 p-6">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-blue-100">Quick admin</p>
                <p className="mt-2 text-base text-slate-100">Login with admin access and start publishing in seconds.</p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-blue-100">Modern UI</p>
                <p className="mt-2 text-base text-slate-100">Responsive design with cards, search, and polished layouts.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-blue-700">Latest posts</p>
              <h2 className="mt-3 text-4xl font-bold text-slate-900">Published content</h2>
            </div>
            <Link to="/posts" className="text-blue-700 hover:underline">View all posts</Link>
          </div>

          {loading ? (
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-10 text-slate-600">Loading posts...</div>
          ) : error ? (
            <div className="rounded-3xl border border-rose-200 bg-rose-50 p-10 text-rose-700">{error}</div>
          ) : posts.length === 0 ? (
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-10 text-slate-600">No published posts yet.</div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {posts.slice(0, 6).map(post => (
                <article key={post._id} className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  {post.image ? <img src={post.image} alt={post.title} className="h-64 w-full object-cover" /> : <div className="h-64 bg-slate-200" />}
                  <div className="p-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-700">{post.category || 'General'}</p>
                    <h3 className="mt-3 text-2xl font-semibold text-slate-900">{post.title}</h3>
                    <p className="mt-4 text-slate-600">{post.excerpt || 'No excerpt available.'}</p>
                    <Link to={`/post/${post.slug}`} className="mt-6 inline-flex items-center text-blue-700 hover:underline">Read more →</Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
