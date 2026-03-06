import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Users, Activity, ClipboardList, Target,
    ArrowUpRight, ArrowDownRight, BrainCircuit, Loader2,
    Bell, AlertTriangle, Info, CheckCircle2, Newspaper, FolderOpen
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';

// === Reusable TrendIndicator ===
const TrendIndicator = ({ changePct, periodLabel }) => {
    if (changePct === 0 || changePct === null || changePct === undefined) {
        return <span className="text-xs text-slate-500">Sin variación {periodLabel}</span>;
    }
    const isPositive = changePct > 0;
    return (
        <span className={`inline-flex items-center text-xs font-medium ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
            {isPositive ? <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> : <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />}
            {isPositive ? '+' : ''}{changePct}%
            <span className="text-slate-500 font-normal ml-1">{periodLabel}</span>
        </span>
    );
};

// === StatCard with trend ===
const StatCard = ({ title, value, trend, icon: Icon, loading, gradient }) => (
    <Card className="bg-slate-800/40 border-slate-700/50 backdrop-blur-sm overflow-hidden relative group hover:border-slate-600 transition-all duration-300">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-slate-400">{title}</CardTitle>
            <div className="p-2 rounded-xl bg-slate-800 text-slate-300">
                <Icon className="w-4 h-4" />
            </div>
        </CardHeader>
        <CardContent>
            {loading ? (
                <div className="h-10 flex items-center">
                    <Loader2 className="w-5 h-5 animate-spin text-slate-500" />
                </div>
            ) : (
                <>
                    <div className="text-2xl font-bold text-white">{value}</div>
                    {trend && (
                        <div className="mt-1.5">
                            <TrendIndicator changePct={trend.change_pct} periodLabel={trend.period_label} />
                        </div>
                    )}
                </>
            )}
        </CardContent>
    </Card>
);

// === AlertCard ===
const AlertCard = ({ alert, onResolve }) => {
    const severityConfig = {
        info: { icon: Info, color: 'border-blue-500/30 bg-blue-500/5', iconColor: 'text-blue-400' },
        warning: { icon: AlertTriangle, color: 'border-amber-500/30 bg-amber-500/5', iconColor: 'text-amber-400' },
        critical: { icon: AlertTriangle, color: 'border-red-500/30 bg-red-500/5', iconColor: 'text-red-400' },
    };
    const config = severityConfig[alert.severity] || severityConfig.info;
    const SevIcon = config.icon;

    return (
        <div className={`flex items-start gap-3 p-4 rounded-lg border ${config.color} transition-all duration-200`}>
            <SevIcon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${config.iconColor}`} />
            <div className="flex-1 min-w-0">
                <p className="text-sm text-white leading-relaxed">{alert.message}</p>
                <p className="text-xs text-slate-500 mt-1">
                    {new Date(alert.created_at).toLocaleString('es-ES', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                </p>
            </div>
            {onResolve && (
                <button
                    onClick={() => onResolve(alert.id)}
                    className="p-1.5 rounded-md text-slate-500 hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors flex-shrink-0"
                    title="Marcar como resuelta"
                >
                    <CheckCircle2 className="w-4 h-4" />
                </button>
            )}
        </div>
    );
};

// === Period Selector ===
const PeriodSelector = ({ period, onChange }) => {
    const options = [
        { value: 'today', label: 'Hoy' },
        { value: '7d', label: '7 días' },
        { value: '30d', label: '30 días' },
    ];
    return (
        <div className="flex items-center bg-slate-800/60 rounded-lg p-1 border border-slate-700/50">
            {options.map(opt => (
                <button
                    key={opt.value}
                    onClick={() => onChange(opt.value)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${period === opt.value
                            ? 'bg-[#1B93A4] text-white shadow-lg shadow-[#1B93A4]/20'
                            : 'text-slate-400 hover:text-white'
                        }`}
                >
                    {opt.label}
                </button>
            ))}
        </div>
    );
};

// === Main Dashboard ===
const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [period, setPeriod] = useState('7d');

    useEffect(() => {
        fetchStats();
        fetchAlerts();
    }, [period]);

    const fetchStats = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${BACKEND_URL}/api/admin/dashboard/kpis?period=${period}`);
            setStats(res.data);
        } catch (err) {
            console.error("Error al cargar KPIs admin:", err);
        } finally {
            setLoading(false);
        }
    };

    const fetchAlerts = async () => {
        try {
            const res = await axios.get(`${BACKEND_URL}/api/admin/alerts`);
            setAlerts(res.data || []);
        } catch (err) {
            // Alerts endpoint may not exist yet, fail silently
            setAlerts([]);
        }
    };

    const handleResolveAlert = async (alertId) => {
        try {
            await axios.post(`${BACKEND_URL}/api/admin/alerts/resolve`, { alert_id: alertId });
            setAlerts(prev => prev.filter(a => a.id !== alertId));
            toast.success('Alerta resuelta');
        } catch (err) {
            toast.error('Error al resolver alerta');
        }
    };

    const periodLabel = stats?.period_label || 'vs semana anterior';

    return (
        <div className="space-y-6">
            {/* Header with Period Selector */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white">Dashboard Ejecutivo</h2>
                    <p className="text-slate-400">Torre de control de Leapifyes OS.</p>
                </div>
                <PeriodSelector period={period} onChange={setPeriod} />
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
                            {stats?.leads?.current > 0
                                ? `En el período seleccionado se han captado ${stats.leads.current} leads nuevos (${stats.leads.change_pct > 0 ? '+' : ''}${stats.leads.change_pct}% ${periodLabel}). ${stats.diagnostics?.current > 0 ? `Además, se completaron ${stats.diagnostics.current} diagnósticos IMD.` : ''} Se recomienda revisar los leads con estado "Nuevo" para dar seguimiento rápido.`
                                : 'No hay actividad registrada en el período seleccionado. Cuando se registren leads y diagnósticos, la IA generará insights automatizados.'
                            }
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Leads Captados"
                    value={stats?.leads?.total ?? 0}
                    trend={{ change_pct: stats?.leads?.change_pct, period_label: periodLabel }}
                    icon={Users}
                    loading={loading}
                    gradient="from-[#1B93A4] to-transparent"
                />
                <StatCard
                    title="Diagnósticos IMD"
                    value={stats?.diagnostics?.total ?? 0}
                    trend={{ change_pct: stats?.diagnostics?.change_pct, period_label: periodLabel }}
                    icon={Target}
                    loading={loading}
                    gradient="from-[#D946EF] to-transparent"
                />
                <StatCard
                    title="Usuarios Registrados"
                    value={stats?.users?.total ?? 0}
                    trend={{ change_pct: stats?.users?.change_pct, period_label: periodLabel }}
                    icon={ClipboardList}
                    loading={loading}
                    gradient="from-[#3B82F6] to-transparent"
                />
                <StatCard
                    title="Estado del Sistema"
                    value={stats?.system_status === 'operational' ? '100% OK' : 'Degradado'}
                    trend={null}
                    icon={Activity}
                    loading={loading}
                    gradient="from-emerald-500 to-transparent"
                />
            </div>

            {/* Quick Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4 text-center">
                    <FolderOpen className="w-5 h-5 mx-auto mb-2 text-slate-500" />
                    <p className="text-xl font-bold text-white">{stats?.projects_total ?? 0}</p>
                    <p className="text-xs text-slate-500">Proyectos</p>
                </div>
                <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4 text-center">
                    <Newspaper className="w-5 h-5 mx-auto mb-2 text-slate-500" />
                    <p className="text-xl font-bold text-white">{stats?.newsletter_total ?? 0}</p>
                    <p className="text-xs text-slate-500">Newsletter</p>
                </div>
                <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4 text-center">
                    <Users className="w-5 h-5 mx-auto mb-2 text-slate-500" />
                    <p className="text-xl font-bold text-white">{stats?.leads?.current ?? 0}</p>
                    <p className="text-xs text-slate-500">Leads (período)</p>
                </div>
                <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4 text-center">
                    <Target className="w-5 h-5 mx-auto mb-2 text-slate-500" />
                    <p className="text-xl font-bold text-white">{stats?.diagnostics?.current ?? 0}</p>
                    <p className="text-xs text-slate-500">Diagnósticos (período)</p>
                </div>
            </div>

            {/* Alerts Section */}
            <Card className="bg-slate-800/40 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
                        <Bell className="w-5 h-5 text-amber-400" />
                        Alertas Activas
                        {alerts.length > 0 && (
                            <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-amber-500/20 text-amber-400 rounded-full">
                                {alerts.length}
                            </span>
                        )}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {alerts.length > 0 ? (
                        <div className="space-y-3">
                            {alerts.map(alert => (
                                <AlertCard key={alert.id} alert={alert} onResolve={handleResolveAlert} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-8 text-slate-500">
                            <CheckCircle2 className="w-10 h-10 mb-3 opacity-20" />
                            <p className="text-sm">No hay alertas activas. Todo funciona correctamente.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminDashboard;
