import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import API from '../../services/api'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

export default function CreatePost(){
  const { id } = useParams()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [category, setCategory] = useState('')
  const [tags, setTags] = useState('')
  const [image, setImage] = useState(null)
  const [status, setStatus] = useState('draft')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    API.get(`/posts/${id}`)
      .then(response => {
        const post = response.data
        setTitle(post.title || '')
        setContent(post.content || '')
        setExcerpt(post.excerpt || '')
        setCategory(post.category || '')
        setTags((post.tags || []).join(', '))
        setStatus(post.status || 'draft')
      })
      .catch(() => setError('Unable to load post for editing.'))
      .finally(() => setLoading(false))
  }, [id])

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const form = new FormData()
      form.append('title', title)
      form.append('content', content)
      form.append('excerpt', excerpt)
      form.append('category', category)
      form.append('tags', tags)
      form.append('status', status)
      if (image) form.append('image', image)

      if (id) {
        await API.put(`/posts/${id}`, form, { headers: { 'Content-Type': 'multipart/form-data' } })
      } else {
        await API.post('/posts', form, { headers: { 'Content-Type': 'multipart/form-data' } })
      }

      setMessage('Post saved successfully. Redirecting to dashboard...')
      setTimeout(() => navigate('/dashboard'), 900)
    } catch (err) {
      setError('Unable to save post. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-blue-700">{id ? 'Edit Post' : 'Create Post'}</p>
            <h1 className="text-3xl font-bold text-slate-900">{id ? 'Edit existing post' : 'Create a new post'}</h1>
          </div>
          <div className="rounded-full bg-slate-100 px-4 py-2 text-slate-700">{status === 'published' ? 'Publish' : 'Draft'}</div>
        </div>

        {message && <div className="mb-4 rounded-3xl bg-emerald-50 p-4 text-emerald-700 shadow-sm">{message}</div>}
        {error && <div className="mb-4 rounded-3xl bg-rose-50 p-4 text-rose-700 shadow-sm">{error}</div>}

        <form onSubmit={submit} className="space-y-5">
          <div className="grid gap-4 lg:grid-cols-2">
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Title"
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 focus:border-blue-500 focus:outline-none"
              required
            />
            <input
              value={category}
              onChange={e => setCategory(e.target.value)}
              placeholder="Category"
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <input
            value={excerpt}
            onChange={e => setExcerpt(e.target.value)}
            placeholder="Short excerpt"
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 focus:border-blue-500 focus:outline-none"
          />

          <input
            value={tags}
            onChange={e => setTags(e.target.value)}
            placeholder="Tags (comma separated)"
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 focus:border-blue-500 focus:outline-none"
          />

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <ReactQuill theme="snow" value={content} onChange={setContent} />
          </div>

          <div className="grid gap-4 lg:grid-cols-[1fr_160px]">
            <label className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-4 py-4 text-slate-600 transition hover:border-blue-500">
              <span className="block text-sm font-medium text-slate-700">Upload image</span>
              <input type="file" onChange={e => setImage(e.target.files[0])} className="mt-3 w-full" />
            </label>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-600">Status</p>
              <div className="mt-3 flex gap-3">
                <label className="flex items-center gap-2 text-slate-700">
                  <input type="radio" checked={status === 'draft'} onChange={() => setStatus('draft')} />
                  Draft
                </label>
                <label className="flex items-center gap-2 text-slate-700">
                  <input type="radio" checked={status === 'published'} onChange={() => setStatus('published')} />
                  Publish
                </label>
              </div>
            </div>
          </div>

          <button disabled={loading} className="w-full rounded-3xl bg-blue-700 px-6 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-400">
            {id ? 'Save changes' : 'Publish post'}
          </button>
        </form>
      </div>
    </div>
  )
}
