import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Search, Calendar, Zap, Users, TrendingUp, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import Layout from '../components/layout/Layout';
import SEO from '../components/SEO';
import { METHOD_STEPS } from '../lib/constants';

const fadeInUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } } };
const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };

const PHASE_ICONS = [Search, Calendar, Zap, Users, TrendingUp];

const principles = [
  { title: 'Sin plantillas genéricas', description: 'Cada negocio es único. Diseñamos soluciones a medida, no adaptamos lo que tenemos.' },
  { title: 'Implementación gradual', description: 'Avanzamos por fases para minimizar riesgos y maximizar la adopción de tu equipo.' },
  { title: 'Medición continua', description: 'Definimos KPIs desde el día 1. Si no se puede medir, no se puede mejorar.' },
  { title: 'Transparencia total', description: 'Sabrás exactamente qué hacemos, por qué y qué resultados esperar.' },
];

const Metodo = () => {
  return (
    <Layout>
      <SEO
        title="Método Leapifyes | Cómo Trabajamos — 5 Fases"
        description="Nuestro método en 5 fases: diagnóstico, plan de 90 días, implantación guiada, formación y mejora continua. Resultados desde la primera semana."
      />

      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden" data-testid="metodo-hero">
        <div className="absolute inset-0">
          <div className="mesh-gradient opacity-40" />
          <div className="grid-pattern absolute inset-0 opacity-20" />
        </div>
        <div className="container-main relative z-10">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-3xl">
            <motion.span variants={fadeInUp} className="text-[#1B93A4] font-semibold mb-4 block uppercase tracking-wider text-sm" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>El método Leapifyes</motion.span>
            <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-6xl font-black text-[#F0F4FF] mb-6 leading-tight">
              Hacemos fácil lo importante. <span className="gradient-text">Tecnología que entiendes, resultados que ves.</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-[#8892A4] leading-relaxed">
              Un proceso probado con más de 50 empresas. Sin improvisaciones, sin sorpresas. Metodología clara desde el primer día hasta el último.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 5 Phases */}
      <section className="section-padding border-t border-white/5" data-testid="metodo-steps">
        <div className="container-main">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-16">
            <motion.span variants={fadeInUp} className="text-[#1B93A4] font-semibold mb-4 block uppercase tracking-wider text-sm" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Paso a paso</motion.span>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-black text-[#F0F4FF] mb-4">Las <span className="gradient-text">5 fases</span></motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-[#8892A4] max-w-2xl mx-auto">Desde el análisis inicial hasta el acompañamiento continuo.</motion.p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-4">
            {METHOD_STEPS.map((step, index) => {
              const Icon = PHASE_ICONS[index];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-6 relative group hover:border-[#1B93A4]/30 transition-colors"
                >
                  <span className="text-5xl font-black text-white/5 absolute top-2 right-4 group-hover:text-[#1B93A4]/10 transition-colors">
                    {String(step.phase).padStart(2, '0')}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1B93A4]/20 to-[#3B82F6]/20 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[#1B93A4]" />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-[#1B93A4] font-medium">{step.duration}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#F0F4FF] mb-2">{step.title}</h3>
                  <p className="text-sm text-[#8892A4] mb-4">{step.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {step.deliverables.map((d, i) => (
                      <span key={i} className="px-3 py-1 bg-white/5 rounded-full text-xs text-[#8892A4]">{d}</span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="section-padding border-t border-white/5" data-testid="metodo-principles">
        <div className="container-main">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="max-w-3xl mb-16">
            <motion.span variants={fadeInUp} className="text-[#1B93A4] font-semibold mb-4 block uppercase tracking-wider text-sm" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Lo que nos guía</motion.span>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-black text-[#F0F4FF]">Principios que nos <span className="gradient-text">definen</span></motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {principles.map((p, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="glass-card p-8">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-[#1B93A4] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-[#F0F4FF] mb-2">{p.title}</h3>
                    <p className="text-[#8892A4]">{p.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding border-t border-white/5" data-testid="metodo-timeline">
        <div className="container-main">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-16">
            <motion.h2 variants={fadeInUp} className="text-4xl font-black text-[#F0F4FF] mb-4">¿Cuánto tiempo <span className="gradient-text">lleva</span>?</motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-[#8892A4] max-w-2xl mx-auto">Depende del alcance, pero aquí tienes una referencia típica.</motion.p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-white/10 transform md:-translate-x-1/2" />
              {[
                { week: 'Semana 1', title: 'Kick-off y diagnóstico' },
                { week: 'Semana 2', title: 'Plan de 90 días y priorización' },
                { week: 'Semana 3-6', title: 'Implantación y configuración' },
                { week: 'Semana 7-8', title: 'Formación del equipo y adopción' },
                { week: 'Semana 9+', title: 'KPIs, ajustes y mejora continua' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex items-center gap-4 mb-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'}`}>
                    <span className="text-[#1B93A4] font-medium text-sm">{item.week}</span>
                    <h3 className="text-xl font-semibold text-[#F0F4FF]">{item.title}</h3>
                  </div>
                  <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-[#1B93A4] rounded-full transform md:-translate-x-1/2 border-4 border-[#080B14]" />
                  <div className="hidden md:block flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding relative overflow-hidden" data-testid="metodo-cta">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1B93A4]/10 via-transparent to-[#D946EF]/10" />
        <div className="container-main relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card p-12 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-black text-[#F0F4FF] mb-4">¿Empezamos con el diagnóstico?</h2>
            <p className="text-lg text-[#8892A4] mb-8 max-w-2xl mx-auto">El primer paso es entender tu situación. Agenda una sesión de diagnóstico sin compromiso.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="https://crm.zoho.eu/bookings/Calendariodelaweb" target="_blank" rel="noopener noreferrer">
                <Button className="btn-gradient text-base px-8 py-6" data-testid="metodo-cta-btn">
                  Agendar Diagnóstico <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
              <Link to="/app/diagnostico">
                <Button className="btn-secondary text-base px-8 py-6">Diagnóstico Online</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Metodo;
