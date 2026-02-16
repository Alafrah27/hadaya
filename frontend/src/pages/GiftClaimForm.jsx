import React, { useState } from 'react';
import Header from '../components/Header';
import { useLanguage } from '../context/LanguageContext';
import { useClaimGift, useDeclineGift, useGetGiftBySlug } from '../TranstackQuery/GiftQuery';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function GiftClaimForm() {
    const { t, isRTL } = useLanguage();
    const { slug } = useParams(); // Make sure route uses slug in App.jsx? Or id? The query below uses slug.
    // The previous implementation of Routes in App.jsx was: <Route path="/gifts/slug/form" element={<GiftClaimForm />} />
    // We should probably change the route to be dynamic e.g. /gift-claim/:slug

    const navigate = useNavigate();

    const { data: giftData, isLoading, error } = useGetGiftBySlug(slug); // Assuming this returns gift details
    const claimMutation = useClaimGift();
    const declineMutation = useDeclineGift();

    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        FullName: '',
        phone: '',
        iban: ''
    });

    // Handle initial Accept click
    const handleAcceptClick = () => {
        setShowForm(true);
    };

    const handleRejectClick = () => {
        if (window.confirm("Are you sure you want to reject this gift?")) {
            declineMutation.mutate(slug, {
                onSuccess: () => {
                    toast.success(t('giftRejected'));
                    navigate('/'); // Redirect to home or a status page
                }
            });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmitClaim = (e) => {
        e.preventDefault();
        claimMutation.mutate({ slug, data: formData }, {
            onSuccess: () => {
                toast.success(t('giftClaimed'));
                navigate('/'); // Redirect or show success state
            }
        });
    };

    if (isLoading) return <div className="flex justify-center items-center h-screen">{t('processing')}</div>;
    // Error handling could be more robust
    if (error) return <div className="text-center text-red-500 mt-10">Gift not found or expired.</div>;

    // The useGetGiftBySlug returns { sluq: { senderName, amount, message, status } } based on controller
    const gift = giftData?.sluq || {};

    return (
        <section className='bg-primary-bg w-full min-h-screen flex flex-col'>
            <Header />
            <main className="flex-1 flex flex-col items-center px-4 py-8 overflow-y-auto w-full max-w-md mx-auto">

                {/* Gift Card Display */}
                <div className="w-full bg-white rounded-2xl shadow-xl overflow-hidden mb-8 border border-gold/20">
                    <div className="bg-gradient-to-r from-primary/10 to-gold/10 p-6 flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md mb-3 text-2xl">
                            🎁
                        </div>
                        <h2 className="text-xl font-bold text-slate-800 mb-1">{t('giftFrom')} {gift.senderName}</h2>
                        <div className="text-3xl font-bold text-primary my-2">{gift.amount} SAR</div>
                    </div>
                    <div className="p-6">
                        <p className="text-slate-500 text-center italic mb-6">"{gift.message}"</p>

                        {!showForm ? (
                            <div className="space-y-3">
                                <button
                                    onClick={handleAcceptClick}
                                    className="w-full bg-primary text-white font-bold py-3.5 rounded-lg shadow-lg hover:bg-primary/90 transition-all"
                                >
                                    {t('acceptGift')}
                                </button>
                                <button
                                    onClick={handleRejectClick}
                                    className="w-full bg-white border border-red-200 text-red-500 font-bold py-3.5 rounded-lg hover:bg-red-50 transition-all"
                                >
                                    {t('rejectGift')}
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmitClaim} className="space-y-4 animate-fade-scale">
                                <h3 className="text-lg font-bold text-slate-800 mb-2">{t('claimGiftTitle')}</h3>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{t('fullName')}</label>
                                    <input
                                        type="text"
                                        name="FullName"
                                        value={formData.FullName}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary bg-slate-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{t('phone')}</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary bg-slate-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{t('iban')}</label>
                                    <input
                                        type="text"
                                        name="iban"
                                        value={formData.iban}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary bg-slate-50"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={claimMutation.isPending}
                                    className="w-full bg-primary text-white font-bold py-3.5 rounded-lg shadow-lg hover:bg-primary/90 transition-all mt-4 disabled:opacity-70"
                                >
                                    {claimMutation.isPending ? t('processing') : t('submitClaim')}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </main>
        </section>
    );
}

export default GiftClaimForm