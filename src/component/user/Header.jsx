import React, { useState, useEffect, useRef } from 'react';
import { HiOutlineShoppingCart, HiMenu, HiX, HiOutlineLogout, HiOutlineUserCircle, HiOutlineArchive } from 'react-icons/hi';
import { NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const Header = () => {
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef(null);
    
    const [userName, setUserName] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // 1. Get updateUserSession along with cartItems
    const { cartItems, updateUserSession } = useCart();
    const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('AUTH_TOKEN');
        const fName = localStorage.getItem('USER_FNAME');
        if (token && fName) {
            setIsLoggedIn(true);
            setUserName(fName);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('AUTH_TOKEN');
        localStorage.removeItem('USER_EMAIL');
        localStorage.removeItem('USER_ROLE');
        localStorage.removeItem('USER_FNAME');
        
        setIsLoggedIn(false);
        setUserName(null);
        setIsProfileOpen(false);
        
        // 2. Call this on logout to clear the session cart
        updateUserSession(); 
        
        navigate('/login');
    };

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/products', label: 'Products' },
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

                    <div className="hidden md:flex items-center space-x-4">
                        {isLoggedIn ? (
                            <div className="relative" ref={profileRef}>
                                <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center gap-2 text-stone-700 font-medium p-2 rounded-md hover:bg-amber-100">
                                    <HiOutlineUserCircle className="h-8 w-8" />
                                    <span>{userName}</span>
                                </button>
                                {isProfileOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                                        <NavLink 
                                            to="/my-orders" 
                                            onClick={() => setIsProfileOpen(false)} 
                                            className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-stone-700 hover:bg-gray-100"
                                        >
                                            <HiOutlineArchive/> My Orders
                                        </NavLink>
                                        <button 
                                            onClick={handleLogout} 
                                            className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                        >
                                            <HiOutlineLogout/> Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <NavLink to="/login" className="text-stone-700 hover:text-amber-600 font-medium">
                                    Sign In
                                </NavLink>
                                <NavLink to="/register" className="bg-amber-500 text-white px-5 py-2 rounded-full hover:bg-amber-600 font-medium shadow-sm">
                                    Sign Up
                                </NavLink>
                            </>
                        )}
                        
                        <NavLink to="/cart" aria-label="Open cart" className="relative text-stone-700 p-2 rounded-full hover:bg-amber-100">
                            <HiOutlineShoppingCart className="h-7 w-7" />
                            {totalItemsInCart > 0 && (
                                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                                    {totalItemsInCart}
                                </span>
                            )}
                        </NavLink>
                    </div>
                    
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-stone-700">
                            {isMobileMenuOpen ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="md:hidden">
                    {/* Mobile menu can be updated as well if needed */}
                </div>
            )}
        </nav>
    );
};

export default Header;