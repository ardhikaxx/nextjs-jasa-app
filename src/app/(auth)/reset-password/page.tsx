'use client';

import { useState, useEffect, Suspense } from 'react';
import { confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FiAlertCircle, FiCheckCircle, FiEye, FiEyeOff, FiChevronLeft } from 'react-icons/fi';
import { useI18n } from '@/i18n/LanguageProvider';

function ResetPasswordContent() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isFocused, setIsFocused] = useState({ password: false, confirmPassword: false });
    const [validating, setValidating] = useState(true);
    const [validCode, setValidCode] = useState(false);
    const { t } = useI18n();

    const router = useRouter();
    const searchParams = useSearchParams();
    const oobCode = searchParams.get('oobCode');

    useEffect(() => {
        const validateResetCode = async () => {
            if (!oobCode) {
                setError(t('reset.error.invalidLink'));
                setValidating(false);
                return;
            }

            try {
                console.log('Memvalidasi reset code...');
                await verifyPasswordResetCode(auth, oobCode);
                console.log('Reset code valid');
                setValidCode(true);
            } catch (error: any) {
                console.error('Error validasi reset code:', error);

                let errorMessage = t('reset.error.invalidLink');

                switch (error.code) {
                    case 'auth/expired-action-code':
                        errorMessage = t('reset.error.expired');
                        break;
                    case 'auth/invalid-action-code':
                        errorMessage = t('reset.error.invalid');
                        break;
                    case 'auth/user-disabled':
                        errorMessage = t('reset.error.userDisabled');
                        break;
                    case 'auth/user-not-found':
                        errorMessage = t('reset.error.userNotFound');
                        break;
                    default:
                        errorMessage = t('reset.error.invalidLink');
                }

                setError(errorMessage);
                setValidCode(false);
            } finally {
                setValidating(false);
            }
        };

        validateResetCode();
    }, [oobCode]);

    const validateForm = (): boolean => {
        setError('');

        if (!password || !confirmPassword) {
            setError(t('login.error.empty'));
            return false;
        }

        if (password.length < 6) {
            setError(t('reset.error.shortPassword'));
            return false;
        }

        if (password !== confirmPassword) {
            setError(t('reset.error.mismatch'));
            return false;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
        if (!passwordRegex.test(password)) {
            setError(t('reset.error.rules'));
            return false;
        }

        return true;
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        if (!oobCode || !validCode) {
            setError(t('reset.error.invalid'));
            return;
        }

        setLoading(true);
        setError('');

        try {
            console.log('Melakukan reset password...');

            await confirmPasswordReset(auth, oobCode, password);

            console.log('Reset password berhasil');
            setSuccess(true);

            setPassword('');
            setConfirmPassword('');

            setTimeout(() => {
                router.push('/login');
            }, 3000);

        } catch (error: any) {
            console.error('Error reset password:', error);

            let errorMessage = t('reset.error.default');

            switch (error.code) {
                case 'auth/expired-action-code':
                    errorMessage = t('reset.error.expired');
                    break;
                case 'auth/invalid-action-code':
                    errorMessage = t('reset.error.invalid');
                    break;
                case 'auth/user-disabled':
                    errorMessage = t('reset.error.userDisabled');
                    break;
                case 'auth/user-not-found':
                    errorMessage = t('reset.error.userNotFound');
                    break;
                case 'auth/weak-password':
                    errorMessage = t('reset.error.weak');
                    break;
                default:
                    errorMessage = t('reset.error.default');
            }

            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    if (validating) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
                    <p className="text-white">{t('reset.validating')}</p>
                </div>
            </div>
        );
    }

    if (!validCode) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md">
                    <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-white mb-2">
                                Link Tidak Valid
                            </h2>
                            <p className="text-purple-200 text-sm">
                                {error || t('reset.error.invalidLink')}
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl text-sm backdrop-blur-sm">
                                <div className="font-medium flex items-center justify-center">
                                    <FiAlertCircle className="w-4 h-4 mr-2" />
                                    {t('reset.invalidTitle')}
                                </div>
                            </div>

                            <div className="text-center pt-4">
                                <Link
                                    href="/forgot-password"
                                    className="w-full bg-[#c41e2e] text-white py-4 px-4 rounded-xl font-semibold hover:bg-[#c81e2e] transition-all duration-200 inline-block"
                                >
                                    {t('reset.invalidCta')}
                                </Link>
                            </div>

                            <div className="text-center">
                                <Link
                                    href="/login"
                                    className="text-sm text-purple-300 hover:text-white transition-colors"
                                >
                                    {t('forgot.backLogin')}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-black py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md">
                <div className="mb-6">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center text-white text-lg font-bold"
                    >
                        <FiChevronLeft className="w-6 h-6 mr-2" />
                        {t('login.back')}
                    </button>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 transform hover:scale-[1.01] transition-all duration-300">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-white mb-2">
                            {t('reset.title')}
                        </h2>
                        <p className="text-gray-300 text-sm">
                            {t('reset.subtitle')}
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
                                    {t('reset.success')}
                                </div>
                                <p className="mt-2 text-xs">
                                    {t('login.redirecting')}
                                </p>
                            </div>
                        )}

                        <div className="space-y-4">
                            <div className="relative">
                                <label
                                    htmlFor="password"
                                    className={`absolute left-4 transition-all duration-200 ${isFocused.password || password
                                        ? 'top-2 text-xs text-white'
                                        : 'top-4 text-sm text-white'
                                        }`}
                                >
                                    {t('reset.newPassword')}
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="new-password"
                                    required
                                    className="w-full px-4 pt-6 pb-2 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c41e2e] focus:border-transparent transition-all duration-200 text-white placeholder-transparent disabled:opacity-50 disabled:cursor-not-allowed pr-12"
                                    placeholder={t('reset.placeholderNew')}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onFocus={() => setIsFocused(prev => ({ ...prev, password: true }))}
                                    onBlur={() => setIsFocused(prev => ({ ...prev, password: !!password }))}
                                    disabled={loading || success}
                                    minLength={6}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-300 hover:text-white transition-colors p-1 disabled:opacity-50"
                                    disabled={loading || success}
                                >
                                    {showPassword ? (
                                        <FiEyeOff size={20} className='text-white' />
                                    ) : (
                                        <FiEye size={20} className='text-white' />
                                    )}
                                </button>
                            </div>

                            <div className="relative">
                                <label
                                    htmlFor="confirmPassword"
                                    className={`absolute left-4 transition-all duration-200 ${isFocused.confirmPassword || confirmPassword
                                        ? 'top-2 text-xs text-white'
                                        : 'top-4 text-sm text-white'
                                        }`}
                                >
                                    {t('reset.confirm')}
                                </label>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    autoComplete="new-password"
                                    required
                                    className="w-full px-4 pt-6 pb-2 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c41e2e] focus:border-transparent transition-all duration-200 text-white placeholder-transparent disabled:opacity-50 disabled:cursor-not-allowed pr-12"
                                    placeholder={t('reset.placeholderConfirm')}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    onFocus={() => setIsFocused(prev => ({ ...prev, confirmPassword: true }))}
                                    onBlur={() => setIsFocused(prev => ({ ...prev, confirmPassword: !!confirmPassword }))}
                                    disabled={loading || success}
                                    minLength={6}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white transition-colors p-1 disabled:opacity-50"
                                    disabled={loading || success}
                                >
                                    {showConfirmPassword ? (
                                        <FiEyeOff size={20} className='text-white' />
                                    ) : (
                                        <FiEye size={20} className='text-white' />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Password Requirements */}
                        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                            <p className="text-sm text-white font-medium mb-2">{t('reset.requirements')}</p>
                            <ul className="text-xs text-white space-y-1">
                                <li className={`flex items-center ${password.length >= 6 ? 'text-green-400' : ''}`}>
                                    <span className="w-2 h-2 rounded-full bg-current mr-2"></span>
                                    {t('reset.req.min6')}
                                </li>
                                <li className={`flex items-center ${/(?=.*[a-z])/.test(password) ? 'text-green-400' : ''}`}>
                                    <span className="w-2 h-2 rounded-full bg-current mr-2"></span>
                                    {t('reset.req.lower')}
                                </li>
                                <li className={`flex items-center ${/(?=.*[A-Z])/.test(password) ? 'text-green-400' : ''}`}>
                                    <span className="w-2 h-2 rounded-full bg-current mr-2"></span>
                                    {t('reset.req.upper')}
                                </li>
                                <li className={`flex items-center ${/(?=.*\d)/.test(password) ? 'text-green-400' : ''}`}>
                                    <span className="w-2 h-2 rounded-full bg-current mr-2"></span>
                                    {t('reset.req.number')}
                                </li>
                            </ul>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || success}
                            className="w-full bg-[#c41e2e] text-white py-4 px-4 rounded-xl font-semibold hover:bg-[#c81e2e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c41e2e] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    {t('reset.buttonLoading')}
                                </span>
                            ) : success ? (
                                t('reset.success')
                            ) : (
                                t('reset.button')
                            )}
                        </button>

                        {!success && (
                            <div className="text-center pt-4">
                                <p className="text-sm text-white">
                                {t('reset.remember')}{' '}
                                <Link
                                    href="/login"
                                    className="font-semibold text-white"
                                >
                                    {t('reset.backLogin')}
                                </Link>
                            </p>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}

function ResetPasswordLoading() {
    const { t } = useI18n();
    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
                <p className="text-white">{t('reset.loading')}</p>
            </div>
        </div>
    );
}

export default function ResetPassword() {
    return (
        <Suspense fallback={<ResetPasswordLoading />}>
            <ResetPasswordContent />
        </Suspense>
    );
}
