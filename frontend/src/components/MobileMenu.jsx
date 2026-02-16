import { Link, useLocation } from "react-router-dom";
import { Gift, Globe, Menu, X, Home, Phone, ArrowRight } from 'lucide-react';


export default function MobileMenu({ isOpen, setIsOpen }) {
    const location = useLocation();

    const menuItems = [
        { name: "Home", path: "/", icon: Home },
        { name: "Gifts", path: "/gifts", icon: Gift },
        { name: "Contact", path: "/contact", icon: Phone },
    ];

    return (
        <>
            {/* Overlay */}
            <div
                onClick={() => setIsOpen(false)}
                className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 z-40 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
            />

            {/* Drawer */}
            <div
                className={`fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b">
                    <h2 className="text-xl font-bold text-red-600">Hadaya 🎁</h2>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 rounded-lg hover:bg-gray-100 transition"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Menu Links */}
                <nav className="flex flex-col px-6 py-6 space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;

                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                    ? "text-red-600 font-semibold bg-red-50 border-l-4 border-red-600"
                                    : "text-gray-700 hover:text-red-600 hover:bg-red-50"
                                    }`}
                            >
                                <Icon size={18} />
                                {item.name}
                            </Link>
                        );
                    })}

                    {/* Divider */}
                    <div className="border-t my-4" />

                    {/* Language Switch */}
                    <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:text-red-600 hover:bg-red-50 transition">
                        🌍 English
                    </button>

                    {/* CTA Button */}
                    <Link
                        to="/send-gift"
                        onClick={() => setIsOpen(false)}
                        className="mt-4 bg-red-600 text-white text-center py-3 rounded-2xl font-semibold shadow-lg hover:bg-red-700 hover:scale-105 transition-all duration-300"
                    >
                        Send a Gift ❤️
                    </Link>
                </nav>
            </div>
        </>
    );
}
