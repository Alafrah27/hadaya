import React, { useRef } from 'react';
import Header from '../components/Header';
import { useGenerateGiftQR } from '../TranstackQuery/GiftQuery';
import { useParams } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { toPng } from 'html-to-image';
import { useLanguage } from '../context/LanguageContext';
import { toast } from 'react-toastify';
import { Check } from 'lucide-react';

function QRcode() {
    const { id } = useParams(); // Start with ID for now, might need slug depending on flow
    const { data: giftData, isLoading, error } = useGenerateGiftQR(id);
    const { t, isRTL } = useLanguage();
    const qrCardRef = useRef(null);

    const handleDownload = async () => {
        if (qrCardRef.current) {
            try {
                const dataUrl = await toPng(qrCardRef.current, { cacheBust: true, });
                const link = document.createElement('a');
                link.download = `gift-${giftData?.gift?.giftCode || 'qr'}.png`;
                link.href = dataUrl;
                link.click();
            } catch (err) {
                console.error('Download failed', err);
                toast.error("Failed to download image");
            }
        }
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: t('logo'),
                    text: t('herostion_subtitle'),
                    url: window.location.href,
                });
            } catch (err) {
                console.error('Share failed', err);
            }
        } else {
            toast.info(t('shareNotSupported'));
        }
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success(t('linkCopied'));
    };

    if (isLoading) return <div className="flex justify-center items-center h-screen">{t('processing')}</div>;
    // if (error) return <div className="text-center text-red-500 mt-10">Error loading gift</div>;

    const qrValue = giftData?.qr || "";
    const gift = giftData?.gift || {};

    // Format date
    const expiryDate = gift.createdAt ? new Date(new Date(gift.createdAt).setFullYear(new Date(gift.createdAt).getFullYear() + 1)).toLocaleDateString(isRTL ? 'ar-EG' : 'en-US', { year: 'numeric', month: 'long' }) : "---";


    return (
        <section className='bg-primary-bg w-full h-screen flex flex-col'>
            <Header />
            <main className="flex-1 flex flex-col items-center px-8 pb-12 overflow-y-auto">
                {/* <!-- Success Icon & Message --> */}
                <div className="flex flex-col items-center mb-10 text-center mt-8">
                    <div className="w-20 h-20 bg-red-200 rounded-full flex items-center justify-center mb-6">
                        <span className="material-icons text-red-200 text-4xl">
                            <Check className='text-red-600 text-4xl' size={40} />
                        </span>
                    </div>
                    <h1 className="text-3xl font-bold mb-3 tracking-tight text-slate-800">{t('giftCreatedSuccess')}</h1>
                    <p className="text-slate-500 max-w-[280px] leading-relaxed">
                        {t('intro_step2_title')}
                    </p>
                </div>

                {/* <!-- Central QR Card --> */}
                <div className="w-full max-w-sm relative group">
                    {/* <!-- Decorative Glow Background --> */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-gold/30 rounded-xl blur-xl opacity-50"></div>

                    <div ref={qrCardRef} className="relative bg-white p-8 rounded-xl border-[3px] border-gold qr-card-shadow flex flex-col items-center">
                        <div className="w-full aspect-square bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100 overflow-hidden mb-6 p-4">
                            {/* <!-- QR Code --> */}
                            {/* Using the image from API if available, or generating one locally if needed. 
                                The API returns a base64 string in `qr`. We can use that directly as an image source.
                            */}
                            {qrValue ? (
                                <img src={qrValue} alt="QR Code" className="w-full h-full object-contain mix-blend-multiply opacity-90" />
                            ) : (
                                <div className="w-full h-full bg-gray-200 animate-pulse"></div>
                            )}
                        </div>
                        <div className="w-full flex justify-between items-center px-2">
                            <div className="flex flex-col items-start">
                                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">{t('giftNumber')}</span>
                                <span className="text-sm font-semibold tracking-widest text-slate-700 uppercase">{gift.giftCode || '---'}</span>
                            </div>
                            <div className="h-8 w-px bg-slate-200"></div>
                            <div className="flex flex-col items-end">
                                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">{t('expiryDate')}</span>
                                <span className="text-sm font-semibold text-slate-700">{expiryDate}</span>
                            </div>
                        </div>
                        {/* Watermark for potential screenshot */}
                        <div className="absolute bottom-2 opacity-10 text-[10px] uppercase font-bold tracking-widest pointer-events-none">
                            {t('logo')}
                        </div>
                    </div>
                </div>

                {/* <!-- Action Buttons Section --> */}
                <div className="w-full max-w-sm mt-12 space-y-4">
                    {/* <!-- Primary Action: Download --> */}
                    <button
                        onClick={handleDownload}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-lg shadow-lg flex items-center justify-center transition-all active:scale-[0.98]"
                    >
                        <span className="material-icons rtl:ml-2 ltr:mr-2">download</span>
                        {t('download')}
                    </button>
                    <div className="grid grid-cols-2 gap-4">
                        {/* <!-- Secondary Action: Share --> */}
                        <button
                            onClick={handleShare}
                            className="w-full border-2 border-primary/40 text-slate-700 font-semibold py-3.5 rounded-lg flex items-center justify-center hover:bg-primary/5 transition-all active:scale-[0.98]"
                        >
                            <span className="material-icons rtl:ml-2 ltr:mr-2 text-primary">share</span>
                            {t('share')}
                        </button>
                        {/* <!-- Tertiary Action: Copy Link --> */}
                        <button
                            onClick={handleCopyLink}
                            className="w-full bg-white border border-slate-200 text-slate-700 font-semibold py-3.5 rounded-lg flex items-center justify-center hover:bg-slate-50 transition-all active:scale-[0.98]"
                        >
                            <span className="material-icons rtl:ml-2 ltr:mr-2 text-slate-400"></span>
                            {t('copyLink')}
                        </button>
                    </div>
                </div>
            </main>
        </section>
    )
}

export default QRcode