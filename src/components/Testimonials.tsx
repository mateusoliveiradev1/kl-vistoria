import { useEffect, useState } from 'react';
import { Quote, Star } from 'lucide-react';
import { Section } from './ui/Section';
import { Container } from './ui/Container';
import { FadeIn } from './ui/FadeIn';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar?: string;
}

interface ReviewResponse {
  author_name: string | null;
  rating: string | number | null;
  comment: string | null;
  source: string | null;
}

const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    name: 'Cliente KL',
    role: 'Compra de seminovo',
    content:
      'A vistoria mostrou detalhes que eu nao tinha visto na loja. Usei o laudo para renegociar antes de fechar.',
    rating: 5,
  },
  {
    name: 'Motorista em Goiania',
    role: 'Vistoria cautelar',
    content:
      'Atendimento direto pelo WhatsApp e a equipe foi ate onde o carro estava. Foi decisivo para comprar com seguranca.',
    rating: 5,
  },
  {
    name: 'Revenda parceira',
    role: 'Laudo para negociacao',
    content:
      'O processo deixou comprador e vendedor mais tranquilos. A clareza tecnica ajudou a evitar discussao.',
    rating: 5,
  },
];

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(FALLBACK_TESTIMONIALS);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/reviews');
        if (!response.ok) return;

        const data = (await response.json()) as { reviews?: ReviewResponse[] };
        const reviews = (data.reviews || [])
          .filter((review) => review.comment)
          .map((review) => ({
            name: review.author_name || 'Cliente KL',
            role: review.source === 'google' ? 'Avaliacao no Google' : 'Cliente verificado',
            content: review.comment || '',
            rating: Math.max(1, Math.min(5, Math.round(Number(review.rating) || 5))),
          }));

        if (reviews.length > 0) {
          setTestimonials(reviews);
        }
      } catch (error) {
        console.error('Erro ao carregar depoimentos:', error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <Section id="depoimentos" className="relative overflow-hidden bg-[#0B111A]">
      <Container className="relative z-10">
        <FadeIn className="mb-12 grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-primary">
              Prova social
            </p>
            <h2 className="text-4xl font-extrabold leading-tight text-white md:text-5xl">
              A melhor negociacao e a que voce entende antes de pagar.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-slate-300">
            Depoimentos reforcam o ponto principal: a vistoria ajuda a comprar com informacao, nao com achismo.
          </p>
        </FadeIn>

        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <FadeIn key={`${item.name}-${index}`} delay={index * 0.1} direction="up">
              <article className="flex h-full flex-col rounded-lg border border-white/10 bg-[#111827] p-6 transition hover:border-primary/40">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex gap-1">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <Quote className="h-8 w-8 text-primary/25" />
                </div>

                <p className="flex-1 text-base leading-8 text-slate-200">"{item.content}"</p>

                <div className="mt-7 border-t border-white/10 pt-5">
                  <h4 className="font-bold text-white">{item.name}</h4>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">{item.role}</p>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
