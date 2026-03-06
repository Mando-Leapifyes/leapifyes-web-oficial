import { useLocale } from '../context/LocaleContext';
import { Globe } from 'lucide-react';

const FLAGS = {
  es: '🇪🇸',
  ca: '🏴󠁥󠁳󠁣󠁴󠁿',
  en: '🇬🇧',
};

const NAMES = {
  es: 'ES',
  ca: 'CA',
  en: 'EN',
};

export default function LanguageSwitcher({ className = '' }) {
  const { locale, setLocale, SUPPORTED_LOCALES } = useLocale();

  return (
    <div className={`flex items-center gap-1 ${className}`} data-testid="language-switcher">
      <Globe className="w-4 h-4 text-gray-500 mr-1" />
      {SUPPORTED_LOCALES.map((loc) => (
        <button
          key={loc}
          onClick={() => setLocale(loc)}
          className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
            locale === loc
              ? 'bg-[#1B93A4] text-white'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
          data-testid={`lang-${loc}`}
          title={loc === 'es' ? 'Español' : loc === 'ca' ? 'Català' : 'English'}
        >
          {NAMES[loc]}
        </button>
      ))}
    </div>
  );
}
