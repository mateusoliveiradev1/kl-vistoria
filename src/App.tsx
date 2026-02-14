
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

function App() {
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
      </div>
    </HelmetProvider>
  );
}

export default App;
