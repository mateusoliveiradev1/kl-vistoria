import { Link } from 'react-router-dom';
import { Instagram, Facebook, Phone, MapPin, Mail } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';
import { Container } from './ui/Container';
import { Logo } from './Logo';

const Footer = () => {
  return (
    <footer
      id="contato"
      className="relative overflow-hidden border-t border-slate-800 bg-[#03060C] pb-12 pt-24 text-white"
    >
      <div className="absolute left-0 top-0 h-[1px] w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="pointer-events-none absolute right-[-200px] top-[-300px] h-[600px] w-[600px] rounded-full bg-primary/5 blur-[100px]" />
      <div className="absolute bottom-0 left-10 top-0 hidden w-[1px] bg-gradient-to-b from-slate-800/80 to-transparent md:left-24 md:block" />

      <Container className="relative z-10 text-center md:text-left">
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:ml-8 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-5">
            <div className="flex items-center justify-center md:justify-start">
              <Link to="/" aria-label="Voltar para o inicio" className="group">
                <Logo
                  className="h-16 w-auto drop-shadow-md transition-transform group-hover:scale-105"
                  variant="light"
                />
              </Link>
            </div>
            <p className="pr-0 text-sm leading-relaxed text-slate-400 md:pr-8 md:text-base">
              Engenharia veicular preditiva. Vistorias moveis de alta precisao em Goiania e
              regiao, desenhadas para garantir a procedencia absoluta do seu proximo veiculo.
            </p>
            <div className="flex justify-center gap-4 md:justify-start">
              <a
                href={COMPANY_INFO.social.instagram}
                className="group rounded-xl border border-slate-700/50 bg-slate-800/50 p-3.5 transition-all duration-300 hover:border-primary/50 hover:bg-primary/20"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5 text-slate-400 transition-all group-hover:scale-110 group-hover:text-primary" />
              </a>
              <a
                href={COMPANY_INFO.social.facebook}
                className="group rounded-xl border border-slate-700/50 bg-slate-800/50 p-3.5 transition-all duration-300 hover:border-primary/50 hover:bg-primary/20"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5 text-slate-400 transition-all group-hover:scale-110 group-hover:text-primary" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h3 className="mb-6 text-sm font-bold uppercase tracking-[0.15em] text-slate-500 font-heading">
              Navegacao
            </h3>
            <ul className="space-y-4">
              {['Inicio', 'Servicos', 'Diferenciais', 'Atendimento'].map((item) => {
                const id = item.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                const isHome = window.location.pathname === '/' || window.location.pathname === '/index.html';
                const isOnPage = isHome || ['servicos', 'faq', 'atendimento'].includes(id);
                const href = id === 'inicio' ? '/' : (isOnPage ? `#${id}` : `/#${id}`);

                return (
                  <li key={item}>
                    <a
                      href={href}
                      className="inline-flex items-center gap-2 text-sm text-white transition-all hover:translate-x-1.5 hover:text-primary"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-700" />
                      {item}
                    </a>
                  </li>
                );
              })}
              <li>
                <a
                  href="/areas-de-atendimento"
                  className="inline-flex items-center gap-2 text-[11px] uppercase tracking-tighter text-slate-500 transition-all hover:text-primary"
                >
                  Mapa de Atendimento
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h3 className="mb-6 text-sm font-bold uppercase tracking-[0.15em] text-slate-500 font-heading">
              Fale Conosco
            </h3>
            <ul className="space-y-5">
              <li className="group flex items-start justify-center gap-4 md:justify-start">
                <div className="rounded-lg border border-slate-700 bg-slate-800/80 p-2.5 transition-colors group-hover:border-primary/50">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <div className="mt-0.5 text-left">
                  <p className="mb-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-500 font-heading">
                    Emergencia / Agendamento
                  </p>
                  <span className="text-sm font-medium text-slate-200">{COMPANY_INFO.contact.phone}</span>
                </div>
              </li>
              <li className="group flex items-start justify-center gap-4 md:justify-start">
                <div className="rounded-lg border border-slate-700 bg-slate-800/80 p-2.5 transition-colors group-hover:border-primary/50">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <div className="mt-0.5 text-left">
                  <p className="mb-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-500 font-heading">
                    Parcerias / E-mail
                  </p>
                  <span className="text-sm font-medium text-slate-200">{COMPANY_INFO.contact.email}</span>
                </div>
              </li>
              <li className="group flex items-start justify-center gap-4 text-left md:justify-start">
                <div className="shrink-0 rounded-lg border border-slate-700 bg-slate-800/80 p-2.5 transition-colors group-hover:border-primary/50">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <div className="mt-0.5 text-left">
                  <p className="mb-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-500 font-heading">
                    Base Operacional
                  </p>
                  <span className="block max-w-[200px] text-sm leading-relaxed text-slate-200">
                    {COMPANY_INFO.address.fullAddress}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800/80 pt-8 md:flex-row lg:ml-8">
          <p className="text-xs font-medium text-slate-500">
            &copy; {new Date().getFullYear()} {COMPANY_INFO.name}. Engenharia Automotiva.
          </p>
          <div className="flex flex-col items-center gap-2 md:flex-row md:gap-4">
            <p className="flex items-center gap-1 text-xs text-slate-600">
              CNPJ: {COMPANY_INFO.legal.cnpj}
            </p>
            <Link
              to="/politica-de-privacidade"
              className="text-xs text-slate-500 transition-colors hover:text-primary"
            >
              Politica de Privacidade
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
