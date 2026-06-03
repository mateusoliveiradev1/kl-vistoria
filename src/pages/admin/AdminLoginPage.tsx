import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, CalendarClock, LockKeyhole, ShieldCheck, Users } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { adminInput, adminPrimaryButton } from './adminShared';

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

  const modules = [
    { label: 'Leads', icon: Users },
    { label: 'Agenda', icon: CalendarClock },
    { label: 'Metricas', icon: BarChart3 },
  ];

  return (
    <>
      <SEO
        title="Admin"
        description="Area administrativa privada da KL Vistorias."
        url="https://klvistorias.com.br/admin/login"
        noIndex
      />
      <main className="grid min-h-screen place-items-center bg-[#070A0F] px-4 py-10 text-white">
        <div className="pointer-events-none fixed inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E8C766]/60 to-transparent" />
        <div className="w-full max-w-5xl overflow-hidden rounded-lg border border-white/10 bg-[#0B0E14] shadow-[0_24px_70px_rgba(0,0,0,0.34)] md:grid md:grid-cols-[1.05fr_0.95fr]">
          <section className="border-b border-white/10 p-5 md:border-b-0 md:border-r md:p-10">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#E8C766]">KL Vistorias</p>
            <h1 className="mt-4 text-3xl font-black leading-none sm:text-4xl md:mt-5 md:text-6xl">
              Painel privado
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-400 md:mt-5 md:leading-7">
              Acesso operacional para acompanhar conversao, leads, agenda, catalogo e reputacao.
            </p>

            <div className="mt-5 grid grid-cols-3 gap-2 md:mt-8 md:gap-3">
              {modules.map((item) => (
                <div key={item.label} className="rounded-md border border-white/10 bg-[#070A0F] p-3 md:p-4">
                  <item.icon className="mb-3 h-5 w-5 text-[#7DD3C7]" />
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500 md:text-xs">{item.label}</p>
                  <p className="mt-1 hidden text-sm text-slate-300 md:block">Base centralizada</p>
                </div>
              ))}
            </div>
          </section>

          <section className="p-5 md:p-10">
            <div className="mb-6 flex items-center gap-4 md:mb-8">
              <div className="grid h-12 w-12 place-items-center rounded-md border border-[#E8C766]/30 bg-[#E8C766]/10 text-[#E8C766]">
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
                    className={`${adminInput} h-12 pl-12`}
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

              <button type="submit" disabled={isSubmitting} className={`${adminPrimaryButton} w-full`}>
                {isSubmitting ? 'Entrando...' : 'Acessar painel'}
              </button>
            </form>
          </section>
        </div>
      </main>
    </>
  );
}
