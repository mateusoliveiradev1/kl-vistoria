import { HelmetProvider } from 'react-helmet-async';
import { Routes, Route } from 'react-router-dom';
import { ScrollProgress } from './components/ui/ScrollProgress';
import Header from './components/Header';
import { SEO } from './components/SEO';
import { WhatsAppButton } from './components/WhatsAppButton';
import { CookieConsent } from './components/CookieConsent';
import { BackToTop } from './components/BackToTop';
import { NotFound } from './components/NotFound';
import Footer from './components/Footer';
import Home from './pages/Home';
import LocationPage from './pages/LocationPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import ServiceAreasPage from './pages/ServiceAreasPage';
import { serviceLocations } from './data/locations';
import { useEffect } from 'react';
import { logPageView } from './lib/analytics';

function App() {
  useEffect(() => {
    // Track page views on route change (or initial load)
    logPageView();
  }, []);

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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/areas-de-atendimento" element={<ServiceAreasPage />} />
            <Route path="/politica-de-privacidade" element={<PrivacyPolicyPage />} />
            {serviceLocations.map(loc => (
              <Route
                key={loc.slug}
                path={`/${loc.slug}`}
                element={<LocationPage locationId={loc.slug} />}
              />
            ))}
            <Route path="*" element={<NotFound />} />
          </Routes>
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
