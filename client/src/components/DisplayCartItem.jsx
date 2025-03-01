import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoClose } from 'react-icons/io5'
import { useSelector } from 'react-redux'
import { useGlobalContext } from '../provider/GlobalProvider'
import imageEmpty from '../assets/empty_cart.webp'

const DisplayCartItem = ({close}) => {
    const { notDiscountTotalPrice, totalPrice ,totalQty} = useGlobalContext()
    const cartItem  = useSelector(state => state.cartItem.cart)
    const user = useSelector(state => state.user)
    const navigate = useNavigate()


  return (
    <section className='bg-neutral-900 fixed top-0 bottom-0 right-0 left-0 bg-opacity-70 z-50'>
        <div className='bg-white w-full max-w-sm min-h-screen max-h-screen ml-auto'>
            <div className='flex items-center p-4 shadow-md gap-3 justify-between'>
                <h2 className='font-semibold'>Cart</h2>
                <Link to={"/"} className='lg:hidden'>
                    <IoClose size={25}/>
                </Link>
                <button onClick={close} className='hidden lg:block'>
                    <IoClose size={25}/>
                </button>
            </div>
            <div className='min-h-[75vh] lg:min-h-[80vh] h-full max-h-[calc(100vh-150px)] bg-blue-50 p-2 flex flex-col gap-4'>
                <div>
                    {
                        cartItem[0] ? (
                            <div>

                            </div>

                        ):(
                            <div className='bg-white flex flex-col justify-center items-center'>
                                <img
                                    src={imageEmpty}
                                    className='w-full h-full object-scale-down'
                                />
                                <Link onClick={close} to={"/"} className='block bg-green-600 px-4 py-2 text-white rounded'>Shop Now</Link>
                            </div>
                        )
                    }
                </div>
                <div>
                    {
                        cartItem[0] && (
                            <div>

                            </div>
                        )
                    }
                </div>
                <div>
                    <h3></h3>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default DisplayCartItem