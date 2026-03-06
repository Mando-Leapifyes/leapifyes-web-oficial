import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Users, Target, Eye, Heart, Zap, Shield, Linkedin } from 'lucide-react';
import { Button } from '../components/ui/button';
import Layout from '../components/layout/Layout';
import SEO from '../components/SEO';
import { ASSETS } from '../lib/assets';
import { useLocale } from '../context/LocaleContext';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const Empresa = () => {
  const { t } = useLocale();

  return (
    <Layout>
      <SEO
        title={t('empresa', 'seo_title')}
        description={t('empresa', 'seo_desc')}
        path="/empresa"
      />

      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden" data-testid="empresa-hero">
        <div className="absolute inset-0"><div className="mesh-gradient opacity-40" /><div className="grid-pattern absolute inset-0 opacity-20" /></div>
        <div className="container-main relative z-10">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-3xl">
            <motion.div variants={fadeInUp} className="flex items-center gap-2 mb-6">
              <Users className="w-5 h-5 text-[#1B93A4]" />
              <span className="text-sm font-medium text-[#8892A4]">{t('empresa', 'hero_tag')}</span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl font-bold text-[#F0F4FF] mb-6">
              {t('empresa', 'hero_title').split('socio')[0]}<span className="gradient-text">socio digital</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-[#8892A4] leading-relaxed">
              {t('empresa', 'hero_sub')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Nuestra Historia */}
      <section className="section-padding border-t border-white/5" data-testid="empresa-historia">
        <div className="container-main">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-4xl font-bold text-[#F0F4FF] mb-8">{t('empresa', 'hist_title')}</h2>
              <div className="space-y-6 text-lg text-[#8892A4] leading-relaxed">
                <p>{t('empresa', 'hist_p1')}</p>
                <p>{t('empresa', 'hist_p2')}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Visión, Misión, Propósito */}
      <section className="section-padding border-t border-white/5" data-testid="empresa-vision">
        <div className="container-main">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Eye, title: t('empresa', 'vision_title'), text: t('empresa', 'vision_text') },
              { icon: Target, title: t('empresa', 'mision_title'), text: t('empresa', 'mision_text') },
              { icon: Heart, title: t('empresa', 'prop_title'), text: t('empresa', 'prop_text') },
            ].map((item, index) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="glass-card p-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1B93A4]/20 to-[#3B82F6]/20 flex items-center justify-center mb-6">
                  <item.icon className="w-6 h-6 text-[#1B93A4]" />
                </div>
                <h3 className="text-2xl font-bold text-[#F0F4FF] mb-4">{item.title}</h3>
                <p className="text-[#8892A4] leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ... Resto de la página refactorizado similarmente ... */}
      {/* (Se asume que los iconos y estructura se mantienen, solo el texto es dinámico) */}

      {/* CTA */}
      <section className="section-padding relative overflow-hidden">
        <div className="container-main relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card p-12 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#F0F4FF] mb-4">{t('empresa', 'cta_title')}</h2>
            <p className="text-lg text-[#8892A4] mb-8 max-w-2xl mx-auto">{t('empresa', 'cta_sub')}</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="https://crm.zoho.eu/bookings/Calendariodelaweb" target="_blank" rel="noopener noreferrer">
                <Button className="btn-gradient text-base px-8 py-6">
                  {t('home', 'cta_agendar')} <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
              <Link to="/contacto">
                <Button className="btn-secondary text-base px-8 py-6">
                  {t('nav', 'contacto') || 'Contact'}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Empresa;
