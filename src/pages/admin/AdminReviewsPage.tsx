import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, Link2, Pencil, Plus, RefreshCw, Save, Star, Trash2 } from 'lucide-react';
import { SEO } from '../../components/SEO';
import {
  AdminDonutChart,
  AdminShell,
  EmptyState,
  adminDangerButton,
  adminInput,
  adminPrimaryButton,
  adminSecondaryButton,
  adminSurface,
} from './adminShared';
import { formatAdminDate } from './adminUtils';

type Review = {
  id: number;
  author_name: string | null;
  rating: string | number | null;
  comment: string | null;
  review_date: string | null;
  business_reply: string | null;
  approved_for_site: boolean;
  source: string | null;
};

type ReviewForm = {
  id: number | null;
  author_name: string;
  rating: string;
  comment: string;
  review_date: string;
  business_reply: string;
  approved_for_site: boolean;
  source: string;
};

const emptyForm: ReviewForm = {
  id: null,
  author_name: '',
  rating: '5',
  comment: '',
  review_date: '',
  business_reply: '',
  approved_for_site: true,
  source: 'manual',
};

function toDateInput(value: string | null) {
  if (!value) return '';
  return new Date(value).toISOString().slice(0, 10);
}

export default function AdminReviewsPage() {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [form, setForm] = useState<ReviewForm>(emptyForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSavingSetting, setIsSavingSetting] = useState(false);
  const [googleReviewUrl, setGoogleReviewUrl] = useState('');
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

  const loadReviews = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const [response, settingsResponse] = await Promise.all([
        requestJson('/api/admin/reviews'),
        requestJson('/api/admin/settings'),
      ]);
      if (!response || !settingsResponse) return;

      if (!response.ok || !settingsResponse.ok) {
        setError('Nao foi possivel carregar as reviews.');
        return;
      }

      const data = (await response.json()) as { reviews?: Review[] };
      const settingsData = (await settingsResponse.json()) as {
        settings?: { google_review_url?: string };
      };
      setReviews(data.reviews || []);
      setGoogleReviewUrl(settingsData.settings?.google_review_url || '');
    } catch {
      setError('Falha de conexao com a API de reviews.');
    } finally {
      setIsLoading(false);
    }
  }, [requestJson]);

  useEffect(() => {
    void loadReviews();
  }, [loadReviews]);

  const saveReview = async () => {
    if (!form.author_name.trim()) {
      setError('Informe o nome do cliente.');
      return;
    }

    setIsSaving(true);
    setError('');

    try {
      const response = await requestJson('/api/admin/reviews', {
        method: form.id ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response?.ok) {
        setError('Nao foi possivel salvar a review.');
        return;
      }

      const data = (await response.json()) as { reviews?: Review[] };
      setReviews(data.reviews || []);
      setForm(emptyForm);
    } catch {
      setError('Falha ao salvar review.');
    } finally {
      setIsSaving(false);
    }
  };

  const saveGoogleReviewUrl = async () => {
    setIsSavingSetting(true);
    setError('');

    try {
      const response = await requestJson('/api/admin/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ google_review_url: googleReviewUrl }),
      });

      if (!response?.ok) {
        setError('Informe um link HTTPS valido para solicitar reviews.');
        return;
      }

      const data = (await response.json()) as {
        settings?: { google_review_url?: string };
      };
      setGoogleReviewUrl(data.settings?.google_review_url || '');
    } catch {
      setError('Falha ao salvar o link de review.');
    } finally {
      setIsSavingSetting(false);
    }
  };

  const editReview = (review: Review) => {
    setForm({
      id: review.id,
      author_name: review.author_name || '',
      rating: String(review.rating || 5),
      comment: review.comment || '',
      review_date: toDateInput(review.review_date),
      business_reply: review.business_reply || '',
      approved_for_site: review.approved_for_site,
      source: review.source || 'manual',
    });
  };

  const deleteReview = async (id: number) => {
    if (!window.confirm('Excluir esta review?')) return;

    const response = await requestJson('/api/admin/reviews', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    if (response?.ok) {
      const data = (await response.json()) as { reviews?: Review[] };
      setReviews(data.reviews || []);
    }
  };

  const approvedCount = reviews.filter((review) => review.approved_for_site).length;
  const hiddenCount = reviews.length - approvedCount;
  const ratedReviews = reviews.filter((review) => Number(review.rating || 0) > 0);
  const averageRating =
    ratedReviews.length > 0
      ? (ratedReviews.reduce((total, review) => total + Number(review.rating || 0), 0) / ratedReviews.length).toFixed(1)
      : '0.0';

  return (
    <>
      <SEO title="Reviews Admin" description="Reviews privadas da KL Vistorias." url="https://klvistorias.com.br/admin/reviews" noIndex />
      <AdminShell
        eyebrow="Reputacao"
        title="Reviews"
        description="Cadastre, aprove e organize as avaliacoes que podem aparecer na landing."
        actions={
          <button onClick={() => void loadReviews()} className={adminSecondaryButton}>
            <RefreshCw className="h-4 w-4" />
            Atualizar
          </button>
        }
      >
        {error && <div className="mb-4 rounded-md border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-100">{error}</div>}

        <section className="mb-4 grid gap-4 xl:grid-cols-[360px_minmax(0,1fr)]">
          <div className={`${adminSurface} p-4 md:p-5`}>
            <AdminDonutChart
              title="Aprovacao para landing"
              total={reviews.length}
              centerLabel="reviews"
              segments={[
                { label: 'Aprovadas', value: approvedCount, color: '#7DD3C7' },
                { label: 'Ocultas', value: hiddenCount, color: '#E8C766' },
              ]}
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-white/10 bg-[#10131A] p-4">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">Nota media</p>
              <p className="mt-3 text-3xl font-black text-[#E8C766]">{isLoading ? '-' : averageRating}</p>
              <p className="mt-2 text-xs text-slate-500">Base cadastrada</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-[#10131A] p-4">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">Aprovadas</p>
              <p className="mt-3 text-3xl font-black text-[#7DD3C7]">{isLoading ? '-' : approvedCount}</p>
              <p className="mt-2 text-xs text-slate-500">Podem aparecer no site</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-[#10131A] p-4">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">Ocultas</p>
              <p className="mt-3 text-3xl font-black text-slate-300">{isLoading ? '-' : hiddenCount}</p>
              <p className="mt-2 text-xs text-slate-500">Guardadas no painel</p>
            </div>
          </div>
        </section>

        <section className={`${adminSurface} mb-4 p-4 md:p-5`}>
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="flex items-center gap-2 text-xl font-black">
              <Link2 className="h-5 w-5 text-[#E8C766]" />
              Coleta de reviews no Google
            </h2>
            <span className={`w-fit rounded-md px-3 py-1 text-xs font-bold ${googleReviewUrl ? 'bg-[#7DD3C7]/10 text-[#7DD3C7]' : 'bg-[#E8C766]/10 text-[#E8C766]'}`}>
              {googleReviewUrl ? 'link configurado' : 'aguardando link'}
            </span>
          </div>

          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <label className="grid gap-2">
              <span className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">Link direto para pedir avaliacao</span>
              <input
                type="url"
                value={googleReviewUrl}
                onChange={(event) => setGoogleReviewUrl(event.target.value)}
                className={adminInput}
                placeholder="https://g.page/r/.../review"
              />
            </label>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => void saveGoogleReviewUrl()} disabled={isSavingSetting} className={adminPrimaryButton}>
                <Save className="h-4 w-4" />
                {isSavingSetting ? 'Salvando...' : 'Salvar link'}
              </button>
              {googleReviewUrl && (
                <a href={googleReviewUrl} target="_blank" rel="noreferrer" className={adminSecondaryButton}>
                  <ExternalLink className="h-4 w-4" />
                  Testar link
                </a>
              )}
            </div>
          </div>
          <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-400">
            No Perfil da Empresa no Google, use a opcao Pedir avaliacoes e cole aqui o link gerado. O CRM usa esse endereco na mensagem de leads concluidos, e o bot podera reutiliza-lo depois.
          </p>
        </section>

        <section className={`${adminSurface} mb-4 p-4 md:p-5`}>
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="flex items-center gap-2 text-xl font-black">
              <Plus className="h-5 w-5 text-[#E8C766]" />
              {form.id ? 'Editar review' : 'Nova review'}
            </h2>
            <p className="text-sm leading-6 text-slate-400">Aprovada aparece como prova social. Oculta fica salva para consulta interna.</p>
          </div>

          <div className="grid gap-3 lg:grid-cols-[1fr_140px_180px]">
            <input value={form.author_name} onChange={(event) => setForm((current) => ({ ...current, author_name: event.target.value }))} className={adminInput} placeholder="Nome do cliente" />
            <select value={form.rating} onChange={(event) => setForm((current) => ({ ...current, rating: event.target.value }))} className={adminInput}>
              {[5, 4, 3, 2, 1].map((rating) => (
                <option className="bg-slate-950" key={rating} value={rating}>{rating} estrelas</option>
              ))}
            </select>
            <input type="date" value={form.review_date} onChange={(event) => setForm((current) => ({ ...current, review_date: event.target.value }))} className={adminInput} />
            <textarea value={form.comment} onChange={(event) => setForm((current) => ({ ...current, comment: event.target.value }))} className={`${adminInput} min-h-24 py-3 lg:col-span-3`} placeholder="Comentario do cliente" />
            <textarea value={form.business_reply} onChange={(event) => setForm((current) => ({ ...current, business_reply: event.target.value }))} className={`${adminInput} min-h-20 py-3 lg:col-span-2`} placeholder="Resposta da empresa, se houver" />
            <label className="flex min-h-11 items-center gap-3 rounded-md border border-white/10 bg-[#070A0F] px-3 text-sm font-bold text-slate-300">
              <input type="checkbox" checked={form.approved_for_site} onChange={(event) => setForm((current) => ({ ...current, approved_for_site: event.target.checked }))} className="h-5 w-5 accent-[#E8C766]" />
              Aprovada para site
            </label>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button onClick={() => void saveReview()} disabled={isSaving} className={adminPrimaryButton}>
              {isSaving ? 'Salvando...' : form.id ? 'Salvar alteracoes' : 'Cadastrar review'}
            </button>
            {form.id && (
              <button onClick={() => setForm(emptyForm)} className={adminSecondaryButton}>
                Cancelar edicao
              </button>
            )}
          </div>
        </section>

        <section className={`${adminSurface} p-4 md:p-5`}>
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="flex items-center gap-2 text-xl font-black">
              <Star className="h-5 w-5 text-[#E8C766]" />
              Base de reputacao
            </h2>
            <div className="flex flex-wrap gap-2 text-xs font-bold">
              <span className="rounded-md border border-white/10 px-3 py-1 text-slate-400">{reviews.length} reviews</span>
              <span className="rounded-md border border-[#7DD3C7]/30 bg-[#7DD3C7]/10 px-3 py-1 text-[#7DD3C7]">{approvedCount} aprovadas</span>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {reviews.map((review) => (
              <article key={review.id} className="rounded-md border border-white/10 bg-[#070A0F] p-4">
                <div className="mb-3 flex items-start justify-between gap-4">
                  <div>
                    <strong className="text-white">{review.author_name || 'Cliente'}</strong>
                    <p className="mt-1 text-xs text-slate-500">{review.source || 'manual'} · {formatAdminDate(review.review_date)}</p>
                  </div>
                  <span className="rounded-md bg-[#E8C766]/10 px-3 py-1 text-xs font-black text-[#E8C766]">
                    {review.rating || '-'} estrelas
                  </span>
                </div>
                <p className="text-sm leading-7 text-slate-300">{review.comment || 'Sem comentario textual.'}</p>
                {review.business_reply && (
                  <p className="mt-4 rounded-md border border-white/10 bg-white/[0.02] p-3 text-xs leading-6 text-slate-400">
                    {review.business_reply}
                  </p>
                )}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <span className={`rounded-md px-3 py-1 text-xs font-bold ${review.approved_for_site ? 'bg-[#7DD3C7]/10 text-[#7DD3C7]' : 'bg-slate-700 text-slate-300'}`}>
                    {review.approved_for_site ? 'aprovada' : 'oculta'}
                  </span>
                  <div className="flex gap-2">
                    <button onClick={() => editReview(review)} className={adminSecondaryButton}>
                      <Pencil className="h-4 w-4" />
                      Editar
                    </button>
                    <button onClick={() => void deleteReview(review.id)} className={adminDangerButton}>
                      <Trash2 className="h-4 w-4" />
                      Excluir
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {!isLoading && reviews.length === 0 && (
            <EmptyState title="Nenhuma review cadastrada" description="Cadastre as primeiras avaliacoes manuais agora. Depois a integracao com Google Business Profile pode sincronizar automaticamente." />
          )}
        </section>
      </AdminShell>
    </>
  );
}
