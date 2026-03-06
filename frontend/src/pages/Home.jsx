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
import { useLocale } from '../context/LocaleContext';

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

const Home = () => {
  const { t, getData } = useLocale();

  const HERO_STATS = [
    { value: '+15', label: t('home', 'stat_years'), desc: t('home', 'stat_years_desc') },
    { value: '2', label: 'SaaS', desc: t('home', 'stat_saas_desc') },
    { value: '100', label: '%', desc: t('home', 'stat_fee_desc') },
    { value: '4', label: t('home', 'stat_cases'), desc: t('home', 'stat_cases_desc') },
  ];

  const iconMap = {
    // Services
    'Transformación Digital': RefreshCw, 'Digital Transformation': RefreshCw,
    'Agentes IA y Automatización': Bot, 'AI Agents and Automation': Bot,
    'Desarrollo Web a Medida': Globe, 'Custom Web Development': Globe,
    'ERP y CRM a Medida': Database, 'Custom ERP and CRM': Database,
    'Programas y Sistemas a Medida': Code, 'Custom Software and Systems': Code,
    'Cumplimiento RGPD sin Dolor': Shield, 'Painless GDPR Compliance': Shield,
    // Sectors
    'Reformas y Construcción': Building2, 'Reform and Construction': Building2,
    'Clínicas y Salud': Stethoscope, 'Clinics and Health': Stethoscope,
    'Gestorías y Asesorías': Briefcase, 'Consultancies': Briefcase,
    'Comercios y Retail': Store, 'Retail and Commerce': Store,
    'Autónomos': User, 'Freelancers': User,
    'PYMEs': Building, 'Growing SMEs': Building,
    // Tools
    'Índice de Madurez Digital': ClipboardList,
    'Calculadora de Impacto': Calculator,
    'Prueba un Agente IA en Vivo': MessageSquare,
    // Method
    'Escucha y diagnóstico': Search, 'Listen and diagnosis': Search,
    'Plan de 90 días': Calendar, '90-day plan': Calendar,
    'Implantación guiada': Zap, 'Guided implementation': Zap,
    'Formación y adopción': Users, 'Training and adoption': Users,
    'KPIs y mejora continua': TrendingUp, 'KPIs and improvement': TrendingUp
  };

  const SERVICES_DATA = getData('services').map(s => ({
    ...s,
    icon: iconMap[s.title] || Zap,
    href: s.title.includes('Digital') || s.title.includes('Transformation') ? '/soluciones/transformacion-digital' : s.title.includes('IA') || s.title.includes('AI') ? '/soluciones/agentes-ia' : '/soluciones',
    color: s.title.includes('Digital') ? 'from-[#1B93A4]/20 to-[#3B82F6]/20' : s.title.includes('IA') ? 'from-[#D946EF]/20 to-[#3B82F6]/20' : 'from-[#3B82F6]/20 to-[#1B93A4]/20'
  }));

  const SECTORS_DATA = getData('sectors').map((s, i) => ({
    ...s,
    icon: iconMap[s.name] || Building2,
    slug: ['reformas', 'clinicas', 'gestorias', 'comercios', 'autonomos', 'pymes'][i]
  }));

  const CASES_DATA = getData('cases');
  const METHOD_DATA = getData('method').map((m, i) => ({
    ...m,
    phase: `0${i + 1}`,
    icon: iconMap[m.title] || Search
  }));

  const TOOLS = [
    { icon: ClipboardList, title: t('home', 'imd_title'), badge: '3-5 min', description: t('home', 'imd_sub'), items: ['Roadmap 90 days', 'Quick Wins', 'Digital Score'], href: '/app/diagnostico', cta: t('home', 'imd_cta'), color: '#1B93A4' },
    { icon: Calculator, title: 'ROI Calculator', badge: 'Live', description: 'Calculate how much you can save.', items: ['Hours saved', 'Revenue increase', 'ROI Score'], href: '/app/calculadora', cta: 'Calculate', color: '#3B82F6' },
    { icon: MessageSquare, title: 'AI Agent Demo', badge: 'GPT inside', description: 'Test an AI Agent in real time.', items: ['Natural voice', 'WhatsApp demo', 'Real actions'], href: '/app/demo-agentes-ia', cta: 'Test now', color: '#D946EF' },
  ];

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
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button className="btn-gradient px-8 py-6">{t('home', 'cta_agendar')} <ArrowRight className="ml-2 w-5 h-5" /></Button>
                <Button className="btn-secondary px-8 py-6">{t('home', 'cta_servicios')}</Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {HERO_STATS.map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-3xl font-bold gradient-text"><AnimatedCounter end={stat.value} /></div>
                    <p className="text-xs text-[#8892A4]">{stat.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            <div className="hidden lg:block space-y-4">
              {[
                { icon: RefreshCw, title: t('home', 'sol_td'), desc: t('home', 'sol_td_sub'), color: '#1B93A4' },
                { icon: Bot, title: t('home', 'sol_ia'), desc: t('home', 'sol_ia_sub'), color: '#D946EF' },
                { icon: Code, title: t('home', 'sol_sis'), desc: t('home', 'sol_sis_sub'), color: '#3B82F6' },
              ].map((card, i) => (
                <div key={i} className="p-5 rounded-xl bg-[#161D30] border-l-4" style={{ borderColor: card.color }}>
                  <h3 className="font-bold text-white">{card.title}</h3>
                  <p className="text-sm text-[#8892A4]">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding border-t border-white/5">
        <div className="container-main">
          <SectionHeader label={t('home', 'serv_label')} title={t('home', 'serv_title')} gradient={t('home', 'serv_gradient')} />
          <div className="grid md:grid-cols-3 gap-6">
            {SERVICES_DATA.map((s, i) => (
              <div key={i} className="glass-card p-8 group">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-6`}><s.icon className="text-[#1B93A4] w-7 h-7" /></div>
                <h3 className="text-xl font-bold text-white mb-2">{s.title}</h3>
                <p className="text-sm text-[#8892A4] mb-6">{s.description}</p>
                <ul className="space-y-2 mb-8">
                  {s.features.map((f, ji) => <li key={ji} className="flex items-center gap-2 text-sm text-[#8892A4]"><CheckCircle2 className="w-4 h-4 text-[#1B93A4]" /> {f}</li>)}
                </ul>
                <Link to={s.href} className="text-[#1B93A4] text-sm font-bold flex items-center gap-2">{t('home', 'learn_more')} <ArrowRight className="w-4 h-4" /></Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="section-padding bg-[#0A0D14]">
        <div className="container-main">
          <SectionHeader label={t('home', 'prod_label')} title={t('home', 'prod_title')} gradient={t('home', 'prod_gradient')} />
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="glass-card p-10 border-[#1B93A4]/30">
              <span className="bg-[#1B93A4] text-white text-[10px] font-bold px-2 py-1 rounded mb-4 inline-block">{t('home', 'mando_tag')}</span>
              <h3 className="text-3xl font-black text-white mb-2">MANDO</h3>
              <p className="text-[#1B93A4] font-bold mb-4">{t('home', 'mando_sub')}</p>
              <p className="text-[#8892A4] mb-8">{t('home', 'mando_desc')}</p>
              <Button variant="outline" className="border-[#1B93A4] text-[#1B93A4]">Open MANDO</Button>
            </div>
            <div className="glass-card p-10 border-[#10b981]/30">
              <span className="bg-[#10b981] text-white text-[10px] font-bold px-2 py-1 rounded mb-4 inline-block">{t('home', 'trebol_tag')}</span>
              <h3 className="text-3xl font-black text-white mb-2">TRÉBOL</h3>
              <p className="text-[#10b981] font-bold mb-4">{t('home', 'trebol_sub')}</p>
              <p className="text-[#8892A4] mb-8">{t('home', 'trebol_desc')}</p>
              <Button variant="outline" className="border-[#10b981] text-[#10b981]">Open TRÉBOL</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className="section-padding">
        <div className="container-main">
          <SectionHeader label={t('home', 'sect_label')} title={t('home', 'sect_title')} gradient={t('home', 'sect_gradient')} />
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {SECTORS_DATA.map((s, i) => (
              <div key={i} className="glass-card p-5 text-center">
                <s.icon className="mx-auto text-[#1B93A4] w-8 h-8 mb-3" />
                <h4 className="text-white text-xs font-bold">{s.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Method */}
      <section className="section-padding bg-[#0A0D14]">
        <div className="container-main">
          <SectionHeader label={t('home', 'method_label')} title={t('home', 'method_title')} gradient={t('home', 'method_gradient')} />
          <div className="grid md:grid-cols-5 gap-4">
            {METHOD_DATA.map((m, i) => (
              <div key={i} className="glass-card p-6">
                <span className="text-3xl font-black text-white/5 mb-4 block">{m.phase}</span>
                <m.icon className="text-[#1B93A4] w-6 h-6 mb-4" />
                <h4 className="text-white font-bold mb-2">{m.title}</h4>
                <p className="text-xs text-[#8892A4]">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CEO */}
      <section className="section-padding">
        <div className="container-main">
          <div className="glass-card p-10 flex flex-col md:row items-center gap-10 max-w-4xl mx-auto">
            <img src={ASSETS.fotoRicardo} className="w-48 h-48 rounded-2xl object-cover" />
            <div>
              <h3 className="text-2xl font-black text-white mb-1">Ricardo Serrano</h3>
              <p className="text-[#1B93A4] font-bold mb-4">Founder & CEO</p>
              <p className="text-[#8892A4]">{t('home', 'founder_desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="section-padding bg-gradient-to-b from-transparent to-[#1B93A4]/10">
        <div className="container-main text-center">
          <h2 className="text-5xl font-black text-white mb-4">{t('home', 'cta_title')}</h2>
          <p className="text-xl text-[#8892A4] mb-10">{t('home', 'cta_sub')}</p>
          <Button className="btn-gradient px-12 py-8 text-xl font-black">{t('home', 'cta_agendar')} <Calendar className="ml-2" /></Button>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
