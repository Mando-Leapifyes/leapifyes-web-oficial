import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Clock, ChevronRight, Search } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import Layout from '../components/layout/Layout';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const BLOG_POSTS = [
  { id: 1, slug: 'guia-transformacion-digital-pymes', title: 'Guía Completa de Transformación Digital para PYMEs en 2025', excerpt: 'Todo lo que necesitas saber para digitalizar tu negocio sin morir en el intento. Sin tecnicismos, con ejemplos reales.', category: 'Transformación Digital', readTime: '8 min', date: '15 Dic 2024', featured: true },
  { id: 2, slug: 'agentes-ia-atencion-cliente', title: 'Cómo los Agentes de IA están revolucionando la atención al cliente', excerpt: 'Casos reales de empresas que han multiplicado su capacidad de atención sin aumentar plantilla.', category: 'Agentes IA', readTime: '6 min', date: '10 Dic 2024', featured: true },
  { id: 3, slug: 'automatizacion-whatsapp-negocios', title: 'WhatsApp Business + IA: La combinación que multiplica conversiones', excerpt: 'Aprende a configurar un sistema de atención automatizada en WhatsApp que cualifica y convierte 24/7.', category: 'Automatización', readTime: '5 min', date: '5 Dic 2024', featured: false },
  { id: 4, slug: 'roi-transformacion-digital', title: 'Cómo calcular el ROI de tu inversión en transformación digital', excerpt: 'Métricas claras y metodología práctica para justificar y medir el retorno de tu proyecto de digitalización.', category: 'Estrategia', readTime: '7 min', date: '28 Nov 2024', featured: false },
  { id: 5, slug: 'errores-digitalizacion-pymes', title: '5 errores que cometen las PYMEs al digitalizar (y cómo evitarlos)', excerpt: 'Lecciones aprendidas de más de 50 proyectos de transformación digital en Barcelona.', category: 'Transformación Digital', readTime: '4 min', date: '20 Nov 2024', featured: false },
  { id: 6, slug: 'crm-pequenas-empresas', title: 'El mejor CRM para pequeñas empresas: Guía de selección 2025', excerpt: 'Comparativa honesta de las mejores opciones de CRM para negocios de 5 a 50 empleados.', category: 'Herramientas', readTime: '10 min', date: '15 Nov 2024', featured: false },
];

const CATEGORIES = ['Todos', 'Transformación Digital', 'Agentes IA', 'Automatización', 'Estrategia', 'Herramientas'];

const Recursos = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = BLOG_POSTS.filter(post => post.featured);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden" data-testid="recursos-hero">
        <div className="absolute inset-0"><div className="mesh-gradient opacity-40" /></div>
        <div className="container-main relative z-10">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-3xl mx-auto text-center">
            <motion.div variants={fadeInUp} className="flex items-center justify-center gap-2 mb-6">
              <BookOpen className="w-5 h-5 text-[#1B93A4]" />
              <span className="text-sm font-medium text-[#8892A4]">Blog & Recursos</span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl font-bold text-[#F0F4FF] mb-6">
              Ideas para <span className="gradient-text">transformar</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-[#8892A4] leading-relaxed">
              Artículos, guías y recursos prácticos sobre transformación digital, automatización e IA para PYMEs.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8 border-y border-white/5" data-testid="recursos-filter">
        <div className="container-main">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8892A4]" />
              <Input type="text" placeholder="Buscar artículos..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 bg-white/5 border-white/10 text-[#F0F4FF] placeholder:text-[#8892A4]/50" data-testid="recursos-search" />
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((category) => (
                <button key={category} onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === category ? 'bg-[#1B93A4] text-white' : 'bg-white/5 text-[#8892A4] hover:bg-white/10'}`}
                  data-testid={`filter-${category.toLowerCase().replace(/\s+/g, '-')}`}
                >{category}</button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {selectedCategory === 'Todos' && searchTerm === '' && (
        <section className="section-padding" data-testid="recursos-featured">
          <div className="container-main">
            <h2 className="text-2xl font-bold text-[#F0F4FF] mb-8">Destacados</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <motion.div key={post.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                  <div className="glass-card-hover overflow-hidden">
                    <div className="h-48 bg-gradient-to-br from-[#1B93A4]/10 via-[#3B82F6]/10 to-[#D946EF]/10" />
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="px-3 py-1 bg-[#1B93A4]/20 text-[#1B93A4] text-xs font-medium rounded-full">{post.category}</span>
                        <span className="flex items-center gap-1 text-xs text-[#8892A4]"><Clock className="w-3 h-3" />{post.readTime}</span>
                      </div>
                      <h3 className="text-xl font-bold text-[#F0F4FF] mb-2 line-clamp-2">{post.title}</h3>
                      <p className="text-[#8892A4] text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-[#8892A4]">{post.date}</span>
                        <span className="flex items-center gap-1 text-sm font-medium text-[#1B93A4]">Leer más <ChevronRight className="w-4 h-4" /></span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="section-padding border-t border-white/5" data-testid="recursos-all">
        <div className="container-main">
          <h2 className="text-2xl font-bold text-[#F0F4FF] mb-8">{selectedCategory === 'Todos' ? 'Todos los artículos' : selectedCategory}</h2>
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-[#8892A4] text-lg">No se encontraron artículos.</p>
              <Button className="btn-secondary mt-4" onClick={() => { setSearchTerm(''); setSelectedCategory('Todos'); }}>Ver todos los artículos</Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.div key={post.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}>
                  <div className="glass-card-hover p-6 h-full">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="px-3 py-1 bg-white/5 text-[#8892A4] text-xs font-medium rounded-full">{post.category}</span>
                      <span className="flex items-center gap-1 text-xs text-[#8892A4]"><Clock className="w-3 h-3" />{post.readTime}</span>
                    </div>
                    <h3 className="text-lg font-bold text-[#F0F4FF] mb-2 line-clamp-2">{post.title}</h3>
                    <p className="text-[#8892A4] text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#8892A4]">{post.date}</span>
                      <span className="flex items-center gap-1 text-sm font-medium text-[#8892A4] hover:text-[#1B93A4]">Leer <ChevronRight className="w-4 h-4" /></span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1B93A4]/10 via-transparent to-[#D946EF]/10" />
        <div className="container-main relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card p-12 md:p-16 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-[#F0F4FF] mb-4">¿Quieres más contenido así?</h2>
              <p className="text-lg text-[#8892A4] mb-8">Suscríbete a nuestra newsletter semanal. Sin spam, solo valor.</p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input type="email" placeholder="tu@email.com" className="flex-1 bg-white/5 border-white/10 text-[#F0F4FF] placeholder:text-[#8892A4]/50" data-testid="newsletter-email" />
                <Button className="btn-gradient" data-testid="newsletter-submit">Suscribir</Button>
              </div>
              <p className="text-xs text-[#8892A4] mt-4">
                Al suscribirte aceptas nuestra <Link to="/legal/privacidad" className="underline text-[#1B93A4]">política de privacidad</Link>.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Recursos;
