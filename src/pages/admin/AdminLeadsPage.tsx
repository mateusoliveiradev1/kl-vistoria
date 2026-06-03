import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarPlus, ChevronLeft, ChevronRight, MessageCircle, RefreshCw, Save, Search, Star, Users } from 'lucide-react';
import { COMPANY_INFO } from '../../data/company';
import { SEO } from '../../components/SEO';
import {
  AdminDonutChart,
  AdminShell,
  EmptyState,
  adminInput,
  adminInset,
  adminPrimaryButton,
  adminSecondaryButton,
  adminSurface,
} from './adminShared';
import { formatAdminDate, leadStatusLabel } from './adminUtils';

type Lead = {
  id: number;
  name: string | null;
  email: string | null;
  phone: string | null;
  service: string | null;
  city: string | null;
  vehicle: string | null;
  address: string | null;
  urgency: string | null;
  source_path: string | null;
  utm_source: string | null;
  status: string | null;
  notes: string | null;
  created_at: string;
};

type Draft = {
  status: string;
  notes: string;
};

type Pagination = {
  page: number;
  limit: number;
  total: number;
  pages: number;
};

type StatusCount = {
  status: string | null;
  total: number;
};

const statuses = ['new', 'contacted', 'scheduled', 'won', 'lost'];

function leadContext(lead: Lead) {
  return {
    name: lead.name || 'tudo bem',
    service: lead.service || 'vistoria',
    vehicle: lead.vehicle || 'seu veiculo',
    location: lead.address || lead.city || '',
  };
}

function whatsappMessageForStatus(lead: Lead, status: string, googleReviewUrl: string) {
  const context = leadContext(lead);

  if (status === 'scheduled') {
    return `Ola, ${context.name}. Aqui e da KL Vistorias. Estou passando para confirmar o agendamento da ${context.service} para ${context.vehicle}${context.location ? ` em ${context.location}` : ''}. Podemos confirmar esse horario?`;
  }

  if (status === 'won') {
    return `Ola, ${context.name}. Aqui e da KL Vistorias. Obrigado por confiar na nossa vistoria para ${context.vehicle}. Se puder, sua avaliacao ajuda outros clientes a comprarem com mais seguranca.\n\nAvalie a KL Vistorias no Google: ${googleReviewUrl}`;
  }

  if (status === 'lost') {
    return `Ola, ${context.name}. Aqui e da KL Vistorias. Vi que o atendimento sobre ${context.vehicle} ficou em aberto. Ainda posso te ajudar com alguma duvida ou nova vistoria?`;
  }

  if (status === 'contacted') {
    return `Ola, ${context.name}. Aqui e da KL Vistorias. Estou retornando sobre ${context.service} para ${context.vehicle}. Conseguiu avancar na negociacao ou prefere que eu te oriente no proximo passo?`;
  }

  return `Ola, ${context.name}. Aqui e da KL Vistorias. Recebemos seu pedido sobre ${context.service} para ${context.vehicle}. Posso te ajudar com o agendamento?`;
}

function whatsappActionLabel(status: string) {
  const labels: Record<string, string> = {
    new: 'Primeiro contato',
    contacted: 'Retomar conversa',
    scheduled: 'Confirmar agenda',
    won: 'Pedir review',
    lost: 'Reativar lead',
  };

  return labels[status] || 'Chamar';
}

