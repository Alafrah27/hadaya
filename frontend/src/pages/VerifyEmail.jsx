import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MailCheck, Loader2, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useOtpCode } from '../TranstackQuery/AuthQuery';

const VerifyEmail = () => {
    const { t } = useLanguage();
    const [otp, setOtp] = useState(['', '', '', '', '']);
    const navigate = useNavigate();
    const location = useLocation();
    const { mutate: VerifyOtpCode, isPending: isLoading } = useOtpCode();

    // Get user info from navigation state (passed from Register page)
    const userEmail = location.state?.email || 'your email';

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return;

        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        // Focus next input
        if (element.nextSibling && element.value) {
            element.nextSibling.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            const inputs = document.querySelectorAll('input[name="otp"]');
            if (inputs[index - 1]) {
                inputs[index - 1].focus();
            }
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6).split('');
        if (pastedData.length > 0) {
            const newOtp = [...otp];
            pastedData.forEach((value, index) => {
                if (index < 5 && !isNaN(value)) {
                    newOtp[index] = value;
                }
            });
            setOtp(newOtp);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const otpString = otp.join('');

        if (otpString.length !== 5) {
            toast.error(t('otpError'));
            return;
        }

        try {

            VerifyOtpCode({ otpCode: otpString }, {
                onSuccess: () => {
                    navigate('/');
                    toast.success('Email has been verified successfully');
                },

            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-6 sm:p-8 transform transition-all hover:scale-[1.01]">
                <div className="text-center mb-6 sm:mb-8">
                    <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                        <MailCheck className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">{t('verifyEmailTitle')}</h2>
                    <p className="text-sm sm:text-base text-slate-500">
                        {t('sentCodeTo')} <span className="font-semibold text-slate-700">{userEmail}</span>
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 sm:p-6">
                    <div className="flex flex-wrap justify-center gap-3 sm:gap-2" onPaste={handlePaste}>
                        {otp.map((data, index) => (
                            <input
                                key={index}
                                type="text"
                                name="otp"
                                maxLength="1"
                                value={data}
                                title={`${t('otpTitle')} ${index + 1}`}
                                onChange={(e) => handleChange(e.target, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                className="w-10 sm:w-12 h-12 sm:h-14 text-center text-base sm:text-xl font-bold rounded-xl border-2 border-slate-200 focus:border-black focus:ring-0 focus:outline-none transition-all bg-slate-50 text-slate-900"
                            />
                        ))}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading || otp.join('').length !== 5}
                        className="w-full bg-red-600 shadow text-white py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                        ) : (
                            <>
                                <span className="hidden sm:inline">{t('verifyBtn')}</span>
                                <span className="sm:hidden">{t('verifyBtnShort')}</span>
                                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                            </>
                        )}
                    </button>

                    <div className="text-center">
                        <p className="text-slate-500 text-sm">
                            {t('resendPrompt')}{' '}
                            <button type="button" className="text-red-600 font-semibold hover:underline">
                                {t('resendBtn')}
                            </button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VerifyEmail;
