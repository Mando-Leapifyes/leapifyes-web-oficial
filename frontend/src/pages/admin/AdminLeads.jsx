import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Search, Filter, ExternalLink, Calendar,
    Mail, Phone, Building2, MapPin, Briefcase, ChevronRight, Loader2, ArrowLeft
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';

// Status colors and labels
const STATUS_CONFIG = {
    'new': { label: 'Nuevo', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
    'contacted': { label: 'Contactado', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
    'qualified': { label: 'Cualificado', color: 'bg-[#D946EF]/20 text-[#D946EF] border-[#D946EF]/30' },
    'lost': { label: 'Perdido', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
    'won': { label: 'Ganado', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' }
};

const AdminLeads = () => {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedLead, setSelectedLead] = useState(null);

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${BACKEND_URL}/api/contacts`); // Note: Requires admin token
            // Sort by newest first
            const sorted = res.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            setLeads(sorted);
        } catch (err) {
            toast.error('Error al cargar leads', { description: err.message });
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const filteredLeads = leads.filter(lead => {
        const matchesSearch =
            lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.email.toLowerCase().includes(searchTerm.toLowerCase());

        // Si no tiene status definido en BD antigua, lo asumimos como 'new'
        const status = lead.status || 'new';
        const matchesStatus = filterStatus === 'all' || status === filterStatus;

        return matchesSearch && matchesStatus;
    });

    const formatDate = (dateString) => {
        return new Intl.DateTimeFormat('es-ES', {
            day: '2-digit', month: 'short', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        }).format(new Date(dateString));
    };


    // === HANDLERS ===
    const handleStatusUpdate = async (newStatus) => {
        try {
            if (!selectedLead) return;

            // Note: In real app, we need to pass the Bearer admin token if the backend requires it.
            // Since AuthContext already sets axios.defaults.headers.common['Authorization'], this should work automatically.
            const res = await axios.patch(`${BACKEND_URL}/api/contacts/${selectedLead.id}`, {
                status: newStatus
            });

            // Update local state without reloading
            const updatedLeads = leads.map(l =>
                l.id === selectedLead.id ? { ...l, status: newStatus } : l
            );
            setLeads(updatedLeads);
            setSelectedLead({ ...selectedLead, status: newStatus });

            toast.success('Estado actualizado', { description: res.data.message || 'El lead se movió correctamente.' });
        } catch (err) {
            toast.error('Error al actualizar', { description: err.response?.data?.detail || 'Revisa tu conexión o permisos.' });
            console.error(err);
        }
    };

    // === DRAWER (Lead Detail View) ===
    if (selectedLead) {
        const status = selectedLead.status || 'new';

        return (
            <div className="space-y-6">
                {/* Header Actions */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setSelectedLead(null)}
                        className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <div className="flex items-center gap-3">
                            <h2 className="text-2xl font-bold text-white">{selectedLead.name}</h2>
                            <span className={`px-2.5 py-0.5 text-xs font-medium border rounded-full ${STATUS_CONFIG[status].color}`}>
                                {STATUS_CONFIG[status].label}
                            </span>
                        </div>
                        <p className="text-slate-400">Captado el {formatDate(selectedLead.created_at)}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Info Column */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Mensaje original / Ficha */}
                        <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
                            <h3 className="text-lg font-semibold text-white mb-4">Información Comercial</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <p className="text-sm text-slate-500 mb-1">Empresa</p>
                                    <p className="text-white font-medium flex items-center gap-2">
                                        <Building2 className="w-4 h-4 text-slate-400" />
                                        {selectedLead.company || 'No especificada'}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 mb-1">Sector</p>
                                    <p className="text-white font-medium flex items-center gap-2">
                                        <Briefcase className="w-4 h-4 text-slate-400" />
                                        {selectedLead.sector || 'General'}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 mb-1">Ubicación</p>
                                    <p className="text-white font-medium flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-slate-400" />
                                        {selectedLead.city || 'Desconocida'}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 border-t border-slate-700/50 pt-6">
                                <p className="text-sm text-slate-500 mb-2">Mensaje Original</p>
                                <div className="bg-slate-900/50 rounded-lg p-4 text-slate-300 italic whitespace-pre-wrap leading-relaxed border border-slate-800">
                                    "{selectedLead.message || 'Sin mensaje'}"
                                </div>
                            </div>
                        </div>

                        {/* Acciones Comerciales Dummy placeholder */}
                        <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6 flex items-center justify-between group cursor-not-allowed">
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-amber-400 transition-colors">Empujar a Zoho CRM</h3>
                                <p className="text-sm text-slate-400">Sincroniza este lead con tu embudo en Zoho.</p>
                            </div>
                            <Button disabled variant="outline" className="border-slate-600 text-slate-500">
                                <ExternalLink className="w-4 h-4 mr-2" />
                                No Configurado (Fase 4)
                            </Button>
                        </div>

                    </div>

                    {/* Quick Actions Side Column */}
                    <div className="space-y-6">
                        <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
                            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider flex items-center gap-2">Contacto Rápido</h3>
                            <div className="space-y-3">
                                <a
                                    href={`mailto:${selectedLead.email}`}
                                    className="flex items-center gap-3 p-3 rounded-lg bg-slate-900/50 border border-slate-700 hover:border-slate-500 transition-colors text-slate-300 hover:text-white group"
                                >
                                    <div className="p-2 bg-[#1B93A4]/10 rounded-md group-hover:bg-[#1B93A4]/20 transition-colors">
                                        <Mail className="w-4 h-4 text-[#1B93A4]" />
                                    </div>
                                    <div className="flex-1 truncate">
                                        <p className="text-xs text-slate-500">Email</p>
                                        <p className="text-sm truncate font-medium">{selectedLead.email}</p>
                                    </div>
                                </a>

                                {selectedLead.phone && (
                                    <a
                                        href={`tel:${selectedLead.phone}`}
                                        className="flex items-center gap-3 p-3 rounded-lg bg-slate-900/50 border border-slate-700 hover:border-slate-500 transition-colors text-slate-300 hover:text-white group"
                                    >
                                        <div className="p-2 bg-emerald-500/10 rounded-md group-hover:bg-emerald-500/20 transition-colors">
                                            <Phone className="w-4 h-4 text-emerald-400" />
                                        </div>
                                        <div className="flex-1 truncate">
                                            <p className="text-xs text-slate-500">Teléfono</p>
                                            <p className="text-sm truncate font-medium">{selectedLead.phone}</p>
                                        </div>
                                    </a>
                                )}
                            </div>
                        </div>

                        <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
                            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Actualizar Estado</h3>
                            <div className="flex flex-col gap-2">
                                {Object.entries(STATUS_CONFIG).map(([key, config]) => (
                                    <button
                                        key={key}
                                        onClick={() => handleStatusUpdate(key)}
                                        className={`w-full text-left px-4 py-2 border rounded-lg text-sm transition-all duration-200 ${status === key
                                            ? config.color + ' opacity-100 ring-2 ring-current font-medium shadow-lg shadow-black/20'
                                            : 'border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white'
                                            }`}
                                    >
                                        <span className="flex items-center justify-between">
                                            {config.label}
                                            {status === key && <div className="w-1.5 h-1.5 rounded-full bg-current" />}
                                        </span>
                                    </button>
                                ))}
                            </div>
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
                    <h2 className="text-2xl font-bold text-white">Leads y Formularios</h2>
                    <p className="text-slate-400">Total: {leads.length} registros en la base de datos.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800" onClick={fetchLeads}>
                        Actualizar
                    </Button>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4 flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <Input
                        placeholder="Buscar por nombre, empresa o email..."
                        className="pl-10 bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-slate-500" />
                    <select
                        className="bg-slate-900/50 border border-slate-700 text-slate-300 text-sm rounded-lg pr-8 focus:ring-1 focus:ring-[#1B93A4] px-3 py-2 outline-none"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="all">Todos los estados</option>
                        {Object.entries(STATUS_CONFIG).map(([key, config]) => (
                            <option key={key} value={key}>{config.label}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl overflow-hidden">
                {loading ? (
                    <div className="flex flex-col items-center justify-center p-12 text-slate-500">
                        <Loader2 className="w-8 h-8 animate-spin mb-4 text-[#1B93A4]" />
                        <p>Cargando leads...</p>
                    </div>
                ) : filteredLeads.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-12 text-slate-500">
                        <Search className="w-12 h-12 mb-4 opacity-20" />
                        <p>No se encontraron resultados</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-slate-400 bg-slate-900/50 uppercase border-b border-slate-700/50">
                                <tr>
                                    <th className="px-6 py-4 font-medium">Lead & Empresa</th>
                                    <th className="px-6 py-4 font-medium">Contacto</th>
                                    <th className="px-6 py-4 font-medium">Sector</th>
                                    <th className="px-6 py-4 font-medium">Fecha</th>
                                    <th className="px-6 py-4 font-medium">Estado</th>
                                    <th className="px-6 py-4 text-right">Acción</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700/50">
                                {filteredLeads.map(lead => {
                                    const status = lead.status || 'new';
                                    return (
                                        <tr
                                            key={lead.id}
                                            onClick={() => setSelectedLead(lead)}
                                            className="hover:bg-slate-700/30 transition-colors cursor-pointer group"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-white group-hover:text-[#1B93A4] transition-colors">
                                                    {lead.name}
                                                </div>
                                                <div className="text-slate-500 flex items-center gap-1 mt-1">
                                                    <Building2 className="w-3 h-3" />
                                                    {lead.company || 'Sin empresa'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-slate-300">{lead.email}</div>
                                                {lead.phone && <div className="text-slate-500 text-xs mt-1">{lead.phone}</div>}
                                            </td>
                                            <td className="px-6 py-4 text-slate-300">
                                                {lead.sector || '-'}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-slate-300 flex items-center gap-1.5">
                                                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                                                    {formatDate(lead.created_at).split(',')[0]}
                                                </div>
                                                <div className="text-slate-500 text-xs ml-5 mt-0.5">
                                                    {formatDate(lead.created_at).split(',')[1]}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${STATUS_CONFIG[status].color}`}>
                                                    {STATUS_CONFIG[status].label}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-white ml-auto transition-colors" />
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

export default AdminLeads;
