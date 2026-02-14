
import { HelmetProvider } from 'react-helmet-async';
import { ScrollProgress } from './components/ui/ScrollProgress';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Features from './components/Features';
import FAQ from './components/FAQ';
import Location from './components/Location';
import Footer from './components/Footer';
import { SEO } from './components/SEO';
import { WhatsAppButton } from './components/WhatsAppButton';
import { CookieConsent } from './components/CookieConsent';
import { BackToTop } from './components/BackToTop';
import { NotFound } from './components/NotFound';
import { useState, useEffect } from 'react';
import { logPageView } from './lib/analytics';

function App() {
  const [is404] = useState(() => {
    const path = window.location.pathname;
    return path !== '/' && path !== '/index.html';
  });

  useEffect(() => {
    // Track page views on route change (or initial load)
    logPageView();
  }, []);

  if (is404) {
    return (
      <HelmetProvider>
        <SEO title="Página não encontrada" />
        <NotFound />
      </HelmetProvider>
    );
  }

  return (
    <HelmetProvider>
      <ScrollProgress />
      <div className="min-h-screen flex flex-col font-sans">
        <SEO 
          title="Vistoria Cautelar e Veicular em Goiânia"
          description="Especialistas em Vistoria Cautelar em Goiânia. Garanta segurança na compra do seu carro com análise estrutural, documental e de histórico completa. Agende agora!"
        />
        <Header />
        <main className="flex-grow">
          <Hero />
          <Services />
          <Features />
          <FAQ />
          <Location />
        </main>
        <Footer />
        <WhatsAppButton />
        <CookieConsent />
        <BackToTop />
      </div>
    </HelmetProvider>
  );
}

export default App;
