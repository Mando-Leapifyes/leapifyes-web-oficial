import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Building2, FolderOpen, Users, Calendar, ChevronRight,
    Loader2, ArrowLeft, FileText, ExternalLink, Search, MapPin
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';

const AdminProjects = () => {
    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProject, setSelectedProject] = useState(null);
    const [activeTab, setActiveTab] = useState('projects');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [projRes] = await Promise.all([
                axios.get(`${BACKEND_URL}/api/projects`),
            ]);
            setProjects(projRes.data || []);
        } catch (err) {
            toast.error('Error al cargar datos', { description: err.message });
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        return new Intl.DateTimeFormat('es-ES', {
            day: '2-digit', month: 'short', year: 'numeric'
        }).format(new Date(dateString));
    };

    const filteredProjects = projects.filter(p =>
        (p.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.client_name || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    // === DRAWER (Project Detail View) ===
    if (selectedProject) {
        return (
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setSelectedProject(null)}
                        className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h2 className="text-2xl font-bold text-white">{selectedProject.name}</h2>
                        <p className="text-slate-400">Proyecto creado el {formatDate(selectedProject.created_at)}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
                            <h3 className="text-lg font-semibold text-white mb-4">Detalles del Proyecto</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <p className="text-sm text-slate-500 mb-1">Cliente</p>
                                    <p className="text-white font-medium flex items-center gap-2">
                                        <Users className="w-4 h-4 text-slate-400" />
                                        {selectedProject.client_name || 'N/A'}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 mb-1">Estado</p>
                                    <p className="text-white font-medium capitalize">{selectedProject.status || 'activo'}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 mb-1">Tipo</p>
                                    <p className="text-white font-medium">{selectedProject.type || 'General'}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 mb-1">Última actualización</p>
                                    <p className="text-white font-medium">{formatDate(selectedProject.updated_at)}</p>
                                </div>
                            </div>

                            {selectedProject.description && (
                                <div className="mt-6 pt-6 border-t border-slate-700/50">
                                    <p className="text-sm text-slate-500 mb-2">Descripción</p>
                                    <div className="bg-slate-900/50 rounded-lg p-4 text-slate-300 leading-relaxed border border-slate-800">
                                        {selectedProject.description}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
                            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Acciones</h3>
                            <div className="space-y-2">
                                <Button variant="outline" className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 justify-start">
                                    <FileText className="w-4 h-4 mr-2" />
                                    Ver Documentos
                                </Button>
                                <Button variant="outline" className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 justify-start" disabled>
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    Ver en Zoho (Fase 8)
                                </Button>
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
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        <Building2 className="w-7 h-7 text-[#1B93A4]" />
                        Clientes & Proyectos
                    </h2>
                    <p className="text-slate-400 mt-1">Total: {projects.length} proyectos registrados.</p>
                </div>
                <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800" onClick={fetchData}>
                    Actualizar
                </Button>
            </div>

            {/* Search */}
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4">
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <Input
                        placeholder="Buscar por nombre de proyecto o cliente..."
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
                        <Loader2 className="w-8 h-8 animate-spin mb-4 text-[#1B93A4]" />
                        <p>Cargando proyectos...</p>
                    </div>
                ) : filteredProjects.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-12 text-slate-500">
                        <FolderOpen className="w-12 h-12 mb-4 opacity-20" />
                        <p>No se encontraron proyectos</p>
                        <p className="text-xs mt-2 text-slate-600">Los proyectos aparecerán aquí cuando se creen desde el Portal de Clientes.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-slate-400 bg-slate-900/50 uppercase border-b border-slate-700/50">
                                <tr>
                                    <th className="px-6 py-4 font-medium">Proyecto</th>
                                    <th className="px-6 py-4 font-medium">Cliente</th>
                                    <th className="px-6 py-4 font-medium">Estado</th>
                                    <th className="px-6 py-4 font-medium">Fecha</th>
                                    <th className="px-6 py-4 text-right">Detalle</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700/50">
                                {filteredProjects.map(project => (
                                    <tr
                                        key={project.id}
                                        onClick={() => setSelectedProject(project)}
                                        className="hover:bg-slate-700/30 transition-colors cursor-pointer group"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-white group-hover:text-[#1B93A4] transition-colors flex items-center gap-2">
                                                <FolderOpen className="w-4 h-4 text-slate-500" />
                                                {project.name}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-slate-300">{project.client_name || '-'}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border bg-emerald-500/20 text-emerald-400 border-emerald-500/30 capitalize">
                                                {project.status || 'activo'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-slate-300 flex items-center gap-1.5">
                                                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                                                {formatDate(project.created_at)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-white ml-auto transition-colors" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminProjects;
