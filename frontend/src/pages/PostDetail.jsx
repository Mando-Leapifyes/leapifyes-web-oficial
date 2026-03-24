import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Tag, 
  Share2, 
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { useEffect } from 'react';
import { Button } from '../components/ui/button';
import Layout from '../components/layout/Layout';
import SEO from '../components/SEO';
import { BLOG_POSTS } from '../lib/blogData';
import { trackEvent } from '../lib/analytics';

const fadeInUp = { 
  hidden: { opacity: 0, y: 30 }, 
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } } 
};

const PostDetail = () => {
  const { slug } = useParams();
  const post = BLOG_POSTS.find(p => p.slug === slug);

  useEffect(() => {
    if (post) {
      trackEvent('blog_post_view', { 
        post_title: post.title,
        post_category: post.category 
      });
      window.scrollTo(0, 0);
    }
  }, [post]);

  if (!post) return <Navigate to="/recursos" replace />;

  // Special case for the new article with full sections
  const hasFullContent = post.sections && post.sections.length > 0;

  const handleCTAClick = () => {
    trackEvent('blog_cta_click', {
      post_title: post.title,
      cta_text: post.cta?.text || 'Standard CTA'
    });
  };

  return (
    <Layout>
      <SEO 
        title={post.meta?.title || `${post.title} | Leapifyes`}
        description={post.meta?.description || post.excerpt}
        image={post.image}
        path={`/recursos/${post.slug}`}
      />

      <article className="pb-24">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden border-b border-white/5">
          <div className="absolute inset-0">
            <div className="mesh-gradient opacity-30" />
            <div className="grid-pattern absolute inset-0 opacity-10" />
          </div>
          
          <div className="container-main relative z-10">
            <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="max-w-4xl">
              <Link 
                to="/recursos" 
                className="inline-flex items-center gap-2 text-[#8892A4] hover:text-[#F0F4FF] transition-colors mb-8 group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Volver a recursos
              </Link>

              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="px-3 py-1 bg-[#1B93A4]/20 text-[#1B93A4] text-xs font-bold rounded-full uppercase tracking-wider">
                  {post.category}
                </span>
                <div className="flex items-center gap-2 text-[#8892A4] text-sm font-medium">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </div>
                <div className="flex items-center gap-2 text-[#8892A4] text-sm font-medium">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-[#F0F4FF] mb-6 leading-tight">
                {post.title}
              </h1>
              
              {post.subtitle && (
                <p className="text-xl md:text-2xl text-[#8892A4] font-medium max-w-3xl mb-8">
                  {post.subtitle}
                </p>
              )}
            </motion.div>
          </div>
        </section>

        {/* Featured Image */}
        {post.image && (
          <section className="container-main -mt-12 md:-mt-20 relative z-20 mb-16">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="rounded-3xl overflow-hidden glass-card border border-white/10 aspect-[21/9]"
            >
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </section>
        )}

        {/* Content Section */}
        <section className="container-main">
          <div className="grid lg:grid-cols-[1fr_300px] gap-16">
            <main className="prose prose-invert max-w-none">
              {!hasFullContent ? (
                <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10 p-8">
                  <p className="text-[#8892A4] text-lg mb-6">Estamos publicando el contenido completo de este artículo. ¡Vuelve pronto!</p>
                  <p className="text-[#F0F4FF] italic">"{post.excerpt}"</p>
                </div>
              ) : (
                <motion.div 
                  initial="hidden" 
                  whileInView="visible" 
                  viewport={{ once: true }}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
                  }}
                >
                  {post.sections.map((section, idx) => {
                    if (section.type === 'intro') {
                      return <motion.p key={idx} variants={fadeInUp} className="text-xl text-[#F0F4FF] font-medium leading-relaxed mb-12">{section.content}</motion.p>;
                    }
                    if (section.type === 'heading') {
                      const Tag = `h${section.level}`;
                      return <motion.h2 key={idx} variants={fadeInUp} className="text-3xl md:text-4xl font-black text-[#F0F4FF] mt-16 mb-8 uppercase tracking-tight">{section.title}</motion.h2>;
                    }
                    if (section.type === 'paragraph') {
                      return <motion.p key={idx} variants={fadeInUp} className="text-[#8892A4] text-lg leading-relaxed mb-8">{section.content}</motion.p>;
                    }
                    if (section.type === 'image') {
                      return (
                        <motion.div key={idx} variants={fadeInUp} className="my-16 space-y-4">
                          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                            <img src={section.url} alt={section.caption} className="w-full h-auto" />
                          </div>
                          {section.caption && (
                            <p className="text-center text-sm text-[#8892A4] font-medium italic">{section.caption}</p>
                          )}
                        </motion.div>
                      );
                    }
                    return null;
                  })}
                </motion.div>
              )}

              {/* Sidebar Content (Hidden on Mobile) */}
              <div className="mt-20 pt-12 border-t border-white/5">
                <div className="flex flex-wrap gap-4 items-center justify-between">
                  <div className="flex gap-2">
                    <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-[#8892A4] font-bold uppercase transition-colors hover:border-[#1B93A4]/50 hover:text-[#1B93A4]">
                      <Tag className="w-3 h-3" />
                      {post.category}
                    </span>
                  </div>
                  <button 
                    onClick={() => navigator.share?.({ title: post.title, url: window.location.href })}
                    className="flex items-center gap-2 text-sm text-[#8892A4] hover:text-[#F0F4FF] transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    Compartir artículo
                  </button>
                </div>
              </div>
            </main>

            <aside className="hidden lg:block space-y-8">
              <div className="glass-card p-8 sticky top-32">
                <h3 className="text-xl font-bold text-[#F0F4FF] mb-4">¿Te ayudamos?</h3>
                <p className="text-[#8892A4] text-sm mb-6 leading-relaxed">
                  Analizamos tu negocio gratis y diseñamos un sistema a medida para que dejes de apagar fuegos.
                </p>
                <Link to="/diagnostico">
                  <Button className="w-full btn-gradient py-6" onClick={handleCTAClick}>
                    Agendar diagnóstico <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <p className="mt-4 text-[10px] text-center text-[#8892A4]/50 font-bold uppercase tracking-wider">
                  Sin compromisos · 30 min · Estrategia real
                </p>
              </div>

              <div className="glass-card p-8">
                <h3 className="text-xl font-bold text-[#F0F4FF] mb-6">Próximos pasos</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Casos de Éxito', link: '/casos' },
                    { label: 'Nuestro Método', link: '/metodo' },
                    { label: 'Ver Soluciones', link: '/soluciones' },
                  ].map((step, i) => (
                    <Link key={i} to={step.link} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all group">
                      <span className="text-sm text-[#F0F4FF] font-medium">{step.label}</span>
                      <ChevronRight className="w-4 h-4 text-[#8892A4] group-hover:text-[#1B93A4] transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* Final CTA (Visible on all screens) */}
        {post.cta && (
          <section className="container-main mt-24">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden p-12 md:p-20 text-center"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#1B93A4]/20 via-transparent to-[#D946EF]/20" />
              <div className="absolute inset-0 border border-white/10 rounded-3xl" />
              
              <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-black text-[#F0F4FF] mb-8 leading-tight">
                  {post.cta.text}
                </h2>
                <Link to={post.cta.link}>
                  <Button className="btn-gradient text-lg px-10 py-8" onClick={handleCTAClick}>
                    Empezar ahora <ArrowRight className="w-6 h-6 ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </section>
        )}
      </article>
    </Layout>
  );
};

export default PostDetail;
