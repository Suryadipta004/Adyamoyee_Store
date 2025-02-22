import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import CardProduct from '../components/CardProduct'

const ProductListPage = () => {

  const [data, setData] = useState([])
  const [page,setPage] = useState(1)
  const [loading,setLoading] = useState(false)
  const [totalPage,setTotalPage] = useState(1)
  const params = useParams()
  const [DisplaySubCatory, setDisplaySubCategory] = useState([])
  const AllSubCategory = useSelector(state => state.product.allSubCategory)


  const subCategoryName = params.subCategory
  const categoryId = params.categoryId
  const subCategoryId = params.subCategoryId
   

  // console.log("categoryId",categoryId)
  // console.log("subCategoryId",subCategoryId)
  // console.log("subCategoryName",subCategoryName)


  // console.log("params",params)

  const fetchProductData = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getProductByCategoryAndSubCategory,
        data : {
          categoryId: categoryId,
          subCategoryId: subCategoryId,
          page: page,
          limit: 8
        }
      })

      const responseData = response.data

      if(responseData.success){
        if (responseData.page == 1) {
          setData(responseData.data)
        } else {
          setData([...data, ...responseData.data])
        }
      }
      
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProductData()
  }, [params])

  useEffect(() => {
    const sub = AllSubCategory.filter(s => {
      const filterData = s.category.some(el => {
        return el._id == categoryId
      })

      return filterData ? filterData : null
    })
    setDisplaySubCategory(sub)
  }, [params, AllSubCategory])


  // console.log("DisplaySubCatory",DisplaySubCatory)


  return (
    <section className='sticky top-24 lg:top-20'>
      <div className='container sticky top-24 mx-auto grid grid-cols-[90px,1fr] md:grid-cols-[200px,1fr] lg:grid-cols-[280px,1fr]'>
        <div className='min-h-[88vh] max-h-[88vh] overflow-y-scroll  grid gap-1 shadow-md scrollbarCustom bg-white py-2'>
          {
            DisplaySubCatory.map((sub,index)=>{
              const url = `/${sub?.category[0].name}/${sub.category[0]._id}/${sub.name}/${sub._id}`
              return(
                <Link to={url} className={`w-full p-2 lg:flex items-center lg:w-full lg:h-16 box-border lg:gap-4 border-b 
                  hover:bg-green-100 cursor-pointer
                  ${subCategoryId === sub._id ? "bg-green-100" : ""}
                `}>
                  <div className='w-fit max-w-28 mx-auto lg:mx-0 bg-white rounded  box-border'>
                    <img
                      src={sub.image}
                      alt='subCategory'
                      className='w-14 lg:h-14 lg:w-12 h-full object-scale-down'
                    />
                  </div>
                  <p className='-mt-6 lg:mt-0 text-xs text-center lg:text-left lg:text-base'>{sub.name}</p>
                </Link>
                
              )
            })
          }
        </div>
      

        <div className='sticky top-20'>
            <div className='bg-white shadow-md p-4 z-10'>
              <h3 className='font-semibold'>{subCategoryName}</h3>
            </div>

          <div>
            <div className='min-h-[80vh] max-h-[80vh] overflow-y-auto relative'>
              <div className=' grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4 '>
                {
                data.map((product,index)=>{
                  return(
                    <CardProduct
                    data={product}
                    key={product._id + "productSubCategory" + index}
                    />
                  )
                })
                }
              </div>
            </div>
          </div>
        </div>
    </div>
    </section>
  )
}

export default ProductListPage

