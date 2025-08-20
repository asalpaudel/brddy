// src/component/admin/AdminLayout.jsx

import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminHeader from './AdminHeader.jsx';
import AdminSidebar from './AdminSidebar.jsx';

const AdminLayout = () => {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('AUTH_TOKEN');
        const role = localStorage.getItem('USER_ROLE');

        // Check if the user is authenticated and has the admin role
        if (!token || role !== 'admin') {
            // Redirect to login if not authenticated or not an admin
            navigate('/login');
        }
    }, [navigate]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex bg-gray-100 min-h-screen">
            <AdminSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="flex flex-col flex-1 md:ml-64">
                <AdminHeader toggleSidebar={toggleSidebar} />
                <main className="p-6 flex-1">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;