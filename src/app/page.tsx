'use client';

import { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import {
  FiUser,
  FiPlus,
  FiUsers,
  FiFolder,
  FiTrendingUp,
} from 'react-icons/fi';
import CurvedLoop from '@/components/CurvedLoop';
import StickerPeel from '@/components/StickerPeel';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [userCount, setUserCount] = useState<number | null>(null);

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
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-black text-white px-4 sm:px-6 relative overflow-hidden py-3 z-10">
        <StickerPeel
          imageSrc="https://developer.android.com/studio/images/android-studio-stable.svg"
          width={150}
          rotate={20}
          peelBackHoverPct={10}
          peelBackActivePct={20}
          shadowIntensity={0.2}
          lightingIntensity={0.1}
          initialPosition={{ x: -100, y: 100 }}
          className='z-50'
        />

        <div className="absolute inset-0 z-0">
          <CurvedLoop
            marqueeText="Dari ✦ Mumet ✦ Jadi ✦ Beres ✦ Mumet.in ✦"
            speed={3}
            curveAmount={500}
            direction="right"
            interactive={true}
            className="text-[#E02435] font-daydream custom-text-style"
          />
        </div>

        <div className="relative z-10 w-full max-w-lg mx-auto">

          <div className="flex justify-center items-center flex-col w-full mx-auto px-2">
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-center font-daydream text-white">
              MUMET.IN
            </h1>
            <p className="text-base sm:text-lg mb-5 text-gray-100 text-center px-2">
              Jasa layanan pembuatan Website, Aplikasi Mobile, Sistem IoT, dan Desain UI/UX yang profesional di era digital.
            </p>

            <div className="flex flex-col items-center justify-center sm:flex-row gap-3 sm:gap-4 mb-2 w-full max-w-xs sm:max-w-none">
              <Link
                href="/login"
                className="bg-white text-[#E02435] px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-gray-100 transition flex justify-center items-center w-full sm:w-auto"
              >
                <FiUser size={20} className="me-2" />
                Masuk
              </Link>
              <Link
                href="/register"
                className="border border-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-[#E02435] transition flex justify-center items-center w-full sm:w-auto"
              >
                <FiPlus size={20} className="me-2" />
                Daftar Sekarang
              </Link>
            </div>
          </div>

          {userCount !== null && (
            <div className="relative mt-8 sm:mt-10 bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-100 px-6 sm:px-10 py-6 w-full mx-auto text-center">

              <h4 className="text-sm font-semibold text-white mb-2 font-daydream">Statistik Kepercayaan</h4>
              <h2 className="text-4xl sm:text-6xl font-extrabold text-[#E02435] flex justify-center items-center">
                <FiUsers size={40} className="me-2" />
                {userCount.toLocaleString()}+
              </h2>
              <p className="text-white text-sm mb-3 mt-2 px-9">
                Orang telah mempercayakan membuat proyek digital mereka bersama kami!
              </p>

              <div className="bg-gray-50 text-gray-700 font-medium text-sm px-4 py-2 rounded-xl inline-flex items-center justify-center gap-2 shadow-inner">
                <FiTrendingUp className="text-[#E02435]" />
                Telah dipercaya oleh <span className="font-semibold text-[#E02435] font-daydream">banyak klien</span>
              </div>

              {/* Tombol Lihat Projek */}
              <div className="mt-6">
                <Link
                  href="/projects"
                  className="inline-flex items-center px-6 py-3 bg-[#E02435] text-white rounded-xl font-semibold hover:bg-[#c41e2e] transition-colors shadow-md"
                >
                  <FiFolder size={20} className="mr-2" />
                  Lihat Portofolio Projek
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
