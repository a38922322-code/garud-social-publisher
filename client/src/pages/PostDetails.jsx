import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import API from '../services/api'

export default function PostDetails(){
  const { slug } = useParams();
  const [post, setPost] = useState(null)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(()=>{
    API.get(`/posts/slug/${slug}`)
      .then(r=> setPost(r.data))
      .catch(()=> setError('Post not found or could not load.'))
  }, [slug])

  if (error) return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-3xl rounded-3xl border border-rose-200 bg-white p-8 text-slate-700 shadow-sm">
        <p className="text-lg font-semibold text-rose-700">{error}</p>
        <button onClick={()=>navigate('/')} className="mt-4 rounded-full bg-blue-700 px-5 py-2 text-white">Back home</button>
      </div>
    </div>
  )

  if (!post) return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm text-slate-700">Loading post...</div>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-xl">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-blue-700">{post.category || 'General'}</p>
            <h1 className="text-4xl font-bold text-slate-900">{post.title}</h1>
          </div>
          <p className="text-sm text-slate-500">{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Draft'}</p>
        </div>
        {post.image && <img src={post.image} alt={post.title} className="mb-6 h-96 w-full rounded-3xl object-cover" />}
        <div className="prose max-w-none text-slate-700" dangerouslySetInnerHTML={{ __html: post.content || '<p>No content available.</p>' }} />
      </div>
    </div>
  )
}
