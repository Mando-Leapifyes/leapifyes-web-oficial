import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Users, Target, Eye, Heart, Zap, Shield, Linkedin } from 'lucide-react';
import { Button } from '../components/ui/button';
import Layout from '../components/layout/Layout';
import SEO from '../components/SEO';
import { ASSETS } from '../lib/assets';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const Empresa = () => {
  return (
    <Layout>
      <SEO
        title="Sobre Nosotros | Leapifyes — Transformación Digital Barcelona"
        description="Leapifyes nació para resolver un problema real: hacer la transformación digital accesible para pymes y autónomos en España. Conoce nuestro equipo, visión y propósito."
        path="/empresa"
      />

      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden" data-testid="empresa-hero">
        <div className="absolute inset-0"><div className="mesh-gradient opacity-40" /><div className="grid-pattern absolute inset-0 opacity-20" /></div>
        <div className="container-main relative z-10">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-3xl">
            <motion.div variants={fadeInUp} className="flex items-center gap-2 mb-6">
              <Users className="w-5 h-5 text-[#1B93A4]" />
              <span className="text-sm font-medium text-[#8892A4]">Sobre Nosotros</span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl font-bold text-[#F0F4FF] mb-6">
              Somos tu <span className="gradient-text">socio digital</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-[#8892A4] leading-relaxed">
              Con Leapifyes, lo digital deja de ser un problema y se convierte en tu ventaja.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Nuestra Historia */}
      <section className="section-padding border-t border-white/5" data-testid="empresa-historia">
        <div className="container-main">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-4xl font-bold text-[#F0F4FF] mb-8">Nuestra Historia</h2>
              <div className="space-y-6 text-lg text-[#8892A4] leading-relaxed">
                <p>Leapifyes nació para resolver un problema real: miles de pymes, autónomos y emprendedores que se sienten fuera de lugar en lo digital. El papeleo, la burocracia y el miedo a la tecnología les quitan tiempo, clientes y tranquilidad.</p>
                <p>Nosotros creemos que la transformación digital no puede ser un lujo ni una moda: debe ser simple, sin imposiciones, sin tecnicismos y sin herramientas innecesarias.</p>
                <p>En Leapifyes te ayudamos a elegir lo que de verdad necesitas, a digitalizar tus procesos diarios y a ganar tiempo para lo más importante: tu negocio y tu vida.</p>
                <p><span className="text-[#F0F4FF] font-medium">No somos consultores que hablan difícil. Somos tu socio digital,</span> con una promesa clara: Con Leapifyes, lo digital deja de ser un problema y se convierte en tu ventaja.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Visión, Misión, Propósito */}
      <section className="section-padding border-t border-white/5" data-testid="empresa-vision">
        <div className="container-main">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Eye,
                title: 'Visión',
                text: 'Que ninguna pyme ni autónomo quede atrás en lo digital. Queremos ser el referente que haga la transformación digital accesible, rentable y sencilla, para que cada negocio compita al nivel que exige el mercado.',
              },
              {
                icon: Target,
                title: 'Misión',
                text: 'Simplificamos lo digital para pymes y emprendedores: solo lo necesario, menos trámites, más tiempo y mejores resultados. Nuestro propósito: más clientes, más orden y más vida.',
              },
              {
                icon: Heart,
                title: 'Propósito',
                text: 'En Leapifyes democratizamos la digitalización: hacemos la transformación digital accesible y cercana. Todo negocio, sin importar su tamaño, merece herramientas, estrategia y acompañamiento para crecer y competir en la era digital.',
              },
            ].map((item, index) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="glass-card p-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1B93A4]/20 to-[#3B82F6]/20 flex items-center justify-center mb-6">
                  <item.icon className="w-6 h-6 text-[#1B93A4]" />
                </div>
                <h3 className="text-2xl font-bold text-[#F0F4FF] mb-4">{item.title}</h3>
                <p className="text-[#8892A4] leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Nuestro Fundador */}
      <section className="section-padding border-t border-white/5" data-testid="empresa-fundador">
        <div className="container-main">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-12">
            <motion.h2 variants={fadeInUp} className="text-4xl font-bold text-[#F0F4FF] mb-4">Nuestro Fundador</motion.h2>
          </motion.div>

          <div className="grid lg:grid-cols-[0.4fr_1fr] gap-12 lg:gap-16 items-start max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="mx-auto lg:mx-0">
              <img
                src={ASSETS.fotoRicardo}
                alt="Ricardo Serrano, Fundador y CEO de Leapifyes, Barcelona"
                className="w-full max-w-[360px] h-[440px] object-cover object-top rounded-[20px]"
                style={{ border: '2px solid rgba(27,147,164,0.3)', boxShadow: '0 20px 60px rgba(27,147,164,0.15)' }}
                loading="lazy"
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h3 className="text-3xl font-bold text-[#F0F4FF] mb-2">Ricardo Serrano</h3>
              <p className="text-[#1B93A4] font-medium mb-6">Fundador y CEO de Leapifyes</p>
              
              <div className="space-y-4 text-[#8892A4] leading-relaxed mb-8">
                <p>Transformador digital con visión humana. Ricardo Serrano creó Leapifyes porque miles de pymes lo necesitan. Entendió, desde la calle y desde dentro, que la transformación digital no puede seguir siendo un lujo para unos pocos ni una moda de palabras vacías.</p>
                <p>Con más de una década trabajando directamente con negocios, vio una realidad que se repetía: empresas con talento y potencial, pero sin herramientas. Negocios con ganas de crecer, pero atrapados en sistemas obsoletos.</p>
                <p>Así nació Leapifyes: de la obsesión por unir lo digital con lo humano y transformar la tecnología en una aliada accesible, útil y rentable para cada pequeño empresario.</p>
                <p>Como ideólogo de Leapifyes, defiende una visión clara: <span className="text-[#F0F4FF] font-medium">acompañar sin imponer, hablar el idioma del cliente y ofrecer soluciones digitales con propósito, corazón y resultados.</span></p>
              </div>

              <a href="https://www.linkedin.com/in/ricardoserrano" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-[#8892A4] hover:text-[#F0F4FF] transition-colors border border-white/10">
                <Linkedin className="w-5 h-5" />
                Conectar en LinkedIn
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* El Equipo */}
      <section className="section-padding border-t border-white/5" data-testid="empresa-team">
        <div className="container-main">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="max-w-3xl mb-12">
            <motion.h2 variants={fadeInUp} className="text-4xl font-bold text-[#F0F4FF] mb-4">Nuestro Equipo</motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-[#8892A4]">Un equipo multidisciplinar que combina tecnología, negocio y mucha empatía.</motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Zap, name: 'Equipo Técnico', desc: 'Desarrolladores, arquitectos de soluciones y especialistas en IA con experiencia en proyectos reales.' },
              { icon: Target, name: 'Consultores de Negocio', desc: 'Profesionales con background en operaciones, estrategia y transformación de PYMEs.' },
              { icon: Heart, name: 'Customer Success', desc: 'Equipo dedicado a asegurar que cada cliente consiga los resultados esperados.' },
            ].map((member, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="glass-card-hover p-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1B93A4]/20 to-[#3B82F6]/20 flex items-center justify-center mb-6">
                  <member.icon className="w-7 h-7 text-[#1B93A4]" />
                </div>
                <h3 className="text-xl font-bold text-[#F0F4FF] mb-2">{member.name}</h3>
                <p className="text-[#8892A4]">{member.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Barcelona */}
      <section className="section-padding border-t border-white/5" data-testid="empresa-barcelona">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-card p-8 text-center">
              <div className="text-6xl font-black gradient-text mb-4">BCN</div>
              <p className="text-xl text-[#F0F4FF] font-semibold mb-2">Barcelona, nuestra casa</p>
              <p className="text-[#8892A4]">Conocemos el tejido empresarial catalán, sus retos y oportunidades.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-4xl font-bold text-[#F0F4FF] mb-6">¿Por qué Barcelona?</h2>
              <p className="text-lg text-[#8892A4] mb-6 leading-relaxed">
                Barcelona es nuestra casa. Conocemos el tejido empresarial catalán, sus retos y oportunidades. En Leapifyes hablamos tu idioma y entendemos tu cultura de negocio.
              </p>
              <ul className="space-y-4">
                {['Presencia local con mentalidad global', 'Red de partners y proveedores de confianza', 'Conocimiento profundo del mercado catalán', 'Soporte en catalán, castellano e inglés'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-[#1B93A4]" />
                    <span className="text-[#8892A4]">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1B93A4]/10 via-transparent to-[#D946EF]/10" />
        <div className="container-main relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card p-12 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#F0F4FF] mb-4">¿Conectamos?</h2>
            <p className="text-lg text-[#8892A4] mb-8 max-w-2xl mx-auto">En Leapifyes nos encanta conocer nuevos proyectos. Cuéntanos qué tienes en mente.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="https://crm.zoho.eu/bookings/Calendariodelaweb" target="_blank" rel="noopener noreferrer">
                <Button className="btn-gradient text-base px-8 py-6" data-testid="empresa-cta-btn">
                  Agendar diagnóstico gratuito <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
              <Link to="/contacto">
                <Button className="btn-secondary text-base px-8 py-6">
                  Contactar con el equipo
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Empresa;
