import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, Building2, Stethoscope, Briefcase, Store, User, Building,
  CheckCircle2, Calendar
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import Layout from '../../components/layout/Layout';
import SEO from '../../components/SEO';
import { SECTORS } from '../../lib/constants';

const fadeInUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } } };
const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };

const ICON_MAP = { Building2, Stethoscope, Briefcase, Store, User, Building };

const SectoresHub = () => {
  return (
    <Layout>
      <SEO
        title="Sectores | Leapifyes — Soluciones Especializadas por Industria"
        description="Soluciones de transformación digital especializadas por sector: reformas, clínicas, gestorías, comercios, autónomos y PYMEs en Barcelona."
      />

      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden" data-testid="sectores-hero">
        <div className="absolute inset-0">
          <div className="mesh-gradient opacity-40" />
          <div className="grid-pattern absolute inset-0 opacity-20" />
        </div>
        <div className="container-main relative z-10">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-3xl">
            <motion.span variants={fadeInUp} className="text-[#1B93A4] font-semibold mb-4 block uppercase tracking-wider text-sm" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Sectores donde operamos</motion.span>
            <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-6xl font-black text-[#F0F4FF] mb-6 leading-tight">
              Conocemos tu sector. <span className="gradient-text">Hablamos tu idioma.</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-[#8892A4] leading-relaxed">
              Cada industria tiene sus particularidades. No aplicamos plantillas genéricas: diseñamos soluciones que entienden tu realidad específica.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Sectors Grid - 6 sectors */}
      <section className="section-padding border-t border-white/5" data-testid="sectores-grid">
        <div className="container-main">
          <div className="space-y-16">
            {SECTORS.map((sector, index) => {
              const Icon = ICON_MAP[sector.icon] || Building2;
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={sector.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className={`grid lg:grid-cols-2 gap-12 items-center`}
                  data-testid={`sector-card-${sector.id}`}
                >
                  <div className={!isEven ? 'lg:order-2' : ''}>
                    <div className="glass-card p-8 text-center">
                      <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-[#1B93A4]/20 to-[#3B82F6]/20 flex items-center justify-center mb-4">
                        <Icon className="w-10 h-10 text-[#1B93A4]" />
                      </div>
                      <div className="text-4xl font-black gradient-text mb-2">{sector.title.split(' ')[0]}</div>
                      <p className="text-[#8892A4] text-sm">{sector.subtitle}</p>
                      {/* Stats preview */}
                      <div className="grid grid-cols-3 gap-3 mt-6">
                        {sector.stats.map((stat, i) => (
                          <div key={i} className="text-center">
                            <p className="text-lg font-bold gradient-text">{stat.value}</p>
                            <p className="text-xs text-[#8892A4]">{stat.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className={!isEven ? 'lg:order-1' : ''}>
                    <span className="text-sm font-medium text-[#1B93A4] uppercase tracking-wider">{sector.subtitle}</span>
                    <h2 className="text-3xl md:text-4xl font-black text-[#F0F4FF] mt-2 mb-4">{sector.title}</h2>
                    <p className="text-lg text-[#8892A4] mb-6 leading-relaxed">{sector.description}</p>
                    <div className="grid sm:grid-cols-2 gap-4 mb-8">
                      <div className="bg-red-500/5 rounded-xl p-4 border border-red-500/10">
                        <h4 className="font-semibold text-[#F0F4FF] mb-2 text-sm">Retos comunes</h4>
                        <ul className="space-y-1">
                          {sector.challenges.slice(0, 2).map((c, i) => (
                            <li key={i} className="text-sm text-[#8892A4] flex items-start gap-2">
                              <span className="text-red-400 mt-1">•</span>{c}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-[#1B93A4]/5 rounded-xl p-4 border border-[#1B93A4]/10">
                        <h4 className="font-semibold text-[#F0F4FF] mb-2 text-sm">Lo que logramos</h4>
                        <ul className="space-y-1">
                          {sector.benefits.slice(0, 2).map((b, i) => (
                            <li key={i} className="text-sm text-[#8892A4] flex items-start gap-2">
                              <CheckCircle2 className="w-3 h-3 text-[#1B93A4] mt-1 flex-shrink-0" />{b}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <Link to={`/sectores/${sector.id}`}>
                      <Button className="btn-gradient" data-testid={`sector-${sector.id}-btn`}>
                        Ver Solución Completa <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Other Sectors */}
      <section className="section-padding border-t border-white/5" data-testid="sectores-otros">
        <div className="container-main">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-12">
            <motion.h2 variants={fadeInUp} className="text-3xl font-black text-[#F0F4FF] mb-4">¿Tu sector no está aquí?</motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-[#8892A4] max-w-2xl mx-auto">Trabajamos con más de 15 sectores diferentes. Si no ves el tuyo, hablemos.</motion.p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-wrap justify-center gap-3">
            {['Hostelería', 'Inmobiliarias', 'Academias', 'Gimnasios', 'E-commerce', 'Agencias', 'Transporte', 'Retail'].map((s, i) => (
              <span key={i} className="px-4 py-2 glass-card text-[#8892A4] text-sm">{s}</span>
            ))}
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mt-12">
            <Link to="/contacto"><Button className="btn-secondary">Cuéntanos tu caso <ArrowRight className="w-4 h-4 ml-2" /></Button></Link>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding relative overflow-hidden" data-testid="sectores-cta">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1B93A4]/10 via-transparent to-[#D946EF]/10" />
        <div className="container-main relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card p-12 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-black text-[#F0F4FF] mb-4">¿Quieres ver cómo aplicaría a tu negocio?</h2>
            <p className="text-lg text-[#8892A4] mb-8 max-w-2xl mx-auto">Haz un diagnóstico rápido y recibe recomendaciones personalizadas para tu sector.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/app/diagnostico">
                <Button className="btn-gradient text-base px-8 py-6" data-testid="sectores-diagnostico-btn">
                  <Calendar className="w-5 h-5 mr-2" /> Diagnóstico Gratuito <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/contacto">
                <Button className="btn-secondary text-base px-8 py-6">Hablar con un Experto</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default SectoresHub;
