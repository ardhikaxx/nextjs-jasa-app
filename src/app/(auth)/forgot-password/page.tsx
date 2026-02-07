'use client';

import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiAlertCircle, FiCheckCircle, FiChevronLeft } from 'react-icons/fi';
import { useI18n } from '@/i18n/LanguageProvider';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const router = useRouter();
    const { t } = useI18n();

    const validateForm = (): boolean => {
        setError('');

        if (!email.trim()) {
            setError(t('forgot.error.empty'));
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            setError(t('forgot.error.invalidEmail'));
            return false;
        }

        return true;
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            console.log('Mengirim email reset password ke:', email.trim());

            await sendPasswordResetEmail(auth, email.trim());
            
            console.log('Email reset password berhasil dikirim');
            setSuccess(true);
            setEmail('');

        } catch (error: any) {
            console.error('Error mengirim email reset password:', error);

            let errorMessage = t('forgot.error.default');

            switch (error.code) {
                case 'auth/user-not-found':
                    errorMessage = t('forgot.error.userNotFound');
                    break;
                case 'auth/invalid-email':
                    errorMessage = t('forgot.error.invalidEmail');
                    break;
                case 'auth/too-many-requests':
                    errorMessage = t('forgot.error.tooMany');
                    break;
                case 'auth/network-request-failed':
                    errorMessage = t('forgot.error.network');
                    break;
                case 'auth/operation-not-allowed':
                    errorMessage = t('forgot.error.operationNotAllowed');
                    break;
                default:
                    errorMessage = t('forgot.error.default');
            }

            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md">
                <div className="mb-6">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center text-white text-lg font-bold"
                    >
                        <FiChevronLeft className="w-6 h-6 mr-2" />
                        {t('forgot.back')}
                    </button>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 transform hover:scale-[1.01] transition-all duration-300">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-white mb-2">
                            {t('forgot.title')}
                        </h2>
                        <p className="text-white text-sm">
                            {t('forgot.subtitle')}
                        </p>
                    </div>

                    <form className="space-y-6" onSubmit={handleResetPassword}>
                        {error && (
                            <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl text-sm backdrop-blur-sm">
                                <div className="font-medium flex items-center">
                                    <FiAlertCircle className="w-4 h-4 mr-2" />
                                    {error}
                                </div>
                            </div>
                        )}

                        {success && (
                            <div className="bg-green-500/20 border border-green-500/50 text-green-200 px-4 py-3 rounded-xl text-sm backdrop-blur-sm">
                                <div className="font-medium flex items-center">
                                    <FiCheckCircle className="w-4 h-4 mr-2" />
                                    {t('forgot.successTitle')}
                                </div>
                                <p className="mt-2 text-xs">
                                    {t('forgot.successDesc')}
                                </p>
                            </div>
                        )}

                        <div className="space-y-4">
                            <div className="relative">
                                <label
                                    htmlFor="email"
                                    className={`absolute left-4 transition-all duration-200 ${isFocused || email
                                        ? 'top-2 text-xs text-white'
                                        : 'top-4 text-sm text-white'
                                        }`}
                                >
                                    {t('forgot.email')}
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="w-full px-4 pt-6 pb-2 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c41e2e] focus:border-transparent transition-all duration-200 text-white placeholder-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                                    placeholder={t('forgot.emailPlaceholder')}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setIsFocused(!!email)}
                                    disabled={loading}
                                    autoFocus
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#c41e2e] text-white py-4 px-4 rounded-xl font-semibold hover:bg-[#c81e2e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c41e2e] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    {t('forgot.sending')}
                                </span>
                            ) : (
                                t('forgot.button')
                            )}
                        </button>

                        <div className="text-center pt-4">
                            <p className="text-sm text-white">
                                {t('forgot.remember')}{' '}
                                <Link
                                    href="/login"
                                    className="font-semibold text-white"
                                >
                                    {t('reset.backLogin')}
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>

                <div className="mt-6 text-center">
                    <p className="text-sm text-white">
                        {t('forgot.linkHint')}
                    </p>
                </div>
            </div>
        </div>
    );
}
