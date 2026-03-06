import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://leapifyes.com';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

// SEO data for all routes
export const SEO_DATA = {
  '/': {
    title: 'Leapifyes | Transformación Digital y Agentes IA en Barcelona',
    description: 'Acompañamos a empresas de Barcelona y Cataluña en su transformación digital. Automatización inteligente, agentes de IA y procesos optimizados. Con Leapifyes no das un paso, das un salto.',
    keywords: 'transformación digital Barcelona, agentes IA, automatización empresas, digitalización pymes Catalunya',
  },
  '/soluciones': {
    title: 'Soluciones de Transformación Digital | Leapifyes Barcelona',
    description: 'Descubre nuestras soluciones de transformación digital y agentes de IA para empresas. Automatización, digitalización y optimización de procesos.',
    keywords: 'soluciones digitales, transformación digital, agentes IA, automatización procesos',
  },
  '/soluciones/transformacion-digital': {
    title: 'Transformación Digital para Empresas | Leapifyes Barcelona',
    description: 'Moderniza tu negocio sin perder tu esencia. Digitalización de procesos, automatización inteligente e integración de sistemas para PYMEs.',
    keywords: 'transformación digital, digitalización empresas, automatización procesos, pymes Barcelona',
  },
  '/soluciones/agentes-ia': {
    title: 'Agentes de IA para Empresas | Atención 24/7 | Leapifyes',
    description: 'Agentes conversacionales que atienden, cualifican y convierten 24/7. WhatsApp, web, email. Automatización inteligente para tu negocio.',
    keywords: 'agentes IA, chatbot empresas, atención automatizada, WhatsApp business IA',
  },
  '/sectores': {
    title: 'Soluciones por Sector | Leapifyes Barcelona',
    description: 'Soluciones de transformación digital especializadas por sector. Servicios del hogar, clínicas de salud y servicios profesionales.',
    keywords: 'transformación digital sectores, digitalización por industria, soluciones sectoriales',
  },
  '/sectores/servicios-hogar-reformas': {
    title: 'Digitalización para Reformas y Servicios del Hogar | Leapifyes',
    description: 'Automatiza presupuestos, gestiona clientes y responde 24/7 en tu empresa de reformas, fontanería o mantenimiento del hogar.',
    keywords: 'digitalización reformas, software empresa reformas, gestión clientes reformas Barcelona',
  },
  '/sectores/clinicas-salud': {
    title: 'Transformación Digital para Clínicas | Leapifyes Barcelona',
    description: 'Reduce no-shows, automatiza recordatorios y mejora la experiencia del paciente en tu clínica dental, estética o médica.',
    keywords: 'digitalización clínicas, software gestión pacientes, automatización clínicas Barcelona',
  },
  '/sectores/servicios-profesionales': {
    title: 'Digitalización para Abogados y Asesorías | Leapifyes',
    description: 'Automatiza la captación de leads, cualificación y seguimiento en tu despacho de abogados, asesoría o consultoría.',
    keywords: 'digitalización despacho abogados, software asesorías, CRM servicios profesionales',
  },
  '/casos': {
    title: 'Casos de Éxito | Resultados Reales | Leapifyes',
    description: 'Descubre cómo empresas de Barcelona y Cataluña han transformado sus negocios con nuestras soluciones. Resultados medibles y verificables.',
    keywords: 'casos éxito transformación digital, testimonios clientes, resultados digitalización',
  },
  '/metodo': {
    title: 'Nuestro Método de Trabajo | Leapifyes Barcelona',
    description: 'Metodología probada en más de 50 empresas. Diagnóstico, diseño, implementación y acompañamiento continuo.',
    keywords: 'metodología transformación digital, proceso digitalización, consultoría digital',
  },
  '/empresa': {
    title: 'Sobre Leapifyes | Transformación Digital en Barcelona',
    description: 'Equipo de Barcelona especializado en transformación digital para PYMEs. Digital pero con corazón. Lo humano primero.',
    keywords: 'Leapifyes Barcelona, empresa transformación digital, consultoría digital Catalunya',
  },
  '/recursos': {
    title: 'Blog y Recursos | Transformación Digital | Leapifyes',
    description: 'Artículos, guías y recursos sobre transformación digital, automatización e IA para empresas. Contenido práctico y sin tecnicismos.',
    keywords: 'blog transformación digital, recursos digitalización, guías automatización empresas',
  },
  '/contacto': {
    title: 'Contacto | Agendar Demo | Leapifyes Barcelona',
    description: 'Agenda una demo sin compromiso. Analizamos tu negocio y te proponemos soluciones a medida. Respuesta en 24h.',
    keywords: 'contacto Leapifyes, agendar demo transformación digital, consulta digitalización',
  },
  '/barcelona': {
    title: 'Transformación Digital en Barcelona | Leapifyes',
    description: 'Expertos en transformación digital para empresas de Barcelona. Soluciones locales con visión global. Conocemos tu mercado.',
    keywords: 'transformación digital Barcelona, digitalización empresas Barcelona, agentes IA Barcelona',
  },
  '/cataluna': {
    title: 'Transformación Digital en Cataluña | Leapifyes',
    description: 'Acompañamos a empresas de toda Cataluña en su transformación digital. Presencia en Barcelona, Girona, Tarragona y Lleida.',
    keywords: 'transformación digital Catalunya, digitalización empreses Catalunya, agentes IA Girona Tarragona',
  },
  '/legal/privacidad': {
    title: 'Política de Privacidad | Leapifyes',
    description: 'Política de privacidad y protección de datos de Leapifyes. RGPD compliant.',
    keywords: 'política privacidad, RGPD, protección datos',
  },
  '/legal/cookies': {
    title: 'Política de Cookies | Leapifyes',
    description: 'Información sobre el uso de cookies en el sitio web de Leapifyes.',
    keywords: 'política cookies, uso cookies, gestión cookies',
  },
  '/legal/aviso-legal': {
    title: 'Aviso Legal | Leapifyes',
    description: 'Aviso legal y condiciones de uso del sitio web de Leapifyes.',
    keywords: 'aviso legal, términos uso, condiciones legales',
  },
};

const SEO = ({ 
  title, 
  description, 
  keywords,
  path = '/',
  image = DEFAULT_IMAGE,
  type = 'website',
  noindex = false,
  children 
}) => {
  const seoData = SEO_DATA[path] || SEO_DATA['/'];
  const finalTitle = title || seoData.title;
  const finalDescription = description || seoData.description;
  const finalKeywords = keywords || seoData.keywords;
  const canonicalUrl = `${SITE_URL}${path}`;

  return (
    <Helmet>
      {/* Basic Meta */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      
      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Language */}
      <html lang="es" />
      <meta property="og:locale" content="es_ES" />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Leapifyes" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional SEO */}
      <meta name="author" content="Leapifyes" />
      <meta name="geo.region" content="ES-CT" />
      <meta name="geo.placename" content="Barcelona" />
      
      {children}
    </Helmet>
  );
};

export default SEO;
