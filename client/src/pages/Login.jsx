import React, { useState } from 'react'
import Axios from '../utils/Axios'
import AxiosToastError from '../utils/AxiosToastError'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {

  const navigate= useNavigate()
  const [data, setData] = useState({
    email: "",
    password: ""
  })
  const handleChange = (e) => {
    const { name, value } = e.target

    setData((preve) => {
        return {
            ...preve,
            [name]: value
        }
    })
  }

  const valideValue = Object.values(data).every(el => el)


  const handleSubmit = async(e) =>{
    e.preventDefault()//stops refreshing the page on clicking the register button

    try {
      const response = await Axios({
        ...SummaryApi.login,
        data : data
    })
    if(response.data.error){
      toast.error(response.data.message)
  }

  if(response.data.success){
      toast.success(response.data.message)
      setData({
          email : "",
          password : "",
      })
      navigate("/login")
  }
      
    } catch (error) {
      AxiosToastError(error)
    }
  }


  return (
    <div>
        <section className='w-full container mx-auto px-2'>
          <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
            <p>Login</p>

            <form className='grid gap-4 mt-6' onSubmit={handleSubmit}>
              <div className='grid gap-1'>
                  <label htmlFor='email'>Email :</label>
                    <input
                        type='email'
                        id='email'
                        className='bg-blue-50 p-2 border rounded outline-none focus:border-primary-200'
                        name='email'
                        value={data.email}
                        onChange={handleChange}
                        placeholder='Enter your email'
                    />
                </div>
                <div className='grid gap-1'>
                  <label htmlFor='password'>Password :</label>
                    <input
                        type='password'
                        id='password'
                        className='bg-blue-50 p-2 border rounded outline-none focus:border-primary-200'
                        name='password'
                        value={data.password}
                        onChange={handleChange}
                        placeholder='Enter your password'
                    />
                </div>
                <button disabled={!valideValue} className={` ${valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500" }    text-white py-2 rounded font-semibold my-3 tracking-wide`}>Login</button>

            </form>
            <p>
                Don't have account? <Link to={"/register"} className='font-semibold text-green-700 hover:text-green-800'>Register</Link>
                </p>
          </div>
        </section>
    </div>
  )
}

export default Login