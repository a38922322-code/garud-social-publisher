import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-lg backdrop-saturate-150">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-xl font-bold tracking-tight text-slate-900 hover:text-blue-700">
          Garud Social Publisher
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-slate-700">
          <Link className="hover:text-blue-700" to="/">Home</Link>
          <Link className="hover:text-blue-700" to="/posts">Posts</Link>
          <Link className="rounded-full border border-blue-700 bg-blue-50 px-4 py-2 text-blue-700 transition hover:bg-blue-100" to="/login">
            Login
          </Link>
        </nav>
      </div>
    </header>
  )
}
