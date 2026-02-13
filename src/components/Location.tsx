import { MapPin, Phone, Mail } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';
import { Section } from './ui/Section';
import { Container } from './ui/Container';
import { FadeIn } from './ui/FadeIn';
import { Image } from './ui/Image';

const Location = () => {
  return (
    <Section id="localizacao" className="bg-gray-50">
      <Container>
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-6">Nossa Localização</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Venha nos visitar e conhecer nossa estrutura preparada para atender você.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch h-full">
          
          {/* Contact Info Card */}
          <FadeIn direction="left" delay={0.1}>
            <div className="bg-white p-10 rounded-2xl shadow-xl flex flex-col justify-center h-full">
              <h3 className="text-2xl font-bold text-primary mb-8">Fale Conosco</h3>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-full shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-lg">Endereço</h4>
                    <p className="text-gray-600 mt-1">
                      {COMPANY_INFO.address.street}, {COMPANY_INFO.address.number} <br />
                      {COMPANY_INFO.address.neighborhood} - {COMPANY_INFO.address.city} - {COMPANY_INFO.address.state}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-full shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-lg">Telefone</h4>
                    <p className="text-gray-600 mt-1">{COMPANY_INFO.contact.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-full shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-lg">E-mail</h4>
                    <p className="text-gray-600 mt-1">{COMPANY_INFO.contact.email}</p>
                  </div>
                </div>
              </div>

              <a 
                href={COMPANY_INFO.contact.phoneLink}
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-10 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-green-200 text-center transform hover:-translate-y-1 block w-full"
              >
                Falar no WhatsApp
              </a>
            </div>
          </FadeIn>

          {/* Photo Card */}
          <FadeIn delay={0.2} direction="up">
            <div className="relative rounded-2xl overflow-hidden shadow-xl h-full min-h-[400px]">
              <Image 
                src="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=2070&auto=format&fit=crop" 
                alt="Atendimento KL Vistorias" 
                className="h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end p-8 pointer-events-none">
                <div className="text-white">
                  <p className="font-bold text-xl mb-2">Atendimento Agilizado</p>
                  <p className="text-gray-200">Localização estratégica para facilitar o seu acesso e garantir rapidez na vistoria.</p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Map Card */}
          <FadeIn delay={0.3} direction="right">
            <div className="rounded-2xl overflow-hidden shadow-xl h-full min-h-[400px] bg-gray-200">
              <iframe 
                src={COMPANY_INFO.address.googleMapsEmbed}
                width="100%" 
                height="100%" 
                style={{ border: 0, minHeight: '100%' }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa de Localização"
              ></iframe>
            </div>
          </FadeIn>

        </div>
      </Container>
    </Section>
  );
};

export default Location;
