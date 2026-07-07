import React, { useEffect, useMemo, useState } from 'react'
import API from '../../services/api'

export default function Posts(){
  const [posts, setPosts] = useState([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    API.get('/posts/admin/all')
      .then(r => setPosts(r.data))
      .catch(() => setError('Unable to load posts.'))
      .finally(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    return posts.filter(post => post.title.toLowerCase().includes(query.toLowerCase()) || post.excerpt?.toLowerCase().includes(query.toLowerCase()) || post.category?.toLowerCase().includes(query.toLowerCase()))
  }, [posts, query])

  const deletePost = async (id) => {
    if (!window.confirm('Delete this post?')) return
    try {
      await API.delete(`/posts/${id}`)
      setPosts(prev => prev.filter(post => post._id !== id))
    } catch (err) {
      alert('Unable to delete post.')
    }
  }

  const retryPublish = async (id) => {
    try {
      await API.post(`/posts/${id}/retry-publish`)
      const res = await API.get('/posts/admin/all')
      setPosts(res.data)
    } catch (err) {
      alert(err.response?.data?.message || 'Unable to retry publish.')
    }
  }

  return (
    <div className="space-y-6 rounded-3xl bg-white p-6 shadow-xl">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Manage Posts</h2>
          <p className="text-slate-500">Search, edit, and remove posts from your site.</p>
        </div>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search posts..."
          className="w-full max-w-sm rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 shadow-sm focus:border-blue-500 focus:outline-none"
        />
      </div>

      {loading ? (
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-slate-600">Loading posts...</div>
      ) : error ? (
        <div className="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-rose-700">{error}</div>
      ) : filtered.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-slate-600">No posts match your search.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left">
            <thead className="bg-slate-50 text-slate-700">
              <tr>
                <th className="px-4 py-3 text-sm font-semibold">Title</th>
                <th className="px-4 py-3 text-sm font-semibold">Category</th>
                <th className="px-4 py-3 text-sm font-semibold">Status</th>
                <th className="px-4 py-3 text-sm font-semibold">Published</th>
                <th className="px-4 py-3 text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filtered.map(post => (
                <tr key={post._id} className="hover:bg-slate-50">
                  <td className="px-4 py-4">{post.title}</td>
                  <td className="px-4 py-4">{post.category || 'General'}</td>
                  <td className="px-4 py-4 capitalize">{post.status}</td>
                  <td className="px-4 py-4">
                    {post.status === 'scheduled' && post.scheduledAt
                      ? new Date(post.scheduledAt).toLocaleString()
                      : post.publishedAt
                        ? new Date(post.publishedAt).toLocaleDateString()
                        : '—'}
                  </td>
                  <td className="px-4 py-4 space-x-2">
                    <button onClick={() => window.location.href = `/post/${post.slug}`} className="rounded-full border border-slate-300 px-3 py-1 text-sm text-slate-700 hover:bg-slate-100">View</button>
                    <button onClick={() => window.location.href = `/edit-post/${post._id}`} className="rounded-full border border-blue-500 px-3 py-1 text-sm text-blue-700 hover:bg-blue-50">Edit</button>
                    {(post.publishError || (!post.facebookPostId && post.status === 'published')) && (
                      <button onClick={() => retryPublish(post._id)} className="rounded-full border border-amber-500 px-3 py-1 text-sm text-amber-700 hover:bg-amber-50">Retry Publish</button>
                    )}
                    <button onClick={() => deletePost(post._id)} className="rounded-full bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
