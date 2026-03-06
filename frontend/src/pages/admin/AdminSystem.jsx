import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Activity, Database, Server, Wifi, Clock, Shield,
    CheckCircle2, XCircle, Loader2, RefreshCw, HardDrive
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';

const AdminSystem = () => {
    const [loading, setLoading] = useState(true);
    const [health, setHealth] = useState(null);
    const [lastCheck, setLastCheck] = useState(null);

    useEffect(() => {
        fetchHealth();
    }, []);

    const fetchHealth = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${BACKEND_URL}/api/admin/system/health`);
            setHealth(res.data);
            setLastCheck(new Date());
        } catch (err) {
            toast.error('Error al verificar el sistema', { description: err.message });
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading && !health) {
        return (
            <div className="flex flex-col items-center justify-center p-24 text-slate-500">
                <Loader2 className="w-8 h-8 animate-spin mb-4 text-emerald-400" />
                <p>Verificando estado del sistema...</p>
            </div>
        );
    }

    const isOk = health?.api_status === 'operational' && health?.database?.connected;

    const services = [
        {
            name: 'API Backend (Railway)',
            status: health?.api_status === 'operational',
            detail: `v${health?.version || '?'}`,
            icon: Server,
        },
        {
            name: 'MongoDB Atlas',
            status: health?.database?.connected,
            detail: `Latencia: ${health?.database?.latency_ms || '?'}ms`,
            icon: Database,
        },
        {
            name: 'Frontend (Vercel)',
            status: true, // If we loaded this component, Vercel is working
            detail: 'CDN Global Activo',
            icon: Wifi,
        },
        {
            name: 'Autenticación JWT',
            status: true,
            detail: 'HS256 / Bearer',
            icon: Shield,
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        <Activity className="w-7 h-7 text-emerald-400" />
                        Estado del Sistema
                    </h2>
                    <p className="text-slate-400 mt-1">
                        Monitor en vivo de la infraestructura de Leapifyes.
                        {lastCheck && <span className="ml-2 text-xs text-slate-500">Última verificación: {lastCheck.toLocaleTimeString('es-ES')}</span>}
                    </p>
                </div>
                <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800" onClick={fetchHealth}>
                    <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                    Verificar
                </Button>
            </div>

            {/* Global Status Banner */}
            <div className={`rounded-xl p-6 border flex items-center gap-4 ${isOk
                    ? 'bg-emerald-500/5 border-emerald-500/20'
                    : 'bg-red-500/5 border-red-500/20'
                }`}>
                {isOk ? (
                    <CheckCircle2 className="w-10 h-10 text-emerald-400 flex-shrink-0" />
                ) : (
                    <XCircle className="w-10 h-10 text-red-400 flex-shrink-0" />
                )}
                <div>
                    <h3 className={`text-xl font-bold ${isOk ? 'text-emerald-400' : 'text-red-400'}`}>
                        {isOk ? 'Todos los Sistemas Operativos' : 'Se detectaron problemas'}
                    </h3>
                    <p className="text-slate-400 text-sm mt-1">
                        {isOk
                            ? 'La plataforma Leapifyes funciona correctamente en todos sus componentes.'
                            : 'Algunos servicios no están respondiendo. Revisa los detalles a continuación.'
                        }
                    </p>
                </div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {services.map((svc, i) => (
                    <div key={i} className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5 hover:border-slate-600 transition-colors">
                        <div className="flex items-start justify-between mb-4">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${svc.status ? 'bg-emerald-500/10' : 'bg-red-500/10'
                                }`}>
                                <svc.icon className={`w-5 h-5 ${svc.status ? 'text-emerald-400' : 'text-red-400'}`} />
                            </div>
                            <div className={`w-3 h-3 rounded-full ${svc.status ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`} />
                        </div>
                        <p className="text-sm font-medium text-white mb-1">{svc.name}</p>
                        <p className="text-xs text-slate-500">{svc.detail}</p>
                    </div>
                ))}
            </div>

            {/* Collection Metrics */}
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <HardDrive className="w-5 h-5 text-[#1B93A4]" />
                    Colecciones en Base de Datos
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                    {health?.collections && Object.entries(health.collections).map(([name, count]) => (
                        <div key={name} className="bg-slate-900/50 rounded-lg p-4 border border-slate-800 text-center">
                            <p className="text-2xl font-bold text-white">{count}</p>
                            <p className="text-xs text-slate-500 capitalize mt-1">{name}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Server Info */}
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-amber-400" />
                    Información del Servidor
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800">
                        <p className="text-xs text-slate-500 mb-1">Hora del Servidor (UTC)</p>
                        <p className="text-white text-sm font-medium font-mono">
                            {health?.server_time ? new Date(health.server_time).toLocaleString('es-ES', { timeZone: 'UTC' }) : '-'}
                        </p>
                    </div>
                    <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800">
                        <p className="text-xs text-slate-500 mb-1">Versión de la API</p>
                        <p className="text-white text-sm font-medium font-mono">v{health?.version || '?'}</p>
                    </div>
                    <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800">
                        <p className="text-xs text-slate-500 mb-1">Latencia MongoDB</p>
                        <p className="text-white text-sm font-medium font-mono">
                            {health?.database?.latency_ms}ms
                            {health?.database?.latency_ms < 50 && <span className="text-emerald-400 text-xs ml-2">● Excelente</span>}
                            {health?.database?.latency_ms >= 50 && health?.database?.latency_ms < 200 && <span className="text-amber-400 text-xs ml-2">● Normal</span>}
                            {health?.database?.latency_ms >= 200 && <span className="text-red-400 text-xs ml-2">● Lento</span>}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSystem;
