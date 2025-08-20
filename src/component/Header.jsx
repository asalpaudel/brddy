// src/components/Header.jsx

import React, { useState } from 'react';
import { HiOutlineShoppingCart, HiMenu, HiX } from 'react-icons/hi';
import { NavLink } from 'react-router-dom'; // Import NavLink from react-router-dom

const Header = () => {
    // State to manage the mobile menu's visibility
    const [isOpen, setIsOpen] = useState(false);

    // Array of navigation links for easy mapping
    const navLinks = [
        { href: '#', label: 'Home' },
        { href: '#', label: 'About Us' },
        { href: '#', label: 'Products' },
        { href: '#', label: 'Contact Us' },
    ];

    // Define the style for NavLink based on active status
    const getNavLinkClass = ({ isActive }) =>
        isActive
            ? "text-amber-600 px-3 py-2 rounded-md text-lg font-medium transition-colors duration-300" // active class
            : "text-stone-700 hover:text-amber-600 px-3 py-2 rounded-md text-lg font-medium transition-colors duration-300"; // default class
    
    // Define the style for the mobile NavLink based on active status
    const getMobileNavLinkClass = ({ isActive }) =>
        isActive
            ? "text-amber-600 bg-amber-100 block px-3 py-2 rounded-md text-base font-medium" // active class
            : "text-stone-700 hover:bg-amber-100 block px-3 py-2 rounded-md text-base font-medium"; // default class

    return (
        <nav className="bg-orange-50/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    
                    {/* Website Logo */}
                    <div className="flex-shrink-0">
                        <NavLink to="/" className="flex items-center">
                            {/* For the best look, add a Google Font like 'Pacifico' or 'Lobster' to your project */}
                            <span className="text-3xl font-bold text-amber-900" style={{ fontFamily: 'Pacifico, cursive' }}>
                                Brrdy
                            </span>
                        </NavLink>
                    </div>

                    {/* Desktop Menu Links */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-6">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.label}
                                    to={link.href}
                                    className={getNavLinkClass}
                                >
                                    {link.label}
                                </NavLink>
                            ))}
                        </div>
                    </div>

                    {/* Desktop Buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        <NavLink to="/login" className="text-stone-700 hover:text-amber-600 font-medium transition-colors duration-300">
                            Sign In
                        </NavLink>
                        <NavLink to="/register" className="bg-amber-500 text-white px-5 py-2 rounded-full hover:bg-amber-600 transition-colors duration-300 font-medium shadow-sm">
                            Sign Up
                        </NavLink>
                        <button 
                            aria-label="Open cart"
                            className="relative text-stone-700 hover:text-amber-600 p-2 rounded-full hover:bg-amber-100 transition-colors duration-300"
                        >
                            <HiOutlineShoppingCart className="h-7 w-7" />
                            {/* Optional: Add a badge for cart items */}
                            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                                3
                            </span>
                        </button>
                    </div>
                    
                    {/* Hamburger Button for Mobile */}
                    <div className="md:hidden flex items-center">
                            <button 
                                aria-label="Open cart"
                                className="relative text-stone-700 hover:text-amber-600 p-2 rounded-full hover:bg-amber-100 transition-colors duration-300 mr-2"
                            >
                                <HiOutlineShoppingCart className="h-7 w-7" />
                            </button>
                            <button 
                                onClick={() => setIsOpen(!isOpen)} 
                                className="inline-flex items-center justify-center p-2 rounded-md text-stone-700 hover:text-amber-600 hover:bg-amber-100 focus:outline-none"
                                aria-expanded={isOpen}
                            >
                                <span className="sr-only">Open main menu</span>
                                {isOpen ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
                            </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.label}
                                    to={link.href}
                                    className={getMobileNavLinkClass}
                                >
                                    {link.label}
                                </NavLink>
                            ))}
                    </div>
                    <div className="pt-4 pb-3 border-t border-amber-200">
                        <div className="flex flex-col items-start px-5 space-y-3">
                                <NavLink to="/login" className="text-stone-700 hover:text-amber-600 font-medium px-3 py-2">
                                    Sign In
                                </NavLink>
                                <NavLink to="/register" className="bg-amber-500 text-white w-full text-left px-4 py-2 rounded-md hover:bg-amber-600 font-medium shadow-sm">
                                    Sign Up
                                </NavLink>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Header;