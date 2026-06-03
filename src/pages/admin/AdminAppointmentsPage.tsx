import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarClock, Pencil, Plus, RefreshCw, Trash2 } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { AdminShell, EmptyState } from './adminShared';
import { formatAdminDate } from './adminUtils';

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

  return (
    <>
      <SEO title="Agendamentos Admin" description="Agenda privada da KL Vistorias." url="https://klvistorias.com.br/admin/agendamentos" noIndex />
      <AdminShell
        eyebrow="Operacao"
        title="Agendamentos"
        description="Crie horarios, conecte leads e acompanhe status de atendimento."
        actions={
          <button onClick={() => void loadAppointments()} className="flex h-11 items-center gap-2 rounded-md border border-white/10 px-4 text-sm font-bold text-slate-300 transition hover:border-primary/40 hover:text-white">
            <RefreshCw className="h-4 w-4" />
            Atualizar
          </button>
        }
      >
        {error && <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 p-5 text-sm text-red-100">{error}</div>}

        <section className="mb-6 rounded-lg border border-white/10 bg-[#111827] p-6">
          <h2 className="mb-5 flex items-center gap-2 text-xl font-black">
            <Plus className="h-5 w-5 text-primary" />
            {form.id ? 'Editar agendamento' : 'Novo agendamento'}
          </h2>

          <div className="grid gap-4 lg:grid-cols-[1fr_1fr_1fr]">
            <label className="block">
              <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Lead</span>
              <select
                value={form.lead_id}
                onChange={(event) => setForm((current) => ({ ...current, lead_id: event.target.value }))}
                className="h-12 w-full rounded-md border border-white/10 bg-black/30 px-4 text-sm text-white outline-none focus:border-primary"
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
                className="h-12 w-full rounded-md border border-white/10 bg-black/30 px-4 text-sm text-white outline-none focus:border-primary"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Status</span>
              <select
                value={form.status}
                onChange={(event) => setForm((current) => ({ ...current, status: event.target.value }))}
                className="h-12 w-full rounded-md border border-white/10 bg-black/30 px-4 text-sm text-white outline-none focus:border-primary"
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
                className="h-12 w-full rounded-md border border-white/10 bg-black/30 px-4 text-sm text-white outline-none focus:border-primary"
                placeholder="Endereco ou bairro do atendimento"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Observacao</span>
              <input
                value={form.notes}
                onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))}
                className="h-12 w-full rounded-md border border-white/10 bg-black/30 px-4 text-sm text-white outline-none focus:border-primary"
                placeholder="Detalhe rapido"
              />
            </label>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={() => void saveAppointment()}
              disabled={isSaving}
              className="rounded-md bg-primary px-5 py-3 text-sm font-black text-white transition hover:bg-blue-700 disabled:opacity-60"
            >
              {isSaving ? 'Salvando...' : form.id ? 'Salvar alteracoes' : 'Criar agendamento'}
            </button>
            {form.id && (
              <button
                onClick={() => setForm(emptyForm)}
                className="rounded-md border border-white/10 px-5 py-3 text-sm font-bold text-slate-300 transition hover:text-white"
              >
                Cancelar edicao
              </button>
            )}
          </div>
        </section>

        <section className="rounded-lg border border-white/10 bg-[#111827] p-6">
          <h2 className="mb-5 flex items-center gap-2 text-xl font-black">
            <CalendarClock className="h-5 w-5 text-primary" />
            Agenda
          </h2>
          <div className="grid gap-3">
            {appointments.map((item) => (
              <div key={item.id} className="grid gap-4 rounded-md border border-white/10 bg-black/20 p-4 xl:grid-cols-[1fr_1fr_1fr_1fr_auto]">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Quando</p>
                  <p className="mt-2 font-bold text-white">{formatAdminDate(item.scheduled_for)}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Lead</p>
                  <p className="mt-2 text-slate-300">{item.lead_name || '-'}</p>
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
                  <span className="rounded-md bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                    {item.status || 'pending'}
                  </span>
                  <button onClick={() => editAppointment(item)} className="rounded-md border border-white/10 p-2 text-slate-400 hover:text-white" aria-label="Editar">
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button onClick={() => void deleteAppointment(item.id)} className="rounded-md border border-white/10 p-2 text-slate-400 hover:text-red-200" aria-label="Excluir">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
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

