import React from 'react';
import { NavLink } from 'react-router-dom';
import { HiOutlineViewGrid, HiOutlineCube, HiOutlineTag, HiOutlineUsers, HiOutlineCog, HiOutlineChevronLeft } from 'react-icons/hi';

const AdminSidebar = ({ isOpen, toggleSidebar }) => {
    const sidebarLinks = [
        { to: '/admin/dashboard', label: 'Dashboard', icon: HiOutlineViewGrid },
        { to: '/admin/products', label: 'Products', icon: HiOutlineCube },
        { to: '/admin/categories', label: 'Categories', icon: HiOutlineTag },
        { to: '/admin/orders', label: 'Orders', icon: HiOutlineShoppingCart },
        { to: '/admin/users', label: 'Users', icon: HiOutlineUsers },
        { to: '/admin/settings', label: 'Settings', icon: HiOutlineCog },
    ];

    const getNavLinkClass = ({ isActive }) =>
        isActive
            ? "flex items-center space-x-3 px-4 py-3 rounded-md text-white bg-amber-600 transition-colors duration-200"
            : "flex items-center space-x-3 px-4 py-3 rounded-md text-stone-700 hover:bg-amber-100 hover:text-amber-600 transition-colors duration-200";

    return (
        <aside className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out bg-orange-50/80 backdrop-blur-md w-64 p-4 shadow-xl z-30`}>
            <div className="flex items-center justify-between mb-6">
                <span className="text-xl font-semibold text-amber-900" style={{ fontFamily: 'Pacifico, cursive' }}>
                    Brrdy Admin Panel
                </span>
                <button 
                    onClick={toggleSidebar}
                    className="md:hidden text-stone-700 hover:text-amber-600 p-2 rounded-md hover:bg-amber-100 transition-colors duration-300"
                >
                    <HiOutlineChevronLeft className="h-6 w-6" />
                </button>
            </div>
            
            <nav>
                <ul className="space-y-2">
                    {sidebarLinks.map((link) => (
                        <li key={link.to}>
                            <NavLink to={link.to} className={getNavLinkClass}>
                                <link.icon className="h-6 w-6" />
                                <span className="text-lg">{link.label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default AdminSidebar;