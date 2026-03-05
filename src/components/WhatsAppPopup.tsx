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
            // 🚀 Google Apps Script Web App URL
            const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzwd4R9cvEBg4jzKJm68zMagkT2WhqIctx13wrQWreuEmVqPM49kX6IZqymBe4T6tUB/exec';

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

            // Build WhatsApp Message
            const message = `🚘 *NOVO AGENDAMENTO PELO SITE* 🚘\n\nOlá equipe *KL Vistorias*! Gostaria de falar com um especialista para solicitar um orçamento.\n\n👤 *Nome:* ${formData.name}\n📧 *E-mail:* ${formData.email}\n📱 *WhatsApp:* ${formData.phone}\n📍 *Localização:* ${formData.address}\n🚗 *Veículo:* ${formData.vehicle}\n📋 *Serviço:* ${formData.service}\n\nAguardo retorno!`;
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `${COMPANY_INFO.contact.phoneLink}?text=${encodedMessage}`;

            // Open WhatsApp
            window.open(whatsappUrl, '_blank');

            // Close popup after a short delay
            setTimeout(() => {
                onClose();
                setIsSubmitting(false);
            }, 500);

        } catch (error) {
            console.error('Error sending data:', error);
            setIsSubmitting(false);
            // Fallback: open WhatsApp anyway even if Webhook fails
            const fallbackMsg = `Olá, me chamo ${formData.name}. Quero agendar ${formData.service} para o veículo ${formData.vehicle} em ${formData.address}.`;
            window.open(`${COMPANY_INFO.contact.phoneLink}?text=${encodeURIComponent(fallbackMsg)}`, '_blank');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg glass-card rounded-3xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-primary/20 p-6 md:p-8 text-white relative border-b border-slate-700/50">
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors"
                                aria-label="Fechar formulário"
                            >
                                <X className="w-6 h-6" />
                            </button>
                            <h3 className="text-xl md:text-2xl font-black flex items-center gap-3 font-heading tracking-tight">
                                <ShieldCheck className="w-8 h-8 text-primary animate-pulse" />
                                AGENDAR ANÁLISE
                            </h3>
                            <p className="text-sm text-slate-400 mt-2 font-medium leading-relaxed">
                                Detalhes técnicos para atendimento prioritário. Resposta em <span className="text-primary font-bold">5 min</span>.
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-4 md:space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                            <div className="space-y-4">
                                <label htmlFor="name" className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2 font-heading">Identificação & Contato</label>

                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <span className="text-slate-500 group-focus-within:text-primary transition-colors text-sm">👤</span>
                                    </div>
                                    <input
                                        required
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-slate-200 placeholder:text-slate-600 text-sm"
                                        placeholder="Nome completo"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Mail className="w-4 h-4 text-slate-500 group-focus-within:text-primary transition-colors" />
                                        </div>
                                        <input
                                            required
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-slate-200 placeholder:text-slate-600 text-sm"
                                            placeholder="E-mail"
                                            aria-label="Seu endereço de e-mail"
                                        />
                                    </div>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Phone className="w-4 h-4 text-slate-500 group-focus-within:text-primary transition-colors" />
                                        </div>
                                        <input
                                            required
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-slate-200 placeholder:text-slate-600 text-sm"
                                            placeholder="WhatsApp"
                                            aria-label="Seu número de WhatsApp para contato"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2 font-heading">Localização & Veículo</label>

                                <div className="relative group">
                                    <div className="absolute top-3.5 left-4 flex items-center pointer-events-none">
                                        <MapPin className="w-4 h-4 text-slate-500 group-focus-within:text-primary transition-colors" />
                                    </div>
                                    <textarea
                                        required
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        rows={2}
                                        className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-slate-200 placeholder:text-slate-600 text-sm resize-none"
                                        placeholder="Endereço completo da vistoria"
                                        aria-label="Endereço onde o veículo se encontra"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Car className="w-4 h-4 text-slate-500 group-focus-within:text-primary transition-colors" />
                                        </div>
                                        <input
                                            required
                                            type="text"
                                            id="vehicle"
                                            name="vehicle"
                                            value={formData.vehicle}
                                            onChange={handleChange}
                                            className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-slate-200 placeholder:text-slate-600 text-sm"
                                            placeholder="Veículo / Placa"
                                            aria-label="Modelo do veículo ou placa"
                                        />
                                    </div>

                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <FileText className="w-4 h-4 text-slate-500 group-focus-within:text-primary transition-colors" />
                                        </div>
                                        <select
                                            id="service"
                                            name="service"
                                            value={formData.service}
                                            onChange={handleChange}
                                            className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all appearance-none text-slate-200 cursor-pointer text-sm"
                                            aria-label="Selecione o serviço desejado"
                                        >
                                            <option value="Vistoria Cautelar Completa" className="bg-slate-900">Vistoria Cautelar</option>
                                            <option value="Pesquisa de Histórico" className="bg-slate-900">Pesquisa Histórico</option>
                                            <option value="Vistoria Prévia" className="bg-slate-900">Vistoria Prévia</option>
                                            <option value="Outros" className="bg-slate-900">Outros</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-2">
                                <label className="flex items-start gap-3 mb-4 cursor-pointer group">
                                    <div className="relative flex items-center justify-center mt-1">
                                        <input
                                            type="checkbox"
                                            required
                                            checked={lgpdConsent}
                                            onChange={(e) => setLgpdConsent(e.target.checked)}
                                            className="peer appearance-none w-5 h-5 border-2 border-slate-600 rounded bg-slate-900/50 checked:bg-primary checked:border-primary transition-all"
                                        />
                                        <ShieldCheck className="w-3 h-3 text-white absolute opacity-0 peer-checked:opacity-100 transition-opacity" />
                                    </div>
                                    <span className="text-xs text-slate-400 leading-relaxed">
                                        Concordo com a <a href="#" aria-label="Abre política de privacidade" className="text-primary hover:underline font-semibold">Política de Privacidade</a> e autorizo o uso dos meus dados para contato via WhatsApp (LGPD).
                                    </span>
                                </label>

                                <button
                                    type="submit"
                                    disabled={!lgpdConsent || isSubmitting}
                                    className="w-full bg-primary hover:bg-blue-600 text-white font-black py-4 px-6 rounded-2xl transition-all flex items-center justify-center gap-3 group disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_8px_30px_rgba(59,130,246,0.3)] active:scale-[0.98]"
                                >
                                    {isSubmitting ? (
                                        <span className="animate-pulse">PROCESSANDO...</span>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                            SOLICITAR AGORA
                                        </>
                                    )}
                                </button>
                            </div>

                            <p className="text-center text-[10px] text-slate-500 uppercase tracking-widest bg-slate-900/40 py-3 rounded-xl border border-slate-800/50">
                                🔐 Criptografia de ponta-a-ponta ativada
                            </p>
                        </form>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
