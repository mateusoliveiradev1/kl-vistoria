const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || '';

type TrackingMetadata = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function hasAnalyticsConsent() {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('kl_cookie_consent') === 'true';
}

function getDeviceType() {
  if (typeof window === 'undefined') return 'unknown';
  if (window.matchMedia('(max-width: 767px)').matches) return 'mobile';
  if (window.matchMedia('(max-width: 1023px)').matches) return 'tablet';
  return 'desktop';
}

function getUtmContext() {
  if (typeof window === 'undefined') {
    return {
      utm_source: '',
      utm_medium: '',
      utm_campaign: '',
    };
  }

  const params = new URLSearchParams(window.location.search);

  return {
    utm_source: params.get('utm_source') || '',
    utm_medium: params.get('utm_medium') || '',
    utm_campaign: params.get('utm_campaign') || '',
  };
}

export async function trackEvent(
  eventName: string,
  metadata: TrackingMetadata = {},
  options: { requireConsent?: boolean } = {}
) {
  if (typeof window === 'undefined') return;
  if (window.location.pathname.startsWith('/admin')) return;
  if (options.requireConsent !== false && !hasAnalyticsConsent()) return;

  const payload = {
    event_name: eventName,
    path: window.location.pathname,
    referrer: document.referrer,
    device_type: getDeviceType(),
    ...getUtmContext(),
    metadata,
  };

  try {
    await fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    });
  } catch {
    // Tracking must never block the landing page or WhatsApp flow.
  }

  if (window.gtag && GA_MEASUREMENT_ID) {
    window.gtag('event', eventName, {
      page_path: window.location.pathname,
      event_category: 'site',
      ...metadata,
    });
  }
}

export async function trackLead(formData: TrackingMetadata) {
  if (typeof window === 'undefined') return;

  try {
    await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        source_path: window.location.pathname,
        referrer: document.referrer,
        device_type: getDeviceType(),
        ...getUtmContext(),
      }),
    });
  } catch {
    // Lead persistence is useful, but WhatsApp handoff remains the source of continuity.
  }
}

export const initGA = () => {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) return;
  if (window.gtag) return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];

  function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  }

  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, {
    page_path: window.location.pathname,
  });
};

export const logPageView = () => {
  void trackEvent('page_view');

  if (typeof window !== 'undefined' && window.gtag && GA_MEASUREMENT_ID) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: window.location.pathname,
    });
  }
};
