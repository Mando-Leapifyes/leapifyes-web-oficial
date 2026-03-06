import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  ClipboardList, 
  BarChart3, 
  Bot, 
  ArrowRight,
  TrendingUp,
  Users,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const AppDashboard = () => {
  const quickActions = [
    {
      title: 'Diagnóstico Rápido',
      description: 'Evalúa tu madurez digital en 3-5 minutos',
      icon: ClipboardList,
      href: '/app/diagnostico',
      color: 'from-[#1B93A4] to-[#3B82F6]',
    },
    {
      title: 'Ver Resultados',
      description: 'Consulta tu roadmap personalizado',
      icon: BarChart3,
      href: '/app/resultados',
      color: 'from-[#3B82F6] to-[#D946EF]',
    },
    {
      title: 'Demo Agentes IA',
      description: 'Prueba un agente en acción',
      icon: Bot,
      href: '/app/demo-agentes-ia',
      color: 'from-[#D946EF] to-[#1B93A4]',
    },
  ];

  const stats = [
    { label: 'Diagnósticos completados', value: '1,247', icon: CheckCircle2, change: '+12%' },
    { label: 'Empresas transformadas', value: '50+', icon: Users, change: '+8%' },
    { label: 'Tiempo medio diagnóstico', value: '4 min', icon: Clock, change: '-15%' },
    { label: 'Satisfacción', value: '98%', icon: TrendingUp, change: '+2%' },
  ];

  return (
    <div className="min-h-screen bg-[#080B14]" data-testid="app-dashboard">
      {/* App Header */}
      <header className="bg-[#0D1117] border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1B93A4] via-[#3B82F6] to-[#D946EF] flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-[#F0F4FF]">Leapifyes</span>
              <span className="text-xs px-2 py-0.5 bg-white/5 rounded-full text-[#8892A4]">App</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/app/diagnostico" className="text-sm text-[#8892A4] hover:text-[#F0F4FF] transition-colors">
              Diagnóstico
            </Link>
            <Link to="/app/resultados" className="text-sm text-[#8892A4] hover:text-[#F0F4FF] transition-colors">
              Resultados
            </Link>
            <Link to="/app/demo-agentes-ia" className="text-sm text-[#8892A4] hover:text-[#F0F4FF] transition-colors">
              Demo IA
            </Link>
          </nav>
          <Link to="/contacto">
            <Button className="btn-gradient text-sm px-4 py-2" data-testid="app-contact-btn">
              Contactar
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="mb-12"
        >
          <motion.h1 variants={fadeInUp} className="text-4xl font-bold text-[#F0F4FF] mb-4">
            Bienvenido a Leapifyes App
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-xl text-[#8892A4]">
            Tu centro de control para la transformación digital. Evalúa, planifica y actúa.
          </motion.p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          {quickActions.map((action, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Link to={action.href}>
                <Card className="h-full border-white/10 bg-[#161B22] hover:border-white/20 card-hover group overflow-hidden">
                  <CardContent className="p-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <action.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-[#F0F4FF] mb-2">{action.title}</h3>
                    <p className="text-[#8892A4] mb-4">{action.description}</p>
                    <span className="inline-flex items-center text-sm font-medium text-[#3B82F6] group-hover:gap-3 gap-2 transition-all">
                      Empezar <ArrowRight className="w-4 h-4" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-[#F0F4FF] mb-6">Métricas de la Plataforma</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="border-white/10 bg-[#161B22]">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                      <stat.icon className="w-5 h-5 text-[#8892A4]" />
                    </div>
                    <span className="text-xs font-medium text-green-400 bg-green-500/10 px-2 py-1 rounded-full">
                      {stat.change}
                    </span>
                  </div>
                  <p className="text-3xl font-bold text-[#F0F4FF] mb-1">{stat.value}</p>
                  <p className="text-sm text-[#8892A4]">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-2xl p-8 md:p-12 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#1B93A4]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D946EF]/20 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold text-[#F0F4FF] mb-4">
              ¿Primera vez aquí?
            </h2>
            <p className="text-[#8892A4] mb-6 max-w-xl mx-auto">
              Empieza con el diagnóstico rápido. En menos de 5 minutos tendrás un análisis personalizado de tu situación digital.
            </p>
            <Link to="/app/diagnostico">
              <Button className="btn-gradient" data-testid="app-start-diagnostico">
                Comenzar Diagnóstico
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <p className="text-sm text-[#8892A4]">© 2024 Leapifyes. Todos los derechos reservados.</p>
          <Link to="/" className="text-sm text-[#8892A4] hover:text-[#F0F4FF] transition-colors">
            Volver al sitio web
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default AppDashboard;
