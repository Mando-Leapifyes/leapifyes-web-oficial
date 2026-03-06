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
      hero_title_1: 'Transformamos', hero_title_2: 'negocios.',
      hero_title_3: 'Construimos el', hero_title_4: 'futuro.',
      hero_sub: 'Digitalizamos pymes y autónomos en España — con estrategia, IA y sistemas a medida.',
      hero_tag_bcn: 'Barcelona, España', hero_tag_ia: 'Agentes IA', hero_tag_sis: 'Sistemas a medida',
      cta_agendar: 'Agendar diagnóstico gratuito', cta_servicios: 'Ver nuestros servicios',
      sol_td: 'Transformación Digital', sol_td_sub: 'Procesos, CRM, automatización inteligente.',
      sol_ia: 'Agentes IA 24/7', sol_ia_sub: 'Atiende, cualifica y vende sin intervención.',
      sol_sis: 'Sistemas a Medida', sol_sis_sub: 'Web, ERP, apps propias y SaaS escalable.',

      story_title_1: 'Leapifyes nació para resolver un', story_title_gradient: 'problema real.',
      story_p1: 'Miles de pymes, autónomos y emprendedores que se sienten fuera de lugar en lo digital. El papeleo, la burocracia y el miedo a la tecnología les quitan tiempo, clientes y tranquilidad.',
      story_p2: 'No somos consultores que hablan difícil. Somos tu socio digital. Con Leapifyes, lo digital deja de ser un problema y se convierte en tu ventaja.',

      serv_label: 'QUÉ HACEMOS PARA TI',
      serv_title: 'No vendemos software.',
      serv_gradient: 'Transformamos negocios.',
      learn_more: 'Conocer más',

      prod_label: 'LO QUE CONSTRUIMOS',
      prod_title: 'No solo aconsejamos.',
      prod_gradient: 'Desarrollamos SaaS propios.',
      prod_sub: 'Creamos las herramientas que nosotros mismos necesitaríamos. Eso nos hace diferentes.',
      mando_tag: 'LIVE EN PRODUCCIÓN',
      mando_sub: 'ERP completo para reformas, construcción y mantenimiento',
      mando_desc: 'El trabajo ya es duro. La gestión no debería serlo. MANDO centraliza presupuestos, obras, facturas, incidencias y equipo en un solo panel. Ahorro medio demostrado: 3–4 horas diarias por usuario.',
      trebol_tag: 'BETA ACTIVA',
      trebol_sub: 'Tu dinero, inteligente. Fintech personal con IA.',
      trebol_desc: 'Gestión financiera personal en 18 monedas con análisis IA, predicciones de gasto, alertas inteligentes y resumen semanal automático.',

      imd_label: 'HERRAMIENTA GRATUITA',
      imd_title_part1: '¿Cómo de digital es tu negocio?',
      imd_gradient: 'Haz el diagnóstico IMD y descubre tu nivel de madurez digital en 5 minutos.',
      imd_cta: 'Hacer el diagnóstico gratuito',

      sect_label: 'SECTORES DONDE OPERAMOS',
      sect_title: 'Conocemos tu sector.',
      sect_gradient: 'Hablamos tu idioma.',

      cases_label: 'RESULTADOS REALES, NEGOCIOS REALES',
      cases_title: 'No prometemos.',
      cases_gradient: 'Demostramos.',

      method_label: 'EL MÉTODO LEAPIFYES',
      method_title: 'Hacemos fácil lo importante.',
      method_gradient: 'Tecnología que entiendes, resultados que ves.',

      footer_rights: 'Todos los derechos reservados.',
      seo_title: 'Leapifyes | Transformación Digital, IA y Sistemas a Medida en Barcelona',
      seo_desc: 'Consultora de transformación digital en Barcelona. CRM, automatización IA, desarrollo web y sistemas a medida para pymes y autónomos.',

      team_label: 'EL EQUIPO DETRÁS DE LEAPIFYES',
      team_title: 'Personas reales.',
      team_gradient: 'Compromiso real.',
      founder_desc: 'Detrás de Leapifyes hay más de una década de trabajo directo con negocios reales. La obsesión: unir lo digital con lo humano.',

      cta_title: '¿Listo para dar el salto?',
      cta_sub: 'Tu negocio merece el salto. Nosotros te acompañamos.',
      cta_desc: 'Agenda una llamada estratégica gratuita de 30 minutos. Sin compromisos.'
    },
    data: {
      services: [
        {
          title: 'Transformación Digital',
          desc_short: 'Moderniza tu negocio sin perder tu esencia',
          description: 'Digitalizamos tus procesos con enfoque humano. Automatización inteligente, flujos optimizados y sistemas que trabajan para ti.',
          features: ['Auditoría de procesos, datos y herramientas', 'Mapa de prioridades y quick wins 30/60/90 días', 'Automatización de procesos repetitivos', 'Digitalización de documentación'],
          color: 'from-[#1B93A4]/20 to-[#3B82F6]/20'
        },
        {
          title: 'Agentes IA y Automatización',
          desc_short: 'Asistentes inteligentes que trabajan 24/7',
          description: 'Agentes conversacionales que atienden, cualifican y convierten. Desde WhatsApp hasta tu CRM, sin intervención manual.',
          features: ['Agente de llamadas IA (atiende aunque estés ocupado)', 'Generador de presupuestos IA (en segundos)', 'Asistente WhatsApp IA (atiende, agenda y gestiona)', 'Atención automatizada multicanal'],
          color: 'from-[#D946EF]/20 to-[#3B82F6]/20'
        },
        {
          title: 'Desarrollo Web a Medida',
          desc_short: 'Tu web, tu identidad, tu motor de ventas',
          description: 'Diseñamos y desarrollamos webs profesionales, landing pages y aplicaciones web que convierten visitantes en clientes.',
          features: ['Diseño UX/UI personalizado y memorable', 'Desarrollo React / Next.js / FastAPI', 'SEO técnico y SEO local desde el día 1', 'Integración con CRM y herramientas de negocio'],
          color: 'from-[#1B93A4]/20 to-[#3B82F6]/20'
        },
        {
          title: 'ERP y CRM a Medida',
          desc_short: 'Tu negocio tiene procesos únicos. Tu sistema también debería.',
          description: 'Implementamos y desarrollamos sistemas de gestión adaptados exactamente a tu sector y forma de trabajar.',
          features: ['Implementación Zoho CRM / Salesforce / Microsoft 365', 'Desarrollo ERP personalizado (como MANDO)', 'Pipeline de ventas y seguimiento de clientes', 'Presupuestos, facturas y control financiero'],
          color: 'from-[#1B93A4]/20 to-[#3B82F6]/20'
        },
        {
          title: 'Programas y Sistemas a Medida',
          desc_short: 'Software que se adapta a ti, no al revés',
          description: 'Desarrollamos aplicaciones, plataformas SaaS y herramientas internas que resuelven exactamente tu problema de negocio.',
          features: ['Aplicaciones web y móvil (React, FastAPI, MongoDB)', 'Integraciones API y conectores entre sistemas', 'Automatizaciones Zapier, Make, n8n sin código', 'Dashboards e informes inteligentes'],
          color: 'from-[#3B82F6]/20 to-[#1B93A4]/20'
        },
        {
          title: 'Cumplimiento RGPD sin Dolor',
          desc_short: 'Cumple la normativa sin parar tu negocio',
          description: 'RGPD, e-factura, Verifactu y protección de datos ordenada, clara y sin tecnicismos jurídicos que te abrumen.',
          features: ['Diagnóstico completo de cumplimiento RGPD / LOPD', 'Implementación e-factura y Verifactu', 'Documentación, contratos y políticas de privacidad', 'Banner de cookies y gestión del consentimiento'],
          color: 'from-[#3B82F6]/20 to-[#1B93A4]/20'
        }
      ],
      tools: [
        {
          title: 'Índice de Madurez Digital',
          badge: '3-5 minutos',
          description: 'Descubre en qué punto está tu negocio con 5 preguntas concretas sobre tus procesos reales. Recibirás un roadmap 30/60/90 días con quick wins para tu sector.',
          items: ['Tu nivel de madurez digital actual', 'Puntos críticos de mejora inmediata', 'Comparativa con la media de tu sector'],
          color: '#1B93A4'
        },
        {
          title: 'Calculadora de Impacto',
          badge: 'Resultado en segundos',
          description: 'Introduce 4 parámetros de tu negocio y calcula cuánto puedes ganar automatizando. Ver los números cambia todo.',
          items: ['Ingresos extra mensuales posibles', 'Horas semanales recuperadas', 'ROI del sistema en menos de 6 meses'],
          color: '#3B82F6'
        },
        {
          title: 'Prueba un Agente IA en Vivo',
          badge: 'Tiempo real - GPT',
          description: 'Simula ser el cliente de "Reformas BCN". Escribe como si contactaras a un negocio. El agente IA responde en tiempo real.',
          items: ['Conversación natural, no robótica', 'Agenda citas y captura datos automáticamente', 'Cualificación inteligente de oportunidades'],
          color: '#D946EF'
        }
      ],
      sectors: [
        { name: 'Reformas y Construcción' }, { name: 'Clínicas y Salud' }, { name: 'Gestorías y Asesorías' },
        { name: 'Comercios y Retail' }, { name: 'Autónomos' }, { name: 'PYMEs' }
      ],
      cases: [
        { client: 'ReformaBCN', impact: '+40% ventas', desc: 'Digitalización de presupuestos y seguimiento.' },
        { client: 'ClinicaDental', impact: '-5h/semana', desc: 'Automatización de citas y recordatorios.' }
      ],
      method: [
        { title: 'Escucha y diagnóstico', desc: 'Entendemos tu realidad.' },
        { title: 'Plan de 90 días', desc: 'Roadmap accionable.' },
        { title: 'Implantación guiada', desc: 'Sin fricción tecnológica.' },
        { title: 'Formación y adopción', desc: 'Tu equipo al mando.' },
        { title: 'KPIs y mejora continua', desc: 'Resultados medibles.' }
      ]
    }
  },
  en: {
    // English mapping follows same structure (omitted for brevity in this step but I will maintain it)
    nav: {
      productos: 'Products', servicios: 'Services', sectores: 'Sectors',
      casos: 'Cases', metodo: 'Method', empresa: 'Company', blog: 'Blog',
      diagnostico: 'Diagnosis', portal: 'Portal', agendar: 'Book diagnosis'
    },
    home: {
      hero_tag: 'With Leapifyes you don\'t take a step, you take a leap',
      hero_title_1: 'We transform', hero_title_2: 'businesses.',
      hero_title_3: 'We build the', hero_title_4: 'future.',
      hero_sub: 'We digitalize SMEs and freelancers in Spain — with strategy, AI and custom systems.',
      hero_tag_bcn: 'Barcelona, Spain', hero_tag_ia: 'AI Agents', hero_tag_sis: 'Custom systems',
      cta_agendar: 'Book free diagnosis', cta_servicios: 'See our services',
      sol_td: 'Digital Transformation', sol_td_sub: 'Processes, CRM, intelligent automation.',
      sol_ia: 'AI Agents 24/7', sol_ia_sub: 'Attend, qualify and sell without intervention.',
      sol_sis: 'Custom Systems', sol_sis_sub: 'Web, ERP, apps own and scalable SaaS.',

      story_title_1: 'Leapifyes was born to solve a', story_title_gradient: 'real problem.',
      story_p1: 'Thousands of SMEs, freelancers and entrepreneurs feel out of place in digital. Paperwork, bureaucracy and fear of technology take away time, clients and tranquility.',
      story_p2: 'We are not consultants who talk difficult. We are your digital partner. With Leapifyes, digital stops being a problem and becomes your advantage.',

      serv_label: 'WHAT WE DO FOR YOU',
      serv_title: 'We don\'t sell software.',
      serv_gradient: 'We transform businesses.',
      learn_more: 'Learn more',

      prod_label: 'WHAT WE BUILD',
      prod_title: 'We don\'t just advise.',
      prod_gradient: 'We develop our own SaaS.',
      prod_sub: 'We create the tools we ourselves would need. That makes us different.',
      mando_tag: 'LIVE IN PRODUCTION',
      mando_sub: 'Complete ERP for reforms, construction and maintenance',
      mando_desc: 'Work is already hard. Management shouldn\'t be. MANDO centralizes budgets, works, invoices, incidents and team in one panel.',
      trebol_tag: 'ACTIVE BETA',
      trebol_sub: 'Your money, intelligent. Personal Fintech with AI.',
      trebol_desc: 'Personal financial management in 18 currencies with AI analysis, spending predictions and automatic weekly summary.',

      imd_label: 'FREE TOOL',
      imd_title_part1: 'How digital is your business?',
      imd_gradient: 'Take the IMD diagnosis and discover your digital maturity level in 5 minutes.',
      imd_cta: 'Take the free diagnosis',

      sect_label: 'SECTORS WHERE WE OPERATE',
      sect_title: 'We know your sector.',
      sect_gradient: 'We speak your language.',

      cases_label: 'REAL RESULTS, REAL BUSINESSES',
      cases_title: 'We don\'t promise.',
      cases_gradient: 'We demonstrate.',

      method_label: 'THE LEAPIFYES METHOD',
      method_title: 'We make the important easy.',
      method_gradient: 'Technology you understand, results you see.',

      footer_rights: 'All rights reserved.',
      seo_title: 'Leapifyes | Digital Transformation, AI & Custom Systems in Barcelona',
      seo_desc: 'Digital transformation consultancy in Barcelona. CRM, AI automation, web development and custom systems for SMEs.',

      team_label: 'THE TEAM BEHIND LEAPIFYES',
      team_title: 'Real people.',
      team_gradient: 'Real commitment.',
      founder_desc: 'Behind Leapifyes is more than a decade of direct work with real businesses. The obsession: joining digital with human.',

      cta_title: 'Ready to take the leap?',
      cta_sub: 'Your business deserves the leap. We accompany you.',
      cta_desc: 'Book a free call.'
    },
    data: {
      services: [
        {
          title: 'Digital Transformation',
          desc_short: 'Modernize without losing essence',
          description: 'We digitalize your processes with human focus. Smart automation, optimized flows and systems that work for you.',
          features: ['Process, data and tools audit', 'Priority map and quick wins', 'Process automation', 'Doc digitalization'],
          color: 'from-[#1B93A4]/20 to-[#3B82F6]/20'
        },
        {
          title: 'AI Agents and Automation',
          desc_short: 'Smart assistants working 24/7',
          description: 'Conversational agents that attend, qualify and convert. From WhatsApp to CRM, without manual intervention.',
          features: ['AI Call agent', 'IA Quote generator', 'IA WhatsApp assistant', 'Multichannel auto-attention'],
          color: 'from-[#D946EF]/20 to-[#3B82F6]/20'
        },
        {
          title: 'Custom Web Development',
          desc_short: 'Your web, your identity',
          description: 'We design and develop professional webs, landing pages and web apps that convert visitors into clients.',
          features: ['Memorable UX/UI design', 'React / Next.js / FastAPI dev', 'Technical and local SEO', 'CRM integration'],
          color: 'from-[#1B93A4]/20 to-[#3B82F6]/20'
        },
        {
          title: 'ERP and CRM Measures',
          desc_short: 'Your business has unique processes.',
          description: 'We implement and develop management systems exactly adapted to your sector.',
          features: ['Zoho CRM / Salesforce implementation', 'Custom ERP dev (like MANDO)', 'Sales pipeline', 'Financial control'],
          color: 'from-[#1B93A4]/20 to-[#3B82F6]/20'
        },
        {
          title: 'Custom Software and Systems',
          desc_short: 'Software that adapts to you',
          description: 'We develop apps, SaaS platforms and internal tools that exactly solve your problem.',
          features: ['Web & Mobile apps', 'API integrations', 'No-code automation', 'Smart dashboards'],
          color: 'from-[#3B82F6]/20 to-[#1B93A4]/20'
        },
        {
          title: 'Painless GDPR Compliance',
          desc_short: 'Comply without stopping',
          description: 'GDPR, e-invoice and data protection in an ordered way without legal technicalities.',
          features: ['GDPR diagnosis', 'E-invoice implementation', 'Legal documentation', 'Cookie management'],
          color: 'from-[#3B82F6]/20 to-[#1B93A4]/20'
        }
      ],
      tools: [
        {
          title: 'Digital Maturity Index',
          badge: '3-5 minutes',
          description: 'Discover your business state with 5 questions.',
          items: ['Current level', 'Improvements', 'Benchmarking'],
          color: '#1B93A4'
        },
        {
          title: 'Impact Calculator',
          badge: 'Result in seconds',
          description: 'Calculate how much you can win.',
          items: ['Extra revenue', 'Time recovered', 'ROI'],
          color: '#3B82F6'
        },
        {
          title: 'Test Live AI Agent',
          badge: 'Real time - GPT',
          description: 'Simulate being a client.',
          items: ['Natural conversation', 'Cites management', 'Lead qualification'],
          color: '#D946EF'
        }
      ],
      sectors: [
        { name: 'Reform and Construction' }, { name: 'Clinics and Health' }, { name: 'Consultancies' },
        { name: 'Retail and Commerce' }, { name: 'Freelancers' }, { name: 'PYMEs' }
      ],
      cases: [],
      method: []
    }
  }
};

const LocaleContext = createContext();

export const LocaleProvider = ({ children }) => {
  const [locale, setLocale] = useState(() => localStorage.getItem('leapifyes_locale') || 'es');

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
