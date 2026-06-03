import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Activity,
  BarChart3,
  BookOpen,
  CalendarClock,
  CircleAlert,
  Filter,
  MessageCircle,
  MousePointerClick,
  RefreshCw,
  Star,
  Users,
} from 'lucide-react';
import { SEO } from '../../components/SEO';
import { AdminShell, EmptyState } from './adminShared';
import { eventLabel, formatAdminDate } from './adminUtils';

type Kpis = {
  pageViews: number;
  whatsappClicks: number;
  popupOpens: number;
  popupSubmits: number;
  leads: number;
  conversionRate: number;
};

type RowTotal = {
  path?: string;
  source?: string;
  total: number;
};

type EventRow = {
  id: number;
  event_name: string;
  path: string | null;
  utm_source: string | null;
  device_type: string | null;
  created_at: string;
};

type ModuleCounts = {
  catalog_items: number;
  reviews: number;
  appointments: number;
  open_leads: number;
};

type SummaryResponse = {
  ok: boolean;
  disabled?: boolean;
  kpis?: Kpis;
  topPages?: RowTotal[];
  sourceBreakdown?: RowTotal[];
  recentEvents?: EventRow[];
  modules?: ModuleCounts;
};

const emptyKpis: Kpis = {
  pageViews: 0,
  whatsappClicks: 0,
  popupOpens: 0,
  popupSubmits: 0,
  leads: 0,
  conversionRate: 0,
};

const emptyModules: ModuleCounts = {
  catalog_items: 0,
  reviews: 0,
  appointments: 0,
  open_leads: 0,
};

