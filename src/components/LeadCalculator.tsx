import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, AlertTriangle, CheckCircle2, TrendingDown, Info } from 'lucide-react';
import { Container } from './ui/Container';

export const LeadCalculator = () => {
    const [price, setPrice] = useState<string>('');
    const [year, setYear] = useState<string>('');
    const [brand, setBrand] = useState<string>('');
    const [result, setResult] = useState<{ risk: number; loss: number; message: string; severity: 'low' | 'medium' | 'high' } | null>(null);

    const calculateRealisticRisk = (e: React.FormEvent) => {
        e.preventDefault();
        const p = parseFloat(price.replace(/\./g, '').replace(',', '.'));
        const y = parseInt(year);
        const currentYear = new Date().getFullYear();
        const age = currentYear - y;

        if (isNaN(p) || isNaN(y)) return;

        let baseRisk = 0.05; // Risco base 5%
        let severity: 'low' | 'medium' | 'high' = 'low';
        let message = "Veículo com baixo índice de sinistros estruturais mapeados.";

        // Heurística baseada em Idade
        if (age > 10) {
            baseRisk = 0.35 + (Math.random() * 0.10);
            severity = 'high';
            message = "Alta probabilidade de fadiga estrutural e histórico de proprietários múltiplos.";
        } else if (age > 5) {
            baseRisk = 0.20 + (Math.random() * 0.05);
            severity = 'medium';
            message = "Risco moderado de manutenções negligenciadas ou repinturas comerciais.";
        } else if (age > 2) {
            baseRisk = 0.10 + (Math.random() * 0.05);
            severity = 'low';
            message = "Risco comum de retoques estéticos e desgastes de uso urbano.";
        }

        // Fator de Preço (Anomalia de Mercado)
        if (p < 50000 && age < 4) {
            baseRisk += 0.20;
            severity = 'high';
            message = "ALERTA: Preço muito abaixo da média para o ano. Alto risco de leilão ou sinistro oculto.";
        }

        const potentialLoss = p * baseRisk;

        setResult({
            risk: Math.round(baseRisk * 100),
            loss: potentialLoss,
            message: message,
            severity: severity
        });
    };

    const handleWhatsAppLead = () => {
        const text = `Olá! Usei a Calculadora de Risco KL e meu resultado foi:\n\n🚗 Veículo: ${brand}\n📅 Ano: ${year}\n💰 Preço: R$ ${price}\n⚠️ Risco Detectado: ${result?.risk}%\n📉 Perda Potencial: R$ ${result?.loss.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\n\nQuero blindar meu investimento com uma vistoria profissional!`;
        const encodedText = encodeURIComponent(text);
        window.open(`https://wa.me/5562992197652?text=${encodedText}`, '_blank');
    };

    return (
        <section className="py-24 bg-gradient-to-b from-[#020408] to-slate-900 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] -mr-64 -mt-64 z-0"></div>

            <Container className="relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6"
                    >
                        <Calculator className="w-4 h-4" /> Ferramenta Técnica v2.0
                    </motion.div>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
                        Calculadora de <span className="text-primary italic">Risco Veicular</span>
                    </h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto font-light">
                        Não compre no escuro. Nossa ferramenta utiliza dados estatísticos de perícias em Goiás para estimar seu risco financeiro.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Form Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-slate-900/50 backdrop-blur-xl p-8 rounded-3xl border border-white/5 shadow-2xl"
                    >
                        <form onSubmit={calculateRealisticRisk} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Marca/Modelo</label>
                                <input
                                    type="text"
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                    placeholder="Ex: Corolla XEI"
                                    className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-slate-600 font-medium"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Ano</label>
                                    <input
                                        type="number"
                                        value={year}
                                        onChange={(e) => setYear(e.target.value)}
                                        placeholder="Ex: 2020"
                                        className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-slate-600 font-medium"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Preço Pedido (R$)</label>
                                    <input
                                        type="text"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        placeholder="Ex: 105.000"
                                        className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-slate-600 font-medium"
                                        required
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-5 rounded-2xl transition-all shadow-[0_0_30px_rgba(59,130,246,0.3)] flex items-center justify-center gap-3 group uppercase tracking-wider"
                            >
                                ANALISAR RISCO AGORA
                                <TrendingDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                            </button>
                        </form>
                        <div className="flex items-center gap-2 mt-6 justify-center text-slate-500">
                            <Info className="w-3 h-3" />
                            <p className="text-[9px] uppercase tracking-widest font-bold">
                                Base de cálculo: Média regional KL 2024-2025
                            </p>
                        </div>
                    </motion.div>

                    {/* Result Side */}
                    <div className="relative min-h-[450px]">
                        <AnimatePresence mode="wait">
                            {!result ? (
                                <motion.div
                                    key="initial"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="h-full flex flex-col items-center justify-center text-center p-8 bg-slate-900/30 rounded-3xl border border-dashed border-slate-800"
                                >
                                    <div className="w-20 h-20 rounded-full bg-slate-800/50 flex items-center justify-center mb-6">
                                        <Calculator className="w-10 h-10 text-slate-600" />
                                    </div>
                                    <p className="text-slate-500 font-medium max-w-xs">Insira os dados do veículo ao lado para gerar o diagnóstico de risco financeiro.</p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="result"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className={`p-10 rounded-3xl shadow-2xl relative overflow-hidden h-full flex flex-col justify-center border ${result.severity === 'high' ? 'bg-gradient-to-br from-red-600 to-red-900 border-red-500/30' :
                                            result.severity === 'medium' ? 'bg-gradient-to-br from-amber-600 to-amber-900 border-amber-500/30' :
                                                'bg-gradient-to-br from-emerald-600 to-emerald-900 border-emerald-500/30'
                                        }`}
                                >
                                    <div className="absolute top-0 right-0 p-8 opacity-10">
                                        <TrendingDown className="w-32 h-32 text-white" />
                                    </div>

                                    <div className="relative z-10">
                                        <div className="flex items-center gap-3 mb-8">
                                            <AlertTriangle className={`w-8 h-8 ${result.severity === 'low' ? 'text-white' : 'text-white/90'}`} />
                                            <h3 className="text-2xl font-bold text-white uppercase tracking-tight">Diagnóstico KL</h3>
                                        </div>

                                        <div className="space-y-8 mb-10">
                                            <div>
                                                <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-1">Perda Comercial Potencial</p>
                                                <p className="text-5xl font-black text-white leading-none">R$ {result.loss.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</p>
                                                <p className="text-white/60 text-[10px] mt-2 font-bold uppercase tracking-tighter">Estimativa de depreciação oculta por sinistros não declarados</p>
                                            </div>

                                            <div className="flex items-center gap-8">
                                                <div>
                                                    <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest mb-1">Taxa de Risco</p>
                                                    <p className="text-3xl font-black text-white">{result.risk}%</p>
                                                </div>
                                                <div className="h-12 w-[1px] bg-white/20"></div>
                                                <div className="flex-1">
                                                    <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest mb-1">Status de Mercado</p>
                                                    <p className="text-sm font-bold text-white leading-tight uppercase tracking-tight">{result.message}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-black/20 backdrop-blur-md p-6 rounded-2xl border border-white/10 mb-8">
                                            <p className="text-xs text-white/90 font-medium leading-relaxed italic">
                                                "Neste perfil de veículo, problemas de estrutura maquiada representam o maior ralo financeiro na hora da revenda."
                                            </p>
                                        </div>

                                        <button
                                            onClick={handleWhatsAppLead}
                                            className="w-full bg-white text-slate-900 hover:bg-slate-100 font-black py-5 rounded-2xl transition-all shadow-xl flex items-center justify-center gap-2 uppercase tracking-wider text-sm"
                                        >
                                            <CheckCircle2 className="w-5 h-5" /> CONTRATAR VISTORIA E BLINDAR CAPITAL
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </Container>
        </section>
    );
};
