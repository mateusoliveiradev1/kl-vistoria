import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarClock, CheckCircle2, Clock, MessageCircle, Pencil, Plus, RefreshCw, Trash2, XCircle } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { AdminShell, EmptyState, adminInput, adminPrimaryButton, adminSecondaryButton, adminSurface } from './adminShared';
import { appointmentStatusLabel, formatAdminDate } from './adminUtils';

type Lead = {
  id: number;
  name: string | null;
  phone: string | null;
  service: string | null;
  vehicle: string | null;
};

type Appointment = {
  id: number;
  lead_id: number | null;
  scheduled_for: string | null;
  location: string | null;
  status: string | null;
  notes: string | null;
  created_at: string;
  lead_name: string | null;
  lead_phone: string | null;
  lead_service: string | null;
  lead_vehicle: string | null;
};

type AppointmentForm = {
  id: number | null;
  lead_id: string;
  scheduled_for: string;
  location: string;
  status: string;
  notes: string;
};

const emptyForm: AppointmentForm = {
  id: null,
  lead_id: '',
  scheduled_for: '',
  location: '',
  status: 'pending',
  notes: '',
};

function toDateInput(value: string | null) {
  if (!value) return '';
  const date = new Date(value);
  const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return offsetDate.toISOString().slice(0, 16);
}

function phoneHref(phone: string | null) {
  if (!phone) return '';
  return `https://wa.me/${phone.replace(/\D/g, '')}`;
}

