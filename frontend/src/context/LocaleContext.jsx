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
      footer_rights: 'Todos los derechos reservados.'
    }
  },
  ca: {
    nav: {
      productos: 'Productes', servicios: 'Serveis', sectores: 'Sectors',
      casos: 'Casos', metodo: 'Mètode', empresa: 'Empresa', blog: 'Blog',
      diagnostico: 'Diagnòstic', portal: 'Portal', agendar: 'Agenda diagnòstic'
    },
    home: {
      hero_tag: 'Amb Leapifyes no fas un pas, fas un salt',
      hero_title_1: 'Transformem', hero_title_2: 'negocis.', hero_title_3: 'Construïm el', hero_title_4: 'futur.',
      hero_sub: 'Digitalitzem pimes i autònoms a Espanya — amb estratègia, IA i sistemes a mida.',
      cta_agendar: 'Agenda diagnòstic gratuït', cta_servicios: 'Veure els nostres serveis',
      tag_barcelona: 'Barcelona, Espanya', tag_ia: 'Agents IA', tag_sistemas: 'Sistemes a mida',
      sol_td: 'Transformació Digital', sol_td_sub: 'Processos, CRM, automatització intel·ligent.',
      sol_ia: 'Agents IA 24/7', sol_ia_sub: 'Atén, qualifica i ven sense intervenció.',
      sol_sis: 'Sistemes a Mida', sol_sis_sub: 'Web, ERP, apps pròpies i SaaS escalable.',
      planes_tag: 'Plans & Preus', planes_hook: 'Col·laboracions dissenyades per generar impacte real.',
      planes_sub: 'Fee mensual o per fites. Sense permanència. Sense sorpreses.',
      plan_cta: 'Veure detall del pla', plan_popular: 'Més popular',
      imd_tag: 'Eina gratuïta', imd_title: 'Com de digital és el teu negoci?',
      imd_sub: 'Fes el diagnòstic IMD i descobreix el teu nivell de maduresa digital en 5 minuts.',
      imd_cta: 'Fer el diagnòstic gratuït',
      footer_rights: 'Tots els drets reservats.'
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
      footer_rights: 'All rights reserved.'
    }
  },
  fr: {
    nav: {
      productos: 'Produits', servicios: 'Services', sectores: 'Secteurs',
      casos: 'Cas', metodo: 'Méthode', empresa: 'Entreprise', blog: 'Blog',
      diagnostico: 'Diagnostic', portal: 'Portail', agendar: 'Planifier diagnostic'
    },
    home: {
      hero_tag: 'Avec Leapifyes vous ne faites pas un pas, vous faites un bond',
      hero_title_1: 'Nous transformons', hero_title_2: 'les entreprises.', hero_title_3: 'Nous construisons le', hero_title_4: 'futur.',
      hero_sub: 'Nous digitalisons les PME et indépendants en Espagne — avec stratégie, IA et systèmes sur mesure.',
      cta_agendar: 'Planifier diagnostic gratuit', cta_servicios: 'Voir nos services',
      tag_barcelona: 'Barcelone, Espagne', tag_ia: 'Agents IA', tag_sistemas: 'Systèmes sur mesure',
      sol_td: 'Transformation Digitale', sol_td_sub: 'Processus, CRM, automatisation intelligente.',
      sol_ia: 'Agents IA 24/7', sol_ia_sub: 'Accueillez, qualifiez et venez sans intervention.',
      sol_sis: 'Systèmes Sur Mesure', sol_sis_sub: 'Web, ERP, apps propres et SaaS évolutif.',
      planes_tag: 'Plans & Tarifs', planes_hook: 'Collaborations conçues pour générer un impact réel.',
      planes_sub: 'Frais mensuels ou par jalons. Sans engagement. Sans surprises.',
      plan_cta: 'Voir le détail du plan', plan_popular: 'Le plus populaire',
      imd_tag: 'Outil gratuit', imd_title: 'Quel est votre niveau de digitalisation ?',
      imd_sub: 'Faites le diagnostic IMD et découvrez votre niveau de maturité numérique en 5 minutes.',
      imd_cta: 'Faire le diagnostic gratuit',
      footer_rights: 'Tous droits réservés.'
    }
  },
  pt: {
    nav: {
      productos: 'Produtos', servicios: 'Serviços', sectores: 'Sectores',
      casos: 'Casos', metodo: 'Método', empresa: 'Empresa', blog: 'Blog',
      diagnostico: 'Diagnóstico', portal: 'Portal', agendar: 'Agendar diagnóstico'
    },
    home: {
      hero_tag: 'Com a Leapifyes não dás um passo, dás um salto',
      hero_title_1: 'Transformamos', hero_title_2: 'negócios.', hero_title_3: 'Construímos o', hero_title_4: 'futuro.',
      hero_sub: 'Digitalizamos PMEs e freelancers em Espanha — com estratégia, IA e sistemas à medida.',
      cta_agendar: 'Agendar diagnóstico gratuito', cta_servicios: 'Ver os nossos serviços',
      tag_barcelona: 'Barcelona, Espanha', tag_ia: 'Agentes IA', tag_sistemas: 'Sistemas à medida',
      sol_td: 'Transformação Digital', sol_td_sub: 'Processos, CRM, automatização inteligente.',
      sol_ia: 'Agentes IA 24/7', sol_ia_sub: 'Atende, qualifica e vende sem intervenção.',
      sol_sis: 'Sistemas à Medida', sol_sis_sub: 'Web, ERP, apps próprias e SaaS escalável.',
      planes_tag: 'Planos & Preços', planes_hook: 'Colaborações desenhadas para gerar impacto real.',
      planes_sub: 'Fee mensal o por marcos. Sem permanência. Sem surpresas.',
      plan_cta: 'Ver detalhe do plano', plan_popular: 'Mais popular',
      imd_tag: 'Ferramenta gratuita', imd_title: 'Quão digital é o seu negócio?',
      imd_sub: 'Faça o diagnóstico IMD e descubra o seu nível de maturidade digital em 5 minutos.',
      imd_cta: 'Fazer o diagnóstico gratuito',
      footer_rights: 'Todos os direitos reservados.'
    }
  },
  it: {
    nav: {
      productos: 'Prodotti', servicios: 'Servizi', sectores: 'Settori',
      casos: 'Casi', metodo: 'Metodo', empresa: 'Azienda', blog: 'Blog',
      diagnostico: 'Diagnosi', portal: 'Portale', agendar: 'Prenota diagnosi'
    },
    home: {
      hero_tag: 'Con Leapifyes non fai un passo, fai un salto',
      hero_title_1: 'Trasformiamo', hero_title_2: 'le aziende.', hero_title_3: 'Costruiamo il', hero_title_4: 'futuro.',
      hero_sub: 'Digitalizziamo PMI e freelance in Spagna — con strategia, IA e sistemi su misura.',
      cta_agendar: 'Prenota diagnosi gratuita', cta_servicios: 'Vedi i nostri servizi',
      tag_barcelona: 'Barcellona, Spagna', tag_ia: 'Agenti IA', tag_sistemas: 'Sistemi su misura',
      sol_td: 'Trasformazione Digitale', sol_td_sub: 'Processi, CRM, automazione intelligente.',
      sol_ia: 'Agenti IA 24/7', sol_ia_sub: 'Assisti, qualifica e vendi senza intervento.',
      sol_sis: 'Sistemi Su Misura', sol_sis_sub: 'Web, ERP, app proprie e SaaS scalabile.',
      planes_tag: 'Piani & Prezzi', planes_hook: 'Collaborazioni progettate per generare impatto reale.',
      planes_sub: 'Canone mensile o per milestone. Senza vincoli. Senza sorprese.',
      plan_cta: 'Vedi dettaglio piano', plan_popular: 'Più popolare',
      imd_tag: 'Strumento gratuito', imd_title: 'Quanto è digitale la tua azienda?',
      imd_sub: 'Fai la diagnosi IMD e scopri il tuo livello di maturità digitale in 5 minuti.',
      imd_cta: 'Fare la diagnosi gratuita',
      footer_rights: 'Tutti i diritti riservati.'
    }
  },
  de: {
    nav: {
      productos: 'Produkte', servicios: 'Dienste', sectores: 'Branchen',
      casos: 'Fälle', metodo: 'Methode', empresa: 'Unternehmen', blog: 'Blog',
      diagnostico: 'Diagnose', portal: 'Portal', agendar: 'Diagnose buchen'
    },
    home: {
      hero_tag: 'Mit Leapifyes machst du keinen Schritt, du machst einen Sprung',
      hero_title_1: 'Wir transformieren', hero_title_2: 'Unternehmen.', hero_title_3: 'Wir bauen die', hero_title_4: 'Zukunft.',
      hero_sub: 'Wir digitalisieren KMU und Freiberufler in Spanien — mit Strategie, KI und maßgeschneiderten Systemen.',
      cta_agendar: 'Kostenlose Diagnose buchen', cta_servicios: 'Unsere Dienste ansehen',
      tag_barcelona: 'Barcelona, Spanien', tag_ia: 'KI-Agenten', tag_sistemas: 'Maßgeschneiderte Systeme',
      sol_td: 'Digitale Transformation', sol_td_sub: 'Prozesse, CRM, intelligente Automatisierung.',
      sol_ia: 'KI-Agenten 24/7', sol_ia_sub: 'Betreuen, qualifizieren und verkaufen ohne Eingriff.',
      sol_sis: 'Maßgeschneiderte Systeme', sol_sis_sub: 'Web, ERP, eigene Apps und skalierbares SaaS.',
      planes_tag: 'Pläne & Preise', planes_hook: 'Kooperationen, die echten Impact erzeugen.',
      planes_sub: 'Monatliche oder Meilenstein-Gebühr. Ohne Bindung. Ohne Überraschungen.',
      plan_cta: 'Plandetails ansehen', plan_popular: 'Am beliebtesten',
      imd_tag: 'Kostenloses Tool', imd_title: 'Wie digital ist Ihr Unternehmen?',
      imd_sub: 'Machen Sie die IMD-Diagnose und entdecken Sie Ihren digitalen Reifegrad in 5 Minuten.',
      imd_cta: 'Kostenlose Diagnose starten',
      footer_rights: 'Alle Rechte vorbehalten.'
    }
  },
  nl: {
    nav: {
      productos: 'Producten', servicios: 'Diensten', sectores: 'Sectoren',
      casos: 'Cases', metodo: 'Methode', empresa: 'Bedrijf', blog: 'Blog',
      diagnostico: 'Diagnose', portal: 'Portaal', agendar: 'Diagnose plannen'
    },
    home: {
      hero_tag: 'Met Leapifyes doe je geen stap, je doet een sprong',
      hero_title_1: 'Wij transformeren', hero_title_2: 'bedrijven.', hero_title_3: 'Wij bouwen de', hero_title_4: 'toekomst.',
      hero_sub: 'Wij digitaliseren MKB en freelancers in Spanje — met strategie, AI en op maat gemaakte systemen.',
      cta_agendar: 'Gratis diagnose plannen', cta_servicios: 'Onze diensten bekijken',
      tag_barcelona: 'Barcelona, Spanje', tag_ia: 'AI-agenten', tag_sistemas: 'Maatwerk systemen',
      sol_td: 'Digitale Transformatie', sol_td_sub: 'Processen, CRM, intelligente automatisering.',
      sol_ia: 'AI-agenten 24/7', sol_ia_sub: 'Ontvang, kwalificeer en verkoop zonder tussenkomst.',
      sol_sis: 'Maatwerk Systemen', sol_sis_sub: 'Web, ERP, eigen apps en schaalbare SaaS.',
      planes_tag: 'Plannen & Prijzen', planes_hook: 'Samenwerkingen ontworpen om echte impact te genereren.',
      planes_sub: 'Maandelijkse of milestone-vergoeding. Zonder binding. Zonder verrassingen.',
      plan_cta: 'Plandetails bekijken', plan_popular: 'Meest populair',
      imd_tag: 'Gratis tool', imd_title: 'Hoe digitaal is uw bedrijf?',
      imd_sub: 'Doe de IMD-diagnose en ontdek uw digitale rijpheid in 5 minuten.',
      imd_cta: 'Gratis diagnose starten',
      footer_rights: 'Alle rechten voorbehouden.'
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

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = () => useContext(LocaleContext);
export default LocaleContext;
