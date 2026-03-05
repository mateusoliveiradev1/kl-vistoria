import { ShieldCheck, FileSearch, CheckCircle2, AlertTriangle, MessageCircle } from 'lucide-react';
import { Section } from './ui/Section';
import { Container } from './ui/Container';
import { FadeIn } from './ui/FadeIn';
import { Image } from './ui/Image';
import { SpotlightCard } from './ui/SpotlightCard';

const Services = () => {
  return (
    <Section id="servicos" className="bg-gray-50 relative overflow-hidden">
      {/* Background Blobs for Glassmorphism Context */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[500px] h-[500px] bg-pink-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <Container className="relative z-10">
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">Nossos Serviços</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Utilizamos tecnologia avançada e análise técnica minuciosa para entregar laudos precisos e confiáveis.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Vistoria Cautelar Card */}
          <FadeIn direction="left" delay={0.1}>
            <SpotlightCard className="flex flex-col h-full shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="relative h-64 overflow-hidden rounded-t-xl">
                <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors z-10 pointer-events-none"></div>
                <Image
                  src="https://images.unsplash.com/photo-1746079074494-822fb0f83364?q=80&w=2070&auto=format&fit=crop"
                  alt="Vistoria Cautelar Completa em Goiânia: perícia técnica em estrutura de veículos"
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

                <div onClick={() => window.dispatchEvent(new CustomEvent('open-whatsapp-popup'))} className="cursor-pointer relative z-20">
                  <div className="inline-block w-full text-center py-3 border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary hover:text-white transition-colors">
                    Solicitar Cautelar
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </FadeIn>

          {/* Histórico Veicular Card */}
          <FadeIn direction="right" delay={0.2}>
            <SpotlightCard className="flex flex-col h-full shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="relative h-64 overflow-hidden rounded-t-xl">
                <div className="absolute inset-0 bg-blue-900/30 group-hover:bg-blue-900/10 transition-colors z-10 pointer-events-none"></div>
                <Image
                  src="https://images.unsplash.com/photo-1648737966968-5f50e6bf9e46?q=80&w=2070&auto=format&fit=crop"
                  alt="Pesquisa de histórico veicular: verificação de leilão e sinistro automotivo"
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

                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('open-whatsapp-popup'))}
                  className="inline-flex items-center justify-center gap-2 w-full text-center py-3 border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary hover:text-white transition-colors relative z-20 cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5" />
                  Agendar Vistoria Cautelar
                </button>
              </div>
            </SpotlightCard>
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
                  src="https://images.unsplash.com/photo-1722078260099-961a157a46d8?q=80&w=2070&auto=format&fit=crop"
                  alt="Análise detalhada do motor em vistoria técnica automotiva"
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
                  src="https://images.unsplash.com/photo-1620002093398-8f16081af5ee?q=80&w=2070&auto=format&fit=crop"
                  alt="Medição de espessura de pintura em perícia cautelar Goiânia"
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
                  src="https://images.unsplash.com/photo-1729843606560-e41b0be7fc7c?q=80&w=2069&auto=format&fit=crop"
                  alt="Inspeção de originalidade de chassi em veículo usado"
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
                  src="https://images.unsplash.com/photo-1637763723578-79a4ca9225f7?q=80&w=2070&auto=format&fit=crop"
                  alt="Verificação de documentação e histórico administrativo veicular"
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
