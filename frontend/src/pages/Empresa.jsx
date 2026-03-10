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

      {/* Nuestro Fundador */}
      <section className="section-padding border-t border-white/5" data-testid="empresa-fundador">
        <div className="container-main">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-12">
            <motion.h2 variants={fadeInUp} className="text-4xl font-bold text-[#F0F4FF] mb-4">{t('empresa', 'founder_title')}</motion.h2>
          </motion.div>

          <div className="grid lg:grid-cols-[0.4fr_1fr] gap-12 lg:gap-16 items-start max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="mx-auto lg:mx-0">
              <img
                src={ASSETS.fotoRicardo}
                alt="Ricardo Serrano, Fundador y CEO de Leapifyes, Barcelona"
                className="w-full max-w-[360px] h-[440px] object-cover object-top rounded-[20px]"
                style={{ border: '2px solid rgba(27,147,164,0.3)', boxShadow: '0 20px 60px rgba(27,147,164,0.15)' }}
                loading="lazy"
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h3 className="text-3xl font-bold text-[#F0F4FF] mb-2">Ricardo Serrano</h3>
              <p className="text-[#1B93A4] font-medium mb-6">{t('empresa', 'founder_role')}</p>

              <div className="space-y-4 text-[#8892A4] leading-relaxed mb-8">
                <p>{t('empresa', 'founder_bio_1')}</p>
                <p>{t('empresa', 'founder_bio_2')}</p>
                <p>{t('empresa', 'founder_bio_3')}</p>
                <p>{t('empresa', 'founder_bio_4')}</p>
              </div>

              <a href="https://www.linkedin.com/in/ricardoserrano" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-[#8892A4] hover:text-[#F0F4FF] transition-colors border border-white/10">
                <Linkedin className="w-5 h-5" />
                Conectar en LinkedIn
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* El Equipo */}
      <section className="section-padding border-t border-white/5" data-testid="empresa-team">
        <div className="container-main">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="max-w-3xl mb-12">
            <motion.h2 variants={fadeInUp} className="text-4xl font-bold text-[#F0F4FF] mb-4">{t('empresa', 'team_title')}</motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-[#8892A4]">{t('empresa', 'team_sub')}</motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Zap, name: t('empresa', 'team_tech_title'), desc: t('empresa', 'team_tech_desc') },
              { icon: Target, name: t('empresa', 'team_biz_title'), desc: t('empresa', 'team_biz_desc') },
              { icon: Heart, name: t('empresa', 'team_success_title'), desc: t('empresa', 'team_success_desc') },
            ].map((member, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="glass-card-hover p-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1B93A4]/20 to-[#3B82F6]/20 flex items-center justify-center mb-6">
                  <member.icon className="w-7 h-7 text-[#1B93A4]" />
                </div>
                <h3 className="text-xl font-bold text-[#F0F4FF] mb-2">{member.name}</h3>
                <p className="text-[#8892A4]">{member.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Barcelona */}
      <section className="section-padding border-t border-white/5" data-testid="empresa-barcelona">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-card p-8 text-center">
              <div className="text-6xl font-black gradient-text mb-4">{t('empresa', 'bcn_label')}</div>
              <p className="text-xl text-[#F0F4FF] font-semibold mb-2">{t('empresa', 'bcn_title')}</p>
              <p className="text-[#8892A4]">{t('empresa', 'bcn_desc')}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-4xl font-bold text-[#F0F4FF] mb-6">{t('empresa', 'bcn_q_title')}</h2>
              <p className="text-lg text-[#8892A4] mb-6 leading-relaxed">
                {t('empresa', 'bcn_desc')}
              </p>
              <ul className="space-y-4">
                {(t('empresa', 'bcn_points') || []).map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-[#1B93A4]" />
                    <span className="text-[#8892A4]">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding relative overflow-hidden">
        <div className="container-main relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card p-12 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#F0F4FF] mb-4">{t('empresa', 'cta_title')}</h2>
            <p className="text-lg text-[#8892A4] mb-8 max-w-2xl mx-auto">{t('empresa', 'cta_sub')}</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="https://crm.zoho.eu/bookings/Calendariodelaweb" target="_blank" rel="noopener noreferrer">
                <Button className="btn-gradient text-base px-8 py-6">
                  {t('empresa', 'cta_primary')} <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
              <Link to="/contacto">
                <Button className="btn-secondary text-base px-8 py-6">
                  {t('empresa', 'cta_secondary')}
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
