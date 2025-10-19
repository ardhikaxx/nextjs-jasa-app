'use client';

import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiAlertCircle, FiCheckCircle, FiChevronLeft } from 'react-icons/fi';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const router = useRouter();

    const validateForm = (): boolean => {
        setError('');

        if (!email.trim()) {
            setError('Harap masukkan alamat email Anda');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            setError('Harap masukkan alamat email yang valid');
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

            let errorMessage = 'Gagal mengirim email reset password. Silakan coba lagi.';

            switch (error.code) {
                case 'auth/user-not-found':
                    errorMessage = 'Tidak ada akun yang ditemukan dengan email ini.';
                    break;
                case 'auth/invalid-email':
                    errorMessage = 'Format alamat email tidak valid.';
                    break;
                case 'auth/too-many-requests':
                    errorMessage = 'Terlalu banyak permintaan. Silakan coba lagi nanti.';
                    break;
                case 'auth/network-request-failed':
                    errorMessage = 'Error jaringan. Silakan periksa koneksi internet Anda.';
                    break;
                case 'auth/operation-not-allowed':
                    errorMessage = 'Reset password tidak diaktifkan. Silakan hubungi support.';
                    break;
                default:
                    errorMessage = `Gagal mengirim email: ${error.message || 'Silakan coba lagi'}`;
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
                        Kembali
                    </button>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 transform hover:scale-[1.01] transition-all duration-300">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-white mb-2">
                            Lupa Kata Sandi
                        </h2>
                        <p className="text-white text-sm">
                            Masukkan email Anda untuk menerima link reset password
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
                                    Email reset password telah dikirim!
                                </div>
                                <p className="mt-2 text-xs">
                                    Silakan periksa inbox email Anda dan ikuti instruksi untuk mereset kata sandi.
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
                            className="w-full bg-[#E02435] text-white py-4 px-4 rounded-xl font-semibold hover:bg-[#c81e2e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E02435] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Mengirim email...
                                </span>
                            ) : (
                                'Kirim Link Reset Password'
                            )}
                        </button>

                        <div className="text-center pt-4">
                            <p className="text-sm text-white">
                                Ingat kata sandi Anda?{' '}
                                <Link
                                    href="/login"
                                    className="font-semibold text-white"
                                >
                                    Masuk ke akun
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>

                <div className="mt-6 text-center">
                    <p className="text-sm text-white">
                        Link reset password akan berlaku selama 1 jam. <br />
                        Jika tidak menerima email, periksa folder spam Anda.
                    </p>
                </div>
            </div>
        </div>
    );
}