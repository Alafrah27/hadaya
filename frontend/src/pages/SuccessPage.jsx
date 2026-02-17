import { Link } from 'react-router-dom';
import { Check, Home, Gift } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

function SuccessPage() {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 overflow-hidden relative">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] left-[20%] w-64 h-64 bg-green-200/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '0s' }}></div>
                <div className="absolute bottom-[20%] right-[20%] w-80 h-80 bg-emerald-200/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 text-center border border-white/50 animate-fadeIn">

                {/* Animated Checkmark Circle */}
                <div className="mx-auto mb-8 w-24 h-24 bg-green-100 rounded-full flex items-center justify-center animate-bounce-soft relative">
                    <div className="absolute inset-0 bg-green-400 rounded-full opacity-20 animate-ping"></div>
                    <Check className="w-12 h-12 text-green-600 relative z-10" strokeWidth={3} />
                </div>

                <h1 className="text-3xl font-bold text-slate-800 mb-2">
                    {t('congratulations') || "Congratulations!"}
                </h1>

                <p className="text-slate-500 mb-8 text-lg">
                    {t('giftClaimSuccess') || "Your gift has been successfully claimed."}
                </p>

                {/* Action Button */}
                <Link
                    to="/"
                    className="w-full bg-red-600 shadow-lg text-white font-semibold py-4 px-6 rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-800 hover:scale-[1.02] transition-all shadow-lg shadow-slate-200"
                >
                    <Home className="w-5 h-5" />
                    {t('backToHome') || "Back to Home"}
                </Link>

            </div>

            {/* Footer Text */}
            <p className="mt-8 text-slate-400 text-sm font-medium">
                ShareGifts © {new Date().getFullYear()}
            </p>
        </div>
    );
}

export default SuccessPage;