import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Building2, CheckCircle2, Globe } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import Layout from '../components/layout/Layout';
import SEO from '../components/SEO';
import { generateFAQSchema, generateBreadcrumbSchema, schemaToString } from '../lib/schemas';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const CATALUNA_FAQS = [
  {
    question: '¿Trabajáis en toda Cataluña o solo en Barcelona?',
    answer: 'Trabajamos en toda Cataluña: Barcelona, Girona, Tarragona y Lleida. Combinamos presencia presencial cuando es necesario con trabajo remoto eficiente.'
  },
  {
    question: '¿Ofrecéis servicios en catalán?',
    answer: 'Sí, nuestro equipo es bilingüe y ofrecemos todos nuestros servicios tanto en castellano como en catalán. La documentación y formación pueden ser en el idioma que prefieras.'
  },
  {
    question: '¿Qué sectores atendéis en Cataluña?',
    answer: 'Nos especializamos en servicios del hogar (reformas, mantenimiento), clínicas de salud (dental, estética, médica) y servicios profesionales (abogados, asesorías, consultorías).'
  },
  {
    question: '¿Cómo funcionan los proyectos fuera de Barcelona?',
    answer: 'Hacemos kick-off presencial, visitas clave en persona y el resto del proyecto de forma remota con videollamadas semanales. Funciona igual de bien que en Barcelona.'
  },
  {
    question: '¿Tenéis casos de éxito en Girona, Tarragona o Lleida?',
    answer: 'Sí, hemos trabajado con empresas en las cuatro provincias. Podemos compartir referencias de clientes en tu zona durante la fase de evaluación.'
  }
];

const Cataluna = () => {
  const breadcrumbs = [
    { name: 'Inicio', path: '/' },
    { name: 'Cataluña', path: '/cataluna' }
  ];

  const provinces = [
    { name: 'Barcelona', cities: ['Barcelona ciudad', 'Hospitalet', 'Badalona', 'Terrassa', 'Sabadell'] },
    { name: 'Girona', cities: ['Girona ciudad', 'Figueres', 'Olot', 'Blanes', 'Lloret'] },
    { name: 'Tarragona', cities: ['Tarragona ciudad', 'Reus', 'Tortosa', 'Cambrils', 'Salou'] },
    { name: 'Lleida', cities: ['Lleida ciudad', 'Balaguer', 'Tàrrega', 'La Seu d\'Urgell'] },
  ];

  return (
    <Layout>
      <SEO path="/cataluna" />
      
      <script type="application/ld+json">
        {schemaToString(generateBreadcrumbSchema(breadcrumbs))}
      </script>
      <script type="application/ld+json">
        {schemaToString(generateFAQSchema(CATALUNA_FAQS))}
      </script>

      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden" data-testid="cataluna-hero">
        <div className="absolute inset-0"><div className="mesh-gradient opacity-40" /><div className="grid-pattern absolute inset-0 opacity-20" /></div>
        
        <div className="container-main relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
              <motion.div variants={fadeInUp} className="flex items-center gap-2 mb-6">
                <Globe className="w-5 h-5 text-[#1B93A4]" />
                <span className="text-sm font-medium text-[#8892A4]">Cataluña</span>
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl font-bold text-[#F0F4FF] mb-6 leading-tight">
                Transformació Digital a <span className="gradient-text">Catalunya</span>
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="text-xl text-[#8892A4] mb-8 leading-relaxed">
                Acompanyem empreses de tot Catalunya en la seva transformació digital. Barcelona, Girona, Tarragona i Lleida. Parlem el teu idioma i entenem el teu mercat.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <Link to="/contacto">
                  <Button className="btn-gradient text-base px-8 py-6" data-testid="cataluna-demo-btn">
                    Agendar Demo
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/barcelona">
                  <Button variant="outline" className="text-base px-8 py-6 border-white/10 text-[#F0F4FF] hover:bg-white/5">
                    Ver Barcelona
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
                src="https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&q=80"
                alt="Cataluña paisaje - Transformación digital"
                className="rounded-2xl w-full h-[450px] object-cover border border-white/10"
                loading="lazy"
                width="800"
                height="450"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Coverage Map */}
      <section className="section-padding">
        <div className="container-main">
          <h2 className="text-4xl font-bold text-[#F0F4FF] mb-8 text-center">
            Presencia en toda Cataluña
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {provinces.map((province, i) => (
              <Card key={i} className="border-white/10 bg-[#161B22]">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="w-5 h-5 text-[#1B93A4]" />
                    <h3 className="text-xl font-bold text-[#F0F4FF]">{province.name}</h3>
                  </div>
                  <ul className="space-y-1">
                    {province.cities.map((city, j) => (
                      <li key={j} className="text-sm text-[#8892A4]">• {city}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-[#F0F4FF] mb-6">
                Ventajas de trabajar con un partner local
              </h2>
              <ul className="space-y-4">
                {[
                  'Entendemos la cultura empresarial catalana',
                  'Conocemos la normativa y regulaciones locales',
                  'Red de contactos y partners en la zona',
                  'Soporte en catalán y castellano',
                  'Visitas presenciales cuando las necesites',
                  'Referencias verificables en tu provincia',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#1B93A4] flex-shrink-0" />
                    <span className="text-[#8892A4]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#161B22] rounded-2xl p-8 border border-white/10">
              <Building2 className="w-12 h-12 text-[#3B82F6] mb-4" />
              <h3 className="text-2xl font-bold text-[#F0F4FF] mb-4">
                Modelo de trabajo híbrido
              </h3>
              <p className="text-[#8892A4] mb-4">
                Combinamos lo mejor de ambos mundos: proximidad cuando importa, eficiencia del trabajo remoto cuando no.
              </p>
              <ul className="space-y-2 text-sm text-[#8892A4]">
                <li>• Kick-off presencial en tu oficina</li>
                <li>• Seguimiento semanal por videollamada</li>
                <li>• Formación presencial de tu equipo</li>
                <li>• Soporte continuo remoto</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding" data-testid="cataluna-faqs">
        <div className="container-main">
          <h2 className="text-4xl font-bold text-[#F0F4FF] mb-8 text-center">
            Preguntas Frecuentes - Cataluña
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {CATALUNA_FAQS.map((faq, i) => (
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
            <h2 className="text-4xl font-bold text-[#F0F4FF] mb-4">Transformem el teu negoci a Catalunya</h2>
            <p className="text-xl text-[#8892A4] mb-8 max-w-2xl mx-auto">
              Siguis on siguis a Catalunya, podem ajudar-te. Parlem?
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contacto">
                <Button className="btn-gradient text-base px-8 py-6">
                  Contactar
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/app/diagnostico">
                <Button variant="outline" className="text-base px-8 py-6 border-white/10 text-[#F0F4FF] hover:bg-white/5">
                  Diagnòstic Gratuït
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Cataluna;
