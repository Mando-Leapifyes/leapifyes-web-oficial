const GA_ID = 'G-J6KC0SG75S';
const COOKIE_SETTINGS_KEY = 'leapifyes_cookie_settings';

let ga4Loaded = false;

function getAnalyticsConsent() {
  try {
    const settings = localStorage.getItem(COOKIE_SETTINGS_KEY);
    if (settings) {
      const parsed = JSON.parse(settings);
      return parsed.analytics === true;
    }
  } catch {}
  return false;
}

export function loadGA4() {
  if (ga4Loaded || !getAnalyticsConsent()) return;
  
  // Inject gtag.js script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
  
  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_ID, { send_page_view: true });
  
  ga4Loaded = true;
}

export function trackEvent(eventName, params = {}) {
  if (!getAnalyticsConsent() || !window.gtag) return;
  window.gtag('event', eventName, params);
}

// Convenience functions for required events
export const trackAgendarDemo = () => trackEvent('click_agendar_demo');
export const trackSubmitLead = (formType) => trackEvent('submit_lead', { form_type: formType });
export const trackStartDiagnostico = () => trackEvent('start_diagnostico');
export const trackFinishDiagnostico = (score) => trackEvent('finish_diagnostico', { score });

// Initialize on consent change
export function initAnalytics() {
  if (getAnalyticsConsent()) {
    loadGA4();
  }
}

// Listen for storage changes (consent updates)
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === COOKIE_SETTINGS_KEY) {
      if (getAnalyticsConsent() && !ga4Loaded) {
        loadGA4();
      }
    }
  });
}
