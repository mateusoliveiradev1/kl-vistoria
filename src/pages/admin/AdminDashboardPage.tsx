import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Activity,
  BarChart3,
  BookOpen,
  CalendarClock,
  CircleAlert,
  Database,
  Filter,
  LogOut,
  MessageCircle,
  MousePointerClick,
  RefreshCw,
  Star,
  Users,
} from 'lucide-react';
import { SEO } from '../../components/SEO';

type Kpis = {
  pageViews: number;
  whatsappClicks: number;
  popupOpens: number;
  popupSubmits: number;
  leads: number;
  conversionRate: number;
};

type Lead = {
  id: number;
  name: string | null;
  phone: string | null;
  email: string | null;
  service: string | null;
  vehicle: string | null;
  address: string | null;
  urgency: string | null;
  source_path: string | null;
  status: string | null;
  created_at: string;
};

type RowTotal = {
  path?: string;
  source?: string;
  event_name?: string;
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
  days?: number;
  kpis?: Kpis;
  eventCounts?: RowTotal[];
  topPages?: RowTotal[];
  sourceBreakdown?: RowTotal[];
  recentLeads?: Lead[];
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

function formatDate(value: string) {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

function getApiErrorMessage(response: Response) {
  if (response.status === 401) return '';
  if (response.status === 503) return 'Configuração do painel incompleta na Vercel.';
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

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    navigate('/admin/login');
  };

  return (
    <>
      <SEO
        title="Painel Admin"
        description="Dashboard privado de leads e conversoes da KL Vistorias."
        url="https://klvistorias.com.br/admin"
        noIndex
      />
      <main className="min-h-screen bg-[#070A0F] px-4 py-6 text-white md:px-8">
        <div className="mx-auto grid max-w-[1440px] gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="rounded-lg border border-white/10 bg-[#0D121C] p-5 xl:sticky xl:top-6 xl:h-[calc(100vh-3rem)]">
            <div className="mb-8">
              <p className="text-[11px] font-black uppercase tracking-[0.28em] text-primary">KL Vistorias</p>
              <h1 className="mt-3 text-3xl font-black leading-none">Admin</h1>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Central de conversao, leads e operacao comercial.
              </p>
            </div>

            <nav className="space-y-2 text-sm">
              {['Visao geral', 'Leads', 'Agendamentos', 'Reviews', 'Catalogo'].map((item, index) => (
                <div
                  key={item}
                  className={`rounded-md px-3 py-3 font-bold ${
                    index === 0 ? 'bg-primary text-white' : 'text-slate-400 hover:bg-white/[0.04] hover:text-white'
                  }`}
                >
                  {item}
                </div>
              ))}
            </nav>

            <div className="mt-8 rounded-md border border-white/10 bg-black/20 p-4">
              <div className="mb-3 flex items-center gap-2 text-sm font-bold text-white">
                <Database className="h-4 w-4 text-primary" />
                Banco conectado
              </div>
              <p className="text-xs leading-5 text-slate-500">
                As tabelas de tracking, leads, reviews, catalogo e agenda estao centralizadas no Neon.
              </p>
            </div>
          </aside>

          <section className="min-w-0">
            <header className="mb-6 flex flex-col gap-4 rounded-lg border border-white/10 bg-[#0D121C] p-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Visao geral</p>
                <h2 className="mt-2 text-3xl font-black md:text-4xl">Painel de conversoes</h2>
                <p className="mt-2 text-sm text-slate-400">
                  Dados reais da landing, prontos para alimentar atendimento, agenda e bot.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
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
                <button
                  onClick={logout}
                  className="flex h-11 items-center gap-2 rounded-md border border-white/10 px-4 text-sm font-bold text-slate-300 transition hover:border-red-400/40 hover:text-red-200"
                >
                  <LogOut className="h-4 w-4" />
                  Sair
                </button>
              </div>
            </header>

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
                  {!isLoading && !data?.topPages?.length && <p className="text-sm text-slate-500">Sem dados ainda.</p>}
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
                  {!isLoading && !data?.sourceBreakdown?.length && <p className="text-sm text-slate-500">Sem dados ainda.</p>}
                </div>
              </div>
            </section>

            <section className="mb-6 rounded-lg border border-white/10 bg-[#111827] p-6">
              <h2 className="mb-5 flex items-center gap-2 text-xl font-black">
                <Users className="h-5 w-5 text-primary" />
                Leads recentes
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[860px] text-left text-sm">
                  <thead className="border-b border-white/10 text-xs uppercase tracking-[0.18em] text-slate-500">
                    <tr>
                      <th className="py-3 pr-4">Data</th>
                      <th className="py-3 pr-4">Nome</th>
                      <th className="py-3 pr-4">Contato</th>
                      <th className="py-3 pr-4">Servico</th>
                      <th className="py-3 pr-4">Veiculo</th>
                      <th className="py-3 pr-4">Origem</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10 text-slate-300">
                    {(data?.recentLeads || []).map((lead) => (
                      <tr key={lead.id}>
                        <td className="py-4 pr-4 text-slate-500">{formatDate(lead.created_at)}</td>
                        <td className="py-4 pr-4 font-bold text-white">{lead.name || '-'}</td>
                        <td className="py-4 pr-4">{lead.phone || lead.email || '-'}</td>
                        <td className="py-4 pr-4">{lead.service || '-'}</td>
                        <td className="py-4 pr-4">{lead.vehicle || '-'}</td>
                        <td className="py-4 pr-4">{lead.source_path || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {!isLoading && !data?.recentLeads?.length && (
                  <p className="py-8 text-sm text-slate-500">Nenhum lead registrado ainda.</p>
                )}
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
                      <strong className="text-sm text-white">{event.event_name}</strong>
                      <span className="text-xs text-slate-500">{formatDate(event.created_at)}</span>
                    </div>
                    <p className="truncate text-xs text-slate-400">{event.path || '/'}</p>
                    <p className="mt-2 text-xs text-slate-500">
                      {event.device_type || 'dispositivo desconhecido'} - {event.utm_source || 'direto'}
                    </p>
                  </div>
                ))}
                {!isLoading && !data?.recentEvents?.length && <p className="text-sm text-slate-500">Sem eventos ainda.</p>}
              </div>
            </section>
          </section>
        </div>
      </main>
    </>
  );
}
