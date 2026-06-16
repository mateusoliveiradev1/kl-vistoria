import { Car, Clock, Mail, MapPin, MessageCircle, Phone, Route, Shield } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';
import { Section } from './ui/Section';
import { Container } from './ui/Container';
import { FadeIn } from './ui/FadeIn';

const coverage = [
  'Goiania',
];

const benefits = [
  {
    icon: Clock,
    title: 'Menos deslocamento',
    body: 'A vistoria acontece onde o carro esta, evitando perda de tempo antes da negociacao.',
  },
  {
    icon: Shield,
    title: 'Mais seguranca',
    body: 'Voce acompanha os pontos criticos ou recebe o resumo tecnico pelo WhatsApp.',
  },
  {
    icon: Car,
    title: 'Equipamento no local',
    body: 'A unidade movel leva as ferramentas necessarias para a analise cautelar.',
  },
];

const Location = () => {
  return (
    <Section id="atendimento" className="relative overflow-hidden bg-[#0B111A]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <Container className="relative z-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <FadeIn>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-primary">
              Atendimento movel
            </p>
            <h2 className="text-4xl font-extrabold leading-tight text-white md:text-5xl">
              Nos vamos ate o veiculo antes de voce fechar negocio.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
              Envie a localizacao da loja, garagem, patio ou residencia. A equipe confirma disponibilidade e orienta os proximos passos pelo WhatsApp.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-whatsapp-popup'))}
                className="inline-flex min-h-14 items-center justify-center gap-3 rounded-md bg-secondary px-7 font-black text-[#06140a] transition hover:-translate-y-0.5 hover:bg-[#4ee184]"
              >
                <MessageCircle className="h-5 w-5" />
                Chamar no WhatsApp
              </button>
              <a
                href={`mailto:${COMPANY_INFO.contact.email}`}
                className="inline-flex min-h-14 items-center justify-center gap-3 rounded-md border border-white/15 px-7 font-bold text-white transition hover:border-primary/60 hover:text-primary"
              >
                <Mail className="h-5 w-5" />
                Enviar e-mail
              </a>
            </div>
          </FadeIn>

          <FadeIn direction="left">
            <div className="rounded-lg border border-white/10 bg-[#111827] p-6 shadow-2xl md:p-8">
              <div className="mb-6 flex items-center justify-between gap-5 border-b border-white/10 pb-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Area de cobertura</p>
                  <h3 className="mt-2 text-3xl font-bold text-white">Goiania</h3>
                </div>
                <Route className="h-10 w-10 text-primary" />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {coverage.map((city) => (
                  <div key={city} className="flex items-center gap-3 rounded-md border border-white/10 bg-white/[0.03] p-3 text-sm text-slate-200">
                    <MapPin className="h-4 w-4 shrink-0 text-primary" />
                    {city}
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-md border border-primary/20 bg-primary/10 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Contato direto</p>
                <div className="mt-3 flex items-center gap-3 text-xl font-black text-white">
                  <Phone className="h-5 w-5 text-secondary" />
                  {COMPANY_INFO.contact.phone}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {benefits.map((item, index) => {
            const Icon = item.icon;

            return (
              <FadeIn key={item.title} delay={index * 0.1} direction="up">
                <article className="h-full rounded-lg border border-white/10 bg-white/[0.035] p-5">
                  <Icon className="mb-4 h-6 w-6 text-primary" />
                  <h4 className="text-xl font-bold text-white">{item.title}</h4>
                  <p className="mt-2 text-sm leading-7 text-slate-300">{item.body}</p>
                </article>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </Section>
  );
};

export default Location;
