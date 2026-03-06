import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ArrowUpRight, Globe } from 'lucide-react';
import { Button } from '../ui/button';
import { useLocale } from '../../context/LocaleContext';
import { ASSETS } from '../../lib/assets';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const location = useLocation();
  const langRef = useRef(null);
  const { locale, setLocale, t } = useLocale();

  const NAV_LINKS = [
    { href: '/soluciones', label: t('nav', 'servicios') },
    { href: '/sectores', label: t('nav', 'sectores') },
    { href: '/casos', label: t('nav', 'casos') },
    { href: '/metodo', label: t('nav', 'metodo') },
    { href: '/empresa', label: t('nav', 'empresa') },
    { href: '/recursos', label: t('nav', 'blog') },
    { href: '/diagnostico', label: t('nav', 'diagnostico'), highlight: true },
  ];

  const PRODUCTS = [
    {
      name: 'MANDO by Leapifyes',
      description: 'ERP para reformas y construcción',
      url: 'https://mando.leapifyes.com',
      logo: ASSETS.logoMando,
      logoClass: 'rounded-full',
      status: 'LIVE',
      statusColor: 'bg-[#1B93A4]',
    },
    {
      name: 'TRÉBOL Finance',
      description: 'Fintech personal con IA',
      url: 'https://trebolfinance.leapifyes.com/login',
      logo: ASSETS.logoTrebol,
      logoClass: 'rounded-md',
      status: 'BETA',
      statusColor: 'bg-[#10b981]',
    },
  ];

  const LANGUAGES = [
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'ca', label: 'Català', flag: '🏴' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'pt', label: 'Português', flag: '🇵🇹' },
    { code: 'it', label: 'Italiano', flag: '🇮🇹' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'nl', label: 'Nederlands', flag: '🇳🇱' },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProductsOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'nav-dark py-3' : 'py-5'
          }`}
        data-testid="main-navbar"
      >
        <div className="container-main">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
              <div style={{ width: 38, height: 38, borderRadius: '50%', padding: 2, background: 'rgba(27,147,164,0.15)', border: '1.5px solid rgba(27,147,164,0.5)', flexShrink: 0 }}>
                <img src={ASSETS.logoLeapifyes} alt="Leapifyes" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', mixBlendMode: 'luminosity' }} />
              </div>
              <span className="text-lg font-black tracking-tight gradient-text">
                LEAPIFYES
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {/* Products Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsProductsOpen(!isProductsOpen)}
                  onMouseEnter={() => setIsProductsOpen(true)}
                  className="flex items-center gap-1 px-4 py-2 text-[#8892A4] hover:text-[#F0F4FF] transition-colors font-medium text-sm"
                >
                  {t('nav', 'productos')}
                  <ChevronDown className={`w-4 h-4 transition-transform ${isProductsOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isProductsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      onMouseLeave={() => setIsProductsOpen(false)}
                      className="absolute top-full left-0 mt-2 w-80 glass-card p-2 overflow-hidden"
                    >
                      {PRODUCTS.map((product) => (
                        <a
                          key={product.name}
                          href={product.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group"
                        >
                          <img src={product.logo} alt={product.name} className={`w-10 h-10 object-cover flex-shrink-0 ${product.logoClass}`} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-[#F0F4FF] group-hover:text-[#1B93A4] transition-colors text-sm">
                                {product.name}
                              </span>
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold text-white ${product.statusColor}`}>
                                {product.status === 'LIVE' ? '● ' : '◐ '}{product.status}
                              </span>
                            </div>
                            <p className="text-xs text-[#8892A4] mt-0.5">{product.description}</p>
                          </div>
                          <ArrowUpRight className="w-4 h-4 text-[#8892A4] group-hover:text-[#1B93A4] transition-colors flex-shrink-0" />
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Regular Links */}
              {NAV_LINKS.map((link) => (
                link.highlight ? (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="px-4 py-1.5 text-sm font-bold rounded-full transition-all"
                    style={{ background: 'linear-gradient(135deg, #00D4C8, #E8008A)', color: '#fff', boxShadow: '0 0 12px rgba(0,212,200,0.25)' }}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`px-4 py-2 font-medium text-sm transition-colors ${location.pathname === link.href || location.pathname.startsWith(link.href + '/')
                      ? 'text-[#1B93A4]'
                      : 'text-[#8892A4] hover:text-[#F0F4FF]'
                      }`}
                  >
                    {link.label}
                  </Link>
                )
              ))}
            </nav>

            {/* Right Section */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Language Selector */}
              <div className="relative" ref={langRef}>
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-[#8892A4] hover:text-[#F0F4FF] hover:bg-white/5 transition-all"
                >
                  <Globe className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase">{locale}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 top-full mt-2 w-44 bg-[#0F1628] border border-white/10 rounded-xl shadow-2xl shadow-black/50 overflow-hidden z-[200]"
                    >
                      {LANGUAGES.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => { setLocale(lang.code); setLangOpen(false); }}
                          className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-white/5
                            ${locale === lang.code ? 'text-[#1B93A4] font-bold bg-[#1B93A4]/10' : 'text-[#8892A4] hover:text-[#F0F4FF]'}`}
                        >
                          <span className="text-base leading-none">{lang.flag}</span>
                          <span>{lang.label}</span>
                          {locale === lang.code && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#1B93A4]" />}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link to="/portal/login" className="text-[#8892A4] hover:text-[#F0F4FF] text-sm font-medium transition-colors">
                {t('nav', 'portal')}
              </Link>
              <a
                href="https://crm.zoho.eu/bookings/Calendariodelaweb"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-[#1B93A4] hover:bg-[#1B93A4]/90 text-white text-sm px-5 py-2.5 rounded-full font-semibold">
                  {t('nav', 'agendar')}
                </Button>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[#F0F4FF]"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween' }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-[#080B14]" />
            <div className="relative h-full flex flex-col pt-24 px-6 pb-8 overflow-y-auto">
              {/* Products */}
              <div className="mb-6">
                <p className="text-xs text-[#8892A4] uppercase tracking-wider mb-3 font-semibold">{t('nav', 'productos')}</p>
                {PRODUCTS.map((product) => (
                  <a
                    key={product.name}
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 py-3 border-b border-white/5"
                  >
                    <img src={product.logo} alt={product.name} className={`w-6 h-6 object-cover ${product.logoClass}`} />
                    <span className="text-[#F0F4FF] font-medium flex-1">{product.name}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold text-white ${product.statusColor}`}>
                      {product.status}
                    </span>
                  </a>
                ))}
              </div>

              {/* Navigation Links */}
              <div className="mb-0">
                <p className="text-xs text-[#8892A4] uppercase tracking-wider mb-3 font-semibold">Navegación</p>
                {NAV_LINKS.map((link) => (
                  link.highlight ? (
                    <Link
                      key={link.href}
                      to={link.href}
                      className="block py-3 text-lg font-bold border-b border-white/5"
                      style={{ background: 'linear-gradient(135deg, #00D4C8, #E8008A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <Link
                      key={link.href}
                      to={link.href}
                      className="block py-3 text-lg text-[#F0F4FF] font-medium border-b border-white/5"
                    >
                      {link.label}
                    </Link>
                  )
                ))}
              </div>

              {/* Language Selector Mobile */}
              <div className="mt-8">
                <p className="text-xs text-[#8892A4] uppercase tracking-wider mb-4 font-semibold">Idioma</p>
                <div className="grid grid-cols-2 gap-2">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => { setLocale(lang.code); setIsMobileMenuOpen(false); }}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm border transition-colors
                        ${locale === lang.code ? 'bg-[#1B93A4]/10 border-[#1B93A4] text-[#F0F4FF]' : 'bg-white/5 border-white/5 text-[#8892A4]'}`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-auto pt-8">
                <a
                  href="https://crm.zoho.eu/bookings/Calendariodelaweb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button className="btn-gradient w-full justify-center">
                    {t('nav', 'agendar')}
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
