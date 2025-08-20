// src/pages/Login.jsx

import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { HiOutlineMail, HiLockClosed, HiEye, HiEyeOff } from 'react-icons/hi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// The real doLogin function is now imported from your services
import { doLogin } from '../services/auth';

const Login = () => {
    const navigate = useNavigate();
    
    // State to manage form inputs and password visibility
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // State for validation errors and general login error
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loginError, setLoginError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset errors on each submission attempt
        setEmailError('');
        setPasswordError('');
        setLoginError('');

        let hasError = false;
        if (!email.trim()) {
            setEmailError("Email is required");
            hasError = true;
        }
        if (!password.trim()) {
            setPasswordError("Password is required");
            hasError = true;
        }

        if (hasError) {
            return;
        }

        try {
            const loginStatus = await doLogin(email, password);
            if (loginStatus) {
                toast.success(`Login successful, welcome ${email}`);
                navigate('/admin/dashboard');
            } else {
                toast.error("Invalid email or password");
                setLoginError('Invalid email or password');
            }
        } catch (err) {
            toast.error("An unexpected error occurred. Please try again.");
            console.error("Login error:", err);
            setLoginError("An unexpected error occurred.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-orange-50/80 p-4">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

                {/* Logo and Heading */}
                <div className="flex flex-col items-center mb-6">
                    <NavLink to="/" className="text-4xl font-bold text-amber-900 mb-2" style={{ fontFamily: 'Pacifico, cursive' }}>
                        Brrdy
                    </NavLink>
                    <h2 className="text-center text-3xl font-extrabold text-stone-700">
                        Log in to your account
                    </h2>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-stone-700">
                            Email address
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <HiOutlineMail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 text-stone-700 sm:text-sm transition-colors duration-300"
                                placeholder="you@example.com"
                            />
                        </div>
                        {emailError && <div className="mt-1 text-sm text-red-600">{emailError}</div>}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-stone-700">
                            Password
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <HiLockClosed className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="appearance-none block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 text-stone-700 sm:text-sm transition-colors duration-300"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? (
                                    <HiEyeOff className="h-5 w-5 text-gray-400 hover:text-stone-700 transition-colors duration-200" />
                                ) : (
                                    <HiEye className="h-5 w-5 text-gray-400 hover:text-stone-700 transition-colors duration-200" />
                                )}
                            </button>
                        </div>
                        {passwordError && <div className="mt-1 text-sm text-red-600">{passwordError}</div>}
                    </div>

                    <div className="flex items-center">
                        <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-stone-700">
                            Remember me
                        </label>
                    </div>
                    {loginError && <div className="mt-1 text-sm text-red-600 text-center">{loginError}</div>}
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors duration-300"
                        >
                            Log in
                        </button>
                    </div>
                </form>

                {/* Sign Up Link */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-stone-700">
                        Don't have an account?{' '}
                        <NavLink to="/signup" className="font-medium text-stone-700 hover:text-amber-600">
                            Sign Up
                        </NavLink>
                    </p>
                </div>

            </div>
        </div>
    );
};

export default Login;