import React, { useState } from 'react'
import { FaPlus, FaMinus } from "react-icons/fa";
import AxiosToastError from '../utils/AxiosToastError'
import SummaryApi from '../common/SummaryApi'
import Axios from '../utils/Axios' 
import toast from 'react-hot-toast'
import Loading from './Loading'



const AddToCartButton = ({data}) => {
    // const { fetchCartItem, updateCartItem, deleteCartItem } = useGlobalContext()
    const [loading,setLoading] = useState(false)
    const [qty,setQty] = useState(0)
    const [isAvailableCart, setIsAvailableCart] = useState(false)
    
    const handleADDToCart = async () => {
        console.log("handleADDToCart")
        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.addTocart,
                data : {
                    productId : data?._id
                }
            })
            const responseData = response.data
            if(responseData.success){
                toast.success(responseData.message)
            }
        } catch (error) {
            AxiosToastError(error)
        } finally{
            setLoading(false)
        }
    }




    const increaseQty = () => {
        console.log("increaseQty")

    }
    const decreaseQty = () => {
        console.log("decreaseQty")
    }




  return (
    <div className='w-full max-w-[150px]'>
    {
        isAvailableCart ? (
            <div className='flex w-full h-full'>
                <button onClick={decreaseQty} className='bg-green-600 hover:bg-green-700 text-white flex-1 w-full p-1 rounded flex items-center justify-center'><FaMinus /></button>
                <p className='flex-1 w-full font-semibold px-2 flex items-center justify-center'>Add</p>
                <button onClick={increaseQty} className='bg-green-600 hover:bg-green-700 text-white flex-1 w-full p-1 rounded flex items-center justify-center'><FaPlus /></button>
            </div>
        ):(
            <button className='bg-green-600 hover:bg-green-900 text-white py-1 px-2 lg:px-4 rounded' onClick={handleADDToCart}>
            {
                loading ? <Loading/> : "Add"
            }
            </button>
        )
    }
        
    </div>
  )
}

export default AddToCartButton