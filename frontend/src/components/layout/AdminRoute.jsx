import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Loader2 } from 'lucide-react';

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen bg-[#080B14] flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-[#1B93A4] animate-spin" />
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/portal/login" state={{ from: location }} replace />;
    }

    if (user.role !== 'admin' && user.role !== 'super_admin') {
        return <Navigate to="/portal" replace />;
    }

    return children;
};

export default AdminRoute;
