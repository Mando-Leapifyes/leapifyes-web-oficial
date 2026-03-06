import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Users, Activity, ClipboardList, Target,
    ArrowUpRight, ArrowDownRight, BrainCircuit, Loader2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';

const StatCard = ({ title, value, previousValue, icon: Icon, loading, gradient }) => {
    const diff = previousValue ? ((value - previousValue) / previousValue) * 100 : 0;
    const isPositive = diff >= 0;

    return (
        <Card className="bg-slate-800/40 border-slate-700/50 backdrop-blur-sm overflow-hidden relative group">
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-slate-400">
                    {title}
                </CardTitle>
                <div className={`p-2 rounded-xl bg-slate-800 text-slate-300`}>
                    <Icon className="w-4 h-4" />
                </div>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <div className="h-8 flex items-center">
                        <Loader2 className="w-5 h-5 animate-spin text-slate-500" />
                    </div>
                ) : (
                    <>
                        <div className="text-2xl font-bold text-white">{value}</div>
                        <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                            {diff !== 0 ? (
                                <span className={`inline-flex items-center ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                                    {isPositive ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                                    {Math.abs(diff).toFixed(1)}%
                                </span>
                            ) : (
                                <span>Sin variación</span>
                            )}
                            {' '}desde el mes pasado
                        </p>
                    </>
                )}
            </CardContent>
        </Card>
    );
};

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get(`${BACKEND_URL}/api/admin/dashboard/kpis`);
                setStats(res.data);
            } catch (err) {
                console.error("Error al cargar KPIs admin:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold text-white">Dashboard Ejecutivo</h2>
                <p className="text-slate-400">Torre de control de Leapifyes OS. Aquí tienes la vista general de la plataforma.</p>
            </div>

            {/* AI Insight Box */}
            <div className="relative overflow-hidden rounded-xl bg-slate-900 border border-slate-800 p-6">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <BrainCircuit className="w-32 h-32" />
                </div>
                <div className="relative z-10 flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#D946EF] to-[#8B5CF6] flex items-center justify-center">
                            <BrainCircuit className="w-4 h-4 text-white" />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Insight de IA</h3>
                        <p className="text-slate-300 text-sm leading-relaxed max-w-3xl">
                            El volumen de leads ha sido estable, pero hay un aumento del 15% en los Diagnósticos IMD completados durante la última semana, concretamente en la franja de "Autónomos (Básico)". Se sugiere activar una campaña flash vía Email u ofrecer un agente IA lite para atender este volumen sin saturar recursos internos.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Total Leads Captados"
                    value={stats?.leads_total ?? 0}
                    previousValue={(stats?.leads_total ?? 0) - (stats?.leads_recent ?? 0)} // Simulado
                    icon={Users}
                    loading={loading}
                    gradient="from-[#1B93A4] to-transparent"
                />
                <StatCard
                    title="Diagnósticos Completados"
                    value={stats?.diagnostics_total ?? 0}
                    previousValue={(stats?.diagnostics_total ?? 0) - (stats?.diagnostics_completed ?? 0)} // Simulado
                    icon={Target}
                    loading={loading}
                    gradient="from-[#D946EF] to-transparent"
                />
                <StatCard
                    title="Clientes en Portal"
                    value={stats?.projects_total ?? 0}
                    previousValue={stats?.projects_total ? stats.projects_total - 1 : 0}
                    icon={ClipboardList}
                    loading={loading}
                    gradient="from-[#3B82F6] to-transparent"
                />
                <StatCard
                    title="Estado del Sistema"
                    value={stats?.system_status === 'operational' ? '100% OK' : 'Degradado'}
                    previousValue={null}
                    icon={Activity}
                    loading={loading}
                    gradient="from-emerald-500 to-transparent"
                />
            </div>

            {/* Última Actividad Placeholder */}
            <Card className="bg-slate-800/40 border-slate-700/50 backdrop-blur-sm mt-8">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold text-white">Actividad Reciente</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center justify-center py-12 text-slate-500">
                        <Activity className="w-12 h-12 mb-4 opacity-20" />
                        <p>La tabla de actividad detalla se implementará en la Fase 2.</p>
                    </div>
                </CardContent>
            </Card>

        </div>
    );
};

export default AdminDashboard;
