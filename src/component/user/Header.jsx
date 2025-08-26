import React, { useState, useEffect, useRef } from 'react';
import { 
    HiOutlineShoppingCart, 
    HiOutlineLogout, 
    HiOutlineUserCircle, 
    HiOutlineArchive,
    HiOutlineHome,
    HiOutlineCube,
    HiOutlineInformationCircle,
    HiOutlinePhone,
    HiOutlineMenu,
    HiOutlineX
} from 'react-icons/hi';
import { NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const Header = () => {
    const navigate = useNavigate();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const profileRef = useRef(null);
    
    const [userName, setUserName] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const { cartItems, updateUserSession } = useCart();
    const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);

    // Effect to handle clicking outside of the profile dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    
    // This useEffect now handles the initial user data load AND listens for updates
    useEffect(() => {
        const updateUserData = () => {
            const token = localStorage.getItem('AUTH_TOKEN');
            const fName = localStorage.getItem('USER_FNAME');
            if (token && fName) {
                setIsLoggedIn(true);
                setUserName(fName);
            } else {
                setIsLoggedIn(false);
                setUserName(null);
            }
        };

        // Run once on initial component load
        updateUserData();

        // Listen for the custom "storage" event dispatched from the profile page
        window.addEventListener('storage', updateUserData);

        // Cleanup: remove the event listener when the component is unmounted
        return () => {
            window.removeEventListener('storage', updateUserData);
        };
    }, []);

    // Handles user logout
    const handleLogout = () => {
        localStorage.removeItem('AUTH_TOKEN');
        localStorage.removeItem('USER_EMAIL');
        localStorage.removeItem('USER_ROLE');
        localStorage.removeItem('USER_FNAME');
        localStorage.removeItem('USER_LNAME');
        localStorage.removeItem('USER_ID');
        
        setIsLoggedIn(false);
        setUserName(null);
        setIsProfileOpen(false);
        setIsMenuOpen(false);
        
        updateUserSession(); 
        navigate('/login');
    };

    const navLinks = [
        { href: '/', label: 'Home', icon: HiOutlineHome },
        { href: '/products', label: 'Products', icon: HiOutlineCube },
        { href: '/about', label: 'About Us', icon: HiOutlineInformationCircle },
        { href: '/contact', label: 'Contact Us', icon: HiOutlinePhone }
    ];

    return (
        <nav className="bg-orange-50/80 backdrop-blur-md sticky top-0 z-50 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    
                    {/* Left Section: Logo */}
                    <div className="flex-shrink-0">
                        <NavLink to="/" className="text-3xl font-bold text-amber-900" style={{ fontFamily: 'Pacifico, cursive' }}>Brrdy</NavLink>
                    </div>

                    {/* Center Section: Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="flex items-baseline space-x-6">
                            {navLinks.map((link) => (
                                <NavLink 
                                    key={link.label} 
                                    to={link.href} 
                                    className={({isActive}) => `px-3 py-2 rounded-md ${isActive ? "font-semibold text-amber-600" : "text-stone-700 hover:text-amber-600"}`}
                                >
                                    {link.label}
                                </NavLink>
                            ))}
                        </div>
                    </div>

                    {/* Right Section: User Actions */}
                    <div className="flex items-center">
                        {/* Desktop Actions (Visible > md) */}
                        <div className="hidden md:flex items-center">
                            {isLoggedIn ? (
                                <div className="relative" ref={profileRef}>
                                    <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center gap-2 text-stone-700 font-medium p-2 rounded-md hover:bg-amber-100">
                                        <HiOutlineUserCircle className="h-8 w-8" />
                                        <span>{userName}</span>
                                    </button>
                                    {isProfileOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-50">
                                            <NavLink to="/profile" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-stone-700 hover:bg-gray-100">
                                                <HiOutlineUserCircle/> Update Profile
                                            </NavLink>
                                            <NavLink to="/my-orders" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-stone-700 hover:bg-gray-100">
                                                <HiOutlineArchive/> My Orders
                                            </NavLink>
                                            <button onClick={handleLogout} className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                                                <HiOutlineLogout/> Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex items-center space-x-4">
                                    <NavLink to="/login" className="text-stone-700 hover:text-amber-600 font-medium">Sign In</NavLink>
                                    <NavLink to="/register" className="bg-amber-500 text-white px-5 py-2 rounded-full hover:bg-amber-600 font-medium shadow-sm">Sign Up</NavLink>
                                </div>
                            )}
                            <NavLink to="/cart" aria-label="Open cart" className="relative text-stone-700 p-2 rounded-full hover:bg-amber-100 ml-4">
                                <HiOutlineShoppingCart className="h-7 w-7" />
                                {totalItemsInCart > 0 && (
                                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">{totalItemsInCart}</span>
                                )}
                            </NavLink>
                        </div>
                        
                        {/* Mobile Actions (Visible < md) */}
                        <div className="flex items-center md:hidden">
                            {isLoggedIn ? (
                                <NavLink to="/cart" aria-label="Open cart" className="relative text-stone-700 p-2 rounded-full hover:bg-amber-100">
                                    <HiOutlineShoppingCart className="h-7 w-7" />
                                    {totalItemsInCart > 0 && (
                                        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">{totalItemsInCart}</span>
                                    )}
                                </NavLink>
                            ) : (
                                <NavLink to="/register" className="bg-amber-500 text-white px-4 py-2 text-sm rounded-full hover:bg-amber-600 font-medium shadow-sm">
                                    Sign Up
                                </NavLink>
                            )}
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="ml-2 inline-flex items-center justify-center p-2 rounded-md text-stone-700 hover:bg-amber-100">
                                <span className="sr-only">Open main menu</span>
                                {isMenuOpen ? <HiOutlineX className="block h-6 w-6" /> : <HiOutlineMenu className="block h-6 w-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile menu, show/hide based on menu state */}
            {isMenuOpen && (
                <div className="md:hidden" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.label}
                                to={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className={({isActive}) => `flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium ${isActive ? "bg-amber-100 text-amber-800" : "text-stone-700 hover:bg-amber-50"}`}
                            >
                                <link.icon className="h-5 w-5" />
                                {link.label}
                            </NavLink>
                        ))}
                    </div>
                    <div className="pt-4 pb-3 border-t border-amber-200">
                        {isLoggedIn ? (
                            <div className="px-2 space-y-1">
                                <div className="flex items-center px-3 mb-2">
                                     <HiOutlineUserCircle className="h-10 w-10 text-stone-600" />
                                     <div className="ml-3">
                                        <p className="text-base font-medium text-stone-800">{userName}</p>
                                        <p className="text-sm font-medium text-stone-500">{localStorage.getItem('USER_EMAIL')}</p>
                                     </div>
                                </div>
                                <NavLink to="/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium text-stone-700 hover:bg-amber-50">
                                    <HiOutlineUserCircle className="h-5 w-5" /> Update Profile
                                </NavLink>
                                <NavLink to="/my-orders" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium text-stone-700 hover:bg-amber-50">
                                    <HiOutlineArchive className="h-5 w-5" /> My Orders
                                </NavLink>
                                <button onClick={handleLogout} className="flex items-center gap-3 w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-amber-50">
                                    <HiOutlineLogout className="h-5 w-5" /> Logout
                                </button>
                            </div>
                        ) : (
                            <div className="px-2 space-y-2">
                                <NavLink to="/login" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base text-center font-medium text-stone-700 hover:bg-amber-50">Sign In</NavLink>
                                <NavLink to="/register" onClick={() => setIsMenuOpen(false)} className="block bg-amber-500 text-white text-center px-5 py-2 rounded-full hover:bg-amber-600 font-medium shadow-sm">Sign Up</NavLink>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Header;