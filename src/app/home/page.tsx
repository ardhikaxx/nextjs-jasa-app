'use client';

import { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Dock from '@/components/Dock';
import Image from 'next/image';
import {
    VscSignOut,
    VscCircuitBoard,
    VscDeviceMobile,
    VscGlobe,
    VscLayout,
    VscOrganization,
    VscHome,
} from 'react-icons/vsc';

export default function HomePage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [userCount, setUserCount] = useState<number | null>(null);
    const [isRedirecting, setIsRedirecting] = useState(false);

    // Handle redirect jika user tidak login
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
            // Tidak perlu router.push di sini karena AuthContext akan trigger re-render
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    // Tampilkan loading selama auth loading atau redirecting
    if (loading || isRedirecting) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    // Jika tidak ada user setelah loading selesai, tampilkan loading sampai redirect
    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Redirecting...</p>
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

    const dockItems = [
        {
            icon: <VscGlobe size={20} />,
            label: 'Jasa Website',
            onClick: () => router.push('/website')
        },
        {
            icon: <VscDeviceMobile size={20} />,
            label: 'Jasa Aplikasi Mobile',
            onClick: () => router.push('/mobile')
        },
        {
            icon: <VscCircuitBoard size={20} />,
            label: 'Jasa Sistem IoT',
            onClick: () => router.push('/iot')
        },
        {
            icon: <VscLayout size={20} />,
            label: 'Jasa Design UI UX',
            onClick: () => router.push('/design')
        },
        {
            icon: <VscSignOut size={20} />,
            label: 'Keluar',
            onClick: handleLogout
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col relative">
            {/* Navbar */}
            <nav className="bg-white shadow-sm sticky top-0 z-10 border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between h-16 items-center">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-[#E02435] rounded-lg flex items-center justify-center">
                            <VscHome className="text-white text-sm" />
                        </div>
                        <h1 className="text-xl sm:text-2xl font-bold text-[#E02435] font-daydream">
                            MUMET.IN
                        </h1>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-4">
                        <div className="hidden sm:flex flex-col items-end">
                            <span className="text-gray-700 text-sm">
                                Selamat datang, <b>{user.displayName || user.email?.split('@')[0]}</b>
                            </span>
                            <span className="text-gray-500 text-xs">{user.email}</span>
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
                                    // Fallback jika gambar error
                                    const target = e.target as HTMLImageElement;
                                    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                        user.displayName || user.email || 'User'
                                    )}&background=E02435&color=fff&size=128`;
                                }}
                            />
                            {/* Online indicator */}
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="flex-grow flex flex-col items-center justify-start text-center py-8 sm:py-12 px-4 sm:px-6 relative z-10">
                {/* Welcome Section */}
                <div className="w-full max-w-4xl mb-8 sm:mb-12">
                    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4">
                            Selamat Datang di <span className="text-[#E02435] font-daydream">MUMET.IN</span>
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto mb-6 text-sm sm:text-base">
                            Platform terpercaya untuk mewujudkan ide digital Anda. Dari yang mumet jadi beres!
                        </p>

                        {userCount !== null && (
                            <div className="inline-flex items-center bg-gradient-to-r from-[#E02435] to-pink-600 text-white px-6 py-3 rounded-2xl shadow-lg">
                                <VscOrganization size={24} className="mr-2" />
                                <div className="text-left">
                                    <div className="text-2xl font-bold">{userCount.toLocaleString()}+</div>
                                    <div className="text-xs opacity-90">Klien Percaya</div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Services Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
                        {/* Services content can be added here */}
                    </div>
                </div>
            </main>

            <div className="fixed bottom-0 left-0 right-0 flex justify-center pb-4 z-50">
                <Dock
                    items={dockItems}
                    panelHeight={68}
                    baseItemSize={60}
                    magnification={70}
                />
            </div>
        </div>
    );
}