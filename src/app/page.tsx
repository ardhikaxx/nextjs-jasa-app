'use client';

import { useEffect, useState } from 'react';
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
import Footer from '@/components/Footer';
import CatLogo from '@/assets/images/cat.png';

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

  if (loading) {
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
      <div className="flex flex-col bg-black text-white min-h-screen">
        <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-6 relative overflow-hidden py-3 z-10">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <CurvedLoop
              marqueeText="Dari ✦ Mumet ✦ Jadi ✦ Beres ✦ Mumet.in ✦"
              speed={3}
              curveAmount={500}
              direction="right"
              interactive={false}
              className="font-daydream custom-text-style"
            />
          </div>

          <StickerPeel
            imageSrc={CatLogo.src}
            width={150}
            rotate={0}
            peelBackHoverPct={10}
            peelBackActivePct={20}
            shadowIntensity={0.2}
            lightingIntensity={0.1}
            initialPosition={{ x: 100, y: -55 }}
            className='z-50'
          />

          <div className="relative z-10 w-full max-w-lg mx-auto py-6">
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
                  className="bg-white text-[#c41e2e] px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-gray-100 transition flex justify-center items-center w-full sm:w-auto z-20 relative"
                >
                  <FiUser size={20} className="me-2" />
                  Masuk
                </Link>
                <Link
                  href="/register"
                  className="border border-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-[#c41e2e] transition flex justify-center items-center w-full sm:w-auto z-20 relative"
                >
                  <FiPlus size={20} className="me-2" />
                  Daftar Sekarang
                </Link>
              </div>
            </div>

            {userCount !== null && (
              <div className="relative mt-3 sm:mt-4 bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-100 px-6 sm:px-10 py-6 w-full mx-auto text-center z-20">
                <div className="absolute inset-0 rounded-3xl bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-size-[20px_20px] mask-[radial-gradient(ellipse_80%_50%_at_50%_50%,black_70%,transparent_100%)]"></div>
                <h4 className="text-sm font-semibold text-white mb-2 font-daydream relative z-10">
                  Statistik Kepercayaan
                </h4>
                <h2 className="text-4xl sm:text-6xl font-extrabold text-white flex justify-center items-center relative z-10">
                  <FiUsers size={48} className="me-2" />
                  {userCount.toLocaleString()}+
                </h2>
                <p className="text-white text-sm mb-3 mt-2 px-9 relative z-10">
                  Orang telah mempercayakan membuat proyek digital mereka bersama kami!
                </p>

                <div className="bg-gray-50 text-gray-700 font-medium text-sm px-4 py-2 rounded-xl inline-flex items-center justify-center gap-2 shadow-inner relative z-10">
                  <FiTrendingUp className="text-[#c41e2e]" />
                  Telah dipercaya oleh <span className="font-semibold text-[#c41e2e]">banyak klien</span>
                </div>

                <div className="mt-6 relative z-10">
                  <Link
                    href="/projects"
                    className="inline-flex items-center px-6 py-3 bg-[#c41e2e] text-white rounded-xl font-semibold hover:bg-[#a81a27] transition-colors shadow-md relative z-20"
                  >
                    <FiFolder size={20} className="mr-2" />
                    Lihat Portofolio Projek
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
