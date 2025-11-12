import { LogIn, LogInIcon, Search, ShoppingBag, UserRound } from 'lucide-react'
import React from 'react'

const Navbar = () => {
    return (
        <div className='w-full h-30 mx-auto px-12 flex flex-col bg-gray-200 justify-center shadow-md shadow-gray-400'>
            <div>
                <div>
                    <div className='flex justify-between items-center'>
                        <div className='bg-g h-13 w-55 border rounded-2xl flex items-center justify-between px-4 group outline-none hover:shadow-md hover:shadow-gray-400'>
                            <Search size={25}/>
                            <input type="search" className='h-full w-full outline-none text-md ml-1 group-hover:outline-1' placeholder='Search'/>
                        </div>
                        <h1 className='text-3xl font-mono font-bold'>Sufiyan Essense</h1>
                        <div className='flex gap-x-6'>
                            <div className='flex gap-x-2'>
                                <UserRound/>
                                <h1 className='text-lg font-bold uppercase'>Login</h1>
                            </div>
                            <div className='flex gap-x-2'>
                                <ShoppingBag/>
                                <h1 className='text-lg font-bold uppercase'>Cart</h1>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
