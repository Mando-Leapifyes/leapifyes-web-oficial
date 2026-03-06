import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    BarChart2, Eye, MousePointerClick, FileText, Target,
    Users, TrendingUp, Loader2, Globe, ArrowUpRight
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';

const AdminAnalytics = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${BACKEND_URL}/api/admin/analytics`);
            setData(res.data);
        } catch (err) {
            toast.error('Error al cargar analítica', { description: err.message });
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center p-24 text-slate-500">
                <Loader2 className="w-8 h-8 animate-spin mb-4 text-[#1B93A4]" />
                <p>Cargando analítica...</p>
            </div>
        );
    }

    const kpis = [
        { label: 'Visitas Totales', value: data?.page_views ?? 0, icon: Eye, color: 'from-[#1B93A4] to-[#3B82F6]' },
        { label: 'Sesiones Únicas', value: data?.unique_sessions ?? 0, icon: Users, color: 'from-[#D946EF] to-[#8B5CF6]' },
        { label: 'Formularios Enviados', value: data?.form_submits ?? 0, icon: FileText, color: 'from-emerald-500 to-teal-500' },
        { label: 'Tasa de Conversión', value: `${data?.conversion_rate ?? 0}%`, icon: TrendingUp, color: 'from-amber-500 to-orange-500' },
        { label: 'Diagnósticos Iniciados', value: data?.diagnosis_starts ?? 0, icon: Target, color: 'from-blue-500 to-indigo-500' },
        { label: 'Diagnósticos Completados', value: data?.diagnosis_completes ?? 0, icon: Target, color: 'from-violet-500 to-purple-500' },
        { label: 'Clics en CTA', value: data?.cta_clicks ?? 0, icon: MousePointerClick, color: 'from-pink-500 to-rose-500' },
        { label: 'Total Eventos', value: data?.total_events ?? 0, icon: Globe, color: 'from-slate-500 to-slate-400' },
    ];

    // Chart - Daily views bar chart (CSS only, no library needed)
    const dailyViews = data?.daily_views || [];
    const maxDailyCount = Math.max(...dailyViews.map(d => d.count), 1);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        <BarChart2 className="w-7 h-7 text-[#1B93A4]" />
                        Analítica Web
                    </h2>
                    <p className="text-slate-400 mt-1">Tráfico, conversión y comportamiento de usuarios en leapifyes.com</p>
                </div>
                <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800" onClick={fetchAnalytics}>
                    Actualizar
                </Button>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {kpis.map((kpi, i) => (
                    <div key={i} className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4 group hover:border-slate-600 transition-all duration-300">
                        <div className="flex items-start justify-between mb-3">
                            <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${kpi.color} flex items-center justify-center shadow-lg`}>
                                <kpi.icon className="w-4 h-4 text-white" />
                            </div>
                            <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <p className="text-xl font-bold text-white">{kpi.value}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{kpi.label}</p>
                    </div>
                ))}
            </div>

            {/* Daily Views Chart */}
            <Card className="bg-slate-800/40 border-slate-700/50">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
                        <Eye className="w-5 h-5 text-[#1B93A4]" />
                        Visitas por Día (últimos 30 días)
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {dailyViews.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-slate-500">
                            <BarChart2 className="w-12 h-12 mb-4 opacity-20" />
                            <p className="text-sm">No hay datos de visitas aún. Los eventos se registrarán automáticamente.</p>
                        </div>
                    ) : (
                        <div className="flex items-end gap-1 h-40">
                            {dailyViews.map((day, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                                    <span className="text-[10px] text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                        {day.count}
                                    </span>
                                    <div
                                        className="w-full bg-gradient-to-t from-[#1B93A4] to-[#3B82F6] rounded-t-sm transition-all duration-300 hover:opacity-80 min-h-[2px]"
                                        style={{ height: `${(day.count / maxDailyCount) * 100}%` }}
                                        title={`${day.date}: ${day.count} visitas`}
                                    />
                                    {i % 5 === 0 && (
                                        <span className="text-[9px] text-slate-600 mt-1 truncate w-full text-center">
                                            {day.date.slice(5)}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Top Pages */}
            <Card className="bg-slate-800/40 border-slate-700/50">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
                        <Globe className="w-5 h-5 text-[#D946EF]" />
                        Páginas Más Visitadas
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {(data?.top_pages || []).length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-8 text-slate-500">
                            <Globe className="w-10 h-10 mb-3 opacity-20" />
                            <p className="text-sm">Se mostrarán las páginas más visitadas cuando haya datos de tráfico.</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {data.top_pages.map((page, i) => {
                                const maxCount = data.top_pages[0]?.count || 1;
                                return (
                                    <div key={i} className="flex items-center gap-4">
                                        <span className="text-xs text-slate-500 w-6 text-right font-mono">{i + 1}</span>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-sm text-white font-medium truncate max-w-[300px]">{page.page || '/'}</span>
                                                <span className="text-xs text-slate-400 font-mono">{page.count} visitas</span>
                                            </div>
                                            <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-[#D946EF] to-[#8B5CF6] rounded-full"
                                                    style={{ width: `${(page.count / maxCount) * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminAnalytics;
