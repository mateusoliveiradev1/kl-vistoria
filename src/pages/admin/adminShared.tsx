import type { ReactNode } from 'react';
import type { ComponentType, SVGProps } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Activity,
  BarChart3,
  BookOpen,
  CalendarClock,
  Database,
  LogOut,
  Star,
  Users,
} from 'lucide-react';

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

const navItems: Array<{ label: string; href: string; icon: IconType }> = [
  { label: 'Visao geral', href: '/admin', icon: BarChart3 },
  { label: 'Leads', href: '/admin/leads', icon: Users },
  { label: 'Agendamentos', href: '/admin/agendamentos', icon: CalendarClock },
  { label: 'Reviews', href: '/admin/reviews', icon: Star },
  { label: 'Catalogo', href: '/admin/catalogo', icon: BookOpen },
  { label: 'Eventos', href: '/admin/eventos', icon: Activity },
];

export const adminSurface =
  'rounded-lg border border-white/10 bg-[#10131A] shadow-[0_24px_70px_rgba(0,0,0,0.24)]';

export const adminInset = 'rounded-lg border border-white/10 bg-[#070A0F]';

export const adminInput =
  'min-h-11 w-full rounded-md border border-white/10 bg-[#070A0F] px-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-[#E8C766] focus:ring-2 focus:ring-[#E8C766]/15';

