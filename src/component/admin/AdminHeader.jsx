// src/components/AdminHeader.jsx

import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { HiOutlineUserCircle, HiChevronDown, HiMenuAlt2 } from 'react-icons/hi';
import { toast } from 'react-toastify';

const AdminHeader = ({ toggleSidebar }) => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear user authentication from local storage
        localStorage.removeItem('AUTH_TOKEN');
        localStorage.removeItem('USER_EMAIL');
        localStorage.removeItem('USER_ROLE');
        
        toast.success("You have been logged out.");
        navigate('/login');
    };

    return (
        <nav className="bg-orange-50/80 backdrop-blur-md shadow-sm sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        {/* Hamburger Button to Toggle Sidebar */}
                        <button
                            onClick={toggleSidebar}
                            className="text-stone-700 hover:text-amber-600 p-2 rounded-md hover:bg-amber-100 transition-colors duration-300 md:hidden mr-4"
                        >
                            <HiMenuAlt2 className="h-6 w-6" />
                        </button>

                        {/* Logo
                        <NavLink to="/admin/dashboard" className="flex items-center">
                            <span className="text-2xl font-bold text-amber-900" style={{ fontFamily: 'Pacifico, cursive' }}>
                                Brrdy Admin
                            </span>
                        </NavLink> */}
                    </div>

                    {/* Admin Profile Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="flex items-center text-stone-700 hover:text-amber-600 transition-colors duration-300 focus:outline-none"
                        >
                            <HiOutlineUserCircle className="h-8 w-8" />
                            <span className="ml-2 font-medium hidden sm:block">Admin</span>
                            <HiChevronDown className={`h-5 w-5 transform transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : 'rotate-0'}`} />
                        </button>

                        {/* Dropdown Menu */}
                        {isProfileOpen && (
                            <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                                <a href="#" className="block px-4 py-2 text-sm text-stone-700 hover:bg-amber-100">
                                    Profile
                                </a>
                                <a href="#" className="block px-4 py-2 text-sm text-stone-700 hover:bg-amber-100">
                                    Settings
                                </a>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-100"
                                >
                                    Sign out
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default AdminHeader;