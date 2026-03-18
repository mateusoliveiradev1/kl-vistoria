import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, ShieldCheck, Mail, Phone, Car, FileText, MapPin } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';

interface WhatsAppPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WhatsAppPopup({ isOpen, onClose }: WhatsAppPopupProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vehicle: '',
    address: '',
    service: 'Vistoria Cautelar Completa'
  });
  const [lgpdConsent, setLgpdConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const GOOGLE_APPS_SCRIPT_URL =
        'https://script.google.com/macros/s/AKfycbzwd4R9cvEBg4jzKJm68zMagkT2WhqIctx13wrQWreuEmVqPM49kX6IZqymBe4T6tUB/exec';

      if (GOOGLE_APPS_SCRIPT_URL) {
        await fetch(GOOGLE_APPS_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            timestamp: new Date().toISOString(),
            source: 'Website Popup'
          }),
        });
      }

      const message = `*NOVO AGENDAMENTO PELO SITE*\n\nOla equipe KL Vistorias! Gostaria de falar com um especialista para solicitar um orcamento.\n\n*Nome:* ${formData.name}\n*E-mail:* ${formData.email}\n*WhatsApp:* ${formData.phone}\n*Localizacao:* ${formData.address}\n*Veiculo:* ${formData.vehicle}\n*Servico:* ${formData.service}\n\nAguardo retorno!`;
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `${COMPANY_INFO.contact.phoneLink}?text=${encodedMessage}`;

      window.open(whatsappUrl, '_blank');

      setTimeout(() => {
        onClose();
        setIsSubmitting(false);
      }, 500);
    } catch (error) {
      console.error('Error sending data:', error);
      setIsSubmitting(false);

      const fallbackMsg = `Ola, me chamo ${formData.name}. Quero agendar ${formData.service} para o veiculo ${formData.vehicle} em ${formData.address}.`;
      window.open(`${COMPANY_INFO.contact.phoneLink}?text=${encodeURIComponent(fallbackMsg)}`, '_blank');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl glass-card"
          >
            <div className="relative border-b border-slate-700/50 bg-primary/20 p-6 text-white md:p-8">
              <button
                onClick={onClose}
                className="absolute right-6 top-6 text-slate-400 transition-colors hover:text-white"
                aria-label="Fechar formulario"
              >
                <X className="h-6 w-6" />
              </button>
              <h3 className="flex items-center gap-3 text-xl font-black tracking-tight md:text-2xl font-heading">
                <ShieldCheck className="h-8 w-8 animate-pulse text-primary" />
                AGENDAR ANALISE
              </h3>
              <p className="mt-2 text-sm font-medium leading-relaxed text-slate-400">
                Detalhes tecnicos para atendimento prioritario. Resposta em{' '}
                <span className="font-bold text-primary">5 min</span>.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="custom-scrollbar max-h-[70vh] space-y-4 overflow-y-auto p-6 md:space-y-6 md:p-8"
            >
              <div className="space-y-4">
                <label
                  htmlFor="name"
                  className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 font-heading"
                >
                  Identificacao & Contato
                </label>

                <div className="group relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <span className="text-sm text-slate-500 transition-colors group-focus-within:text-primary">
                      @
                    </span>
                  </div>
                  <input
                    required
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-700 bg-slate-900/50 py-3 pl-12 pr-4 text-sm text-slate-200 outline-none transition-all placeholder:text-slate-600 focus:border-primary focus:ring-2 focus:ring-primary/50"
                    placeholder="Nome completo"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="group relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                      <Mail className="h-4 w-4 text-slate-500 transition-colors group-focus-within:text-primary" />
                    </div>
                    <input
                      required
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-700 bg-slate-900/50 py-3 pl-12 pr-4 text-sm text-slate-200 outline-none transition-all placeholder:text-slate-600 focus:border-primary focus:ring-2 focus:ring-primary/50"
                      placeholder="E-mail"
                      aria-label="Seu endereco de e-mail"
                    />
                  </div>
                  <div className="group relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                      <Phone className="h-4 w-4 text-slate-500 transition-colors group-focus-within:text-primary" />
                    </div>
                    <input
                      required
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-700 bg-slate-900/50 py-3 pl-12 pr-4 text-sm text-slate-200 outline-none transition-all placeholder:text-slate-600 focus:border-primary focus:ring-2 focus:ring-primary/50"
                      placeholder="WhatsApp"
                      aria-label="Seu numero de WhatsApp para contato"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 font-heading">
                  Localizacao & Veiculo
                </label>

                <div className="group relative">
                  <div className="pointer-events-none absolute left-4 top-3.5 flex items-center">
                    <MapPin className="h-4 w-4 text-slate-500 transition-colors group-focus-within:text-primary" />
                  </div>
                  <textarea
                    required
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={2}
                    className="w-full resize-none rounded-xl border border-slate-700 bg-slate-900/50 py-3 pl-12 pr-4 text-sm text-slate-200 outline-none transition-all placeholder:text-slate-600 focus:border-primary focus:ring-2 focus:ring-primary/50"
                    placeholder="Endereco completo da vistoria"
                    aria-label="Endereco onde o veiculo se encontra"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="group relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                      <Car className="h-4 w-4 text-slate-500 transition-colors group-focus-within:text-primary" />
                    </div>
                    <input
                      required
                      type="text"
                      id="vehicle"
                      name="vehicle"
                      value={formData.vehicle}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-700 bg-slate-900/50 py-3 pl-12 pr-4 text-sm text-slate-200 outline-none transition-all placeholder:text-slate-600 focus:border-primary focus:ring-2 focus:ring-primary/50"
                      placeholder="Veiculo / Placa"
                      aria-label="Modelo do veiculo ou placa"
                    />
                  </div>

                  <div className="group relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                      <FileText className="h-4 w-4 text-slate-500 transition-colors group-focus-within:text-primary" />
                    </div>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full cursor-pointer appearance-none rounded-xl border border-slate-700 bg-slate-900/50 py-3 pl-12 pr-4 text-sm text-slate-200 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/50"
                      aria-label="Selecione o servico desejado"
                    >
                      <option value="Vistoria Cautelar Completa" className="bg-slate-900">
                        Vistoria Cautelar
                      </option>
                      <option value="Pesquisa de Historico" className="bg-slate-900">
                        Pesquisa Historico
                      </option>
                      <option value="Vistoria Previa" className="bg-slate-900">
                        Vistoria Previa
                      </option>
                      <option value="Outros" className="bg-slate-900">
                        Outros
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <label className="group mb-4 flex cursor-pointer items-start gap-3">
                  <div className="relative mt-1 flex items-center justify-center">
                    <input
                      type="checkbox"
                      required
                      checked={lgpdConsent}
                      onChange={(e) => setLgpdConsent(e.target.checked)}
                      className="peer h-5 w-5 appearance-none rounded border-2 border-slate-600 bg-slate-900/50 transition-all checked:border-primary checked:bg-primary"
                    />
                    <ShieldCheck className="absolute h-3 w-3 text-white opacity-0 transition-opacity peer-checked:opacity-100" />
                  </div>
                  <span className="text-xs leading-relaxed text-slate-400">
                    Concordo com a{' '}
                    <a
                      href="/politica-de-privacidade"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(event) => event.stopPropagation()}
                      aria-label="Abre politica de privacidade em nova guia"
                      className="font-semibold text-primary hover:underline"
                    >
                      Politica de Privacidade
                    </a>{' '}
                    e autorizo o uso dos meus dados para contato via WhatsApp (LGPD).
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={!lgpdConsent || isSubmitting}
                  className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-primary px-6 py-4 font-black text-white shadow-[0_8px_30px_rgba(59,130,246,0.3)] transition-all active:scale-[0.98] hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">PROCESSANDO...</span>
                  ) : (
                    <>
                      <Send className="h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                      SOLICITAR AGORA
                    </>
                  )}
                </button>
              </div>

              <p className="rounded-xl border border-slate-800/50 bg-slate-900/40 py-3 text-center text-[10px] uppercase tracking-widest text-slate-500">
                Atendimento protegido para envio das informacoes
              </p>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
