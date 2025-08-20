import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProtectedRoute = () => {
    const isAuthenticated = !!localStorage.getItem('AUTH_TOKEN');

    if (!isAuthenticated) {
        toast.info("You must be logged in to access that page.");
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;