export const adminPrimaryButton =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-[#E8C766]/60 bg-[#E8C766] px-4 text-sm font-black text-[#070A0F] transition hover:bg-[#F5D978] disabled:cursor-not-allowed disabled:opacity-60';

export const adminSecondaryButton =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-white/10 bg-white/[0.02] px-4 text-sm font-bold text-slate-300 transition hover:border-[#E8C766]/50 hover:text-white disabled:cursor-not-allowed disabled:opacity-60';

export const adminDangerButton =
  'inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-red-400/20 bg-red-500/5 px-3 text-xs font-bold text-red-100 transition hover:border-red-300/40';

export function EmptyState({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return (
    <div className="rounded-md border border-dashed border-white/12 bg-[#070A0F] px-5 py-8 text-sm">
      <p className="font-black text-white">{title}</p>
      <p className="mt-2 max-w-2xl leading-6 text-slate-400">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function AdminSection({
  title,
  icon: Icon,
  children,
  action,
}: {
  title: string;
  icon: IconType;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <section className={`${adminSurface} p-4 md:p-5`}>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="flex items-center gap-2 text-lg font-black md:text-xl">
          <Icon className="h-5 w-5 text-[#E8C766]" />
          {title}
        </h2>
        {action}
      </div>
      {children}
    </section>
  );
}

export function AdminMetric({
  label,
  value,
  detail,
  icon: Icon,
}: {
  label: string;
  value: ReactNode;
  detail?: string;
  icon: IconType;
}) {
  return (
    <div className="rounded-md border border-white/10 bg-[#10131A] p-4">
      <div className="mb-5 flex items-center justify-between gap-3">
        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">{label}</span>
        <Icon className="h-4 w-4 text-[#E8C766]" />
      </div>
      <p className="text-3xl font-black text-white">{value}</p>
      {detail && <p className="mt-2 text-xs leading-5 text-slate-500">{detail}</p>}
    </div>
  );
}

export function AdminDonutChart({
  title,
  total,
  segments,
  centerLabel,
}: {
  title: string;
  total: number;
  centerLabel: string;
  segments: Array<{ label: string; value: number; color: string }>;
}) {
  let cursor = 0;
  const denominator = Math.max(total, 1);
  const stops = segments.map((segment) => {
    const start = cursor;
    const end = cursor + (segment.value / denominator) * 100;
    cursor = end;
    return `${segment.color} ${start}% ${end}%`;
  });

  const background =
    total > 0
      ? `conic-gradient(${stops.join(', ')}, rgba(255,255,255,0.08) ${cursor}% 100%)`
      : 'conic-gradient(rgba(255,255,255,0.08) 0% 100%)';

  return (
    <div className="grid min-w-0 gap-5">
      <div className="relative mx-auto grid aspect-square w-44 place-items-center rounded-full border border-white/10 bg-[#070A0F] p-3">
        <div className="absolute inset-3 rounded-full" style={{ background }} />
        <div className="relative grid aspect-square w-28 place-items-center rounded-full border border-white/10 bg-[#10131A] text-center">
          <div>
            <p className="text-3xl font-black text-white">{total}</p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">{centerLabel}</p>
          </div>
        </div>
      </div>
      <div className="min-w-0">
        <p className="mb-4 text-sm font-black leading-6 text-white">{title}</p>
        <div className="grid min-w-0 gap-3 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
          {segments.map((segment) => (
            <div key={segment.label} className="flex min-w-0 items-center justify-between gap-3 rounded-md border border-white/10 bg-[#070A0F] px-3 py-2">
              <span className="flex min-w-0 items-center gap-2 text-sm text-slate-300">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: segment.color }} />
                <span className="truncate">{segment.label}</span>
              </span>
              <strong className="text-white">{segment.value}</strong>
            </div>
          ))}
        </div>
      </div>
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
    <main className="min-h-screen bg-[#070A0F] pb-24 text-white xl:pb-0">
      <div className="pointer-events-none fixed inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E8C766]/60 to-transparent" />
      <div className="sticky top-0 z-30 border-b border-white/10 bg-[#070A0F]/95 px-3 py-3 backdrop-blur md:px-6 xl:hidden">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#E8C766]">KL Vistorias</p>
            <p className="mt-1 text-lg font-black leading-none">Admin</p>
          </div>
          <button
            onClick={logout}
            className="inline-flex h-10 shrink-0 items-center gap-2 rounded-md border border-white/10 px-3 text-sm font-bold text-slate-300 transition hover:border-red-400/40 hover:text-red-100"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </button>
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-[1540px] gap-4 px-3 py-3 sm:px-4 md:gap-6 md:px-6 md:py-6 xl:grid-cols-[286px_minmax(0,1fr)]">
        <aside className="hidden rounded-lg border border-white/10 bg-[#0B0E14] p-5 xl:sticky xl:top-6 xl:block xl:h-[calc(100vh-3rem)]">
          <div className="flex items-start justify-between gap-4 xl:block">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[#E8C766]">KL Vistorias</p>
              <h1 className="mt-2 text-3xl font-black leading-none md:text-4xl">Admin</h1>
              <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">
                Conversao, agenda e reputacao em uma central.
              </p>
            </div>
            <button
              onClick={logout}
              className="inline-flex h-10 shrink-0 items-center gap-2 rounded-md border border-white/10 px-3 text-sm font-bold text-slate-300 transition hover:border-red-400/40 hover:text-red-100 xl:hidden"
            >
              <LogOut className="h-4 w-4" />
              Sair
            </button>
          </div>

          <nav className="mt-8 space-y-2 text-sm">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                end={item.href === '/admin'}
                className={({ isActive }) =>
                  `flex min-h-11 w-full shrink-0 items-center gap-3 rounded-md px-3 font-bold transition ${
                    isActive
                      ? 'border border-[#E8C766]/50 bg-[#E8C766] text-[#070A0F]'
                      : 'border border-transparent text-slate-400 hover:border-white/10 hover:bg-white/[0.03] hover:text-white'
                  }`
                }
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-6 hidden rounded-md border border-white/10 bg-[#070A0F] p-4 xl:block">
            <div className="mb-3 flex items-center gap-2 text-sm font-bold text-white">
              <Database className="h-4 w-4 text-[#7DD3C7]" />
              Banco conectado
            </div>
            <p className="text-xs leading-5 text-slate-500">
              Neon guarda tracking, leads, agenda, catalogo e reviews para o bot consumir depois.
            </p>
          </div>
        </aside>

        <section className="min-w-0">
          <header className="mb-4 rounded-lg border border-white/10 bg-[#0B0E14] p-4 md:mb-6 md:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#7DD3C7]">{eyebrow}</p>
                <h2 className="mt-2 text-2xl font-black leading-none sm:text-3xl md:text-5xl">{title}</h2>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400 md:text-base">{description}</p>
              </div>

              <div className="flex shrink-0 flex-wrap items-center gap-2 md:gap-3">
                {actions}
                <button
                  onClick={logout}
                  className="hidden h-11 items-center gap-2 rounded-md border border-white/10 px-4 text-sm font-bold text-slate-300 transition hover:border-red-400/40 hover:text-red-100 xl:flex"
                >
                  <LogOut className="h-4 w-4" />
                  Sair
                </button>
              </div>
            </div>
          </header>

          {children}
        </section>
      </div>

      <nav className="fixed inset-x-2 bottom-2 z-40 grid grid-cols-6 gap-1 rounded-lg border border-white/10 bg-[#0B0E14]/95 p-1 shadow-[0_18px_50px_rgba(0,0,0,0.55)] backdrop-blur xl:hidden">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            end={item.href === '/admin'}
            className={({ isActive }) =>
              `grid min-h-14 place-items-center rounded-md px-1 py-2 text-center text-[10px] font-bold leading-tight transition ${
                isActive ? 'bg-[#E8C766] text-[#070A0F]' : 'text-slate-400 hover:bg-white/[0.04] hover:text-white'
              }`
            }
          >
            <item.icon className="mb-1 h-4 w-4" />
            <span className="max-w-full truncate">{item.label.replace('Visao geral', 'Geral')}</span>
          </NavLink>
        ))}
      </nav>
    </main>
  );
}
