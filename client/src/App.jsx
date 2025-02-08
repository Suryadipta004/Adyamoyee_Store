import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import toast, { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import fetchUserDetails from './utils/fetchUserDetails.jsx'
import { useDispatch } from 'react-redux'
import { setUserDetails } from './store/userSlice'

function App() {

  const dispatch = useDispatch()

  const fetchUser = async()=>{
    const userData = await fetchUserDetails()
    // console.log("userData",userData)
    dispatch(setUserDetails(userData.data))//set the user details in the store
  }


  useEffect(()=>{
    //check if  the user is logged in
    fetchUser()
  },[])
  return (
    <>
      <Header/>
        <main className='min-h-[78vh]'>
          <Outlet />
        </main>
      <Footer/>
      <Toaster/>
    </>
  )
}

export default App
