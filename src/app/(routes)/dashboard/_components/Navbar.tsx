import React from 'react'

const Navbar = () => {
    return (
        <>
            <div className='flex items-center gap-x-4 p-5 bg-teal-600'>
                <div className='hidden lg:flex-1 lg:flex bg-red-500'>Search</div>
                <div className='w-10 h-10 rounded-full bg-slate-500'></div>
            </div>
        </>
    )
}

export default Navbar