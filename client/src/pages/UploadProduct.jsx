import React from 'react'
import { useState } from 'react'

const UploadProduct = () => {


  const [data, setData] = useState({
    name: "",
    image: [],
    category: [],
    subCategory: [],
    unit: [],
    stock: "",
    price: "",
    discount: "",
    description: "",
    more_details: {}

  })


  const handleChange = (e) => {

  }
  const handleSubmit = (e) => {

  }
  const handleUploadImage = (e) => {

  }

  return (
    <section className=''>
      <div className='p-2 bg-white shadow-md flex items-center justify-between'>
        <h2 className='font-semibold'>Products</h2>
      </div>
      <div className='grid p-3'>
        <form className='grid gap-4' onSubmit={handleSubmit}>
          <div className='grid gap-1'>
            <label className='font-medium'>Name</label>
            <input
              className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
              id='name'
              type='text'
              placeholder='Enter product name'
              name='name'
              value={data.name}
              required
              onChange={handleChange}
            />
          </div>
          <div className='grid gap-1'>
            <label>Description</label>
            <input
              className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
              id='description'
              type='text'
              placeholder='Enter product description'
              name='description'
              value={data.description}
              required
              multiple
              rows={3}
              onChange={handleChange}
            />
          </div>
          <div>
            <p className='font-medium'>Image</p>
            <div>
            <label htmlFor='productImage' className='bg-blue-100 h-24 border rounded flex justify-center items-center cursor-pointer'>
              <div className='text-center flex justify-center items-center flex-col'>
                
                <p>Upload Image</p>
              </div>
              <input
                type='file'
                name='productImage'
                className='hidden'
                multiple
                accept='image/*'//accept only image files
                onChange={handleUploadImage}
              />
            </label>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}

export default UploadProduct