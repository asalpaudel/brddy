// src/component/user/Header.jsx

import React, { useState, useEffect } from 'react';
import { HiOutlineShoppingCart, HiMenu, HiX, HiOutlineLogout } from 'react-icons/hi';
import { NavLink, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    
    // State to hold user's name and login status
    const [userName, setUserName] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Check for auth token when the component mounts
    useEffect(() => {
        const token = localStorage.getItem('AUTH_TOKEN');
        const fName = localStorage.getItem('USER_FNAME');
        if (token && fName) {
            setIsLoggedIn(true);
            setUserName(fName);
        }
    }, []);

    const handleLogout = () => {
        // Clear local storage
        localStorage.removeItem('AUTH_TOKEN');
        localStorage.removeItem('USER_EMAIL');
        localStorage.removeItem('USER_ROLE');
        localStorage.removeItem('USER_FNAME');
        
        // Update state and redirect
        setIsLoggedIn(false);
        setUserName(null);
        navigate('/login');
    };

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '#', label: 'About Us' },
        { href: '/products', label: 'Products' },
        { href: '#', label: 'Contact Us' },
    ];

    return (
        <nav className="bg-orange-50/80 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    
                    <div className="flex-shrink-0">
                        <NavLink to="/" className="text-3xl font-bold text-amber-900" style={{ fontFamily: 'Pacifico, cursive' }}>Brrdy</NavLink>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-6">
                            {navLinks.map((link) => (
                                <NavLink key={link.label} to={link.href} className={({isActive}) => isActive ? "text-amber-600" : "text-stone-700 hover:text-amber-600"}>
                                    {link.label}
                                </NavLink>
                            ))}
                        </div>
                    </div>

                    {/* --- Dynamic User Section --- */}
                    <div className="hidden md:flex items-center space-x-4">
                        {isLoggedIn ? (
                            // Show if user IS logged in
                            <>
                                <span className="text-stone-700 font-medium">Welcome, {userName}</span>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center text-stone-700 hover:text-amber-600 font-medium transition-colors duration-300"
                                    title="Logout"
                                >
                                    <HiOutlineLogout className="h-6 w-6" />
                                </button>
                            </>
                        ) : (
                            // Show if user IS NOT logged in
                            <>
                                <NavLink to="/login" className="text-stone-700 hover:text-amber-600 font-medium transition-colors duration-300">
                                    Sign In
                                </NavLink>
                                <NavLink to="/register" className="bg-amber-500 text-white px-5 py-2 rounded-full hover:bg-amber-600 transition-colors duration-300 font-medium shadow-sm">
                                    Sign Up
                                </NavLink>
                            </>
                        )}
                        <button aria-label="Open cart" className="relative text-stone-700 hover:text-amber-600 p-2 rounded-full hover:bg-amber-100 transition-colors duration-300">
                            <HiOutlineShoppingCart className="h-7 w-7" />
                            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">3</span>
                        </button>
                    </div>
                    
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-stone-700">
                            {isOpen ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu (also dynamic) */}
            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {isLoggedIn ? (
                            <div className="px-3 py-2 text-stone-800 font-bold">Welcome, {userName}</div>
                        ) : null}
                        {navLinks.map((link) => (
                            <NavLink key={link.label} to={link.href} className="block px-3 py-2 rounded-md text-base font-medium text-stone-700 hover:bg-amber-100">{link.label}</NavLink>
                        ))}
                    </div>
                    <div className="pt-4 pb-3 border-t border-amber-200">
                        <div className="flex flex-col items-start px-5 space-y-3">
                            {isLoggedIn ? (
                                <button onClick={handleLogout} className="w-full text-left bg-red-500 text-white px-4 py-2 rounded-md font-medium">Logout</button>
                            ) : (
                                <>
                                    <NavLink to="/login" className="text-stone-700 hover:text-amber-600 font-medium px-3 py-2">Sign In</NavLink>
                                    <NavLink to="/register" className="w-full text-left bg-amber-500 text-white px-4 py-2 rounded-md font-medium">Sign Up</NavLink>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Header;