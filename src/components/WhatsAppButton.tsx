import { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';
import { WhatsAppPopup } from './WhatsAppPopup';

export function WhatsAppButton() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsPopupOpen(true);
    window.addEventListener('open-whatsapp-popup', handleOpen);
    return () => window.removeEventListener('open-whatsapp-popup', handleOpen);
  }, []);

  return (
    <>
      <button
        onClick={() => setIsPopupOpen(true)}
        className="fixed bottom-6 right-6 z-[40] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:bg-[#128C7E] transition-all duration-300 hover:scale-110 group cursor-pointer border-none outline-none"
        aria-label="Falar no WhatsApp"
      >
        <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></div>

        {/* Notification Badge */}
        <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white animate-bounce">
          1
        </div>

        <Phone className="w-8 h-8 fill-current" />

        {/* Tooltip */}
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-gray-800 px-4 py-2 rounded-xl text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden md:block border border-gray-100">
          <span className="text-green-600 block text-xs uppercase tracking-wider mb-0.5">Online agora</span>
          Falar com Especialista
        </span>
      </button>

      <WhatsAppPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </>
  );
}
