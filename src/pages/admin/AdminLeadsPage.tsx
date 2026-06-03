import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, RefreshCw, Users } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { AdminShell, EmptyState } from './adminShared';
import { formatAdminDate } from './adminUtils';

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
  created_at: string;
};

export default function AdminLeadsPage() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadLeads = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/leads');
      if (response.status === 401) {
        navigate('/admin/login');
        return;
      }

      if (!response.ok) {
        setError('Nao foi possivel carregar os leads.');
        return;
      }

      const data = (await response.json()) as { leads?: Lead[] };
      setLeads(data.leads || []);
    } catch {
      setError('Falha de conexao com a API de leads.');
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    void loadLeads();
  }, [loadLeads]);

  return (
    <>
      <SEO title="Leads Admin" description="Leads privados da KL Vistorias." url="https://klvistorias.com.br/admin/leads" noIndex />
      <AdminShell
        eyebrow="Comercial"
        title="Leads"
        description="Contatos enviados pela landing e prontos para retorno."
        actions={
          <button
            onClick={() => void loadLeads()}
            className="flex h-11 items-center gap-2 rounded-md border border-white/10 px-4 text-sm font-bold text-slate-300 transition hover:border-primary/40 hover:text-white"
          >
            <RefreshCw className="h-4 w-4" />
            Atualizar
          </button>
        }
      >
        {error && <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 p-5 text-sm text-red-100">{error}</div>}

        <section className="rounded-lg border border-white/10 bg-[#111827] p-6">
          <h2 className="mb-5 flex items-center gap-2 text-xl font-black">
            <Users className="h-5 w-5 text-primary" />
            Ultimos leads
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] text-left text-sm">
              <thead className="border-b border-white/10 text-xs uppercase tracking-[0.18em] text-slate-500">
                <tr>
                  <th className="py-3 pr-4">Data</th>
                  <th className="py-3 pr-4">Nome</th>
                  <th className="py-3 pr-4">Contato</th>
                  <th className="py-3 pr-4">Servico</th>
                  <th className="py-3 pr-4">Veiculo</th>
                  <th className="py-3 pr-4">Urgencia</th>
                  <th className="py-3 pr-4">Origem</th>
                  <th className="py-3 pr-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-slate-300">
                {leads.map((lead) => (
                  <tr key={lead.id}>
                    <td className="py-4 pr-4 text-slate-500">{formatAdminDate(lead.created_at)}</td>
                    <td className="py-4 pr-4 font-bold text-white">{lead.name || '-'}</td>
                    <td className="py-4 pr-4">
                      {lead.phone ? (
                        <a className="inline-flex items-center gap-2 text-secondary hover:underline" href={`https://wa.me/${lead.phone.replace(/\D/g, '')}`} target="_blank" rel="noreferrer">
                          <MessageCircle className="h-4 w-4" />
                          {lead.phone}
                        </a>
                      ) : (
                        lead.email || '-'
                      )}
                    </td>
                    <td className="py-4 pr-4">{lead.service || '-'}</td>
                    <td className="py-4 pr-4">{lead.vehicle || '-'}</td>
                    <td className="py-4 pr-4">{lead.urgency || '-'}</td>
                    <td className="py-4 pr-4">{lead.source_path || lead.utm_source || '-'}</td>
                    <td className="py-4 pr-4">
                      <span className="rounded-md bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                        {lead.status || 'new'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {!isLoading && leads.length === 0 && (
            <EmptyState title="Nenhum lead registrado" description="Quando um visitante enviar o popup ou fluxo de WhatsApp, o lead aparece nesta tabela." />
          )}
        </section>
      </AdminShell>
    </>
  );
}
