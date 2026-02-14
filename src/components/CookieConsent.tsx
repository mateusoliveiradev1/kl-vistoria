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
      // If already consented, initialize analytics immediately
      initGA();
    }
  }, []);

  const accept = () => {
    localStorage.setItem('kl_cookie_consent', 'true');
    setShow(false);
    // Initialize analytics on acceptance
    initGA();
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-[100] animate-in slide-in-from-bottom-10 fade-in duration-500">
      <div className="bg-white/95 backdrop-blur-md border border-gray-200 p-6 rounded-2xl shadow-2xl flex flex-col gap-4">
        <div className="flex items-start gap-4">
          <div className="bg-blue-100 p-2 rounded-full shrink-0">
            <Cookie className="w-6 h-6 text-primary" />
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-gray-900">Privacidade & Cookies</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Utilizamos cookies para melhorar sua experiência e analisar o tráfego. Ao continuar, você concorda com nossa política de privacidade.
            </p>
          </div>
          <button 
            onClick={() => setShow(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex gap-3 justify-end">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs h-9"
            onClick={() => setShow(false)}
          >
            Recusar
          </Button>
          <Button 
            size="sm" 
            className="text-xs h-9 bg-primary hover:bg-blue-900"
            onClick={accept}
          >
            Aceitar e Continuar
          </Button>
        </div>
      </div>
    </div>
  );
}
