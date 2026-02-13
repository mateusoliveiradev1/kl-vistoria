import { Phone } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';

export function WhatsAppButton() {
  return (
    <a
      href={COMPANY_INFO.contact.phoneLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:bg-[#128C7E] transition-all duration-300 hover:scale-110 group animate-bounce-slow"
      aria-label="Falar no WhatsApp"
    >
      <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></div>
      <Phone className="w-8 h-8 fill-current" />
      
      {/* Tooltip */}
      <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-gray-800 px-3 py-1.5 rounded-lg text-sm font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden md:block">
        Fale Conosco
      </span>
    </a>
  );
}
