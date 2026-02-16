import React from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

function PageNotFound() {
    const { t } = useLanguage();
    return (
        <div
            className='flex flex-col items-center justify-center h-screen'
        >
            <h1 className='text-4xl font-bold text-red-600'>404</h1>
            <p className='text-2xl font-bold text-gray-600'>Page Not Found</p>
            <Link to='/'>
                <button
                    className='  w-full
                   text-center text-white bg-red-600 hover:bg-red-700 hover:scale-105 transition-all duration-300 rounded-2xl shadow-lg  px-4 py-5 md:py-2 
                  mt-[20px]
                '
                >
                    back to home
                </button>
            </Link>
        </div>
    )
}

export default PageNotFound