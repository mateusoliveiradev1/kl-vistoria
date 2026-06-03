import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Filter, RefreshCw, Search } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { AdminShell, EmptyState, adminInput, adminInset, adminSecondaryButton, adminSurface } from './adminShared';
import { eventLabel, formatAdminDate } from './adminUtils';

type EventRow = {
  id: number;
  event_name: string;
  path: string | null;
  referrer: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  device_type: string | null;
  metadata_json: Record<string, unknown> | null;
  created_at: string;
};

export default function AdminEventsPage() {
  const navigate = useNavigate();
  const [events, setEvents] = useState<EventRow[]>([]);
  const [days, setDays] = useState(30);
  const [eventName, setEventName] = useState('');
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const query = useMemo(() => {
    const params = new URLSearchParams({
      days: String(days),
      limit: '120',
    });
    if (eventName) params.set('event', eventName);
    if (search.trim()) params.set('search', search.trim());
    return params.toString();
  }, [days, eventName, search]);

  const loadEvents = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/admin/events?${query}`);
      if (response.status === 401) {
        navigate('/admin/login');
        return;
      }

      if (!response.ok) {
        setError('Nao foi possivel carregar os eventos.');
        return;
      }

      const data = (await response.json()) as { events?: EventRow[] };
      setEvents(data.events || []);
    } catch {
      setError('Falha de conexao com a API de eventos.');
    } finally {
      setIsLoading(false);
    }
  }, [navigate, query]);

  useEffect(() => {
    void loadEvents();
  }, [loadEvents]);

  return (
    <>
      <SEO title="Eventos Admin" description="Eventos privados da KL Vistorias." url="https://klvistorias.com.br/admin/eventos" noIndex />
      <AdminShell
        eyebrow="Auditoria"
        title="Eventos"
        description="Historico bruto de conversao para enxergar cliques, popups, paginas e campanhas."
        actions={
          <button onClick={() => void loadEvents()} className={adminSecondaryButton}>
            <RefreshCw className="h-4 w-4" />
            Atualizar
          </button>
        }
      >
        {error && <div className="mb-4 rounded-md border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-100">{error}</div>}

        <section className={`${adminSurface} mb-4 p-4`}>
          <div className="grid gap-3 md:grid-cols-[1fr_180px_220px_auto]">
            <label className="relative block">
              <Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-500" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className={`${adminInput} pl-10`}
                placeholder="Buscar pagina, origem ou campanha"
              />
            </label>
            <label className="relative block">
              <Filter className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-500" />
              <select value={eventName} onChange={(event) => setEventName(event.target.value)} className={`${adminInput} pl-10`}>
                <option className="bg-slate-950" value="">Todos eventos</option>
                <option className="bg-slate-950" value="page_view">Pagina vista</option>
                <option className="bg-slate-950" value="whatsapp_click">Clique WhatsApp</option>
                <option className="bg-slate-950" value="popup_open">Popup aberto</option>
                <option className="bg-slate-950" value="popup_submit">Lead enviado</option>
              </select>
            </label>
            <select value={days} onChange={(event) => setDays(Number(event.target.value))} className={adminInput}>
              <option className="bg-slate-950" value={7}>Ultimos 7 dias</option>
              <option className="bg-slate-950" value={30}>Ultimos 30 dias</option>
              <option className="bg-slate-950" value={90}>Ultimos 90 dias</option>
              <option className="bg-slate-950" value={365}>Ultimo ano</option>
            </select>
            <button onClick={() => void loadEvents()} className={adminSecondaryButton}>
              Aplicar
            </button>
          </div>
        </section>

        <section className={`${adminSurface} p-4 md:p-5`}>
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="flex items-center gap-2 text-xl font-black">
              <Activity className="h-5 w-5 text-[#E8C766]" />
              Eventos recentes
            </h2>
            <span className="rounded-md border border-white/10 px-3 py-1 text-xs font-bold text-slate-400">
              {isLoading ? 'carregando' : `${events.length} registros`}
            </span>
          </div>

          <div className="grid gap-3">
            {events.map((event) => (
              <article key={event.id} className={`${adminInset} grid gap-4 p-4 lg:grid-cols-[180px_minmax(0,1fr)_180px_150px]`}>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">Evento</p>
                  <p className="mt-2 font-black text-white">{eventLabel(event.event_name)}</p>
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">Pagina</p>
                  <p className="mt-2 truncate text-sm text-slate-300">{event.path || '/'}</p>
                  <p className="mt-1 truncate text-xs text-slate-500">{event.referrer || 'sem referencia'}</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">Origem</p>
                  <p className="mt-2 text-sm text-slate-300">{event.utm_source || 'direto'}</p>
                  <p className="mt-1 text-xs text-slate-500">{event.utm_campaign || event.utm_medium || '-'}</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">Quando</p>
                  <p className="mt-2 text-sm text-slate-300">{formatAdminDate(event.created_at)}</p>
                  <p className="mt-1 text-xs text-slate-500">{event.device_type || 'desconhecido'}</p>
                </div>
              </article>
            ))}
          </div>

          {!isLoading && events.length === 0 && (
            <EmptyState title="Nenhum evento encontrado" description="Ajuste os filtros ou aguarde novos acessos da landing." />
          )}
        </section>
      </AdminShell>
    </>
  );
}
