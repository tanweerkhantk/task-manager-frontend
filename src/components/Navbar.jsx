import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem("token")

    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/login")
    } 

  return (
    <div className='bg-blue-600 text-white p-4 flex justify-between'>
      <h1 className='font-bold'>Full Stack Task Manager Application Using MERN</h1>
      <div className='flex gap-4'>

        {token ? (
      <button
        onClick={handleLogout}
        className='bg-red-500 px-4 py-2 rounded cursor-pointer'
        >Logout</button>
    ) : (

        <>
        <Link to="/">Dashboard</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        </>
    )}
        
      </div>
    </div>
  )
}

export default Navbar
