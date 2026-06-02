import { ArrowRight, CheckCircle2, FileText, MapPin, MessageCircle, ShieldCheck } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { COMPANY_INFO } from '../data/company';
import { Button } from './ui/Button';
import { Container } from './ui/Container';
import { FadeIn } from './ui/FadeIn';

const proofItems = [
  'Atendimento movel',
  'Laudo digital',
  'Analise estrutural',
  'Goiania e regiao',
];

const inspectionItems = [
  'Chassi, motor e etiquetas',
  'Longarinas e estrutura',
  'Pintura e repintura',
  'Leilao, sinistro e restricoes',
];

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);

  return (
    <section
      ref={ref}
      id="inicio"
      className="relative min-h-screen overflow-hidden bg-[#080B10] pb-12 pt-24 text-white md:pt-32"
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center opacity-45"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1613214149922-f1809c99b414?q=80&w=2070&auto=format&fit=crop")',
          y,
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,10,8,0.97)_0%,rgba(8,10,8,0.88)_44%,rgba(8,10,8,0.58)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#080B10] to-transparent" />
      <div className="absolute left-0 top-24 hidden h-[1px] w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent md:block" />

      <Container className="relative z-10">
        <div className="grid min-h-[calc(100vh-7rem)] grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-3xl">
            <FadeIn delay={0.02}>
              <div className="mb-6 inline-flex items-center gap-3 rounded-md border border-primary/30 bg-primary/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
                <ShieldCheck className="h-4 w-4" />
                Vistoria cautelar antes de fechar negocio
              </div>
            </FadeIn>

            <motion.h1
              className="font-heading text-4xl font-extrabold leading-[0.98] text-white sm:text-6xl lg:text-7xl"
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
            >
              Evite comprar carro batido ou adulterado.
            </motion.h1>

            <FadeIn delay={0.08}>
              <p className="mt-7 max-w-2xl border-l border-primary/60 pl-5 text-base leading-8 text-slate-200 sm:text-lg">
                A {COMPANY_INFO.name} vai ate o veiculo e entrega uma analise tecnica para voce
                negociar com seguranca antes de transferir dinheiro.
              </p>
            </FadeIn>

            <FadeIn delay={0.12} className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-whatsapp-popup'))}
                className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-md bg-secondary px-7 font-black text-[#06140a] shadow-xl shadow-emerald-950/30 transition hover:-translate-y-0.5 hover:bg-[#4ee184]"
              >
                <MessageCircle className="h-5 w-5" />
                Agendar vistoria no WhatsApp
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </button>
              <a href="/#servicos">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Ver o que analisamos
                </Button>
              </a>
            </FadeIn>

            <FadeIn delay={0.16}>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {proofItems.map((item) => (
                  <div
                    key={item}
                    className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-3 text-xs font-bold uppercase tracking-wide text-slate-200"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.25} direction="left">
            <div className="relative mx-auto w-full max-w-xl rounded-lg border border-white/12 bg-[#111827]/85 p-5 shadow-2xl backdrop-blur-xl sm:p-6">
              <div className="absolute -right-3 -top-3 rounded-md bg-primary px-4 py-2 text-xs font-black uppercase tracking-widest text-white shadow-xl">
                Antes da compra
              </div>
              <div className="overflow-hidden rounded-md border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1746079074494-822fb0f83364?q=80&w=2070&auto=format&fit=crop"
                  alt="Perito realizando vistoria cautelar em veiculo"
                  className="h-56 w-full object-cover sm:h-72"
                />
              </div>

              <div className="mt-6 grid gap-3">
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
                      Checklist tecnico
                    </p>
                    <h2 className="mt-1 text-2xl font-bold text-white">O que pode mudar o valor do carro</h2>
                  </div>
                  <FileText className="h-9 w-9 shrink-0 text-primary" />
                </div>

                {inspectionItems.map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-slate-200">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-secondary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-3 rounded-md border border-primary/20 bg-primary/10 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <MapPin className="h-5 w-5 text-primary" />
                  {COMPANY_INFO.address.fullAddress}
                </div>
                <span className="text-sm font-bold text-primary">{COMPANY_INFO.contact.phone}</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
