import React, { useEffect, useState } from 'react'
import DisplayTable from '../components/DisplayTable.jsx'
import { createColumnHelper } from '@tanstack/react-table'
import SummaryApi from '../common/SummaryApi'
import { LuPencil } from "react-icons/lu";
import { MdDelete  } from "react-icons/md";
import { HiPencil } from "react-icons/hi";
import CofirmBox from '../components/CofirmBox'
import EditSubCategory from '../components/EditSubCategory.jsx'
import Axios from '../utils/axios'
import AxiosToastError from '../utils/AxiosToastError'
import UploadSubCategoryModel from '../components/UploadSubCategoryModel.jsx'
import ViewImage from '../components/ViewImage.jsx'

const SubCategoryPage = () => {

  const columnHelper = createColumnHelper()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [openDeleteConfirmBox, setOpenDeleteConfirmBox] = useState(false)
  const [deleteSubCategory, setDeleteSubCategory] = useState({_id : ""})
  const [openAddSubCategory,setOpenAddSubCategory] = useState(false)
  


  const fetchSubCategory = async()=>{
    try {
        setLoading(true)
        const response = await Axios({
          ...SummaryApi.getSubCategory
        })
        const { data : responseData } = response

        if(responseData.success){
          setData(responseData.data)
        }
    } catch (error) {
       AxiosToastError(error)
    } finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchSubCategory()
  })
  
  const columns = [
    columnHelper.accessor('name',{
    header: "Name"
  }),
    columnHelper.accessor('image',{
      header: "Image"
    }),
    columnHelper.accessor('category',{
      header: "Category"
    }),
    columnHelper.accessor("_id",{
      header: "Action"
    })
  ]

  const handleDeleteSubCategory = async()=>{
    try {
        const response = await Axios({
            ...SummaryApi.deleteSubCategory,
            data : deleteSubCategory
        })

        const { data : responseData } = response

        if(responseData.success){
           toast.success(responseData.message)
           fetchSubCategory()
           setOpenDeleteConfirmBox(false)
           setDeleteSubCategory({_id : ""})
        }
    } catch (error) {
      AxiosToastError(error)
    }
}

  return (
    <section>
      <div className='p-2 bg-white shadow-md flex items-center justify-between'>
        <h2 className='font-semibold'>Sub Category</h2>
        <button onClick={()=>{
          setOpenAddSubCategory(true)
        }} className='text-sm border border-primary-200 hover:bg-primary-200 px-3 py-1 rounded'> Add Sub Category</button>
      </div>
      <div className='overflow-auto w-full max-w-[95vw]'>
        <DisplayTable
          data={data}
          column={columns}
        />
      </div>
      {
        openAddSubCategory && (
          <UploadSubCategoryModel
            close={()=>setOpenAddSubCategory(false)}
            fetchData={fetchSubCategory}
          />
        )
      }
    </section>
  )
}

export default SubCategoryPage