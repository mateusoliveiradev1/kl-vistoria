import { useState, useEffect } from 'react';
import { Star, Quote, ExternalLink, Loader2 } from 'lucide-react';
import { Section } from './ui/Section';
import { Container } from './ui/Container';
import { FadeIn } from './ui/FadeIn';
import { Image } from './ui/Image';

interface Testimonial {
    name: string;
    role: string;
    content: string;
    rating: number;
    avatar: string;
}

const SCRIPT_URL = 'SUA_NOVA_URL_AQUI'; // O usuário deve colar a URL da implantação aqui

export default function Testimonials() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            if (SCRIPT_URL === 'SUA_NOVA_URL_AQUI') {
                setLoading(false);
                return;
            }
            try {
                const response = await fetch(SCRIPT_URL);
                const data = await response.json();
                setTestimonials(data);
            } catch (error) {
                console.error('Erro ao carregar depoimentos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, []);

    if (loading) return (
        <Section className="bg-slate-900 flex justify-center py-20">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </Section>
    );

    if (testimonials.length === 0) return null;

    return (
        <Section id="depoimentos" className="bg-slate-900 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-20 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[120px] animate-blob"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>
            </div>

            <Container className="relative z-10">
                <FadeIn className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Quem já protegeu seu patrimônio conosco
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Confira o que nossos clientes em Goiânia estão dizendo sobre a <span className="text-primary font-bold">KL Vistorias</span>.
                    </p>
                </FadeIn>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((item, index) => (
                        <FadeIn key={index} delay={index * 0.2} direction="up">
                            <div className="glass-card p-8 rounded-3xl h-full flex flex-col relative group transition-all duration-500 hover:-translate-y-2">
                                <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/10 group-hover:text-primary/20 transition-colors" />

                                <div className="flex gap-1 mb-6">
                                    {[...Array(item.rating)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                                    ))}
                                </div>

                                <p className="text-gray-300 italic mb-8 flex-grow leading-relaxed">
                                    "{item.content}"
                                </p>

                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-2xl overflow-hidden ring-2 ring-primary/20 group-hover:ring-primary/50 transition-all">
                                        <Image
                                            src={item.avatar}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold">{item.name}</h4>
                                        <p className="text-slate-500 text-xs uppercase tracking-widest">{item.role}</p>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>

                <FadeIn className="text-center mt-12">
                    <a
                        href="#" // GMB link placeholder
                        className="inline-flex items-center gap-2 text-primary hover:text-blue-400 font-bold transition-all group"
                    >
                        <span>Ver todas as avaliações no Google Maps</span>
                        <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </a>
                </FadeIn>
            </Container>
        </Section>
    );
}
