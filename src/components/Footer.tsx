import { Instagram, Facebook, Phone, MapPin, Mail, Star } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';
import { Container } from './ui/Container';
import { Logo } from './Logo';

const Footer = () => {
  return (
    <footer id="contato" className="bg-[#03060C] text-white pt-24 pb-12 relative overflow-hidden border-t border-slate-800">
      {/* High-Tech Background Pattern */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      <div className="absolute -top-[300px] right-[-200px] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Abstract Grid Line */}
      <div className="absolute left-10 md:left-24 top-0 bottom-0 w-[1px] bg-gradient-to-b from-slate-800/80 to-transparent hidden md:block"></div>

      <Container className="relative z-10 text-center md:text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-20 lg:ml-8">

          {/* Brand - 4 Cols */}
          <div className="space-y-8 lg:col-span-4">
            <div className="flex items-center justify-center md:justify-start">
              <a href="#inicio" aria-label="Voltar para o início" className="group">
                <Logo className="h-16 w-auto drop-shadow-md group-hover:scale-105 transition-transform" variant="light" />
              </a>
            </div>
            <p className="text-slate-400 leading-relaxed text-sm md:text-base pr-0 md:pr-8">
              Engenharia veicular preditiva. Vistorias móveis de alta precisão em Goiânia e Região, desenhadas para garantir a procedência absoluta do seu próximo veículo.
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              <a href={COMPANY_INFO.social.instagram} className="bg-slate-800/50 p-3.5 rounded-xl border border-slate-700/50 hover:bg-primary/20 hover:border-primary/50 transition-all duration-300 group" aria-label="Instagram">
                <Instagram className="w-5 h-5 text-slate-400 group-hover:text-primary group-hover:scale-110 transition-all" />
              </a>
              <a href={COMPANY_INFO.social.facebook} className="bg-slate-800/50 p-3.5 rounded-xl border border-slate-700/50 hover:bg-primary/20 hover:border-primary/50 transition-all duration-300 group" aria-label="Facebook">
                <Facebook className="w-5 h-5 text-slate-400 group-hover:text-primary group-hover:scale-110 transition-all" />
              </a>
            </div>

            <div className="pt-2">
              <a
                href="#" // Placeholder for Quick Review Link
                className="inline-flex items-center gap-2 glass-card hover:border-yellow-500/50 text-slate-200 text-xs font-bold py-2.5 px-5 rounded-full transition-all group tracking-wider"
              >
                <div className="bg-yellow-500/20 p-1.5 rounded-full">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                </div>
                <span className="group-hover:text-white transition-colors">AVALIAR NO GOOGLE</span>
              </a>
            </div>
          </div>

          {/* Quick Links - 2 Cols */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h3 className="text-sm font-bold mb-6 font-heading tracking-[0.15em] text-slate-500 uppercase">Navegação</h3>
            <ul className="space-y-4">
              {['Início', 'Serviços', 'Diferenciais', 'Atendimento'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")}`}
                    className="text-slate-300 hover:text-primary hover:translate-x-1.5 transition-all inline-flex items-center gap-2 text-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links - 3 Cols */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold mb-6 font-heading tracking-[0.15em] text-slate-500 uppercase">Serviços</h3>
            <ul className="space-y-4">
              <li><a href="#servicos" className="text-slate-300 hover:text-primary hover:translate-x-1.5 transition-all inline-block text-sm">Vistoria Cautelar</a></li>
              <li><a href="#servicos" className="text-slate-300 hover:text-primary hover:translate-x-1.5 transition-all inline-block text-sm">Histórico Veicular</a></li>
              <li><a href="#servicos" className="text-slate-300 hover:text-primary hover:translate-x-1.5 transition-all inline-block text-sm">Análise de Pintura</a></li>
              <li><a href="#servicos" className="text-slate-300 hover:text-primary hover:translate-x-1.5 transition-all inline-block text-sm">Inspeção Estrutural</a></li>
            </ul>
          </div>

          {/* Contact - 3 Cols */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold mb-6 font-heading tracking-[0.15em] text-slate-500 uppercase">Fale Conosco</h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-4 justify-center md:justify-start group">
                <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700 group-hover:border-primary/50 transition-colors">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <div className="text-left mt-0.5">
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-heading font-bold mb-0.5">Emergência / Agendamento</p>
                  <span className="text-slate-200 text-sm font-medium">{COMPANY_INFO.contact.phone}</span>
                </div>
              </li>
              <li className="flex items-start gap-4 justify-center md:justify-start group">
                <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700 group-hover:border-primary/50 transition-colors">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <div className="text-left mt-0.5">
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-heading font-bold mb-0.5">Parcerias / E-mail</p>
                  <span className="text-slate-200 text-sm font-medium">{COMPANY_INFO.contact.email}</span>
                </div>
              </li>
              <li className="flex items-start gap-4 justify-center md:justify-start text-left group">
                <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700 group-hover:border-primary/50 transition-colors shrink-0">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <div className="text-left mt-0.5">
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-heading font-bold mb-0.5">Base Operacional</p>
                  <span className="text-slate-200 text-sm leading-relaxed max-w-[200px] block">
                    {COMPANY_INFO.address.fullAddress}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800/80 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 lg:ml-8">
          <p className="text-slate-500 text-xs font-medium">
            &copy; {new Date().getFullYear()} {COMPANY_INFO.name}. Engenharia Automotiva.
          </p>
          <p className="text-slate-600 text-xs flex items-center gap-1">
            CNPJ: 14.869.645/0001-38
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
