import { Link, NavLink } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Gift, Globe, Menu, X, Home, Phone, ArrowRight, ArrowLeft, User } from 'lucide-react';

import { useEffect, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';
const menuItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Gifts", path: "/gifts", icon: Gift },
    { name: "Contact", path: "/contact", icon: Phone },
    { name: "Login", path: "/login", icon: User },
];
export default function Header() {
    const { t, toggleLanguage, language } = useLanguage();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    console.log('Current language:', language);
    const menuRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);


        return () => {
            document.addEventListener('mousedown', handleClickOutside);

        };
    }, []);

    return (
        <header className="  bg-white md:bg-transparent w-full  shadow-2xs sticky top-0 z-50 h-[80px]  md:h-[60px]">

            <div className='w-full  flex justify-between items-center
             px-4 py-3 md:px-8 md:py-4'

            >
                {/* logo */}
                <div className='flex items-center '>
                    <Gift className='w-12 md:w-8 h-12 md:h-8' color='red' />
                    <span className='text-xl font-bold'>
                        {t('logo')}

                    </span>
                </div>
                {/* links */}
                <div className='hidden md:flex gap-4'>
                    <NavLink
                        className={({ isActive }) => isActive ? 'text-red-500' : 'text-gray-500 hover:text-gray-800 font-semibold'} to="/">
                        {t('home')}
                    </NavLink>
                    <NavLink
                        className={({ isActive }) => isActive ? 'text-red-500' : 'text-gray-500 hover:text-gray-800'} to="/gifts">
                        {t('gifts')}
                    </NavLink>
                    <NavLink
                        className={({ isActive }) => isActive ? 'text-red-500' : 'text-gray-500 hover:text-gray-800'} to="/contact">
                        {t('contact')}
                    </NavLink>


                </div>

                {/* lng and login btn */}
                <div className=' hidden md:flex items-center gap-4'>
                    <button onClick={toggleLanguage} className='flex items-center 
                    hover:text-gray-800
                     md:bg-blue-600
                     px-4 py-3 px5 rounded
                     md:text-white 
                     gap-2
                     '
                        style={{
                            paddingRight: "10px",
                            paddingLeft: "10px",
                            paddingTop: "7px",
                            paddingBottom: "7px"
                        }}
                        aria-label="Toggle Language"
                    >
                        {/* <span className='text-sm font-normal '>
                            {t('languageName')}
                        </span> */}
                        <span className='text-sm font-normal '>
                            {t('languageName')}
                        </span>
                        <Globe className='w-4 h-4' />
                    </button>
                    <button
                        onClick={() => navigate('/login')}
                        className=' hover:text-gray-800 bg-[#b42323] text-white px-4  rounded'
                        style={{
                            paddingRight: "8px",
                            paddingLeft: "8px",
                            paddingTop: "5px",
                            paddingBottom: "5px"
                        }}
                    >
                        {t('login')}
                    </button>
                </div>
                {/* mobile menu */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className='block md:hidden   bg-slate-900 text-white px-4  rounded'
                    style={{
                        paddingRight: "8px",
                        paddingLeft: "8px",
                        paddingTop: "5px",
                        paddingBottom: "5px"
                    }}
                    aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
                >
                    {isMenuOpen ? <X className='w-5 h-5' /> : <Menu className='w-5 h-5' />}
                </button>

                {/* mobile menu */}

            </div>
            {isMenuOpen && (
                <div
                    ref={menuRef}
                    className="absolute top-20 w-full bg-white shadow-xl border-t border-gray-100 z-50">
                    {menuItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <div key={item.name} className="border-b border-gray-100 space-y-2">
                                <Link
                                    className="flex items-center
                                 justify-between px-6 py-4 
                                
                                 hover:bg-red-50 transition"
                                    key={item.name}
                                    to={item.path}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <div className="flex items-center gap-3 text-gray-700">
                                        <Icon className="w-5 h-5" />
                                        <span className="font-medium">
                                            {t(item.name.toLowerCase())}
                                        </span>
                                    </div>

                                    {language === "en" ?
                                        <ArrowRight className="w-4 h-4 text-gray-400" /> : <ArrowLeft className="w-4 h-4 text-gray-400" />}
                                </Link>

                            </div>


                        );
                    })}
                    <div className="flex flex-col w-full px-3 py-4">
                        <button
                            onClick={toggleLanguage}
                            className="flex items-center gap-5 px-4 py-3 rounded-xl text-gray-700 hover:text-red-600 hover:bg-red-50 transition">
                            🌍 {language === "en" ? "العربية" : "English"}
                        </button>

                        {/* CTA Button */}
                        <Link
                            to="/send-gift"

                            className="mt-4 bg-red-600 text-white text-center py-3 rounded-2xl font-semibold shadow-lg hover:bg-red-700 hover:scale-105 transition-all duration-300"
                        >
                            {t('herosection_button')}
                        </Link>
                    </div>
                </div>
            )}

        </header>
    );
}



