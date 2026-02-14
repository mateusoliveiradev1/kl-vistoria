import { MapPin, Phone, Mail, Clock, Car, Shield } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';
import { Section } from './ui/Section';
import { Container } from './ui/Container';
import { FadeIn } from './ui/FadeIn';
import { motion } from 'framer-motion';

const Location = () => {
  return (
    <Section id="atendimento" className="bg-gray-900 relative overflow-hidden">
      {/* Abstract Map Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
           <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
          </pattern>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <Container className="relative z-10">
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Nós vamos até você</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Esqueça o trânsito e a burocracia. Levamos nossa unidade móvel de alta precisão onde seu futuro carro estiver.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Radar Animation */}
          <FadeIn direction="right" className="relative h-[400px] flex items-center justify-center order-2 lg:order-1">
            <div className="relative w-80 h-80 flex items-center justify-center">
              {/* Pulsing Circles */}
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute border border-blue-500/30 rounded-full"
                  style={{ width: '100%', height: '100%' }}
                  animate={{
                    scale: [1, 1.5, 2],
                    opacity: [0.5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 1,
                    ease: "easeOut",
                  }}
                />
              ))}
              
              {/* Center Dot */}
              <div className="w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.8)] z-10 animate-pulse relative">
                <div className="absolute -inset-1 bg-blue-500/50 rounded-full animate-ping"></div>
              </div>

              {/* Map Outline (Abstract) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                 <MapPin className="w-32 h-32 text-white" />
              </div>
              
              {/* Floating Labels */}
              <motion.div 
                className="absolute top-10 right-0 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white border border-white/10"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                Goiânia
              </motion.div>
              <motion.div 
                className="absolute bottom-10 left-0 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white border border-white/10"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                Aparecida
              </motion.div>
            </div>
            <p className="absolute bottom-0 text-gray-400 text-sm tracking-widest uppercase mt-8">Radar de Cobertura Ativo</p>
          </FadeIn>

          {/* Benefits & Contact */}
          <FadeIn direction="left" className="order-1 lg:order-2 space-y-8">
            
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl flex items-start gap-4 hover:bg-white/10 transition-colors group">
                <div className="bg-blue-500/20 p-3 rounded-xl group-hover:scale-110 transition-transform">
                  <Clock className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">Economia de Tempo</h4>
                  <p className="text-gray-400 text-sm">Não perca horas no trânsito. Nós nos deslocamos até a concessionária, loja ou residência.</p>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl flex items-start gap-4 hover:bg-white/10 transition-colors group">
                <div className="bg-blue-500/20 p-3 rounded-xl group-hover:scale-110 transition-transform">
                  <Shield className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">Segurança Total</h4>
                  <p className="text-gray-400 text-sm">Acompanhe a vistoria presencialmente ou receba o laudo digital completo via WhatsApp.</p>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl flex items-start gap-4 hover:bg-white/10 transition-colors group">
                <div className="bg-blue-500/20 p-3 rounded-xl group-hover:scale-110 transition-transform">
                  <Car className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">Unidade Móvel Completa</h4>
                  <p className="text-gray-400 text-sm">Levamos todos os equipamentos de precisão necessários para uma análise técnica rigorosa.</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">Agende sua visita técnica</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href={COMPANY_INFO.contact.phoneLink}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-green-900/20 text-center flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  Chamar no WhatsApp
                </a>
                <div className="flex-1 bg-white/10 border border-white/10 text-white py-4 px-6 rounded-xl text-center flex items-center justify-center gap-2">
                  <Mail className="w-5 h-5" />
                  {COMPANY_INFO.contact.email}
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
