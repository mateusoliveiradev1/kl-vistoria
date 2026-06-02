import { Award, FileCheck2, MapPinned, MessageCircle, Shield } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';
import { Section } from './ui/Section';
import { Container } from './ui/Container';
import { FadeIn } from './ui/FadeIn';

const steps = [
  {
    icon: MessageCircle,
    title: 'Voce envia os dados',
    body: 'Modelo, localizacao, urgencia e tipo de vistoria para a equipe entender o contexto da compra.',
  },
  {
    icon: MapPinned,
    title: 'A equipe vai ate o carro',
    body: 'Atendimento movel em Goiania e regiao, seja em garagem, loja, patio ou residencia.',
  },
  {
    icon: FileCheck2,
    title: 'Voce recebe clareza',
    body: 'A analise aponta sinais de risco, itens verificados e pontos que podem mudar sua decisao.',
  },
];

const trustStats = [
  { label: 'Tempo medio', value: '40-60 min' },
  { label: 'Canal direto', value: COMPANY_INFO.contact.phone },
  { label: 'Empresa', value: `CNPJ ${COMPANY_INFO.legal.cnpj}` },
];

const Features = () => {
  return (
    <Section id="diferenciais" className="relative overflow-hidden bg-[#080B10]">
      <div className="absolute left-0 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent md:block" />
      <div className="absolute bottom-0 left-1/2 h-px w-screen -translate-x-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <Container className="relative z-10">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <FadeIn>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-primary">
              Como funciona
            </p>
            <h2 className="text-4xl font-extrabold leading-tight text-white md:text-5xl">
              Uma decisao grande precisa de um processo simples.
            </h2>
            <p className="mt-6 text-base leading-8 text-slate-300">
              O objetivo nao e complicar a compra. E revelar o que importa antes do dinheiro sair da sua mao.
            </p>

            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-whatsapp-popup'))}
              className="mt-8 inline-flex min-h-12 items-center justify-center gap-3 rounded-md border border-primary/40 bg-primary/10 px-5 font-bold text-primary transition hover:bg-primary hover:text-white"
            >
              <MessageCircle className="h-5 w-5" />
              Agendar avaliacao
            </button>
          </FadeIn>

          <div className="grid gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <FadeIn key={step.title} delay={index * 0.1} direction="left">
                  <article className="grid gap-5 rounded-lg border border-white/10 bg-[#111827] p-5 md:grid-cols-[auto_1fr] md:p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-md border border-primary/30 bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="mb-2 flex items-center gap-3">
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-primary">0{index + 1}</span>
                        <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                      </div>
                      <p className="text-sm leading-7 text-slate-300 md:text-base">{step.body}</p>
                    </div>
                  </article>
                </FadeIn>
              );
            })}
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {trustStats.map((stat) => (
            <FadeIn key={stat.label} direction="up">
              <div className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">{stat.label}</p>
                <p className="mt-2 text-xl font-black text-white">{stat.value}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-10">
          <div className="grid gap-6 rounded-lg border border-white/10 bg-[#111827] p-6 md:grid-cols-[auto_1fr] md:items-center md:p-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-md bg-primary text-white">
              <Shield className="h-8 w-8" />
            </div>
            <div>
              <div className="mb-2 flex flex-wrap items-center gap-3">
                <Award className="h-5 w-5 text-primary" />
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Confiança operacional</p>
              </div>
              <h3 className="text-2xl font-bold text-white md:text-3xl">
                A vistoria serve para proteger seu dinheiro, nao para gerar um laudo bonito.
              </h3>
              <p className="mt-3 max-w-4xl text-base leading-7 text-slate-300">
                A leitura tecnica considera estrutura, identificacao, pintura, historico e contexto de negociacao. Se houver risco, voce sabe antes de assumir o problema.
              </p>
            </div>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
};

export default Features;
