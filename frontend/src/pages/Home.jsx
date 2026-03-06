import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import {
  ArrowRight, RefreshCw, Bot, Globe, Building2, Stethoscope,
  Briefcase, Store, User, Building, CheckCircle2, Zap, Search,
  Calendar, MessageSquare, Database, Code, Shield, TrendingUp, Users, MapPin
} from 'lucide-react';
import { Button } from '../components/ui/button';
import Layout from '../components/layout/Layout';
import SEO from '../components/SEO';
import { ASSETS } from '../lib/assets';
import { useLocale } from '../context/LocaleContext';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const AnimatedCounter = ({ end, duration = 2000 }) => {
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
  return <span ref={ref}>{end.includes('+') ? '+' : ''}{count}{end.includes('%') ? '%' : ''}</span>;
};

const SectionHeader = ({ label, title, gradient }) => (
  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-16">
    <motion.span variants={fadeInUp} className="text-[#1B93A4] font-semibold mb-4 block uppercase tracking-wider text-sm">{label}</motion.span>
    <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-black text-[#F0F4FF] mb-4">{title} <span className="gradient-text">{gradient}</span></motion.h2>
  </motion.div>
);

const Home = () => {
  const { t, getData, locale } = useLocale();

  const iconMap = {
    'Transformación Digital': RefreshCw, 'Digital Transformation': RefreshCw,
    'Agentes IA y Automatización': Bot, 'AI Agents and Automation': Bot,
    'Desarrollo Web a Medida': Globe, 'Custom Web Development': Globe,
    'ERP y CRM a Medida': Database, 'ERP and CRM Measures': Database,
    'Programas y Sistemas a Medida': Code, 'Custom Software and Systems': Code,
    'Cumplimiento RGPD sin Dolor': Shield, 'Painless GDPR Compliance': Shield,
    'Reformas y Construcción': Building2, 'Reform and Construction': Building2,
    'Clínicas y Salud': Stethoscope, 'Clinics and Health': Stethoscope,
    'Gestorías y Asesorías': Briefcase, 'Consultancies': Briefcase,
    'Comercios y Retail': Store, 'Retail and Commerce': Store,
    'Autónomos': User, 'Freelancers': User,
    'PYMEs': Building, 'Growing SMEs': Building,
    'Escucha y diagnóstico': Search, 'Plan de 90 días': Calendar,
    'Implantación guiada': Zap, 'Formación y adopción': Users,
    'KPIs y mejora continua': TrendingUp
  };

  const SERVICES_DATA = getData('services').map(s => ({
    ...s,
    icon: iconMap[s.title] || Zap,
    href: s.title.includes('Digital') || s.title.includes('Transformation') ? '/soluciones/transformacion-digital' : s.title.includes('IA') || s.title.includes('AI') ? '/soluciones/agentes-ia' : '/soluciones'
  }));

  const TOOLS_DATA = getData('tools').map(t => ({
    ...t,
    icon: iconMap[t.title] || MessageSquare
  }));

  const SECTORS_DATA = getData('sectors').map(s => ({
    ...s,
    icon: iconMap[s.name] || Building2
  }));

  const METHOD_DATA = getData('method').map((m, i) => ({
    ...m,
    phase: `0${i + 1}`,
    icon: iconMap[m.title] || Search
  }));

  return (
    <Layout>
      <SEO title={t('home', 'seo_title')} description={t('home', 'seo_desc')} />

      {/* Hero */}
      <section className="relative overflow-hidden pt-10 pb-16">
        <div className="container-main relative z-10">
          <div className="grid lg:grid-cols-[55%_45%] gap-12 items-center">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
              <motion.div variants={fadeInUp} className="mb-6">
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold glass-card text-[#1B93A4]">
                  <span className="w-2 h-2 bg-[#1B93A4] rounded-full animate-pulse" /> {t('home', 'hero_tag')}
                </span>
              </motion.div>
              <motion.h1 variants={fadeInUp} className="font-black text-[#F0F4FF] mb-5 leading-tight text-5xl md:text-7xl">
                {t('home', 'hero_title_1')} {t('home', 'hero_title_2')}<br />
                <span className="gradient-text">{t('home', 'hero_title_3')} {t('home', 'hero_title_4')}</span>
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-lg text-[#8892A4] mb-8 max-w-xl">{t('home', 'hero_sub')}</motion.p>

              <motion.div variants={fadeInUp} className="flex flex-wrap gap-3 mb-10">
                {[t('home', 'hero_tag_bcn'), t('home', 'hero_tag_ia'), t('home', 'hero_tag_sis')].map((tag, i) => (
                  <span key={i} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#161D30] text-[#8892A4] text-sm">
                    <MapPin className="w-4 h-4 text-[#1B93A4]" /> {tag}
                  </span>
                ))}
              </motion.div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="btn-gradient px-8 py-7 text-lg">{t('home', 'cta_agendar')} <ArrowRight className="ml-2 w-5 h-5" /></Button>
                <Button className="btn-secondary px-8 py-7 text-lg">{t('home', 'cta_servicios')}</Button>
              </div>
            </motion.div>

            <div className="hidden lg:block space-y-4">
              {[
                { icon: RefreshCw, title: t('home', 'sol_td'), desc: t('home', 'sol_td_sub'), color: '#1B93A4' },
                { icon: Bot, title: t('home', 'sol_ia'), desc: t('home', 'sol_ia_sub'), color: '#D946EF' },
                { icon: Database, title: t('home', 'sol_sis'), desc: t('home', 'sol_sis_sub'), color: '#3B82F6' },
              ].map((card, i) => (
                <div key={i} className="p-6 rounded-2xl bg-[#161D30] border-l-4 border-l-transparent hover:border-l-[#1B93A4] transition-all group" style={{ borderColor: card.color }}>
                  <div className="flex gap-4">
                    <card.icon className="w-6 h-6 shrink-0" style={{ color: card.color }} />
                    <div>
                      <h3 className="font-bold text-white mb-1">{card.title}</h3>
                      <p className="text-sm text-[#8892A4]">{card.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Story Section - RESTORED */}
      <section className="section-padding border-t border-white/5 bg-[#080B16]">
        <div className="container-main">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="max-w-4xl mx-auto text-center">
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-black text-[#F0F4FF] mb-8">
              {t('home', 'story_title_1')} <br />
              <span className="gradient-text">{t('home', 'story_title_gradient')}</span>
            </motion.h2>
            <motion.div variants={fadeInUp} className="space-y-6 text-lg md:text-xl text-[#8892A4] leading-relaxed">
              <p>{t('home', 'story_p1')}</p>
              <p className="font-semibold text-white/90">
                {t('home', 'story_p2').split('socio digital')[0]} <span className="text-[#1B93A4]">socio digital</span>{t('home', 'story_p2').split('socio digital')[1]}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid - RESTORED 6 CARDS */}
      <section className="section-padding border-t border-white/5">
        <div className="container-main">
          <SectionHeader label={t('home', 'serv_label')} title={t('home', 'serv_title')} gradient={t('home', 'serv_gradient')} />
          <div className="grid md:grid-cols-3 gap-6">
            {SERVICES_DATA.map((s, i) => (
              <div key={i} className="glass-card p-8 group flex flex-col h-full">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-6`}>
                  <s.icon className="text-[#1B93A4] w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{s.title}</h3>
                <p className="text-[#1B93A4] font-medium text-sm mb-4">{s.desc_short}</p>
                <p className="text-sm text-[#8892A4] mb-6 flex-grow">{s.description}</p>
                <ul className="space-y-2 mb-8">
                  {s.features.map((f, ji) => (
                    <li key={ji} className="flex items-start gap-2 text-sm text-[#8892A4]">
                      <CheckCircle2 className="w-4 h-4 text-[#1B93A4] mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-4 border-t border-white/5">
                  <Link to={s.href} className="text-[#1B93A4] text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all">
                    {t('home', 'learn_more')} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section - RESTORED */}
      <section className="section-padding bg-[#080B16]">
        <div className="container-main">
          <SectionHeader label={t('home', 'imd_label')} title={t('home', 'imd_title_part1')} gradient={t('home', 'imd_gradient')} />
          <div className="grid md:grid-cols-3 gap-6">
            {TOOLS_DATA.map((tool, i) => (
              <div key={i} className="glass-card p-8 flex flex-col h-full border-t-4" style={{ borderTopColor: tool.color }}>
                <div className="flex justify-between items-start mb-6">
                  <tool.icon className="w-8 h-8" style={{ color: tool.color }} />
                  <span className="text-[10px] font-bold px-2 py-1 rounded bg-white/5 text-[#8892A4] uppercase tracking-wider">{tool.badge}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{tool.title}</h3>
                <p className="text-sm text-[#8892A4] mb-6 flex-grow">{tool.description}</p>
                <ul className="space-y-3 mb-8">
                  {tool.items.map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-xs text-[#8892A4]">
                      <div className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: tool.color }} />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-[#161D30] hover:bg-[#1B93A4] transition-colors py-6">
                  {t('home', 'learn_more')}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="section-padding">
        <div className="container-main">
          <SectionHeader label={t('home', 'prod_label')} title={t('home', 'prod_title')} gradient={t('home', 'prod_gradient')} />
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="glass-card p-10 border-[#1B93A4]/30">
              <span className="bg-[#1B93A4] text-white text-[10px] font-bold px-2 py-1 rounded mb-4 inline-block">{t('home', 'mando_tag')}</span>
              <h3 className="text-3xl font-black text-white mb-2">MANDO</h3>
              <p className="text-[#1B93A4] font-bold mb-4">{t('home', 'mando_sub')}</p>
              <p className="text-[#8892A4] mb-8">{t('home', 'mando_desc')}</p>
              <Button variant="outline" className="border-[#1B93A4] text-[#1B93A4] hover:bg-[#1B93A4] hover:text-white transition-all">Open MANDO</Button>
            </div>
            <div className="glass-card p-10 border-[#10b981]/30">
              <span className="bg-[#10b981] text-white text-[10px] font-bold px-2 py-1 rounded mb-4 inline-block">{t('home', 'trebol_tag')}</span>
              <h3 className="text-3xl font-black text-white mb-2">TRÉBOL</h3>
              <p className="text-[#10b981] font-bold mb-4">{t('home', 'trebol_sub')}</p>
              <p className="text-[#8892A4] mb-8">{t('home', 'trebol_desc')}</p>
              <Button variant="outline" className="border-[#10b981] text-[#10b981] hover:bg-[#10b981] hover:text-white transition-all">Open TRÉBOL</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className="section-padding bg-[#080B16]">
        <div className="container-main">
          <SectionHeader label={t('home', 'sect_label')} title={t('home', 'sect_title')} gradient={t('home', 'sect_gradient')} />
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {SECTORS_DATA.map((s, i) => (
              <div key={i} className="glass-card p-5 text-center group hover:border-[#1B93A4]/50 transition-all">
                <s.icon className="mx-auto text-[#1B93A4] w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="text-white text-xs font-bold">{s.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Method */}
      <section className="section-padding">
        <div className="container-main">
          <SectionHeader label={t('home', 'method_label')} title={t('home', 'method_title')} gradient={t('home', 'method_gradient')} />
          <div className="grid md:grid-cols-5 gap-4">
            {METHOD_DATA.map((m, i) => (
              <div key={i} className="glass-card p-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <m.icon className="w-12 h-12" />
                </div>
                <span className="text-3xl font-black text-white/5 mb-4 block">{m.phase}</span>
                <m.icon className="text-[#1B93A4] w-6 h-6 mb-4" />
                <h4 className="text-white font-bold mb-2">{m.title}</h4>
                <p className="text-xs text-[#8892A4] leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CEO */}
      <section className="section-padding bg-[#080B16]">
        <div className="container-main">
          <SectionHeader label={t('home', 'team_label')} title={t('home', 'team_title')} gradient={t('home', 'team_gradient')} />
          <div className="glass-card p-10 flex flex-col md:row items-center gap-10 max-w-4xl mx-auto">
            <div className="relative shrink-0">
              <div className="absolute inset-0 bg-[#1B93A4] blur-2xl opacity-20" />
              <img src={ASSETS.fotoRicardo} className="w-48 h-48 rounded-2xl object-cover relative z-10 border border-white/10" alt="Ricardo Serrano" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-white mb-1">Ricardo Serrano</h3>
              <p className="text-[#1B93A4] font-bold mb-4 uppercase tracking-wider text-xs">Founder & CEO</p>
              <p className="text-[#8892A4] leading-relaxed italic">"{t('home', 'founder_desc')}"</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="section-padding bg-gradient-to-b from-transparent to-[#1B93A4]/10">
        <div className="container-main text-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <h2 className="text-5xl font-black text-white mb-4">{t('home', 'cta_title')}</h2>
            <p className="text-xl text-[#8892A4] mb-10 max-w-2xl mx-auto">{t('home', 'cta_sub')}</p>
            <Button className="btn-gradient px-12 py-8 text-xl font-black shadow-[0_0_50px_rgba(27,147,164,0.3)]">
              {t('home', 'cta_agendar')} <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
