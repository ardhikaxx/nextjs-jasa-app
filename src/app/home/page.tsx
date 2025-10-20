'use client';

import { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import SplitText from '@/components/SplitText';
import { FiLogOut, FiX, FiAlertTriangle, FiGlobe, FiSmartphone, FiCpu, FiLayout, FiChevronRight, FiSettings, FiChevronLeft, FiSend } from 'react-icons/fi';
import ImageLoop from '@/components/ImageLoop';

interface AvatarUser {
    uid: string;
    photoURL: string | null;
    displayName: string;
}

interface ProjectType {
    id: string;
    name: string;
    icon: any;
    description: string;
}

export default function HomePage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [isRedirecting, setIsRedirecting] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [activeView, setActiveView] = useState<'main' | 'project-type' | 'ask-first' | 'project-detail'>('main');
    const [question, setQuestion] = useState('');
    const [charCount, setCharCount] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [avatarUsers, setAvatarUsers] = useState<AvatarUser[]>([]);
    const [loadingAvatars, setLoadingAvatars] = useState(true);
    const [selectedService, setSelectedService] = useState<ProjectType | null>(null);
    const [projectDetail, setProjectDetail] = useState('');
    const [projectDetailCharCount, setProjectDetailCharCount] = useState(0);
    const maxChars = 500;
    const projectDetailMaxChars = 500;

    useEffect(() => {
        const fetchAvatarUsers = async () => {
            try {
                setLoadingAvatars(true);
                const response = await fetch('/api/avatars');
                const data = await response.json();

                if (data.users && Array.isArray(data.users)) {
                    setAvatarUsers(data.users);
                }
            } catch (error) {
                console.error('Error fetching avatar users:', error);
            } finally {
                setLoadingAvatars(false);
            }
        };

        fetchAvatarUsers();
    }, []);

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

    const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        if (value.length <= maxChars) {
            setQuestion(value);
            setCharCount(value.length);
        }
    };

    const handleProjectDetailChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        if (value.length <= projectDetailMaxChars) {
            setProjectDetail(value);
            setProjectDetailCharCount(value.length);
        }
    };

    const handleProjectTypeSelect = (projectType: ProjectType) => {
        setSelectedService(projectType);
        setActiveView('project-detail');
    };

    const sendProjectToWhatsApp = (serviceName: string, projectDetailText: string) => {
        const phoneNumber = '6285933648537';

        const message = `Halo Mumet.in! Saya ingin jasa sekarang ${serviceName}:\n\n ini detail dari projek yang saya inginkan:\n${projectDetailText}\n\n---\n*Data Pengirim:*\nNama: ${user?.displayName || 'Tidak tersedia'}\nEmail: ${user?.email || 'Tidak tersedia'}\n\n*Pertanyaan ini dikirim melalui website Mumet.in*`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');
    };

    const handleSubmitProject = () => {
        if (!selectedService || !projectDetail.trim()) return;

        setIsSubmitting(true);

        try {
            sendProjectToWhatsApp(selectedService.name, projectDetail);

            setProjectDetail('');
            setProjectDetailCharCount(0);
            setSelectedService(null);

            alert('Detail proyek Anda sedang dibuka di WhatsApp! Silakan lanjutkan pengiriman melalui aplikasi WhatsApp.');
            setActiveView('main');
        } catch (error) {
            console.error('Error sending project:', error);
            alert('Terjadi kesalahan saat mengirim detail proyek. Silakan coba lagi.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSubmitQuestion = () => {
        if (!question.trim()) return;

        setIsSubmitting(true);

        try {
            sendQuestionToWhatsApp(question);

            setQuestion('');
            setCharCount(0);

            alert('Pertanyaan Anda sedang dibuka di WhatsApp! Silakan lanjutkan pengiriman melalui aplikasi WhatsApp.');
            setActiveView('main');
        } catch (error) {
            console.error('Error sending question:', error);
            alert('Terjadi kesalahan saat mengirim pertanyaan. Silakan coba lagi.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const sendQuestionToWhatsApp = (questionText: string) => {
        const phoneNumber = '6285933648537';

        const message = `Halo Mumet.in! Saya ingin bertanya:\n\n${questionText}\n\n---\n*Data Pengirim:*\nNama: ${user?.displayName || 'Tidak tersedia'}\nEmail: ${user?.email || 'Tidak tersedia'}\n\n*Pertanyaan ini dikirim melalui website Mumet.in*`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');
    };

    const avatarLogos = avatarUsers.map((user, index) => {
        if (user.photoURL) {
            return {
                src: user.photoURL,
                alt: user.displayName,
                title: user.displayName,
                width: 40,
                height: 40
            };
        } else {
            const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName)}&background=E02435&color=fff&size=80`;
            return {
                src: avatarUrl,
                alt: user.displayName,
                title: user.displayName,
                width: 40,
                height: 40
            };
        }
    });

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

    const projectTypes: ProjectType[] = [
        {
            id: 'website',
            name: 'Jasa Website',
            icon: FiGlobe,
            description: 'Pembuatan website company profile, landing page, blog, atau web aplikasi custom'
        },
        {
            id: 'mobile',
            name: 'Jasa Aplikasi Mobile',
            icon: FiSmartphone,
            description: 'Pengembangan aplikasi iOS dan Android dengan teknologi terbaru'
        },
        {
            id: 'iot',
            name: 'Jasa Sistem IoT',
            icon: FiCpu,
            description: 'Sistem Internet of Things untuk smart home, industri, dan monitoring'
        },
        {
            id: 'uiux',
            name: 'Jasa Design UI/UX',
            icon: FiLayout,
            description: 'Desain interface dan experience yang user-friendly dan modern'
        },
        {
            id: 'other',
            name: 'Jasa Lainnya (Custom)',
            icon: FiSettings,
            description: 'Jika kamu bingung atau proyekmu tidak tersedia pada pilihan diatas'
        }
    ];

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
                                    className="flex-1 px-4 py-3 border border-gray-600 text-white rounded-xl hover:bg-white hover:text-[#c41e2e] font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center justify-center"
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
            <nav className="bg-white/10 backdrop-blur-lg shadow-sm sticky top-0 z-50">
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
                                className="rounded-full border-2 border-[#c41e2e]/30 object-cover transition-all hover:border-[#c41e2e]/60 hover:scale-105 cursor-pointer"
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

                        <div className="border-t border-gray-600 my-6"></div>
                        {activeView === 'main' && (
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={() => setActiveView('project-type')}
                                    className="flex-1 px-6 py-4 bg-red-700 text-white rounded-2xl hover:bg-white hover:text-[#c41e2e] transition-all duration-200 font-bold text-md shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-daydream"
                                >
                                    Mau Jasa Sekarang
                                </button>
                                <button
                                    onClick={() => setActiveView('ask-first')}
                                    className="flex-1 px-6 py-4 border-2 border-gray-600 text-white rounded-2xl hover:bg-white hover:text-[#c41e2e] transition-all duration-200 font-bold text-md shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-daydream"
                                >
                                    Mau Tanya-tanya Dulu
                                </button>
                            </div>
                        )}

                        {activeView === 'project-type' && (
                            <div className="animate-fade-in">
                                <div className="flex items-center justify-between mb-6">
                                    <button
                                        onClick={() => setActiveView('main')}
                                        className="flex items-center text-gray-400 hover:text-white transition-colors duration-200"
                                    >
                                        <FiChevronLeft className="mr-2" size={20} />
                                        Kembali
                                    </button>
                                    <h4 className="text-sm sm:text-md lg:text-lg font-extrabold text-white">
                                        Jenis proyekmu termasuk yang mana?
                                    </h4>
                                    <div className="w-8"></div>
                                </div>

                                <div className="space-y-4">
                                    {projectTypes.map((project) => {
                                        const IconComponent = project.icon;
                                        return (
                                            <button
                                                key={project.id}
                                                onClick={() => handleProjectTypeSelect(project)}
                                                className="w-full p-4 bg-white/5 border border-gray-600 rounded-2xl text-left hover:bg-white/10 hover:border-gray-400 transition-all duration-200 group"
                                            >
                                                <div className="flex items-center justify-between space-x-4">
                                                    <div className="flex items-center space-x-4">
                                                        <div className="flex-shrink-0 w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center group-hover:bg-red-500/30 transition-colors duration-200">
                                                            <IconComponent className="text-red-500" size={24} />
                                                        </div>
                                                        <div className="flex-1 text-left">
                                                            <h5 className="text-white font-bold text-lg mb-1">
                                                                {project.name}
                                                            </h5>
                                                            <p className="text-gray-300 text-sm">
                                                                {project.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <FiChevronRight className="text-gray-400" size={20} />
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {activeView === 'project-detail' && selectedService && (
                            <div className="animate-fade-in">
                                <div className="flex items-center justify-between mb-6">
                                    <button
                                        onClick={() => setActiveView('project-type')}
                                        className="flex items-center text-gray-400 hover:text-white transition-colors duration-200"
                                    >
                                        <FiChevronLeft className="mr-2" size={20} />
                                        Kembali
                                    </button>
                                    <h4 className="text-sm sm:text-md lg:text-lg font-extrabold text-white">
                                        Detail Proyek {selectedService.name}
                                    </h4>
                                    <div className="w-8"></div>
                                </div>

                                <div className="space-y-6">
                                    {/* Selected Service Info */}
                                    <div className="bg-white/5 border border-gray-600 rounded-2xl p-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="flex-shrink-0 w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center">
                                                {selectedService.icon && (
                                                    <selectedService.icon className="text-red-500" size={20} />
                                                )}
                                            </div>
                                            <div className="text-left">
                                                <h5 className="text-white font-bold text-md">
                                                    {selectedService.name}
                                                </h5>
                                                <p className="text-gray-300 text-xs">
                                                    {selectedService.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Project Detail Textarea */}
                                    <div className="bg-white/5 border border-gray-600 rounded-2xl p-4">
                                        <h5 className="text-white font-bold text-lg mb-3 text-left">
                                            Ceritakan proyek yang mau dibuat yaa
                                        </h5>
                                        <textarea
                                            value={projectDetail}
                                            onChange={handleProjectDetailChange}
                                            placeholder="Masukkan detail projek seperti fitur proyek, fungsionalitas, dll..."
                                            className="w-full bg-transparent text-white placeholder-gray-400 resize-none focus:outline-none min-h-[200px] text-sm"
                                            rows={8}
                                        />
                                        <div className="flex justify-between items-center mt-2">
                                            <span className={`text-xs ${projectDetailCharCount === projectDetailMaxChars ? 'text-red-400' : 'text-gray-400'}`}>
                                                Sisa karakter {projectDetailMaxChars - projectDetailCharCount}/{projectDetailMaxChars}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        onClick={handleSubmitProject}
                                        disabled={!projectDetail.trim() || projectDetailCharCount === 0 || isSubmitting}
                                        className="w-full px-6 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-2xl hover:from-red-700 hover:to-red-800 transition-all duration-200 font-bold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-lg flex items-center justify-center"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                                Membuka WhatsApp...
                                            </>
                                        ) : (
                                            <>
                                                <FiSend className="mr-2" size={18} />
                                                Kirim Detail Proyek
                                            </>
                                        )}
                                    </button>

                                    <p className="text-gray-400 text-xs text-center">
                                        Detail proyek Anda akan dikirim melalui WhatsApp. Pastikan Anda telah menginstal aplikasi WhatsApp di perangkat Anda.
                                    </p>
                                </div>
                            </div>
                        )}

                        {activeView === 'ask-first' && (
                            <div className="animate-fade-in">
                                <div className="flex items-center justify-between mb-6">
                                    <button
                                        onClick={() => setActiveView('main')}
                                        className="flex items-center text-gray-400 hover:text-white transition-colors duration-200"
                                    >
                                        <FiChevronLeft className="mr-2" size={20} />
                                        Kembali
                                    </button>
                                    <h4 className="text-sm sm:text-md lg:text-lg font-extrabold text-white">
                                        Mau tanya-tanya dulu?
                                    </h4>
                                    <div className="w-8"></div>
                                </div>

                                <div className="space-y-4">
                                    <div className="bg-white/5 border border-gray-600 rounded-2xl p-4">
                                        <textarea
                                            value={question}
                                            onChange={handleQuestionChange}
                                            placeholder="Masukkan pertanyaan kamu disini... Contoh: Saya ingin konsultasi tentang pembuatan website untuk bisnis kuliner, berapa kisaran biayanya dan berapa lama pengerjaannya?"
                                            className="w-full bg-transparent text-white placeholder-gray-400 resize-none focus:outline-none min-h-[120px]"
                                            rows={5}
                                        />
                                        <div className="flex justify-between items-center mt-2">
                                            <span className={`text-xs ${charCount === maxChars ? 'text-red-400' : 'text-gray-400'}`}>
                                                Sisa karakter {maxChars - charCount}/{maxChars}
                                            </span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleSubmitQuestion}
                                        disabled={!question.trim() || charCount === 0 || isSubmitting}
                                        className="w-full px-6 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-2xl hover:from-red-700 hover:to-red-800 transition-all duration-200 font-bold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-lg flex items-center justify-center"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                                Membuka WhatsApp...
                                            </>
                                        ) : (
                                            <>
                                                <FiSend className="mr-2" size={18} />
                                                Kirim Pertanyaan
                                            </>
                                        )}
                                    </button>

                                    <p className="text-gray-400 text-xs text-center">
                                        Pertanyaan Anda akan dikirim melalui WhatsApp. Pastikan Anda telah menginstal aplikasi WhatsApp di perangkat Anda.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="w-full max-w-4xl mt-16 mb-8">
                    <div className="text-center mb-3">
                        <h2 className="text-lg sm:text-2xl font-bold text-white mb-2">
                            Orang telah mempercayakan membuat proyek digital mereka bersama kami!
                        </h2>
                        <p className="text-gray-300 text-sm sm:text-base">
                            Bergabung dengan {avatarUsers.length}+ pengguna yang sudah merasakan layanan kami
                        </p>
                    </div>

                    {loadingAvatars ? (
                        <div className="flex justify-center items-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                            <span className="text-white ml-3">Memuat avatar pengguna...</span>
                        </div>
                    ) : avatarLogos.length > 0 ? (
                        <div className="bg-white/5 backdrop-blur-lg flex justify-center items-center rounded-3xl shadow-lg border border-gray-600 py-3">
                            <ImageLoop
                                logos={avatarLogos}
                                speed={60}
                                direction="left"
                                logoHeight={40}
                                gap={24}
                                pauseOnHover={false}
                                scaleOnHover={false}
                                ariaLabel="Avatar pengguna Mumet.in"
                                className='grayscale-100'
                            />
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-gray-400">Belum ada data pengguna yang tersedia.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}