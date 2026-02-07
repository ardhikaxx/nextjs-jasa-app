'use client';

import { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { FiLogOut, FiX, FiAlertTriangle, FiGlobe, FiSmartphone, FiCpu, FiLayout, FiChevronRight, FiSettings, FiChevronLeft, FiSend, FiCalendar, FiClock } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useI18n } from '@/i18n/LanguageProvider';

const SplitText = dynamic(() => import('@/components/SplitText'), {
    ssr: false,
});

interface ProjectType {
    id: string;
    name: string;
    icon: any;
    description: string;
}

interface DeadlineInfo {
    type: 'flexible' | 'specific' | null;
    date: string | null;
    displayText: string;
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
    const [selectedService, setSelectedService] = useState<ProjectType | null>(null);
    const [projectDetail, setProjectDetail] = useState('');
    const [projectDetailCharCount, setProjectDetailCharCount] = useState(0);
    const [showDeadlineDialog, setShowDeadlineDialog] = useState(false);
    const [enableMotion, setEnableMotion] = useState(false);
    const [deadlineInfo, setDeadlineInfo] = useState<DeadlineInfo>({
        type: null,
        date: null,
        displayText: ''
    });
    const [tempDeadlineDate, setTempDeadlineDate] = useState('');
    const maxChars = 500;
    const projectDetailMaxChars = 500;
    const { t, lang } = useI18n();

    useEffect(() => {
        if (!loading && !user && !isRedirecting) {
            setIsRedirecting(true);
            router.push('/');
        }
    }, [user, loading, isRedirecting, router]);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        const scheduleMotionUpdate = (matches: boolean) => {
            const nextValue = !matches;
            const w = window as Window & { requestIdleCallback?: (cb: () => void) => void };
            if (w.requestIdleCallback) {
                w.requestIdleCallback(() => setEnableMotion(nextValue));
            } else {
                setTimeout(() => setEnableMotion(nextValue), 300);
            }
        };

        scheduleMotionUpdate(prefersReducedMotion.matches);

        const onMotionChange = (event: MediaQueryListEvent) => {
            scheduleMotionUpdate(event.matches);
        };

