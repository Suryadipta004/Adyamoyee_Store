import React, { useEffect, useState } from 'react'
import {IoSearchOutline} from 'react-icons/io5'
import ProductCardAdmin from '../components/ProductCardAdmin.jsx'
import AxiosToastError from '../utils/AxiosToastError'
import SummaryApi from '../common/SummaryApi'
import Axios from '../utils/Axios'
import Loading from '../components/Loading'

const ProductAdmin = () => {
  const [data , setData] = useState([])
  const [search , setSearch] = useState("")
  const [loading , setLoading] = useState(false)
  const [page , setPage] = useState(1)
  const [totalPageCount,setTotalPageCount] = useState(1)


  const fetchProductData = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getProduct,
        data:{
          page : page,
          limit : 12,
          search : search
        }
      })
      const responseData = response.data
      if(responseData.success){
        setTotalPageCount(responseData.totalPageCount)
        setData(responseData.data)
      }
    }catch (error) {
      AxiosToastError(error)
    }finally{
      setLoading(false)
    }
  }


  useEffect(()=>{
    fetchProductData()
  },[page])


  const handleOnChange = (e)=>{
    const { value } = e.target
    setSearch(value)
    setPage(1)
  }
  const handleNext = ()=>{
    if(page !== totalPageCount){
      setPage(preve => preve + 1)
    }
  }
  const handlePrevious = ()=>{
    if(page > 1){
      setPage(preve => preve - 1)
    }
  }



  useEffect(()=>{
    let flag = true 

    const interval = setTimeout(() => {
      if(flag){
        fetchProductData()
        flag = false
      }
    }, 300);

    return ()=>{
      clearTimeout(interval)
    }
  },[search])



  
  return (
    <section className=''>
      <div className='p-2 bg-white shadow-md flex items-center justify-between gap-4'>
        <h2 className='font-semibold'>Products</h2>
        <div className='bg-blue-50 h-full w-full min-w-24 max-w-56 ml-auto px-4 flex items-center gap-3 py-2 border focus-within:border-primary-200'>
          <IoSearchOutline size={25}/>
          <input
          type='text'
          placeholder='Search products here ....'
          className='h-full outline-none w-full bg-transparent'
          value={search}
          onChange={handleOnChange}
          />
        </div>
      </div>
      {
          loading && (
            <Loading/>
          )
        }

    <div className='p-4 bg-blue-50'>
      <div className='min-h-[55vh]'>
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
          {
            data.map((p,index)=>{
              return(
                <ProductCardAdmin data={p} fetchProductData={fetchProductData}  />
              )
            })
          }
        </div>
      </div>
      <div className='flex justify-between my-4'>
        <button onClick={handlePrevious} className='border border-primary-200 px-4 py-1 hover:bg-primary-200'>Previous</button>
        <button className='w-full bg-slate-100'>{page}/{totalPageCount}</button>
        <button onClick={handleNext} className='border border-primary-200 px-4 py-1 hover:bg-primary-200'>Next</button>
      </div>
    </div>

    
    </section>
  )
}

export default ProductAdmin