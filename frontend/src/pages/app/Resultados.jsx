import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Download, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Target,
  Zap,
  TrendingUp
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Progress } from '../../components/ui/progress';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const Resultados = () => {
  const [answers, setAnswers] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const savedAnswers = localStorage.getItem('diagnosticAnswers');
    if (savedAnswers) {
      const parsed = JSON.parse(savedAnswers);
      setAnswers(parsed);
      calculateScore(parsed);
    }
  }, []);

  const calculateScore = (ans) => {
    let total = 0;
    // Scoring directo: cada respuesta tiene valor 1-4
    Object.values(ans).forEach(val => {
      total += parseInt(val) || 1;
    });
    // Max = 5 preguntas × 4 puntos = 20. Convertir a porcentaje.
    setScore(Math.round((total / 20) * 100));
  };

  const getMaturityLevel = () => {
    if (score >= 80) return { level: 'Digital Avanzado', color: 'text-green-400', bg: 'bg-green-500/20', desc: 'Tu negocio ya opera con procesos digitales maduros. El siguiente paso es optimizar y escalar.' };
    if (score >= 60) return { level: 'En Transformación', color: 'text-blue-400', bg: 'bg-blue-500/20', desc: 'Tienes buenas bases digitales. Con los ajustes correctos puedes multiplicar tu eficiencia.' };
    if (score >= 35) return { level: 'En Desarrollo', color: 'text-yellow-400', bg: 'bg-yellow-500/20', desc: 'Tu negocio tiene potencial real. Estás perdiendo tiempo y clientes que la digitalización puede recuperar.' };
    return { level: 'Analog First', color: 'text-red-400', bg: 'bg-red-500/20', desc: 'La buena noticia: hay mucho por ganar. Una transformación bien planificada puede cambiar tu negocio en 90 días.' };
  };

  const maturity = getMaturityLevel();

  const roadmap = [
    {
      phase: '30 días',
      title: 'Quick Wins',
      items: [
        'Automatizar respuestas frecuentes en WhatsApp',
        'Implementar CRM básico para seguimiento de leads',
        'Configurar recordatorios automáticos de citas',
      ],
      icon: Zap,
      color: 'from-[#1B93A4] to-[#3B82F6]',
    },
    {
      phase: '60 días',
      title: 'Consolidación',
      items: [
        'Integrar sistemas existentes (email, calendario, CRM)',
        'Implementar agente IA para cualificación de leads',
        'Crear dashboard de métricas clave',
      ],
      icon: Target,
      color: 'from-[#3B82F6] to-[#D946EF]',
    },
    {
      phase: '90 días',
      title: 'Optimización',
      items: [
        'Automatizar generación de presupuestos',
        'Implementar seguimiento proactivo automatizado',
        'Analizar datos y optimizar flujos',
      ],
      icon: TrendingUp,
      color: 'from-[#D946EF] to-[#1B93A4]',
    },
  ];

  const quickWins = [
    {
      title: 'Respuesta automática WhatsApp',
      impact: 'Alto',
      effort: 'Bajo',
      description: 'Configura un mensaje de bienvenida y respuestas a preguntas frecuentes.',
    },
    {
      title: 'Formulario de contacto optimizado',
      impact: 'Alto',
      effort: 'Bajo',
      description: 'Captura mejor los datos de tus leads con un formulario inteligente.',
    },
    {
      title: 'Recordatorios de citas',
      impact: 'Medio',
      effort: 'Bajo',
      description: 'Reduce los no-shows con recordatorios automáticos 24h antes.',
    },
  ];

  if (!answers) {
    return (
      <div className="min-h-screen bg-[#080B14] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#F0F4FF] mb-4">No hay diagnóstico disponible</h2>
          <p className="text-[#8892A4] mb-6">Completa el diagnóstico para ver tus resultados.</p>
          <Link to="/app/diagnostico">
            <Button className="btn-gradient">
              Hacer Diagnóstico
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080B14]" data-testid="resultados-page">
      {/* Header */}
      <header className="bg-[#0D1117] border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/app" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1B93A4] via-[#3B82F6] to-[#D946EF] flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-[#F0F4FF]">Leapifyes</span>
          </Link>
          <Button variant="outline" className="border-white/10 text-[#8892A4] hover:bg-white/5 hover:text-[#F0F4FF]" data-testid="download-report">
            <Download className="w-4 h-4 mr-2" />
            Descargar PDF
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Score Overview */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="mb-12"
        >
          <motion.div variants={fadeInUp} className="bg-[#161B22] rounded-2xl p-8 border border-white/10">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B93A4]/10 border border-[#1B93A4]/20 text-[#1B93A4] text-xs font-semibold mb-3">
                  ÍNDICE DE MADUREZ DIGITAL · LEAPIFYES
                </div>
                <h1 className="text-3xl font-bold text-[#F0F4FF] mb-2">Tu nivel digital</h1>
                <p className="text-[#8892A4] mb-4">{maturity.desc}</p>
                <div className="flex items-center gap-4">
                  <span className={`px-4 py-2 rounded-full font-medium ${maturity.bg} ${maturity.color}`}>
                    {maturity.level}
                  </span>
                </div>
              </div>
              <div className="text-center">
                <div className="relative w-48 h-48 mx-auto">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="96"
                      cy="96"
                      r="88"
                      fill="none"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="12"
                    />
                    <motion.circle
                      cx="96"
                      cy="96"
                      r="88"
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="12"
                      strokeLinecap="round"
                      strokeDasharray={553}
                      initial={{ strokeDashoffset: 553 }}
                      animate={{ strokeDashoffset: 553 - (553 * score) / 100 }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#1B93A4" />
                        <stop offset="50%" stopColor="#3B82F6" />
                        <stop offset="100%" stopColor="#D946EF" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="text-5xl font-bold text-[#F0F4FF]"
                    >
                      {score}
                    </motion.span>
                    <span className="text-[#8892A4]">/ 100</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Roadmap */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-12"
        >
          <motion.h2 variants={fadeInUp} className="text-2xl font-bold text-[#F0F4FF] mb-6">
            Tu Roadmap 30/60/90 días
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {roadmap.map((phase, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full border-white/10 bg-[#161B22] hover:border-white/20 transition-colors">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${phase.color} flex items-center justify-center mb-4`}>
                      <phase.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-[#8892A4]" />
                      <span className="text-sm font-medium text-[#8892A4]">{phase.phase}</span>
                    </div>
                    <h3 className="text-xl font-bold text-[#F0F4FF] mb-4">{phase.title}</h3>
                    <ul className="space-y-3">
                      {phase.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-[#1B93A4] flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-[#8892A4]">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Wins */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-12"
        >
          <motion.h2 variants={fadeInUp} className="text-2xl font-bold text-[#F0F4FF] mb-6">
            Quick Wins Inmediatos
          </motion.h2>
          
          <div className="space-y-4">
            {quickWins.map((win, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-[#161B22] rounded-xl p-6 border border-white/10 flex flex-col md:flex-row md:items-center gap-4"
              >
                <div className="flex-1">
                  <h3 className="font-bold text-[#F0F4FF] mb-1">{win.title}</h3>
                  <p className="text-sm text-[#8892A4]">{win.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <span className="text-xs text-[#8892A4] block">Impacto</span>
                    <span className={`text-sm font-medium ${win.impact === 'Alto' ? 'text-green-400' : 'text-yellow-400'}`}>
                      {win.impact}
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="text-xs text-[#8892A4] block">Esfuerzo</span>
                    <span className={`text-sm font-medium ${win.effort === 'Bajo' ? 'text-green-400' : 'text-yellow-400'}`}>
                      {win.effort}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl p-8 md:p-12 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#1B93A4]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D946EF]/20 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold text-[#F0F4FF] mb-4">
              ¿Quieres implementar este roadmap?
            </h2>
            <p className="text-[#8892A4] mb-6 max-w-xl mx-auto">
              Agenda una reunión con nuestro equipo para convertir este diagnóstico en un plan de acción real.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contacto">
                <Button className="btn-gradient" data-testid="resultados-contact-btn">
                  Agendar Reunión
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/app/demo-agentes-ia">
                <Button variant="outline" className="border-white/10 text-[#F0F4FF] hover:bg-white/5">
                  Ver Demo Agentes IA
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Resultados;
