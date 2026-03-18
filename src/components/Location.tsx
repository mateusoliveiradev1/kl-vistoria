import { MapPin, Phone, Mail, Clock, Car, Shield } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';
import { Section } from './ui/Section';
import { Container } from './ui/Container';
import { FadeIn } from './ui/FadeIn';
import { motion } from 'framer-motion';

const Location = () => {
  return (
    <Section id="atendimento" className="bg-[#050B14] relative overflow-hidden py-24 sm:py-32 border-t border-slate-800/50">
      {/* Abstract Map Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-screen">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="grid-location" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M 8 0 L 0 0 0 8" fill="none" stroke="currentColor" className="text-primary/20" strokeWidth="0.5" />
          </pattern>
          <rect width="100" height="100" fill="url(#grid-location)" />
        </svg>
      </div>

      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <Container className="relative z-10">
        <FadeIn className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight font-heading uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            Nós Vamos Até <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Você</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Levamos nossa <strong className="text-slate-200">Unidade Móvel de Alta Precisão</strong> onde o veículo estiver.
            Atendimento em <span className="text-primary font-medium">Goiânia e toda Região Metropolitana</span> com deslocamento imediato até você.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Radar Animation Area */}
          <FadeIn direction="right" className="lg:col-span-5 relative h-[400px] md:h-[500px] flex items-center justify-center order-2 lg:order-1">
            <div className="absolute inset-0 border border-slate-800/50 rounded-[40px] bg-slate-900/20 backdrop-blur-sm -z-10" />
            <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center">
              {/* Pulsing Circles */}
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute border border-primary/30 rounded-full"
                  style={{ width: '100%', height: '100%' }}
                  animate={{
                    scale: [1, 1.8, 2.5],
                    opacity: [0.6, 0.2, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 1,
                    ease: "easeOut",
                  }}
                />
              ))}

              {/* Center Dot */}
              <div className="w-6 h-6 bg-primary rounded-full shadow-[0_0_30px_rgba(59,130,246,1)] z-10 animate-pulse relative flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <div className="absolute -inset-2 bg-primary/40 rounded-full animate-ping"></div>
              </div>

              {/* Map Outline (Abstract) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
                <MapPin className="w-48 h-48 text-white stroke-[1px]" />
              </div>
            </div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-slate-900/90 px-4 py-2 rounded-lg border border-slate-800">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <p className="text-slate-400 text-[10px] font-bold tracking-[0.2em] font-heading">RADAR ATIVO</p>
            </div>
          </FadeIn>

          {/* Benefits & Contact */}
          <FadeIn direction="left" className="lg:col-span-7 order-1 lg:order-2 space-y-8 lg:pl-8">
            <div className="grid grid-cols-1 gap-5">
              <div className="glass-card hover:border-primary/40 transition-colors group p-6 rounded-2xl flex items-start gap-5">
                <div className="bg-slate-800/80 border border-slate-700/50 p-4 rounded-xl group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-300 shadow-inner">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg md:text-xl mb-2 font-heading tracking-wide group-hover:text-primary transition-colors">Economia de Tempo</h4>
                  <p className="text-slate-400 text-sm md:text-base leading-relaxed">Não perca horas no trânsito. Nossa equipe desloca-se com rapidez até a concessionária, garagem ou residência informada.</p>
                </div>
              </div>

              <div className="glass-card hover:border-primary/40 transition-colors group p-6 rounded-2xl flex items-start gap-5">
                <div className="bg-slate-800/80 border border-slate-700/50 p-4 rounded-xl group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-300 shadow-inner">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg md:text-xl mb-2 font-heading tracking-wide group-hover:text-primary transition-colors">Transparência Total</h4>
                  <p className="text-slate-400 text-sm md:text-base leading-relaxed">Acompanhe a vistoria presencialmente passo-a-passo ou receba o laudo digital completo e detalhado via WhatsApp em tempo real.</p>
                </div>
              </div>

              <div className="glass-card hover:border-primary/40 transition-colors group p-6 rounded-2xl flex items-start gap-5">
                <div className="bg-slate-800/80 border border-slate-700/50 p-4 rounded-xl group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-300 shadow-inner">
                  <Car className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg md:text-xl mb-2 font-heading tracking-wide group-hover:text-primary transition-colors">Mobilidade Absoluta</h4>
                  <p className="text-slate-400 text-sm md:text-base leading-relaxed">Unidade móvel equipada com medidores de espessura e ferramentas de alta precisão para análise rigorosa.</p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-800/80">
              <p className="text-xs text-slate-500 uppercase tracking-[0.15em] font-bold font-heading mb-4">Pronto para acionar a equipe?</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('open-whatsapp-popup'))}
                  className="flex-[2] bg-primary hover:bg-blue-600 text-white font-black py-4 md:py-5 px-6 rounded-xl transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] active:scale-[0.98] text-center flex items-center justify-center gap-3 cursor-pointer group uppercase tracking-wider text-sm md:text-base"
                >
                  <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  Agendar Visita Técnica
                </button>
                <div className="flex-[1] bg-slate-900/50 border border-slate-700 text-slate-300 py-4 px-6 rounded-xl text-center flex items-center justify-center gap-3 text-sm hover:bg-slate-800 transition-colors">
                  <Mail className="w-4 h-4 text-slate-500" />
                  <span className="hidden xl:inline">{COMPANY_INFO.contact.email}</span>
                  <span className="xl:hidden">E-mail</span>
                </div>
              </div>
            </div>

          </FadeIn>

        </div>
      </Container>
    </Section>
  );
};

export default Location;

