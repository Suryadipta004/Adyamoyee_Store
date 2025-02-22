import React from 'react'
import banner from '../assets/banner.jpg'
import bannerMobile from '../assets/banner-mobile.jpg'
import { useSelector } from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay'

const Home = () => {
  const loadingCategory = useSelector(state => state.product.loadingCategory)
  const categoryData = useSelector(state => state.product.allCategory)
  const subCategoryData = useSelector(state => state.product.allSubCategory)
  const navigate = useNavigate()


  const handleRedirectProductListpage = (id,name) => {
    // console.log(id,name)
    const subcategory = subCategoryData.find(sub =>{
      // console.log(sub)
      const filterData = sub.category.some(c =>{
        return c._id == id
      })
      // console.log(filterData)
      return filterData ? true : false
    })
    // console.log(subcategory)


    const url = `/${name.replace(/[, &]/g, "")}/${id}/${subcategory.name.replace(/[, ]/g, "")}/${subcategory._id}`
    navigate(url)
    // console.log(url)

  }

  return (
    <section className='bg-white'>
      <div className='min-h-48 container mx-auto rounded  my-4 px-4'>
        <div className={`w-full h-full min-h-48 bg-blue-100 rounded ${!banner && "animate-pulse my-2" }`}>
          <img
            src={banner}
            alt='banner'
            className='w-full h-full hidden lg:block'
          />
          <img
            src={bannerMobile}
            alt='banner'
            className='w-full h-full lg:hidden'
          />
        </div>
      </div>


      <div className='container mx-auto px-4 my-2 grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10  gap-2'>
        {
          loadingCategory ? (
          new Array(12).fill(null).map((c,index)=>{
            return(
              <div key={index+"loadingcategory"} className='bg-white rounded p-4 min-h-36 grid gap-2 shadow animate-pulse'>
                <div className='bg-blue-100 min-h-24 rounded'></div>
                <div className='bg-blue-100 h-8 rounded'></div>
              </div>
            )
          })
          ):(
            categoryData.map((cat,index)=>{
                return(
                  <div key={cat._id+"displayCategory"} className='w-full h-full' onClick={()=>handleRedirectProductListpage(cat._id,cat.name)}>
                    <div>
                        <img 
                          alt={cat.name}
                          src={cat.image}
                          className='w-full h-full object-scale-down'
                          onError={(e) => (e.target.src = '/default-image.jpg')}
                        />
                    </div>
                  </div>
                )
              })
          )
        }
      </div>
      {
        categoryData?.map((c,index)=>{
          return(
            <CategoryWiseProductDisplay 
              key={c?._id+"CategorywiseProduct"} 
              id={c?._id} 
              name={c?.name}
            />
          )
        })
      }
    </section>
  )
}

export default Home