import React from 'react';
import { Instagram, Linkedin, Facebook, MessageCircle, Phone } from 'lucide-react';

const LinkHub = () => {
  const links = [
    {
      title: 'LEAPIFYES',
      subtitle: 'Transformación digital para tu negocio',
      url: 'https://www.leapifyes.com/',
      logo: 'https://res.cloudinary.com/dnjsjo6yx/image/upload/v1772800285/logo_de_leapifyes_circular_elr6v1.jpg'
    },
    {
      title: 'MANDO',
      subtitle: 'Control total de tu empresa',
      cta: 'Empieza ahora →',
      url: 'https://mando.leapifyes.com/',
      logo: 'https://res.cloudinary.com/dnjsjo6yx/image/upload/v1770925218/MANDO_by_Leapifyes_tajoao.png',
      isPremium: true
    },
    {
      title: 'ACCEDER A MANDO',
      subtitle: 'Entra a tu panel',
      url: 'https://appmando.leapifyes.com/login',
      logo: 'https://res.cloudinary.com/dnjsjo6yx/image/upload/v1770925218/MANDO_by_Leapifyes_tajoao.png'
    },
    {
      title: 'TRÉBOL FINANCE',
      subtitle: 'Organiza tu dinero',
      url: 'https://trebolfinance.leapifyes.com/login',
      logo: 'https://res.cloudinary.com/dnjsjo6yx/image/upload/v1773875277/Captura_de_pantalla_2026-03-19_a_las_0.07.19_fkku2s.png'
    },
    {
      title: 'LEAPIFYES IA',
      subtitle: 'Automatiza tu negocio',
      url: 'https://ia.leapifyes.com',
      logo: 'https://res.cloudinary.com/dnjsjo6yx/image/upload/v1773875048/ia-leapifyes_awkoh4.png'
    }
  ];

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center font-sans selection:bg-[#1B93A4]/30 overflow-x-hidden">
      {/* Background Hero */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("https://res.cloudinary.com/dnjsjo6yx/image/upload/v1773874874/DIGITAL_CONECTIONS_mf6h0z.jpg")' }}
      >
        <div className="absolute inset-0 bg-black/75 backdrop-brightness-50" />
      </div>

      <div className="relative z-10 w-full max-w-lg px-6 py-20 flex flex-col items-center">
        {/* Header Section */}
        <header className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <img 
              src="https://res.cloudinary.com/dnjsjo6yx/image/upload/v1772800285/logo_de_leapifyes_circular_elr6v1.jpg" 
              alt="Leapifyes" 
              className="w-20 h-20 rounded-full border border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.1)]"
            />
          </div>
          <h1 className="text-4xl font-black tracking-[0.3em] text-white mb-3 uppercase">
            LEAPIFYES
          </h1>
          <p className="text-[#1B93A4] text-base font-bold tracking-tight mb-4">
            La forma más inteligente de hacer crecer tu negocio hoy
          </p>
        </header>

        {/* Conversion Messaging */}
        <div className="w-full mb-12 text-center bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-sm">
          <h2 className="text-white text-xl font-black tracking-tight mb-2">
            👉 Elige cómo quieres avanzar
          </h2>
          <p className="text-white/60 text-sm font-medium">
            👉 Todas nuestras soluciones están conectadas entre sí.
          </p>
        </div>

        {/* Platforms List */}
        <main className="w-full space-y-4">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                group relative flex items-center w-full p-6 rounded-3xl transition-all duration-300
                backdrop-blur-xl shadow-2xl overflow-hidden
                ${link.isPremium 
                  ? 'bg-black/80 border-[#1B93A4]/40 scale-[1.04] z-20 shadow-[0_0_40px_rgba(27,147,164,0.1)] hover:border-[#1B93A4]/60' 
                  : 'bg-black/40 border-white/10 hover:bg-black/50 hover:border-white/20'
                }
                border-2
              `}
            >
              {/* Premium Glow Effect for MANDO */}
              {link.isPremium && (
                <div className="absolute inset-0 bg-gradient-to-br from-[#1B93A4]/10 via-transparent to-transparent pointer-events-none" />
              )}

              <div className={`
                flex-shrink-0 w-14 h-14 rounded-2xl bg-white/5 p-2.5 mr-6 transition-transform duration-500 group-hover:scale-110
                ${link.isPremium ? 'border border-[#1B93A4]/30' : 'border border-white/5'}
              `}>
                <img src={link.logo} alt="" className="w-full h-full object-contain" />
              </div>
              
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-white font-black text-xl tracking-tight leading-none">
                    {link.title}
                  </h3>
                  {link.isPremium && (
                    <span className="bg-[#1B93A4] text-black text-[9px] font-black px-1.5 py-0.5 rounded-md uppercase tracking-widest shadow-lg shadow-[#1B93A4]/30">
                      Core
                    </span>
                  )}
                </div>
                <p className="text-white/40 text-[11px] font-bold uppercase tracking-wider mb-2">
                  {link.subtitle}
                </p>
                {link.cta && (
                  <span className="inline-block text-[#1B93A4] text-xs font-black tracking-tight group-hover:translate-x-1 transition-transform">
                    {link.cta}
                  </span>
                )}
              </div>
              
              <div className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                <svg className={`w-6 h-6 ${link.isPremium ? 'text-[#1B93A4]' : 'text-white/10 group-hover:text-white/50'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="9 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          ))}
        </main>

        {/* Social Media & Contact Bar */}
        <div className="w-full flex flex-col items-center mt-14 mb-4">
          <span className="text-[10px] text-white/40 font-bold uppercase tracking-[0.3em] mb-4">
            Síguenos y Contacta
          </span>

          <div className="flex justify-center items-center gap-8 py-4 px-10 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl transition-all duration-300 hover:bg-white/5">
            
            {/* 1. Instagram */}
            <a 
              href="https://www.instagram.com/leapifyes?igsh=eHhndDhhcjJ3ZXNh" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white hover:scale-110 transition-all duration-200"
              title="Instagram"
            >
              <Instagram className="w-6 h-6" />
            </a>

            {/* 2. LinkedIn */}
            <a 
              href="https://www.linkedin.com/company/leapifyes/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white hover:scale-110 transition-all duration-200"
              title="LinkedIn"
            >
              <Linkedin className="w-6 h-6" />
            </a>

            {/* 3. WhatsApp */}
            <a 
              href="https://wa.me/34694214849" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white hover:scale-110 transition-all duration-200"
              title="WhatsApp"
            >
              <MessageCircle className="w-6 h-6" />
            </a>

            {/* 4. Llamada */}
            <a 
              href="tel:+34694214849" 
              className="text-white/70 hover:text-white hover:scale-110 transition-all duration-200"
              title="Llamar ahora"
            >
              <Phone className="w-6 h-6" />
            </a>

            {/* 5. Facebook (Coming soon) */}
            <div 
              className="text-white/70 opacity-40 cursor-not-allowed"
              title="Facebook (Próximamente)"
            >
              <Facebook className="w-6 h-6" />
            </div>

          </div>
        </div>

        {/* Footer Section */}
        <footer className="mt-24 text-center space-y-4">
          <p className="text-white text-sm font-black tracking-tight bg-white/5 px-6 py-2 rounded-full border border-white/10 inline-block backdrop-blur-sm">
            Leapifyes — No es software. Es evolución.
          </p>
          <p className="text-[10px] text-white/20 font-bold tracking-[0.6em] uppercase block pt-8">
            &copy; {new Date().getFullYear()} Leapifyes Ecosystem
          </p>
        </footer>
      </div>
    </div>
  );
};

export default LinkHub;
