import { createContext, useContext, useState, useEffect } from 'react';

export const TRANSLATIONS = {
  es: {
    nav: {
      productos: 'Productos', servicios: 'Servicios', sectores: 'Sectores',
      casos: 'Casos', metodo: 'Método', empresa: 'Empresa', blog: 'Blog',
      diagnostico: 'Diagnóstico', portal: 'Portal', agendar: 'Agendar diagnóstico'
    },
    home: {
      hero_tag: 'Con Leapifyes no das un paso, das un salto',
      hero_title_1: 'Transformamos', hero_title_2: 'negocios.', hero_title_3: 'Construimos el', hero_title_4: 'futuro.',
      hero_sub: 'Digitalizamos pymes y autónomos en España — con estrategia, IA y sistemas a medida.',
      cta_agendar: 'Agendar diagnóstico gratuito', cta_servicios: 'Ver nuestros servicios',
      tag_barcelona: 'Barcelona, España', tag_ia: 'Agentes IA', tag_sistemas: 'Sistemas a medida',
      sol_td: 'Transformación Digital', sol_td_sub: 'Procesos, CRM, automatización inteligente.',
      sol_ia: 'Agentes IA 24/7', sol_ia_sub: 'Atiende, cualifica y vende sin intervención.',
      sol_sis: 'Sistemas a Medida', sol_sis_sub: 'Web, ERP, apps propias y SaaS escalable.',
      planes_tag: 'Planes & Precios', planes_hook: 'Colaboraciones diseñadas para generar impacto real.',
      planes_sub: 'Fee mensual o por hitos. Sin permanencia. Sin sorpresas.',
      plan_cta: 'Ver detalle del plan', plan_popular: 'Más popular',
      imd_tag: 'Herramienta gratuita', imd_title: '¿Cómo de digital es tu negocio?',
      imd_sub: 'Haz el diagnóstico IMD y descubre tu nivel de madurez digital en 5 minutos.',
      imd_cta: 'Hacer el diagnóstico gratuito',
      footer_rights: 'Todos los derechos reservados.',
      seo_title: 'Leapifyes | Transformación Digital, IA y Sistemas a Medida en Barcelona',
      seo_desc: 'Consultora de transformación digital en Barcelona. CRM, automatización IA, desarrollo web y sistemas a medida para pymes y autónomos. Diagnóstico gratuito.',
      stat_years: 'años', stat_years_desc: 'Experiencia en ventas y transformación digital',
      stat_saas_desc: 'Propios en producción: MANDO y TRÉBOL Finance',
      stat_fee_desc: 'Fee/retainer — nunca por horas',
      stat_cases: 'casos', stat_cases_desc: 'Éxitos documentados en Barcelona',
      serv_label: 'Qué hacemos para ti', serv_title: 'No vendemos software.', serv_gradient: 'Transformamos negocios.',
      learn_more: 'Conocer más',
      tools_title: 'Herramientas interactivas',
      prod_label: 'Lo que construimos', prod_title: 'No solo aconsejamos.', prod_gradient: 'Desarrollamos SaaS propios.',
      prod_sub: 'Creamos las herramientas que nosotros mismos necesitaríamos. Eso nos hace diferentes.',
      mando_tag: 'LIVE EN PRODUCCIÓN', mando_sub: 'ERP completo para reformas, construcción y mantenimiento', mando_desc: 'El trabajo ya es duro. La gestión no debería serlo. MANDO centraliza presupuestos, obras, facturas, incidencias y equipo en un solo panel. Ahorro medio demostrado: 3–4 horas diarias por usuario.',
      trebol_tag: 'BETA ACTIVA', trebol_sub: 'Tu dinero, inteligente. Fintech personal con IA.', trebol_desc: 'Gestión financiera personal en 18 monedas con análisis IA, predicciones de gasto, alertas inteligentes y resumen semanal automático.',
      sect_label: 'Sectores donde operamos', sect_title: 'Conocemos tu sector.', sect_gradient: 'Hablamos tu idioma.',
      cases_label: 'Resultados reales, negocios reales', cases_title: 'No prometemos.', cases_gradient: 'Demostramos.',
      method_label: 'El método Leapifyes', method_title: 'Hacemos fácil lo importante.', method_gradient: 'Tecnología que entiendes, resultados que ves.',
      team_label: 'El equipo detrás de Leapifyes', team_title: 'Personas reales.', team_gradient: 'Compromiso real.',
      team_sub: 'En Leapifyes combinamos experiencia en ventas, CRM y transformación digital con tecnología de primer nivel.',
      founder_desc: 'Detrás de Leapifyes hay más de una década de trabajo directo con negocios reales. La obsesión: unir lo digital con lo humano.',
      cta_title: '¿Listo para dar el salto?', cta_sub: 'Tu negocio merece el salto. Nosotros te acompañamos.', cta_desc: 'Agenda una llamada estratégica gratuita de 30 minutos. Sin compromisos.'
    },
    empresa: {
      seo_title: 'Sobre Nosotros | Leapifyes — Transformación Digital Barcelona',
      seo_desc: 'Leapifyes nació para resolver un problema real: hacer la transformación digital accesible para pymes y autónomos en España.',
      hero_tag: 'Sobre Nosotros',
      hero_title: 'Somos tu socio digital',
      hero_sub: 'Con Leapifyes, lo digital deja de ser un problema y se convierte en tu ventaja.',
      hist_title: 'Nuestra Historia',
      hist_p1: 'Leapifyes nació para resolver un problema real: miles de pymes, autónomos y emprendedores que se sienten fuera de lugar en lo digital.',
      hist_p2: 'Creemos que la transformación digital no puede ser un lujo: debe ser simple y cercana.',
      vision_title: 'Visión', vision_text: 'Que ninguna pyme ni autónomo quede atrás en lo digital.',
      mision_title: 'Misión', mision_text: 'Simplificamos lo digital: solo lo necesario, mejores resultados.',
      prop_title: 'Propósito', prop_text: 'Democratizamos la digitalización para todos los negocios.',
      founder_title: 'Nuestro Fundador',
      founder_sub: 'Transformador digital con visión humana.',
      team_title: 'Nuestro Equipo',
      team_sub: 'Un equipo multidisciplinar que combina tecnología y empatía.',
      bcn_title: 'Barcelona, nuestra casa',
      bcn_sub: 'Conocemos el tejido empresarial catalán, sus retos y oportunidades.',
      cta_title: '¿Conectamos?',
      cta_sub: 'Cuéntanos qué tienes en mente.'
    },
    imd: {
      title: '¿Cómo de digital es tu negocio?',
      sub: 'Diagnóstico inteligente en 5 minutos. Recibe un plan de acción con IA.',
      start: 'Iniciar diagnóstico',
      next: 'Siguiente',
      restart: 'Repetir diagnóstico',
      results_title: 'Tu Índice de Madurez Digital',
      global_score: 'Puntuación global',
      comparative: 'Comparativa sector',
      ai_analysis: 'Análisis IA Leapifyes',
      analyzing: 'Analizando tu diagnóstico...',
      step1_title: 'Estrategia y Negocio',
      step2_title: 'Procesos',
      step3_title: 'Organización y Personas',
      step4_title: 'Infraestructura',
      step5_title: 'Productos y Servicios'
    },
    footer: {
      brand_sub: 'Transformamos pymes y autónomos en negocios digitales con estrategia, herramientas y acompañamiento humano.',
      location: 'Barcelona, España',
      col_services: 'Servicios',
      col_products: 'Productos',
      col_company: 'Empresa',
      col_legal: 'Legal',
      manage_cookies: 'Gestionar cookies',
      bottom_text: 'DigitalLeap Solutions S.L.U. CIF B22984454. Leapifyes es una marca comercial de DigitalLeap Solutions S.L.U.',
      made_with: 'Desarrollado con ❤️ en Barcelona'
    },
    cookies: {
      title: 'Utilizamos cookies',
      description: 'Usamos cookies técnicas (esenciales) y cookies de análisis y marketing para mejorar tu experiencia.',
      accept_all: 'Aceptar todo',
      reject: 'Rechazar',
      settings: 'Configurar'
    },
    data: {
      plans_detail: {
        'start': { name: 'START', tagline: 'El primer paso', price: '497', badge: 'Ideal para comenzar', perfil: "Para autónomos y pymes que quieren orden.", incluye: ['Diagnóstico digital', 'CRM configurado'], proceso: [{ title: 'Diagnostico', desc: 'Analisis' }], resultados: [{ val: '3-5h', label: 'Horas', desc: 'Tiempo' }] },
        'essential': { name: 'ESSENTIAL', tagline: 'Crecimiento', price: '750', badge: 'Popular', perfil: "Para pymes con equipo.", incluye: ['CRM avanzado'], proceso: [{ title: 'Auditoria', desc: 'Mapeo' }], resultados: [{ val: '5 pers.', label: 'Equipo', desc: 'Alineado' }] },
        'pro': { name: 'PRO', tagline: 'IA & Escala', price: '950', badge: '⭐ TOP', perfil: "Para escalar con IA.", incluye: ['Agente IA'], proceso: [{ title: 'IA Dev', desc: 'Despliegue' }], resultados: [{ val: '24/7', label: 'IA', desc: 'Atencion' }] },
        'premium-360': { name: 'PREMIUM 360', tagline: 'Transformación total', price: '2.000', badge: 'VIP', perfil: "Transformación integral.", incluye: ['Todo Leapifyes'], proceso: [{ title: '360 Audit', desc: 'Total' }], resultados: [{ val: '100%', label: 'Digital', desc: 'Total' }] }
      },
      imd_dimensions: [
        { id: 'estrategia', label: 'Estrategia', icon: '🎯', questions: [{ id: 'e1', text: '¿Tienes plan digital?', options: [{ label: 'No', value: 0 }, { label: 'Sí', value: 100 }] }] },
        { id: 'procesos', label: 'Procesos', icon: '⚙️', questions: [{ id: 'p1', text: '¿Papel o digital?', options: [{ label: 'Papel', value: 0 }, { label: 'Digital', value: 100 }] }] }
      ]
    }
  },
  en: {
    nav: {
      productos: 'Products', servicios: 'Services', sectores: 'Sectors',
      casos: 'Cases', metodo: 'Method', empresa: 'Company', blog: 'Blog',
      diagnostico: 'Diagnosis', portal: 'Portal', agendar: 'Book diagnosis'
    },
    home: {
      hero_tag: 'With Leapifyes you don\'t take a step, you take a leap',
      hero_title_1: 'We transform', hero_title_2: 'businesses.', hero_title_3: 'We build the', hero_title_4: 'future.',
      hero_sub: 'We digitalize SMEs and freelancers in Spain — with strategy, AI and custom systems.',
      cta_agendar: 'Book free diagnosis', cta_servicios: 'See our services',
      tag_barcelona: 'Barcelona, Spain', tag_ia: 'AI Agents', tag_sistemas: 'Custom systems',
      sol_td: 'Digital Transformation', sol_td_sub: 'Processes, CRM, intelligent automation.',
      sol_ia: 'AI Agents 24/7', sol_ia_sub: 'Attend, qualify and sell without intervention.',
      sol_sis: 'Custom Systems', sol_sis_sub: 'Web, ERP, own apps and scalable SaaS.',
      planes_tag: 'Plans & Pricing', planes_hook: 'Collaborations designed to generate real impact.',
      planes_sub: 'Monthly or milestone fee. No lock-in. No surprises.',
      plan_cta: 'See plan details', plan_popular: 'Most popular',
      imd_tag: 'Free tool', imd_title: 'How digital is your business?',
      imd_sub: 'Take the IMD diagnosis and discover your digital maturity level in 5 minutes.',
      imd_cta: 'Take the free diagnosis',
      footer_rights: 'All rights reserved.',
      seo_title: 'Leapifyes | Digital Transformation, AI & Custom Systems in Barcelona',
      seo_desc: 'Digital transformation consultancy in Barcelona. CRM, AI automation, web development and custom systems for SMEs and freelancers. Free diagnosis.',
      stat_years: 'years', stat_years_desc: 'Experience in sales and digital transformation',
      stat_saas_desc: 'Own SaaS in production: MANDO and TRÉBOL Finance',
      stat_fee_desc: 'Fee/retainer — never hourly',
      stat_cases: 'cases', stat_cases_desc: 'Documented successes in Barcelona',
      serv_label: 'What we do for you', serv_title: 'We don\'t sell software.', serv_gradient: 'We transform businesses.',
      learn_more: 'Learn more',
      tools_title: 'Interactive tools',
      prod_label: 'What we build', prod_title: 'We don\'t just advise.', prod_gradient: 'We develop our own SaaS.',
      prod_sub: 'We create the tools we ourselves would need. That makes us different.',
      mando_tag: 'LIVE IN PRODUCTION', mando_sub: 'Complete ERP for reforms, construction and maintenance', mando_desc: 'Work is already hard. Management shouldn\'t be. MANDO centralizes budgets, works, invoices, incidents and team in one panel.',
      trebol_tag: 'ACTIVE BETA', trebol_sub: 'Your money, intelligent. Personal Fintech with AI.', trebol_desc: 'Personal financial management in 18 currencies with AI analysis, spending predictions and automatic weekly summary.',
      sect_label: 'Sectors where we operate', sect_title: 'We know your sector.', sect_gradient: 'We speak your language.',
      cases_label: 'Real results, real businesses', cases_title: 'We don\'t promise.', cases_gradient: 'We demonstrate.',
      method_label: 'The Leapifyes method', method_title: 'We make the important easy.', method_gradient: 'Technology you understand, results you see.',
      team_label: 'The team behind Leapifyes', team_title: 'Real people.', team_gradient: 'Real commitment.',
      team_sub: 'At Leapifyes we combine experience in sales, CRM and digital transformation with first-class technology.',
      founder_desc: 'Behind Leapifyes is more than a decade of direct work with real businesses. The obsession: joining digital with human.',
      cta_title: 'Ready to take the leap?', cta_sub: 'Your business deserves the leap. We accompany you.', cta_desc: 'Book a free 30-minute strategic call. No commitments.'
    },
    empresa: {
      seo_title: 'About Us | Leapifyes — Digital Transformation Barcelona',
      seo_desc: 'Leapifyes was born to solve a real problem: making digital transformation accessible for SMEs and freelancers in Spain.',
      hero_tag: 'About Us',
      hero_title: 'We are your digital partner',
      hero_sub: 'With Leapifyes, digital stops being a problem and becomes your advantage.',
      hist_title: 'Our History',
      hist_p1: 'Leapifyes was born to solve a real problem: thousands of SMEs and freelancers who feel out of place in digital.',
      hist_p2: 'We believe digital transformation cannot be a luxury: it must be simple and close.',
      vision_title: 'Vision', vision_text: 'That no SME or freelancer is left behind in digital.',
      mision_title: 'Mission', mision_text: 'We simplify digital: only what is necessary, better results.',
      prop_title: 'Purpose', prop_text: 'We democratize digitalization for all businesses.',
      founder_title: 'Our Founder',
      founder_sub: 'Digital transformer with a human vision.',
      team_title: 'Our Team',
      team_sub: 'A multidisciplinary team combining technology and empathy.',
      bcn_title: 'Barcelona, our home',
      bcn_sub: 'We know the Catalan business fabric, its challenges and opportunities.',
      cta_title: 'Connect?',
      cta_sub: 'Tell us what you have in mind.'
    },
    imd: {
      title: 'How digital is your business?',
      sub: 'Smart diagnosis in 5 minutes. Receive an AI action plan.',
      start: 'Start diagnosis',
      next: 'Next',
      restart: 'Repeat diagnosis',
      results_title: 'Your Digital Maturity Index',
      global_score: 'Global score',
      comparative: 'Industry benchmarking',
      ai_analysis: 'Leapifyes AI Analysis',
      analyzing: 'Analyzing your diagnosis...',
      step1_title: 'Strategy & Business',
      step2_title: 'Processes',
      step3_title: 'Organization & People',
      step4_title: 'Infrastructure',
      step5_title: 'Products & Services'
    },
    footer: {
      brand_sub: 'We transform SMEs and freelancers into digital businesses with strategy, tools, and human support.',
      location: 'Barcelona, Spain',
      col_services: 'Services',
      col_products: 'Products',
      col_company: 'Company',
      col_legal: 'Legal',
      manage_cookies: 'Manage cookies',
      bottom_text: 'DigitalLeap Solutions S.L.U. CIF B22984454. Leapifyes is a trademark of DigitalLeap Solutions S.L.U.',
      made_with: 'Developed with ❤️ in Barcelona'
    },
    cookies: {
      title: 'We use cookies',
      description: 'We use technical (essential) cookies and analytics/marketing cookies to improve your experience.',
      accept_all: 'Accept all',
      reject: 'Reject',
      settings: 'Settings'
    },
    data: {
      plans_detail: {
        'start': { name: 'START', tagline: 'The first step', price: '497', badge: 'Ideal to start', perfil: "For freelancers and SMEs.", incluye: ['Digital diagnosis', 'CRM setup'], proceso: [{ title: 'Diagnosis', desc: 'Analysis' }], resultados: [{ val: '3-5h', label: 'Hours', desc: 'Time' }] },
        'essential': { name: 'ESSENTIAL', tagline: 'Growth', price: '750', badge: 'Popular', perfil: "For SMEs with team.", incluye: ['Advanced CRM'], proceso: [{ title: 'Audit', desc: 'Mapping' }], resultados: [{ val: '5 pers.', label: 'Team', desc: 'Aligned' }] },
        'pro': { name: 'PRO', tagline: 'AI & Scale', price: '950', badge: '⭐ TOP', perfil: "Scale with IA.", incluye: ['AI Agent'], proceso: [{ title: 'AI Dev', desc: 'Deployment' }], resultados: [{ val: '24/7', label: 'AI', desc: 'Attention' }] },
        'premium-360': { name: 'PREMIUM 360', tagline: 'Complete transformation', price: '2,000', badge: 'VIP', perfil: "Integral transformation.", incluye: ['All Leapifyes'], proceso: [{ title: '360 Audit', desc: 'Total' }], resultados: [{ val: '100%', label: 'Digital', desc: 'Total' }] }
      },
      imd_dimensions: [
        { id: 'estrategia', label: 'Strategy', icon: '🎯', questions: [{ id: 'e1', text: 'Do you have a digital plan?', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 100 }] }] },
        { id: 'procesos', label: 'Processes', icon: '⚙️', questions: [{ id: 'p1', text: 'Paper or digital?', options: [{ label: 'Paper', value: 0 }, { label: 'Digital', value: 100 }] }] }
      ]
    }
  }
};

const LocaleContext = createContext();

export const LocaleProvider = ({ children }) => {
  const [locale, setLocale] = useState(() => {
    return localStorage.getItem('leapifyes_locale') || 'es';
  });

  useEffect(() => {
    localStorage.setItem('leapifyes_locale', locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const t = (section, key) => {
    const lang = TRANSLATIONS[locale] || TRANSLATIONS['es'];
    return lang[section]?.[key] || TRANSLATIONS['es'][section]?.[key] || key;
  };

  const getData = (key) => {
    const lang = TRANSLATIONS[locale] || TRANSLATIONS['es'];
    return lang.data?.[key] || TRANSLATIONS['es'].data?.[key] || [];
  };

  const getNestedData = (section, key) => {
    const lang = TRANSLATIONS[locale] || TRANSLATIONS['es'];
    return lang.data?.[section]?.[key] || TRANSLATIONS['es'].data?.[section]?.[key] || null;
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t, getData, getNestedData }}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = () => useContext(LocaleContext);
export default LocaleContext;
