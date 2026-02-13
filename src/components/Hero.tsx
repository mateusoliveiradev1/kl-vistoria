import { ChevronRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';
import { Button } from './ui/Button';
import { Container } from './ui/Container';
import { FadeIn } from './ui/FadeIn';

const Hero = () => {
  return (
    <section id="inicio" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-gray-900/40 z-10"></div>
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=2070&auto=format&fit=crop")',
        }}
      ></div>

      <Container className="relative z-20 text-white h-full flex flex-col justify-center">
        <div className="max-w-4xl">
          <FadeIn delay={0.1}>
            <div className="inline-block bg-secondary/90 backdrop-blur-sm px-6 py-2 rounded-full text-sm font-bold mb-8 tracking-wider uppercase shadow-lg shadow-red-900/20 border border-white/10">
              Especialistas em Análise Veicular
            </div>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight tracking-tight">
              Não compre um carro <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-200 to-white">
                sem saber a verdade.
              </span>
            </h1>
          </FadeIn>
          
          <FadeIn delay={0.3}>
            <p className="text-xl md:text-2xl mb-12 text-gray-200 font-light leading-relaxed max-w-2xl border-l-4 border-secondary pl-6">
              A <span className="font-bold text-white">{COMPANY_INFO.name}</span> revela o histórico real e a estrutura do veículo, protegendo seu investimento contra fraudes e sinistros.
            </p>
          </FadeIn>

          <FadeIn delay={0.4} className="flex flex-col sm:flex-row gap-6">
            <a href={COMPANY_INFO.contact.phoneLink} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="w-full sm:w-auto group">
                AGENDAR VISTORIA CAUTELAR
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            <a href="#servicos">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                CONHECER SERVIÇOS
              </Button>
            </a>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
