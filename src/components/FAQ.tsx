import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Section } from './ui/Section';
import { Container } from './ui/Container';
import { FadeIn } from './ui/FadeIn';
import { cn } from '../lib/utils';

const FAQ_ITEMS = [
  {
    question: "O que é a Vistoria Cautelar?",
    answer: "A Vistoria Cautelar é uma análise técnica profunda realizada por peritos em Goiânia. Verificamos toda a estrutura do veículo (chassi, longarinas, painel frontal/traseiro), pintura e originalidade de peças. O objetivo é garantir sua segurança e evitar a compra de carros com batidas graves ou adulterações."
  },
  {
    question: "Qual a diferença entre Vistoria Cautelar e Vistoria de Transferência?",
    answer: "Muitos clientes em Goiânia confundem as duas. A Vistoria de Transferência é obrigatória pelo DETRAN-GO apenas para trocar o documento. Já a Vistoria Cautelar da KL é opcional e muito mais completa: ela analisa a qualidade real do carro, histórico de leilão e sinistros, sendo o seguro real de quem está investindo em um seminovo."
  },
  {
    question: "Quanto tempo demora o serviço?",
    answer: "Nossa unidade móvel atende em toda Goiânia de forma ágil. Uma perícia cautelar completa leva em média de 40 a 60 minutos, dependendo da complexidade do veículo analisado."
  },
  {
    question: "O laudo sai na hora?",
    answer: "Sim! Assim que o perito finaliza a inspeção em solo, o laudo técnico digital é gerado e enviado para você com todas as fotos e o parecer de aprovação ou ressalva."
  },
  {
    question: "Vocês atendem em quais regiões?",
    answer: "Realizamos atendimento móvel premium em todos os bairros de Goiânia (como Setor Bueno, Marista, Oeste, Jardim Goiás) e também em Aparecida de Goiânia, Senador Canedo e Anápolis. Vamos até o carro para sua total comodidade."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section id="faq" className="bg-white">
      <Container size="md">
        <FadeIn className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Dúvidas Frequentes</h2>
          <p className="text-gray-600">
            Tire suas dúvidas sobre nossos serviços e entenda por que a KL Vistorias é a melhor opção.
          </p>
        </FadeIn>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, index) => (
            <FadeIn key={index} delay={index * 0.1} direction="up">
              <div
                className="group border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg bg-white"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none bg-gray-50/50 hover:bg-gray-50 transition-colors"
                  aria-expanded={openIndex === index}
                >
                  <span className="font-bold text-lg text-gray-800 pr-8">{item.question}</span>
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
                    openIndex === index ? "bg-secondary text-white rotate-180" : "bg-gray-200 text-gray-500 group-hover:bg-primary/10 group-hover:text-primary"
                  )}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                <div
                  className={cn(
                    "px-6 text-gray-600 overflow-hidden transition-all duration-300 ease-in-out bg-white",
                    openIndex === index ? "max-h-48 pb-6 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <p className="leading-relaxed pt-2 text-gray-600">
                    {item.answer}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
