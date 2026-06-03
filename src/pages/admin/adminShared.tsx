import type { ReactNode } from 'react';
import type { ComponentType, SVGProps } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { BarChart3, BookOpen, CalendarClock, Database, LogOut, Star, Users } from 'lucide-react';

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

const navItems: Array<{ label: string; href: string; icon: IconType }> = [
  { label: 'Visao geral', href: '/admin', icon: BarChart3 },
  { label: 'Leads', href: '/admin/leads', icon: Users },
  { label: 'Agendamentos', href: '/admin/agendamentos', icon: CalendarClock },
  { label: 'Reviews', href: '/admin/reviews', icon: Star },
  { label: 'Catalogo', href: '/admin/catalogo', icon: BookOpen },
];

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-md border border-dashed border-white/10 bg-black/20 px-5 py-8 text-sm">
      <p className="font-bold text-white">{title}</p>
      <p className="mt-2 max-w-xl leading-6 text-slate-500">{description}</p>
    </div>
  );
}

export function AdminShell({
  eyebrow,
  title,
  description,
  actions,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const navigate = useNavigate();

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    navigate('/admin/login');
  };

  return (
    <main className="min-h-screen bg-[#070A0F] px-4 py-6 text-white md:px-8">
      <div className="mx-auto grid max-w-[1440px] gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="rounded-lg border border-white/10 bg-[#0D121C] p-5 xl:sticky xl:top-6 xl:h-[calc(100vh-3rem)]">
          <div className="mb-8">
            <p className="text-[11px] font-black uppercase tracking-[0.28em] text-primary">KL Vistorias</p>
            <h1 className="mt-3 text-3xl font-black leading-none">Admin</h1>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Central de conversao, leads e operacao comercial.
            </p>
          </div>

          <nav className="space-y-2 text-sm">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                end={item.href === '/admin'}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-md px-3 py-3 font-bold transition ${
                    isActive ? 'bg-primary text-white' : 'text-slate-400 hover:bg-white/[0.04] hover:text-white'
                  }`
                }
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-8 rounded-md border border-white/10 bg-black/20 p-4">
            <div className="mb-3 flex items-center gap-2 text-sm font-bold text-white">
              <Database className="h-4 w-4 text-primary" />
              Banco conectado
            </div>
            <p className="text-xs leading-5 text-slate-500">
              Tracking, leads, reviews, catalogo e agenda centralizados no Neon.
            </p>
          </div>
        </aside>

        <section className="min-w-0">
          <header className="mb-6 flex flex-col gap-4 rounded-lg border border-white/10 bg-[#0D121C] p-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">{eyebrow}</p>
              <h2 className="mt-2 text-3xl font-black md:text-4xl">{title}</h2>
              <p className="mt-2 text-sm text-slate-400">{description}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {actions}
              <button
                onClick={logout}
                className="flex h-11 items-center gap-2 rounded-md border border-white/10 px-4 text-sm font-bold text-slate-300 transition hover:border-red-400/40 hover:text-red-200"
              >
                <LogOut className="h-4 w-4" />
                Sair
              </button>
            </div>
          </header>

          {children}
        </section>
      </div>
    </main>
  );
}
