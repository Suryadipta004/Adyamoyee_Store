import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import toast, { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import fetchUserDetails from './utils/fetchUserDetails.jsx'
import { useDispatch } from 'react-redux'
import { setUserDetails } from './store/userSlice'
import { setAllCategory } from './store/productSlice';
import Axios from './utils/Axios';
import SummaryApi from './common/SummaryApi';
import { setLoadingCategory , setAllSubCategory } from './store/productSlice';

function App() {

  const dispatch = useDispatch()


  const fetchUser = async()=>{
    const userData = await fetchUserDetails()
    // console.log("userData",userData)
    dispatch(setUserDetails(userData.data))//set the user details in the store
  }

  const fetchCategory = async()=>{
    try {
        dispatch(setLoadingCategory(true))
        const response = await Axios({
            ...SummaryApi.getCategory
        })
        const { data : responseData } = response

        if(responseData.success){
           dispatch(setAllCategory(responseData.data.sort((a, b) => a.name.localeCompare(b.name)))) 
        }
    } catch (error) {
        
    }finally{
      dispatch(setLoadingCategory(false))
    }
  }


  const fetchSubCategory = async()=>{
    try {
        const response = await Axios({
            ...SummaryApi.getSubCategory
        })
        const { data : responseData } = response

        if(responseData.success){
           dispatch(setAllSubCategory(responseData.data.sort((a, b) => a.name.localeCompare(b.name)))) 
        }
    } catch (error) {
        
    }finally{
    }
  }



  useEffect(()=>{
    //check if  the user is logged in
    fetchUser()
    fetchCategory()
    fetchSubCategory()
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
