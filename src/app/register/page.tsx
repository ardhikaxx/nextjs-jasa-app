'use client';

import { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, updateProfile } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import CircularText from '@/components/CircularText';
import {
    VscEye,
    VscEyeClosed,
} from 'react-icons/vsc';

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

    // Redirect jika sudah login
    useEffect(() => {
        if (user && !authLoading) {
            router.push('/home');
        }
    }, [user, authLoading, router]);

    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mb-4"></div>
                    <p className="text-white">Loading...</p>
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
            setError('Please fill in all fields');
            return false;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return false;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            setError('Please enter a valid email address');
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
                    setError('This email is already registered');
                    break;
                case 'auth/invalid-email':
                    setError('Invalid email address');
                    break;
                case 'auth/operation-not-allowed':
                    setError('Email/password accounts are not enabled');
                    break;
                case 'auth/weak-password':
                    setError('Password is too weak');
                    break;
                default:
                    setError('Failed to create account. Please try again');
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
                    setError('Google sign-in was cancelled');
                    break;
                case 'auth/popup-blocked':
                    setError('Popup was blocked by browser. Please allow popups for this site');
                    break;
                case 'auth/network-request-failed':
                    setError('Network error. Please check your internet connection');
                    break;
                case 'auth/account-exists-with-different-credential':
                    setError('An account already exists with the same email but different sign-in method. Please try signing in with email and password');
                    break;
                case 'auth/operation-not-allowed':
                    setError('Google sign-in is not enabled. Please contact support');
                    break;
                case 'auth/unauthorized-domain':
                    setError('This domain is not authorized for Google sign-in. Please contact support');
                    break;
                default:
                    setError(`Failed to sign up with Google: ${error.message}`);
            }
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
                            Join Us Today
                        </h2>
                        <p className="text-purple-200 text-sm">
                            Create your account to get started
                        </p>
                    </div>

                    <form className="space-y-6" onSubmit={handleRegister}>
                        {error && (
                            <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl text-sm backdrop-blur-sm">
                                <div className="font-medium flex items-center">
                                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                    {error}
                                </div>
                            </div>
                        )}

                        <div className="space-y-4">
                            <div className="relative">
                                <label 
                                    htmlFor="email" 
                                    className={`absolute left-4 transition-all duration-200 ${
                                        isFocused.email || email 
                                            ? 'top-2 text-xs text-white' 
                                            : 'top-4 text-sm text-white'
                                    }`}
                                >
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="w-full px-4 pt-6 pb-2 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E02435] focus:border-transparent transition-all duration-200 text-white placeholder-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                                    placeholder="Enter your email"
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
                                    className={`absolute left-4 transition-all duration-200 ${
                                        isFocused.password || password 
                                            ? 'top-2 text-xs text-white' 
                                            : 'top-4 text-sm text-white'
                                    }`}
                                >
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="new-password"
                                    required
                                    className="w-full px-4 pt-6 pb-2 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E02435] focus:border-transparent transition-all duration-200 text-white placeholder-transparent disabled:opacity-50 disabled:cursor-not-allowed pr-12"
                                    placeholder="Enter your password (min. 6 characters)"
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

                            <div className="relative">
                                <label 
                                    htmlFor="confirmPassword" 
                                    className={`absolute left-4 transition-all duration-200 ${
                                        isFocused.confirmPassword || confirmPassword 
                                            ? 'top-2 text-xs text-white' 
                                            : 'top-4 text-sm text-white'
                                    }`}
                                >
                                    Confirm Password
                                </label>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    autoComplete="new-password"
                                    required
                                    className="w-full px-4 pt-6 pb-2 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E02435] focus:border-transparent transition-all duration-200 text-white placeholder-transparent disabled:opacity-50 disabled:cursor-not-allowed pr-12"
                                    placeholder="Confirm your password"
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
                            className="w-full bg-[#E02435] text-white py-4 px-4 rounded-xl font-semibold hover:[#E02435] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E02435] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Creating account...
                                </span>
                            ) : (
                                'Create your account'
                            )}
                        </button>

                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-white/20" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-transparent text-purple-200">Or continue with</span>
                                </div>
                            </div>

                            <div className="mt-6">
                                <button
                                    type="button"
                                    onClick={handleGoogleRegister}
                                    disabled={isAnyLoading}
                                    className="w-full flex justify-center items-center py-3 px-4 border border-white/20 rounded-xl shadow-sm bg-white/5 text-white font-medium hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 backdrop-blur-sm transform hover:scale-[1.02]"
                                >
                                    {googleLoading ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Connecting...
                                        </span>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                                                <path
                                                    fill="currentColor"
                                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                                />
                                                <path
                                                    fill="currentColor"
                                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                                />
                                                <path
                                                    fill="currentColor"
                                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                                />
                                                <path
                                                    fill="currentColor"
                                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                                />
                                            </svg>
                                            Continue with Google
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="text-center pt-4">
                            <p className="text-sm text-purple-200">
                                Already have an account?{' '}
                                <Link 
                                    href="/login" 
                                    className="font-semibold text-white hover:text-purple-300 transition-colors"
                                >
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}