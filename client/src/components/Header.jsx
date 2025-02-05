import React from 'react'
import logo from '../assets/logo.png'


const Header = () => {
  return (
    <header className='h-24 lg:h-20 lg:shadow-md sticky top-0 z-40 flex flex-col justify-center gap-1 bg-white'>
        {/* logo */}
        <div>
            <img 
                src={logo} 
                width={170}
                height={60}
                alt='logo'
            />
        </div>
        {/* search */}

        {/* login and my cart */}
    </header>
)
}

export default Header