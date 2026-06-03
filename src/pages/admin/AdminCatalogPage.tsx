import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Bot, CheckCircle2, Pencil, Plus, RefreshCw, Search, Trash2 } from 'lucide-react';
import { SEO } from '../../components/SEO';
import {
  AdminShell,
  EmptyState,
  adminDangerButton,
  adminInput,
  adminPrimaryButton,
  adminSecondaryButton,
  adminSurface,
} from './adminShared';

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
  const [search, setSearch] = useState('');
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

  const filteredCatalog = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return catalog;
    return catalog.filter((item) =>
      [item.name, item.short_description, item.full_description, item.base_price, item.average_time]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(term))
    );
  }, [catalog, search]);

  const activeCount = catalog.filter((item) => item.active).length;
  const inactiveCount = catalog.length - activeCount;

  return (
    <>
      <SEO title="Catalogo Admin" description="Catalogo privado da KL Vistorias." url="https://klvistorias.com.br/admin/catalogo" noIndex />
      <AdminShell
        eyebrow="Servicos"
        title="Catalogo"
        description="Cadastre servicos para alimentar landing, painel e futuro bot do WhatsApp."
        actions={
          <button onClick={() => void loadCatalog()} className={adminSecondaryButton}>
            <RefreshCw className="h-4 w-4" />
            Atualizar
          </button>
        }
      >
        {error && <div className="mb-4 rounded-md border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-100">{error}</div>}

        <section className="mb-4 grid gap-3 md:grid-cols-3">
          <div className="rounded-lg border border-white/10 bg-[#10131A] p-4">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">Servicos</p>
            <p className="mt-3 text-3xl font-black text-white">{isLoading ? '-' : catalog.length}</p>
            <p className="mt-2 text-xs text-slate-500">Base do atendimento</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-[#10131A] p-4">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">Ativos</p>
            <p className="mt-3 text-3xl font-black text-[#7DD3C7]">{isLoading ? '-' : activeCount}</p>
            <p className="mt-2 text-xs text-slate-500">Prontos para bot e landing</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-[#10131A] p-4">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">Ocultos</p>
            <p className="mt-3 text-3xl font-black text-slate-300">{isLoading ? '-' : inactiveCount}</p>
            <p className="mt-2 text-xs text-slate-500">Guardados sem aparecer</p>
          </div>
        </section>

        <section className={`${adminSurface} mb-4 p-4 md:p-5`}>
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="flex items-center gap-2 text-xl font-black">
              <Plus className="h-5 w-5 text-[#E8C766]" />
              {form.id ? 'Editar servico' : 'Novo servico'}
            </h2>
            <p className="text-sm leading-6 text-slate-400">Quanto melhor o catalogo, melhor o bot responde no WhatsApp.</p>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1fr_1fr_0.5fr]">
            <label className="block">
              <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Nome</span>
              <input
                value={form.name}
                onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                className={adminInput}
                placeholder="Vistoria cautelar"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Descricao curta</span>
              <input
                value={form.short_description}
                onChange={(event) => setForm((current) => ({ ...current, short_description: event.target.value }))}
                className={adminInput}
                placeholder="Analise completa antes da compra"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Ordem</span>
              <input
                type="number"
                value={form.sort_order}
                onChange={(event) => setForm((current) => ({ ...current, sort_order: event.target.value }))}
                className={adminInput}
              />
            </label>

            <label className="block lg:col-span-3">
              <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Descricao completa</span>
              <textarea
                value={form.full_description}
                onChange={(event) => setForm((current) => ({ ...current, full_description: event.target.value }))}
                className={`${adminInput} min-h-24 py-3`}
                placeholder="Explique quando o servico e indicado e o que sera analisado."
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Preco</span>
              <input
                value={form.base_price}
                onChange={(event) => setForm((current) => ({ ...current, base_price: event.target.value }))}
                className={adminInput}
                placeholder="Sob consulta"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Tempo medio</span>
              <input
                value={form.average_time}
                onChange={(event) => setForm((current) => ({ ...current, average_time: event.target.value }))}
                className={adminInput}
                placeholder="40 a 60 minutos"
              />
            </label>

            <label className="flex items-center gap-3 pt-7 text-sm font-bold text-slate-300">
              <input
                type="checkbox"
                checked={form.active}
                onChange={(event) => setForm((current) => ({ ...current, active: event.target.checked }))}
                className="h-5 w-5 accent-[#E8C766]"
              />
              Ativo no catalogo
            </label>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={() => void saveCatalogItem()}
              disabled={isSaving}
              className={adminPrimaryButton}
            >
              {isSaving ? 'Salvando...' : form.id ? 'Salvar alteracoes' : 'Cadastrar servico'}
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
          <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <h2 className="flex items-center gap-2 text-xl font-black">
              <BookOpen className="h-5 w-5 text-[#E8C766]" />
              Servicos cadastrados
            </h2>
            <label className="relative block w-full lg:max-w-sm">
              <Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-500" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className={`${adminInput} pl-10`}
                placeholder="Buscar servico"
              />
            </label>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredCatalog.map((item) => (
              <article key={item.id} className="rounded-md border border-white/10 bg-[#070A0F] p-5">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h3 className="font-black text-white">{item.name}</h3>
                  <button
                    onClick={() => void toggleCatalogItem(item)}
                    className={`rounded-md px-3 py-1 text-xs font-bold ${item.active ? 'bg-[#7DD3C7]/10 text-[#7DD3C7]' : 'bg-slate-700 text-slate-300'}`}
                  >
                    {item.active ? 'ativo' : 'inativo'}
                  </button>
                </div>
                <p className="min-h-14 text-sm leading-7 text-slate-400">
                  {item.short_description || 'Sem descricao curta cadastrada.'}
                </p>
                {item.full_description && (
                  <p className="mt-3 line-clamp-3 text-xs leading-6 text-slate-500">
                    {item.full_description}
                  </p>
                )}
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
                <div className="mt-4 flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.02] px-3 py-2 text-xs text-slate-400">
                  {item.active ? <CheckCircle2 className="h-4 w-4 text-[#7DD3C7]" /> : <Bot className="h-4 w-4 text-slate-500" />}
                  {item.active ? 'Disponivel para atendimento e futuro bot' : 'Oculto do fluxo automatico'}
                </div>
                <div className="mt-5 flex gap-2">
                  <button onClick={() => editCatalogItem(item)} className={adminSecondaryButton}>
                    <Pencil className="h-4 w-4" />
                    Editar
                  </button>
                  <button onClick={() => void deleteCatalogItem(item.id)} className={adminDangerButton}>
                    <Trash2 className="h-4 w-4" />
                    Excluir
                  </button>
                </div>
              </article>
            ))}
          </div>
          {!isLoading && filteredCatalog.length === 0 && (
            <EmptyState title="Catalogo ainda vazio" description="Use o formulario acima para cadastrar os servicos que a landing e o bot poderao consumir." />
          )}
        </section>
      </AdminShell>
    </>
  );
}
