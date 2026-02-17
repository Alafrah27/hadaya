import React from 'react'
import FloatingGiftCard from './FloatCard'
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { useGetMe } from '../TranstackQuery/AuthQuery';

function HeroSection() {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const { data: User } = useGetMe();
    const CheckAuth = () => {
        if (!User) {
            navigate('/register');
            return;
        }

        navigate('/gifts');
    };


    return (
        <main className='w-full md:h-[100%] '>
            <div className='flex flex-col md:flex-row md:justify-between items-center md:justify-between gap-6 w-full h-full px-0 md:px-8 py-4'>
                <div className=" flex flex-col items-center  md:items-start gap-4 text-center md:text-left order-2 md:order-1 w-full mt-6">

                    <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight text-gray-900">
                        {t('herostion_title')} <br />
                        <span className="text-red-600">{t('herostion_title_2')}</span>
                    </h1>

                    <p className="text-base sm:text-lg text-gray-600 max-w-2xl px-2 md:px-0">
                        {t('herostion_subtitle')}
                    </p>

                    {/* CTA Button */}
                    <button
                        onClick={CheckAuth}
                        className="mt-4 bg-red-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:bg-red-700 hover:scale-105 transition-all duration-300">
                        {t('herosection_button')}
                    </button>

                </div>
                <div className="order-1 md:order-2 w-full md:w-2/3 flex justify-center px-2">
                    <FloatingGiftCard />
                </div>
            </div>
        </main>
    )
}

export default HeroSection