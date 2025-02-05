import React from 'react'
import { IoSearch } from 'react-icons/io5'
import { TypeAnimation } from 'react-type-animation';

const Search = () => {
  return (
    <div className='w-full min-w-[300px] lg:min-w-[420px] h-12 rounded-md border overflow-hidden flex items-center text-neutral-600 bg-slate-100'>
        <button className='flex justify-center items-center h-full p-3 '>
            <IoSearch size={22}/>
        </button>
        <div>
        <TypeAnimation
            sequence={[
                // Same substring at the start will only be typed out once, initially
                'Search "milk"',
                1000, // wait 1s or 1000ms before replacing "Mice" with "Hamsters"
                'Search "bread"',
                1000,
                'Search "sugar"',
                1000,
                'Search "panner"',
                1000,
                'Search "chocolate"',
                1000,
                'Search "curd"',
                1000,
                'Search "rice"',
                1000,
                'Search "egg"',
                1000,
                'Search "chips"',
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            />
        </div>
    </div>
  )
}

export default Search