import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Cookie,
  Database,
  ExternalLink,
  LockKeyhole,
  Mail,
  MessageCircle,
  ShieldCheck,
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { Container } from '../components/ui/Container';
import { FadeIn } from '../components/ui/FadeIn';
import { COMPANY_INFO } from '../data/company';

const LAST_UPDATED = '18 de marco de 2026';

const highlightCards = [
  {
    title: 'Controladora',
    icon: ShieldCheck,
    description: `${COMPANY_INFO.name} e a responsavel pelas decisoes sobre os dados tratados neste site.`,
  },
  {
    title: 'Canais de atendimento',
    icon: MessageCircle,
    description:
      'Os dados enviados no popup podem ser usados para retorno comercial e operacional via WhatsApp, telefone ou e-mail.',
  },
  {
    title: 'Cookies e analytics',
    icon: Cookie,
    description:
      'Recursos de medicao e cookies opcionais so sao ativados depois do aceite no banner de privacidade.',
  },
];

const collectedData = [
  {
    title: 'Dados informados por voce',
    items: [
      'nome, e-mail e telefone/WhatsApp',
      'endereco do atendimento',
      'veiculo, placa e servico solicitado',
    ],
  },
  {
    title: 'Dados de navegacao',
    items: [
      'registro do consentimento de cookies no navegador',
      'metricas de navegacao e paginas visitadas, quando o analytics for aceito',
    ],
  },
  {
    title: 'Dados operacionais',
    items: [
      'data e hora do envio do formulario',
      'origem do contato e informacoes necessarias para organizar o atendimento',
    ],
  },
];

const purposes = [
  'responder solicitacoes enviadas pelo popup do WhatsApp e pelos formularios do site',
  'realizar orcamento, agendamento, confirmacao e suporte relacionados aos servicos da KL Vistorias',
  'registrar o historico de atendimento e proteger a operacao contra fraudes, abusos ou uso indevido',
  'medir audiencia e melhorar a experiencia do site somente apos aceite do banner de cookies',
];

const sharingItems = [
  'prestadores de tecnologia e hospedagem necessarios para o funcionamento do site',
  'Google, em recursos usados para formulario, armazenamento operacional e analytics',
  'Meta/WhatsApp, quando o atendimento e continuado pelo WhatsApp',
  'autoridades publicas, quando houver obrigacao legal, regulatoria ou ordem valida',
];

const rights = [
  'confirmacao da existencia de tratamento e acesso aos dados',
  'correcao de dados incompletos, inexatos ou desatualizados',
  'anonimizacao, bloqueio ou eliminacao de dados desnecessarios ou tratados em desconformidade',
  'portabilidade, quando aplicavel e observados os segredos comercial e industrial',
  'informacoes sobre compartilhamento e sobre a possibilidade de negar consentimento',
  'revogacao do consentimento e solicitacao de eliminacao dos dados tratados com essa base legal',
];

