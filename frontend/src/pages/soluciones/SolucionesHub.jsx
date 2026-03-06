import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, RefreshCw, Bot, Globe, Database, Code, Shield,
  CheckCircle2, Calendar
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import Layout from '../../components/layout/Layout';
import SEO from '../../components/SEO';
import { SOLUTIONS } from '../../lib/constants';

const fadeInUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } } };
const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };

const ICON_MAP = { RefreshCw, Bot, Globe, Database, Code, Shield };

const SolucionesHub = () => {
  return (
    <Layout>
      <SEO
        title="Soluciones | Leapifyes — Transformación Digital, IA y Sistemas a Medida"
        description="Descubre nuestros 6 servicios especializados: transformación digital, agentes IA, desarrollo web, ERP/CRM, sistemas a medida y cumplimiento RGPD."
      />

      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden" data-testid="soluciones-hero">
        <div className="absolute inset-0">
          <div className="mesh-gradient opacity-40" />
          <div className="grid-pattern absolute inset-0 opacity-20" />
        </div>
        <div className="container-main relative z-10">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-3xl">
            <motion.span variants={fadeInUp} className="text-[#1B93A4] font-semibold mb-4 block uppercase tracking-wider text-sm" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Nuestras Soluciones</motion.span>
            <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-6xl font-black text-[#F0F4FF] mb-6 leading-tight">
              No vendemos software. <span className="gradient-text">Transformamos negocios.</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-[#8892A4] leading-relaxed max-w-2xl">
              6 servicios especializados que cubren todo lo que tu negocio necesita para dar el salto digital. Desde la estrategia hasta la implementación.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Solutions Grid - 6 services */}
      <section className="section-padding border-t border-white/5" data-testid="soluciones-grid">
        <div className="container-main">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SOLUTIONS.map((solution, index) => {
              const Icon = ICON_MAP[solution.icon] || RefreshCw;
              return (
                <motion.div
                  key={solution.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="glass-card-hover p-8 group flex flex-col"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${solution.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7" style={{ color: solution.accentColor }} />
                  </div>
                  <h3 className="text-xl font-bold text-[#F0F4FF] mb-2">{solution.title}</h3>
                  <p className="font-medium text-sm mb-3" style={{ color: solution.accentColor }}>{solution.tagline}</p>
                  <p className="text-[#8892A4] text-sm mb-4">{solution.description}</p>
                  <ul className="space-y-2 mb-6 flex-1">
                    {solution.features.slice(0, 4).map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[#8892A4]">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: solution.accentColor }} />{f}
                      </li>
                    ))}
                  </ul>
                  <Link to={`/soluciones/${solution.id}`} className="inline-flex items-center font-medium text-sm group-hover:text-[#F0F4FF] transition-colors" style={{ color: solution.accentColor }}>
                    Conocer más <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison: TD vs IA */}
      <section className="section-padding border-t border-white/5" data-testid="soluciones-comparison">
        <div className="container-main">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-16">
            <motion.span variants={fadeInUp} className="text-[#1B93A4] font-semibold mb-4 block uppercase tracking-wider text-sm" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>¿Por dónde empezar?</motion.span>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-black text-[#F0F4FF] mb-4">¿Cuál es <span className="gradient-text">para ti</span>?</motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-[#8892A4] max-w-2xl mx-auto">No hay una respuesta única. Depende de tu situación actual y objetivos.</motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-card p-8">
              <div className="w-12 h-12 rounded-xl bg-[#1B93A4]/20 flex items-center justify-center mb-6"><RefreshCw className="w-6 h-6 text-[#1B93A4]" /></div>
              <h3 className="text-2xl font-bold text-[#F0F4FF] mb-4">Transformación Digital</h3>
              <p className="text-[#8892A4] mb-6">Ideal si...</p>
              <ul className="space-y-3">
                {['Tienes procesos manuales que consumen tiempo', 'Tu información está dispersa en varios sistemas', 'Quieres digitalizar pero no sabes por dónde empezar', 'Necesitas una base sólida antes de automatizar'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-[#1B93A4] mt-0.5" /><span className="text-[#8892A4]">{item}</span></li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-card p-8">
              <div className="w-12 h-12 rounded-xl bg-[#D946EF]/20 flex items-center justify-center mb-6"><Bot className="w-6 h-6 text-[#D946EF]" /></div>
              <h3 className="text-2xl font-bold text-[#F0F4FF] mb-4">Agentes de IA</h3>
              <p className="text-[#8892A4] mb-6">Ideal si...</p>
              <ul className="space-y-3">
                {['Pierdes oportunidades por no responder a tiempo', 'Tu equipo dedica mucho tiempo a tareas repetitivas', 'Quieres atención 24/7 sin aumentar plantilla', 'Ya tienes procesos digitalizados y quieres escalar'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-[#D946EF] mt-0.5" /><span className="text-[#8892A4]">{item}</span></li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-12 text-center">
            <p className="text-[#8892A4] mb-6">¿No estás seguro? Haz nuestro diagnóstico gratuito.</p>
            <Link to="/app/diagnostico">
              <Button className="btn-secondary" data-testid="soluciones-diagnostico-btn">Diagnóstico Rápido <ArrowRight className="w-4 h-4 ml-2" /></Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding relative overflow-hidden" data-testid="soluciones-cta">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1B93A4]/10 via-transparent to-[#D946EF]/10" />
        <div className="container-main relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card p-12 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-black text-[#F0F4FF] mb-4">Hablemos de tu proyecto</h2>
            <p className="text-lg text-[#8892A4] mb-8 max-w-2xl mx-auto">Sin compromiso, sin tecnicismos. Una conversación para entender tus necesidades.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="https://crm.zoho.eu/bookings/Calendariodelaweb" target="_blank" rel="noopener noreferrer">
                <Button className="btn-gradient text-base px-8 py-6" data-testid="soluciones-cta-btn">
                  <Calendar className="w-5 h-5 mr-2" /> Agendar diagnóstico gratuito <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
              <Link to="/contacto">
                <Button className="btn-secondary text-base px-8 py-6">Contactar con el equipo</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default SolucionesHub;
