import { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { Section } from './ui/Section';
import { Container } from './ui/Container';
import { FadeIn } from './ui/FadeIn';
import { cn } from '../lib/utils';
import { FAQ_ITEMS } from '../data/faq';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section id="faq" className="relative bg-[#080B10]">
      <Container size="lg">
        <FadeIn className="mb-12 grid gap-6 md:grid-cols-[0.85fr_1.15fr] md:items-end">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-primary">
              Duvidas frequentes
            </p>
            <h2 className="text-4xl font-extrabold leading-tight text-white md:text-5xl">
              Respostas para decidir antes de comprar.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-slate-300">
            Se ainda restar alguma duvida, envie os dados do veiculo e fale com a equipe pelo WhatsApp.
          </p>
        </FadeIn>

        <div className="grid gap-6 lg:grid-cols-[1fr_0.42fr]">
          <div className="space-y-3">
            {FAQ_ITEMS.map((item, index) => (
              <FadeIn key={item.question} delay={index * 0.05} direction="up">
                <div className="overflow-hidden rounded-lg border border-white/10 bg-[#111827] transition hover:border-primary/40">
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="flex w-full items-center justify-between gap-5 p-5 text-left transition hover:bg-white/[0.03]"
                    aria-expanded={openIndex === index}
                  >
                    <span className="text-lg font-bold text-white">{item.question}</span>
                    <span
                      className={cn(
                        'flex h-9 w-9 shrink-0 items-center justify-center rounded-md border transition',
                        openIndex === index
                          ? 'border-primary bg-primary text-white'
                          : 'border-white/10 text-slate-400'
                      )}
                    >
                      <ChevronDown className={cn('h-5 w-5 transition', openIndex === index && 'rotate-180')} />
                    </span>
                  </button>

                  <div
                    className={cn(
                      'overflow-hidden px-5 text-slate-300 transition-all duration-300',
                      openIndex === index ? 'max-h-52 pb-5 opacity-100' : 'max-h-0 opacity-0'
                    )}
                  >
                    <p className="border-t border-white/10 pt-4 leading-7">{item.answer}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn direction="left">
            <aside className="rounded-lg border border-primary/20 bg-primary/10 p-6 lg:sticky lg:top-28">
              <HelpCircle className="mb-5 h-8 w-8 text-primary" />
              <h3 className="text-2xl font-bold text-white">Esta negociando agora?</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                Mande modelo, ano, cidade e onde o carro esta. A equipe orienta o melhor proximo passo.
              </p>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-whatsapp-popup'))}
                className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-md bg-secondary px-5 font-black text-[#06140a] transition hover:bg-[#4ee184]"
              >
                <MessageCircle className="h-5 w-5" />
                Falar com a KL
              </button>
            </aside>
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
}

