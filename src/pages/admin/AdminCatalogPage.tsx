import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, RefreshCw } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { AdminShell, EmptyState } from './adminShared';

type CatalogItem = {
  id: number;
  name: string;
  short_description: string | null;
  base_price: string | null;
  average_time: string | null;
  active: boolean;
};

export default function AdminCatalogPage() {
  const navigate = useNavigate();
  const [catalog, setCatalog] = useState<CatalogItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadCatalog = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/catalog');
      if (response.status === 401) {
        navigate('/admin/login');
        return;
      }

      if (!response.ok) {
        setError('Nao foi possivel carregar o catalogo.');
        return;
      }

      const data = (await response.json()) as { catalog?: CatalogItem[] };
      setCatalog(data.catalog || []);
    } catch {
      setError('Falha de conexao com a API de catalogo.');
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    void loadCatalog();
  }, [loadCatalog]);

  return (
    <>
      <SEO title="Catalogo Admin" description="Catalogo privado da KL Vistorias." url="https://klvistorias.com.br/admin/catalogo" noIndex />
      <AdminShell
        eyebrow="Servicos"
        title="Catalogo"
        description="Servicos que poderao alimentar landing, painel e bot do WhatsApp."
        actions={
          <button onClick={() => void loadCatalog()} className="flex h-11 items-center gap-2 rounded-md border border-white/10 px-4 text-sm font-bold text-slate-300 transition hover:border-primary/40 hover:text-white">
            <RefreshCw className="h-4 w-4" />
            Atualizar
          </button>
        }
      >
        {error && <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 p-5 text-sm text-red-100">{error}</div>}

        <section className="rounded-lg border border-white/10 bg-[#111827] p-6">
          <h2 className="mb-5 flex items-center gap-2 text-xl font-black">
            <BookOpen className="h-5 w-5 text-primary" />
            Servicos cadastrados
          </h2>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {catalog.map((item) => (
              <article key={item.id} className="rounded-md border border-white/10 bg-black/20 p-5">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h3 className="font-black text-white">{item.name}</h3>
                  <span className={`rounded-md px-3 py-1 text-xs font-bold ${item.active ? 'bg-secondary/10 text-secondary' : 'bg-slate-700 text-slate-300'}`}>
                    {item.active ? 'ativo' : 'inativo'}
                  </span>
                </div>
                <p className="min-h-14 text-sm leading-7 text-slate-400">
                  {item.short_description || 'Sem descricao curta cadastrada.'}
                </p>
                <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-md bg-black/30 p-3">
                    <p className="text-slate-500">Preco</p>
                    <p className="mt-1 font-bold text-white">{item.base_price || 'sob consulta'}</p>
                  </div>
                  <div className="rounded-md bg-black/30 p-3">
                    <p className="text-slate-500">Tempo</p>
                    <p className="mt-1 font-bold text-white">{item.average_time || '-'}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
          {!isLoading && catalog.length === 0 && (
            <EmptyState title="Catalogo ainda vazio" description="A tabela ja esta pronta. Na proxima etapa, adicionamos formulario para cadastrar servicos e alimentar o bot." />
          )}
        </section>
      </AdminShell>
    </>
  );
}
