import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { X, Settings, Cookie } from "lucide-react";
import { loadGA4 } from "@/lib/analytics";

const COOKIE_CONSENT_KEY = "leapifyes_cookie_consent";
const COOKIE_SETTINGS_KEY = "leapifyes_cookie_settings";

const defaultSettings = {
  technical: true,
  analytics: false,
  marketing: false,
};

// Global event for opening settings from Footer
const OPEN_COOKIE_SETTINGS_EVENT = "openCookieSettings";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState(defaultSettings);

  const openSettings = useCallback(() => {
    setShowSettings(true);
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      setIsVisible(true);
    } else {
      const savedSettings = localStorage.getItem(COOKIE_SETTINGS_KEY);
      if (savedSettings) {
        const parsed = JSON.parse(savedSettings);
        setSettings(parsed);
        if (parsed.analytics) loadGA4();
      }
    }

    // Listen for "Gestionar cookies" click from Footer
    const handleOpenSettings = () => openSettings();
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, handleOpenSettings);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, handleOpenSettings);
  }, [openSettings]);

  const saveConsent = (accepted, customSettings = null) => {
    const finalSettings = customSettings || (accepted ? { ...defaultSettings, analytics: true, marketing: true } : defaultSettings);
    localStorage.setItem(COOKIE_CONSENT_KEY, accepted ? "accepted" : "rejected");
    localStorage.setItem(COOKIE_SETTINGS_KEY, JSON.stringify(finalSettings));
    setSettings(finalSettings);
    setIsVisible(false);
    setShowSettings(false);
    
    // Load GA4 if analytics accepted
    if (finalSettings.analytics) {
      loadGA4();
    }
  };

  const handleAcceptAll = () => saveConsent(true);
  const handleRejectAll = () => saveConsent(false);
  const handleSaveSettings = () => saveConsent(true, settings);

  if (!isVisible) return null;

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
      role="dialog"
      aria-labelledby="cookie-banner-title"
      data-testid="cookie-banner"
    >
      <div className="max-w-4xl mx-auto glass-card overflow-hidden">
        {!showSettings ? (
          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[#1B93A4] to-[#3B82F6] flex items-center justify-center">
                <Cookie className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h2 id="cookie-banner-title" className="text-lg font-semibold text-white mb-2">
                  Utilizamos cookies
                </h2>
                <p className="text-sm text-gray-400 mb-4">
                  Usamos cookies técnicas (esenciales) y, con tu permiso, cookies de análisis y marketing para mejorar tu experiencia.
                  Puedes aceptar, rechazar o configurar tus preferencias.{" "}
                  <a 
                    href="/legal/cookies" 
                    className="text-[#1B93A4] hover:underline"
                    data-testid="cookie-policy-link"
                  >
                    Más información
                  </a>
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={handleAcceptAll}
                    className="bg-gradient-to-r from-[#1B93A4] to-[#3B82F6] hover:opacity-90 text-white"
                    data-testid="cookie-accept-btn"
                  >
                    Aceptar todo
                  </Button>
                  <Button
                    onClick={handleRejectAll}
                    variant="outline"
                    className="border-white/10 text-white hover:bg-white/5"
                    data-testid="cookie-reject-btn"
                  >
                    Rechazar
                  </Button>
                  <Button
                    onClick={() => setShowSettings(true)}
                    variant="ghost"
                    className="text-gray-400 hover:text-white"
                    data-testid="cookie-settings-btn"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Configurar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Configuración de cookies</h2>
              <button
                onClick={() => { setShowSettings(false); setIsVisible(false); }}
                className="text-gray-500 hover:text-white"
                aria-label="Cerrar configuración"
                data-testid="cookie-settings-close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4 mb-6">
              <CookieOption
                title="Cookies técnicas"
                description="Necesarias para el funcionamiento básico del sitio. No se pueden desactivar."
                checked={true}
                disabled={true}
                testId="cookie-opt-technical"
              />
              <CookieOption
                title="Cookies de análisis"
                description="Nos ayudan a entender cómo usas el sitio para mejorarlo."
                checked={settings.analytics}
                onChange={(v) => setSettings({ ...settings, analytics: v })}
                testId="cookie-opt-analytics"
              />
              <CookieOption
                title="Cookies de marketing"
                description="Permiten mostrarte contenido relevante según tus intereses."
                checked={settings.marketing}
                onChange={(v) => setSettings({ ...settings, marketing: v })}
                testId="cookie-opt-marketing"
              />
            </div>
            
            <div className="flex gap-3">
              <Button
                onClick={handleSaveSettings}
                className="bg-gradient-to-r from-[#1B93A4] to-[#3B82F6] hover:opacity-90 text-white"
                data-testid="cookie-save-settings-btn"
              >
                Guardar preferencias
              </Button>
              <Button
                onClick={() => { setShowSettings(false); setIsVisible(false); }}
                variant="outline"
                className="border-white/10 text-white"
              >
                Cancelar
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Export function to open settings from anywhere
export function openCookieSettings() {
  window.dispatchEvent(new CustomEvent("openCookieSettings"));
}

function CookieOption({ title, description, checked, onChange, disabled, testId }) {
  return (
    <label 
      className={`flex items-start gap-4 p-4 rounded-xl border ${disabled ? 'bg-white/5 border-white/5' : 'bg-[#0D1117] border-white/10 hover:border-white/20 cursor-pointer'}`}
      data-testid={testId}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        className="mt-1 w-5 h-5 rounded border-white/20 bg-transparent text-[#1B93A4] focus:ring-[#1B93A4] disabled:opacity-50"
      />
      <div>
        <p className="font-medium text-white">{title}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </label>
  );
}