function whatsappHref(lead: Lead, status: string, googleReviewUrl: string) {
  const phone = lead.phone?.replace(/\D/g, '') || COMPANY_INFO.contact.phone.replace(/\D/g, '');
  const message = whatsappMessageForStatus(lead, status, googleReviewUrl);
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export default function AdminLeadsPage() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [drafts, setDrafts] = useState<Record<number, Draft>>({});
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [days, setDays] = useState(365);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 30, total: 0, pages: 1 });
  const [serverStatusCounts, setServerStatusCounts] = useState<StatusCount[]>([]);
  const [googleReviewUrl, setGoogleReviewUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingId, setIsSavingId] = useState<number | null>(null);
  const [error, setError] = useState('');

  const query = useMemo(() => {
    const params = new URLSearchParams({ days: String(days), page: String(page), limit: '30' });
    if (status) params.set('status', status);
    if (search.trim()) params.set('search', search.trim());
    return params.toString();
  }, [days, page, search, status]);

  const requestJson = useCallback(
    async (url: string, options?: RequestInit) => {
      const response = await fetch(url, options);
      if (response.status === 401) {
        navigate('/admin/login');
        return null;
      }
      return response;
    },
    [navigate]
  );

  const loadLeads = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const [response, settingsResponse] = await Promise.all([
        requestJson(`/api/admin/leads?${query}`),
        requestJson('/api/admin/settings'),
      ]);
      if (!response || !settingsResponse) return;

      if (!response.ok || !settingsResponse.ok) {
        setError('Nao foi possivel carregar os leads.');
        return;
      }

      const data = (await response.json()) as {
        leads?: Lead[];
        pagination?: Pagination;
        statusCounts?: StatusCount[];
      };
      const nextLeads = data.leads || [];
      const settingsData = (await settingsResponse.json()) as {
        settings?: { google_review_url?: string };
      };
      setLeads(nextLeads);
      setPagination(data.pagination || { page: 1, limit: 30, total: nextLeads.length, pages: 1 });
      setServerStatusCounts(data.statusCounts || []);
      setGoogleReviewUrl(settingsData.settings?.google_review_url || '');
      setDrafts(
        Object.fromEntries(
          nextLeads.map((lead) => [
            lead.id,
            {
              status: lead.status || 'new',
              notes: lead.notes || '',
            },
          ])
        )
      );
    } catch {
      setError('Falha de conexao com a API de leads.');
    } finally {
      setIsLoading(false);
    }
  }, [query, requestJson]);

  useEffect(() => {
    void loadLeads();
  }, [loadLeads]);

  const saveLead = async (lead: Lead) => {
    setIsSavingId(lead.id);
    setError('');

    try {
      const draft = drafts[lead.id] || { status: 'new', notes: '' };
      const response = await requestJson('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: lead.id, ...draft }),
      });

      if (!response?.ok) {
        setError('Nao foi possivel salvar o lead.');
        return;
      }

      await loadLeads();
    } catch {
      setError('Falha ao salvar lead.');
    } finally {
      setIsSavingId(null);
    }
  };

  const createAppointment = async (lead: Lead) => {
    setIsSavingId(lead.id);
    setError('');

    try {
      const response = await requestJson('/api/admin/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lead_id: String(lead.id),
          location: lead.address || lead.city || '',
          status: 'pending',
          notes: `Criado a partir do lead #${lead.id}. Urgencia: ${lead.urgency || '-'}`,
        }),
      });

      if (!response?.ok) {
        setError('Nao foi possivel criar o agendamento.');
        return;
      }

      await requestJson('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: lead.id, status: 'scheduled', notes: drafts[lead.id]?.notes || lead.notes || '' }),
      });
      navigate('/admin/agendamentos');
    } catch {
      setError('Falha ao criar agendamento.');
    } finally {
      setIsSavingId(null);
    }
  };

  const statusCountMap = Object.fromEntries(serverStatusCounts.map((item) => [item.status || 'new', Number(item.total || 0)]));
  const openLeads = Number(statusCountMap.new || 0);
  const statusCounts = statuses.map((item) => ({
    status: item,
    label: leadStatusLabel(item),
    value: Number(statusCountMap[item] || 0),
  }));
  const groupedLeads = Object.fromEntries(statuses.map((item) => [item, leads.filter((lead) => (lead.status || 'new') === item)]));

  return (
    <>
      <SEO title="Leads Admin" description="Leads privados da KL Vistorias." url="https://klvistorias.com.br/admin/leads" noIndex />
      <AdminShell
        eyebrow="Comercial"
        title="Leads"
        description="Fila de contatos enviados pela landing, com status, retorno por WhatsApp e conversao em agenda."
        actions={
          <button onClick={() => void loadLeads()} className={adminSecondaryButton}>
            <RefreshCw className="h-4 w-4" />
            Atualizar
          </button>
        }
      >
        {error && <div className="mb-4 rounded-md border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-100">{error}</div>}

        <section className={`${adminSurface} mb-4 p-4`}>
          <div className="grid gap-3 lg:grid-cols-[1fr_180px_190px_auto]">
            <label className="relative block">
              <Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-500" />
              <input
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
                className={`${adminInput} pl-10`}
                placeholder="Buscar por nome, telefone, veiculo ou servico"
              />
            </label>
            <select
              value={status}
              onChange={(event) => {
                setStatus(event.target.value);
                setPage(1);
              }}
              className={adminInput}
            >
              <option className="bg-slate-950" value="">Todos status</option>
              {statuses.map((item) => (
                <option className="bg-slate-950" key={item} value={item}>{leadStatusLabel(item)}</option>
              ))}
            </select>
            <select
              value={days}
              onChange={(event) => {
                setDays(Number(event.target.value));
                setPage(1);
              }}
              className={adminInput}
            >
              <option className="bg-slate-950" value={7}>Ultimos 7 dias</option>
              <option className="bg-slate-950" value={30}>Ultimos 30 dias</option>
              <option className="bg-slate-950" value={90}>Ultimos 90 dias</option>
              <option className="bg-slate-950" value={365}>Ultimo ano</option>
            </select>
            <button onClick={() => void loadLeads()} className={adminSecondaryButton}>Aplicar</button>
          </div>
        </section>

        <section className={`${adminSurface} mb-4 p-4 md:p-5`}>
          <div className="grid gap-5 xl:grid-cols-[360px_minmax(0,1fr)]">
            <AdminDonutChart
              title="Distribuicao do CRM"
              total={statusCounts.reduce((total, item) => total + item.value, 0)}
              centerLabel="leads"
              segments={[
                { label: 'Novo', value: statusCounts[0].value, color: '#E8C766' },
                { label: 'Em contato', value: statusCounts[1].value, color: '#D7B451' },
                { label: 'Agendado', value: statusCounts[2].value, color: '#7DD3C7' },
                { label: 'Fechado', value: statusCounts[3].value, color: '#9DCFBF' },
                { label: 'Perdido', value: statusCounts[4].value, color: '#EF9A7A' },
              ]}
            />

            <div className="grid gap-3 sm:grid-cols-5">
              {statusCounts.map((item) => (
                <div key={item.status} className="rounded-lg border border-white/10 bg-[#070A0F] p-3">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">{item.label}</p>
                  <p className="mt-3 text-2xl font-black text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={`${adminSurface} mb-4 p-4 md:p-5`}>
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="flex items-center gap-2 text-xl font-black">
              <Users className="h-5 w-5 text-[#E8C766]" />
              CRM por etapa
            </h2>
            <span className="rounded-md border border-white/10 px-3 py-1 text-xs font-bold text-slate-400">
              Cards da pagina atual
            </span>
          </div>

          <div className="grid gap-3 xl:grid-cols-5">
            {statuses.map((item) => (
              <div key={item} className="rounded-lg border border-white/10 bg-[#070A0F] p-3">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">{leadStatusLabel(item)}</p>
                  <span className="rounded-md bg-white/5 px-2 py-1 text-xs font-bold text-white">{groupedLeads[item].length}</span>
                </div>
                <div className="custom-scrollbar max-h-[420px] space-y-2 overflow-y-auto pr-1">
                  {groupedLeads[item].map((lead) => (
                    <article key={lead.id} className="rounded-md border border-white/10 bg-[#10131A] p-3">
                      <p className="truncate text-sm font-black text-white">{lead.name || 'Lead sem nome'}</p>
                      <p className="mt-1 truncate text-xs text-slate-400">{lead.vehicle || lead.service || lead.phone || '-'}</p>
                      <p className="mt-2 text-[11px] text-slate-500">{formatAdminDate(lead.created_at)}</p>
                    </article>
                  ))}
                  {groupedLeads[item].length === 0 && (
                    <p className="rounded-md border border-dashed border-white/10 p-3 text-xs leading-5 text-slate-500">
                      Nenhum lead nesta etapa.
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={`${adminSurface} p-4 md:p-5`}>
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="flex items-center gap-2 text-xl font-black">
              <Users className="h-5 w-5 text-[#E8C766]" />
              Pipeline comercial
            </h2>
            <div className="flex flex-wrap gap-2 text-xs font-bold">
              <span className="rounded-md border border-white/10 px-3 py-1 text-slate-400">{pagination.total} leads</span>
              <span className="rounded-md border border-[#7DD3C7]/30 bg-[#7DD3C7]/10 px-3 py-1 text-[#7DD3C7]">{openLeads} novos</span>
            </div>
          </div>

          <div className="grid gap-3">
            {leads.map((lead) => (
              <article key={lead.id} className={`${adminInset} p-4`}>
                <div className="grid gap-4 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_260px]">
                  {(() => {
                    const currentStatus = drafts[lead.id]?.status || lead.status || 'new';
                    return (
                      <>
                  <div className="min-w-0">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <strong className="text-lg text-white">{lead.name || 'Lead sem nome'}</strong>
                      <span className="rounded-md bg-[#E8C766]/10 px-2 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-[#E8C766]">
                        {leadStatusLabel(currentStatus)}
                      </span>
                    </div>
                    <div className="grid gap-2 text-sm text-slate-300 sm:grid-cols-2">
                      <p><span className="text-slate-500">Servico:</span> {lead.service || '-'}</p>
                      <p><span className="text-slate-500">Veiculo:</span> {lead.vehicle || '-'}</p>
                      <p><span className="text-slate-500">Urgencia:</span> {lead.urgency || '-'}</p>
                      <p><span className="text-slate-500">Origem:</span> {lead.source_path || lead.utm_source || 'direto'}</p>
                    </div>
                    <p className="mt-3 text-xs text-slate-500">{formatAdminDate(lead.created_at)} · {lead.email || 'sem email'}</p>
                  </div>

                  <div className="grid gap-3">
                    <select
                      value={drafts[lead.id]?.status || 'new'}
                      onChange={(event) => setDrafts((current) => ({ ...current, [lead.id]: { ...(current[lead.id] || { notes: '' }), status: event.target.value } }))}
                      className={adminInput}
                    >
                      {statuses.map((item) => (
                        <option className="bg-slate-950" key={item} value={item}>{leadStatusLabel(item)}</option>
                      ))}
                    </select>
                    <textarea
                      value={drafts[lead.id]?.notes || ''}
                      onChange={(event) => setDrafts((current) => ({ ...current, [lead.id]: { ...(current[lead.id] || { status: 'new' }), notes: event.target.value } }))}
                      className={`${adminInput} min-h-20 py-3`}
                      placeholder="Nota interna do atendimento"
                    />
                  </div>

                  <div className="grid content-start gap-2 sm:grid-cols-3 xl:grid-cols-1">
                    {currentStatus === 'won' && !googleReviewUrl ? (
                      <button onClick={() => navigate('/admin/reviews')} className={adminPrimaryButton}>
                        <Star className="h-4 w-4" />
                        Configurar link de review
                      </button>
                    ) : (
                      <a href={whatsappHref(lead, currentStatus, googleReviewUrl)} target="_blank" rel="noreferrer" className={adminPrimaryButton}>
                        <MessageCircle className="h-4 w-4" />
                        {whatsappActionLabel(currentStatus)}
                      </a>
                    )}
                    <button onClick={() => void createAppointment(lead)} disabled={isSavingId === lead.id} className={adminSecondaryButton}>
                      <CalendarPlus className="h-4 w-4" />
                      Agendar
                    </button>
                    <button onClick={() => void saveLead(lead)} disabled={isSavingId === lead.id} className={adminSecondaryButton}>
                      <Save className="h-4 w-4" />
                      Salvar
                    </button>
                  </div>
                      </>
                    );
                  })()}
                </div>
              </article>
            ))}
          </div>

          {!isLoading && leads.length === 0 && (
            <EmptyState title="Nenhum lead encontrado" description="Quando um visitante enviar o popup ou fluxo de WhatsApp, o lead aparece aqui com origem e contexto." />
          )}

          {!isLoading && pagination.total > 0 && (
            <div className="mt-5 flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-slate-500">
                Pagina {pagination.page} de {pagination.pages} · {pagination.total} leads encontrados
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage((current) => Math.max(current - 1, 1))}
                  disabled={pagination.page <= 1}
                  className={adminSecondaryButton}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Anterior
                </button>
                <button
                  onClick={() => setPage((current) => Math.min(current + 1, pagination.pages))}
                  disabled={pagination.page >= pagination.pages}
                  className={adminSecondaryButton}
                >
                  Proxima
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </section>
      </AdminShell>
    </>
  );
}
