import { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
    BarChart3, Users, Building2, ClipboardList,
    BrainCircuit, Activity, Settings, LogOut,
    ChevronLeft, Menu, Bell, BarChart2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const navigation = [
    { name: 'Dashboard', href: '/admin', icon: BarChart3, exact: true },
    { name: 'Leads & Formularios', href: '/admin/leads', icon: Users },
    { name: 'Diagnósticos IMD', href: '/admin/diagnostics', icon: ClipboardList },
    { name: 'Inteligencia Artificial', href: '/admin/ai-logs', icon: BrainCircuit },
    { name: 'Analítica Web', href: '/admin/analytics', icon: BarChart2 },
    { name: 'Clientes & Proyectos', href: '/admin/projects', icon: Building2 },
    { name: 'Estado del Sistema', href: '/admin/system', icon: Activity },
];

const AdminLayout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreen = () => {
            setIsMobile(window.innerWidth < 1024);
            if (window.innerWidth < 1024) {
                setSidebarOpen(false);
            } else {
                setSidebarOpen(true);
            }
        };
        checkScreen();
        window.addEventListener('resize', checkScreen);
        return () => window.removeEventListener('resize', checkScreen);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/portal/login');
    };

    const Sidebar = () => (
        <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#080B14] border-r border-slate-800 transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="flex flex-col h-full">
                {/* Sidebar Header */}
                <div className="flex h-16 items-center flex-shrink-0 px-4 border-b border-slate-800">
                    <img src="/logo.png" alt="Leapifyes" className="h-6 w-auto brightness-0 invert" />
                    <span className="ml-2 text-xs font-semibold px-2 py-1 rounded bg-[#D946EF]/20 text-[#D946EF]">
                        {user?.role === 'super_admin' ? 'SUPER ADMIN' : 'ADMIN'}
                    </span>
                    {isMobile && (
                        <button onClick={() => setSidebarOpen(false)} className="ml-auto text-slate-400 hover:text-white">
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                    )}
                </div>

                {/* User Info Profile Lite */}
                <div className="p-4 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#1B93A4] to-[#3B82F6] flex items-center justify-center text-white font-bold">
                            {user?.name?.charAt(0) || 'A'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">{user?.name}</p>
                            <p className="text-xs text-slate-400 truncate">{user?.email}</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                    {navigation.map((item) => {
                        const isActive = item.exact
                            ? location.pathname === item.href
                            : location.pathname.startsWith(item.href);

                        return (
                            <NavLink
                                key={item.name}
                                to={item.href}
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
                                    ? 'bg-[#1B93A4]/10 text-[#1B93A4]'
                                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                                    }`}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.name}
                            </NavLink>
                        );
                    })}
                </nav>

                {/* Footer Actions */}
                <div className="p-4 border-t border-slate-800 space-y-2">
                    <NavLink to="/" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/50">
                        <ChevronLeft className="w-5 h-5" />
                        Vover a la Web
                    </NavLink>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#0A0E17] text-white selection:bg-[#1B93A4]/30">
            <Sidebar />

            {/* Mobile Drawer Overlay */}
            {isMobile && sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content Area */}
            <div className={`transition-all duration-300 ease-in-out ${sidebarOpen && !isMobile ? 'pl-64' : 'pl-0'}`}>
                {/* Top Navbar */}
                <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-800 bg-[#0A0E17]/80 backdrop-blur-md px-4 sm:px-6">
                    <div className="flex items-center gap-4">
                        {!sidebarOpen && (
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="text-slate-400 hover:text-white"
                            >
                                <Menu className="w-6 h-6" />
                            </button>
                        )}
                        <h1 className="text-lg font-semibold hidden sm:block">
                            Super Admin Console
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-[#D946EF] rounded-full animate-pulse"></span>
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-4 sm:p-6 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
