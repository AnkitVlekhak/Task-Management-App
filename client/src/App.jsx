import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import { AuthProvider } from './contexts/AuthContext'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import TaskForm from './pages/TaskForm'
import Layout from './components/Layout'
import LoadingSpinner from './components/LoadingSpinner'
import { Toaster } from 'react-hot-toast'

function AppContent() {
  const { user, loading } = useAuth()

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route 
          path="/" 
          element={user ? <Navigate to="/dashboard" /> : <Home />} 
        />
        <Route 
          path="/login" 
          element={user ? <Navigate to="/dashboard" /> : <Login />} 
        />
        <Route 
          path="/register" 
          element={user ? <Navigate to="/dashboard" /> : <Register />} 
        />
        <Route 
          path="/dashboard" 
          element={user ? <Layout><Dashboard /></Layout> : <Navigate to="/" />} 
        />
        <Route 
          path="/tasks/new" 
          element={user ? <Layout><TaskForm /></Layout> : <Navigate to="/" />} 
        />
        <Route 
          path="/tasks/:id/edit" 
          element={user ? <Layout><TaskForm /></Layout> : <Navigate to="/" />} 
        />
      </Routes>
      <Toaster position="top-right" />
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
