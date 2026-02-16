import React from 'react'
import { useLanguage } from '../context/LanguageContext'

function EmotionalAttachPage() {
    const { t } = useLanguage();
    return (
        <main className='w-full bg-[#fef4e4] md:h-[500px] '>
            <div className='flex flex-col items-center justify-center gap-4 p-4 sm:p-8 sm:py-12 h-full'>
                <h2 className='text-xl md:text-2xl font-bold text-gray-900 text-center p-2'>
                    {t('emotional_story')}
                </h2>
                <h2 className='text-xl md:text-2xl font-bold text-gray-900 text-center p-2'>
                    {t('emotional_distance')}
                </h2>
                <h2 className='text-xl md:text-2xl font-bold text-gray-900 text-center p-2'>
                    {t('emotional_connection')}
                </h2>
            </div>
        </main>
    )
}

export default EmotionalAttachPage