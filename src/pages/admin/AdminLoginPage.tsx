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
            ? 'Painel ainda sem senha configurada na Vercel.'
            : 'Senha incorreta. Confira e tente novamente.';
        setError(message);
        return;
      }

      navigate('/admin');
    } catch {
      setError('API indisponivel. Em teste local, use vercel dev em vez de npm run dev.');
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
      <main className="grid min-h-screen place-items-center bg-[#070A0F] px-4 py-12 text-white">
        <div className="w-full max-w-5xl overflow-hidden rounded-lg border border-white/10 bg-[#0D121C] shadow-2xl md:grid md:grid-cols-[1.1fr_0.9fr]">
          <section className="border-b border-white/10 p-8 md:border-b-0 md:border-r md:p-10">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-primary">KL Vistorias</p>
            <h1 className="mt-5 text-4xl font-black leading-none md:text-5xl">
              Painel privado do cliente
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-400">
              Acesso simples por senha unica. A sessao fica ativa por ate 8 horas e os dados ficam
              protegidos por cookie HttpOnly.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {['Leads', 'Reviews', 'Agenda'].map((item) => (
                <div key={item} className="rounded-md border border-white/10 bg-black/20 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">{item}</p>
                  <p className="mt-2 text-sm text-slate-300">Base centralizada</p>
                </div>
              ))}
            </div>
          </section>

          <section className="p-8 md:p-10">
            <div className="mb-8 flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-md bg-primary/10 text-primary">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Acesso</p>
                <h2 className="text-3xl font-black">Entrar</h2>
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
                {isSubmitting ? 'Entrando...' : 'Acessar painel'}
              </button>
            </form>
          </section>
        </div>
      </main>
    </>
  );
}
