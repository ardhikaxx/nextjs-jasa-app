'use client';

import { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import SplitText from '@/components/SplitText';
import { FiLogOut, FiX, FiAlertTriangle } from 'react-icons/fi';

export default function HomePage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [isRedirecting, setIsRedirecting] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    useEffect(() => {
        if (!loading && !user && !isRedirecting) {
            setIsRedirecting(true);
            router.push('/');
        }
    }, [user, loading, isRedirecting, router]);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await signOut(auth);
            setShowLogoutConfirm(false);
        } catch (error) {
            console.error('Error signing out:', error);
            setIsLoggingOut(false);
        }
    };

    const openLogoutConfirm = () => {
        setShowLogoutConfirm(true);
    };

    const closeLogoutConfirm = () => {
        if (!isLoggingOut) {
            setShowLogoutConfirm(false);
        }
    };

    if (loading || isRedirecting) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
                    <p className="text-white">Loading...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
                    <p className="text-white">Loading...</p>
                </div>
            </div>
        );
    }

    const getProfilePicture = () => {
        if (user.photoURL) {
            return user.photoURL;
        }
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(
            user.displayName || user.email || 'User'
        )}&background=E02435&color=fff&size=128`;
    };

    const handleAnimationComplete = () => {
        console.log('All letters have animated!');
    };

    return (
        <div className="min-h-screen bg-black flex flex-col relative">
            {showLogoutConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                    <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl max-w-md w-full mx-auto transform transition-all duration-300 scale-100"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={closeLogoutConfirm}
                            disabled={isLoggingOut}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200 disabled:opacity-50"
                        >
                            <FiX size={20} />
                        </button>

                        <div className="p-6 sm:p-8">
                            <div className="flex justify-center mb-4">
                                <div className="relative">
                                    <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
                                        <FiAlertTriangle className="text-red-500" size={28} />
                                    </div>
                                    <div className="absolute inset-0 rounded-full bg-red-500/30 animate-ping"></div>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-white text-center mb-2 font-daydream">
                                Konfirmasi Logout
                            </h3>
                            <p className="text-gray-300 text-center mb-6 text-sm leading-relaxed">
                                Apakah Anda yakin ingin keluar dari akun Anda? 
                                Anda perlu login kembali untuk mengakses layanan kami.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={closeLogoutConfirm}
                                    disabled={isLoggingOut}
                                    className="flex-1 px-4 py-3 border border-gray-600 text-white rounded-xl hover:bg-white hover:text-red-700 font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center justify-center"
                                ><FiX className="mr-2" size={16} />
                                    Batal
                                </button>
                                <button
                                    onClick={handleLogout}
                                    disabled={isLoggingOut}
                                    className="flex-1 px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-sm flex items-center justify-center"
                                >
                                    {isLoggingOut ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                            Logging out...
                                        </>
                                    ) : (
                                        <>
                                            <FiLogOut className="mr-2" size={16} />
                                            Ya, Logout
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <nav className="bg-white/10 backdrop-blur-lg shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between h-16 items-center">
                    <div className="flex items-center space-x-3">
                        <h1 className="text-xl sm:text-2xl font-bold text-white font-daydream">
                            MUMET.IN
                        </h1>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-4">
                        <div className="hidden sm:flex flex-col items-end">
                            <span className="text-white text-sm">
                                Selamat datang, <b>{user.displayName || user.email?.split('@')[0]}</b>
                            </span>
                            <span className="text-gray-300 text-xs">{user.email}</span>
                        </div>
                        <div className="relative">
                            <Image
                                src={getProfilePicture()}
                                alt="Profile"
                                width={42}
                                height={42}
                                className="rounded-full border-2 border-[#B51D2A]/30 object-cover transition-all hover:border-[#B51D2A]/60 hover:scale-105 cursor-pointer"
                                onClick={() => router.push('/profile')}
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                        user.displayName || user.email || 'User'
                                    )}&background=E02435&color=fff&size=128`;
                                }}
                            />
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        </div>
                        <div className=''>
                            <button
                                onClick={openLogoutConfirm}
                                className="w-full flex items-center px-4 py-3 border-red-700 border-2 text-sm text-white hover:bg-red-700 transition-colors rounded-2xl duration-200 font-medium"
                            >
                                <FiLogOut className="mr-3" size={16} />
                                Keluar
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="flex-grow flex flex-col items-center justify-start text-center py-8 sm:py-12 px-4 sm:px-6 relative z-10">
                <div className="w-full max-w-2xl mb-8 sm:mb-12">
                    <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8">
                        <SplitText
                            text="Hi Chief, mau jasa apa nih?"
                            className="text-lg text-center sm:text-lg lg:text-2xl font-extrabold text-white mb-4 font-daydream"
                            delay={100}
                            duration={0.6}
                            ease="power3.out"
                            splitType="chars"
                            from={{ opacity: 0, y: 40 }}
                            to={{ opacity: 1, y: 0 }}
                            threshold={0.1}
                            rootMargin="-100px"
                            textAlign="center"
                            onLetterAnimationComplete={handleAnimationComplete}
                        />
                        <p className="text-gray-300 max-w-md mx-auto mb-6 text-sm sm:text-base">
                            Jasa layanan pembuatan Website, Aplikasi Mobile, Sistem IoT, dan Desain UI/UX. Dari yang mumet jadi beres!
                        </p>

                        {/* kasih garis pembatas */}

                        <div className="">
                            <h4 className="text-sm sm:text-md lg:text-lg font-extrabold text-white mb-4">Jenis proyekmu termasuk yang mana?</h4>
                            {/* ada beberapa tombol */}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}