import { createContext,useContext, useEffect, useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { useDispatch, useSelector } from "react-redux";
import { handleAddItemCart } from "../store/cartProduct";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { pricewithDiscount } from "../utils/PriceWithDiscount";
import { handleAddAddress } from "../store/addressSlice";
import { setOrder } from "../store/orderSlice";

export const GlobalContext = createContext(null)

export const useGlobalContext = ()=> useContext(GlobalContext)

const dispatch = useDispatch()
const [totalPrice,setTotalPrice] = useState(0)
const [notDiscountTotalPrice,setNotDiscountTotalPrice] = useState(0)
const [totalQty,setTotalQty] = useState(0)
const cartItem = useSelector(state => state.cartItem.cart)
const user = useSelector(state => state?.user)

const fetchCartItem = async() =>{
    try {
        
    } catch (error) {
        AxiosToastError(error)
    }
}

const updateCartItem = async() =>{
    try {
        
    } catch (error) {
        AxiosToastError(error)
    }
}

const deleteCartItem = async() =>{
    try {
        
    } catch (error) {
        AxiosToastError(error)
    }
}
const fetchAddress = async() =>{
    try {
        
    } catch (error) {
        AxiosToastError(error)
    }
}
const fetchOrder = async() =>{
    try {
        
    } catch (error) {
        AxiosToastError(error)
    }
}
const handleLogoutOut = () =>{

}

useEffect(() =>{
    fetchCartItem()
    handleLogoutOut()
    fetchAddress()
    fetchOrder()
},[user])


const GlobalProvider = () => {
  return (
    <GlobalContext.Provider value={{
        fetchCartItem,
        updateCartItem,
        deleteCartItem,
        fetchAddress,
        totalPrice,
        totalQty,
        notDiscountTotalPrice,
        fetchOrder
    }}>
        {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider