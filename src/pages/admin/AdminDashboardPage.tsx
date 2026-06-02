import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Activity,
  CalendarClock,
  ExternalLink,
  Eye,
  Filter,
  LogOut,
  MessageCircle,
  MousePointerClick,
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
};

const emptyKpis: Kpis = {
  pageViews: 0,
  whatsappClicks: 0,
  popupOpens: 0,
  popupSubmits: 0,
  leads: 0,
  conversionRate: 0,
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [days, setDays] = useState(30);
  const [data, setData] = useState<SummaryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isCurrent = true;

    async function loadSummary() {
      setIsLoading(true);
      setError('');

      try {
        const response = await fetch(`/api/admin/summary?days=${days}`);

        if (response.status === 401) {
          navigate('/admin/login');
          return;
        }

        if (!response.ok) {
          setError('Nao foi possivel carregar os dados do painel.');
          return;
        }

        const result = (await response.json()) as SummaryResponse;
        if (isCurrent) setData(result);
      } catch {
        if (isCurrent) setError('Falha de conexao com o painel.');
      } finally {
        if (isCurrent) setIsLoading(false);
      }
    }

    void loadSummary();

    return () => {
      isCurrent = false;
    };
  }, [days, navigate]);

  const kpis = data?.kpis || emptyKpis;

  const cards = useMemo(
    () => [
      { label: 'Visualizacoes', value: kpis.pageViews, icon: Eye },
      { label: 'Cliques no WhatsApp', value: kpis.whatsappClicks, icon: MessageCircle },
      { label: 'Popup aberto', value: kpis.popupOpens, icon: MousePointerClick },
      { label: 'Leads enviados', value: kpis.leads, icon: Users },
      { label: 'Conversao', value: `${kpis.conversionRate}%`, icon: Activity },
    ],
    [kpis]
  );

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
      <main className="min-h-screen bg-[#080B10] px-4 py-8 text-white md:px-8">
        <div className="mx-auto max-w-7xl">
          <header className="mb-8 flex flex-col gap-5 border-b border-white/10 pb-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-primary">KL Vistorias</p>
              <h1 className="text-4xl font-black">Painel de conversoes</h1>
              <p className="mt-2 text-sm text-slate-400">
                Leads, cliques e origem das conversoes da landing page.
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
              Banco ainda nao configurado. Defina `DATABASE_URL`, `ADMIN_PASSWORD` e `ADMIN_SESSION_SECRET`
              na Vercel para ativar a coleta real.
            </div>
          )}

          {error && (
            <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 p-5 text-sm text-red-100">
              {error}
            </div>
          )}

          <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {cards.map((card) => (
              <div key={card.label} className="rounded-lg border border-white/10 bg-[#111827] p-5">
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                    {card.label}
                  </span>
                  <card.icon className="h-5 w-5 text-primary" />
                </div>
                <p className="text-3xl font-black">{isLoading ? '-' : card.value}</p>
              </div>
            ))}
          </section>

          <section className="mb-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-lg border border-white/10 bg-[#111827] p-6">
              <h2 className="mb-5 flex items-center gap-2 text-xl font-black">
                <ExternalLink className="h-5 w-5 text-primary" />
                Paginas que mais geram eventos
              </h2>
              <div className="space-y-3">
                {(data?.topPages || []).map((row) => (
                  <div key={row.path} className="flex items-center justify-between gap-4 rounded-md bg-black/20 px-4 py-3">
                    <span className="truncate text-sm text-slate-300">{row.path}</span>
                    <strong className="text-primary">{row.total}</strong>
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

          <section className="mb-8 rounded-lg border border-white/10 bg-[#111827] p-6">
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
                    {event.device_type || 'dispositivo desconhecido'} · {event.utm_source || 'direto'}
                  </p>
                </div>
              ))}
              {!isLoading && !data?.recentEvents?.length && <p className="text-sm text-slate-500">Sem eventos ainda.</p>}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