export default function AdminAppointmentsPage() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [form, setForm] = useState<AppointmentForm>(emptyForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

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

  const loadAppointments = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const [appointmentsResponse, leadsResponse] = await Promise.all([
        requestJson('/api/admin/appointments'),
        requestJson('/api/admin/leads'),
      ]);

      if (!appointmentsResponse || !leadsResponse) return;
      if (!appointmentsResponse.ok || !leadsResponse.ok) {
        setError('Nao foi possivel carregar a agenda.');
        return;
      }

      const appointmentsData = (await appointmentsResponse.json()) as { appointments?: Appointment[] };
      const leadsData = (await leadsResponse.json()) as { leads?: Lead[] };
      setAppointments(appointmentsData.appointments || []);
      setLeads(leadsData.leads || []);
    } catch {
      setError('Falha de conexao com a API de agendamentos.');
    } finally {
      setIsLoading(false);
    }
  }, [requestJson]);

  useEffect(() => {
    void loadAppointments();
  }, [loadAppointments]);

  const saveAppointment = async () => {
    setIsSaving(true);
    setError('');

    try {
      const response = await requestJson('/api/admin/appointments', {
        method: form.id ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response) return;
      if (!response.ok) {
        setError('Nao foi possivel salvar o agendamento.');
        return;
      }

      const data = (await response.json()) as { appointments?: Appointment[] };
      setAppointments(data.appointments || []);
      setForm(emptyForm);
    } catch {
      setError('Falha ao salvar agendamento.');
    } finally {
      setIsSaving(false);
    }
  };

  const editAppointment = (item: Appointment) => {
    setForm({
      id: item.id,
      lead_id: item.lead_id ? String(item.lead_id) : '',
      scheduled_for: toDateInput(item.scheduled_for),
      location: item.location || '',
      status: item.status || 'pending',
      notes: item.notes || '',
    });
  };

  const deleteAppointment = async (id: number) => {
    if (!window.confirm('Excluir este agendamento?')) return;

    const response = await requestJson('/api/admin/appointments', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    if (response?.ok) {
      const data = (await response.json()) as { appointments?: Appointment[] };
      setAppointments(data.appointments || []);
    }
  };

  const statusCards = [
    { key: 'pending', label: 'Pendentes', icon: Clock, color: '#E8C766' },
    { key: 'confirmed', label: 'Confirmados', icon: CalendarClock, color: '#7DD3C7' },
    { key: 'done', label: 'Concluidos', icon: CheckCircle2, color: '#9DCFBF' },
    { key: 'canceled', label: 'Cancelados', icon: XCircle, color: '#EF9A7A' },
  ].map((item) => ({
    ...item,
    value: appointments.filter((appointment) => (appointment.status || 'pending') === item.key).length,
  }));

  return (
    <>
      <SEO title="Agendamentos Admin" description="Agenda privada da KL Vistorias." url="https://klvistorias.com.br/admin/agendamentos" noIndex />
      <AdminShell
        eyebrow="Operacao"
        title="Agendamentos"
        description="Crie horarios, conecte leads e acompanhe status de atendimento."
        actions={
          <button onClick={() => void loadAppointments()} className={adminSecondaryButton}>
            <RefreshCw className="h-4 w-4" />
            Atualizar
          </button>
        }
      >
        {error && <div className="mb-4 rounded-md border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-100">{error}</div>}

        <section className="mb-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {statusCards.map((item) => (
            <div key={item.key} className="rounded-lg border border-white/10 bg-[#10131A] p-4">
              <div className="mb-4 flex items-center justify-between gap-3">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">{item.label}</p>
                <item.icon className="h-5 w-5" style={{ color: item.color }} />
              </div>
              <p className="text-3xl font-black text-white">{isLoading ? '-' : item.value}</p>
              <p className="mt-2 text-xs text-slate-500">Agenda operacional</p>
            </div>
          ))}
        </section>

        <section className={`${adminSurface} mb-4 p-4 md:p-5`}>
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="flex items-center gap-2 text-xl font-black">
              <Plus className="h-5 w-5 text-[#E8C766]" />
              {form.id ? 'Editar agendamento' : 'Novo agendamento'}
            </h2>
            <p className="text-sm leading-6 text-slate-400">
              Use esta tela para confirmar horarios combinados pelo WhatsApp ou criados a partir de leads.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1fr_1fr_1fr]">
            <label className="block">
              <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Lead</span>
              <select
                value={form.lead_id}
                onChange={(event) => setForm((current) => ({ ...current, lead_id: event.target.value }))}
                className={adminInput}
              >
                <option className="bg-slate-950" value="">Sem lead vinculado</option>
                {leads.map((lead) => (
                  <option className="bg-slate-950" key={lead.id} value={lead.id}>
                    {lead.name || 'Lead sem nome'} - {lead.vehicle || lead.service || lead.phone || lead.id}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Data e hora</span>
              <input
                type="datetime-local"
                value={form.scheduled_for}
                onChange={(event) => setForm((current) => ({ ...current, scheduled_for: event.target.value }))}
                className={adminInput}
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Status</span>
              <select
                value={form.status}
                onChange={(event) => setForm((current) => ({ ...current, status: event.target.value }))}
                className={adminInput}
              >
                <option className="bg-slate-950" value="pending">Pendente</option>
                <option className="bg-slate-950" value="confirmed">Confirmado</option>
                <option className="bg-slate-950" value="done">Concluido</option>
                <option className="bg-slate-950" value="canceled">Cancelado</option>
              </select>
            </label>

            <label className="block lg:col-span-2">
              <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Local</span>
              <input
                value={form.location}
                onChange={(event) => setForm((current) => ({ ...current, location: event.target.value }))}
                className={adminInput}
                placeholder="Endereco ou bairro do atendimento"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Observacao</span>
              <input
                value={form.notes}
                onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))}
                className={adminInput}
                placeholder="Detalhe rapido"
              />
            </label>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={() => void saveAppointment()}
              disabled={isSaving}
              className={adminPrimaryButton}
            >
              {isSaving ? 'Salvando...' : form.id ? 'Salvar alteracoes' : 'Criar agendamento'}
            </button>
            {form.id && (
              <button
                onClick={() => setForm(emptyForm)}
                className={adminSecondaryButton}
              >
                Cancelar edicao
              </button>
            )}
          </div>
        </section>

        <section className={`${adminSurface} p-4 md:p-5`}>
          <h2 className="mb-5 flex items-center gap-2 text-xl font-black">
            <CalendarClock className="h-5 w-5 text-[#E8C766]" />
            Agenda
          </h2>
          <div className="grid gap-3">
            {appointments.map((item) => (
              <div key={item.id} className="rounded-lg border border-white/10 bg-[#070A0F] p-4">
                <div className="grid gap-4 xl:grid-cols-[1fr_1fr_1fr_1fr_auto]">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Quando</p>
                  <p className="mt-2 font-bold text-white">{formatAdminDate(item.scheduled_for)}</p>
                  <p className="mt-1 text-xs text-slate-500">{item.scheduled_for ? 'Horario definido' : 'Sem horario'}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Lead</p>
                  <p className="mt-2 text-slate-300">{item.lead_name || '-'}</p>
                  <p className="mt-1 text-xs text-slate-500">{item.lead_phone || 'sem telefone'}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Servico</p>
                  <p className="mt-2 text-slate-300">{item.lead_service || '-'}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Local</p>
                  <p className="mt-2 text-slate-300">{item.location || '-'}</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="rounded-md bg-[#E8C766]/10 px-3 py-1 text-xs font-bold text-[#E8C766]">
                    {appointmentStatusLabel(item.status || 'pending')}
                  </span>
                  {item.lead_phone && (
                    <a href={phoneHref(item.lead_phone)} target="_blank" rel="noreferrer" className="rounded-md border border-white/10 p-2 text-[#7DD3C7] hover:text-white" aria-label="Abrir WhatsApp">
                      <MessageCircle className="h-4 w-4" />
                    </a>
                  )}
                  <button onClick={() => editAppointment(item)} className="rounded-md border border-white/10 p-2 text-slate-400 hover:text-white" aria-label="Editar">
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button onClick={() => void deleteAppointment(item.id)} className="rounded-md border border-white/10 p-2 text-slate-400 hover:text-red-200" aria-label="Excluir">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                </div>
                {item.notes && (
                  <p className="mt-4 rounded-md border border-white/10 bg-white/[0.02] p-3 text-xs leading-6 text-slate-400">
                    {item.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
          {!isLoading && appointments.length === 0 && (
            <EmptyState title="Nenhum agendamento ainda" description="Use o formulario acima para criar o primeiro horario da agenda." />
          )}
        </section>
      </AdminShell>
    </>
  );
}
