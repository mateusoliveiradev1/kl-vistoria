import { CheckCircle, Shield, Award, Clock } from 'lucide-react';
import { Section } from './ui/Section';
import { Container } from './ui/Container';
import { FadeIn } from './ui/FadeIn';
import { Image } from './ui/Image';

const Features = () => {
  return (
    <Section id="diferenciais" className="bg-white">
      <Container>
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">Por que escolher a KL?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Mais do que uma vistoria, oferecemos a tranquilidade que você precisa para fechar negócio.
          </p>
        </FadeIn>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          
          {/* Large Card - Tecnologia */}
          <FadeIn className="md:col-span-2 row-span-2 relative group overflow-hidden rounded-3xl shadow-lg">
            <div className="absolute inset-0 bg-gray-900/40 group-hover:bg-gray-900/30 transition-colors z-10"></div>
            <Image 
              src="https://images.unsplash.com/photo-1507136566006-cfc505b114fc?q=80&w=2070&auto=format&fit=crop" 
              alt="Tecnologia" 
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute bottom-0 left-0 p-8 z-20">
              <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl border border-white/20 inline-block mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">Tecnologia de Ponta</h3>
              <p className="text-gray-200 text-lg max-w-md">
                Utilizamos equipamentos de precisão para análise de pintura, estrutura e identificação veicular.
              </p>
            </div>
          </FadeIn>

          {/* Medium Card - Equipe */}
          <FadeIn delay={0.1} className="relative group overflow-hidden rounded-3xl shadow-lg bg-gray-50 border border-gray-100 p-8 flex flex-col justify-between">
            <div className="absolute top-0 right-0 p-4 opacity-10">
               <Award className="w-32 h-32 text-primary" />
            </div>
            <div className="relative z-10">
              <div className="bg-blue-100 p-3 rounded-xl w-fit mb-4">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Equipe Certificada</h3>
              <p className="text-gray-600">
                Técnicos treinados e em constante atualização sobre o mercado automotivo.
              </p>
            </div>
          </FadeIn>

          {/* Medium Card - Agilidade */}
          <FadeIn delay={0.2} className="relative group overflow-hidden rounded-3xl shadow-lg bg-primary text-white p-8 flex flex-col justify-between">
             <div className="absolute top-0 right-0 p-4 opacity-10">
               <Clock className="w-32 h-32 text-white" />
            </div>
            <div className="relative z-10">
              <div className="bg-white/20 p-3 rounded-xl w-fit mb-4 backdrop-blur-sm">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Resultado Ágil</h3>
              <p className="text-blue-100">
                Laudo emitido logo após a vistoria, com fotos e descrição detalhada.
              </p>
            </div>
          </FadeIn>

          {/* Wide Card - CTA */}
          <FadeIn delay={0.3} className="md:col-span-3 relative overflow-hidden rounded-3xl shadow-lg bg-gray-900 flex items-center">
            <div className="absolute inset-0 opacity-20">
               <Image 
                src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2000&auto=format&fit=crop" 
                alt="Background" 
                className="h-full w-full object-cover"
              />
            </div>
            <div className="relative z-10 p-8 md:p-12 w-full flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="text-3xl font-bold text-white mb-2">Pronto para comprar com segurança?</h3>
                <p className="text-gray-300 text-lg">Agende sua vistoria agora mesmo e evite dores de cabeça.</p>
              </div>
              <a href="#contato" className="bg-secondary hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-lg shadow-red-900/20 whitespace-nowrap">
                Falar com Especialista
              </a>
            </div>
          </FadeIn>

        </div>
      </Container>
    </Section>
  );
};

export default Features;
