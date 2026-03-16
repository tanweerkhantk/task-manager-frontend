import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import './App.css'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
function App() {

  return (
    <>
    <ToastContainer position='top-right' autoClose={2000} theme='colored' />
    <BrowserRouter>
  <Navbar />
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route 
      path='/' 
      element={
        <ProtectedRoute>
           <Dashboard />
        </ProtectedRoute>

      } />
    </Routes>
  </BrowserRouter>
    </>
  
  )
}

export default App
