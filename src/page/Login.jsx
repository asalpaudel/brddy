// src/page/Login.jsx

import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { HiOutlineMail, HiLockClosed, HiEye, HiEyeOff } from 'react-icons/hi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { doLogin } from '../services/auth';

const Login = () => {
    const navigate = useNavigate();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoginError('');

        if (!email.trim() || !password.trim()) {
            setLoginError("Email and password are required");
            return;
        }

        try {
            // The doLogin function now returns an object with login status and user role
            const { loggedIn, role } = await doLogin(email, password);
            
            if (loggedIn) {
                toast.success(`Login successful, welcome ${email}`);
                // **REDIRECT LOGIC:**
                // If the user is an 'admin', go to the dashboard.
                // Otherwise, redirect to the home page.
                if (role === 'admin') {
                    navigate('/admin/dashboard');
                } else {
                    navigate('/'); // Redirect regular users to the home page
                }
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
                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-stone-700">
                            Email address
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <HiOutlineMail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="you@example.com"
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-stone-700">
                            Password
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <HiLockClosed className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="appearance-none block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                                {showPassword ? <HiEyeOff className="h-5 w-5 text-gray-400" /> : <HiEye className="h-5 w-5 text-gray-400" />}
                            </button>
                        </div>
                    </div>
                    
                    {loginError && <div className="mt-1 text-sm text-red-600 text-center">{loginError}</div>}
                    
                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-amber-500 hover:bg-amber-600"
                        >
                            Log in
                        </button>
                    </div>
                </form>

                {/* Sign Up Link */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-stone-700">
                        Don't have an account?{' '}
                        {/* Corrected this link to point to /register */}
                        <NavLink to="/register" className="font-medium text-stone-700 hover:text-amber-600">
                            Sign Up
                        </NavLink>
                    </p>
                </div>

            </div>
        </div>
    );
};

export default Login;