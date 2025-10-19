'use client';

import { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, updateProfile } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import CircularText from '@/components/CircularText';
import {
    FiEye,
    FiEyeOff,
    FiAlertCircle,
    FiChevronLeft
} from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isFocused, setIsFocused] = useState({
        email: false,
        password: false,
        confirmPassword: false
    });
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();

    useEffect(() => {
        if (user && !authLoading) {
            router.push('/home');
        }
    }, [user, authLoading, router]);

    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
                    <p className="text-white">Memuat...</p>
                </div>
            </div>
        );
    }

    if (user) {
        return null;
    }

    const validateForm = (): boolean => {
        setError('');

        if (!email.trim() || !password || !confirmPassword) {
            setError('Harap isi semua kolom');
            return false;
        }

        if (password !== confirmPassword) {
            setError('Kata sandi dan konfirmasi kata sandi tidak cocok');
            return false;
        }

        if (password.length < 6) {
            setError('Kata sandi harus terdiri dari minimal 6 karakter');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            setError('Harap masukkan alamat email yang valid');
            return false;
        }

        return true;
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setError('');

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
            console.log('Registration successful:', userCredential.user);

            await updateProfile(userCredential.user, {
                displayName: email.split('@')[0]
            });

            router.push('/home');
        } catch (error: any) {
            console.error('Registration error:', error);

            switch (error.code) {
                case 'auth/email-already-in-use':
                    setError('Email ini sudah terdaftar');
                    break;
                case 'auth/invalid-email':
                    setError('Alamat email tidak valid');
                    break;
                case 'auth/operation-not-allowed':
                    setError('Akun email/kata sandi tidak diaktifkan');
                    break;
                case 'auth/weak-password':
                    setError('Kata sandi terlalu lemah');
                    break;
                default:
                    setError('Gagal membuat akun. Silakan coba lagi');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleRegister = async () => {
        setGoogleLoading(true);
        setError('');

        try {
            const provider = new GoogleAuthProvider();
            provider.addScope('email');
            provider.addScope('profile');

            provider.setCustomParameters({
                prompt: 'select_account'
            });

            const result = await signInWithPopup(auth, provider);
            console.log('Google registration successful:', result.user);

            router.push('/home');
        } catch (error: any) {
            console.error('Google registration error:', error);

            switch (error.code) {
                case 'auth/popup-closed-by-user':
                    setError('Login Google dibatalkan');
                    break;
                case 'auth/popup-blocked':
                    setError('Popup diblokir oleh browser. Silakan izinkan popup untuk situs ini');
                    break;
                case 'auth/network-request-failed':
                    setError('Error jaringan. Silakan periksa koneksi internet Anda');
                    break;
                case 'auth/account-exists-with-different-credential':
                    setError('Akun sudah ada dengan email yang sama tetapi metode login berbeda. Silakan coba login dengan email dan kata sandi');
                    break;
                case 'auth/operation-not-allowed':
                    setError('Login Google tidak diaktifkan. Silakan hubungi support');
                    break;
                case 'auth/unauthorized-domain':
                    setError('Domain ini tidak diizinkan untuk login Google. Silakan hubungi support');
                    break;
                default:
                    setError(`Gagal mendaftar dengan Google: ${error.message}`);
            }
        } finally {
            setGoogleLoading(false);
        }
    };

    const isAnyLoading = loading || googleLoading;

    return (
        <div className="min-h-screen flex items-center justify-center bg-black py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="absolute top-6 left-6 z-20">
                <button
                    onClick={() => router.push('/')}
                    className="flex items-center text-white hover:text-gray-300 transition-all duration-200 group"
                >
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 group-hover:bg-white/20 group-hover:scale-105 transition-all duration-200">
                        <FiChevronLeft className="w-6 h-6" />
                    </div>
                    <span className="ml-3 font-semibold text-lg hidden sm:block">
                        Kembali
                    </span>
                </button>
            </div>

            <div className="hidden lg:block absolute top-6 right-6 z-10">
                <CircularText
                    text="MUMET.IN ✦ LANGSUNG ✦ BERES ✦ "
                    onHover="speedUp"
                    spinDuration={20}
                    className="w-16 h-16"
                />
            </div>

            <div className="w-full max-w-md z-10 mt-8">
                <div className="flex justify-center mb-8 lg:hidden">
                    <CircularText
                        text="MUMET.IN ✦ LANGSUNG ✦ BERES ✦ "
                        onHover="speedUp"
                        spinDuration={20}
                        className="w-16 h-16"
                    />
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 transform hover:scale-[1.01] transition-all duration-300">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-white mb-2">
                            Bergabunglah Hari Ini
                        </h2>
                        <p className="text-gray-300 text-sm">
                            Buat akun Anda untuk memulai
                        </p>
                    </div>

                    <form className="space-y-6" onSubmit={handleRegister}>
                        {error && (
                            <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl text-sm backdrop-blur-sm">
                                <div className="font-medium flex items-center">
                                    <FiAlertCircle className="w-4 h-4 mr-2" />
                                    {error}
                                </div>
                            </div>
                        )}

                        <div className="space-y-4">
                            <div className="relative">
                                <label
                                    htmlFor="email"
                                    className={`absolute left-4 transition-all duration-200 ${isFocused.email || email
                                        ? 'top-2 text-xs text-white'
                                        : 'top-4 text-sm text-white'
                                        }`}
                                >
                                    Alamat email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="w-full px-4 pt-6 pb-2 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E02435] focus:border-transparent transition-all duration-200 text-white placeholder-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                                    placeholder="Masukkan email Anda"
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
                                    Kata sandi
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="new-password"
                                    required
                                    className="w-full px-4 pt-6 pb-2 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E02435] focus:border-transparent transition-all duration-200 text-white placeholder-transparent disabled:opacity-50 disabled:cursor-not-allowed pr-12"
                                    placeholder="Masukkan kata sandi (min. 6 karakter)"
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
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-300 hover:text-white transition-colors p-1 disabled:opacity-50"
                                    disabled={isAnyLoading}
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
                                    Konfirmasi Kata Sandi
                                </label>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    autoComplete="new-password"
                                    required
                                    className="w-full px-4 pt-6 pb-2 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E02435] focus:border-transparent transition-all duration-200 text-white placeholder-transparent disabled:opacity-50 disabled:cursor-not-allowed pr-12"
                                    placeholder="Konfirmasi kata sandi Anda"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    onFocus={() => setIsFocused(prev => ({ ...prev, confirmPassword: true }))}
                                    onBlur={() => setIsFocused(prev => ({ ...prev, confirmPassword: !!confirmPassword }))}
                                    disabled={isAnyLoading}
                                    minLength={6}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-300 hover:text-white transition-colors p-1 disabled:opacity-50"
                                    disabled={isAnyLoading}
                                >
                                    {showConfirmPassword ? (
                                        <FiEyeOff size={20} className='text-white' />
                                    ) : (
                                        <FiEye size={20} className='text-white' />
                                    )}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isAnyLoading}
                            className="w-full bg-[#E02435] text-white py-4 px-4 rounded-xl font-semibold hover:bg-[#c81e2e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E02435] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Membuat akun...
                                </span>
                            ) : (
                                'Buat akun Anda'
                            )}
                        </button>

                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-white/20" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-3 bg-white/10 backdrop-blur-lg text-purple-200 font-medium">
                                        Atau lanjutkan dengan
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6">
                                <button
                                    type="button"
                                    onClick={handleGoogleRegister}
                                    disabled={isAnyLoading}
                                    className="w-full flex justify-center items-center py-3 px-4 rounded-xl shadow-sm bg-white text-[#E02435] font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 backdrop-blur-sm transform hover:scale-[1.02] hover:shadow-md"
                                >
                                    {googleLoading ? (
                                        <span className="flex items-center justify-center">
                                            <FcGoogle className="w-5 h-5 group-hover:scale-110 transition-transform me-2" />
                                            Menghubungkan...
                                        </span>
                                    ) : (
                                        <>
                                            <FcGoogle className="w-5 h-5 group-hover:scale-110 transition-transform me-2" />
                                            Lanjutkan dengan Google
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="text-center pt-4">
                            <p className="text-sm text-purple-200">
                                Sudah punya akun?{' '}
                                <Link
                                    href="/login"
                                    className="font-semibold text-white hover:text-purple-300 transition-colors"
                                >
                                    Masuk
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}