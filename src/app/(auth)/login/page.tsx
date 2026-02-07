'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useI18n } from '@/i18n/LanguageProvider';
import {
    FiEye,
    FiEyeOff,
    FiAlertCircle,
    FiChevronLeft
} from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';

const CircularText = dynamic(() => import('@/components/CircularText'), {
    ssr: false,
});

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState({ email: false, password: false });
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();
    const { t } = useI18n();
    const googleInFlightRef = useRef(false);
    const googleRedirectAttemptedRef = useRef(false);
    const [showDecor, setShowDecor] = useState(false);

    const googleProviderRef = useRef<GoogleAuthProvider | null>(null);
    if (!googleProviderRef.current) {
        const provider = new GoogleAuthProvider();
        provider.addScope('email');
        provider.addScope('profile');
        googleProviderRef.current = provider;
    }

    useEffect(() => {
        if (user && !authLoading) {
            console.log('Pengguna sudah login, mengarahkan ke halaman utama...');
            router.push('/home');
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        let cancelled = false;
        const w = window as Window & { requestIdleCallback?: (cb: () => void) => void };
        const schedule = () => {
            if (w.requestIdleCallback) {
                w.requestIdleCallback(() => {
                    if (!cancelled) setShowDecor(true);
                });
            } else {
                setTimeout(() => {
                    if (!cancelled) setShowDecor(true);
                }, 1200);
            }
        };

        schedule();
        return () => {
            cancelled = true;
        };
    }, []);

    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
                    <p className="text-white">{t('login.loadingAuth')}</p>
                </div>
            </div>
        );
    }

    if (user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
                    <p className="text-white">{t('login.redirecting')}</p>
                </div>
            </div>
        );
    }

    const validateForm = (): boolean => {
        setError('');

        if (!email.trim() || !password) {
            setError(t('login.error.empty'));
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            setError(t('login.error.invalidEmail'));
            return false;
        }

        if (password.length < 6) {
            setError(t('login.error.shortPassword'));
            return false;
        }

        return true;
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setError('');

        try {
            console.log('Attempting login with:', { email: email.trim() });

            const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
            console.log('Login successful:', userCredential.user.email);

            router.push('/home');

        } catch (error: any) {
            console.error('Login error:', error);

            let errorMessage = t('login.error.default');

            switch (error.code) {
                case 'auth/invalid-credential':
                case 'auth/wrong-password':
                    errorMessage = t('login.error.invalidCredential');
                    break;
                case 'auth/user-not-found':
                    errorMessage = t('login.error.userNotFound');
                    break;
                case 'auth/invalid-email':
                    errorMessage = t('login.error.invalidEmail');
                    break;
                case 'auth/user-disabled':
                    errorMessage = t('login.error.userDisabled');
                    break;
                case 'auth/too-many-requests':
                    errorMessage = t('login.error.tooMany');
                    break;
                case 'auth/network-request-failed':
                    errorMessage = t('login.error.network');
                    break;
                case 'auth/operation-not-allowed':
                    errorMessage = t('login.error.operationNotAllowed');
                    break;
                default:
                    errorMessage = t('login.error.default');
            }

            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        if (googleInFlightRef.current) {
            return;
        }
        googleInFlightRef.current = true;
        setGoogleLoading(true);
        setError('');

        try {
            const provider = googleProviderRef.current as GoogleAuthProvider;
            const customParameters: { prompt: string; login_hint?: string } = {
                prompt: 'select_account'
            };

            if (email.trim()) {
                customParameters.login_hint = email.trim();
            }

            provider.setCustomParameters(customParameters);

            console.log('Starting Google sign-in...');

            const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

            if (isMobile) {
                await signInWithRedirect(auth, provider);
                return;
            }

            const result = await signInWithPopup(auth, provider);
            console.log('Google login successful:', result.user);

            router.push('/home');

        } catch (error: any) {
            const silentCodes = ['auth/popup-closed-by-user', 'auth/cancelled-popup-request'];
            if (!silentCodes.includes(error.code)) {
                console.error('Google login error:', error);
            }

            const shouldFallbackRedirect = [
                'auth/popup-blocked',
                'auth/cancelled-popup-request',
                'auth/operation-not-supported-in-this-environment'
            ].includes(error.code);

            if (shouldFallbackRedirect && !googleRedirectAttemptedRef.current) {
                googleRedirectAttemptedRef.current = true;
                const provider = googleProviderRef.current as GoogleAuthProvider;
                await signInWithRedirect(auth, provider);
                return;
            }

            let errorMessage = t('login.google.default');

            switch (error.code) {
                case 'auth/cancelled-popup-request':
                    errorMessage = t('login.google.cancelled');
                    break;
                case 'auth/popup-closed-by-user':
                    errorMessage = t('login.google.cancelled');
                    break;
                case 'auth/popup-blocked':
                    errorMessage = t('login.google.popupBlocked');
                    break;
                case 'auth/unauthorized-domain':
                    errorMessage = t('login.google.unauthorizedDomain');
                    break;
                case 'auth/account-exists-with-different-credential':
                    errorMessage = t('login.google.accountExists');
                    break;
                case 'auth/operation-not-allowed':
                    errorMessage = t('login.google.operationNotAllowed');
                    break;
                case 'auth/network-request-failed':
                    errorMessage = t('login.google.network');
                    break;
                default:
                    errorMessage = t('login.google.default');
            }

            if (!silentCodes.includes(error.code)) {
                setError(errorMessage);
            }
        } finally {
            setGoogleLoading(false);
            googleInFlightRef.current = false;
        }
    };

    const isAnyLoading = loading || googleLoading;

    return (
        <div className="min-h-screen flex items-center justify-center bg-black py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background pattern dengan pointer-events-none */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[50px_50px]"></div>
            </div>

            {/* Tombol Kembali */}
            <div className="absolute top-6 left-6 z-20">
                <button
                    onClick={() => router.push('/')}
                    className="flex items-center text-white hover:text-gray-300 transition-all duration-200 group relative z-30"
                >
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 group-hover:bg-white/20 group-hover:scale-105 transition-all duration-200">
                        <FiChevronLeft className="w-6 h-6" />
                    </div>
                    <span className="ml-3 font-semibold text-lg hidden sm:block">
                        {t('login.back')}
                    </span>
                </button>
            </div>

            {/* Circular Text dengan pointer-events-none */}
            {showDecor && (
                <div className="hidden lg:block absolute top-6 right-6 z-10 pointer-events-none">
                    <CircularText
                        text={t('login.circular')}
                        onHover="speedUp"
                        spinDuration={20}
                        className="w-16 h-16"
                    />
                </div>
            )}

            <div className="w-full max-w-md z-10 mt-8 relative">
                {/* Circular Text untuk mobile dengan pointer-events-none */}
                {showDecor && (
                    <div className="flex justify-center mb-8 lg:hidden pointer-events-none">
                        <CircularText
                            text={t('login.circular')}
                            onHover="speedUp"
                            spinDuration={20}
                            className="w-16 h-16"
                        />
                    </div>
                )}

                {/* Form Container */}
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 transform hover:scale-[1.01] transition-all duration-300 relative z-20">
                    {/* Background pattern dalam form dengan pointer-events-none */}
                    <div className="absolute inset-0 rounded-3xl bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-size-[20px_20px] mask-[radial-gradient(ellipse_80%_50%_at_50%_50%,black_70%,transparent_100%)] pointer-events-none"></div>
                    
                    <div className="text-center mb-8 relative z-10">
                        <h2 className="text-3xl font-bold text-white mb-2">
                            {t('login.title')}
                        </h2>
                        <p className="text-gray-300 text-sm">
                            {t('login.subtitle')}
                        </p>
                    </div>

                    <form className="space-y-6 relative z-10" onSubmit={handleLogin}>
                        {error && (
                            <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl text-sm backdrop-blur-sm relative z-20">
                                <div className="font-medium flex items-center">
                                    <FiAlertCircle className="w-4 h-4 mr-2" />
                                    {error}
                                </div>
                                <div className="mt-2 text-xs flex flex-wrap gap-2">
                                    <Link
                                        href="/register"
                                        className="underline hover:text-white transition-colors"
                                    >
                                        {t('login.createNewAccount')}
                                    </Link>
                                </div>
                            </div>
                        )}

                        <div className="space-y-4 relative z-20">
                            <div className="relative">
                                <label
                                    htmlFor="email"
                                    className={`absolute left-4 transition-all duration-200 ${isFocused.email || email
                                        ? 'top-2 text-xs text-white'
                                        : 'top-4 text-sm text-white'
                                        }`}
                                >
                                    {t('login.email')}
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="w-full px-4 pt-6 pb-2 bg-[#1A1A1A] border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c41e2e] focus:border-transparent transition-all duration-200 text-white placeholder-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                                    placeholder={t('login.emailPlaceholder')}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onFocus={() => setIsFocused(prev => ({ ...prev, email: true }))}
                                    onBlur={() => setIsFocused(prev => ({ ...prev, email: !!email }))}
                                    disabled={isAnyLoading}
                                    autoFocus
                                />
                            </div>

                            <div className="relative">
                                <label
                                    htmlFor="password"
                                    className={`absolute left-4 transition-all duration-200 ${isFocused.password || password
                                        ? 'top-2 text-xs text-white'
                                        : 'top-4 text-sm text-white'
                                        }`}
                                >
                                    {t('login.password')}
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    required
                                    className="w-full px-4 pt-6 pb-2 bg-[#1A1A1A] border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c41e2e] focus:border-transparent transition-all duration-200 text-white placeholder-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                                    placeholder={t('login.passwordPlaceholder')}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onFocus={() => setIsFocused(prev => ({ ...prev, password: true }))}
                                    onBlur={() => setIsFocused(prev => ({ ...prev, password: !!password }))}
                                    disabled={isAnyLoading}
                                    minLength={6}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-300 hover:text-white transition-colors p-1 disabled:opacity-50 z-30"
                                    disabled={isAnyLoading}
                                >
                                    {showPassword ? (
                                        <FiEyeOff size={20} className='text-white' />
                                    ) : (
                                        <FiEye size={20} className='text-white' />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-end relative z-20">
                            <Link
                                href="/forgot-password"
                                className="text-sm text-white hover:text-gray-300 transition-colors relative z-20"
                            >
                                {t('login.forgot')}
                            </Link>
                        </div>
                        
                        <button
                            type="submit"
                            disabled={isAnyLoading}
                            className="w-full bg-[#c41e2e] text-white py-4 px-4 rounded-xl font-semibold hover:bg-[#c81e2e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c41e2e] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg relative z-20"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    {t('login.loading')}
                                </span>
                            ) : (
                                t('login.button')
                            )}
                        </button>

                        <div className="mt-1 relative z-20">
                            <div className="relative">
                                <div className="flex justify-center text-sm">
                                    <span className="text-white font-medium">
                                        {t('login.or')}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6">
                                <button
                                    type="button"
                                    onClick={handleGoogleLogin}
                                    disabled={isAnyLoading}
                                    className="w-full flex justify-center items-center py-3 px-4 rounded-xl shadow-sm bg-white text-[#c41e2e] font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 backdrop-blur-sm transform hover:scale-[1.02] hover:shadow-md relative z-20"
                                >
                                    {googleLoading ? (
                                        <span className="flex items-center justify-center">
                                            <FcGoogle className="w-5 h-5 group-hover:scale-110 transition-transform me-2" />
                                            {t('login.googleLoading')}
                                        </span>
                                    ) : (
                                        <>
                                            <FcGoogle className="w-5 h-5 group-hover:scale-110 transition-transform me-2" />
                                            {t('login.google')}
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                        
                        <div className="text-center pt-4 relative z-20">
                            <p className="text-sm text-white">
                                {t('login.noAccount')}{' '}
                                <Link
                                    href="/register"
                                    className="font-semibold text-white transition-colors"
                                >
                                    {t('login.createAccount')}
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

