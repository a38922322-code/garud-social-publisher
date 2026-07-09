import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-400">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Garud Social Publisher. All rights reserved.</p>
        <div className="flex gap-4">
          <Link to="/privacy" className="hover:text-slate-200">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-slate-200">Terms of Service</Link>
          <Link to="/contact" className="hover:text-slate-200">Contact</Link>
          <Link to="/data-deletion" className="hover:text-slate-200">Data Deletion</Link>
        </div>
      </div>
    </footer>
  )
}
