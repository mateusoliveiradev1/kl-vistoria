import { ShieldCheck, FileSearch, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Section } from './ui/Section';
import { Container } from './ui/Container';
import { FadeIn } from './ui/FadeIn';
import { Image } from './ui/Image';

const Services = () => {
  return (
    <Section id="servicos" className="bg-gray-50">
      <Container>
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">Nossos Serviços</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Utilizamos tecnologia avançada e análise técnica minuciosa para entregar laudos precisos e confiáveis.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Vistoria Cautelar Card */}
          <FadeIn direction="left" delay={0.1}>
            <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col h-full">
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors z-10 pointer-events-none"></div>
                <Image 
                  src="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=2070&auto=format&fit=crop" 
                  alt="Vistoria Cautelar" 
                  className="h-full group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg z-20">
                  <ShieldCheck className="w-8 h-8 text-secondary" />
                </div>
              </div>
              
              <div className="p-8 flex-grow">
                <h3 className="text-2xl font-bold text-primary mb-4">Vistoria Cautelar Completa</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Análise estrutural profunda para identificar reparos de colisões, cortes, soldas e originalidade das peças. Essencial para quem vai comprar um seminovo.
                </p>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700">Análise de longarinas e estrutura</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700">Verificação de pintura e repintura</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700">Originalidade de vidros e etiquetas</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700">Identificação de motor e chassi</span>
                  </li>
                </ul>
                
                <a href="#contato" className="inline-block w-full text-center py-3 border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary hover:text-white transition-colors">
                  Solicitar Cautelar
                </a>
              </div>
            </div>
          </FadeIn>

          {/* Histórico Veicular Card */}
          <FadeIn direction="right" delay={0.2}>
            <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col h-full">
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-blue-900/20 group-hover:bg-blue-900/10 transition-colors z-10 pointer-events-none"></div>
                <Image 
                  src="https://images.unsplash.com/photo-1554744512-d6c603f27c54?q=80&w=2070&auto=format&fit=crop" 
                  alt="Histórico Veicular" 
                  className="h-full group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg z-20">
                  <FileSearch className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              
              <div className="p-8 flex-grow">
                <h3 className="text-2xl font-bold text-primary mb-4">Pesquisa de Histórico</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Varredura completa nos bancos de dados nacionais para descobrir o passado do veículo. Evite carros com restrições que desvalorizam o bem.
                </p>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700">Indício de Sinistro (Batidas)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700">Passagem por Leilão</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700">Restrições Judiciais e Financeiras</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700">Histórico de Roubo e Furto</span>
                  </li>
                </ul>

                <a href="#contato" className="inline-block w-full text-center py-3 border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary hover:text-white transition-colors">
                  Consultar Histórico
                </a>
              </div>
            </div>
          </FadeIn>

        </div>

        {/* Visual Detail Gallery */}
        <div className="mt-20">
          <FadeIn direction="up" delay={0.3} className="text-center mb-10">
            <h3 className="text-2xl font-bold text-gray-800">O que analisamos?</h3>
            <p className="text-gray-600">Confira alguns dos itens verificados em nossa vistoria detalhada.</p>
          </FadeIn>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <FadeIn delay={0.4} direction="up">
              <div className="relative group overflow-hidden rounded-xl h-48 shadow-md">
                <Image 
                  src="https://images.unsplash.com/photo-1486262715619-72a9396dc935?q=80&w=2070&auto=format&fit=crop" 
                  alt="Motor" 
                  className="h-full group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white font-bold">Motor</span>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.5} direction="up">
              <div className="relative group overflow-hidden rounded-xl h-48 shadow-md">
                <Image 
                  src="https://images.unsplash.com/photo-1600661653561-629509216228?q=80&w=2070&auto=format&fit=crop" 
                  alt="Pintura" 
                  className="h-full group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white font-bold">Pintura</span>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.6} direction="up">
              <div className="relative group overflow-hidden rounded-xl h-48 shadow-md">
                <Image 
                  src="https://images.unsplash.com/photo-1530903605624-d1a58d836d49?q=80&w=2069&auto=format&fit=crop" 
                  alt="Chassi" 
                  className="h-full group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white font-bold">Chassi</span>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.7} direction="up">
              <div className="relative group overflow-hidden rounded-xl h-48 shadow-md">
                <Image 
                  src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop" 
                  alt="Documentação" 
                  className="h-full group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white font-bold">Documentação</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Services;
