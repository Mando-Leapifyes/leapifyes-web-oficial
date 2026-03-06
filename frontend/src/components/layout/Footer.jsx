import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Instagram, Twitter, ArrowUpRight } from 'lucide-react';
import { openCookieSettings } from '../CookieBanner';
import { ASSETS } from '../../lib/assets';
import { useLocale } from '../../context/LocaleContext';

const Footer = () => {
  const { t } = useLocale();
  const currentYear = new Date().getFullYear();

  const FOOTER_LINKS = {
    servicios: [
      { label: t('nav', 'servicios'), href: '/soluciones/transformacion-digital' },
      { label: t('home', 'sol_ia'), href: '/soluciones/agentes-ia' },
      { label: t('home', 'sol_sis'), href: '/soluciones/desarrollo-web' },
      { label: 'ERP y CRM a Medida', href: '/soluciones/erp-crm' },
      { label: 'Sistemas a Medida', href: '/soluciones/sistemas-medida' },
      { label: 'Cumplimiento RGPD', href: '/soluciones/cumplimiento-rgpd' },
    ],
    productos: [
      { label: 'MANDO by Leapifyes', href: 'https://mando.leapifyes.com', external: true, logo: ASSETS.logoMando, logoClass: 'rounded-full' },
      { label: 'TRÉBOL Finance', href: 'https://trebolfinance.leapifyes.com/login', external: true, logo: ASSETS.logoTrebol, logoClass: 'rounded-sm' },
    ],
    empresa: [
      { label: t('nav', 'metodo'), href: '/metodo' },
      { label: t('nav', 'casos'), href: '/casos' },
      { label: t('nav', 'empresa'), href: '/empresa' },
      { label: t('nav', 'blog'), href: '/recursos' },
      { label: 'Contacto', href: '/contacto' },
      { label: t('nav', 'portal'), href: '/portal/login' },
    ],
    legal: [
      { label: 'Política de Privacidad', href: '/legal/privacidad' },
      { label: 'Política de Cookies', href: '/legal/cookies' },
      { label: 'Aviso Legal', href: '/legal/aviso-legal' },
    ],
  };

  return (
    <footer className="bg-[#060910] border-t border-[#1B93A4]/20" data-testid="main-footer">
      <div className="container-main py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 lg:gap-8">

          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2.5 mb-6">
              <div style={{ width: 56, height: 56, borderRadius: '50%', padding: 3, background: 'rgba(27,147,164,0.15)', border: '1.5px solid rgba(27,147,164,0.4)' }}>
                <img src={ASSETS.logoLeapifyes} alt="Leapifyes" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', mixBlendMode: 'luminosity' }} loading="lazy" />
              </div>
              <span className="text-2xl font-black tracking-tight gradient-text">
                LEAPIFYES
              </span>
            </Link>
            <p className="text-[#8892A4] text-sm mb-6 leading-relaxed">
              {t('footer', 'brand_sub')}
            </p>
            <div className="space-y-3 text-sm mb-6">
              <a
                href="mailto:info@leapifyes.com"
                className="flex items-center gap-2 text-[#8892A4] hover:text-[#1B93A4] transition-colors"
              >
                <Mail className="w-4 h-4" />
                info@leapifyes.com
              </a>
              <a
                href="tel:+34694214849"
                className="flex items-center gap-2 text-[#8892A4] hover:text-[#1B93A4] transition-colors"
              >
                <Phone className="w-4 h-4" />
                +34 694 214 849
              </a>
              <div className="flex items-center gap-2 text-[#8892A4]">
                <MapPin className="w-4 h-4" />
                {t('footer', 'location')}
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://linkedin.com/company/leapifyes"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-[#1B93A4]/20 hover:text-[#1B93A4] transition-all text-[#8892A4]"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/leapifyes"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-[#1B93A4]/20 hover:text-[#1B93A4] transition-all text-[#8892A4]"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com/leapifyes"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-[#1B93A4]/20 hover:text-[#1B93A4] transition-all text-[#8892A4]"
                aria-label="Twitter/X"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Servicios Column */}
          <div>
            <h4 className="font-bold text-[#F0F4FF] mb-4 text-xs uppercase tracking-wider">{t('footer', 'col_services')}</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.servicios.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-[#8892A4] hover:text-[#F0F4FF] transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Productos Column */}
          <div>
            <h4 className="font-bold text-[#F0F4FF] mb-4 text-xs uppercase tracking-wider">{t('footer', 'col_products')}</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.productos.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#8892A4] hover:text-[#F0F4FF] transition-colors text-sm flex items-center gap-2 group"
                  >
                    <img src={link.logo} alt={link.label} className={`w-5 h-5 object-cover ${link.logoClass}`} loading="lazy" />
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa Column */}
          <div>
            <h4 className="font-bold text-[#F0F4FF] mb-4 text-xs uppercase tracking-wider">{t('footer', 'col_company')}</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.empresa.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-[#8892A4] hover:text-[#F0F4FF] transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="font-bold text-[#F0F4FF] mb-4 text-xs uppercase tracking-wider">{t('footer', 'col_legal')}</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-[#8892A4] hover:text-[#F0F4FF] transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={openCookieSettings}
                  className="text-[#8892A4] hover:text-[#F0F4FF] transition-colors text-sm"
                  data-testid="manage-cookies-btn"
                >
                  {t('footer', 'manage_cookies')}
                </button>
              </li>
            </ul>
          </div>
        </div>


      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="container-main py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
            <p className="text-[#8892A4] text-xs">
              © {currentYear} {t('footer', 'bottom_text')}
            </p>
            <p className="text-[#8892A4]/60 text-xs">
              {t('footer', 'made_with')}
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 text-xs text-[#8892A4]/40">
            <Link to="/barcelona" className="hover:text-[#8892A4] transition-colors">Barcelona</Link>
            <span>·</span>
            <span>L'Hospitalet</span>
            <span>·</span>
            <span>Badalona</span>
            <span>·</span>
            <span>Sabadell</span>
            <span>·</span>
            <span>Terrassa</span>
            <span>·</span>
            <Link to="/cataluna" className="hover:text-[#8892A4] transition-colors">Cataluña</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
