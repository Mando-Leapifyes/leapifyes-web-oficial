import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, Quote, TrendingUp, Building2, Stethoscope, Briefcase,
  Store, Calendar
} from 'lucide-react';
import { Button } from '../components/ui/button';
import Layout from '../components/layout/Layout';
import SEO from '../components/SEO';
import { CASES } from '../lib/constants';

const fadeInUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } } };
const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };

const sectorIcons = {
  'Clínicas y Salud': Stethoscope,
  'Reformas y Construcción': Building2,
  'Gestorías y Asesorías': Briefcase,
  'Comercios y Retail': Store,
};

const Casos = () => {
  return (
    <Layout>
      <SEO
        title="Casos de Éxito | Leapifyes — Resultados Reales en Barcelona"
        description="Casos de éxito reales de empresas en Barcelona transformadas con Leapifyes. Métricas verificables y testimonios de clientes."
      />

      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden" data-testid="casos-hero">
        <div className="absolute inset-0">
          <div className="mesh-gradient opacity-40" />
          <div className="grid-pattern absolute inset-0 opacity-20" />
        </div>
        <div className="container-main relative z-10">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-3xl mx-auto text-center">
            <motion.span variants={fadeInUp} className="text-[#1B93A4] font-semibold mb-4 block uppercase tracking-wider text-sm" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Resultados reales, negocios reales</motion.span>
            <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-6xl font-black text-[#F0F4FF] mb-6">
              No prometemos. <span className="gradient-text">Demostramos.</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-[#8892A4] leading-relaxed">
              Empresas de Barcelona y Cataluña que decidieron dar el salto. Sus números hablan por ellos.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Cases */}
      <section className="section-padding border-t border-white/5" data-testid="casos-grid">
        <div className="container-main">
          <div className="space-y-16">
            {CASES.map((caseItem, index) => {
              const Icon = sectorIcons[caseItem.sector] || Building2;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={caseItem.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="glass-card overflow-hidden"
                  data-testid={`caso-${caseItem.id}`}
                >
                  <div className={`grid lg:grid-cols-2`}>
                    <div className={`p-8 md:p-12 ${!isEven ? 'lg:order-2' : ''}`}>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-[#1B93A4]/20 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-[#1B93A4]" />
                        </div>
                        <span className="text-sm font-medium text-[#8892A4]">{caseItem.sector}</span>
                      </div>
                      <h2 className="text-3xl font-black text-[#F0F4FF] mb-4">{caseItem.company}</h2>
                      <div className="mb-6">
                        <h3 className="text-sm font-semibold text-[#8892A4] uppercase tracking-wider mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>El reto</h3>
                        <p className="text-[#8892A4]">{caseItem.challenge}</p>
                      </div>
                      <div className="mb-8">
                        <h3 className="text-sm font-semibold text-[#8892A4] uppercase tracking-wider mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>La solución</h3>
                        <p className="text-[#8892A4]">{caseItem.solution}</p>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        {caseItem.results.map((result, i) => (
                          <div key={i} className="text-center p-4 bg-white/5 rounded-xl">
                            <p className="text-2xl font-black gradient-text">{result.metric}</p>
                            <p className="text-xs text-[#8892A4] mt-1">{result.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className={`bg-[#0F1422] p-8 md:p-12 flex flex-col justify-center ${!isEven ? 'lg:order-1' : ''}`}>
                      <Quote className="w-12 h-12 text-[#1B93A4] mb-6" />
                      <blockquote className="text-xl text-[#F0F4FF] leading-relaxed mb-6">
                        "{caseItem.testimonial}"
                      </blockquote>
                      <p className="text-[#8892A4]">— {caseItem.author}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding border-t border-white/5" data-testid="casos-stats">
        <div className="container-main">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-16">
            <motion.h2 variants={fadeInUp} className="text-4xl font-black text-[#F0F4FF] mb-4">Impacto <span className="gradient-text">acumulado</span></motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-[#8892A4]">Cifras agregadas de todos nuestros clientes</motion.p>
          </motion.div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { value: '+50', label: 'Empresas transformadas' },
              { value: '+2M€', label: 'Valor generado' },
              { value: '15K+', label: 'Horas ahorradas' },
              { value: '98%', label: 'Satisfacción cliente' },
            ].map((stat, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="glass-card p-8 text-center">
                <p className="text-4xl font-black gradient-text mb-2">{stat.value}</p>
                <p className="text-[#8892A4]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding relative overflow-hidden" data-testid="casos-cta">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1B93A4]/10 via-transparent to-[#D946EF]/10" />
        <div className="container-main relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card p-12 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-black text-[#F0F4FF] mb-4">¿Quieres ser el próximo caso de éxito?</h2>
            <p className="text-lg text-[#8892A4] mb-8 max-w-2xl mx-auto">Hablemos de tu negocio y veamos qué resultados podemos conseguir juntos.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="https://crm.zoho.eu/bookings/Calendariodelaweb" target="_blank" rel="noopener noreferrer">
                <Button className="btn-gradient text-base px-8 py-6" data-testid="casos-cta-btn">
                  <Calendar className="w-5 h-5 mr-2" /> Agendar diagnóstico gratuito <ArrowRight className="w-5 h-5 ml-2" />
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

export default Casos;
