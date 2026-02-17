import React from 'react'
import { useLanguage } from '../context/LanguageContext'
import { Gift, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useLogin } from '../TranstackQuery/AuthQuery';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function LoginInput() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { mutateAsync: loginUser, isPending: isLoading } = useLogin();
    const navigate = useNavigate();
    const { t } = useLanguage();
    const LoginhandleSubmit = async (e) => {
        e.preventDefault();
        try {
            const dataform = { email, password };
            await loginUser(dataform, {
                onSuccess: () => {
                    toast.success("Login successfully");
                    navigate("/");
                },

            });
        } catch (error) {
            console.log(error);
        }
        setEmail('');
        setPassword('');
    }
    return (
        <div className='w-[500px]  bg-white flex flex-col gap-4 p-4 rounded-2xl shadow-sm  mx-auto '

        >
            <h3 className="flex items-center justify-center gap-2 font-sans text-center font-bold text-lg leading-1 bg-gradient-to-r from-red-700 to-red-500 bg-clip-text text-transparent"
            >
                {t('login')}
                <Gift className='w-8 h-8' color='red' />
            </h3>
            <form
                onSubmit={LoginhandleSubmit}
                className='space-y-6'>

                <div className='flex flex-col gap-1'>
                    <label
                        className='text-[16px] text-gray-600  font-medium leading-1.5 '
                        htmlFor="email">{t('lableEmail')}</label>

                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type='email'
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
                        htmlFor="email">{t('lablePassword')}</label>

                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type='password'
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
                    {isLoading ? <Loader2 className='animate-spin' /> : t('loginButton')}
                </button>
                <p className='flex items-center justify-center gap-2 text-center text-gray-600'>
                    {t('dontHaveAccount')}
                    <Link to='/register' className='text-red-600 hover:text-red-700'>
                        {t('registerLink')}
                    </Link>
                </p>
                <p className='flex items-center justify-center gap-2 text-center text-gray-600'>
                    <Link to='/forget-password' className='text-red-600 hover:text-red-700'>
                        {t('forgotPassword')}
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default LoginInput