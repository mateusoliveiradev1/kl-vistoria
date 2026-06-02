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
      {/* Botão Direto (Bypass Popup) */}
      <a
        href="https://wa.me/556295406565?text=Ol%C3%A1%21+Gostaria+de+agendar+uma+vistoria+cautelar."
        target="_blank"
        rel="noopener noreferrer"
        className="group fixed bottom-28 right-6 z-[40] hidden rounded-full border border-[#25D366]/30 bg-[#0B111A] p-3 text-[#25D366] shadow-xl transition-all duration-300 hover:scale-110 hover:bg-[#111827] md:block"
        aria-label="WhatsApp Direto"
      >
        <div className="absolute -top-8 right-0 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10 uppercase tracking-tighter">
          Zap Direto
        </div>
        <Phone className="w-5 h-5 fill-current" />
      </a>

      <button
        onClick={() => setIsPopupOpen(true)}
        className="group fixed bottom-4 left-4 right-4 z-[40] flex min-h-14 cursor-pointer items-center justify-center gap-3 rounded-md border-none bg-[#25D366] px-5 py-4 font-black text-[#06140a] shadow-2xl shadow-emerald-950/30 outline-none transition-all duration-300 hover:bg-[#4ee184] md:bottom-6 md:left-auto md:right-6 md:min-h-0 md:w-auto md:rounded-full md:p-4 md:hover:scale-110"
        aria-label="Falar no WhatsApp"
      >
        <div className="absolute inset-0 hidden rounded-full bg-[#25D366] opacity-20 md:block md:animate-ping"></div>

        {/* Notification Badge */}
        <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-red-500 text-xs font-bold text-white md:animate-bounce">
          1
        </div>

        <Phone className="h-6 w-6 fill-current md:h-8 md:w-8" />
        <span className="md:hidden">Falar no WhatsApp</span>

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
