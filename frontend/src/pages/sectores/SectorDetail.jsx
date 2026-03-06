import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, Building2, Stethoscope, Briefcase, Store, User, Building,
  CheckCircle2, XCircle, ArrowUpRight, Calendar
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import Layout from '../../components/layout/Layout';
import SEO from '../../components/SEO';
import { SECTORS, CASES } from '../../lib/constants';

const fadeInUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } } };
const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };

const ICON_MAP = { Building2, Stethoscope, Briefcase, Store, User, Building };

const SectorDetail = () => {
  const { sectorId } = useParams();
  const sector = SECTORS.find(s => s.id === sectorId);
  if (!sector) return <Navigate to="/sectores" replace />;

  const Icon = ICON_MAP[sector.icon] || Building2;
  const sectorCases = CASES.filter(c => c.sectorId === sector.id);

  return (
    <Layout>
      <SEO
        title={`${sector.title} | Leapifyes — Transformación Digital`}
        description={sector.description}
      />

      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden" data-testid="sector-hero">
        <div className="absolute inset-0">
          <div className="mesh-gradient opacity-40" />
          <div className="grid-pattern absolute inset-0 opacity-20" />
        </div>
        <div className="container-main relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 glass-card border border-[#1B93A4]/20 rounded-full mb-6">
                <Icon className="w-4 h-4 text-[#1B93A4]" />
                <span className="text-sm font-medium text-[#1B93A4]">{sector.subtitle}</span>
              </motion.div>
              <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-6xl font-black text-[#F0F4FF] mb-6 leading-tight">
                {sector.title}
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-lg text-[#8892A4] mb-8 leading-relaxed max-w-xl">
                {sector.description}
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <a href="https://crm.zoho.eu/bookings/Calendariodelaweb" target="_blank" rel="noopener noreferrer">
                  <Button className="btn-gradient text-base px-8 py-6" data-testid="sector-cta-primary">
                    Agendar diagnóstico gratuito <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </a>
                <Link to="/app/diagnostico">
                  <Button className="btn-secondary text-base px-8 py-6">Diagnóstico Online</Button>
                </Link>
              </motion.div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="relative hidden lg:block">
              <div className="glass-card p-10 text-center">
                <div className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-[#1B93A4]/20 to-[#3B82F6]/20 flex items-center justify-center mb-6">
                  <Icon className="w-12 h-12 text-[#1B93A4]" />
                </div>
                <h3 className="text-2xl font-bold text-[#F0F4FF] mb-2">{sector.title}</h3>
                <p className="text-[#8892A4] mb-6">{sector.subtitle}</p>
                <div className="grid grid-cols-3 gap-4">
                  {sector.stats.map((stat, i) => (
                    <div key={i} className="text-center">
                      <p className="text-2xl font-black gradient-text">{stat.value}</p>
                      <p className="text-xs text-[#8892A4]">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Challenges vs Benefits */}
      <section className="section-padding border-t border-white/5" data-testid="sector-challenges">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-black text-[#F0F4FF] mb-8">Retos que conocemos</h2>
              <div className="space-y-4">
                {sector.challenges.map((c, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 bg-red-500/5 rounded-xl border border-red-500/10">
                    <XCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-[#8892A4]">{c}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-black text-[#F0F4FF] mb-8">Lo que conseguimos</h2>
              <div className="space-y-4">
                {sector.benefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 bg-green-500/5 rounded-xl border border-green-500/10">
                    <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                    <p className="text-[#8892A4]">{b}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding border-t border-white/5" data-testid="sector-stats">
        <div className="container-main">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-16">
            <motion.h2 variants={fadeInUp} className="text-4xl font-black text-[#F0F4FF] mb-4">Resultados en <span className="gradient-text">{sector.title}</span></motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-[#8892A4]">Métricas reales de clientes del sector</motion.p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {sector.stats.map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center glass-card p-8">
                <p className="text-5xl font-black gradient-text mb-2">{stat.value}</p>
                <p className="text-[#8892A4]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case studies for this sector */}
      {sectorCases.length > 0 && (
        <section className="section-padding border-t border-white/5" data-testid="sector-cases">
          <div className="container-main">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-16">
              <motion.h2 variants={fadeInUp} className="text-4xl font-black text-[#F0F4FF] mb-4">Casos de éxito en <span className="gradient-text">{sector.title}</span></motion.h2>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-8">
              {sectorCases.map((c, i) => (
                <motion.div key={c.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card p-8">
                  <h3 className="text-xl font-bold text-[#F0F4FF] mb-2">{c.company}</h3>
                  <p className="text-sm text-[#8892A4] mb-4">{c.challenge}</p>
                  <p className="text-sm text-[#8892A4] mb-4">{c.solution}</p>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {c.results.map((r, j) => (
                      <div key={j} className="text-center p-3 bg-white/5 rounded-lg">
                        <p className="text-xl font-black gradient-text">{r.metric}</p>
                        <p className="text-xs text-[#8892A4]">{r.label}</p>
                      </div>
                    ))}
                  </div>
                  <blockquote className="text-sm text-[#F0F4FF] italic border-l-2 border-[#1B93A4] pl-4">"{c.testimonial}"</blockquote>
                  <p className="text-xs text-[#8892A4] mt-2">— {c.author}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Solutions */}
      <section className="section-padding border-t border-white/5" data-testid="sector-solutions">
        <div className="container-main">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-16">
            <motion.h2 variants={fadeInUp} className="text-4xl font-black text-[#F0F4FF] mb-4">Soluciones <span className="gradient-text">aplicables</span></motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-[#8892A4] max-w-2xl mx-auto">Combinamos nuestras soluciones para crear un ecosistema adaptado a tu negocio.</motion.p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Link to="/soluciones/transformacion-digital">
                <div className="glass-card-hover p-8 group">
                  <h3 className="text-2xl font-bold text-[#F0F4FF] mb-4">Transformación Digital</h3>
                  <p className="text-[#8892A4] mb-6">Digitalizamos tus procesos clave: gestión de clientes, presupuestos, facturación y seguimiento de proyectos.</p>
                  <span className="inline-flex items-center text-[#1B93A4] font-medium group-hover:gap-3 gap-2 transition-all">Ver solución <ArrowUpRight className="w-4 h-4" /></span>
                </div>
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <Link to="/soluciones/agentes-ia">
                <div className="glass-card-hover p-8 group">
                  <h3 className="text-2xl font-bold text-[#F0F4FF] mb-4">Agentes de IA</h3>
                  <p className="text-[#8892A4] mb-6">Atención 24/7 por WhatsApp, cualificación de leads, presupuestos automáticos y seguimiento proactivo.</p>
                  <span className="inline-flex items-center text-[#D946EF] font-medium group-hover:gap-3 gap-2 transition-all">Ver solución <ArrowUpRight className="w-4 h-4" /></span>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding relative overflow-hidden" data-testid="sector-cta-final">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1B93A4]/10 via-transparent to-[#D946EF]/10" />
        <div className="container-main relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card p-12 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-black text-[#F0F4FF] mb-4">¿Hablamos de tu negocio?</h2>
            <p className="text-lg text-[#8892A4] mb-8 max-w-2xl mx-auto">
              Agenda una valoración gratuita. Analizamos tu caso y te proponemos un plan adaptado a {sector.title.toLowerCase()}.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="https://crm.zoho.eu/bookings/Calendariodelaweb" target="_blank" rel="noopener noreferrer">
                <Button className="btn-gradient text-base px-8 py-6" data-testid="sector-cta-btn">
                  <Calendar className="w-5 h-5 mr-2" /> Agendar diagnóstico gratuito <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
              <Link to="/casos">
                <Button className="btn-secondary text-base px-8 py-6">Ver Todos los Casos</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default SectorDetail;
