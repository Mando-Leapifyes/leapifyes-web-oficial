import React from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, 
  Rocket, 
  Lock, 
  Bot, 
  Coins, 
  Calendar,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { ASSETS } from '@/lib/assets';

const LinkHub = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  const links = [
    {
      id: 'main-web',
      title: 'Leapifyes',
      subtitle: 'Transformación Digital con propósito',
      url: 'https://www.leapifyes.com',
      icon: <Globe className="w-5 h-5" />,
      primary: true,
      category: 'CORPORATIVO'
    },
    {
      id: 'mando-web',
      title: 'Ver MANDO',
      subtitle: 'ERP para reformas y construcción',
      url: 'https://mando.leapifyes.com',
      icon: <Rocket className="w-5 h-5" />,
      category: 'PRODUCTO CORE'
    },
    {
      id: 'mando-app',
      title: 'Acceder a MANDO',
      subtitle: 'Gestión inteligente de obras',
      url: 'https://appmando.leapifyes.com',
      icon: <Lock className="w-5 h-5" />,
      category: 'PRODUCTO CORE'
    },
    {
      id: 'ia-web',
      title: 'Leapifyes IA',
      subtitle: 'Agentes inteligentes para tu pyme',
      url: 'https://ia.leapifyes.com',
      icon: <Bot className="w-5 h-5" />,
      category: 'INNOVACIÓN'
    },
    {
      id: 'trebol-web',
      title: 'Trébol Finance',
      subtitle: 'Fintech personal con IA',
      url: 'https://trebolfinance.leapifyes.com',
      icon: <Coins className="w-5 h-5" />,
      category: 'EXPANSIÓN'
    },
    {
      id: 'booking',
      title: 'Agendar asesoría',
      subtitle: 'Hablemos de tu proyecto',
      url: 'https://crm.zoho.eu/bookings/Calendariodelaweb',
      icon: <Calendar className="w-5 h-5" />,
      highlight: true,
      category: 'CONVERSIÓN'
    }
  ];

  return (
    <div className="min-h-screen bg-[#080B14] text-[#F0F4FF] overflow-x-hidden relative selection:bg-[#1B93A4]/30">
      {/* Background Elements */}
      <div className="fixed inset-0 grid-pattern opacity-[0.03] pointer-events-none" />
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-lg pointer-events-none">
        <div className="absolute top-[-10%] left-[-20%] w-[140%] h-[60%] bg-radial-gradient from-[#1B93A4]/20 via-transparent to-[#D946EF]/10 blur-[120px] rounded-full opacity-50" />
      </div>

      <div className="container max-w-lg mx-auto px-6 pt-16 pb-24 relative z-10">
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <div className="relative group p-1 rounded-full bg-gradient-to-tr from-[#1B93A4] via-[#F0F4FF]/20 to-[#D946EF] p-[2px]">
              <div className="bg-[#080B14] rounded-full p-2">
                <img 
                  src={ASSETS.logoLeapifyes} 
                  alt="Leapifyes" 
                  className="w-16 h-16 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-dashed border-[#1B93A4]/30"
              />
            </div>
          </div>
          <h1 className="text-3xl font-black tracking-tighter mb-2 gradient-text">
            LEAPIFYES
          </h1>
          <p className="text-[#8892A4] font-medium text-sm">
            Accede a tu ecosistema digital
          </p>
        </motion.header>

        {/* Links Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {links.map((link) => (
            <motion.div key={link.id} variants={itemVariants}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  group relative flex items-center p-4 rounded-2xl transition-all duration-500
                  ${link.primary 
                    ? 'btn-gradient shadow-lg shadow-[#1B93A4]/20 scale-[1.02] border-none' 
                    : link.highlight
                      ? 'glass-card-hover border-[#1B93A4]/30 hover:border-[#1B93A4]'
                      : 'glass-card-hover border-white/10 hover:border-white/20'
                  }
                `}
              >

                <div className={`
                  flex items-center justify-center w-12 h-12 rounded-xl mr-4 transition-transform group-hover:scale-110 duration-300
                  ${link.primary ? 'bg-white/20' : 'bg-white/5'}
                `}>
                  {link.icon}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold tracking-widest text-[#8892A4] group-hover:text-[#1B93A4] transition-colors uppercase">
                      {link.category}
                    </span>
                  </div>
                  <h3 className="font-bold text-base tracking-tight truncate">
                    {link.title}
                  </h3>
                  <p className={`text-xs truncate ${link.primary ? 'text-white/80' : 'text-[#8892A4]'}`}>
                    {link.subtitle}
                  </p>
                </div>

                <div className="ml-2">
                  <ExternalLink className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${link.primary ? 'text-white' : 'text-[#1B93A4]'}`} />
                </div>

                {/* Subtle Glow Effect for non-primary */}
                {!link.primary && (
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shadow-[0_0_20px_rgba(27,147,164,0.15)]" />
                )}
              </a>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer info */}
        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
            <span className="text-[10px] font-bold text-[#8892A4] tracking-widest uppercase">
              Leapifyes Ecosystem Status: Operational
            </span>
          </div>
          <p className="mt-8 text-[11px] text-[#525B70] font-medium">
            &copy; {new Date().getFullYear()} Leapifyes. Todos los derechos reservados.
          </p>
        </motion.footer>
      </div>

      {/* Decorative Blur */}
      <div className="fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#080B14] to-transparent pointer-events-none" />
    </div>
  );
};

export default LinkHub;
