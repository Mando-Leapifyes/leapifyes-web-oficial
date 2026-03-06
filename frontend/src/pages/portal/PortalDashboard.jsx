import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  FolderOpen, 
  FileText, 
  Clock, 
  CheckCircle2,
  AlertCircle,
  LogOut,
  User,
  ChevronRight,
  Plus,
  Loader2
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Progress } from '../../components/ui/progress';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';

const statusConfig = {
  activo: { label: 'Activo', color: 'bg-green-500', icon: CheckCircle2 },
  en_progreso: { label: 'En Progreso', color: 'bg-blue-500', icon: Clock },
  completado: { label: 'Completado', color: 'bg-slate-500', icon: CheckCircle2 },
  pausado: { label: 'Pausado', color: 'bg-yellow-500', icon: AlertCircle },
};

const PortalDashboard = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/portal/login');
      return;
    }
    fetchProjects();
  }, [isAuthenticated, navigate]);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/projects`);
      setProjects(response.data);
    } catch (err) {
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/portal/login');
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-[#080B14]" data-testid="portal-dashboard">
      {/* Header */}
      <header className="bg-[#0D1117] border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Leapifyes" className="h-8 w-auto" />
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-[#8892A4]">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1B93A4] to-[#3B82F6] flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="hidden sm:inline">{user?.name}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-[#8892A4] hover:text-[#F0F4FF] hover:bg-white/5" data-testid="logout-btn">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-[#F0F4FF] mb-2">
            ¡Hola, {user?.name?.split(' ')[0]}!
          </h1>
          <p className="text-[#8892A4]">
            Bienvenido a tu portal de cliente. Aquí puedes ver el estado de tus proyectos.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Proyectos Activos', value: projects.filter(p => p.status === 'activo' || p.status === 'en_progreso').length, icon: FolderOpen, color: 'from-[#1B93A4] to-[#3B82F6]' },
            { label: 'Completados', value: projects.filter(p => p.status === 'completado').length, icon: CheckCircle2, color: 'from-green-500 to-emerald-600' },
            { label: 'Documentos', value: '—', icon: FileText, color: 'from-[#D946EF] to-[#3B82F6]' },
            { label: 'Progreso Total', value: projects.length > 0 ? `${Math.round(projects.reduce((a, p) => a + p.progress, 0) / projects.length)}%` : '0%', icon: Clock, color: 'from-orange-500 to-amber-600' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-white/10 bg-[#161B22]">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-[#8892A4] mb-1">{stat.label}</p>
                      <p className="text-3xl font-bold text-[#F0F4FF]">{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Projects Section */}
        <Card className="border-white/10 bg-[#161B22] mb-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-[#F0F4FF]">
              <LayoutDashboard className="w-5 h-5 text-[#1B93A4]" />
              Mis Proyectos
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-[#1B93A4]" />
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center py-12">
                <FolderOpen className="w-12 h-12 text-[#8892A4]/30 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-[#F0F4FF] mb-2">No hay proyectos aún</h3>
                <p className="text-[#8892A4] mb-4">
                  Cuando contrates nuestros servicios, tus proyectos aparecerán aquí.
                </p>
                <Link to="/contacto">
                  <Button className="btn-gradient">
                    Solicitar Presupuesto
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {projects.map((project) => {
                  const status = statusConfig[project.status] || statusConfig.activo;
                  const StatusIcon = status.icon;
                  
                  return (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border border-white/10 rounded-xl p-4 hover:border-white/20 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-[#F0F4FF]">{project.name}</h3>
                          <p className="text-sm text-[#8892A4]">{project.description || 'Sin descripción'}</p>
                        </div>
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${status.color} text-white`}>
                          <StatusIcon className="w-3 h-3" />
                          {status.label}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-[#8892A4]">Progreso</span>
                          <span className="font-medium text-[#F0F4FF]">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link to="/contacto">
            <Card className="border-white/10 bg-[#161B22] hover:border-[#1B93A4]/50 transition-colors cursor-pointer h-full">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#1B93A4]/10 flex items-center justify-center">
                  <Plus className="w-6 h-6 text-[#1B93A4]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#F0F4FF]">Nuevo Proyecto</h3>
                  <p className="text-sm text-[#8892A4]">Solicita un presupuesto</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/app/demo-agentes-ia">
            <Card className="border-white/10 bg-[#161B22] hover:border-[#D946EF]/50 transition-colors cursor-pointer h-full">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#D946EF]/10 flex items-center justify-center">
                  <LayoutDashboard className="w-6 h-6 text-[#D946EF]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#F0F4FF]">Demo Agente IA</h3>
                  <p className="text-sm text-[#8892A4]">Prueba nuestro asistente</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <a href="https://wa.me/34694214849" target="_blank" rel="noopener noreferrer">
            <Card className="border-white/10 bg-[#161B22] hover:border-green-500/50 transition-colors cursor-pointer h-full">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-[#F0F4FF]">Soporte WhatsApp</h3>
                  <p className="text-sm text-[#8892A4]">Contacta con nosotros</p>
                </div>
              </CardContent>
            </Card>
          </a>
        </div>
      </main>
    </div>
  );
};

export default PortalDashboard;
