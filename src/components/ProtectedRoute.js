import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function ProtectedRoute({ children, requiredRole }) {
    const { currentUser, userRole } = useAuth();

    if (!currentUser) {
        // Not logged in, redirect to login
        return <Navigate to="/login" replace state={{ from: window.location.pathname }} />;
    }

    if (requiredRole && userRole !== requiredRole) {
        // User doesn't have required role, redirect to home
        return <Navigate to="/" replace />;
    }

    // User is logged in and has required role (if specified)
    return children;
}

export default ProtectedRoute;
