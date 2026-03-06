import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    BrainCircuit, Zap, TrendingUp, Clock,
    Activity, MessageSquare, FileText, Loader2
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';

const AdminAILogs = () => {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState(null);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${BACKEND_URL}/api/admin/dashboard/kpis`);
            setStats(res.data);
        } catch (err) {
            toast.error('Error al cargar métricas IA');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center p-24 text-slate-500">
                <Loader2 className="w-8 h-8 animate-spin mb-4 text-[#D946EF]" />
                <p>Cargando métricas...</p>
            </div>
        );
    }

    // Simulated AI metrics (will be real when OpenAI integration is added)
    const aiMetrics = [
        {
            label: 'Resúmenes IA Generados',
            value: stats?.diagnostics_completed || 0,
            icon: MessageSquare,
            color: 'from-[#D946EF] to-[#8B5CF6]',
            description: 'Análisis ejecutivos creados automáticamente'
        },
        {
            label: 'Tokens Estimados',
            value: `${((stats?.diagnostics_completed || 0) * 850).toLocaleString()}`,
            icon: Zap,
            color: 'from-amber-500 to-orange-500',
            description: 'Consumo estimado de OpenAI'
        },
        {
            label: 'Diagnósticos Procesados',
            value: stats?.diagnostics_total || 0,
            icon: FileText,
            color: 'from-[#1B93A4] to-[#3B82F6]',
            description: 'Total de evaluaciones IMD analizadas'
        },
        {
            label: 'Tiempo Medio de Respuesta',
            value: '~2.1s',
            icon: Clock,
            color: 'from-emerald-500 to-teal-500',
            description: 'Latencia promedio de generación IA'
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        <BrainCircuit className="w-7 h-7 text-[#D946EF]" />
                        Inteligencia Artificial
                    </h2>
                    <p className="text-slate-400 mt-1">Monitoreo de uso de IA, tokens consumidos y rendimiento.</p>
                </div>
                <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800" onClick={fetchStats}>
                    Actualizar
                </Button>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {aiMetrics.map((metric, i) => (
                    <div key={i} className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5 group hover:border-slate-600 transition-all duration-300">
                        <div className="flex items-start justify-between mb-4">
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${metric.color} flex items-center justify-center shadow-lg`}>
                                <metric.icon className="w-5 h-5 text-white" />
                            </div>
                            <TrendingUp className="w-4 h-4 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <p className="text-2xl font-bold text-white mb-1">{metric.value}</p>
                        <p className="text-sm font-medium text-slate-300">{metric.label}</p>
                        <p className="text-xs text-slate-500 mt-1">{metric.description}</p>
                    </div>
                ))}
            </div>

            {/* AI Activity Log */}
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-[#D946EF]" />
                    Centro de Control IA
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Model Config */}
                    <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-800">
                        <h4 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">Modelo Activo</h4>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-400">Motor</span>
                                <span className="text-sm text-white font-medium bg-slate-800 px-2 py-1 rounded">GPT-4o Mini</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-400">Contexto máximo</span>
                                <span className="text-sm text-white font-medium">128K tokens</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-400">Temperatura</span>
                                <span className="text-sm text-white font-medium">0.3 (conservador)</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-400">Estado</span>
                                <span className="text-sm text-emerald-400 font-medium flex items-center gap-1">
                                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                    Operativo
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Usage Summary */}
                    <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-800">
                        <h4 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">Uso del Período</h4>
                        <div className="space-y-4">
                            <div>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm text-slate-400">Tokens usados</span>
                                    <span className="text-sm text-white font-medium">{((stats?.diagnostics_completed || 0) * 850).toLocaleString()} / 500,000</span>
                                </div>
                                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-[#D946EF] to-[#8B5CF6] rounded-full transition-all duration-500"
                                        style={{ width: `${Math.min(100, ((stats?.diagnostics_completed || 0) * 850 / 5000) * 100)}%` }}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm text-slate-400">Llamadas API</span>
                                    <span className="text-sm text-white font-medium">{stats?.diagnostics_completed || 0} / 1,000</span>
                                </div>
                                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-[#1B93A4] to-[#3B82F6] rounded-full transition-all duration-500"
                                        style={{ width: `${Math.min(100, ((stats?.diagnostics_completed || 0) / 10))}%` }}
                                    />
                                </div>
                            </div>
                            <div className="pt-2 border-t border-slate-700/50">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-slate-400">Coste estimado</span>
                                    <span className="text-sm text-white font-bold">${(((stats?.diagnostics_completed || 0) * 850 * 0.00015) / 1000).toFixed(4)} USD</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Future Modules */}
            <div className="bg-gradient-to-r from-[#D946EF]/5 to-[#8B5CF6]/5 border border-[#D946EF]/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-2">🚀 Próximamente</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                    En las siguientes iteraciones se conectará OpenAI en tiempo real para generar resúmenes ejecutivos IA de cada Diagnóstico y Lead,
                    junto con un historial detallado de cada llamada API (prompt, response, tokens, latencia). Todo desde esta torre de control.
                </p>
            </div>
        </div>
    );
};

export default AdminAILogs;
