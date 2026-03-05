import { ChevronRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { COMPANY_INFO } from '../data/company';
import { Button } from './ui/Button';
import { Container } from './ui/Container';
import { FadeIn } from './ui/FadeIn';

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section ref={ref} id="inicio" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-950/95 via-gray-900/90 to-gray-900/60 z-10 pointer-events-none"></div>

      {/* Background Image */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1613214149922-f1809c99b414?q=80&w=2070&auto=format&fit=crop")',
          y
        }}
      />

      <Container className="relative z-20 text-white h-full flex flex-col justify-center">
        <div className="max-w-4xl">
          <FadeIn delay={0.1}>
            <div className="inline-block bg-primary/20 backdrop-blur-md px-6 py-2 rounded-full text-xs font-bold mb-8 tracking-[0.2em] uppercase border border-primary/30 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
              Especialistas em Engenharia Veicular
            </div>
          </FadeIn>

          <div className="overflow-hidden mb-8">
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight font-heading"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.05 } },
                hidden: {},
              }}
            >
              {"NÃO COMPRE UM CARRO".split(" ").map((word, i) => (
                <span key={i} className="inline-block whitespace-nowrap mr-4">
                  {word.split("").map((char, index) => (
                    <motion.span
                      key={index}
                      variants={{
                        hidden: { opacity: 0, y: 40, rotateX: -90 },
                        visible: { opacity: 1, y: 0, rotateX: 0 },
                      }}
                      transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              ))}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-300 to-slate-400">
                {"SEM SABER A VERDADE.".split(" ").map((word, i) => (
                  <span key={i} className="inline-block whitespace-nowrap mr-4 text-glow">
                    {word.split("").map((char, index) => (
                      <motion.span
                        key={index}
                        variants={{
                          hidden: { opacity: 0, y: 40, rotateX: -90 },
                          visible: { opacity: 1, y: 0, rotateX: 0 },
                        }}
                        transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1], delay: 0.5 + (i * 0.1) }}
                        className="inline-block"
                      >
                        {char}
                      </motion.span>
                    ))}
                  </span>
                ))}
              </span>
            </motion.h1>
          </div>

          <FadeIn delay={0.8}>
            <p className="text-lg md:text-xl mb-12 text-slate-300 font-light leading-relaxed max-w-2xl border-l-[3px] border-primary pl-8 py-2 bg-slate-900/40 backdrop-blur-sm rounded-r-lg">
              A <span className="font-bold text-white text-glow-sm">{COMPANY_INFO.name}</span> utiliza tecnologia avançada de análise estrutural para revelar o histórico oculto do seu futuro veículo.
            </p>
          </FadeIn>

          <FadeIn delay={1} className="flex flex-col sm:flex-row gap-6">
            <div onClick={() => window.dispatchEvent(new CustomEvent('open-whatsapp-popup'))} className="cursor-pointer">
              <Button size="lg" className="w-full sm:w-auto group bg-primary hover:bg-blue-600 shadow-[0_0_30px_rgba(59,130,246,0.4)] border-none">
                SOLICITAR AGENDAMENTO DIGITAL
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            <a href="#servicos">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-slate-700 hover:bg-slate-800/50 backdrop-blur-sm transition-all duration-500">
                VER SERVIÇOS TÉCNICOS
              </Button>
            </a>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
