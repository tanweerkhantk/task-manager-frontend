import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import {toast} from 'react-toastify'

const Dashboard = () => {

  const [tasks,setTasks] = useState([])
  const [title,setTitle] = useState("")
  const [description,setDescription] = useState("")
  const [editId,setEditId] = useState(null)

  const token = localStorage.getItem("token")

  // get tasks

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/api/tasks",
      {
        headers:{
          Authorization:`Bearer ${token}`
        }    
      }
  )
    setTasks(res.data)
  }

    useEffect(() => {
      if(!token){
        alert("Please Login First")
      }
      fetchTasks()
    },[])
  

  //create task

  const createTask = async (e) => {
    e.preventDefault()
    await axios.post("http://localhost:5000/api/tasks",
      {title,description},
    {
        headers:{
          Authorization:`Bearer ${token}`
        }    
      }
    )
    toast.success("Task Created")
    setTitle("")
    setDescription("")
    fetchTasks()
  }


  // update task

  const updateTask = async (e) => {
     e.preventDefault()
    await axios.put(`http://localhost:5000/api/tasks/${editId}`,
      {title, description},
      {
        headers:{
          Authorization:`Bearer ${token}`
        }    
      }
    )
    toast.info("Task Updated")
    setEditId(null)
    setTitle("")
    setDescription("")
    fetchTasks()
  }

  // delete task
  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`,
      {
        headers:{
          Authorization:`Bearer ${token}`
        }    
      }
    )
    toast.error("Task Deleted")
    fetchTasks()
  }

  //edit task

  const editTask = (task) => {
    setTitle(task.title)
    setDescription(task.description)
    setEditId(task._id)
  }

  // const navigate = useNavigate()
  // const token = localStorage.getItem("token")
  //   const handleLogout = () => {
  //       localStorage.removeItem("token")
  //       navigate("/login")
  //   }
  return (
    <div className='min-h-screen bg-gray-100 p-10'>
      <h1 className='text-3xl font-bold mb-6'>Dashboard</h1>

    {/* {token && (
      <button
        onClick={handleLogout}
        className='bg-red-500 px-4 py-2 rounded'
        >Logout</button>
    )} */}

      {/* <div className='grid grid-cols-3 gap-6'>
        <div className='bg-white p-6 rounded shadow'>
          Total Tasks
        </div>
        <div className='bg-white p-6 rounded shadow'>
          Completed Tasks
        </div>
        <div className='bg-white p-6 rounded shadow'>
          Pending Tasks
        </div>
      </div> */}
      <form className='bg-white px-3 py-3 flex justify-between gap-2 mb-6'>
        <input 
        type="text"
        placeholder='Task Title'
        value={title}
        onChange={(e) =>setTitle(e.target.value)}
        className='border border-gray-300 p-2 w-full'
        />
        <textarea 
        placeholder='Task Description'
        value={description}
        onChange={(e) =>setDescription(e.target.value)}
        className='border border-gray-300 p-2 w-full'
        />
        {editId ? (
          <button
          onClick={updateTask}
          className='bg-green-500 w-64 text-white px-4 py-2 rounded cursor-pointer'
          >Update</button>
        ) : (
          <button
          onClick={createTask}
          className='bg-blue-500 w-64 text-white px-4 py-2 rounded cursor-pointer ml-2 h-16'
          >Create Task</button>
        )}
      </form>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {tasks.length === 0 ? (
          <div className='col-span-3 text-center py-10 
          '>
            <p className='text-gray-500 text-xl'>No Tasks Yet</p>
            <p className='text-gray-400 text-xl'>No Tasks Available. Create your first task to get started  🚀</p>
          </div>
        ) : (
          tasks.map(task => (
          <div
          key={task._id}
          className='bg-white p-4 rounded shadow flex justify-between'
          >
          <div>
          <h3 className='font-bold'>{task.title}</h3>
          <p>{task.description}</p>
          </div>
          <div className='flex gap-2 justify-between items-center'>
            <button
            onClick={() => editTask(task)}
            className='bg-green-500 px-3 text-white py-1 rounded cursor-pointer ml-2'
            >Edit</button>
            <button
            onClick={() => deleteTask(task._id)}
            className='bg-red-500 px-3 py-1 text-white rounded cursor-pointer'
            >Delete</button>
          </div>
          </div>
        ))
        )}
        
      </div>
    </div>
  )
}

export default Dashboard
