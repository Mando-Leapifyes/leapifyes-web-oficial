import React from 'react';

const LinkHub = () => {
  const links = [
    {
      title: 'LEAPIFYES',
      url: 'https://www.leapifyes.com/',
      logo: 'https://res.cloudinary.com/dnjsjo6yx/image/upload/v1772800285/logo_de_leapifyes_circular_elr6v1.jpg',
      accent: '#1B93A4' // Leapifyes Turquoise
    },
    {
      title: 'MANDO',
      url: 'https://mando.leapifyes.com/',
      logo: 'https://res.cloudinary.com/dnjsjo6yx/image/upload/v1770925218/MANDO_by_Leapifyes_tajoao.png',
      accent: '#3B82F6' // Blue
    },
    {
      title: 'ACCEDER A MANDO',
      url: 'https://appmando.leapifyes.com/login',
      logo: 'https://res.cloudinary.com/dnjsjo6yx/image/upload/v1770925218/MANDO_by_Leapifyes_tajoao.png',
      accent: '#3B82F6'
    },
    {
      title: 'TRÉBOL FINANCE',
      url: 'https://trebolfinance.leapifyes.com/login',
      logo: null,
      accent: '#10b981' // Green
    },
    {
      title: 'LEAPIFYES IA',
      url: 'https://ia.leapifyes.com',
      logo: null,
      accent: '#D946EF' // Magenta
    }
  ];

  return (
    <div className="min-h-screen bg-[#080B14] text-white flex flex-col items-center px-6 py-24 font-sans selection:bg-[#1B93A4]/30 overflow-y-auto">
      {/* Header — Estilo Apple Minimal */}
      <header className="text-center mb-20 max-w-xs mx-auto">
        <h1 className="text-2xl font-black tracking-[0.2em] text-white mb-2 uppercase">
          LEAPIFYES
        </h1>
        <p className="text-[#8892A4] text-sm font-medium tracking-tight">
          Accede a nuestro ecosistema
        </p>
        <p className="text-sm text-[#8892A4] text-center max-w-xs mx-auto mt-4">
          Transformación digital sin complicaciones.<br />
          Accede a nuestras herramientas y soluciones para organizar, automatizar y hacer crecer tu negocio desde un solo lugar.
        </p>
      </header>

      {/* Lista de Botones — Unificada */}
      <main className="w-full max-w-xs space-y-4">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center w-full p-4 rounded-2xl bg-white text-black transition-all duration-300 hover:opacity-90 hover:shadow-sm active:opacity-80 relative overflow-hidden cursor-pointer"
          >
            {/* Sutil acento de branding (Borde izquierdo) */}
            <div 
              className="absolute left-0 top-0 bottom-0 w-1 transition-transform" 
              style={{ backgroundColor: link.accent }}
            />
            
            {/* Logo (24px) */}
            <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center ml-2 mr-3 pointer-events-none">
              {link.logo ? (
                <img 
                  src={link.logo} 
                  alt={link.title} 
                  className="w-full h-full object-contain" 
                  style={{ maxHeight: '24px', maxWidth: '24px' }}
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-gray-200" />
              )}
            </div>

            {/* Texto */}
            <span className="font-bold text-sm tracking-tight">
              {link.title}
            </span>
          </a>
        ))}
      </main>

      {/* Footer — Mucho aire */}
      <footer className="mt-auto pt-32 pb-8 text-center">
        <p className="text-[10px] text-[#525B70] font-bold tracking-[0.3em] uppercase opacity-40">
          &copy; {new Date().getFullYear()} Leapifyes
        </p>
      </footer>
    </div>
  );
};

export default LinkHub;
