import React, { useState } from 'react';
import Header from '../components/Header';
import { useLanguage } from '../context/LanguageContext';
import { useGetGiftBySlug, useClaimGift, useDeclineGift } from '../TranstackQuery/GiftQuery';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingApp from '../ui/LoadingApp';
import { Gift, Check, X, CreditCard, Phone, User, MessageSquare } from 'lucide-react';

function SenderDetail() {
    const { t, isRTL } = useLanguage();
    const { slug } = useParams();
    const navigate = useNavigate();

    const [isClaiming, setIsClaiming] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        iban: ''
    });

    const { data: giftData, isLoading, error } = useGetGiftBySlug(slug);
    const { mutate: claimGift, isPending: isClaimingPending } = useClaimGift();
    const { mutate: declineGift, isPending: isDecliningPending } = useDeclineGift();

    const gift = giftData?.data?.gift || {};

    const handleAccept = () => {
        setIsClaiming(true);
    };

    const handleReject = () => {
        if (window.confirm(t('confirmReject') || "Are you sure you want to reject this gift?")) {
            declineGift(slug, {
                onSuccess: () => {
                    toast.info(t('giftRejected') || "Gift rejected");
                    navigate('/decline');
                }
            });
        }
    };

    const handleClaimSubmit = (e) => {
        e.preventDefault();
        claimGift({ slug, data: formData }, {
            onSuccess: () => {
                toast.success(t('giftClaimed') || "Gift claimed successfully!");
                navigate('/success'); // Or to a success page
            }
        });
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    if (isLoading) return <LoadingApp />;

    if (error || !gift) return (
        <div className='bg-primary-bg flex flex-col items-center justify-center h-screen space-y-4'>
            <p className="text-slate-600 font-medium">
                {t('giftNotFound') || "Gift not found or expired."}
            </p>
            <button
                onClick={() => navigate('/')}
                className='px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors shadow-lg shadow-red-200'>
                {t('goHome') || "Go Back Home"}
            </button>
        </div>
    );

    return (
        <section className='bg-slate-50 w-full min-h-screen flex flex-col font-sans'>
            <Header />

            <main className='flex-1 flex flex-col items-center justify-center p-4 sm:p-6'>

                {/* Main Card */}
                <div className={`w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 transform ${isClaiming ? 'scale-100' : 'hover:scale-[1.01]'}`}>

                    {/* Header Gradient */}
                    <div className="bg-gradient-to-br from-red-500 to-rose-600 p-8 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner">
                                <Gift className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-white text-lg font-medium opacity-90">{t('youReceivedGift') || "You've received a gift!"}</h2>
                            <h1 className="text-4xl font-bold text-white mt-2 flex justify-center items-baseline gap-1">
                                {gift.amount} <span className="text-lg font-medium opacity-80">SAR</span>
                            </h1>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8">

                        {!isClaiming ? (
                            /* Gift Details View */
                            <div className="flex flex-col space-y-6 animate-fadeIn">
                                <div className="space-y-4">
                                    <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                        <div className="p-2 bg-rose-100 rounded-full">
                                            <User className="w-5 h-5 text-rose-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{t('from') || "FROM"}</p>
                                            <p className="text-slate-800 font-semibold text-lg">{gift.senderName || "Startups Team"}</p>
                                        </div>
                                    </div>

                                    {gift.message && (
                                        <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                            <div className="p-2 bg-amber-100 rounded-full">
                                                <MessageSquare className="w-5 h-5 text-amber-600" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{t('message') || "MESSAGE"}</p>
                                                <p className="text-slate-700 italic">"{gift.message}"</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-4 mt-6">
                                    <button
                                        onClick={handleReject}
                                        disabled={isDecliningPending}
                                        className="py-4 px-6 rounded-2xl border-2 border-slate-100 text-slate-600 font-semibold hover:bg-slate-50 hover:border-slate-200 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                                    >
                                        <X className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                        {t('reject') || "Reject"}
                                    </button>

                                    <button
                                        onClick={handleAccept}
                                        className="py-4 px-6 rounded-2xl bg-red-600 text-white font-bold shadow-lg shadow-red-200 hover:bg-red-700 hover:shadow-red-300 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group"
                                    >
                                        <Check className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                        {t('accept') || "Accept"}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            /* Claim Form View */
                            <form onSubmit={handleClaimSubmit} className="flex flex-col space-y-5 animate-slideUp">
                                <div className="text-center mb-2">
                                    <h3 className="text-xl font-bold text-slate-800">{t('verifyDetails') || "Verify Details"}</h3>
                                    <p className="text-sm text-slate-500">{t('verifyDetailsDesc') || "Please confirm your details to claim this gift."}</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="relative group">
                                        <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-400 group-focus-within:text-red-500 transition-colors" />
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder={t('fullName') || "Full Name"}
                                            required
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                                        />
                                    </div>

                                    <div className="relative group">
                                        <Phone className="absolute left-4 top-3.5 w-5 h-5 text-slate-400 group-focus-within:text-red-500 transition-colors" />
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            placeholder={t('phoneNumber') || "Phone Number"}
                                            required
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                                        />
                                    </div>

                                    <div className="relative group">
                                        <CreditCard className="absolute left-4 top-3.5 w-5 h-5 text-slate-400 group-focus-within:text-red-500 transition-colors" />
                                        <input
                                            type="text"
                                            name="iban"
                                            value={formData.iban}
                                            onChange={handleInputChange}
                                            placeholder={t('iban') || "IBAN Number"}
                                            required
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="pt-2 gap-3 flex flex-col sm:flex-row">
                                    <button
                                        type="button"
                                        onClick={() => setIsClaiming(false)}
                                        className="w-full sm:w-auto py-3.5 px-6 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors text-center"
                                    >
                                        {t('cancel') || "Cancel"}
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isClaimingPending}
                                        className="flex-1 py-3.5 px-6 rounded-xl bg-red-600 text-white font-bold shadow-lg shadow-red-200 hover:bg-red-700 hover:shadow-red-300 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                                    >
                                        {isClaimingPending ? (
                                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></span>
                                        ) : null}
                                        {t('confirmClaim') || "Confirm Claim"}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </main>
        </section>
    );
}

// Animations are handled in index.css
export default SenderDetail;