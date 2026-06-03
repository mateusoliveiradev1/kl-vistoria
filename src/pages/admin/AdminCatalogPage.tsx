import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Pencil, Plus, RefreshCw, Trash2 } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { AdminShell, EmptyState } from './adminShared';

type CatalogItem = {
  id: number;
  name: string;
  short_description: string | null;
  full_description: string | null;
  base_price: string | null;
  average_time: string | null;
  active: boolean;
  sort_order: number;
};

type CatalogForm = {
  id: number | null;
  name: string;
  short_description: string;
  full_description: string;
  base_price: string;
  average_time: string;
  active: boolean;
  sort_order: string;
};

const emptyForm: CatalogForm = {
  id: null,
  name: '',
  short_description: '',
  full_description: '',
  base_price: '',
  average_time: '',
  active: true,
  sort_order: '0',
};

export default function AdminCatalogPage() {
  const navigate = useNavigate();
  const [catalog, setCatalog] = useState<CatalogItem[]>([]);
  const [form, setForm] = useState<CatalogForm>(emptyForm);
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

  const loadCatalog = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await requestJson('/api/admin/catalog');
      if (!response) return;

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
  }, [requestJson]);

  useEffect(() => {
    void loadCatalog();
  }, [loadCatalog]);

  const saveCatalogItem = async () => {
    if (!form.name.trim()) {
      setError('Informe o nome do servico.');
      return;
    }

    setIsSaving(true);
    setError('');

    try {
      const response = await requestJson('/api/admin/catalog', {
        method: form.id ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response) return;
      if (!response.ok) {
        setError('Nao foi possivel salvar o servico.');
        return;
      }

      const data = (await response.json()) as { catalog?: CatalogItem[] };
      setCatalog(data.catalog || []);
      setForm(emptyForm);
    } catch {
      setError('Falha ao salvar servico.');
    } finally {
      setIsSaving(false);
    }
  };

  const editCatalogItem = (item: CatalogItem) => {
    setForm({
      id: item.id,
      name: item.name,
      short_description: item.short_description || '',
      full_description: item.full_description || '',
      base_price: item.base_price || '',
      average_time: item.average_time || '',
      active: item.active,
      sort_order: String(item.sort_order || 0),
    });
  };

  const deleteCatalogItem = async (id: number) => {
    if (!window.confirm('Excluir este servico do catalogo?')) return;

    const response = await requestJson('/api/admin/catalog', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    if (response?.ok) {
      const data = (await response.json()) as { catalog?: CatalogItem[] };
      setCatalog(data.catalog || []);
    }
  };

  const toggleCatalogItem = async (item: CatalogItem) => {
    const response = await requestJson('/api/admin/catalog', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...item,
        active: !item.active,
      }),
    });

    if (response?.ok) {
      const data = (await response.json()) as { catalog?: CatalogItem[] };
      setCatalog(data.catalog || []);
    }
  };

  return (
    <>
      <SEO title="Catalogo Admin" description="Catalogo privado da KL Vistorias." url="https://klvistorias.com.br/admin/catalogo" noIndex />
      <AdminShell
        eyebrow="Servicos"
        title="Catalogo"
        description="Cadastre servicos para alimentar landing, painel e futuro bot do WhatsApp."
        actions={
          <button onClick={() => void loadCatalog()} className="flex h-11 items-center gap-2 rounded-md border border-white/10 px-4 text-sm font-bold text-slate-300 transition hover:border-primary/40 hover:text-white">
            <RefreshCw className="h-4 w-4" />
            Atualizar
          </button>
        }
      >
        {error && <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 p-5 text-sm text-red-100">{error}</div>}

        <section className="mb-6 rounded-lg border border-white/10 bg-[#111827] p-6">
          <h2 className="mb-5 flex items-center gap-2 text-xl font-black">
            <Plus className="h-5 w-5 text-primary" />
            {form.id ? 'Editar servico' : 'Novo servico'}
          </h2>

          <div className="grid gap-4 lg:grid-cols-[1fr_1fr_0.5fr]">
            <label className="block">
              <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Nome</span>
              <input
                value={form.name}
                onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                className="h-12 w-full rounded-md border border-white/10 bg-black/30 px-4 text-sm text-white outline-none focus:border-primary"
                placeholder="Vistoria cautelar"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Descricao curta</span>
              <input
                value={form.short_description}
                onChange={(event) => setForm((current) => ({ ...current, short_description: event.target.value }))}
                className="h-12 w-full rounded-md border border-white/10 bg-black/30 px-4 text-sm text-white outline-none focus:border-primary"
                placeholder="Analise completa antes da compra"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Ordem</span>
              <input
                type="number"
                value={form.sort_order}
                onChange={(event) => setForm((current) => ({ ...current, sort_order: event.target.value }))}
                className="h-12 w-full rounded-md border border-white/10 bg-black/30 px-4 text-sm text-white outline-none focus:border-primary"
              />
            </label>

            <label className="block lg:col-span-3">
              <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Descricao completa</span>
              <textarea
                value={form.full_description}
                onChange={(event) => setForm((current) => ({ ...current, full_description: event.target.value }))}
                className="min-h-24 w-full rounded-md border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-primary"
                placeholder="Explique quando o servico e indicado e o que sera analisado."
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Preco</span>
              <input
                value={form.base_price}
                onChange={(event) => setForm((current) => ({ ...current, base_price: event.target.value }))}
                className="h-12 w-full rounded-md border border-white/10 bg-black/30 px-4 text-sm text-white outline-none focus:border-primary"
                placeholder="Sob consulta"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Tempo medio</span>
              <input
                value={form.average_time}
                onChange={(event) => setForm((current) => ({ ...current, average_time: event.target.value }))}
                className="h-12 w-full rounded-md border border-white/10 bg-black/30 px-4 text-sm text-white outline-none focus:border-primary"
                placeholder="40 a 60 minutos"
              />
            </label>

            <label className="flex items-center gap-3 pt-7 text-sm font-bold text-slate-300">
              <input
                type="checkbox"
                checked={form.active}
                onChange={(event) => setForm((current) => ({ ...current, active: event.target.checked }))}
                className="h-5 w-5 accent-blue-600"
              />
              Ativo no catalogo
            </label>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={() => void saveCatalogItem()}
              disabled={isSaving}
              className="rounded-md bg-primary px-5 py-3 text-sm font-black text-white transition hover:bg-blue-700 disabled:opacity-60"
            >
              {isSaving ? 'Salvando...' : form.id ? 'Salvar alteracoes' : 'Cadastrar servico'}
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
            <BookOpen className="h-5 w-5 text-primary" />
            Servicos cadastrados
          </h2>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {catalog.map((item) => (
              <article key={item.id} className="rounded-md border border-white/10 bg-black/20 p-5">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h3 className="font-black text-white">{item.name}</h3>
                  <button
                    onClick={() => void toggleCatalogItem(item)}
                    className={`rounded-md px-3 py-1 text-xs font-bold ${item.active ? 'bg-secondary/10 text-secondary' : 'bg-slate-700 text-slate-300'}`}
                  >
                    {item.active ? 'ativo' : 'inativo'}
                  </button>
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
                <div className="mt-5 flex gap-2">
                  <button onClick={() => editCatalogItem(item)} className="inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-2 text-xs font-bold text-slate-300 hover:text-white">
                    <Pencil className="h-4 w-4" />
                    Editar
                  </button>
                  <button onClick={() => void deleteCatalogItem(item.id)} className="inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-2 text-xs font-bold text-slate-300 hover:text-red-200">
                    <Trash2 className="h-4 w-4" />
                    Excluir
                  </button>
                </div>
              </article>
            ))}
          </div>
          {!isLoading && catalog.length === 0 && (
            <EmptyState title="Catalogo ainda vazio" description="Use o formulario acima para cadastrar os servicos que a landing e o bot poderao consumir." />
          )}
        </section>
      </AdminShell>
    </>
  );
}

