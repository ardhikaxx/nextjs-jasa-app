'use client';

import { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import SplitText from '@/components/SplitText';
import { FiLogOut } from 'react-icons/fi';

export default function HomePage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [userCount, setUserCount] = useState<number | null>(null);
    const [isRedirecting, setIsRedirecting] = useState(false);

    useEffect(() => {
        if (!loading && !user && !isRedirecting) {
            setIsRedirecting(true);
            router.push('/');
        }
    }, [user, loading, isRedirecting, router]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch('/api/count');
                const data = await res.json();
                setUserCount(data.count);
            } catch (err) {
                console.error('Error fetching user count:', err);
            }
        };
        fetchUsers();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Error signing out:', error);
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
                                onClick={handleLogout}
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