import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Building2, Stethoscope, Briefcase, CheckCircle2, Users, Award, Clock } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import Layout from '../components/layout/Layout';
import SEO from '../components/SEO';
import { generateFAQSchema, generateBreadcrumbSchema, schemaToString } from '../lib/schemas';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const BARCELONA_FAQS = [
  {
    question: '¿Qué servicios de transformación digital ofrecéis en Barcelona?',
    answer: 'Ofrecemos digitalización de procesos, automatización inteligente, agentes de IA para atención al cliente, integración de sistemas y consultoría estratégica. Trabajamos con empresas de todos los tamaños en Barcelona.'
  },
  {
    question: '¿Trabajáis con empresas pequeñas en Barcelona?',
    answer: 'Sí, nos especializamos en PYMEs de Barcelona con 5-50 empleados. Nuestras soluciones están diseñadas para ser accesibles y escalables, adaptándose al tamaño y necesidades de cada negocio.'
  },
  {
    question: '¿Cuánto tiempo tarda un proyecto de transformación digital?',
    answer: 'Depende del alcance, pero típicamente entre 4-8 semanas para un proyecto estándar. Empezamos con quick wins en las primeras 2 semanas para que veas resultados rápido.'
  },
  {
    question: '¿Ofrecéis soporte después de la implementación?',
    answer: 'Sí, incluimos acompañamiento continuo en todos nuestros proyectos. No te dejamos solo después del lanzamiento: formamos a tu equipo y optimizamos según los resultados.'
  },
  {
    question: '¿En qué zonas de Barcelona trabajáis?',
    answer: 'Atendemos empresas de toda Barcelona y área metropolitana: Eixample, Gràcia, Sant Martí, Sarrià, Hospitalet, Badalona, etc. También trabajamos remotamente con empresas de toda Cataluña.'
  }
];

const Barcelona = () => {
  const breadcrumbs = [
    { name: 'Inicio', path: '/' },
    { name: 'Barcelona', path: '/barcelona' }
  ];

  const districts = [
    'Eixample', 'Gràcia', 'Sant Martí', 'Sarrià-Sant Gervasi', 
    'Les Corts', 'Sants-Montjuïc', 'Horta-Guinardó', 'Nou Barris'
  ];

  return (
    <Layout>
      <SEO path="/barcelona" />
      
      <script type="application/ld+json">
        {schemaToString(generateBreadcrumbSchema(breadcrumbs))}
      </script>
      <script type="application/ld+json">
        {schemaToString(generateFAQSchema(BARCELONA_FAQS))}
      </script>

      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden" data-testid="barcelona-hero">
        <div className="absolute inset-0"><div className="mesh-gradient opacity-40" /><div className="grid-pattern absolute inset-0 opacity-20" /></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#1B93A4]/10 to-[#D946EF]/10 rounded-full blur-3xl" />
        
        <div className="container-main relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
              <motion.div variants={fadeInUp} className="flex items-center gap-2 mb-6">
                <MapPin className="w-5 h-5 text-[#1B93A4]" />
                <span className="text-sm font-medium text-[#8892A4]">Barcelona</span>
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl font-bold text-[#F0F4FF] mb-6 leading-tight">
                Transformación Digital en <span className="gradient-text">Barcelona</span>
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="text-xl text-[#8892A4] mb-8 leading-relaxed">
                Expertos locales en transformación digital para empresas barcelonesas. Conocemos tu mercado, hablamos tu idioma y entendemos los retos de hacer negocio en Barcelona.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <Link to="/contacto">
                  <Button className="btn-gradient text-base px-8 py-6" data-testid="barcelona-demo-btn">
                    Agendar Demo
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/app/diagnostico">
                  <Button variant="outline" className="text-base px-8 py-6 border-white/10 text-[#F0F4FF] hover:bg-white/5">
                    Diagnóstico Gratuito
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative hidden lg:block"
            >
              <img
                src="https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80"
                alt="Barcelona skyline - Transformación digital"
                className="rounded-2xl w-full h-[450px] object-cover border border-white/10"
                loading="lazy"
                width="800"
                height="450"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Barcelona */}
      <section className="section-padding">
        <div className="container-main">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              { icon: Users, value: '+50', label: 'Empresas transformadas' },
              { icon: MapPin, value: '100%', label: 'Presencia local' },
              { icon: Award, value: '98%', label: 'Satisfacción cliente' },
              { icon: Clock, value: '<24h', label: 'Tiempo respuesta' },
            ].map((stat, i) => (
              <Card key={i} className="border-white/10 bg-[#161B22]">
                <CardContent className="p-6 text-center">
                  <stat.icon className="w-8 h-8 mx-auto mb-4 text-[#1B93A4]" />
                  <p className="text-3xl font-bold gradient-text">{stat.value}</p>
                  <p className="text-[#8892A4] text-sm">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-[#F0F4FF] mb-6">
                ¿Por qué elegir Leapifyes en Barcelona?
              </h2>
              <ul className="space-y-4">
                {[
                  'Equipo local con oficinas en Barcelona',
                  'Conocimiento profundo del tejido empresarial catalán',
                  'Soporte en castellano, catalán e inglés',
                  'Red de partners tecnológicos de confianza',
                  'Casos de éxito verificables en la zona',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#1B93A4] flex-shrink-0" />
                    <span className="text-[#8892A4]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#F0F4FF] mb-4">Zonas que atendemos</h3>
              <div className="flex flex-wrap gap-2">
                {districts.map((district, i) => (
                  <span key={i} className="px-4 py-2 bg-white/5 rounded-full text-[#8892A4] text-sm">
                    {district}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sectors in Barcelona */}
      <section className="section-padding">
        <div className="container-main">
          <h2 className="text-4xl font-bold text-[#F0F4FF] mb-8 text-center">
            Sectores que transformamos en Barcelona
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Building2, title: 'Reformas y Construcción', desc: 'Empresas de reformas, arquitectos, constructoras' },
              { icon: Stethoscope, title: 'Clínicas de Salud', desc: 'Clínicas dentales, estéticas, centros médicos' },
              { icon: Briefcase, title: 'Servicios Profesionales', desc: 'Abogados, asesorías, consultoras' },
            ].map((sector, i) => (
              <Card key={i} className="border-white/10 bg-[#161B22] card-hover">
                <CardContent className="p-6">
                  <sector.icon className="w-10 h-10 text-[#3B82F6] mb-4" />
                  <h3 className="text-xl font-bold text-[#F0F4FF] mb-2">{sector.title}</h3>
                  <p className="text-[#8892A4]">{sector.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding" data-testid="barcelona-faqs">
        <div className="container-main">
          <h2 className="text-4xl font-bold text-[#F0F4FF] mb-8 text-center">
            Preguntas Frecuentes - Barcelona
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {BARCELONA_FAQS.map((faq, i) => (
              <div key={i} className="bg-[#161B22] rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-bold text-[#F0F4FF] mb-2">{faq.question}</h3>
                <p className="text-[#8892A4]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-main text-center">
          <div className="glass-card p-12 rounded-2xl">
            <h2 className="text-4xl font-bold text-[#F0F4FF] mb-4">¿Empezamos tu transformación en Barcelona?</h2>
            <p className="text-xl text-[#8892A4] mb-8 max-w-2xl mx-auto">
              Agenda una reunión sin compromiso. Nos encanta conocer nuevos proyectos barceloneses.
            </p>
            <Link to="/contacto">
              <Button className="btn-gradient text-base px-8 py-6">
                Contactar Ahora
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Barcelona;
