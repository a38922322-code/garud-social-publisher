import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import PostDetails from './pages/PostDetails'
import AdminLogin from './pages/AdminLogin'
import Dashboard from './pages/dashboard/Dashboard'
import CreatePost from './pages/dashboard/CreatePost'
import ManagePosts from './pages/dashboard/Posts'
import { AuthProvider, useAuth } from './context/AuthContext'

function Protected({ children }){
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" replace />
  return children;
}

export default function App(){
  return (
    <AuthProvider>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <Navbar />
        <main className="min-h-[calc(100vh-7rem)]">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/posts" element={<Home/>} />
            <Route path="/post/:slug" element={<PostDetails/>} />
            <Route path="/login" element={<AdminLogin/>} />
            <Route path="/dashboard" element={<Protected><Dashboard/></Protected>} />
            <Route path="/create-post" element={<Protected><CreatePost/></Protected>} />
            <Route path="/edit-post/:id" element={<Protected><CreatePost/></Protected>} />
            <Route path="/manage-posts" element={<Protected><ManagePosts/></Protected>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  )
}
