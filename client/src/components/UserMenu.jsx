import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import Axios from '../utils/Axios'
import { logout } from '../store/userSlice'
import AxiosToastError from '../utils/AxiosToastError.jsx'
import  isAdmin  from '../utils/isAdmin'
import { HiOutlineExternalLink } from "react-icons/hi";
import Divider from './Divider.jsx'


const UserMenu = ({close}) => {
    const user = useSelector((state) => state?.user)//get the user details from the store
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = async() => {
        try {
            const response = await Axios({
                ...SummaryApi.logout
            })
            if(response.data.success){
                if(close){
                    close()
                }
                dispatch(logout())
                localStorage.clear()
                toast.success(response.data.message)
                navigate("/")
              }
            
        } catch (error) {
            console.log(error)
            AxiosToastError(error)
        }
    }

    const handleClose = () => {
        if(close){
            close()
          }
    }

  return (
    <div>
        <div className='font-semibold text-green-700'>My Account</div>
        <div className='flex items-center gap-2'>
            <span className='max-w-52 text-ellipsis line-clamp-1'>{user.name || user.mobile} <span className='text-medium text-red-600'>{user.role === "ADMIN" ? "(Admin)" : "(User)"}</span></span>
            <Link onClick={handleClose} to={"/dashboard/profile"} className='hover:text-primary-200'>
                <HiOutlineExternalLink size={15}/>
            </Link>
        </div>

        <Divider/>

        <div className='grid gap-1 text-sm'>
            {
                isAdmin(user.role)&&(
                    <Link onClick={handleClose} to={"/dashboard/category"} className='px-2 hover:bg-primary-100 py-1'>Category</Link>
                )
            }
            {
                isAdmin(user.role)&&(
                    <Link onClick={handleClose} to={"/dashboard/subcategory"} className='px-2 hover:bg-primary-100 py-1'>Sub Category</Link>
                )
            }
            {
                isAdmin(user.role)&&(
                    <Link onClick={handleClose} to={"/dashboard/upload-product"} className='px-2 hover:bg-primary-100 py-1'>Upload Product</Link>
                )
            }
            {
                isAdmin(user.role)&&(
                    <Link onClick={handleClose} to={"/dashboard/product"} className='px-2 hover:bg-primary-100 py-1'>Product</Link>
                )
            }
            <Link onClick={handleClose} to={"/dashboard/myorders"} className='px-2 hover:bg-primary-100 py-1'>My Orders</Link>

            <Link onClick={handleClose} to={"/dashboard/address"} className='px-2 hover:bg-primary-100 py-1'>Save Address</Link>
            <button className='text-left px-2 hover:bg-primary-100 py-1 rounded' onClick={handleLogout}>Logout</button>
        </div>
    </div>

  )
}

export default UserMenu