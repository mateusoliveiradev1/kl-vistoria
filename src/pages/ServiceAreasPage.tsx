import { serviceLocations } from '../data/locations';
import { Container } from '../components/ui/Container';
import { SEO } from '../components/SEO';
import { FadeIn } from '../components/ui/FadeIn';

export default function ServiceAreasPage() {
    return (
        <div className="bg-[#03060C] min-h-screen pt-32 pb-20">
            <SEO
                title="Áreas de Atendimento - KL Vistoria Cautelar Goiânia"
                description="Confira todos os bairros e regiões de Goiânia atendidos pela unidade móvel da KL Vistoria."
            />
            <Container>
                <FadeIn>
                    <h1 className="text-4xl font-bold text-white mb-4 text-center">Nossas Áreas de Atendimento</h1>
                    <p className="text-slate-400 text-center max-w-2xl mx-auto mb-16">
                        A KL Vistoria atende em toda a região metropolitana de Goiânia. Selecione seu bairro ou cidade abaixo para ver detalhes sobre o serviço local.
                    </p>
                </FadeIn>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {serviceLocations.sort((a, b) => a.cityName.localeCompare(b.cityName)).map(loc => (
                        <a
                            key={loc.slug}
                            href={`/${loc.slug}`}
                            className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl hover:border-primary/50 text-slate-300 hover:text-white transition-all text-sm"
                        >
                            <span className="text-xs text-slate-500 block mb-1">{loc.serviceNameOriginal}</span>
                            {loc.cityName}
                        </a>
                    ))}
                </div>
            </Container>
        </div>
    );
}
