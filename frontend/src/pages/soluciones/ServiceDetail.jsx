import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, RefreshCw, Bot, Globe, Database, Code, Shield,
  CheckCircle2, FileText, Settings, Users, BarChart3, MessageSquare,
  Calendar, Bell, Palette, Zap, Lock, Search as SearchIcon, Layers
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import Layout from '../../components/layout/Layout';
import SEO from '../../components/SEO';
import { SOLUTIONS } from '../../lib/constants';

const fadeInUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } } };
const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };

const ICON_MAP = { RefreshCw, Bot, Globe, Database, Code, Shield };
const BENEFIT_ICONS = [FileText, Settings, Users, BarChart3, MessageSquare, Calendar, Bell, Palette, Zap, Lock, SearchIcon, Layers];

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const solution = SOLUTIONS.find(s => s.id === serviceId);
  if (!solution) return <Navigate to="/soluciones" replace />;

  const Icon = ICON_MAP[solution.icon] || RefreshCw;
  const accent = solution.accentColor || '#1B93A4';

  return (
    <Layout>
      <SEO
        title={`${solution.title} | Leapifyes`}
        description={solution.description}
      />

      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden" data-testid="service-hero">
        <div className="absolute inset-0">
          <div className="mesh-gradient opacity-40" />
          <div className="grid-pattern absolute inset-0 opacity-20" />
        </div>
        <div className="container-main relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 glass-card border rounded-full mb-6" style={{ borderColor: `${accent}33` }}>
                <Icon className="w-4 h-4" style={{ color: accent }} />
                <span className="text-sm font-medium" style={{ color: accent }}>{solution.title}</span>
              </motion.div>
              <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-6xl font-black text-[#F0F4FF] mb-4 leading-tight">
                {solution.tagline}
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-lg text-[#8892A4] mb-8 leading-relaxed max-w-xl">
                {solution.description}
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <a href="https://crm.zoho.eu/bookings/Calendariodelaweb" target="_blank" rel="noopener noreferrer">
                  <Button className="btn-gradient text-base px-8 py-6" data-testid="service-cta-primary">
                    Agendar diagnóstico gratuito <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </a>
                <Link to="/app/diagnostico">
                  <Button className="btn-secondary text-base px-8 py-6" data-testid="service-cta-secondary">
                    Diagnóstico online
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="relative hidden lg:block">
              <div className="glass-card p-8">
                <div className="space-y-6">
                  {(solution.stats || []).map((stat, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-[#8892A4]">{stat.label}</span>
                        <span className="font-semibold text-[#F0F4FF]">{stat.value}</span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(70 + i * 10, 95)}%` }}
                          transition={{ duration: 1, delay: 0.5 + i * 0.2 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: accent }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding border-t border-white/5" data-testid="service-features">
        <div className="container-main">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-16">
            <motion.span variants={fadeInUp} className="font-semibold mb-4 block uppercase tracking-wider text-sm" style={{ color: accent, fontFamily: 'Space Grotesk, sans-serif' }}>Qué incluye</motion.span>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-black text-[#F0F4FF] mb-4">
              Todo lo que necesitas para <span className="gradient-text">dar el salto</span>
            </motion.h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solution.features.map((feature, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="glass-card-hover p-6">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: accent }} />
                  <span className="text-[#F0F4FF] font-medium">{feature}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding border-t border-white/5" data-testid="service-benefits">
        <div className="container-main">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-16">
            <motion.span variants={fadeInUp} className="font-semibold mb-4 block uppercase tracking-wider text-sm" style={{ color: accent, fontFamily: 'Space Grotesk, sans-serif' }}>Beneficios clave</motion.span>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-black text-[#F0F4FF]">
              ¿Por qué <span className="gradient-text">funciona</span>?
            </motion.h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8">
            {(solution.benefits || []).map((benefit, i) => {
              const BIcon = BENEFIT_ICONS[i % BENEFIT_ICONS.length];
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card-hover p-8">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: `${accent}18` }}>
                    <BIcon className="w-7 h-7" style={{ color: accent }} />
                  </div>
                  <h3 className="text-xl font-bold text-[#F0F4FF] mb-3">{benefit.title}</h3>
                  <p className="text-[#8892A4] leading-relaxed">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding border-t border-white/5" data-testid="service-process">
        <div className="container-main">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="max-w-3xl mb-16">
            <motion.span variants={fadeInUp} className="font-semibold mb-4 block uppercase tracking-wider text-sm" style={{ color: accent, fontFamily: 'Space Grotesk, sans-serif' }}>Nuestro proceso</motion.span>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-black text-[#F0F4FF]">
              Cómo lo <span className="gradient-text">hacemos</span>
            </motion.h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(solution.process || []).map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }} className="glass-card p-6 relative group hover:border-white/20 transition-colors">
                <span className="text-5xl font-black text-white/5 absolute top-2 right-4 group-hover:text-white/10 transition-colors">{step.step}</span>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: `${accent}18` }}>
                  <span className="font-bold" style={{ color: accent }}>{step.step}</span>
                </div>
                <h3 className="text-lg font-bold text-[#F0F4FF] mb-2">{step.title}</h3>
                <p className="text-sm text-[#8892A4]">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding border-t border-white/5" data-testid="service-stats">
        <div className="container-main">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-16">
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-black text-[#F0F4FF]">
              Resultados <span className="gradient-text">medibles</span>
            </motion.h2>
          </motion.div>
          <div className="grid md:grid-cols-4 gap-6">
            {(solution.stats || []).map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center glass-card p-6">
                <p className="text-5xl font-black gradient-text mb-2">{stat.value}</p>
                <p className="text-[#8892A4]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding relative overflow-hidden" data-testid="service-cta-final">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1B93A4]/10 via-transparent to-[#D946EF]/10" />
        <div className="container-main relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card p-12 md:p-16 text-center" style={{ borderColor: `${accent}33` }}>
            <h2 className="text-3xl md:text-4xl font-black text-[#F0F4FF] mb-4">¿Empezamos?</h2>
            <p className="text-lg text-[#8892A4] mb-8 max-w-2xl mx-auto">
              Agenda una valoración sin compromiso. Analizamos tu situación y te proponemos un plan concreto.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="https://crm.zoho.eu/bookings/Calendariodelaweb" target="_blank" rel="noopener noreferrer">
                <Button className="btn-gradient text-base px-8 py-6" data-testid="service-cta-bottom">
                  Agendar diagnóstico gratuito <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
              <Link to="/casos">
                <Button className="btn-secondary text-base px-8 py-6">Ver Casos de Éxito</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default ServiceDetail;
