import React, { useState } from 'react'
import logo from '../assets/logo.png'
import { Link, useLocation,useNavigate } from 'react-router-dom'
import Search from './Search'
import { FaRegCircleUser } from "react-icons/fa6"
import useMobile from '../hooks/useMobile';
import { BsCart4 } from "react-icons/bs";
import { useSelector } from 'react-redux'
import { GoTriangleDown,GoTriangleUp } from "react-icons/go";
import UserMenu from './UserMenu'

const Header = () => {
    const [isMobile] = useMobile() 
    const location = useLocation()
    const navigate = useNavigate()
    const [openUserMenu, setOpenUserMenu] = useState(false)



    const user = useSelector((state) => state?.user)

    console.log("user",user)

    const handleCloseUserMenu = () => {
        setOpenUserMenu
    }


    const handleMobileUser = ()=>{
        if(!user._id){
            navigate("/login")
            return
        }

        navigate("/user")
    }
    
    const isSearchPage = location.pathname === "/search"
    const redirectToLoginPage=() =>{
        navigate("/login")
    }


  return (
    <header className='h-24 lg:h-20 lg:shadow-md sticky top-0 z-40 flex flex-col justify-center gap-1 bg-white'>
        {
            !(isSearchPage && isMobile) && (
                <div className='container mx-auto flex items-center px-2 justify-between'>
                    {/**logo */}
                    <div className='h-full'>
                        <Link to={"/"} className='h-full flex justify-center items-center'>
                            <img 
                                src={logo}
                                width={360}
                                height={80}
                                alt='logo'
                                className='hidden lg:block'
                            />
                            <img 
                                src={logo}
                                width={180}
                                height={60}
                                alt='logo'
                                className='lg:hidden'
                            />
                        </Link>
                    </div>

                    {/**Search */}
                    <div className='hidden lg:block'>
                        <Search/>
                    </div>

                    {/**login and my cart */}
                    <div className=''>
                        <button className='text-neutral-600 lg:hidden' onClick={handleMobileUser}>
                            <FaRegCircleUser size={26}/>
                        </button>

                        {/* dekstop */}
                        <div className='hidden lg:flex  items-center gap-10'>
                        {
                            user?._id ? (
                                <div className='relative'>
                                    <div onClick={()=>setOpenUserMenu(preve => !preve)} className='flex select-none items-center gap-1 cursor-pointer'>
                                        <p>Account</p>
                                        {
                                            openUserMenu ? (
                                                <GoTriangleUp size={25}/> 
                                            ) : (
                                                <GoTriangleDown size={25}/>
                                            )
                                        }
                                    </div>
                                    {
                                        openUserMenu && (<div className='absolute top-12 right-0 '>
                                            <div className='bg-white p-4 min-w-52 rounded lg:shadow-lg'>
                                                <UserMenu close={handleCloseUserMenu}/>
                                            </div>
                                        </div>
                            )}
                                </div>
                            ):(
                                <button onClick={redirectToLoginPage} className='text-lg px-2'> Login</button>

                            )
                        }
                            <button className='flex items-center gap-2 bg-green-800 hover:bg-green-700 px-3 py-2 rounded text-white'>
                                {/* add to card icons */}
                                <div className='animate-bounce'>
                                    <BsCart4 size={26}/>
                                </div>
                                <div className='font-semibold text-sm'>
                                    <p>My Cart</p>
                                </div>
                            </button>
                        </div>
                    </div>
                
                </div>
            )
        }
        
        <div className='container mx-auto px-2 lg:hidden'>
            <Search/>
        </div>
    </header>
)
}

export default Header