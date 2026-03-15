import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


const Register = () => {
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const navigate = useNavigate()

  const handleRegister = async(e) => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password
      })

      alert("Registration Successful")
      navigate("/login")

    } catch (error) {
      alert("Registration Error")
    }
  }
  return (
    <div className='min-h-screen flex items-center justify-center bg-linear-to-r from-purple-500 to-pink-500'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
        <h2 className='text-3xl font-bold text-center mb-6'>Register</h2>
        <form onSubmit={handleRegister} className='space-y-4'>
          <input 
          type="text" 
          placeholder='Name'
          className='w-full border border-gray-300 p-3 rounded'
          value={name}
          onChange={(e)=>setName(e.target.value)}
          required/>
          <input 
          type="text" 
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
          <button className='w-full bg-purple-500 text-white p-3 rounded hover:bg-purple-600
          cursor-pointer'>
            Login
          </button>
        </form>
        <p className='text-center mt-4'>
          Already have an account?
          <Link to="/login" className='text-blue-500 ml-2 cursor-pointer'>Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Register