        prefersReducedMotion.addEventListener('change', onMotionChange);
        return () => prefersReducedMotion.removeEventListener('change', onMotionChange);
    }, []);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await signOut(auth);
            setShowLogoutConfirm(false);
            toast.success(t('toast.logoutSuccess'), {
                theme: 'dark',
                position: 'top-center',
            });
        } catch (error) {
            console.error('Error signing out:', error);
            toast.error(t('toast.logoutError'), {
                theme: 'dark',
                position: 'top-center',
            });
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

    const handleFlexibleDeadline = () => {
        setDeadlineInfo({
            type: 'flexible',
            date: null,
            displayText: t('home.deadline.flexible')
        });
        setShowDeadlineDialog(false);
            toast.info(t('home.deadline.flexibleSelected'), {
                theme: 'dark',
                position: 'top-center',
            });
    };

    const handleSpecificDeadline = () => {
        // Set tanggal default ke 2 minggu dari sekarang
        const twoWeeksFromNow = new Date();
        twoWeeksFromNow.setDate(twoWeeksFromNow.getDate() + 14);
        const defaultDate = twoWeeksFromNow.toISOString().split('T')[0];
        setTempDeadlineDate(defaultDate);
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTempDeadlineDate(e.target.value);
    };

    const confirmSpecificDeadline = () => {
        if (!tempDeadlineDate) {
            toast.warning(t('toast.deadlinePick'), {
                theme: 'dark',
                position: 'top-center',
            });
            return;
        }

        const selectedDate = new Date(tempDeadlineDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            toast.warning(t('toast.deadlinePast'), {
                theme: 'dark',
                position: 'top-center',
            });
            return;
        }

        const formattedDate = selectedDate.toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        setDeadlineInfo({
            type: 'specific',
            date: tempDeadlineDate,
            displayText: `${t('home.deadline.prefix')}: ${formattedDate}`
        });
        setShowDeadlineDialog(false);
            toast.success(t('home.deadline.success'), {
                theme: 'dark',
                position: 'top-center',
            });
    };

    const openDeadlineDialog = () => {
        if (!projectDetail.trim()) {
            toast.warning(t('toast.detailRequired'), {
                theme: 'dark',
                position: 'top-center',
            });
            return;
        }
        setShowDeadlineDialog(true);
    };

    const closeDeadlineDialog = () => {
        setShowDeadlineDialog(false);
        setTempDeadlineDate('');
    };

    const sendProjectToWhatsApp = (serviceName: string, projectDetailText: string, deadline: DeadlineInfo) => {
        const phoneNumber = '6285933648537';

        let deadlineMessage = '';
        if (deadline.type === 'flexible') {
            deadlineMessage = t('home.deadline.flexible');
        } else if (deadline.type === 'specific' && deadline.date) {
            const formattedDate = new Date(deadline.date).toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            deadlineMessage = `${t('home.deadline.prefix')}: ${formattedDate}`;
        }

        const message = `${t('wa.projectGreeting')} ${serviceName}:\n\n*${t('wa.detailLabel')}:*\n${projectDetailText}\n\n*${t('wa.deadlineLabel')}:*\n${deadlineMessage}\n\n---\n*${t('wa.senderLabel')}:*\n${t('wa.nameLabel')}: ${user?.displayName || 'Tidak tersedia'}\n${t('wa.emailLabel')}: ${user?.email || 'Tidak tersedia'}\n\n*${t('wa.sentVia')}*`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');
    };

    const handleSubmitProject = () => {
        if (!selectedService || !projectDetail.trim()) {
            toast.warning(t('toast.detailRequired'), {
                theme: 'dark',
                position: 'top-center',
            });
            return;
        }

        if (!deadlineInfo.type) {
            toast.warning(t('toast.deadlineRequired'), {
                theme: 'dark',
                position: 'top-center',
            });
            return;
        }

        setIsSubmitting(true);

        try {
            sendProjectToWhatsApp(selectedService.name, projectDetail, deadlineInfo);

            setProjectDetail('');
            setProjectDetailCharCount(0);
            setSelectedService(null);
            setDeadlineInfo({
                type: null,
                date: null,
                displayText: ''
            });

            toast.success(
                <div>
                    <div className="font-bold text-white mb-1">{t('toast.projectSentTitle')}</div>
                    <div className="text-sm text-gray-300">{t('toast.projectSentDesc')}</div>
                </div>,
                {
                    theme: 'dark',
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                }
            );
            setActiveView('main');
        } catch (error) {
            console.error('Error sending project:', error);
            toast.error(
                <div>
                    <div className="font-bold text-white mb-1">{t('common.error')}</div>
                    <div className="text-sm text-gray-300">{t('toast.projectErrorDesc')}</div>
                </div>,
                {
                    theme: 'dark',
                    position: 'top-center',
                    autoClose: 4000,
                }
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSubmitQuestion = () => {
        if (!question.trim()) {
            toast.warning(t('toast.questionRequired'), {
                theme: 'dark',
                position: 'top-center',
            });
            return;
        }

        setIsSubmitting(true);

        try {
            sendQuestionToWhatsApp(question);

            setQuestion('');
            setCharCount(0);

            toast.success(
                <div>
                    <div className="font-bold text-white mb-1">{t('toast.questionSentTitle')}</div>
                    <div className="text-sm text-gray-300">{t('toast.questionSentDesc')}</div>
                </div>,
                {
                    theme: 'dark',
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                }
            );
            setActiveView('main');
        } catch (error) {
            console.error('Error sending question:', error);
            toast.error(
                <div>
                    <div className="font-bold text-white mb-1">{t('common.error')}</div>
                    <div className="text-sm text-gray-300">{t('toast.questionErrorDesc')}</div>
                </div>,
                {
                    theme: 'dark',
                    position: 'top-center',
                    autoClose: 4000,
                }
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const sendQuestionToWhatsApp = (questionText: string) => {
        const phoneNumber = '6285933648537';

        const message = `${t('wa.questionGreeting')}\n\n${questionText}\n\n---\n*${t('wa.senderLabel')}:*\n${t('wa.nameLabel')}: ${user?.displayName || 'Tidak tersedia'}\n${t('wa.emailLabel')}: ${user?.email || 'Tidak tersedia'}\n\n*${t('wa.sentVia')}*`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');
    };

    if (loading || isRedirecting) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
                    <p className="text-white">{t('common.loading')}</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
                    <p className="text-white">{t('common.loading')}</p>
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

    const handleAnimationComplete = () => {};

    const projectTypes: ProjectType[] = [
        {
            id: 'website',
            name: t('service.website.name'),
            icon: FiGlobe,
            description: t('service.website.desc')
        },
        {
            id: 'mobile',
            name: t('service.mobile.name'),
            icon: FiSmartphone,
            description: t('service.mobile.desc')
        },
        {
            id: 'iot',
            name: t('service.iot.name'),
            icon: FiCpu,
            description: t('service.iot.desc')
        },
        {
            id: 'ml',
            name: t('service.ml.name'),
            icon: FiCpu,
            description: t('service.ml.desc')
        },
        {
            id: 'uiux',
            name: t('service.uiux.name'),
            icon: FiLayout,
            description: t('service.uiux.desc')
        },
        {
            id: 'other',
            name: t('service.other.name'),
            icon: FiSettings,
            description: t('service.other.desc')
        }
    ];

    const isSubmitEnabled = projectDetail.trim() && deadlineInfo.type && !isSubmitting;

    return (
        <div className="min-h-screen bg-black flex flex-col relative">
            {/* Toast Container */}
            <ToastContainer
                theme="dark"
                position="top-center"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                toastClassName="bg-gray-800/90 backdrop-blur-lg border border-gray-700"
                className="text-white font-sans"
                progressClassName="bg-gradient-to-r from-red-500 to-red-600"
            />

            {/* Logout Confirmation Modal */}
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
                                    className="flex-1 px-4 py-3 bg-linear-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-sm flex items-center justify-center"
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

            {showDeadlineDialog && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                    <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl max-w-md w-full mx-auto transform transition-all duration-300 scale-100"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={closeDeadlineDialog}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200"
                        >
                            <FiX size={20} />
                        </button>

                        <div className="p-6 sm:p-8">
                            <div className="flex justify-center mb-4">
                                <div className="relative">
                                    <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center">
                                        <FiCalendar className="text-blue-500" size={28} />
                                    </div>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-white text-center mb-2 font-daydream">
                                {t('home.deadlineDialogTitle')}
                            </h3>
                            <p className="text-gray-300 text-center mb-6 text-sm leading-relaxed">
                                {t('home.deadlineDialogDesc')}
                            </p>

                            {!tempDeadlineDate ? (
                                <div className="space-y-3 mb-6">
                                    <button
                                        onClick={handleFlexibleDeadline}
                                        className="w-full p-4 bg-white/5 border border-gray-600 rounded-xl text-left hover:bg-white/10 hover:border-blue-500/50 transition-all duration-200 group"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div className="shrink-0 h-10 bg-green-500/20 rounded-lg flex items-center justify-center group-hover:bg-green-500/30 transition-colors duration-200">
                                                <FiClock className="text-green-500" size={20} />
                                            </div>
                                            <div>
                                                <h5 className="text-white font-bold text-sm">
                                                    {t('home.deadlineFlexibleTitle')}
                                                </h5>
                                                <p className="text-gray-300 text-xs">
                                                    {t('home.deadlineFlexibleDesc')}
                                                </p>
                                            </div>
                                        </div>
                                    </button>

                                    <button
                                        onClick={handleSpecificDeadline}
                                        className="w-full p-4 bg-white/5 border border-gray-600 rounded-xl text-left hover:bg-white/10 hover:border-red-500/50 transition-all duration-200 group"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div className="shrink-0 w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center group-hover:bg-red-500/30 transition-colors duration-200">
                                                <FiCalendar className="text-red-500" size={20} />
                                            </div>
                                            <div>
                                                <h5 className="text-white font-bold text-sm">
                                                    {t('home.deadlineSpecificTitle')}
                                                </h5>
                                                <p className="text-gray-300 text-xs">
                                                    {t('home.deadlineSpecificDesc')}
                                                </p>
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4 mb-6">
                                    <div className="bg-white/5 border border-gray-600 rounded-xl p-4">
                                        <label className="block text-white font-bold text-sm mb-2">
                                            {t('home.deadlinePickTitle')}
                                        </label>
                                        <input
                                            type="date"
                                            value={tempDeadlineDate}
                                            onChange={handleDateChange}
                                            min={new Date().toISOString().split('T')[0]}
                                            className="w-full bg-black/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-red-500 transition-colors duration-200"
                                        />
                                        <p className="text-gray-400 text-xs mt-2">
                                            {t('home.deadlinePickHint')}
                                        </p>
                                    </div>

                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => setTempDeadlineDate('')}
                                            className="flex-1 px-4 py-2 border border-gray-600 text-white rounded-lg hover:bg-white/10 transition-all duration-200 font-medium text-sm"
                                        >
                                            {t('home.deadlineBack')}
                                        </button>
                                        <button
                                            onClick={confirmSpecificDeadline}
                                            className="flex-1 px-4 py-2 bg-linear-to-rrom-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 font-medium text-sm"
                                        >
                                            {t('home.setDeadline')}
                                        </button>
                                    </div>
                                </div>
                            )}
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
                                {t('home.nav.welcome')}, <b>{user.displayName || user.email?.split('@')[0]}</b>
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
                                {t('home.nav.logout')}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="grow flex flex-col items-center justify-center text-center py-8 sm:py-12 px-4 sm:px-6 relative z-10">
                <div className="w-full max-w-2xl mb-8 sm:mb-12 mx-auto">
                    <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8 flex flex-col items-center">
                        {enableMotion ? (
                            <SplitText
                                text={t('home.title')}
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
                        ) : (
                            <h2 className="text-lg text-center sm:text-lg lg:text-2xl font-extrabold text-white mb-4 font-daydream">
                                {t('home.title')}
                            </h2>
                        )}
                        <p className="text-gray-300 max-w-md mx-auto mb-6 text-sm sm:text-base">
                            {t('home.desc')}
                        </p>

                        <div className="border-t border-gray-600 my-6"></div>
                        {activeView === 'main' && (
                            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-xl">
                                <button
                                    onClick={() => setActiveView('project-type')}
                                    className="flex-1 px-6 py-4 bg-red-700 text-white rounded-2xl hover:bg-white hover:text-[#c41e2e] transition-all duration-200 font-bold text-md shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-daydream"
                                >
                                    {t('home.cta.service')}
                                </button>
                                <button
                                    onClick={() => setActiveView('ask-first')}
                                    className="flex-1 px-6 py-4 border-2 border-gray-600 text-white rounded-2xl hover:bg-white hover:text-[#c41e2e] transition-all duration-200 font-bold text-md shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-daydream"
                                >
                                    {t('home.cta.ask')}
                                </button>
                            </div>
                        )}

                        {activeView === 'project-type' && (
                            <div className="animate-fade-in w-full">
                                <div className="flex items-center justify-between mb-6">
                                    <button
                                        onClick={() => setActiveView('main')}
                                        className="flex items-center text-gray-400 hover:text-white transition-colors duration-200"
                                    >
                                        <FiChevronLeft className="mr-2" size={20} />
                                        {t('home.back')}
                                    </button>
                                    <h4 className="text-sm sm:text-md lg:text-lg font-extrabold text-white">
                                        {t('home.projectTypeTitle')}
                                    </h4>
                                    <div className="w-8"></div>
                                </div>

                                <div className="space-y-4 w-full">
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
                                                        <div className="shrink-0 w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center group-hover:bg-red-500/30 transition-colors duration-200">
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
                            <div className="animate-fade-in w-full">
                                <div className="flex items-center justify-between mb-6">
                                    <button
                                        onClick={() => setActiveView('project-type')}
                                        className="flex items-center text-gray-400 hover:text-white transition-colors duration-200"
                                    >
                                        <FiChevronLeft className="mr-2" size={20} />
                                        {t('home.back')}
                                    </button>
                                    <h4 className="text-sm sm:text-md lg:text-lg font-extrabold text-white">
                                        {t('home.projectDetailTitle')} {selectedService.name}
                                    </h4>
                                    <div className="w-8"></div>
                                </div>

                                <div className="space-y-6 w-full">
                                    <div className="bg-white/5 border border-gray-600 rounded-2xl p-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="shrink-0 w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center">
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

                                    <div className="bg-white/5 border border-gray-600 rounded-2xl p-4">
                                        <h5 className="text-white font-bold text-lg mb-3 text-left">
                                        {t('home.projectDetailIntro')}
                                        </h5>
                                        <textarea
                                            value={projectDetail}
                                            onChange={handleProjectDetailChange}
                                            placeholder={t('home.projectDetailPlaceholder')}
                                            className="w-full bg-transparent text-white placeholder-gray-400 resize-none focus:outline-none min-h-50 text-sm"
                                            rows={8}
                                        />
                                        <div className="flex justify-between items-center mt-2">
                                            <span className={`text-xs ${projectDetailCharCount === projectDetailMaxChars ? 'text-red-400' : 'text-gray-400'}`}>
                                                {t('home.projectDetailRemain')} {projectDetailMaxChars - projectDetailCharCount}/{projectDetailMaxChars}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="bg-white/5 border border-gray-600 rounded-2xl p-4">
                                        <div className="flex items-center justify-between mb-3">
                                            <h5 className="text-white font-bold text-lg">
                                                {t('home.timeline')}
                                            </h5>
                                            <button
                                                onClick={openDeadlineDialog}
                                                className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 font-medium text-sm flex items-center"
                                            >
                                                <FiCalendar className="mr-2" size={16} />
                                                {t('home.setDeadline')}
                                            </button>
                                        </div>

                                        {deadlineInfo.displayText ? (
                                            <div className={`p-3 rounded-lg border ${
                                                deadlineInfo.type === 'flexible' 
                                                    ? 'bg-green-500/10 border-green-500/30' 
                                                    : 'bg-red-500/10 border-red-500/30'
                                            }`}>
                                                <div className="flex items-center">
                                                    {deadlineInfo.type === 'flexible' ? (
                                                        <FiClock className="text-green-500 mr-2" size={16} />
                                                    ) : (
                                                        <FiCalendar className="text-red-500 mr-2" size={16} />
                                                    )}
                                                    <span className="text-white font-medium text-sm">
                                                        {deadlineInfo.displayText}
                                                    </span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                                                <div className="flex items-center text-yellow-400">
                                                    <FiAlertTriangle className="mr-2" size={16} />
                                                    <span className="text-sm">
                                                        {t('home.deadline.none')}
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <button
                                        onClick={handleSubmitProject}
                                        disabled={!isSubmitEnabled}
                                        className="w-full px-6 py-4 bg-linear-to-rrom-red-600 to-red-700 text-white rounded-2xl hover:from-red-700 hover:to-red-800 transition-all duration-200 font-bold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-lg flex items-center justify-center"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                                {t('home.openingWhatsapp')}
                                            </>
                                        ) : (
                                            <>
                                                <FiSend className="mr-2" size={18} />
                                                {t('home.submitProject')}
                                            </>
                                        )}
                                    </button>

                                    <p className="text-gray-400 text-sm text-center px-10">
                                        {t('home.whatsappHint')}
                                    </p>
                                </div>
                            </div>
                        )}

                        {activeView === 'ask-first' && (
                            <div className="animate-fade-in w-full">
                                <div className="flex items-center justify-center mb-6">
                                    <button
                                        onClick={() => setActiveView('main')}
                                        className="flex items-center text-gray-400 hover:text-white transition-colors duration-200"
                                    >
                                        <FiChevronLeft className="mr-2" size={20} />
                                        {t('home.back')}
                                    </button>
                                    <h4 className="text-sm sm:text-md lg:text-lg font-extrabold text-white">
                                        {t('home.askTitle')}
                                    </h4>
                                    <div className="w-8"></div>
                                </div>

                                <div className="space-y-4 w-full">
                                    <div className="bg-white/5 border border-gray-600 rounded-2xl p-4">
                                        <textarea
                                            value={question}
                                            onChange={handleQuestionChange}
                                            placeholder={t('home.askPlaceholder')}
                                            className="w-full bg-transparent text-white placeholder-gray-400 resize-none focus:outline-none min-h-30"
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
                                        className="w-full px-6 py-4 bg-linear-to-r from-red-600 to-red-700 text-white rounded-2xl hover:from-red-700 hover:to-red-800 transition-all duration-200 font-bold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-lg flex items-center justify-center"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                                {t('home.openingWhatsapp')}
                                            </>
                                        ) : (
                                            <>
                                                <FiSend className="mr-2" size={18} />
                                                {t('home.submitQuestion')}
                                            </>
                                        )}
                                    </button>

                                    <p className="text-gray-400 text-sm text-center px-10">
                                        {t('home.whatsappHint')}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

