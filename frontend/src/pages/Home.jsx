import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { 
  ArrowRight, ArrowUpRight, RefreshCw, Bot, Globe, Building2, Stethoscope,
  Briefcase, Store, User, Building, CheckCircle2, Zap, Target, Rocket,
  TrendingUp, Award, Users, Clock, MessageSquare, Heart, Shield, Code,
  Calendar, Mail, Phone, MapPin, Database, Search, ClipboardList, Calculator,
  Star
} from 'lucide-react';
import { Button } from '../components/ui/button';
import Layout from '../components/layout/Layout';
import SEO from '../components/SEO';
import { ASSETS } from '../lib/assets';
import { trackAgendarDemo } from '../lib/analytics';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const AnimatedCounter = ({ end, suffix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  useEffect(() => {
    if (isInView) {
      let startTime;
      const endValue = parseInt(end.replace(/[^0-9]/g, '')) || 0;
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCount(Math.floor(progress * endValue));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration]);
  return <span ref={ref}>{end.includes('+') ? '+' : ''}{count}{suffix}</span>;
};

const SectionHeader = ({ label, title, gradient }) => (
  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-16">
    <motion.span variants={fadeInUp} className="text-[#1B93A4] font-semibold mb-4 block uppercase tracking-wider text-sm" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{label}</motion.span>
    <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-black text-[#F0F4FF] mb-4">{title} <span className="gradient-text">{gradient}</span></motion.h2>
  </motion.div>
);

/* ═══════════════════════════════════ DATA ═══════════════════════════════════ */

const HERO_STATS = [
  { value: '+15', label: 'años', desc: 'Experiencia en ventas y transformación digital' },
  { value: '2', label: 'SaaS', desc: 'Propios en producción: MANDO y TRÉBOL Finance' },
  { value: '100', label: '%', desc: 'Fee/retainer — nunca por horas' },
  { value: '4', label: 'casos', desc: 'Éxitos documentados en Barcelona' },
];

const SERVICES = [
  { icon: RefreshCw, title: 'Transformación Digital', tagline: 'Moderniza tu negocio sin perder tu esencia', description: 'Digitalizamos tus procesos con enfoque humano. Automatización inteligente, flujos optimizados y sistemas que trabajan para ti.', features: ['Auditoría de procesos, datos y herramientas', 'Mapa de prioridades y quick wins 30/60/90 días', 'Automatización de procesos repetitivos', 'Digitalización de documentación', 'Integración de sistemas existentes', 'Formación y acompañamiento continuo'], href: '/soluciones/transformacion-digital', color: 'from-[#1B93A4]/20 to-[#3B82F6]/20' },
  { icon: Bot, title: 'Agentes IA y Automatización', tagline: 'Asistentes inteligentes que trabajan 24/7', description: 'Agentes conversacionales que atienden, cualifican y convierten. Desde WhatsApp hasta tu CRM, sin intervención manual.', features: ['Agente de llamadas IA (atiende aunque estés ocupado)', 'Generador de presupuestos IA (en segundos)', 'Asistente WhatsApp IA (atiende, agenda y gestiona)', 'Atención automatizada multicanal', 'Cualificación inteligente de oportunidades', 'Seguimiento y recordatorios automatizados'], href: '/soluciones/agentes-ia', color: 'from-[#D946EF]/20 to-[#3B82F6]/20' },
  { icon: Globe, title: 'Desarrollo Web a Medida', tagline: 'Tu web, tu identidad, tu motor de ventas', description: 'Diseñamos y desarrollamos webs profesionales, landing pages y aplicaciones web que convierten visitantes en clientes.', features: ['Diseño UX/UI personalizado y memorable', 'Desarrollo React / Next.js / FastAPI', 'SEO técnico y SEO local desde el día 1', 'Integración con CRM y herramientas de negocio', 'Performance, velocidad y Core Web Vitals', 'Responsive total — perfecto en todos los dispositivos'], href: '/soluciones', color: 'from-[#3B82F6]/20 to-[#1B93A4]/20' },
  { icon: Database, title: 'ERP y CRM a Medida', tagline: 'Tu negocio tiene procesos únicos. Tu sistema también debería.', description: 'Implementamos y desarrollamos sistemas de gestión adaptados exactamente a tu sector y forma de trabajar.', features: ['Implementación Zoho CRM / Salesforce / Microsoft 365', 'Desarrollo ERP personalizado (como MANDO)', 'Pipeline de ventas y seguimiento de clientes', 'Presupuestos, facturas y control financiero', 'Paneles de control e indicadores clave (KPIs)', 'Formación y adopción del equipo'], href: '/soluciones', color: 'from-[#1B93A4]/20 to-[#3B82F6]/20' },
  { icon: Code, title: 'Programas y Sistemas a Medida', tagline: 'Software que se adapta a ti, no al revés', description: 'Desarrollamos aplicaciones, plataformas SaaS y herramientas internas que resuelven exactamente tu problema de negocio.', features: ['Aplicaciones web y móvil (React, FastAPI, MongoDB)', 'Integraciones API y conectores entre sistemas', 'Automatizaciones Zapier, Make, n8n sin código', 'Dashboards e informes inteligentes', 'Plataformas SaaS escalables desde día 1', 'Deploy Railway + Vercel — siempre en producción'], href: '/soluciones', color: 'from-[#3B82F6]/20 to-[#D946EF]/20' },
  { icon: Shield, title: 'Cumplimiento RGPD sin Dolor', tagline: 'Cumple la normativa sin parar tu negocio', description: 'RGPD, e-factura, Verifactu y protección de datos ordenada, clara y sin tecnicismos jurídicos que te abrumen.', features: ['Diagnóstico completo de cumplimiento RGPD / LOPD', 'Implementación e-factura y Verifactu', 'Documentación, contratos y políticas de privacidad', 'Banner de cookies y gestión del consentimiento', 'Formación al equipo en protección de datos', 'Seguimiento y auditoría continua'], href: '/soluciones', color: 'from-[#10b981]/20 to-[#1B93A4]/20' },
];

const TOOLS = [
  { icon: ClipboardList, title: 'Índice de Madurez Digital', badge: '3-5 minutos', description: 'Descubre en qué punto está tu negocio con 5 preguntas concretas sobre tus procesos reales. Recibirás un roadmap 30/60/90 días con quick wins para tu sector.', items: ['Tu nivel de madurez digital actual', '3 Quick Wins accionables inmediatos', 'Roadmap de 90 días personalizado', 'Plan de Leapifyes recomendado para ti'], href: '/app/diagnostico', cta: 'Medir mi nivel digital', color: '#1B93A4' },
  { icon: Calculator, title: 'Calculadora de Impacto', badge: 'Resultado en segundos', description: 'Introduce 4 parámetros de tu negocio y calcula cuánto puedes ganar automatizando. Ver los números cambia todo.', items: ['Ingresos extra mensuales posibles', 'Horas semanales recuperadas', 'ROI de la automatización en tu caso', '3 escenarios: conservador, medio, ambicioso'], href: '/app/calculadora', cta: 'Calcular mi impacto', color: '#3B82F6' },
  { icon: MessageSquare, title: 'Prueba un Agente IA en Vivo', badge: 'Tiempo real · GPT', description: 'Simula ser el cliente de "Reformas BCN". Escribe como si contactaras a un negocio. El agente IA responde en tiempo real.', items: ['Conversación natural, no robótica', 'Agenda citas y captura datos automáticamente', 'Ve las "acciones" que el agente detecta', 'Imagina cómo funcionaría en TU negocio'], href: '/app/demo-agentes-ia', cta: 'Probar demo en vivo', color: '#D946EF' },
];

const SECTORS = [
  { icon: Building2, name: 'Reformas y Construcción', desc: 'MANDO nació aquí. ERP propio disponible.', slug: 'reformas' },
  { icon: Stethoscope, name: 'Clínicas y Salud', desc: 'Gestión de citas, recordatorios y cumplimiento.', slug: 'clinicas' },
  { icon: Briefcase, name: 'Gestorías y Asesorías', desc: 'RGPD, digitalización total y automatización.', slug: 'gestorias' },
  { icon: Store, name: 'Comercios y Retail', desc: 'Omnicanal, fidelización y más ticket medio.', slug: 'comercios' },
  { icon: User, name: 'Autónomos y Freelancers', desc: 'Estructura para crecer sin caos.', slug: 'autonomos' },
  { icon: Building, name: 'PYMEs en Crecimiento', desc: 'Escalabilidad con procesos claros.', slug: 'pymes' },
];

const CASES = [
  { result: '−22%', metric: 'absentismo reducido', company: 'Clínica dental, Badalona', description: 'Implantamos sistema de recordatorios automatizados y gestión de agenda digital. El equipo trabaja con más orden y menos llamadas perdidas.', sector: 'Salud' },
  { result: '+3', metric: 'obras/mes', company: 'Empresa de reformas, L\'Hospitalet', description: 'MANDO les permitió presupuestar más rápido, hacer seguimiento real de cada obra y cobrar sin retrasos. El caos se convirtió en control.', sector: 'Reformas' },
  { result: '0', metric: 'sanciones', company: 'Gestoría, Gràcia (Barcelona)', description: 'Cumplimiento RGPD completo, documentación en orden, procesos auditados. Cero sobresaltos normativos desde la implementación.', sector: 'Gestoría' },
  { result: '+28%', metric: 'ticket medio', company: 'Tienda de barrio, Eixample', description: 'CRM ligero + automatización de seguimiento a clientes existentes. Más ventas cruzadas, más retención, más margen por operación.', sector: 'Comercio' },
];

const METHOD_STEPS = [
  { phase: '01', title: 'Escucha y diagnóstico', description: 'Análisis profundo de tu negocio: procesos, datos, herramientas y oportunidades reales. Entregable: informe claro + checklist accionable.', icon: Search },
  { phase: '02', title: 'Plan de 90 días', description: 'Priorizamos lo que más impacto tiene en ventas, tiempo y cumplimiento. Quick wins desde la primera semana para que veas resultados inmediatos.', icon: Calendar },
  { phase: '03', title: 'Implantación guiada', description: 'Implementamos contigo, no para ti. Paso a paso, con soporte real y ajustes en tiempo real. Sin sorpresas ni tecnicismos.', icon: Zap },
  { phase: '04', title: 'Formación y adopción', description: 'Tu equipo entiende y usa las herramientas desde el día 1. Sin fricción, sin resistencia al cambio, con resultados desde la primera semana de uso.', icon: Users },
  { phase: '05', title: 'KPIs y mejora continua', description: 'Medimos, ajustamos y seguimos creciendo juntos. Reportes claros cada mes. Nunca te dejamos solo después de la implementación.', icon: TrendingUp },
];

const VALUES = [
  { icon: Users, title: 'Acompañamos, no imponemos', desc: 'Plan claro, sesiones 1:1 y adopción guiada.' },
  { icon: Rocket, title: 'Das un salto, no un paso', desc: 'Quick wins desde la primera semana.' },
  { icon: Heart, title: 'Lo humano primero', desc: 'Herramientas al servicio de tu equipo, no al revés.' },
  { icon: MessageSquare, title: 'Hablamos claro', desc: 'Sin jerga técnica. Con ejemplos reales de tu sector.' },
  { icon: Heart, title: 'Digital con corazón', desc: 'Cercanía, ética y resultados medibles.' },
  { icon: Zap, title: 'Transformación es necesidad', desc: 'La competitividad digital no espera.' },
];

const PLANS = [
  { name: 'START', tagline: 'El primer paso', price: '497', features: ['Diagnóstico digital completo de tu negocio', 'CRM básico configurado y en funcionamiento', '1 automatización implementada', 'Seguimiento mensual dedicado', 'Acceso portal de clientes Leapifyes'], cta: 'Empezar', highlighted: false },
  { name: 'ESSENTIAL', tagline: 'Las bases sólidas', price: '750', features: ['Todo lo incluido en Start', 'CRM avanzado + pipeline de ventas', '3 automatizaciones activas', 'Formación del equipo (hasta 5 personas)', 'Revisión estratégica bimestral'], cta: 'Explorar', highlighted: false },
  { name: 'PRO', tagline: 'Crecer con procesos', price: '950', features: ['Todo lo incluido en Essential', 'Agente IA incluido (llamadas o WhatsApp)', 'Automatizaciones múltiples sin límite', 'Embudo comercial completo', 'Revisión estratégica mensual', 'Desarrollo web o landing incluido'], cta: 'Explorar', highlighted: true },
  { name: 'PREMIUM 360', tagline: 'Transformación completa', price: '2.000', features: ['Estrategia de transformación integral', 'Todos los servicios activos simultáneamente', 'Gestión del cambio y adopción', 'Desarrollo de sistemas a medida', 'Soporte prioritario (respuesta < 4h)', 'Roadmap trimestral personalizado'], cta: 'Agendar diagnóstico', highlighted: false },
];

/* ═══════════════════════════════════ COMPONENT ═══════════════════════════════════ */

const Home = () => {
  return (
    <Layout>
      <SEO 
        title="Leapifyes | Transformación Digital, IA y Sistemas a Medida en Barcelona"
        description="Consultora de transformación digital en Barcelona. CRM, automatización IA, desarrollo web y sistemas a medida para pymes y autónomos. Diagnóstico gratuito."
      />

      {/* ══════════ SECCIÓN 1: HERO CINEMATIC ══════════ */}
      <section className="relative overflow-hidden" data-testid="hero-section">
        <div className="absolute inset-0">
          <div className="mesh-gradient opacity-60" />
          <div className="grid-pattern absolute inset-0 opacity-20" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />
        </div>
        
        <div className="container-main relative z-10 pt-8 pb-12 md:pt-10 md:pb-16">
          <div className="grid lg:grid-cols-[55%_45%] gap-12 lg:gap-8 items-center">
            {/* Left — Text */}
            <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
              <motion.div variants={fadeInUp} className="mb-6">
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold glass-card text-[#1B93A4] border border-[#1B93A4]/20">
                  <span className="w-2 h-2 bg-[#1B93A4] rounded-full animate-pulse" />
                  CON LEAPIFYES NO DAS UN PASO, DAS UN SALTO
                </span>
              </motion.div>

              <motion.h1 variants={fadeInUp} className="font-black text-[#F0F4FF] mb-5 leading-[1.05] tracking-tight" style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}>
                Transformamos negocios.<br />
                <span className="gradient-text">Construimos el futuro.</span>
              </motion.h1>

              <motion.p variants={fadeInUp} className="text-lg md:text-xl text-[#8892A4] mb-6 max-w-xl">
                Digitalizamos pymes y autónomos en España — con estrategia, IA y sistemas a medida.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-wrap gap-3 mb-8">
                <span className="px-4 py-2 rounded-full bg-[#1B93A4]/10 border border-[#1B93A4]/20 text-sm text-[#8892A4] flex items-center gap-2"><MapPin className="w-4 h-4 text-[#1B93A4]" />Barcelona, España</span>
                <span className="px-4 py-2 rounded-full bg-[#D946EF]/10 border border-[#D946EF]/20 text-sm text-[#8892A4] flex items-center gap-2"><Bot className="w-4 h-4 text-[#D946EF]" />Agentes IA</span>
                <span className="px-4 py-2 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 text-sm text-[#8892A4] flex items-center gap-2"><Zap className="w-4 h-4 text-[#3B82F6]" />Sistemas a medida</span>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 mb-12">
                <a href="https://crm.zoho.eu/bookings/Calendariodelaweb" target="_blank" rel="noopener noreferrer" onClick={trackAgendarDemo}>
                  <Button className="btn-gradient text-base px-8 py-6 font-semibold w-full sm:w-auto" data-testid="hero-cta-primary">
                    Agendar diagnóstico gratuito <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </a>
                <Link to="/soluciones">
                  <Button className="btn-secondary text-base px-8 py-6 font-semibold w-full sm:w-auto" data-testid="hero-cta-secondary">
                    Ver nuestros servicios
                  </Button>
                </Link>
              </motion.div>

              <motion.div variants={fadeInUp} className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {HERO_STATS.map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">
                      <AnimatedCounter end={stat.value} suffix={stat.label === '%' ? '%' : ''} />
                      {stat.label !== '%' && <span className="text-xl ml-1">{stat.label}</span>}
                    </div>
                    <p className="text-xs text-[#8892A4]">{stat.desc}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right — Dashboard Preview */}
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="hidden lg:flex flex-col gap-4">
              {[
                { icon: RefreshCw, title: 'Transformación Digital', desc: 'Procesos, CRM, automatización inteligente.', color: '#1B93A4', delay: 0 },
                { icon: Bot, title: 'Agentes IA 24/7', desc: 'Atiende, cualifica y vende sin intervención.', color: '#D946EF', delay: 0.2 },
                { icon: Code, title: 'Sistemas a Medida', desc: 'Web, ERP, apps propias y SaaS escalable.', color: '#3B82F6', delay: 0.4 },
              ].map((card, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + card.delay, duration: 0.5 }} className="p-5 rounded-xl bg-[#161D30] border-l-[3px]" style={{ borderColor: card.color }}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${card.color}18` }}>
                      <card.icon className="w-5 h-5" style={{ color: card.color }} />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#F0F4FF] text-base mb-1">{card.title}</h3>
                      <p className="text-sm text-[#8892A4]">{card.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════ SECCIÓN 2: POSICIONAMIENTO EDITORIAL ══════════ */}
      <section className="section-padding relative" data-testid="editorial-section">
        <div className="container-main">
          <div className="max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="font-black text-[#F0F4FF] leading-[1.1] mb-8" style={{ fontSize: 'clamp(1.5rem, 5vw, 3rem)' }}>
                Leapifyes nació para resolver <span className="gradient-text">un problema real.</span>
              </h2>
              <p className="text-lg text-[#8892A4] leading-relaxed mb-6">
                Miles de pymes, autónomos y emprendedores que se sienten fuera de lugar en lo digital. El papeleo, la burocracia y el miedo a la tecnología les quitan tiempo, clientes y tranquilidad.
              </p>
              <p className="text-lg text-[#8892A4] leading-relaxed">
                No somos consultores que hablan difícil. <span className="text-[#F0F4FF] font-medium">Somos tu socio digital.</span> Con Leapifyes, lo digital deja de ser un problema y se convierte en tu ventaja.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════ SECCIÓN 3: CATÁLOGO DE SERVICIOS ══════════ */}
      <section className="section-padding relative border-t border-white/5" data-testid="services-section">
        <div className="container-main">
          <SectionHeader label="Qué hacemos para ti" title="No vendemos software." gradient="Transformamos negocios." />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service, index) => (
              <motion.div key={service.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="glass-card-hover p-8 group">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <service.icon className="w-7 h-7 text-[#1B93A4]" />
                </div>
                <h3 className="text-xl font-bold text-[#F0F4FF] mb-2">{service.title}</h3>
                <p className="text-[#1B93A4] font-medium text-sm mb-3">{service.tagline}</p>
                <p className="text-[#8892A4] text-sm mb-4">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#8892A4]">
                      <CheckCircle2 className="w-4 h-4 text-[#1B93A4] mt-0.5 flex-shrink-0" />{f}
                    </li>
                  ))}
                </ul>
                <Link to={service.href} className="inline-flex items-center text-[#1B93A4] font-medium text-sm group-hover:text-[#F0F4FF] transition-colors">
                  Conocer más <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ SECCIÓN 4: HERRAMIENTAS INTERACTIVAS ══════════ */}
      <section className="section-padding relative" data-testid="tools-section">
        <div className="container-main">
          <SectionHeader label="Descubre dónde está tu negocio" title="Herramientas gratuitas." gradient="Sin registro. Resultados inmediatos." />
          <div className="grid md:grid-cols-3 gap-6">
            {TOOLS.map((tool, index) => (
              <motion.div key={tool.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.12 }} className="glass-card p-8 group hover:border-white/20 transition-all flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: `${tool.color}18` }}>
                    <tool.icon className="w-7 h-7" style={{ color: tool.color }} />
                  </div>
                  <span className="px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: `${tool.color}15`, color: tool.color, fontFamily: 'Space Grotesk, sans-serif' }}>
                    {tool.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#F0F4FF] mb-3">{tool.title}</h3>
                <p className="text-sm text-[#8892A4] mb-4">{tool.description}</p>
                <p className="text-xs text-[#8892A4] uppercase tracking-wider mb-2 font-semibold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Lo que obtienes:</p>
                <ul className="space-y-2 mb-6 flex-1">
                  {tool.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#8892A4]">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: tool.color }} />{item}
                    </li>
                  ))}
                </ul>
                <Link to={tool.href}>
                  <Button className="w-full font-semibold" style={{ background: tool.color, color: '#fff' }} data-testid={`tool-cta-${index}`}>
                    {tool.cta} <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ SECCIÓN 5: PRODUCTOS PROPIOS ══════════ */}
      <section className="section-padding relative border-t border-white/5" data-testid="products-section">
        <div className="container-main">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-8">
            <motion.span variants={fadeInUp} className="text-[#1B93A4] font-semibold mb-4 block uppercase tracking-wider text-sm" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Lo que construimos</motion.span>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-black text-[#F0F4FF] mb-4">No solo aconsejamos. <span className="gradient-text">Desarrollamos SaaS propios.</span></motion.h2>
            <motion.p variants={fadeInUp} className="text-[#8892A4] max-w-2xl mx-auto">Creamos las herramientas que nosotros mismos necesitaríamos. Eso nos hace diferentes.</motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* MANDO */}
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative p-8 md:p-10 rounded-2xl overflow-hidden group" style={{ background: 'linear-gradient(135deg, #040d1a, #071428)', border: '1px solid rgba(27,147,164,0.4)', boxShadow: '0 0 40px rgba(27,147,164,0.12)' }} data-testid="product-mando">
              <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-bold bg-[#1B93A4] text-white flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> LIVE EN PRODUCCIÓN
              </div>
              <img src={ASSETS.logoMando} alt="MANDO by Leapifyes" className="w-[110px] h-[110px] rounded-full object-cover mb-6" loading="lazy" />
              <h3 className="text-2xl md:text-3xl font-black text-[#F0F4FF] mb-2">MANDO by Leapifyes</h3>
              <p className="text-[#1B93A4] font-semibold mb-4">ERP completo para reformas, construcción y mantenimiento</p>
              <p className="text-[#8892A4] mb-6">El trabajo ya es duro. La gestión no debería serlo. MANDO centraliza presupuestos, obras, facturas, incidencias y equipo en un solo panel. Ahorro medio demostrado: 3–4 horas diarias por usuario.</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {['React 19', 'FastAPI', 'MongoDB', 'Railway', 'Vercel'].map(t => (
                  <span key={t} className="px-3 py-1 rounded-full bg-white/5 text-xs text-[#8892A4]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{t}</span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {['Presupuestos', 'Obras', 'Facturas', 'Calendario', 'Gastos', 'Incidencias', 'Clientes', 'Calculadora ROI', 'Panel Admin'].map(f => (
                  <span key={f} className="px-3 py-1 rounded-full border border-[#1B93A4]/20 text-xs text-[#F0F4FF]">{f}</span>
                ))}
              </div>
              <a href="https://mando.leapifyes.com" target="_blank" rel="noopener noreferrer">
                <Button className="border-[#1B93A4] text-[#1B93A4] hover:bg-[#1B93A4] hover:text-white transition-colors" variant="outline">
                  Ir a MANDO <ArrowUpRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </motion.div>

            {/* TRÉBOL */}
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="relative p-8 md:p-10 rounded-2xl overflow-hidden group" style={{ background: 'linear-gradient(135deg, #030f08, #051a0c)', border: '1px solid rgba(16,185,129,0.4)', boxShadow: '0 0 40px rgba(16,185,129,0.10)' }} data-testid="product-trebol">
              <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-bold bg-[#10b981] text-white flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> BETA ACTIVA
              </div>
              <img src={ASSETS.logoTrebol} alt="TRÉBOL Finance" className="w-[110px] h-[110px] rounded-xl object-cover mb-6" loading="lazy" />
              <h3 className="text-2xl md:text-3xl font-black text-[#F0F4FF] mb-2">TRÉBOL Finance</h3>
              <p className="text-[#10b981] font-semibold mb-4">Tu dinero, inteligente. Fintech personal con IA.</p>
              <p className="text-[#8892A4] mb-6">Gestión financiera personal en 18 monedas con análisis IA, predicciones de gasto, alertas inteligentes y resumen semanal automático. Disponible como PWA en iOS y Android.</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {['React', 'FastAPI', 'MongoDB', 'Brevo', 'Vercel'].map(t => (
                  <span key={t} className="px-3 py-1 rounded-full bg-white/5 text-xs text-[#8892A4]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{t}</span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {['18 monedas', 'Análisis IA', 'Metas ahorro', 'Inversiones', 'Open Banking', 'Presupuestos', 'Informes', 'PWA iOS/Android'].map(f => (
                  <span key={f} className="px-3 py-1 rounded-full border border-[#10b981]/20 text-xs text-[#F0F4FF]">{f}</span>
                ))}
              </div>
              <a href="https://trebolfinance.leapifyes.com/login" target="_blank" rel="noopener noreferrer">
                <Button className="border-[#10b981] text-[#10b981] hover:bg-[#10b981] hover:text-white transition-colors" variant="outline">
                  Explorar TRÉBOL <ArrowUpRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════ SECCIÓN 6: SECTORES ══════════ */}
      <section className="section-padding relative" data-testid="sectors-section">
        <div className="container-main">
          <SectionHeader label="Sectores donde operamos" title="Conocemos tu sector." gradient="Hablamos tu idioma." />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {SECTORS.map((sector, index) => (
              <motion.div key={sector.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}>
                <Link to={`/sectores/${sector.slug}`} className="block p-5 glass-card hover:bg-white/5 transition-all group text-center h-full">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-[#1B93A4]/20 to-[#3B82F6]/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <sector.icon className="w-6 h-6 text-[#1B93A4]" />
                  </div>
                  <span className="text-[#F0F4FF] font-semibold text-sm group-hover:text-[#1B93A4] transition-colors block mb-1">{sector.name}</span>
                  <span className="text-xs text-[#8892A4]">{sector.desc}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ SECCIÓN 7: CASOS DE ÉXITO ══════════ */}
      <section className="section-padding relative border-t border-white/5" data-testid="cases-section">
        <div className="container-main">
          <SectionHeader label="Resultados reales, negocios reales" title="No prometemos." gradient="Demostramos." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CASES.map((c, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="glass-card-hover p-6">
                <div className="text-5xl font-black gradient-text mb-2">{c.result}</div>
                <p className="text-[#F0F4FF] font-bold mb-4">{c.metric}</p>
                <p className="text-sm text-[#1B93A4] font-medium mb-3">{c.company}</p>
                <p className="text-sm text-[#8892A4] mb-3">{c.description}</p>
                <span className="inline-block px-2 py-1 rounded text-xs bg-white/5 text-[#8892A4]">{c.sector}</span>
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mt-12">
            <Link to="/casos"><Button className="btn-secondary">Ver todos los casos <ArrowRight className="w-4 h-4 ml-2" /></Button></Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════ SECCIÓN 8: MÉTODO LEAPIFYES ══════════ */}
      <section className="section-padding relative" data-testid="method-section">
        <div className="container-main">
          <SectionHeader label="El método Leapifyes" title="Hacemos fácil lo importante." gradient="Tecnología que entiendes, resultados que ves." />
          <div className="grid md:grid-cols-5 gap-4">
            {METHOD_STEPS.map((step, index) => (
              <motion.div key={step.phase} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="glass-card p-6 relative group hover:border-[#1B93A4]/30 transition-colors">
                <span className="text-5xl font-black text-white/5 absolute top-2 right-4 group-hover:text-[#1B93A4]/10 transition-colors">{step.phase}</span>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1B93A4]/20 to-[#3B82F6]/20 flex items-center justify-center mb-4">
                  <step.icon className="w-5 h-5 text-[#1B93A4]" />
                </div>
                <h3 className="text-lg font-bold text-[#F0F4FF] mb-2">{step.title}</h3>
                <p className="text-sm text-[#8892A4]">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ SECCIÓN 9: EL EQUIPO ══════════ */}
      <section className="section-padding relative border-t border-white/5" data-testid="founder-section">
        <div className="container-main">
          <SectionHeader label="El equipo detrás de Leapifyes" title="Personas reales." gradient="Compromiso real." />
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-lg text-[#8892A4]">En Leapifyes combinamos experiencia en ventas, CRM y transformación digital con tecnología de primer nivel. Somos un equipo que acompaña a pymes y autónomos desde el diagnóstico hasta los resultados medibles.</p>
          </div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="glass-card overflow-hidden max-w-4xl mx-auto flex flex-col md:flex-row">
            {/* Foto rectangular */}
            <div className="flex-shrink-0 w-full md:w-64 lg:w-72">
              <img
                src={ASSETS.fotoRicardo}
                alt="Ricardo Serrano, Fundador y CEO de Leapifyes, Barcelona"
                className="w-full h-64 md:h-full object-cover object-center"
                style={{ minHeight: 320 }}
                loading="lazy"
              />
            </div>
            {/* Texto */}
            <div className="p-8 flex flex-col justify-center gap-4">
              <div>
                <h3 className="text-2xl font-black text-[#F0F4FF] mb-1">Ricardo Serrano</h3>
                <p className="text-[#1B93A4] font-semibold text-sm mb-3">Fundador & CEO, Leapifyes · Barcelona</p>
                <p className="text-[#8892A4] text-sm leading-relaxed">
                  Detrás de Leapifyes hay más de una década de trabajo directo con negocios reales. La obsesión: unir lo digital con lo humano y hacer la tecnología accesible, útil y rentable para cada pequeño empresario en España.
                </p>
              </div>
              <a href="https://www.linkedin.com/in/ricardoserrano" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-[#8892A4] hover:text-[#F0F4FF] transition-colors text-sm w-fit">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════ SECCIÓN 10: VALORES ══════════ */}
      <section className="section-padding relative" data-testid="values-section">
        <div className="container-main">
          <SectionHeader label="Lo que nos define" title="" gradient="" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {VALUES.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="glass-card p-5 text-center">
                <div className="w-10 h-10 mx-auto rounded-lg bg-gradient-to-br from-[#1B93A4]/20 to-[#3B82F6]/20 flex items-center justify-center mb-3">
                  <v.icon className="w-5 h-5 text-[#1B93A4]" />
                </div>
                <h4 className="text-[#F0F4FF] font-semibold text-sm mb-1">{v.title}</h4>
                <p className="text-xs text-[#8892A4]">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ SECCIÓN 11: PLANES / INVERSIÓN ══════════ */}
      <section className="section-padding relative border-t border-white/5" data-testid="plans-section">
        <div className="container-main">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-4">
            <motion.span variants={fadeInUp} className="text-[#1B93A4] font-semibold mb-4 block uppercase tracking-wider text-sm" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Modelos de colaboración</motion.span>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-black text-[#F0F4FF] mb-4">Siempre fee mensual o por hitos. <span className="gradient-text">Nunca por horas.</span></motion.h2>
            <motion.p variants={fadeInUp} className="text-[#8892A4]">Sin permanencia.</motion.p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {PLANS.map((plan, index) => (
              <motion.div key={plan.name} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className={`glass-card p-6 relative flex flex-col ${plan.highlighted ? 'border-[#1B93A4] ring-1 ring-[#1B93A4]' : ''}`}>
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#1B93A4] text-white text-xs font-bold rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3" /> Más popular
                  </div>
                )}
                <h3 className="text-xl font-black text-[#F0F4FF] mb-1">{plan.name}</h3>
                <p className="text-sm text-[#8892A4] mb-4">{plan.tagline}</p>
                <div className="mb-6">
                  <span className="text-sm text-[#8892A4]">Desde</span>
                  <div className="text-4xl font-black gradient-text">{plan.price}€</div>
                  <span className="text-sm text-[#8892A4]">/mes</span>
                </div>
                <ul className="space-y-2 mb-6 flex-1">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#8892A4]">
                      <CheckCircle2 className="w-4 h-4 text-[#1B93A4] mt-0.5 flex-shrink-0" />{f}
                    </li>
                  ))}
                </ul>
                <a href={plan.name === 'PREMIUM 360' ? 'https://crm.zoho.eu/bookings/Calendariodelaweb' : '/contacto'} target={plan.name === 'PREMIUM 360' ? '_blank' : undefined} rel="noopener noreferrer">
                  <Button className={`w-full ${plan.highlighted ? 'btn-gradient' : 'btn-secondary'}`}>{plan.cta} <ArrowRight className="w-4 h-4 ml-2" /></Button>
                </a>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-sm text-[#8892A4]">Todos los planes incluyen setup inicial. Sin permanencia mínima. Sin letras pequeñas. Si no ves resultados, lo hablamos.</p>
        </div>
      </section>

      {/* ══════════ SECCIÓN 12: CTA FINAL ══════════ */}
      <section className="section-padding relative overflow-hidden" data-testid="cta-section">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1B93A4]/20 via-[#3B82F6]/10 to-[#D946EF]/20" style={{ animation: 'pulse 4s ease-in-out infinite' }} />
        <div className="mesh-gradient opacity-30" />
        
        <div className="container-main relative z-10">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black text-[#F0F4FF] mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
              ¿Listo para dar el <span className="gradient-text">salto</span>?
            </h2>
            <p className="text-xl text-[#F0F4FF] mb-2">Tu negocio merece el salto. Nosotros te acompañamos.</p>
            <p className="text-lg text-[#8892A4] mb-10 max-w-2xl mx-auto">
              Agenda una llamada estratégica gratuita de 30 minutos. Sin compromisos. Solo claridad sobre dónde está tu negocio y qué necesita para crecer.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a href="https://crm.zoho.eu/bookings/Calendariodelaweb" target="_blank" rel="noopener noreferrer" onClick={trackAgendarDemo}>
                <Button className="btn-gradient text-lg px-10 py-7 font-semibold w-full sm:w-auto" data-testid="cta-final">
                  <Calendar className="w-5 h-5 mr-2" /> Agendar diagnóstico gratuito
                </Button>
              </a>
              <a href="mailto:info@leapifyes.com">
                <Button className="btn-secondary text-lg px-10 py-7 font-semibold w-full sm:w-auto">
                  <Mail className="w-5 h-5 mr-2" /> Contactar con el equipo
                </Button>
              </a>
            </div>

            <div className="flex flex-wrap justify-center gap-8 text-[#8892A4]">
              <a href="mailto:info@leapifyes.com" className="flex items-center gap-2 hover:text-[#1B93A4] transition-colors"><Mail className="w-5 h-5" />info@leapifyes.com</a>
              <a href="tel:+34694214849" className="flex items-center gap-2 hover:text-[#1B93A4] transition-colors"><Phone className="w-5 h-5" />+34 694 214 849</a>
              <span className="flex items-center gap-2"><MapPin className="w-5 h-5" />Barcelona, España</span>
              <a href="https://wa.me/34694214849" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#10b981] transition-colors">
                <MessageSquare className="w-5 h-5" />WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
