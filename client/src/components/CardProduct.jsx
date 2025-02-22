import React from 'react'
import { Link } from 'react-router-dom'


const CardProduct = ({data}) => {
    const url = `/product/${data.name}-${data._id}`
  
  return (
    <Link to={url} className='border py-2 lg:p-4 grid gap-1 lg:gap-3 min-w-36 lg:min-w-52 rounded cursor-pointer bg-white' >
      <div className='min-h-20 w-full max-h-24 lg:max-h-32 rounded overflow-hidden'>
        <img 
            src={data.image[0]}
            className='w-full h-full object-scale-down lg:scale-125'
        />
      </div>
      <div className='px-2 lg:px-0 font-medium text-ellipsis text-sm lg:text-base line-clamp-2'>
        {data.name}
      </div>
      <div className='w-fit gap-1 px-2 lg:px-0 text-sm lg:text-base'>
        {data.unit} 
        
      </div>

      

    </Link>
  )
}

export default CardProduct