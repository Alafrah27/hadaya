import React from 'react'
import { useLanguage } from '../context/LanguageContext'

function AboutUs() {
    const { t } = useLanguage();
    return (
        <section className='w-full py-16 bg-white'>
            <div className='container mx-auto px-4 md:px-8'>
                <div className='flex flex-col md:flex-row items-center gap-12'>
                    {/* Image Side */}
                    <div className='w-full md:w-1/2'>
                        <img
                            src="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=2070&auto=format&fit=crop"
                            alt="Sharing Gifts"
                            className='rounded-3xl shadow-2xl w-full h-[400px] object-cover hover:scale-105 transition-transform duration-500'
                        />
                    </div>

                    {/* Content Side */}
                    <div className='w-full md:w-1/2 space-y-6 text-center md:text-left'>
                        <h2 className='text-3xl md:text-5xl font-bold text-gray-900 leading-tight'>
                            {t('aboutUsTitle')}
                            <span className='block text-red-600 text-lg md:text-2xl mt-2 font-medium'>
                                {t('aboutUsSubTitle')}
                            </span>
                        </h2>

                        <p className='text-gray-600 text-lg leading-relaxed'>
                            {t('aboutUsContent1')}
                        </p>

                        <p className='text-gray-600 text-lg leading-relaxed'>
                            {t('aboutUsContent2')}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutUs