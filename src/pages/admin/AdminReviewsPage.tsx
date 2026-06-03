import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, Star } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { AdminShell, EmptyState } from './adminShared';
import { formatAdminDate } from './adminUtils';

type Review = {
  id: number;
  author_name: string | null;
  rating: string | number | null;
  comment: string | null;
  review_date: string | null;
  approved_for_site: boolean;
  source: string | null;
};

export default function AdminReviewsPage() {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadReviews = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/reviews');
      if (response.status === 401) {
        navigate('/admin/login');
        return;
      }

      if (!response.ok) {
        setError('Nao foi possivel carregar as reviews.');
        return;
      }

      const data = (await response.json()) as { reviews?: Review[] };
      setReviews(data.reviews || []);
    } catch {
      setError('Falha de conexao com a API de reviews.');
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    void loadReviews();
  }, [loadReviews]);

  return (
    <>
      <SEO title="Reviews Admin" description="Reviews privadas da KL Vistorias." url="https://klvistorias.com.br/admin/reviews" noIndex />
      <AdminShell
        eyebrow="Reputacao"
        title="Reviews"
        description="Base preparada para reviews do Google e aprovacao do que aparece na landing."
        actions={
          <button onClick={() => void loadReviews()} className="flex h-11 items-center gap-2 rounded-md border border-white/10 px-4 text-sm font-bold text-slate-300 transition hover:border-primary/40 hover:text-white">
            <RefreshCw className="h-4 w-4" />
            Atualizar
          </button>
        }
      >
        {error && <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 p-5 text-sm text-red-100">{error}</div>}

        <section className="rounded-lg border border-white/10 bg-[#111827] p-6">
          <h2 className="mb-5 flex items-center gap-2 text-xl font-black">
            <Star className="h-5 w-5 text-primary" />
            Reviews sincronizadas
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {reviews.map((review) => (
              <article key={review.id} className="rounded-md border border-white/10 bg-black/20 p-5">
                <div className="mb-3 flex items-center justify-between gap-4">
                  <strong className="text-white">{review.author_name || 'Cliente'}</strong>
                  <span className="rounded-md bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                    {review.rating || '-'} estrelas
                  </span>
                </div>
                <p className="text-sm leading-7 text-slate-300">{review.comment || 'Sem comentario textual.'}</p>
                <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                  <span>{review.source || 'manual'}</span>
                  <span>{formatAdminDate(review.review_date)}</span>
                </div>
              </article>
            ))}
          </div>
          {!isLoading && reviews.length === 0 && (
            <EmptyState title="Nenhuma review cadastrada" description="Quando a integracao do Google Business Profile entrar, as avaliacoes aparecerao aqui para aprovacao." />
          )}
        </section>
      </AdminShell>
    </>
  );
}
