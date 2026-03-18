import { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';
import { Button } from './ui/Button';
import { initGA } from '../lib/analytics';

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('kl_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 2000);
      return () => clearTimeout(timer);
    } else if (consent === 'true') {
      initGA();
    }
  }, []);

  const accept = () => {
    localStorage.setItem('kl_cookie_consent', 'true');
    setShow(false);
    initGA();
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[100] animate-in slide-in-from-bottom-10 fade-in duration-500 md:left-auto md:right-4 md:max-w-md">
      <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white/95 p-6 shadow-2xl backdrop-blur-md">
        <div className="flex items-start gap-4">
          <div className="shrink-0 rounded-full bg-blue-100 p-2">
            <Cookie className="h-6 w-6 text-primary" />
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-gray-900">Privacidade & Cookies</h3>
            <p className="text-sm leading-relaxed text-gray-600">
              Utilizamos cookies para melhorar sua experiencia e analisar o trafego. Ao continuar,
              voce concorda com nossa{' '}
              <a href="/politica-de-privacidade" className="font-semibold text-primary hover:underline">
                politica de privacidade
              </a>
              .
            </p>
          </div>
          <button
            onClick={() => setShow(false)}
            className="text-gray-400 transition-colors hover:text-gray-600"
            aria-label="Fechar aviso de cookies"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            size="sm"
            className="h-9 text-xs"
            onClick={() => setShow(false)}
          >
            Recusar
          </Button>
          <Button
            size="sm"
            className="h-9 bg-primary text-xs hover:bg-blue-900"
            onClick={accept}
          >
            Aceitar e Continuar
          </Button>
        </div>
      </div>
    </div>
  );
}
