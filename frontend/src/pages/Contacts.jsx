
import React from 'react';
import Header from '../components/Header';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

function Contacts() {
    const { t } = useLanguage();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
    };

    return (
        <section className="bg-primary-bg min-h-screen flex flex-col">
            <Header />

            <div className="flex-grow container mx-auto px-4 py-12">
                {/* Hero Section */}
                <div className="text-center mb-12 md:mb-20 animate-fade-scale">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 font-['Outfit']">
                        {t('getInTouch')} <span className="text-purple-600">{t('touch')}</span>
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        {t('contactHeroText')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-start max-w-7xl mx-auto">

                    {/* Contact Information & Socials */}
                    <div className="space-y-8 animate-fade-scale" style={{ animationDelay: '0.2s' }}>
                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('contactInfo')}</h2>

                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="p-3 bg-purple-50 rounded-lg text-purple-600">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800">{t('ourLocation')}</h3>
                                        <p className="text-gray-600">{t('locationText')}</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800">{t('emailUs')}</h3>
                                        <p className="text-gray-600">hello@sharegifts.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="p-3 bg-green-50 rounded-lg text-green-600">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800">{t('callUs')}</h3>
                                        <p className="text-gray-600">+1 (555) 123-4567</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Media Links */}
                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('followUs')}</h2>
                            <div className="flex space-x-6 justify-center md:justify-start">

                                {/* Snapchat */}
                                <a href="#" className="transform hover:scale-110 transition-transform duration-300 group">
                                    <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-md group-hover:shadow-yellow-200 group-hover:shadow-lg">
                                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                                            <path d="M12.005 2c-3.791 0-5.75 1.55-5.75 3.32 0 1.25.754 2.14 1.355 2.52.275.18.254.34.156.63-.12.3-.288.66-.462 1.05-.18.41-.092.59.348.8.44.2.98.39 1.13.88.06.2.03.44-.1.68-.37.71-1.39 1.58-1.55 2.16-.14.51.35.82 1.22.68.32-.05.69-.11 1.09-.12.78-.01.88.42.75.92-.12.48-.48 1.63-.58 2.01-.11.45.19.78.82.78 1.45 0 1.76-1.15 2.92-1.15 1.08 0 1.48 1.15 2.85 1.15.68 0 .97-.33.86-.78-.1-.38-.46-1.53-.58-2.01-.13-.5.03-.93.75-.92.4.01.77.07 1.09.12.87.14 1.36-.17 1.22-.68-.16-.58-1.18-1.45-1.55-2.16-.13-.24-.16-.48-.1-.68.15-.49.69-.68 1.13-.88.44-.21.53-.39.35-.8-.18-.39-.35-.75-.47-1.05-.1-.29-.12-.45.16-.63.6-.38 1.35-1.27 1.35-2.52 0-1.77-2.04-3.32-5.83-3.32z" />
                                        </svg>
                                    </div>
                                </a>

                                {/* Twitter (X) */}
                                <a href="#" className="transform hover:scale-110 transition-transform duration-300 group">
                                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center shadow-md group-hover:shadow-gray-400 group-hover:shadow-lg">
                                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                        </svg>
                                    </div>
                                </a>

                                {/* TikTok */}
                                <a href="#" className="transform hover:scale-110 transition-transform duration-300 group">
                                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center shadow-md group-hover:shadow-gray-400 group-hover:shadow-lg relative overflow-hidden">
                                        {/* TikTok's distinct gradient effect can be complex, using black for simplicity and brand recognition */}
                                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white z-10">
                                            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.65-1.62-1.12-1.4 6.78-4.38 10.9-10.46 9.38-2.61-.65-4.83-2.31-5.76-4.82-1.07-2.88.2-5.99 2.97-7.23 2.77-1.24 6.07-.36 7.91 2.08.38.5.69 1.05.92 1.63H6.26c-1.39-4.82 5.09-7.24 7.27-3.04.4.77.67 1.61.76 2.47h6.53c-.34-2.16-1.57-4.07-3.37-5.32-1.8-1.25-4.05-1.66-6.18-1.14V.02z" />
                                        </svg>
                                    </div>
                                </a>

                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-2xl shadow-xl animate-fade-scale border border-gray-100" style={{ animationDelay: '0.4s' }}>
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('sendMessage')}</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium text-gray-700">{t('fullName')}</label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
                                        placeholder={t('namePlaceholder')}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-gray-700">{t('emailAddress')}</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
                                        placeholder={t('emailPlaceholder')}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-sm font-medium text-gray-700">{t('subject')}</label>
                                <input
                                    type="text"
                                    id="subject"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
                                    placeholder={t('subjectPlaceholder')}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium text-gray-700">{t('message')}</label>
                                <textarea
                                    id="message"
                                    rows="4"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white resize-none"
                                    placeholder={t('messagePlaceholder')}
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-2"
                            >
                                <span>{t('sendBtn')}</span>
                                <Send size={18} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contacts;
