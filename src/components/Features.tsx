import { Shield, Award, Clock } from 'lucide-react';
import { Section } from './ui/Section';
import { Container } from './ui/Container';
import { FadeIn } from './ui/FadeIn';
import { Image } from './ui/Image';

const Features = () => {
  return (
    <Section id="diferenciais" className="bg-gray-950 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none"></div>

      <Container className="relative z-10">
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Padrão de Excelência</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Mais do que uma vistoria, entregamos a certeza e a tecnologia que você precisa para fechar negócio sem medo.
          </p>
        </FadeIn>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">

          {/* Large Card - Tecnologia */}
          <FadeIn className="md:col-span-2 row-span-2 relative group overflow-hidden rounded-3xl shadow-2xl border border-gray-800">
            <div className="absolute inset-0 bg-gray-950/60 group-hover:bg-gray-950/40 transition-colors z-10"></div>
            <Image
              src="https://images.unsplash.com/photo-1642075191572-9992f5f290c2?q=80&w=2070&auto=format&fit=crop"
              alt="Perícia automotiva profunda com equipamentos de alta tecnologia"
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute bottom-0 left-0 p-8 z-20 w-full bg-gradient-to-t from-black/90 to-transparent">
              <div className="bg-white/10 backdrop-blur-xl p-4 rounded-2xl border border-white/20 inline-block mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">Engenharia e Precisão</h3>
              <p className="text-gray-300 text-lg max-w-md">
                Scanner automotivo, medidor de espessura de tinta e luz negra para revelar o que os olhos não veem.
              </p>
            </div>
          </FadeIn>

          {/* Medium Card - Equipe */}
          <FadeIn delay={0.1} className="relative group overflow-hidden rounded-3xl shadow-xl bg-gray-900 border border-gray-800 p-8 flex flex-col justify-between hover:border-gray-700 transition-colors">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Award className="w-32 h-32 text-primary" />
            </div>
            <div className="relative z-10">
              <div className="bg-primary/20 p-3 rounded-xl w-fit mb-4 border border-primary/30">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Equipe Técnica</h3>
              <p className="text-gray-400 font-light">
                Peritos treinados nos mais rigorosos padrões da indústria automotiva nacional.
              </p>
            </div>
          </FadeIn>

          {/* Medium Card - Agilidade */}
          <FadeIn delay={0.2} className="relative group overflow-hidden rounded-3xl shadow-xl bg-primary border border-blue-600 p-8 flex flex-col justify-between">
            <div className="absolute -bottom-6 -right-6 p-4 opacity-20">
              <Clock className="w-40 h-40 text-black" />
            </div>
            <div className="relative z-10">
              <div className="bg-black/20 p-3 rounded-xl w-fit mb-4 backdrop-blur-sm">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Laudo Técnico</h3>
              <p className="text-blue-100 font-light text-sm">
                Parecer técnico detalhado e assinado digitalmente, entregue logo após a conferência minuciosa dos nossos peritos.
              </p>
            </div>
          </FadeIn>

          {/* Wide Card - CTA */}
          <FadeIn delay={0.3} className="md:col-span-3 relative overflow-hidden rounded-3xl shadow-2xl bg-gray-900 border border-gray-800 flex items-center group">
            <div className="absolute inset-0 opacity-20 bg-gradient-to-r from-blue-900 to-transparent"></div>
            <div className="relative z-10 p-8 md:p-12 w-full flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-primary transition-colors">Compre ou Venda com Autoridade</h3>
                <p className="text-gray-400 text-lg">Um laudo KL diferencia seu carro no mercado e garante sua paz de espírito.</p>
              </div>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-whatsapp-popup'))}
                className="bg-secondary hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-lg shadow-red-900/20 whitespace-nowrap cursor-pointer"
              >
                Agendar Avaliação
              </button>
            </div>
          </FadeIn>

        </div>
      </Container>
    </Section>
  );
};

export default Features;
