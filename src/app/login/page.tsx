'use client';

import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import CircularText from '@/components/CircularText';
import {
    VscEye,
    VscEyeClosed,
} from 'react-icons/vsc';
import { FcGoogle } from 'react-icons/fc';

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

    useEffect(() => {
        if (user && !authLoading) {
            console.log('User already logged in, redirecting to home...');
            router.push('/home');
        }
    }, [user, authLoading, router]);

    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
                    <p className="text-white">Checking authentication...</p>
                </div>
            </div>
        );
    }

    if (user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
                    <p className="text-white">Redirecting to home...</p>
                </div>
            </div>
        );
    }

    const validateForm = (): boolean => {
        // Reset error
        setError('');

        // Validasi input kosong
        if (!email.trim() || !password) {
            setError('Please fill in all fields');
            return false;
        }

        // Validasi format email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            setError('Please enter a valid email address');
            return false;
        }

        // Validasi panjang password
        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
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

            // Redirect langsung tanpa timeout
            router.push('/home');

        } catch (error: any) {
            console.error('Login error:', error);

            // Handle Firebase auth errors
            let errorMessage = 'Login gagal. Silakan coba lagi.';

            switch (error.code) {
                case 'auth/invalid-credential':
                case 'auth/wrong-password':
                    errorMessage = 'Email atau kata sandi salah. Silakan periksa kredensial Anda.';
                    break;
                case 'auth/user-not-found':
                    errorMessage = 'Tidak ada akun yang ditemukan dengan email ini. Silakan daftar terlebih dahulu.';
                    break;
                case 'auth/invalid-email':
                    errorMessage = 'Format alamat email tidak valid.';
                    break;
                case 'auth/user-disabled':
                    errorMessage = 'Akun ini telah dinonaktifkan. Silakan hubungi support.';
                    break;
                case 'auth/too-many-requests':
                    errorMessage = 'Terlalu banyak percobaan gagal. Silakan coba lagi nanti atau reset kata sandi Anda.';
                    break;
                case 'auth/network-request-failed':
                    errorMessage = 'Error jaringan. Silakan periksa koneksi internet Anda.';
                    break;
                case 'auth/operation-not-allowed':
                    errorMessage = 'Login email/kata sandi tidak diaktifkan. Silakan hubungi support.';
                    break;
                default:
                    errorMessage = `Login gagal: ${error.message || 'Silakan coba lagi'}`;
            }

            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setGoogleLoading(true);
        setError('');

        try {
            const provider = new GoogleAuthProvider();

            // Konfigurasi provider Google
            const customParameters: { prompt: string; login_hint?: string } = {
                prompt: 'select_account'
            };

            // Hanya tambahkan login_hint jika email tidak kosong
            if (email.trim()) {
                customParameters.login_hint = email.trim();
            }

            provider.setCustomParameters(customParameters);

            // Tambahkan scope
            provider.addScope('email');
            provider.addScope('profile');

            console.log('Starting Google sign-in...');

            // Gunakan signInWithPopup untuk authentication
            const result = await signInWithPopup(auth, provider);
            console.log('Google login successful:', result.user);

            // Redirect ke home
            router.push('/home');

        } catch (error: any) {
            console.error('Google login error:', error);

            let errorMessage = 'Gagal login dengan Google. Silakan coba lagi.';

            switch (error.code) {
                case 'auth/popup-closed-by-user':
                    errorMessage = 'Login Google dibatalkan.';
                    break;
                case 'auth/popup-blocked':
                    errorMessage = 'Popup diblokir oleh browser Anda. Silakan izinkan popup untuk situs ini dan coba lagi.';
                    break;
                case 'auth/unauthorized-domain':
                    errorMessage = 'Domain ini tidak diizinkan untuk login Google. Silakan hubungi support.';
                    break;
                case 'auth/account-exists-with-different-credential':
                    errorMessage = 'Akun sudah ada dengan email yang sama tetapi metode login berbeda. Silakan coba login dengan email dan kata sandi.';
                    break;
                case 'auth/operation-not-allowed':
                    errorMessage = 'Login Google tidak diaktifkan. Silakan hubungi support.';
                    break;
                case 'auth/network-request-failed':
                    errorMessage = 'Error jaringan. Silakan periksa koneksi internet Anda dan coba lagi.';
                    break;
                default:
                    if (error.message.includes('popup')) {
                        errorMessage = 'Tidak dapat membuka popup login Google. Silakan periksa pengaturan browser Anda.';
                    } else {
                        errorMessage = `Login Google gagal: ${error.message}`;
                    }
            }

            setError(errorMessage);
        } finally {
            setGoogleLoading(false);
        }
    };

    const isAnyLoading = loading || googleLoading;

    return (
        <div className="min-h-screen flex items-center justify-center bg-black py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="hidden lg:block absolute top-6 right-6 z-10">
                <CircularText
                    text="MUMET.IN ✦ LANGSUNG ✦ BERES ✦ "
                    onHover="speedUp"
                    spinDuration={20}
                    className="w-16 h-16"
                />
            </div>

            <div className="w-full max-w-md z-10">
                <div className="block lg:hidden justify-center mb-6">
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
                            Selamat Datang Kembali
                        </h2>
                        <p className="text-purple-200 text-sm">
                            Masuk untuk melanjutkan perjalanan Anda
                        </p>
                    </div>

                    <form className="space-y-6" onSubmit={handleLogin}>
                        {error && (
                            <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl text-sm backdrop-blur-sm">
                                <div className="font-medium flex items-center">
                                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                    {error}
                                </div>
                                <div className="mt-2 text-xs flex flex-wrap gap-2">
                                    <Link
                                        href="/register"
                                        className="underline hover:text-white transition-colors"
                                    >
                                        Buat akun baru
                                    </Link>
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
                                    autoComplete="current-password"
                                    required
                                    className="w-full px-4 pt-6 pb-2 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E02435] focus:border-transparent transition-all duration-200 text-white placeholder-transparent disabled:opacity-50 disabled:cursor-not-allowed pr-12"
                                    placeholder="Masukkan kata sandi Anda"
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
                                        <VscEyeClosed size={24} className='text-white' />
                                    ) : (
                                        <VscEye size={24} className='text-white' />
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
                                    Sedang masuk...
                                </span>
                            ) : (
                                'Masuk ke akun Anda'
                            )}
                        </button>

                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-white/20" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-3 bg-white/10 backdrop-blur-lg text-purple-200 font-medium">Atau lanjutkan dengan</span>
                                </div>
                            </div>

                            <div className="mt-6">
                                <button
                                    type="button"
                                    onClick={handleGoogleLogin}
                                    disabled={isAnyLoading}
                                    className="w-full flex justify-center items-center py-3 px-4 border border-white/20 rounded-xl shadow-sm bg-white/5 text-white font-medium hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 backdrop-blur-sm transform hover:scale-[1.02]"
                                >
                                    {googleLoading ? (
                                        <span className="flex items-center justify-center">
                                            <FcGoogle className="w-5 h-5 group-hover:scale-110 transition-transform me-2" />
                                            Menghubungkan...
                                        </span>
                                    ) : (
                                        <>
                                            <FcGoogle className="w-5 h-5 group-hover:scale-110 transition-transform me-2" />Lanjutkan dengan Google
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="text-center pt-4">
                            <p className="text-sm text-purple-200">
                                Tidak punya akun?{' '}
                                <Link
                                    href="/register"
                                    className="font-semibold text-white hover:text-purple-300 transition-colors"
                                >
                                    Buat akun
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}