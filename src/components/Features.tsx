import { CheckCircle } from 'lucide-react';
import { Section } from './ui/Section';
import { Container } from './ui/Container';
import { FadeIn } from './ui/FadeIn';
import { Image } from './ui/Image';

const Features = () => {
  return (
    <Section id="diferenciais" className="bg-white">
      <Container>
        
        {/* Feature 1 */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-24">
          <FadeIn direction="right" className="lg:w-1/2">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1507136566006-cfc505b114fc?q=80&w=2070&auto=format&fit=crop" 
                alt="Análise Estrutural" 
                className="h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
              <div className="absolute bottom-6 left-6 text-white pointer-events-none">
                <p className="font-bold text-lg">Tecnologia de Ponta</p>
              </div>
            </div>
          </FadeIn>
          
          <FadeIn direction="left" className="lg:w-1/2">
            <h3 className="text-3xl font-bold text-primary mb-6">Por que fazer a Vistoria Cautelar?</h3>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              A compra de um veículo é um investimento alto. Nossa análise técnica detalhada elimina os riscos de adquirir um carro maquiado, batido ou com problemas documentais graves.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-gray-700 font-medium text-lg">Valorização na revenda</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-gray-700 font-medium text-lg">Segurança para sua família</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-gray-700 font-medium text-lg">Transparência na negociação</span>
              </li>
            </ul>
          </FadeIn>
        </div>

        {/* Feature 2 (Inverted) */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
          <FadeIn direction="left" className="lg:w-1/2">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1625047509168-a7026f36de04?q=80&w=2000&auto=format&fit=crop" 
                alt="Equipe Especializada" 
                className="h-auto"
              />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
               <div className="absolute bottom-6 left-6 text-white pointer-events-none">
                <p className="font-bold text-lg">Equipe Certificada</p>
              </div>
            </div>
          </FadeIn>
          
          <FadeIn direction="right" className="lg:w-1/2">
            <h3 className="text-3xl font-bold text-primary mb-6">Análise Técnica Especializada</h3>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Não somos apenas uma empresa de vistorias, somos especialistas em análise automotiva. Nossos técnicos são treinados para identificar os mínimos detalhes que passam despercebidos.
            </p>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Utilizamos equipamentos de precisão para medir a espessura da pintura e garantir que o carro é 100% autêntico.
            </p>
            <a href="#contato" className="text-secondary font-bold hover:text-red-700 transition-colors flex items-center gap-2 group">
              Fale com um especialista
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </FadeIn>
        </div>

      </Container>
    </Section>
  );
};

export default Features;