function getApiErrorMessage(response: Response) {
  if (response.status === 401) return '';
  if (response.status === 503) return 'Configuracao do painel incompleta na Vercel.';
  return 'Nao foi possivel carregar os dados do painel.';
}

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [days, setDays] = useState(30);
  const [data, setData] = useState<SummaryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadSummary = useMemo(
    () => async () => {
      setIsLoading(true);
      setError('');

      try {
        const response = await fetch(`/api/admin/summary?days=${days}`);

        if (response.status === 401) {
          navigate('/admin/login');
          return;
        }

        const contentType = response.headers.get('content-type') || '';
        if (!contentType.includes('application/json')) {
          setError('API local indisponivel. Para testar o painel localmente, use vercel dev em vez de npm run dev.');
          return;
        }

        if (!response.ok) {
          setError(getApiErrorMessage(response));
          return;
        }

        setData((await response.json()) as SummaryResponse);
      } catch {
        setError('Falha de conexao com o painel. Verifique se a API esta rodando.');
      } finally {
        setIsLoading(false);
      }
    },
    [days, navigate]
  );

  useEffect(() => {
    void loadSummary();
  }, [loadSummary]);

  const kpis = data?.kpis || emptyKpis;
  const modules = data?.modules || emptyModules;
  const maxPageTotal = Math.max(...(data?.topPages || []).map((row) => row.total), 1);

  const cards = [
    { label: 'Visualizacoes', value: kpis.pageViews, icon: BarChart3, detail: 'trafego medido' },
    { label: 'WhatsApp', value: kpis.whatsappClicks, icon: MessageCircle, detail: 'cliques diretos' },
    { label: 'Popup aberto', value: kpis.popupOpens, icon: MousePointerClick, detail: 'intencao de contato' },
    { label: 'Leads', value: kpis.leads, icon: Users, detail: 'formularios enviados' },
    { label: 'Conversao', value: `${kpis.conversionRate}%`, icon: Activity, detail: 'lead / page view' },
  ];

  const operationalModules = [
    { label: 'Leads abertos', value: modules.open_leads, icon: Users, copy: 'Fila comercial para retorno.' },
    { label: 'Agendamentos', value: modules.appointments, icon: CalendarClock, copy: 'Tabela preparada para agenda.' },
    { label: 'Reviews', value: modules.reviews, icon: Star, copy: 'Base pronta para Google reviews.' },
    { label: 'Catalogo', value: modules.catalog_items, icon: BookOpen, copy: 'Servicos que o bot podera consumir.' },
  ];

  return (
    <>
      <SEO
        title="Painel Admin"
        description="Dashboard privado de leads e conversoes da KL Vistorias."
        url="https://klvistorias.com.br/admin"
        noIndex
      />
      <AdminShell
        eyebrow="Visao geral"
        title="Painel de conversoes"
        description="Dados reais da landing, prontos para alimentar atendimento, agenda e bot."
        actions={
          <>
            <label className="flex h-11 items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-3 text-sm text-slate-300">
              <Filter className="h-4 w-4 text-primary" />
              <select
                value={days}
                onChange={(event) => setDays(Number(event.target.value))}
                className="bg-transparent text-sm font-bold text-white outline-none"
              >
                <option className="bg-slate-950" value={7}>7 dias</option>
                <option className="bg-slate-950" value={30}>30 dias</option>
                <option className="bg-slate-950" value={90}>90 dias</option>
              </select>
            </label>
            <button
              onClick={() => void loadSummary()}
              className="flex h-11 items-center gap-2 rounded-md border border-white/10 px-4 text-sm font-bold text-slate-300 transition hover:border-primary/40 hover:text-white"
            >
              <RefreshCw className="h-4 w-4" />
              Atualizar
            </button>
          </>
        }
      >
        {data?.disabled && (
          <div className="mb-6 rounded-lg border border-amber-400/30 bg-amber-400/10 p-5 text-sm text-amber-100">
            Banco ainda nao configurado. Defina `DATABASE_URL`, `ADMIN_PASSWORD` e `ADMIN_SESSION_SECRET` na Vercel.
          </div>
        )}

        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-lg border border-red-500/30 bg-red-500/10 p-5 text-sm text-red-100">
            <CircleAlert className="mt-0.5 h-5 w-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <section className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {cards.map((card) => (
            <div key={card.label} className="rounded-lg border border-white/10 bg-[#111827] p-5">
              <div className="mb-5 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                  {card.label}
                </span>
                <card.icon className="h-5 w-5 text-primary" />
              </div>
              <p className="text-3xl font-black">{isLoading ? '-' : card.value}</p>
              <p className="mt-2 text-xs text-slate-500">{card.detail}</p>
            </div>
          ))}
        </section>

        <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {operationalModules.map((module) => (
            <div key={module.label} className="rounded-lg border border-white/10 bg-[#0D121C] p-5">
              <div className="mb-4 flex items-center gap-3">
                <module.icon className="h-5 w-5 text-primary" />
                <h3 className="font-black">{module.label}</h3>
              </div>
              <p className="text-2xl font-black">{isLoading ? '-' : module.value}</p>
              <p className="mt-2 text-xs leading-5 text-slate-500">{module.copy}</p>
            </div>
          ))}
        </section>

        <section className="mb-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-lg border border-white/10 bg-[#111827] p-6">
            <h2 className="mb-5 flex items-center gap-2 text-xl font-black">
              <BarChart3 className="h-5 w-5 text-primary" />
              Paginas com mais eventos
            </h2>
            <div className="space-y-4">
              {(data?.topPages || []).map((row) => (
                <div key={row.path}>
                  <div className="mb-2 flex items-center justify-between gap-4">
                    <span className="truncate text-sm text-slate-300">{row.path}</span>
                    <strong className="text-primary">{row.total}</strong>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-black/30">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${Math.max((row.total / maxPageTotal) * 100, 6)}%` }}
                    />
                  </div>
                </div>
              ))}
              {!isLoading && !data?.topPages?.length && (
                <EmptyState title="Sem paginas medidas" description="Os dados aparecem aqui quando visitantes acessam a landing." />
              )}
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-[#111827] p-6">
            <h2 className="mb-5 flex items-center gap-2 text-xl font-black">
              <Activity className="h-5 w-5 text-primary" />
              Origem do trafego
            </h2>
            <div className="space-y-3">
              {(data?.sourceBreakdown || []).map((row) => (
                <div key={row.source} className="flex items-center justify-between gap-4 rounded-md bg-black/20 px-4 py-3">
                  <span className="truncate text-sm text-slate-300">{row.source}</span>
                  <strong className="text-primary">{row.total}</strong>
                </div>
              ))}
              {!isLoading && !data?.sourceBreakdown?.length && (
                <EmptyState title="Sem origem registrada" description="Campanhas com UTM e acessos diretos aparecem nesta area." />
              )}
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-white/10 bg-[#111827] p-6">
          <h2 className="mb-5 flex items-center gap-2 text-xl font-black">
            <CalendarClock className="h-5 w-5 text-primary" />
            Eventos recentes
          </h2>
          <div className="grid gap-3 md:grid-cols-2">
            {(data?.recentEvents || []).map((event) => (
              <div key={event.id} className="rounded-md border border-white/10 bg-black/20 p-4">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <strong className="text-sm text-white">{eventLabel(event.event_name)}</strong>
                  <span className="text-xs text-slate-500">{formatAdminDate(event.created_at)}</span>
                </div>
                <p className="truncate text-xs text-slate-400">{event.path || '/'}</p>
                <p className="mt-2 text-xs text-slate-500">
                  {event.device_type || 'dispositivo desconhecido'} - {event.utm_source || 'direto'}
                </p>
              </div>
            ))}
            {!isLoading && !data?.recentEvents?.length && (
              <EmptyState title="Nenhum evento ainda" description="Cliques, visualizacoes e popups entram aqui em tempo real." />
            )}
          </div>
        </section>
      </AdminShell>
    </>
  );
}
