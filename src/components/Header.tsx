import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "../lib/utils";
import { Button } from "./ui/Button";
import { Logo } from "./Logo";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed w-full top-0 z-50 h-[80px] flex items-center transition-all duration-300",
        scrolled
          ? "bg-primary/80 backdrop-blur-lg border-b border-white/10 shadow-xl"
          : "bg-transparent bg-gradient-to-b from-black/50 to-transparent",
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center h-full">
        {/* Logo */}
        <div className="flex items-center h-full">
          <a href="/#inicio" aria-label="Voltar para o início">
            <Logo className="h-[45px] md:h-[55px] hover:scale-105 transition-transform duration-300" variant={scrolled ? "light" : "default"} />
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 items-center">
          {["Início", "Serviços", "Diferenciais", "FAQ", "Atendimento"].map(
            (item) => {
              const id = item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
              const isHome = window.location.pathname === '/' || window.location.pathname === '/index.html';
              const isOnPage = isHome || ['servicos', 'faq', 'atendimento'].includes(id);
              const href = id === 'inicio' ? '/' : (isOnPage ? `#${id}` : `/#${id}`);

              return (
                <a
                  key={item}
                  href={href}
                  className="text-white hover:text-secondary transition-colors font-medium text-sm lg:text-base tracking-wide relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full"></span>
                </a>
              );
            }
          )}
          <div onClick={() => window.dispatchEvent(new CustomEvent('open-whatsapp-popup'))} className="cursor-pointer">
            <Button size="sm" className="font-bold pointer-events-none">
              Contato
            </Button>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none p-3 -mr-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-8 w-8" />
          ) : (
            <Menu className="h-8 w-8" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "absolute top-[80px] left-0 w-full bg-primary/95 backdrop-blur-md border-t border-white/10 shadow-xl md:hidden transition-all duration-300 ease-in-out origin-top",
          isMenuOpen
            ? "opacity-100 scale-y-100"
            : "opacity-0 scale-y-0 pointer-events-none",
        )}
      >
        <div className="flex flex-col p-6 space-y-6">
          {["Início", "Serviços", "Diferenciais", "Atendimento"].map((item) => {
            const id = item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            const isHome = window.location.pathname === '/' || window.location.pathname === '/index.html';
            const isOnPage = isHome || ['servicos', 'faq', 'atendimento'].includes(id);
            const href = id === 'inicio' ? '/' : (isOnPage ? `#${id}` : `/#${id}`);

            return (
              <a
                key={item}
                href={href}
                className="text-white hover:text-secondary transition-colors font-medium text-lg border-b border-white/5 pb-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            );
          })}
          <div onClick={() => { setIsMenuOpen(false); window.dispatchEvent(new CustomEvent('open-whatsapp-popup')); }} className="cursor-pointer">
            <Button className="w-full pointer-events-none">Contato</Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
