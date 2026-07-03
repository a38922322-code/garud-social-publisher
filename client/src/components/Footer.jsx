import React from 'react'

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-400">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Garud Social Publisher. All rights reserved.</p>
        <p>Built with React, Express, MongoDB, and TailwindCSS.</p>
      </div>
    </footer>
  )
}
