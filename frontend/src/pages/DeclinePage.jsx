import React from 'react';
import { Link } from 'react-router-dom';
import { XCircle, Home, HeartHandshake } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

function DeclinePage() {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-primary-bg flex flex-col items-center justify-center p-3 relative">

            <div className="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 text-center border border-white/50 animate-fadeIn">

                {/* Icon */}
                <div className="mx-auto mb-6 w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center">
                    <XCircle className="w-10 h-10 text-slate-400" />
                </div>

                <h1 className="text-2xl font-bold text-slate-800 mb-2">
                    {t('giftDeclined') || "Gift Declined"}
                </h1>

                <p className="text-slate-500 mb-8">
                    {t('giftDeclinedDesc') || "You have declined this gift. The sender will be notified."}
                </p>

                <div className="bg-slate-50 rounded-xl p-4 mb-8 border border-slate-100">
                    <div className="flex items-center justify-center gap-2 text-slate-400 mb-1">
                        <HeartHandshake className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wider">{t('thankYou') || "THANK YOU"}</span>
                    </div>
                    <p className="text-sm text-slate-500">
                        {t('declineAppreciation') || "We appreciate your response."}
                    </p>
                </div>

                {/* Action Button */}
                <Link
                    to="/"
                    className="w-full bg-white border-2 border-slate-200 text-slate-700 font-semibold py-3.5 px-6 rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-50 hover:border-slate-300 transition-all"
                >
                    <Home className="w-5 h-5" />
                    {t('backToHome') || "Back to Home"}
                </Link>
            </div>

        </div>
    );
}

export default DeclinePage;