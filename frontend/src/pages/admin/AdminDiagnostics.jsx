import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Search, FileText, Calendar,
    MapPin, BrainCircuit, Activity, ChevronRight, Loader2, ArrowLeft, Target, Play
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';

const getScoreColor = (score) => {
    if (score >= 80) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    if (score >= 50) return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
    return 'text-red-400 bg-red-500/10 border-red-500/20';
};

const getScoreLabel = (score) => {
    if (score >= 80) return 'Avanzado';
    if (score >= 50) return 'Intermedio';
    return 'Básico';
};

const AdminDiagnostics = () => {
    const [diagnostics, setDiagnostics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDiag, setSelectedDiag] = useState(null);

    useEffect(() => {
        fetchDiagnostics();
    }, []);

    const fetchDiagnostics = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${BACKEND_URL}/api/diagnostics`);
            setDiagnostics(res.data);
        } catch (err) {
            toast.error('Error al cargar diagnósticos', { description: err.message });
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const filteredDiagnostics = diagnostics.filter(diag => {
        const emailMatch = diag.email?.toLowerCase().includes(searchTerm.toLowerCase());
        const sectorMatch = diag.answers?.sector?.toLowerCase().includes(searchTerm.toLowerCase());
        return emailMatch || sectorMatch;
    });

    const formatDate = (dateString) => {
        return new Intl.DateTimeFormat('es-ES', {
            day: '2-digit', month: 'short', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        }).format(new Date(dateString));
    };

    // === DRAWER (Diagnostic Detail View) ===
    if (selectedDiag) {
        const ds = selectedDiag.answers;
        const scoreColor = getScoreColor(selectedDiag.score);

        return (
            <div className="space-y-6">
                {/* Header Actions */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setSelectedDiag(null)}
                        className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                    Reporte IMD
                                    <span className={`px-2.5 py-0.5 text-sm font-medium border rounded-full ${scoreColor}`}>
                                        Score: {selectedDiag.score}/100 ({getScoreLabel(selectedDiag.score)})
                                    </span>
                                </h2>
                                <p className="text-slate-400 mt-1">Evaluado el {formatDate(selectedDiag.created_at)}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Answers Column */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
                            <h3 className="text-lg font-semibold text-white mb-6">Respuestas del Cliente</h3>

                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4 pb-6 border-b border-slate-700/50">
                                    <div>
                                        <p className="text-sm text-slate-500 mb-1">Email del Solicitante</p>
                                        <p className="text-white font-medium">{selectedDiag.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500 mb-1">Sector Principal</p>
                                        <p className="text-white font-medium capitalize">{ds.sector || 'No especificado'}</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                                        <p className="text-sm text-slate-400 mb-1">¿Qué mejor describe el alcance de tu empresa actual?</p>
                                        <p className="text-white">{ds.company_size || 'N/A'}</p>
                                    </div>
                                    <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                                        <p className="text-sm text-slate-400 mb-1">¿Qué porcentaje de tus ventas proviene actualmente de canales digitales?</p>
                                        <p className="text-white">{ds.digital_sales || 'N/A'}</p>
                                    </div>
                                    <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                                        <p className="text-sm text-slate-400 mb-1">¿Cómo gestionas actualmente la relación con tus clientes (CRM) y ventas?</p>
                                        <p className="text-white">{ds.crm_usage || 'N/A'}</p>
                                    </div>
                                    <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                                        <p className="text-sm text-slate-400 mb-1">¿Utilizas alguna herramienta de Inteligencia Artificial en tus procesos diarios?</p>
                                        <p className="text-white">{ds.ai_usage || 'N/A'}</p>
                                    </div>
                                    <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                                        <p className="text-sm text-slate-400 mb-1">¿Cuentas con un sitio web activo y optimizado o es apenas informativo?</p>
                                        <p className="text-white">{ds.website_status || 'N/A'}</p>
                                    </div>
                                    <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                                        <p className="text-sm text-slate-400 mb-1">¿Cuál es tu principal desafío operativo o de negocio ahora mismo?</p>
                                        <p className="text-white">{ds.biggest_challenge || 'N/A'}</p>
                                    </div>
                                    <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                                        <p className="text-sm text-slate-400 mb-1">¿Tienes presupuesto asignado para digitalización este año?</p>
                                        <p className="text-white">{ds.budget || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* AI Panel & Actions */}
                    <div className="space-y-6">
                        {/* AI Summary Panel */}
                        <div className="relative overflow-hidden rounded-xl bg-slate-900 border border-slate-800 p-6">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <BrainCircuit className="w-24 h-24" />
                            </div>
                            <div className="relative z-10 flex flex-col gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D946EF] to-[#8B5CF6] flex items-center justify-center">
                                        <BrainCircuit className="w-4 h-4 text-white" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-white">Análisis IA Ejecutivo</h3>
                                </div>

                                <div className="text-slate-300 text-sm leading-relaxed space-y-3">
                                    <p>
                                        El cliente presenta una madurez digital de nivel <strong>{getScoreLabel(selectedDiag.score)}</strong>.
                                    </p>
                                    {selectedDiag.score < 50 ? (
                                        <p>Su principal reto son los procesos manuales y la falta de un CRM. Se recomienda ofrecer el paquete <strong>Acelera Pymes Inicial</strong> enfocado en automatización básica y presencia web.</p>
                                    ) : selectedDiag.score < 80 ? (
                                        <p>Ya usan canales digitales pero tienen cuellos de botella operativos ({ds.biggest_challenge}). El enfoque de venta debe ser en <strong>Agentes de IA e Integraciones Zoho</strong>.</p>
                                    ) : (
                                        <p>Perfil sofisticado con presupuesto. Interesados en escalar. Se recomienda la propuesta <strong>Transformación Digital Total</strong> como consultoría estratégica.</p>
                                    )}
                                </div>

                                <Button className="w-full mt-2 bg-slate-800 hover:bg-slate-700 text-white border-none group">
                                    <Play className="w-4 h-4 mr-2 group-hover:text-[#D946EF] transition-colors" />
                                    Generar Resumen Completo PDF
                                </Button>
                            </div>
                        </div>

                        <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
                            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Perfil Completo</h3>
                            <p className="text-sm text-slate-400 mb-4">
                                Si este email ({selectedDiag.email}) corresponde a un Lead captado, aquí podrás ver su estado comercial cruzado.
                            </p>
                            <Button variant="outline" className="w-full border-slate-700 hover:bg-slate-800 text-slate-300">
                                <Search className="w-4 h-4 mr-2" />
                                Buscar en Leads
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // === MAIN LIST VIEW ===
    return (
        <div className="space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white">Diagnósticos IMD</h2>
                    <p className="text-slate-400">Total: {diagnostics.length} evaluaciones del Índice de Madurez Digital.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800" onClick={fetchDiagnostics}>
                        Actualizar
                    </Button>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4">
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <Input
                        placeholder="Buscar por email o sector..."
                        className="pl-10 bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Table */}
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl overflow-hidden">
                {loading ? (
                    <div className="flex flex-col items-center justify-center p-12 text-slate-500">
                        <Loader2 className="w-8 h-8 animate-spin mb-4 text-[#D946EF]" />
                        <p>Calculando matrices...</p>
                    </div>
                ) : filteredDiagnostics.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-12 text-slate-500">
                        <Target className="w-12 h-12 mb-4 opacity-20" />
                        <p>No hay diagnósticos completados que coincidan</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-slate-400 bg-slate-900/50 uppercase border-b border-slate-700/50">
                                <tr>
                                    <th className="px-6 py-4 font-medium">Email Solicitante</th>
                                    <th className="px-6 py-4 font-medium">Sector / Empresa</th>
                                    <th className="px-6 py-4 font-medium">Score IMD</th>
                                    <th className="px-6 py-4 font-medium">Nivel de Madurez</th>
                                    <th className="px-6 py-4 font-medium">Fecha</th>
                                    <th className="px-6 py-4 text-right">Detalle</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700/50">
                                {filteredDiagnostics.map(diag => {
                                    const scoreColor = getScoreColor(diag.score);
                                    return (
                                        <tr
                                            key={diag.id}
                                            onClick={() => setSelectedDiag(diag)}
                                            className="hover:bg-slate-700/30 transition-colors cursor-pointer group"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-white flex items-center gap-2">
                                                    <Mail className="w-4 h-4 text-slate-500" />
                                                    {diag.email}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-slate-300 capitalize">{diag.answers?.sector || '-'}</div>
                                                <div className="text-slate-500 text-xs mt-1 truncate max-w-[200px]">{diag.answers?.company_size || '-'}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <Activity className={`w-4 h-4 ${scoreColor.split(' ')[0]}`} />
                                                    <span className={`font-bold ${scoreColor.split(' ')[0]}`}>{diag.score}</span>
                                                    <span className="text-slate-500 text-xs">/ 100</span>
                                                </div>
                                                {/* Progress Bar Mini */}
                                                <div className="w-24 h-1.5 bg-slate-700 rounded-full mt-2 overflow-hidden">
                                                    <div
                                                        className={`h-full ${scoreColor.split(' ')[0].replace('text-', 'bg-')}`}
                                                        style={{ width: `${diag.score}%` }}
                                                    />
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${scoreColor}`}>
                                                    {getScoreLabel(diag.score)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-slate-300 flex items-center gap-1.5">
                                                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                                                    {formatDate(diag.created_at).split(',')[0]}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Button variant="ghost" className="h-8 w-8 p-0 text-slate-400 group-hover:text-white group-hover:bg-slate-700">
                                                    <ChevronRight className="w-5 h-5" />
                                                </Button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDiagnostics;
