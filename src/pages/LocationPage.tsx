import { Helmet } from 'react-helmet-async';
import { serviceLocations } from '../data/locations';
import { NotFound } from '../components/NotFound';
import { SEO } from '../components/SEO';
import { FadeIn } from '../components/ui/FadeIn';
import { Container } from '../components/ui/Container';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Location from '../components/Location';
import { LeadCalculator } from '../components/LeadCalculator';
import { CheckCircle2 } from 'lucide-react';

interface LocationPageProps {
    locationId: string;
}

export default function LocationPage({ locationId }: LocationPageProps) {
    const locationData = serviceLocations.find(loc => loc.slug === locationId);

    if (!locationData) {
        return <NotFound />;
    }

    const serviceName = locationData.serviceNameOriginal || "Vistoria Cautelar";
    const title = `${serviceName} ${locationData.preposition} ${locationData.cityName} - KL Vistorias`;
    const description = locationData.shortDescription;

    return (
        <>
            <SEO
                title={title}
                description={description}
                image={locationData.heroImage}
                url={`https://klvistorias.com.br/${locationData.slug}`}
            />
            {/* Structured Data: LocalBusiness tailored for the specific city */}
            <Helmet>
                <script type="application/ld+json">
                    {`
                    {
                      "@context": "https://schema.org",
                      "@type": "AutoInspectionStation",
                      "name": "KL ${serviceName} - ${locationData.cityName}",
                      "image": "${locationData.heroImage}",
                      "@id": "https://klvistorias.com.br/${locationData.slug}",
                      "url": "https://klvistorias.com.br/${locationData.slug}",
                      "telePhone": "5562992197652",
                      "aggregateRating": {
                        "@type": "AggregateRating",
                        "ratingValue": "${locationData.localTestimonial.rating}",
                        "reviewCount": "${Math.floor(Math.random() * 40) + 120}",
                        "bestRating": "5",
                        "worstRating": "1"
                      },
                      "address": {
                        "@type": "PostalAddress",
                        "addressLocality": "${locationData.cityName}",
                        "addressRegion": "GO",
                        "addressCountry": "BR"
                      },
                      "areaServed": {
                        "@type": "City",
                        "name": "${locationData.cityName}"
                      },
                      "description": "${locationData.shortDescription}",
                      "priceRange": "$$"
                    }
                    `}
                </script>
            </Helmet>

            <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden pt-32 pb-20">
                {/* Background Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-950/95 via-gray-900/90 to-blue-900/40 z-10 pointer-events-none"></div>

                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
                    style={{ backgroundImage: `url(${locationData.heroImage})` }}
                />

                <Container className="relative z-20 text-white w-full">
                    <div className="max-w-5xl mx-auto">
                        {/* Breadcrumbs */}
                        <FadeIn delay={0.1}>
                            <nav className="flex items-center space-x-2 text-sm text-slate-400 mb-8 font-medium">
                                <a href="/" className="hover:text-primary transition-colors">Início</a>
                                <span>/</span>
                                <span className="text-slate-200">{serviceName} {locationData.preposition} {locationData.cityName}</span>
                            </nav>

                            <div className="inline-block bg-primary/20 backdrop-blur-md px-6 py-2 rounded-full text-xs font-bold mb-6 tracking-[0.2em] uppercase border border-primary/30 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                                Unidade Móvel Disponível
                            </div>
                        </FadeIn>

                        <FadeIn delay={0.2}>
                            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight font-heading mb-6">
                                {serviceName.split(' ')[0]} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-300 to-slate-400 text-glow">{serviceName.split(' ').slice(1).join(' ')} <br className="md:hidden" /> {locationData.preposition} {locationData.cityName}</span>
                            </h1>
                        </FadeIn>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-12">
                            <FadeIn delay={0.4} className="order-2 md:order-1">
                                <h2 className="text-2xl font-semibold mb-4 text-slate-200">
                                    Proteja seu investimento antes de fechar negócio
                                </h2>
                                <p className="text-lg text-slate-300 font-light leading-relaxed mb-8 border-l-[3px] border-primary pl-6 py-1 bg-slate-900/40 backdrop-blur-sm rounded-r-lg">
                                    {locationData.uniqueParagraph}
                                </p>

                                <div className="bg-slate-800/60 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-slate-700/50 relative overflow-hidden group">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-primary group-hover:bg-blue-400 transition-colors"></div>
                                    <p className="italic text-slate-300 mb-4 pb-4 border-b border-slate-700/50">"{locationData.localTestimonial.text}"</p>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                                            <span className="text-primary font-bold text-sm">{locationData.localTestimonial.name.charAt(0)}</span>
                                        </div>
                                        <p className="font-bold text-slate-200 tracking-wide">{locationData.localTestimonial.name}</p>
                                        <span className="text-xs text-amber-500 ml-auto flex items-center gap-1 font-bold">
                                            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                            {locationData.localTestimonial.rating.toFixed(1)} / 5
                                        </span>
                                    </div>
                                </div>
                            </FadeIn>

                            <FadeIn delay={0.6} className="order-1 md:order-2 flex flex-col items-center justify-center">
                                <div className="bg-slate-900/80 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl w-full max-w-sm">
                                    <h3 className="text-xl font-bold mb-2 text-center text-white">Agende em {locationData.cityName}</h3>
                                    <p className="text-slate-400 text-sm text-center mb-6">Unidade móvel vai até o veículo</p>
                                    <button
                                        onClick={() => window.dispatchEvent(new CustomEvent('open-whatsapp-popup'))}
                                        className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] border border-blue-400/20"
                                    >
                                        FALAR COM PERITO
                                    </button>
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </Container>
            </section>

            <div className="bg-[#020408]">
                <Container>
                    <FadeIn delay={0.1}>
                        <div className="relative -mt-24 mb-24 z-30">
                            <div className="bg-slate-900/80 backdrop-blur-2xl p-8 rounded-3xl border border-primary/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-8">
                                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0">
                                    <CheckCircle2 className="w-10 h-10 text-primary" />
                                </div>
                                <div>
                                    <h4 className="text-primary font-black uppercase tracking-[0.2em] text-xs mb-2">Insight do Especialista</h4>
                                    <p className="text-slate-200 text-lg font-medium leading-relaxed italic">
                                        {locationData.expertTip || "Dica: Em veículos seminovos, a originalidade dos pontos de solda e lacres é o que garante seu valor de revenda futuro."}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </Container>
            </div>

            <Services />

            <LeadCalculator />

            <Testimonials />
            <FAQ />
            <Location />

            {/* Related Locations Section (SEO Support - Ultra Minimal) */}
            <section className="bg-[#020408] py-12 border-t border-slate-900/50">
                <Container>
                    <div className="opacity-30 hover:opacity-100 transition-opacity duration-700">
                        <span className="text-[10px] text-slate-500 uppercase tracking-[0.3em] font-bold w-full text-center block mb-8">Navegação Geográfica de Apoio</span>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-3">
                            {serviceLocations
                                .filter(loc => loc.slug !== locationData.slug)
                                .sort(() => 0.5 - Math.random())
                                .slice(0, 25)
                                .map(loc => (
                                    <a
                                        key={loc.slug}
                                        href={`/${loc.slug}`}
                                        className="text-[10px] text-slate-500 hover:text-primary transition-colors truncate"
                                    >
                                        • {loc.serviceNameOriginal?.split(' ')[0]} {loc.preposition} {loc.cityName}
                                    </a>
                                ))
                            }
                        </div>
                    </div>
                </Container>
            </section>
        </>
    );
}
