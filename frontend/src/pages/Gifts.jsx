import React, { useState } from 'react';
import Header from '../components/Header';
import { Gift, CreditCard, Sparkles, User, MessageSquare, QrCode, PhoneCall, } from 'lucide-react';
import { CiBank } from "react-icons/ci";
import { useLanguage } from '../context/LanguageContext';
import { useCreateGift } from '../TranstackQuery/GiftQuery'; // Import useCreateGift
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useGetMe } from '../TranstackQuery/AuthQuery';

function Gifts() {
    const [FullName, setFullName] = useState('');
    const [Phone, setPhone] = useState('');
    const [iban, setIban] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const { t } = useLanguage();
    const navigate = useNavigate();

    const { mutate, isPending } = useCreateGift(); // Destructure mutate and isPending
    const { data: User } = useGetMe()

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const dataform = {
                expectedRecipient: {
                    FullName, // Ensure key matches backend (FullName vs name) - backend modal says 'FullName'
                    phone: Phone, // Ensure key matches backend (phone vs Phone) - backend modal says 'phone'
                    iban,
                    description,
                },
                amount,
            }
            // Call mutate function
            mutate(dataform, {
                onSuccess: (data) => {
                    // Reset form
                    console.log("Gift created successfully", data);
                    console.log("Gift created successfully id", data?.data?.gift?._id);
                    navigate(`/gift-qr/${data?.data?.gift?._id}`);
                    toast.success("Gift created successfully");
                    setFullName('');
                    setPhone('');
                    setIban('');
                    setDescription('');
                    setAmount('');
                },
                onError: (error) => {
                    // Error is already handled in useCreateGift, but we can add extra handling here if needed
                    console.log(error);
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <section className='bg-primary-bg w-full h-screen relative flex flex-col overflow-hidden'>
            <div className="sticky top-0 z-50 bg-primary-bg/95 backdrop-blur-sm">
                <Header />
            </div>

            {/* Background Decoration */}
            <div className="fixed top-0 left-0 -z-10 opacity-30 pointer-events-none">
                <div className="w-[500px] h-[500px] bg-emerald-500/20 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            </div>
            <div className="fixed bottom-0 right-0 -z-10 opacity-20 pointer-events-none">
                <div className="w-[400px] h-[400px] bg-amber-500/20 blur-[100px] rounded-full translate-x-1/3 translate-y-1/3"></div>
            </div>

            <div className="flex-1 overflow-y-auto w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                <div className="max-w-md md:max-w-6xl mx-auto pb-40 pt-10 px-6">

                    {/* Header Section */}
                    <header className="text-center mb-8 md:mb-12 relative z-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-lg shadow-emerald-500/10 mb-6 animate-fade-scale">
                            <Gift className="w-8 h-8 text-red-600" />
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-2 leading-tight">
                            {t('createGiftTitle')} <span className="text-red-600 ">{t('createGiftSubtitle')}</span>
                        </h1>
                        <p className="text-slate-500 text-sm font-medium">{t('giftHeroText')}</p>
                    </header>

                    <div className="grid md:grid-cols-12 gap-8 items-start">
                        {/* Gift Card Preview - Takes 5 cols on desktop */}
                        <div className="md:col-span-12 lg:col-span-5 md:order-last lg:order-last mb-10 md:mb-0 relative group perspective-1000 md:sticky md:top-8">
                            <div className="relative aspect-[1.58/1] w-full rounded-2xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.02] transform-style-3d">
                                {/* Card Background */}
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-emerald-800 to-black">
                                    <img
                                        className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30"
                                        src="https://images.unsplash.com/photo-1607344645866-009c320b63e0?q=80&w=2000&auto=format&fit=crop"
                                        alt="Texture"
                                    />

                                    {/* Card Content */}
                                    <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <Sparkles className="w-4 h-4 text-amber-400" />
                                                    <p className="text-amber-400 text-[10px] uppercase tracking-[0.2em] font-bold">{t('premiumGift')}</p>
                                                </div>
                                            </div>
                                            <div className="bg-white/10 backdrop-blur-md rounded-xl p-2 border border-white/10 shadow-lg">
                                                <div className="bg-white rounded-lg p-1.5">
                                                    <QrCode className="w-8 h-8 text-slate-900" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-1 ml-auto text-right w-full">
                                            <p className="text-emerald-100/60 text-xs font-medium mb-1">{t('giftTo')}</p>
                                            <h3 className="text-white text-2xl font-bold truncate">
                                                {FullName || t('recipientName')}
                                            </h3>
                                        </div>

                                        <div className="flex justify-between items-end border-t border-white/10  mt-2">
                                            <div>
                                                <p className="text-emerald-100/60 text-[10px] font-mono tracking-wider mb-1">VALUE</p>
                                                <div className="flex items-baseline gap-1 ">
                                                    <span className="text-white text-3xl font-bold tracking-tight ">
                                                        {amount || '00'}
                                                    </span>
                                                    <span className="text-emerald-400 text-xs font-bold">{t('currency')}</span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-emerald-100/40 text-[8px] font-mono">{t('giftId')}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form Section - Takes 7 cols on desktop */}
                        <main className="md:col-span-12 lg:col-span-7 space-y-5 relative z-10">
                            <form
                                onSubmit={!User ? () => navigate('/register') : handleSubmit}
                                className="bg-white/50 backdrop-blur-sm p-6 rounded-3xl border border-white/40 shadow-sm md:p-8">
                                <div className="space-y-5">


                                    <div className="group relative">
                                        <div className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-emerald-600 transition-colors">
                                            <Gift className="w-5 h-5" />
                                        </div>
                                        <input
                                            type="text"
                                            value={FullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            placeholder={t('recipientName')}
                                            className="w-full bg-white border border-slate-200 rounded-xl py-3.5 pl-4 pr-12 text-right focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all shadow-sm text-slate-800 placeholder:text-slate-400"
                                        />
                                    </div>
                                    <div className="group relative">
                                        <div className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-emerald-600 transition-colors">
                                            <PhoneCall className="w-5 h-5" />
                                        </div>
                                        <input
                                            type="tel"
                                            value={Phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            placeholder={t('recipientPhone')}
                                            className="w-full bg-white border border-slate-200 rounded-xl py-3.5 pl-4 pr-12 text-right focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all shadow-sm text-slate-800 placeholder:text-slate-400"
                                        />
                                    </div>
                                    <div className="group relative">
                                        <div className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-emerald-600 transition-colors">
                                            <CreditCard className="w-5 h-5" />
                                        </div>
                                        <input
                                            type="number"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            placeholder={t('giftValue')}
                                            className="w-full bg-white border border-slate-200 rounded-xl py-3.5 pl-4 pr-12 text-right focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all shadow-sm text-slate-800 placeholder:text-slate-400"
                                        />
                                    </div>
                                    <div className="group relative">
                                        <div className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-emerald-600 transition-colors">
                                            <CiBank className="w-5 h-5" />
                                        </div>
                                        <input
                                            type="text"
                                            value={iban}
                                            onChange={(e) => setIban(e.target.value)}
                                            placeholder={t('iban')}
                                            className="w-full bg-white border border-slate-200 rounded-xl py-3.5 pl-4 pr-12 text-right focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all shadow-sm text-slate-800 placeholder:text-slate-400"
                                        />
                                    </div>

                                    <div className="group relative">
                                        <div className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-emerald-600 transition-colors">
                                            <MessageSquare className="w-5 h-5" />
                                        </div>
                                        <textarea
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            placeholder={t('giftMessagePlaceholder')}
                                            rows="3"
                                            className="w-full bg-white border border-slate-200 rounded-xl py-3.5 pl-4 pr-12 text-right focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all shadow-sm text-slate-800 placeholder:text-slate-400 resize-none"
                                        ></textarea>
                                    </div>

                                    {/* Desktop Button (Hidden on Mobile) */}
                                    <div className="hidden md:block pt-4">
                                        <button

                                            type="submit"
                                            disabled={isPending}
                                            className="w-full bg-red-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:bg-red-700 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                                            {isPending ? (t('processing') || 'Processing...') : t('herosection_button')}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </main>
                    </div>
                </div>
            </div>

            {/* Mobile Fixed Bottom Action (Hidden on Desktop) */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-xl border-t border-slate-100 z-50">
                <div className="max-w-md mx-auto">
                    <button
                        type="submit"
                        onClick={!User ? () => navigate('/register') : handleSubmit}
                        disabled={isPending}
                        className="w-full bg-red-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:bg-red-700 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                        {isPending ? (t('processing') || 'Processing...') : t('herosection_button')}
                    </button>
                </div>
            </div>
        </section>
    );
}

export default Gifts;