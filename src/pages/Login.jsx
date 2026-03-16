
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {toast} from  'react-toastify'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login",{
        email,
        password
      })
      localStorage.setItem("token", res.data.token)
      toast.success("Login Successful")
      navigate("/")
    } catch (err) {
      // console.log(err.response?.data)
      // alert(err.response?.data?.message || "Login Error")
      toast.error("Invalid Credentials")      
    }
  }
  return (
    <div className='min-h-screen flex items-center justify-center bg-linear-to-r from-blue-500 to-purple-600'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
        <h2 className='text-3xl font-bold text-center mb-6'>Login</h2>
        <form onSubmit={handleLogin} className='space-y-4'>
          <input 
          type="email" 
          placeholder='Email'
          className='w-full border border-gray-300 p-3 rounded'
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required/>
          <input 
          type="password" 
          placeholder='Password'
          className='w-full border border-gray-300 p-3 rounded'
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required/>
          <button className='w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600
          cursor-pointer'>
            Login
          </button>
        </form>
        <p className='text-center mt-4'>
          Don't have an account?
          <Link to="/register" className='text-blue-500 ml-2 cursor-pointer'>Register</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
