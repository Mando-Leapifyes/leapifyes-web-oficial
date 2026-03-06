import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ArrowUpRight } from 'lucide-react';
import { Button } from '../ui/button';
import LanguageSwitcher from '../LanguageSwitcher';
import { ASSETS } from '../../lib/assets';

const NAV_LINKS = [
  { href: '/soluciones', label: 'Servicios' },
  { href: '/sectores', label: 'Sectores' },
  { href: '/casos', label: 'Casos' },
  { href: '/metodo', label: 'Método' },
  { href: '/empresa', label: 'Empresa' },
  { href: '/recursos', label: 'Blog' },
  { href: '/diagnostico', label: 'Diagnóstico', highlight: true },
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

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProductsOpen(false);
  }, [location]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'nav-dark py-3' : 'py-5'
          }`}
        data-testid="main-navbar"
      >
        <div className="container-main">
          <div className="flex items-center justify-between">
            {/* Logo - COMPLETO con gradiente */}
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
                  data-testid="nav-products-dropdown"
                >
                  Productos
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
                          data-testid={`nav-product-${product.name.toLowerCase().replace(/\s/g, '-')}`}
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
              <LanguageSwitcher />
              <Link to="/portal/login" className="text-[#8892A4] hover:text-[#F0F4FF] text-sm font-medium transition-colors">Portal</Link>
              <a
                href="https://crm.zoho.eu/bookings/Calendariodelaweb"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-[#1B93A4] hover:bg-[#1B93A4]/90 text-white text-sm px-5 py-2.5 rounded-full font-semibold" data-testid="nav-cta">
                  Agendar diagnóstico
                </Button>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[#F0F4FF]"
              data-testid="mobile-menu-btn"
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
                <p className="text-xs text-[#8892A4] uppercase tracking-wider mb-3 font-semibold">Productos</p>
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
              <div className="mb-8">
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
                <Link
                  to="/contacto"
                  className="block py-3 text-lg text-[#F0F4FF] font-medium border-b border-white/5"
                >
                  Contacto
                </Link>
              </div>

              {/* Language Switcher */}
              <div className="mb-8">
                <p className="text-xs text-[#8892A4] uppercase tracking-wider mb-3 font-semibold">Idioma</p>
                <LanguageSwitcher className="justify-start" />
              </div>

              {/* CTA */}
              <div className="mt-auto">
                <a
                  href="https://crm.zoho.eu/bookings/Calendariodelaweb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button className="btn-gradient w-full justify-center">
                    Agendar diagnóstico
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
