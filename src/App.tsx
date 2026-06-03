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
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminLeadsPage from './pages/admin/AdminLeadsPage';
import AdminAppointmentsPage from './pages/admin/AdminAppointmentsPage';
import AdminReviewsPage from './pages/admin/AdminReviewsPage';
import AdminCatalogPage from './pages/admin/AdminCatalogPage';
import AdminEventsPage from './pages/admin/AdminEventsPage';
import { serviceLocations } from './data/locations';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { logPageView } from './lib/analytics';

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  useEffect(() => {
    if (isAdminRoute) return;
    logPageView();
  }, [isAdminRoute, location.pathname]);

  return (
    <HelmetProvider>
      <ScrollProgress />
      <div className="min-h-screen flex flex-col font-sans">
        <SEO
          title="Vistoria Cautelar e Veicular em Goiânia"
          description="Especialistas em Vistoria Cautelar em Goiânia. Garanta segurança na compra do seu carro com análise estrutural, documental e de histórico completa. Agende agora!"
        />
        {!isAdminRoute && <Header />}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/areas-de-atendimento" element={<ServiceAreasPage />} />
            <Route path="/politica-de-privacidade" element={<PrivacyPolicyPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/admin/leads" element={<AdminLeadsPage />} />
            <Route path="/admin/agendamentos" element={<AdminAppointmentsPage />} />
            <Route path="/admin/reviews" element={<AdminReviewsPage />} />
            <Route path="/admin/catalogo" element={<AdminCatalogPage />} />
            <Route path="/admin/eventos" element={<AdminEventsPage />} />
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
        {!isAdminRoute && <Footer />}
        {!isAdminRoute && <WhatsAppButton />}
        {!isAdminRoute && <CookieConsent />}
        {!isAdminRoute && <BackToTop />}
      </div>
    </HelmetProvider>
  );
}

export default App;
