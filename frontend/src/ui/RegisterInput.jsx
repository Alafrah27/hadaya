import React, { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { Gift, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRegister } from '../TranstackQuery/AuthQuery';

function RegisterInput() {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const { mutate: registerUser, isPending: isLoading } = useRegister();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formdata = {
                name: formData.name,
                email: formData.email,
                password: formData.password
            }
            registerUser(formdata, {
                onSuccess: () => {
                    toast.success("Register successfully");
                    navigate("/verify-email");
                },

            })
        } catch (error) {
            console.log(error);
        }


    };

    return (
        <div className='w-[500px]  bg-white flex flex-col gap-4 p-4 rounded-2xl shadow-sm  mx-auto '>
            <h3 className="flex items-center justify-center gap-2 font-sans text-center font-bold text-lg leading-1 bg-gradient-to-r from-red-700 to-red-500 bg-clip-text text-transparent">
                {t('register')}
                <Gift className='w-8 h-8' color='red' />
            </h3>
            <form className='space-y-6' onSubmit={handleSubmit}>
                <div className='flex flex-col gap-1'>
                    <label
                        className='text-[16px] text-gray-600  font-medium leading-1.5 '
                        htmlFor="name">{t('lableUsername')}</label>

                    <input
                        type='text'
                        name='name'
                        id='name'
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t('username')}
                        className='w-full h-12 px-4 py-5 md:py-2 border-2 rounded-2xl
                    outline-none border-gray-200 
                    focus:ring-2 focus:ring-gray-200
                    font-normal 
                    transition-all duration-300 ease-in-out
                    hover:border-gray-400
                    '
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <label
                        className='text-[16px] text-gray-600  font-medium leading-1.5 '
                        htmlFor="email">{t('lableEmail')}</label>

                    <input
                        type='email'
                        name='email'
                        id='email'
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t('email')}
                        className='w-full h-12 px-4 py-5 md:py-2 border-2 rounded-2xl
                    outline-none border-gray-200 
                    focus:ring-2 focus:ring-gray-200
                    font-normal 
                    transition-all duration-300 ease-in-out
                    hover:border-gray-400
                    '
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <label
                        className='text-[16px] text-gray-600  font-medium leading-1.5 '
                        htmlFor="password">{t('lablePassword')}</label>

                    <input
                        type='password'
                        name='password'
                        id='password'
                        value={formData.password}
                        onChange={handleChange}
                        placeholder={t('password')}
                        className='w-full h-12 px-4 py-5 md:py-2 border-2 rounded-2xl
                    outline-none border-gray-200 
                    focus:ring-2 focus:ring-gray-200
                    font-normal 
                    transition-all duration-300 ease-in-out
                    hover:border-gray-400
                    '
                    />
                </div>
                <button
                    disabled={isLoading}
                    className='  w-full
                   text-center text-white bg-red-600 hover:bg-red-700 hover:scale-105 transition-all duration-300 rounded-2xl shadow-lg  px-4 py-5 md:py-2 
                  mt-[20px] flex items-center justify-center
                '
                >
                    {isLoading ? <Loader2 className='animate-spin' /> : t('registerButton')}
                </button>
                <p className='flex items-center justify-center gap-2 text-center text-gray-600'>
                    {t('haveAccount')}
                    <Link to='/login' className='text-red-600 hover:text-red-700'>
                        {t('loginLink')}
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default RegisterInput