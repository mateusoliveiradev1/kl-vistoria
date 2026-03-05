import { Instagram, Facebook, Phone, MapPin, Mail, Star } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';
import { Container } from './ui/Container';
import { Logo } from './Logo';

const Footer = () => {
  return (
    <footer id="contato" className="bg-gray-900 text-white pt-20 pb-10 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <Container className="relative z-10 text-center md:text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center justify-center md:justify-start">
              <a href="#inicio" aria-label="Voltar para o início">
                <Logo className="h-16 w-auto" variant="light" />
              </a>
            </div>
            <p className="text-gray-400 leading-relaxed">
              {COMPANY_INFO.description}
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              <a href={COMPANY_INFO.social.instagram} className="bg-gray-800 p-3 rounded-full hover:bg-secondary transition-colors group" aria-label="Instagram">
                <Instagram className="w-5 h-5 text-gray-300 group-hover:text-white" />
              </a>
              <a href={COMPANY_INFO.social.facebook} className="bg-gray-800 p-3 rounded-full hover:bg-secondary transition-colors group" aria-label="Facebook">
                <Facebook className="w-5 h-5 text-gray-300 group-hover:text-white" />
              </a>
            </div>

            <div className="pt-4">
              <a
                href="#" // Placeholder for Quick Review Link
                className="inline-flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white text-xs font-bold py-2 px-4 rounded-full transition-all"
              >
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                AVALIAR NO GOOGLE
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 border-b border-gray-700 pb-2 inline-block text-secondary">Navegação</h3>
            <ul className="space-y-4">
              {['Início', 'Serviços', 'Diferenciais', 'Atendimento'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")}`}
                    className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 border-b border-gray-700 pb-2 inline-block text-secondary">Serviços</h3>
            <ul className="space-y-4">
              <li><a href="#servicos" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block">Vistoria Cautelar</a></li>
              <li><a href="#servicos" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block">Histórico Veicular</a></li>
              <li><a href="#servicos" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block">Análise de Pintura</a></li>
              <li><a href="#servicos" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block">Validação de Chassi</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-6 border-b border-gray-700 pb-2 inline-block text-secondary">Contato</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 justify-center md:justify-start">
                <Phone className="w-5 h-5 text-gray-500 mt-1" />
                <span className="text-gray-400">{COMPANY_INFO.contact.phone}</span>
              </li>
              <li className="flex items-start gap-3 justify-center md:justify-start">
                <Mail className="w-5 h-5 text-gray-500 mt-1" />
                <span className="text-gray-400">{COMPANY_INFO.contact.email}</span>
              </li>
              <li className="flex items-start gap-3 justify-center md:justify-start text-left">
                <MapPin className="w-5 h-5 text-gray-500 mt-1 shrink-0" />
                <span className="text-gray-400">
                  {COMPANY_INFO.address.fullAddress}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} {COMPANY_INFO.name}. Todos os direitos reservados.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
