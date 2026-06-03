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
import {
  AdminDonutChart,
  AdminMetric,
  AdminShell,
  EmptyState,
  adminInset,
  adminSecondaryButton,
  adminSurface,
} from './adminShared';
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

function FunnelChart({ kpis }: { kpis: Kpis }) {
  const stages = [
    { label: 'Views', value: kpis.pageViews, color: '#E8C766' },
    { label: 'WhatsApp', value: kpis.whatsappClicks, color: '#D7B451' },
    { label: 'Popup', value: kpis.popupOpens, color: '#9DCFBF' },
    { label: 'Leads', value: kpis.leads, color: '#7DD3C7' },
  ];
  const max = Math.max(...stages.map((stage) => stage.value), 1);

  return (
    <div className="space-y-4">
      {stages.map((stage) => (
        <div key={stage.label}>
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="font-bold uppercase tracking-[0.18em] text-slate-500">{stage.label}</span>
            <strong className="text-white">{stage.value}</strong>
          </div>
      <div className="h-8 rounded-md border border-white/10 bg-[#070A0F] p-1">
            <div
              className="flex h-full min-w-8 items-center justify-end rounded-[4px] px-2 text-xs font-black text-[#070A0F] transition-all"
              style={{ width: `${Math.max((stage.value / max) * 100, 9)}%`, backgroundColor: stage.color }}
            >
              {stage.value > 0 ? `${Math.round((stage.value / max) * 100)}%` : ''}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Bars({ rows, labelKey }: { rows: RowTotal[]; labelKey: 'path' | 'source' }) {
  const max = Math.max(...rows.map((row) => row.total), 1);

  return (
    <div className="space-y-4">
      {rows.map((row) => {
        const label = row[labelKey] || (labelKey === 'path' ? '/' : 'direto');
        return (
          <div key={label}>
            <div className="mb-2 flex items-center justify-between gap-4">
              <span className="truncate text-sm text-slate-300">{label}</span>
              <strong className="text-[#E8C766]">{row.total}</strong>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-[#070A0F]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#E8C766] to-[#7DD3C7]"
                style={{ width: `${Math.max((row.total / max) * 100, 6)}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
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

  const cards = [
    { label: 'Visualizacoes', value: kpis.pageViews, icon: BarChart3, detail: 'trafego medido' },
    { label: 'WhatsApp', value: kpis.whatsappClicks, icon: MessageCircle, detail: 'cliques diretos' },
    { label: 'Popup aberto', value: kpis.popupOpens, icon: MousePointerClick, detail: 'intencao de contato' },
    { label: 'Leads', value: kpis.leads, icon: Users, detail: 'formularios enviados' },
    { label: 'Conversao', value: `${kpis.conversionRate}%`, icon: Activity, detail: 'lead / page view' },
  ];

  const operationalModules = [
    { label: 'Leads abertos', value: modules.open_leads, icon: Users, copy: 'Fila comercial para retorno.' },
    { label: 'Agendamentos', value: modules.appointments, icon: CalendarClock, copy: 'Horarios criados no painel.' },
    { label: 'Reviews', value: modules.reviews, icon: Star, copy: 'Base de reputacao.' },
    { label: 'Catalogo', value: modules.catalog_items, icon: BookOpen, copy: 'Servicos para landing e bot.' },
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
        description="Acompanhe o que virou acesso, clique, lead e oportunidade comercial."
        actions={
          <>
            <label className="flex h-11 items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-3 text-sm text-slate-300">
              <Filter className="h-4 w-4 text-[#E8C766]" />
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
            <button onClick={() => void loadSummary()} className={adminSecondaryButton}>
              <RefreshCw className="h-4 w-4" />
              Atualizar
            </button>
          </>
        }
      >
        {data?.disabled && (
          <div className="mb-4 rounded-md border border-amber-400/30 bg-amber-400/10 p-4 text-sm text-amber-100">
            Banco ainda nao configurado. Defina `DATABASE_URL`, `ADMIN_PASSWORD` e `ADMIN_SESSION_SECRET` na Vercel.
          </div>
        )}

        {error && (
          <div className="mb-4 flex items-start gap-3 rounded-md border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-100">
            <CircleAlert className="mt-0.5 h-5 w-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <section className="mb-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {cards.map((card) => (
            <AdminMetric
              key={card.label}
              label={card.label}
              value={isLoading ? '-' : card.value}
              icon={card.icon}
              detail={card.detail}
            />
          ))}
        </section>

        <section className="mb-4 grid gap-4 xl:grid-cols-[0.92fr_1.08fr]">
          <div className={`${adminSurface} p-4 md:p-5`}>
            <h2 className="mb-5 flex items-center gap-2 text-xl font-black">
              <Activity className="h-5 w-5 text-[#E8C766]" />
              Funil de conversao
            </h2>
            <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] xl:grid-cols-1 2xl:grid-cols-[1fr_0.9fr]">
              <AdminDonutChart
                title="Distribuicao dos sinais"
                total={kpis.pageViews + kpis.whatsappClicks + kpis.popupOpens + kpis.leads}
                centerLabel="eventos"
                segments={[
                  { label: 'Visualizacoes', value: kpis.pageViews, color: '#E8C766' },
                  { label: 'WhatsApp', value: kpis.whatsappClicks, color: '#D7B451' },
                  { label: 'Popup aberto', value: kpis.popupOpens, color: '#9DCFBF' },
                  { label: 'Leads', value: kpis.leads, color: '#7DD3C7' },
                ]}
              />
              <FunnelChart kpis={kpis} />
            </div>
          </div>

          <div className={`${adminSurface} p-4 md:p-5`}>
            <h2 className="mb-5 flex items-center gap-2 text-xl font-black">
              <BarChart3 className="h-5 w-5 text-[#E8C766]" />
              Paginas que geram eventos
            </h2>
            {(data?.topPages || []).length > 0 ? (
              <Bars rows={data?.topPages || []} labelKey="path" />
            ) : (
              !isLoading && <EmptyState title="Sem paginas medidas" description="Os dados aparecem aqui quando visitantes acessam a landing." />
            )}
          </div>
        </section>

        <section className="mb-4 grid gap-4 xl:grid-cols-[1fr_1fr]">
          <div className={`${adminSurface} p-4 md:p-5`}>
            <h2 className="mb-5 flex items-center gap-2 text-xl font-black">
              <Activity className="h-5 w-5 text-[#7DD3C7]" />
              Origem do trafego
            </h2>
            {(data?.sourceBreakdown || []).length > 0 ? (
              <Bars rows={data?.sourceBreakdown || []} labelKey="source" />
            ) : (
              !isLoading && <EmptyState title="Sem origem registrada" description="Campanhas com UTM e acessos diretos aparecem nesta area." />
            )}
          </div>

          <div className={`${adminSurface} p-4 md:p-5`}>
            <h2 className="mb-5 flex items-center gap-2 text-xl font-black">
              <BookOpen className="h-5 w-5 text-[#7DD3C7]" />
              Operacao
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {operationalModules.map((module) => (
                <div key={module.label} className={adminInset + ' p-4'}>
                  <div className="mb-4 flex items-center gap-3">
                    <module.icon className="h-5 w-5 text-[#E8C766]" />
                    <h3 className="font-black">{module.label}</h3>
                  </div>
                  <p className="text-3xl font-black">{isLoading ? '-' : module.value}</p>
                  <p className="mt-2 text-xs leading-5 text-slate-500">{module.copy}</p>
                </div>
              ))}
            </div>
            <div className="mt-5">
              <AdminDonutChart
                title="Base operacional"
                total={modules.open_leads + modules.appointments + modules.reviews + modules.catalog_items}
                centerLabel="itens"
                segments={[
                  { label: 'Leads abertos', value: modules.open_leads, color: '#E8C766' },
                  { label: 'Agenda', value: modules.appointments, color: '#7DD3C7' },
                  { label: 'Reviews', value: modules.reviews, color: '#D7B451' },
                  { label: 'Catalogo', value: modules.catalog_items, color: '#9DCFBF' },
                ]}
              />
            </div>
          </div>
        </section>

        <section className={`${adminSurface} p-4 md:p-5`}>
          <h2 className="mb-5 flex items-center gap-2 text-xl font-black">
            <CalendarClock className="h-5 w-5 text-[#E8C766]" />
            Eventos recentes
          </h2>
          <div className="grid gap-3 md:grid-cols-2">
            {(data?.recentEvents || []).map((event) => (
              <div key={event.id} className={`${adminInset} p-4`}>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <strong className="text-sm text-white">{eventLabel(event.event_name)}</strong>
                  <span className="text-xs text-slate-500">{formatAdminDate(event.created_at)}</span>
                </div>
                <p className="truncate text-xs text-slate-400">{event.path || '/'}</p>
                <p className="mt-2 text-xs text-slate-500">
                  {event.device_type || 'dispositivo desconhecido'} · {event.utm_source || 'direto'}
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
