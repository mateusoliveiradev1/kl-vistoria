import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarClock, RefreshCw } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { AdminShell, EmptyState } from './adminShared';
import { formatAdminDate } from './adminUtils';

type Appointment = {
  id: number;
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

export default function AdminAppointmentsPage() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadAppointments = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/appointments');
      if (response.status === 401) {
        navigate('/admin/login');
        return;
      }

      if (!response.ok) {
        setError('Nao foi possivel carregar os agendamentos.');
        return;
      }

      const data = (await response.json()) as { appointments?: Appointment[] };
      setAppointments(data.appointments || []);
    } catch {
      setError('Falha de conexao com a API de agendamentos.');
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    void loadAppointments();
  }, [loadAppointments]);

  return (
    <>
      <SEO title="Agendamentos Admin" description="Agenda privada da KL Vistorias." url="https://klvistorias.com.br/admin/agendamentos" noIndex />
      <AdminShell
        eyebrow="Operacao"
        title="Agendamentos"
        description="Agenda preparada para conectar leads, bot e atendimento humano."
        actions={
          <button onClick={() => void loadAppointments()} className="flex h-11 items-center gap-2 rounded-md border border-white/10 px-4 text-sm font-bold text-slate-300 transition hover:border-primary/40 hover:text-white">
            <RefreshCw className="h-4 w-4" />
            Atualizar
          </button>
        }
      >
        {error && <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 p-5 text-sm text-red-100">{error}</div>}

        <section className="rounded-lg border border-white/10 bg-[#111827] p-6">
          <h2 className="mb-5 flex items-center gap-2 text-xl font-black">
            <CalendarClock className="h-5 w-5 text-primary" />
            Agenda
          </h2>
          <div className="grid gap-3">
            {appointments.map((item) => (
              <div key={item.id} className="grid gap-4 rounded-md border border-white/10 bg-black/20 p-4 md:grid-cols-[1fr_1fr_1fr_auto]">
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
                <span className="self-start rounded-md bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                  {item.status || 'pending'}
                </span>
              </div>
            ))}
          </div>
          {!isLoading && appointments.length === 0 && (
            <EmptyState title="Nenhum agendamento ainda" description="A tabela ja existe. Na proxima etapa, leads poderao ser convertidos em agendamentos por aqui." />
          )}
        </section>
      </AdminShell>
    </>
  );
}
