import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import uploadImage from '../utils/UploadImage';
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';


const UploadSubCategoryModel = ({close, fetchData}) => {
    // set the data with name and image fields
    const [data,setData] = useState({
        name : "",
        image : "",
        category: []
    })
    const allCategory = useSelector(state => state.product.allCategory)

    const [loading,setLoading] = useState(false)//set the loading state

    const handleOnChange = (e)=>{
        const { name, value} = e.target

        setData((preve)=>{
            return{
                ...preve,//spread the previous state
                [name] : value//set the value of the input field to the data state
            }
        })
    }

    const handleSubmitSubCategory = async(e)=>{
        e.preventDefault()//prevent the default action of the form

        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.createSubCategory,
                data : data
            })
            const responseData = response.data//get the response data

            if(responseData.success){
                toast.success(responseData.message)//show the success message
                if(close){
                    close()
                }
                if(fetchData){
                    fetchData()
                }
            }
        } catch (error) {
            AxiosToastError(error)//show the error
        }
    }

    const handleUploadSubCategoryImage = async(e)=>{
        const file = e.target.files[0]//get the file

        if(!file){
            return
        }

        const response = await uploadImage(file)
        const ImageResponse = response.data

        setData((preve)=>{
            return{
                ...preve,
                image : ImageResponse.data.url
            }
        })
    }
    const handleRemoveCategorySelected = (categoryId)=>{
        const index = data.category.findIndex(el => el._id === categoryId )
        data.category.splice(index,1)
        setData((preve)=>{
            return{
                ...preve
            }
        })
    }

  return (
    <section className='fixed top-0 bottom-0 left-0 right-0 p-4 bg-neutral-800 bg-opacity-60 flex items-center justify-center'>
        <div className='bg-white max-w-4xl w-full p-4 rounded'>
            <div className='flex items-center justify-between gap-3'>
                <h1 className='font-semibold'>Add Sub-Category</h1>
                <button onClick={close} className='w-fit block ml-auto'>
                    <IoClose size={25}/>
                </button>
            </div>
            <form className='my-3 grid gap-2' onSubmit={handleSubmitSubCategory}>
                <div className='grid gap-1'>
                    <label id='categoryName'>Name</label>
                    <input
                        id='name'
                        placeholder='Enter category name'
                        value={data.name}
                        name='name'
                        onChange={handleOnChange}
                        className='bg-blue-50 p-3 border border-blue-100 focus-within:border-primary-200 outline-none rounded'
                    />
                </div>
                <div className='grid gap-1'>
                    <p>Image</p>
                    <div className='flex flex-col lg:flex-row items-center gap-3'>
                        <div className='border h-36 w-full lg:w-36 bg-blue-50 flex items-center justify-center'>
                            {
                                !data.image ? (
                                    <p className='text-sm text-neutral-500'>No Image</p>
                                ) : (
                                    <img
                                        alt='category'
                                        src={data.image}
                                        className='w-full h-full object-scale-down'
                                    />
                                )
                            }
                            
                        </div>
                        <label htmlFor='uploadSubCategoryImage'>
                            <div className='px-4 py-1 border border-primary-100 text-primary-200 rounded hover:bg-primary-200 hover:text-neutral-900 cursor-pointer  '>
                                    Upload Image
                            </div>
                            <input
                            onChange={handleUploadSubCategoryImage} 
                            type='file' 
                            id='uploadSubCategoryImage' 
                            className='hidden'
                            />
                        </label>
                    </div>
                    <div className='grid gap-1'>
                        <label>Select Category</label>
                        <div className='border focus-within:border-primary-200 rounded'>
                        {/* display value */}
                            <div className='flex flex-wrap gap-2'>
                                {
                                    data.category.map((item,index)=>{
                                        return(
                                            <p key={item._id} className='bg-white shadow-md px-1 m-1 flex items-center gap-2'>
                                                {item.name}
                                                <div className='cursor-pointer hover:text-red-600' onClick={()=>handleRemoveCategorySelected(item._id)}>
                                                    <IoClose size={20}/>
                                                </div>
                                            </p>
                                        )
                                    })
                                }

                            </div>
                        {/* select category */}
                        <select 
                        className='w-full p-2 bg-transparent outline-none border'
                        onChange={(e)=>{
                                    const value = e.target.value
                                    const categoryDetails = allCategory.find(el => el._id == value)
                                    
                                    setData((preve)=>{
                                        return{
                                            ...preve,
                                            category : [...preve.category,categoryDetails]
                                        }
                                    })
                                }}
                            >
                            <option value={""}>
                                Select Catagory
                            </option>
                            {
                                    allCategory.map((category,index)=>{
                                        return(
                                            <option value={category?._id} key={category._id+"subcategory"}>{category?.name}</option>
                                        )
                                    })
                                }
                        </select>
                        </div>
                    </div>
                </div>

                <button
                    className={`
                    ${data?.name && data?.image && data?.category[0] ? "bg-primary-200 hover:bg-primary-100" : "bg-gray-300 "}
                    py-2    
                    font-semibold 
                    `}
                >Submit</button>
            </form>
        </div>
    </section>
  )
}
UploadSubCategoryModel.propTypes = {
    close: PropTypes.func.isRequired,  // Ensures `close` is a required function
    fetchData: PropTypes.func.isRequired,  // Ensures `fetchData` is a required function
  };

export default UploadSubCategoryModel