const sections = [
  {
    title: '1. Quem controla os seus dados',
    body: [
      `${COMPANY_INFO.name}, inscrita no CNPJ ${COMPANY_INFO.legal.cnpj}, e a controladora dos dados pessoais tratados neste site.`,
      `Para assuntos de privacidade, o canal de contato e ${COMPANY_INFO.legal.privacyEmail}.`,
    ],
  },
  {
    title: '2. Bases legais utilizadas',
    body: [
      'O tratamento pode ocorrer, conforme o caso, com base no seu consentimento, na execucao de procedimentos preliminares relacionados ao servico solicitado, no cumprimento de obrigacoes legais e no exercicio regular de direitos.',
      'Quando o tratamento depender de consentimento, voce podera revoga-lo a qualquer momento pelos canais indicados nesta pagina.',
    ],
  },
  {
    title: '3. Compartilhamento e operadores',
    body: [
      'A KL Vistorias pode contar com operadores e fornecedores para viabilizar hospedagem, formularios, atendimento e mensuracao do site, sempre dentro da finalidade informada nesta politica.',
      'Quando voce escolhe continuar o atendimento pelo WhatsApp, o tratamento adicional tambem passa a seguir os termos e politicas da plataforma utilizada.',
    ],
  },
  {
    title: '4. Retencao e seguranca',
    body: [
      'Os dados sao mantidos pelo tempo necessario para cumprir as finalidades desta politica, atender obrigacoes legais e resguardar direitos da empresa em eventuais demandas.',
      'Adotamos medidas tecnicas e administrativas razoaveis para reduzir riscos de acesso nao autorizado, vazamento, alteracao indevida ou destruicao dos dados.',
    ],
  },
  {
    title: '5. Atualizacoes desta politica',
    body: [
      'Esta politica pode ser ajustada para refletir mudancas operacionais, tecnologicas ou legais. A versao vigente estara sempre disponivel nesta pagina com a data da ultima atualizacao.',
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#03060C] pt-32 pb-20">
      <SEO
        title="Politica de Privacidade"
        description="Saiba como a KL Vistorias coleta, usa e protege seus dados pessoais no site e no popup de atendimento via WhatsApp."
        url={`${COMPANY_INFO.website}/politica-de-privacidade`}
      />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-12rem] top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-[-10rem] top-40 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      </div>

      <Container className="relative z-10">
        <FadeIn direction="none">
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <Link
              to="/"
              className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900/60 px-4 py-2 text-sm font-bold text-slate-200 transition-colors hover:bg-slate-800/80"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar ao inicio
            </Link>
            <span className="rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.3em] text-primary">
              LGPD - Ultima atualizacao em {LAST_UPDATED}
            </span>
          </div>
        </FadeIn>

        <FadeIn delay={0.05}>
          <div className="glass-card rounded-[2rem] border border-slate-700/60 px-6 py-10 md:px-10 md:py-14">
            <div className="max-w-4xl">
              <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-primary/20 bg-slate-900/70 px-5 py-2 text-xs font-bold uppercase tracking-[0.28em] text-slate-300">
                <LockKeyhole className="h-4 w-4 text-primary" />
                Transparencia no tratamento de dados
              </div>
              <h1 className="max-w-4xl text-4xl font-black leading-tight text-white md:text-6xl">
                Politica de <span className="text-primary text-glow">Privacidade</span>
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
                Esta pagina explica como a {COMPANY_INFO.name} coleta, utiliza, compartilha e protege
                dados pessoais quando voce navega pelo site, aceita cookies ou solicita atendimento
                pelo popup de WhatsApp.
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {highlightCards.map(({ title, description, icon: Icon }, index) => (
                <FadeIn key={title} delay={0.1 + index * 0.08}>
                  <div className="h-full rounded-2xl border border-slate-700/60 bg-slate-950/60 p-5">
                    <div className="mb-4 inline-flex rounded-xl border border-primary/20 bg-primary/10 p-3 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h2 className="text-lg font-bold text-white">{title}</h2>
                    <p className="mt-3 text-sm leading-7 text-slate-400">{description}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeIn>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <FadeIn delay={0.12}>
            <div className="glass-card rounded-[2rem] border border-slate-700/60 p-6 md:p-8">
              <div className="mb-6 flex items-center gap-3">
                <Database className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-black text-white md:text-3xl">Quais dados coletamos</h2>
              </div>
              <div className="space-y-5">
                {collectedData.map((group) => (
                  <div key={group.title} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                    <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">{group.title}</h3>
                    <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                      {group.items.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.18}>
            <div className="space-y-6">
              <div className="glass-card rounded-[2rem] border border-slate-700/60 p-6 md:p-8">
                <h2 className="text-2xl font-black text-white md:text-3xl">Como usamos esses dados</h2>
                <ul className="mt-6 space-y-4 text-sm leading-7 text-slate-300">
                  {purposes.map((purpose) => (
                    <li key={purpose} className="flex gap-3">
                      <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{purpose}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass-card rounded-[2rem] border border-slate-700/60 p-6 md:p-8">
                <div className="mb-4 flex items-center gap-3">
                  <Cookie className="h-5 w-5 text-primary" />
                  <h2 className="text-2xl font-black text-white">Cookies e analytics</h2>
                </div>
                <p className="text-sm leading-7 text-slate-300">
                  O site registra a sua escolha no banner de cookies em armazenamento local do navegador.
                  Ferramentas de analytics so sao inicializadas apos o aceite explicito. Se preferir,
                  voce pode recusar o banner ou apagar esse registro diretamente no seu navegador.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>

        <div className="mt-10 grid gap-6 xl:grid-cols-2">
          <FadeIn delay={0.2}>
            <div className="glass-card rounded-[2rem] border border-slate-700/60 p-6 md:p-8">
              <h2 className="text-2xl font-black text-white md:text-3xl">
                Com quem os dados podem ser compartilhados
              </h2>
              <ul className="mt-6 space-y-4 text-sm leading-7 text-slate-300">
                {sharingItems.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={0.24}>
            <div className="glass-card rounded-[2rem] border border-slate-700/60 p-6 md:p-8">
              <h2 className="text-2xl font-black text-white md:text-3xl">Seus direitos como titular</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                Nos termos da LGPD, voce pode solicitar atendimento sobre os seguintes pontos:
              </p>
              <ul className="mt-6 space-y-4 text-sm leading-7 text-slate-300">
                {rights.map((right) => (
                  <li key={right} className="flex gap-3">
                    <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{right}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <FadeIn delay={0.28}>
            <div className="glass-card rounded-[2rem] border border-slate-700/60 p-6 md:p-8">
              <h2 className="text-2xl font-black text-white md:text-3xl">Detalhes adicionais</h2>
              <div className="mt-6 space-y-5">
                {sections.map((section) => (
                  <section key={section.title} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                    <h3 className="text-base font-bold text-white">{section.title}</h3>
                    <div className="mt-3 space-y-3 text-sm leading-7 text-slate-300">
                      {section.body.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.32}>
            <div className="space-y-6">
              <div className="glass-card rounded-[2rem] border border-primary/20 p-6 md:p-8">
                <h2 className="text-2xl font-black text-white">Solicitacoes de privacidade</h2>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  Para exercer direitos, atualizar dados ou tirar duvidas sobre esta politica, entre em
                  contato pelos canais abaixo. Para agilizar, envie o assunto{' '}
                  <strong className="text-white">Privacidade LGPD</strong>.
                </p>
                <div className="mt-6 space-y-4 text-sm text-slate-200">
                  <a
                    href={`mailto:${COMPANY_INFO.legal.privacyEmail}?subject=Privacidade%20LGPD`}
                    className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-4 transition-colors hover:border-primary/40"
                  >
                    <Mail className="h-5 w-5 text-primary" />
                    <span>{COMPANY_INFO.legal.privacyEmail}</span>
                  </a>
                  <a
                    href={COMPANY_INFO.contact.phoneLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-4 transition-colors hover:border-primary/40"
                  >
                    <MessageCircle className="h-5 w-5 text-primary" />
                    <span>{COMPANY_INFO.contact.phone}</span>
                    <ExternalLink className="ml-auto h-4 w-4 text-slate-500" />
                  </a>
                </div>
              </div>

              <div className="rounded-[2rem] border border-slate-800 bg-slate-950/60 p-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500">
                  Endereco de referencia
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {COMPANY_INFO.address.fullAddress}
                </p>
                <p className="mt-4 text-xs leading-6 text-slate-500">
                  Este conteudo tem finalidade informativa e operacional. Se voce precisar de adequacoes
                  especificas para o seu negocio, o ideal e contar com validacao juridica especializada.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </div>
  );
}
