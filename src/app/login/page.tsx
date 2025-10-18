'use client';

import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import CircularText from '@/components/CircularText';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();

    // Redirect jika sudah login
    useEffect(() => {
        if (user && !authLoading) {
            console.log('User already logged in, redirecting to home...');
            router.push('/home');
        }
    }, [user, authLoading, router]);

    // Tampilkan loading spinner selama auth loading
    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
                    <p className="text-white">Checking authentication...</p>
                </div>
            </div>
        );
    }

    // Jika sudah login, tampilkan loading sampai redirect
    if (user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
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
            let errorMessage = 'Login failed. Please try again.';
            
            switch (error.code) {
                case 'auth/invalid-credential':
                case 'auth/wrong-password':
                    errorMessage = 'Invalid email or password. Please check your credentials.';
                    break;
                case 'auth/user-not-found':
                    errorMessage = 'No account found with this email. Please sign up first.';
                    break;
                case 'auth/invalid-email':
                    errorMessage = 'Invalid email address format.';
                    break;
                case 'auth/user-disabled':
                    errorMessage = 'This account has been disabled. Please contact support.';
                    break;
                case 'auth/too-many-requests':
                    errorMessage = 'Too many failed attempts. Please try again later or reset your password.';
                    break;
                case 'auth/network-request-failed':
                    errorMessage = 'Network error. Please check your internet connection.';
                    break;
                case 'auth/operation-not-allowed':
                    errorMessage = 'Email/password login is not enabled. Please contact support.';
                    break;
                default:
                    errorMessage = `Login failed: ${error.message || 'Please try again'}`;
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
            
            // Konfigurasi provider Google - PERBAIKAN DI SINI
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
            
            // Check if user is newly created or existing
            const isNewUser = result.user.metadata.creationTime === result.user.metadata.lastSignInTime;
            console.log('Is new user:', isNewUser);
            
            // Redirect ke home
            router.push('/home');
            
        } catch (error: any) {
            console.error('Google login error:', error);
            console.error('Error details:', {
                code: error.code,
                message: error.message,
                email: error.email,
                credential: error.credential
            });

            let errorMessage = 'Failed to sign in with Google. Please try again.';

            switch (error.code) {
                case 'auth/popup-closed-by-user':
                    errorMessage = 'Google sign-in was cancelled.';
                    break;
                case 'auth/popup-blocked':
                    errorMessage = 'Popup was blocked by your browser. Please allow popups for this site and try again.';
                    break;
                case 'auth/unauthorized-domain':
                    errorMessage = 'This domain is not authorized for Google sign-in. Please contact support.';
                    break;
                case 'auth/account-exists-with-different-credential':
                    errorMessage = 'An account already exists with the same email but different sign-in method. Please try signing in with email and password.';
                    break;
                case 'auth/operation-not-allowed':
                    errorMessage = 'Google sign-in is not enabled. Please contact support.';
                    break;
                case 'auth/network-request-failed':
                    errorMessage = 'Network error. Please check your internet connection and try again.';
                    break;
                case 'auth/invalid-credential':
                    errorMessage = 'The authentication credential is invalid or has expired. Please try again.';
                    break;
                case 'auth/user-disabled':
                    errorMessage = 'This Google account has been disabled. Please contact support.';
                    break;
                case 'auth/user-not-found':
                    errorMessage = 'No account found with this Google account. Please try signing up first.';
                    break;
                default:
                    if (error.message.includes('popup')) {
                        errorMessage = 'Unable to open Google sign-in popup. Please check your browser settings.';
                    } else {
                        errorMessage = `Google sign-in failed: ${error.message}`;
                    }
            }
            
            setError(errorMessage);
        } finally {
            setGoogleLoading(false);
        }
    };

    const handleForgotPassword = () => {
        // Arahkan ke halaman reset password atau tampilkan modal
        setError('Forgot password feature coming soon. Please contact support for now.');
    };

    const isAnyLoading = loading || googleLoading;

    return (
        <div className="min-h-screen flex items-center justify-center bg-black py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* CircularText untuk desktop - pojok kanan atas */}
            <div className="hidden lg:block absolute top-6 right-6 z-10">
                <CircularText
                    text="MUMET.IN ✦ LANGSUNG ✦ BERES ✦ "
                    onHover="speedUp"
                    spinDuration={20}
                    className="w-16 h-16"
                />
            </div>

            <div className="w-full max-w-md">
                {/* CircularText untuk mobile - di atas tulisan Sign in */}
                <div className="block lg:hidden justify-center mb-6">
                    <CircularText
                        text="MUMET.IN ✦ LANGSUNG ✦ BERES ✦ "
                        onHover="speedUp"
                        spinDuration={20}
                        className="w-16 h-16"
                    />
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Sign in to your account
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Welcome back! Please enter your details.
                        </p>
                    </div>

                    <form className="space-y-6" onSubmit={handleLogin}>
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                                <div className="font-medium">{error}</div>
                                <div className="mt-2 text-xs flex flex-wrap gap-2">
                                    <button 
                                        type="button" 
                                        onClick={handleForgotPassword}
                                        className="underline hover:text-red-800 transition-colors"
                                    >
                                        Forgot password?
                                    </button>
                                    <span>•</span>
                                    <Link 
                                        href="/register" 
                                        className="underline hover:text-red-800 transition-colors"
                                    >
                                        Create new account
                                    </Link>
                                </div>
                            </div>
                        )}

                        <div className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={isAnyLoading}
                                    autoFocus
                                />
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-sm text-indigo-600 hover:text-indigo-500 transition-colors"
                                        disabled={isAnyLoading}
                                    >
                                        {showPassword ? 'Hide' : 'Show'}
                                    </button>
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={isAnyLoading}
                                    minLength={6}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isAnyLoading}
                            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Signing in...
                                </span>
                            ) : (
                                'Sign in'
                            )}
                        </button>

                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                                </div>
                            </div>

                            <div className="mt-6">
                                <button
                                    type="button"
                                    onClick={handleGoogleLogin}
                                    disabled={isAnyLoading}
                                    className="w-full flex justify-center items-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    {googleLoading ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
                            <p className="text-sm text-gray-600">
                                Don't have an account?{' '}
                                <Link 
                                    href="/register" 
                                    className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
                                >
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}