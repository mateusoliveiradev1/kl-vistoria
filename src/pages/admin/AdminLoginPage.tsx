import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { LockKeyhole, ShieldCheck } from 'lucide-react';
import { SEO } from '../../components/SEO';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const message =
          response.status === 503
            ? 'Configure ADMIN_PASSWORD e ADMIN_SESSION_SECRET na Vercel.'
            : 'Senha invalida.';
        setError(message);
        return;
      }

      navigate('/admin');
    } catch {
      setError('Nao foi possivel acessar o painel agora.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Admin"
        description="Area administrativa privada da KL Vistorias."
        url="https://klvistorias.com.br/admin/login"
        noIndex
      />
      <main className="grid min-h-screen place-items-center bg-[#080B10] px-4 py-12 text-white">
        <div className="w-full max-w-md rounded-lg border border-white/10 bg-[#111827]/90 p-8 shadow-2xl">
          <div className="mb-8 flex items-center gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-md bg-primary/10 text-primary">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">KL Admin</p>
              <h1 className="text-3xl font-black">Acesso privado</h1>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="block">
              <span className="mb-2 block text-sm font-bold text-slate-300">Senha do painel</span>
              <div className="relative">
                <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="h-12 w-full rounded-md border border-white/10 bg-black/30 pl-12 pr-4 text-sm text-white outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
                  placeholder="Digite a senha"
                  autoComplete="current-password"
                  required
                />
              </div>
            </label>

            {error && (
              <p className="rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="h-12 w-full rounded-md bg-primary px-5 font-black text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
