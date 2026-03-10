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
      method: []
    },
    footer: {
      brand_sub: 'Digitalizamos pymes y autónomos en España.',
      col_services: 'Servicios',
      col_products: 'Productos',
      col_company: 'Empresa',
      col_legal: 'Legal',
      manage_cookies: 'Gestionar cookies',
      bottom_text: 'Todos los derechos reservados.',
      made_with: 'Hecho con ❤️ en Barcelona',
      location: 'Barcelona, España'
    },
    cookies: {
      title: 'Usamos cookies',
      description: 'Utilizamos cookies propias y de terceros para mejorar tu experiencia y analizar el tráfico web.',
      accept_all: 'Aceptar todas',
      reject: 'Rechazar',
      settings: 'Configurar',
      settings_title: 'Configuración de cookies',
      tech_title: 'Cookies técnicas',
      tech_desc: 'Necesarias para el funcionamiento del sitio. No se pueden desactivar.',
      ana_title: 'Cookies analíticas',
      ana_desc: 'Nos ayudan a entender cómo usas el sitio (Google Analytics).',
      mark_title: 'Cookies de marketing',
      mark_desc: 'Permiten mostrarte publicidad relevante.',
      save_settings: 'Guardar preferencias',
      cancel: 'Cancelar',
      manage_cookies: 'Gestionar cookies'
    }
  },
  ca: {
    nav: {
      productos: 'Productes', servicios: 'Serveis', sectores: 'Sectors',
      casos: 'Casos', metodo: 'Mètode', empresa: 'Empresa', blog: 'Blog',
      diagnostico: 'Diagnòstic', portal: 'Portal', agendar: 'Agendar diagnòstic'
    },
    home: {
      hero_tag: 'Amb Leapifyes no fas un pas, fas un salt',
      hero_title_1: 'Transformem', hero_title_2: 'negocis.',
      hero_title_3: 'Construïm el', hero_title_4: 'futur.',
      hero_sub: 'Digitalitzem pimes i autònoms a Espanya — amb estratègia, IA i sistemes a mida.',
      hero_tag_bcn: 'Barcelona, Espanya', hero_tag_ia: 'Agents IA', hero_tag_sis: 'Sistemes a mida',
      cta_agendar: 'Agendar diagnòstic gratuït', cta_servicios: 'Veure els nostres serveis',
      sol_td: 'Transformació Digital', sol_td_sub: 'Processos, CRM, automatització intel·ligent.',
      sol_ia: 'Agents IA 24/7', sol_ia_sub: 'Atén, qualifica i ven sense intervenció.',
      sol_sis: 'Sistemes a Mida', sol_sis_sub: 'Web, ERP, apps pròpies i SaaS escalable.'
    },
    footer: {
      brand_sub: 'Digitalitzem pimes i autònoms a Espanya.',
      col_services: 'Serveis',
      col_products: 'Productes',
      col_company: 'Empresa',
      col_legal: 'Legal',
      manage_cookies: 'Gestionar galetes',
      bottom_text: 'Tots els drets reservats.',
      made_with: 'Fet amb ❤️ a Barcelona',
      location: 'Barcelona, Espanya'
    },
    cookies: { title: 'Usem galetes', description: 'Utilitzem galetes pròpies i de tercers per millorar la teva experiència i analitzar el trànsit web.', accept_all: 'Acceptar totes', reject: 'Rebutjar', settings: 'Configurar', settings_title: 'Configuració de galetes', tech_title: 'Galetes tècniques', tech_desc: 'Necessàries per al funcionament del lloc. No es poden desactivar.', ana_title: 'Galetes analítiques', ana_desc: "Ens ajuden a entendre com uses el lloc (Google Analytics).", mark_title: 'Galetes de màrqueting', mark_desc: 'Permeten mostrar-te publicitat rellevant.', save_settings: 'Desar preferències', cancel: 'Cancel·lar', manage_cookies: 'Gestionar galetes' }
  },
  en: {
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
      cta_desc: 'Book a free 30-minute strategic call. No commitments.'
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
    },
    footer: {
      brand_sub: 'We digitalize SMEs and freelancers in Spain.',
      col_services: 'Services',
      col_products: 'Products',
      col_company: 'Company',
      col_legal: 'Legal',
      manage_cookies: 'Manage cookies',
      bottom_text: 'All rights reserved.',
      made_with: 'Made with ❤️ in Barcelona',
      location: 'Barcelona, Spain'
    },
    cookies: { title: 'We use cookies', description: 'We use our own and third-party cookies to improve your experience and analyze web traffic.', accept_all: 'Accept all', reject: 'Reject', settings: 'Settings', settings_title: 'Cookie settings', tech_title: 'Technical cookies', tech_desc: 'Required for the site to work. Cannot be disabled.', ana_title: 'Analytics cookies', ana_desc: 'Help us understand how you use the site (Google Analytics).', mark_title: 'Marketing cookies', mark_desc: 'Allow us to show you relevant ads.', save_settings: 'Save preferences', cancel: 'Cancel', manage_cookies: 'Manage cookies' }
  },
  fr: {
    nav: {
      productos: 'Produits', servicios: 'Services', sectores: 'Secteurs',
      casos: 'Cas', metodo: 'Méthode', empresa: 'Entreprise', blog: 'Blog',
      diagnostico: 'Diagnostic', portal: 'Portail', agendar: 'Prendre RDV'
    },
    footer: {
      brand_sub: 'Nous digitalisons les PME et indépendants en Espagne.',
      col_services: 'Services',
      col_products: 'Produits',
      col_company: 'Entreprise',
      col_legal: 'Légal',
      manage_cookies: 'Gérer les cookies',
      bottom_text: 'Tous droits réservés.',
      made_with: 'Fait avec ❤️ à Barcelone',
      location: 'Barcelone, Espagne'
    },
    cookies: { title: 'Nous utilisons des cookies', description: 'Nous utilisons des cookies propres et tiers pour améliorer votre expérience et analyser le trafic.', accept_all: 'Tout accepter', reject: 'Refuser', settings: 'Paramètres', settings_title: 'Paramètres des cookies', tech_title: 'Cookies techniques', tech_desc: 'Nécessaires au fonctionnement du site. Ne peuvent pas être désactivés.', ana_title: 'Cookies analytiques', ana_desc: 'Nous aident à comprendre comment vous utilisez le site.', mark_title: 'Cookies marketing', mark_desc: 'Permettent de vous montrer des publicités pertinentes.', save_settings: 'Enregistrer les préférences', cancel: 'Annuler', manage_cookies: 'Gérer les cookies' }
  },
  pt: {
    nav: {
      productos: 'Produtos', servicios: 'Serviços', sectores: 'Setores',
      casos: 'Casos', metodo: 'Método', empresa: 'Empresa', blog: 'Blog',
      diagnostico: 'Diagnóstico', portal: 'Portal', agendar: 'Agendar diagnóstico'
    },
    footer: {
      brand_sub: 'Digitalizamos PMEs e freelancers em Espanha.',
      col_services: 'Serviços',
      col_products: 'Produtos',
      col_company: 'Empresa',
      col_legal: 'Legal',
      manage_cookies: 'Gerir cookies',
      bottom_text: 'Todos os direitos reservados.',
      made_with: 'Feito com ❤️ em Barcelona',
      location: 'Barcelona, Espanha'
    },
    cookies: { title: 'Usamos cookies', description: 'Usamos cookies próprios e de terceiros para melhorar a sua experiência e analisar o tráfego web.', accept_all: 'Aceitar todos', reject: 'Rejeitar', settings: 'Configurar', settings_title: 'Configurações de cookies', tech_title: 'Cookies técnicos', tech_desc: 'Necessários para o funcionamento do site. Não podem ser desativados.', ana_title: 'Cookies analíticos', ana_desc: 'Ajudam-nos a perceber como usa o site.', mark_title: 'Cookies de marketing', mark_desc: 'Permitem mostrar-lhe publicidad relevante.', save_settings: 'Guardar preferencias', cancel: 'Cancelar', manage_cookies: 'Gerir cookies' }
  },
  it: {
    nav: {
      productos: 'Prodotti', servicios: 'Servizi', sectores: 'Settori',
      casos: 'Casi', metodo: 'Metodo', empresa: 'Azienda', blog: 'Blog',
      diagnostico: 'Diagnosi', portal: 'Portale', agendar: 'Prenota diagnosi'
    },
    footer: {
      brand_sub: 'Digitalizziamo PMI e freelance in Spagna.',
      col_services: 'Servizi',
      col_products: 'Prodotti',
      col_company: 'Azienda',
      col_legal: 'Legale',
      manage_cookies: 'Gestisci cookie',
      bottom_text: 'Tutti i diritti riservati.',
      made_with: 'Fatto con ❤️ a Barcellona',
      location: 'Barcellona, Spagna'
    },
    cookies: { title: 'Usiamo i cookie', description: 'Utilizziamo cookie propri e di terze parti per migliorare la tua esperienza e analizzare il traffico web.', accept_all: 'Accetta tutti', reject: 'Rifiuta', settings: 'Impostazioni', settings_title: 'Impostazioni cookie', tech_title: 'Cookie tecnici', tech_desc: 'Necessari per il fonctionnemento del sito. Non possono essere disattivati.', ana_title: 'Cookie analitici', ana_desc: 'Ci aiutano a capire come usi il sito.', mark_title: 'Cookie di marketing', mark_desc: 'Consentono di mostrarti pubblicità pertinente.', save_settings: 'Salva preferenze', cancel: 'Annulla', manage_cookies: 'Gestisci cookie' }
  },
  de: {
    nav: {
      productos: 'Produkte', servicios: 'Dienste', sectores: 'Sektoren',
      casos: 'Fälle', metodo: 'Methode', empresa: 'Unternehmen', blog: 'Blog',
      diagnostico: 'Diagnose', portal: 'Portal', agendar: 'Termin vereinbaren'
    },
    footer: {
      brand_sub: 'Wir digitalisieren KMU und Freiberufler in Spanien.',
      col_services: 'Dienste',
      col_products: 'Produkte',
      col_company: 'Unternehmen',
      col_legal: 'Rechtliches',
      manage_cookies: 'Cookies verwalten',
      bottom_text: 'Alle Rechte vorbehalten.',
      made_with: 'Mit ❤️ in Barcelona gemacht',
      location: 'Barcelona, Spanien'
    },
    cookies: { title: 'Wir verwenden Cookies', description: 'Wir verwenden eigene und Drittanbieter-Cookies, um Ihre Erfahrung zu verbessern und den Web-Traffic zu analysieren.', accept_all: 'Alle akzeptieren', reject: 'Ablehnen', settings: 'Einstellungen', settings_title: 'Cookie-Einstellungen', tech_title: 'Technische Cookies', tech_desc: 'Für den Betrieb der Website erforderlich. Können nicht deaktiviert werden.', ana_title: 'Analytische Cookies', ana_desc: 'Helfen uns zu verstehen, wie Sie die Website nutzen.', mark_title: 'Marketing-Cookies', mark_desc: 'Ermöglichen das Anzeigen relevanter Werbung.', save_settings: 'Einstellungen speichern', cancel: 'Abbrechen', manage_cookies: 'Cookies verwalten' }
  },
  nl: {
    nav: {
      productos: 'Producten', servicios: 'Diensten', sectores: 'Sectoren',
      casos: 'Cases', metodo: 'Methode', empresa: 'Bedrijf', blog: 'Blog',
      diagnostico: 'Diagnose', portal: 'Portal', agendar: 'Afspraak maken'
    },
    footer: {
      brand_sub: 'Wij digitaliseren MKB en freelancers in Spanje.',
      col_services: 'Diensten',
      col_products: 'Producten',
      col_company: 'Bedrijf',
      col_legal: 'Juridisch',
      manage_cookies: 'Cookies beheren',
      bottom_text: 'Alle rechten voorbehouden.',
      made_with: 'Gemaakt met ❤️ in Barcelona',
      location: 'Barcelona, Spanje'
    },
    cookies: { title: 'We gebruiken cookies', description: 'We gebruiken eigen en cookies van derden om uw ervaring te mejorar uw ervaring te verbeteren en webverkeer te analyseren.', accept_all: 'Alles accepteren', reject: 'Weigeren', settings: 'Instellingen', settings_title: 'Cookie-instellingen', tech_title: 'Technische cookies', tech_desc: 'Vereist voor het functioneren van de site. Kunnen niet worden uitgeschakeld.', ana_title: 'Analytische cookies', ana_desc: 'Helpen ons begrijpen hoe u de site gebruikt.', mark_title: 'Marketing cookies', mark_desc: 'Maken het mogelijk relevante advertenties te tonen.', save_settings: 'Voorkeuren opslaan', cancel: 'Annuleren', manage_cookies: 'Cookies beheren' }
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
