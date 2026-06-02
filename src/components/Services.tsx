import { AlertTriangle, ArrowRight, CheckCircle2, FileSearch, Gauge, MessageCircle, ShieldCheck } from 'lucide-react';
import { Section } from './ui/Section';
import { Container } from './ui/Container';
import { FadeIn } from './ui/FadeIn';

const serviceCards = [
  {
    icon: ShieldCheck,
    title: 'Vistoria cautelar completa',
    body: 'Analise estrutural, identificacao, pintura, documentacao e sinais de reparo para reduzir risco antes da compra.',
    items: ['Longarinas e colunas', 'Chassi, motor e etiquetas', 'Pintura e repintura', 'Vidros e originalidade'],
  },
  {
    icon: FileSearch,
    title: 'Pesquisa de historico',
    body: 'Consulta de eventos que podem desvalorizar o veiculo ou travar uma negociacao.',
    items: ['Indicio de sinistro', 'Passagem por leilao', 'Roubo e furto', 'Restricoes administrativas'],
  },
];

const riskItems = [
  'Carro maquiado para revenda rapida',
  'Reparo estrutural sem declaracao',
  'Historico de leilao omitido',
  'Documentacao com restricao',
];

const Services = () => {
  return (
    <Section id="servicos" className="relative overflow-hidden bg-[#0B111A]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 h-[420px] w-[420px] rounded-full bg-primary/5 blur-[110px]" />

      <Container className="relative z-10">
        <div className="mb-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <FadeIn>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-primary">
              O que a KL descobre
            </p>
            <h2 className="text-4xl font-extrabold leading-tight text-white md:text-5xl">
              A vistoria transforma duvida em poder de negociacao.
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
              Antes de pagar sinal, transferir dinheiro ou assumir financiamento, a equipe confere os pontos que mais geram prejuizo em carros usados.
            </p>
          </FadeIn>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {serviceCards.map((service, index) => {
            const Icon = service.icon;

            return (
              <FadeIn key={service.title} delay={index * 0.1} direction="up">
                <article className="h-full rounded-lg border border-white/10 bg-[#111827] p-6 shadow-2xl transition hover:border-primary/40 md:p-8">
                  <div className="mb-8 flex items-start justify-between gap-6">
                    <div className="rounded-md border border-primary/30 bg-primary/10 p-3">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="mb-4 text-3xl font-bold text-white">{service.title}</h3>
                  <p className="mb-7 text-base leading-7 text-slate-300">{service.body}</p>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {service.items.map((item) => (
                      <div key={item} className="flex items-center gap-3 rounded-md border border-white/10 bg-white/[0.03] p-3 text-sm text-slate-200">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-secondary" />
                        {item}
                      </div>
                    ))}
                  </div>
                </article>
              </FadeIn>
            );
          })}
        </div>

        <div className="mt-8 grid gap-6 rounded-lg border border-primary/20 bg-primary/10 p-5 md:grid-cols-[0.8fr_1.2fr_auto] md:items-center md:p-7">
          <div className="flex items-center gap-3">
            <div className="rounded-md bg-[#080B10] p-3">
              <AlertTriangle className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Riscos comuns</p>
              <p className="text-lg font-bold text-white">Nao descubra depois da compra.</p>
            </div>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            {riskItems.map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-slate-300">
                <Gauge className="h-4 w-4 text-primary" />
                {item}
              </div>
            ))}
          </div>

          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-whatsapp-popup'))}
            className="inline-flex min-h-12 items-center justify-center gap-3 rounded-md bg-secondary px-5 font-black text-[#06140a] transition hover:-translate-y-0.5 hover:bg-[#4ee184]"
          >
            <MessageCircle className="h-5 w-5" />
            Enviar dados
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </Container>
    </Section>
  );
};

export default Services;
