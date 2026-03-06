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
    serv_detail: {
      back_plans: 'Ver todos los planes', monthly_inv: 'Inversión mensual', from: 'Desde', req_info: 'Solicitar información', for_whom: '¿Para quién es este plan?', what_includes: 'Qué incluye el plan', how_works: '¿Cómo funciona? El proceso', results_expect: 'Resultados que puedes esperar', start_today: 'Empieza hoy mismo', start_sub: 'Completa tus datos y nos pondremos en contacto contigo para una videollamada de 30 minutos sin compromiso.', selected_serv: 'Servicio seleccionado', full_name: 'Nombre completo', work_email: 'Email laboral', phone: 'Teléfono', business_name: 'Nombre de tu negocio', industry: 'Sector / Industria', why_interest: '¿Por qué te interesa este servicio?', placeholder_msg: 'Cuéntanos brevemente qué problema quieres resolver...', sending: 'Enviando...', req_meeting: 'Solicitar reunión estratégica', privacy_msg: 'Al enviar este formulario aceptas nuestra política de privacidad. Tus datos serán tratados exclusivamente para responder a tu solicitud de servicio.', success_title: '¡Solicitud recibida!', success_msg: 'Gracias por tu interés. Nos pondremos en contacto contigo en menos de 24 horas laborables para agendar tu reunión estratégica.', back_home: 'Volver al inicio'
    },
    empresa: {
      seo_title: 'Sobre Nosotros | Leapifyes — Transformación Digital Barcelona', seo_desc: 'Leapifyes nació para resolver un problema real: hacer la transformación digital accesible para pymes y autónomos en España.', hero_tag: 'Sobre Nosotros', hero_title: 'Somos tu socio digital', hero_sub: 'Con Leapifyes, lo digital deja de ser un problema y se convierte en tu ventaja.', hist_title: 'Nuestra Historia', hist_p1: 'Leapifyes nació para resolver un problema real: miles de pymes, autónomos y emprendedores que se sienten fuera de lugar en lo digital.', hist_p2: 'Creemos que la transformación digital no puede ser un lujo: debe ser simple y cercana.', vision_title: 'Visión', vision_text: 'Que ninguna pyme ni autónomo quede atrás en lo digital.', mision_title: 'Misión', mision_text: 'Simplificamos lo digital: solo lo necesario, mejores resultados.', prop_title: 'Propósito', prop_text: 'Democratizamos la digitalización para todos los negocios.', founder_title: 'Nuestro Fundador', founder_sub: 'Transformador digital con visión humana.', team_title: 'Nuestro Equipo', team_sub: 'Un equipo multidisciplinar que combina tecnología y empatía.', bcn_title: 'Barcelona, nuestra casa', bcn_sub: 'Conocemos el tejido empresarial catalán, sus retos y oportunidades.', cta_title: '¿Conectamos?', cta_sub: 'Cuéntanos qué tienes en mente.'
    },
    imd: {
      title: '¿Cómo de digital es tu negocio?', sub: 'Diagnóstico inteligente en 5 minutos. Recibe un plan de acción con IA.', start: 'Iniciar diagnóstico', next: 'Siguiente', restart: 'Repetir diagnóstico', results_title: 'Tu Índice de Madurez Digital', global_score: 'Puntuación global', comparative: 'Comparativa sector', ai_analysis: 'Análisis IA Leapifyes', analyzing: 'Analizando tu diagnóstico...', step1_title: 'Estrategia y Negocio', step2_title: 'Procesos', step3_title: 'Organización y Personas', step4_title: 'Infraestructura', step5_title: 'Productos y Servicios'
    },
    data: {
      services: [
        { title: 'Transformación Digital', description: 'Moderniza tu negocio sin perder tu esencia.', features: ['Auditoría de procesos', 'Mapa de prioridades', 'Automatización de flujos'] },
        { title: 'Agentes IA y Automatización', description: 'Asistentes inteligentes que trabajan 24/7.', features: ['Atención al cliente IA', 'Precalificación de leads', 'Integración con CRM'] },
        { title: 'Desarrollo Web a Medida', description: 'Tu web, tu identidad, tu motor de ventas.', features: ['Diseño UX/UI premium', 'Optimización SEO', 'Integración con herramientas'] }
      ],
      plans_detail: {
        'start': { name: 'START', tagline: 'El primer paso para ordenar tu negocio', price: '497', badge: 'Ideal para comenzar', perfil: "Autónomos y pymes que quieren ordenar su negocio digital sin complicaciones.", incluye: ['Diagnóstico digital completo', 'CRM básico configurado', '1 automatización crítica', 'Seguimiento mensual'], proceso: [{ title: 'Diagnóstico inicial', desc: 'Analizamos tus procesos.' }, { title: 'Plan de acción', desc: 'Objetivos a 30 días.' }], resultados: [{ val: '3-5h', label: 'Horas libres', desc: 'Tiempo recuperado semanalmente.' }] },
        'essential': { name: 'ESSENTIAL', tagline: 'Estructura sólida para crecer', price: '750', badge: 'El más elegido', perfil: "Pymes con equipo que necesitan procesos claros.", incluye: ['Todo el plan START', 'CRM avanzado', '3 automatizaciones', 'Formación equipo'], proceso: [{ title: 'Auditoría', desc: 'Mapeo de equipo.' }], resultados: [{ val: '+45%', label: 'Eficiencia', desc: 'Productividad real.' }] },
        'pro': { name: 'PRO', tagline: 'Escalabilidad con IA', price: '950', badge: '⭐ Más popular', perfil: "Empresas en crecimiento que quieren escalar rápido.", incluye: ['Todo el plan ESSENTIAL', 'Agente IA incluido', 'Automatizaciones sin límite'], proceso: [{ title: 'Estrategia IA', desc: 'Ventaja competitiva.' }], resultados: [{ val: 'x2', label: 'Capacidad', desc: 'Sin contratar más.' }] },
        'premium-360': { name: 'PREMIUM 360', tagline: 'Transformación definitiva', price: '2.000', badge: 'Máxima transformación', perfil: "Empresas que necesitan una transformación 360º.", incluye: ['Estrategia integral', 'Sistemas a medida', 'Soporte VIP'], proceso: [{ title: 'Inmersión', desc: 'Auditoría total.' }], resultados: [{ val: '100%', label: 'Digitalización', desc: 'Empresa conectada.' }] }
      },
      sectors: [{ name: 'Reformas y Construcción' }, { name: 'Clínicas y Salud' }, { name: 'Gestorías y Asesorías' }, { name: 'Comercios y Retail' }, { name: 'Autónomos' }, { name: 'PYMEs' }],
      cases: [
        { client: 'ReformaBCN', sector: 'Reformas', impact: '+40% ventas', desc: 'Digitalización de presupuestos y seguimiento.' },
        { client: 'ClinicaDental', sector: 'Salud', impact: '-5h/semana', desc: 'Automatización de citas y recordatorios.' }
      ],
      method: [
        { title: 'Escucha y diagnóstico', desc: 'Entendemos tu realidad.' },
        { title: 'Plan de 90 días', desc: 'Roadmap accionable.' },
        { title: 'Implantación guiada', desc: 'Sin fricción tecnológica.' },
        { title: 'Formación y adopción', desc: 'Tu equipo al mando.' },
        { title: 'KPIs y mejora continua', desc: 'Resultados medibles.' }
      ],
      imd_dimensions: [
        { id: 'estrategia', label: 'Estrategia', icon: '🎯', questions: [{ id: 'e1', text: '¿Tienes plan digital?', options: [{ label: 'No', value: 0 }, { label: 'Sí', value: 100 }] }] },
        { id: 'procesos', label: 'Procesos', icon: '⚙️', questions: [{ id: 'p1', text: '¿Papel o digital?', options: [{ label: 'Papel', value: 0 }, { label: 'Digital', value: 100 }] }] }
      ]
    }
  },
  en: {
    nav: {
      productos: 'Products', servicios: 'Services', sectores: 'Sectors', casos: 'Cases', metodo: 'Method', empresa: 'Company', blog: 'Blog', diagnostico: 'Diagnosis', portal: 'Portal', agendar: 'Book diagnosis'
    },
    home: {
      hero_tag: 'With Leapifyes you don\'t take a step, you take a leap', hero_title_1: 'We transform', hero_title_2: 'businesses.', hero_title_3: 'We build the', hero_title_4: 'future.', hero_sub: 'We digitalize SMEs and freelancers in Spain — with strategy, AI and custom systems.', cta_agendar: 'Book free diagnosis', cta_servicios: 'See our services', tag_barcelona: 'Barcelona, Spain', tag_ia: 'AI Agents', tag_sistemas: 'Custom systems', sol_td: 'Digital Transformation', sol_td_sub: 'Processes, CRM, intelligent automation.', sol_ia: 'AI Agents 24/7', sol_ia_sub: 'Attend, qualify and sell without intervention.', sol_sis: 'Custom Systems', sol_sis_sub: 'Web, ERP, own apps and scalable SaaS.', planes_tag: 'Plans & Pricing', planes_hook: 'Collaborations designed to generate real impact.', planes_sub: 'Monthly or milestone fee. No lock-in. No surprises.', plan_cta: 'See plan details', plan_popular: 'Most popular', imd_tag: 'Free tool', imd_title: 'How digital is your business?', imd_sub: 'Take the IMD diagnosis and discover your digital maturity level in 5 minutes.', imd_cta: 'Take the free diagnosis', footer_rights: 'All rights reserved.', seo_title: 'Leapifyes | Digital Transformation, AI & Custom Systems in Barcelona', seo_desc: 'Digital transformation consultancy in Barcelona. CRM, AI automation, web development and custom systems for SMEs and freelancers. Free diagnosis.', stat_years: 'years', stat_years_desc: 'Experience in sales and digital transformation', stat_saas_desc: 'Own SaaS in production: MANDO and TRÉBOL Finance', stat_fee_desc: 'Fee/retainer — never hourly', stat_cases: 'cases', stat_cases_desc: 'Documented successes in Barcelona', serv_label: 'What we do for you', serv_title: 'We don\'t sell software.', serv_gradient: 'We transform businesses.', learn_more: 'Learn more', tools_title: 'Interactive tools', prod_label: 'What we build', prod_title: 'We don\'t just advise.', prod_gradient: 'We develop our own SaaS.', prod_sub: 'We create the tools we ourselves would need. That makes us different.', mando_tag: 'LIVE IN PRODUCTION', mando_sub: 'Complete ERP for reforms, construction and maintenance', mando_desc: 'Work is already hard. Management shouldn\'t be. MANDO centralizes everything.', trebol_tag: 'ACTIVE BETA', trebol_sub: 'Your money, intelligent. Personal Fintech with AI.', trebol_desc: 'Personal financial management in 18 currencies.', sect_label: 'Sectors where we operate', sect_title: 'We know your sector.', sect_gradient: 'We speak your language.', cases_label: 'Real results, real businesses', cases_title: 'We don\'t promise.', cases_gradient: 'We demonstrate.', method_label: 'The Leapifyes method', method_title: 'We make the important easy.', method_gradient: 'Technology you understand, results you see.', team_label: 'The team behind Leapifyes', team_title: 'Real people.', team_gradient: 'Real commitment.', team_sub: 'At Leapifyes we combine experience with luxury tech.', founder_desc: 'Behind Leapifyes is more than a decade of work.', cta_title: 'Ready to take the leap?', cta_sub: 'Your business deserves the leap. We accompany you.', cta_desc: 'Book a free call.'
    },
    serv_detail: {
      back_plans: 'View all plans', monthly_inv: 'Monthly investment', from: 'From', req_info: 'Request information', for_whom: 'Who is this plan for?', what_includes: 'What the plan includes', how_works: 'How it works? The process', results_expect: 'Results you can expect', start_today: 'Start today', start_sub: 'Complete your details for a 30-minute call.', selected_serv: 'Selected service', full_name: 'Full name', work_email: 'Work email', phone: 'Phone', business_name: 'Business name', industry: 'Sector / Industry', why_interest: 'Why are you interested?', placeholder_msg: 'Tell us briefly...', sending: 'Sending...', req_meeting: 'Request meeting', privacy_msg: 'Privacy policy accepted.', success_title: 'Received!', success_msg: 'Thank you. We will contact you soon.', back_home: 'Back home'
    },
    empresa: {
      seo_title: 'About Us | Leapifyes', seo_desc: 'Digital transformation for SMEs.', hero_tag: 'About Us', hero_title: 'Your digital partner', hero_sub: 'Digital becomes your advantage.', hist_title: 'Our History', hist_p1: 'Leapifyes was born for SMEs.', hist_p2: 'Simple and close.', vision_title: 'Vision', vision_text: 'No SME left behind.', mision_title: 'Mission', mision_text: 'Simplifying digital.', prop_title: 'Purpose', prop_text: 'Democratizing digitalization.', founder_title: 'Our Founder', founder_sub: 'Human-centric transformer.', team_title: 'Our Team', team_sub: 'Multidisciplinary team.', bcn_title: 'Barcelona', bcn_sub: 'Our home.', cta_title: 'Connect?', cta_sub: 'Tell us.'
    },
    imd: {
      title: 'How digital?', sub: '5 min diagnosis.', start: 'Start', next: 'Next', restart: 'Restart', results_title: 'Results', global_score: 'Score', comparative: 'Benchmarking', ai_analysis: 'AI Analysis', analyzing: 'Analyzing...', step1_title: 'Strategy', step2_title: 'Processes', step3_title: 'People', step4_title: 'Infra', step5_title: 'Products'
    },
    data: {
      services: [
        { title: 'Digital Transformation', description: 'Modernize without losing essence.', features: ['Process audit', 'Priority map', 'Flow automation'] },
        { title: 'AI Agents and Automation', description: 'Smart assistants working 24/7.', features: ['AI Customer service', 'Lead qualification', 'CRM integration'] },
        { title: 'Custom Web Development', description: 'Your web, your identity.', features: ['Premium UX/UI', 'SEO optimization', 'Tool integration'] }
      ],
      plans_detail: {
        'start': { name: 'START', tagline: 'First step', price: '497', badge: 'Ideal to start', perfil: "For freelancers and SMEs.", incluye: ['Digital diagnosis', 'CRM setup'], proceso: [{ title: 'Diagnosis', desc: 'Analysis' }], resultados: [{ val: '3-5h', label: 'Hours', desc: 'Time saved' }] },
        'essential': { name: 'ESSENTIAL', tagline: 'Solid growth', price: '750', badge: 'Most chosen', perfil: "SMEs with team.", incluye: ['Advanced CRM'], proceso: [{ title: 'Audit', desc: 'Mapping' }], resultados: [{ val: '+45%', label: 'Efficiency', desc: 'Productivity' }] },
        'pro': { name: 'PRO', tagline: 'AI Scalability', price: '950', badge: '⭐ Most popular', perfil: "Growing companies.", incluye: ['AI Agent'], proceso: [{ title: 'Strategy', desc: 'Analysis' }], resultados: [{ val: 'x2', label: 'Capacity', desc: 'Reach' }] },
        'premium-360': { name: 'PREMIUM 360', tagline: 'Ultimate transformation', price: '2,000', badge: 'Max transformation', perfil: "360º transformation.", incluye: ['Full strategy'], proceso: [{ title: 'Immersion', desc: 'Full audit' }], resultados: [{ val: '100%', label: 'Digital', desc: 'Total' }] }
      },
      sectors: [{ name: 'Reform and Construction' }, { name: 'Clinics and Health' }, { name: 'Consultancies' }, { name: 'Retail and Commerce' }, { name: 'Freelancers' }, { name: 'Growing SMEs' }],
      cases: [{ client: 'ReformaBCN', impact: '+40% sales' }, { client: 'Clinic', impact: '-5h/week' }],
      method: [{ title: 'Listen', desc: 'Diagnosis' }, { title: '90-day plan', desc: 'Roadmap' }, { title: 'Implementation', desc: 'Guided' }, { title: 'Training', desc: 'Adoption' }, { title: 'KPIs', desc: 'Improvement' }],
      imd_dimensions: [
        { id: 'estrategia', label: 'Strategy', icon: '🎯', questions: [{ id: 'e1', text: 'Plan?', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 100 }] }] },
        { id: 'procesos', label: 'Processes', icon: '⚙️', questions: [{ id: 'p1', text: 'Digital?', options: [{ label: 'No', value: 0 }, { label: 'Yes', value: 100 }] }] }
      ]
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
