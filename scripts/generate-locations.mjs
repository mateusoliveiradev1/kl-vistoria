import fs from 'fs';
import path from 'path';

// 🚀 SERVIÇOS EXPANDIDOS (Matriz de 1000+ páginas)
const services = [
    { term: 'Vistoria Cautelar', query: 'vistoria-cautelar' },
    { term: 'Vistoria Cautelar e Transferência', query: 'vistoria-cautelar-e-transferencia' },
    { term: 'Vistoria Pré-Compra', query: 'vistoria-pre-compra' },
    { term: 'Perícia Automotiva', query: 'pericia-automotiva' },
    { term: 'Laudo Cautelar Veicular', query: 'laudo-cautelar-veicular' },
    { term: 'Avaliação de Procedência', query: 'avaliacao-de-procedencia' },
    { term: 'Consultoria na Compra de Usados', query: 'consultoria-compra-usados' },
    { term: 'Perícia de Estrutura e Motor', query: 'pericia-estrutura-motor' },
];

// 🧬 MAPEAMENTO REGIONAL GIGANTE (126 LOCAIS x 8 SERVIÇOS = 1008 PÁGINAS)
const locations = [
    // --- GOIÂNIA (Pool Completo) ---
    { name: 'Setor Bueno', prep: 'no' }, { name: 'Setor Marista', prep: 'no' }, { name: 'Setor Oeste', prep: 'no' },
    { name: 'Setor Sul', prep: 'no' }, { name: 'Jardim Goiás', prep: 'no' }, { name: 'Alto da Glória', prep: 'no' },
    { name: 'Setor Pedro Ludovico', prep: 'no' }, { name: 'Parque Amazônia', prep: 'no' }, { name: 'Vila Nova', prep: 'na' },
    { name: 'Setor Universitário', prep: 'no' }, { name: 'Setor Campinas', prep: 'no' }, { name: 'Centro de Goiânia', prep: 'no' },
    { name: 'Vila Brasília', prep: 'na' }, { name: 'Setor Garavelo', prep: 'no' }, { name: 'Nova Suíça', prep: 'na' },
    { name: 'Jardim América', prep: 'no' }, { name: 'Setor Jaó', prep: 'no' }, { name: 'Goiânia 2', prep: 'no' },
    { name: 'Aldeia do Vale', prep: 'no' }, { name: 'Alphaville Flamboyant', prep: 'no' }, { name: 'Portal do Sol', prep: 'no' },
    { name: 'Jardins Paris', prep: 'nos' }, { name: 'Jardins Verona', prep: 'nos' }, { name: 'Jardins Atenas', prep: 'nos' },
    { name: 'Jardim Atlântico', prep: 'no' }, { name: 'Setor Bela Vista', prep: 'no' }, { name: 'Setor Sudoeste', prep: 'no' },
    { name: 'Parque Vaca Brava', prep: 'no' }, { name: 'Avenida T-63', prep: 'na' }, { name: 'Avenida 85', prep: 'na' },
    { name: 'Avenida Anhanguera', prep: 'na' }, { name: 'Setor Faiçalville', prep: 'no' }, { name: 'Vila Canaã', prep: 'na' },
    { name: 'Setor Coimbra', prep: 'no' }, { name: 'Setor Aeroporto', prep: 'no' }, { name: 'Cidade Jardim', prep: 'na' },
    { name: 'Parque das Laranjeiras', prep: 'no' }, { name: 'Residencial Eldorado', prep: 'no' }, { name: 'Vila Rosa', prep: 'na' },
    { name: 'Setor Negrão de Lima', prep: 'no' }, { name: 'Jardim Novo Mundo', prep: 'no' }, { name: 'Setor Santa Genoveva', prep: 'no' },
    { name: 'Morada do Sol', prep: 'na' }, { name: 'Jardim Balneário Meia Ponte', prep: 'no' }, { name: 'Setor Crimeia Leste', prep: 'no' },
    { name: 'Jardins Valência', prep: 'nos' }, { name: 'Jardins Munique', prep: 'nos' }, { name: 'Alphaville Cruzeiro', prep: 'no' },
    { name: 'Alphaville Araguaia', prep: 'no' }, { name: 'Alphaville Ipês', prep: 'no' }, { name: 'Condomínio Plateau dOr', prep: 'no' },
    { name: 'Bairro Feliz', prep: 'no' }, { name: 'Vila Jaraguá', prep: 'na' }, { name: 'Setor Canaã', prep: 'no' },
    { name: 'Jardim Cascavelle', prep: 'no' }, { name: 'Residencial Granville', prep: 'no' }, { name: 'Setor Rio Formoso', prep: 'no' },
    { name: 'Jardins Madri', prep: 'nos' }, { name: 'Jardins Lisboa', prep: 'nos' }, { name: 'Jardins Florença', prep: 'nos' },
    { name: 'Setor Gentil Meireles', prep: 'no' }, { name: 'Bairro Goiá', prep: 'no' }, { name: 'Setor João Braz', prep: 'no' },
    { name: 'Parque Industrial João Braz', prep: 'no' }, { name: 'Sudoeste', prep: 'no' }, { name: 'Jardim Curitiba', prep: 'no' },
    { name: 'Setor Capuava', prep: 'no' }, { name: 'Jardins Viena', prep: 'nos' }, { name: 'Jardins Mônaco', prep: 'nos' },
    { name: 'Vila Mutirão', prep: 'na' }, { name: 'Jardim Liberdade', prep: 'no' }, { name: 'Setor Perim', prep: 'no' },
    { name: 'Parque Tremendão', prep: 'no' }, { name: 'Setor Recanto do Bosque', prep: 'no' }, { name: 'Fazenda Caveirinha', prep: 'na' },
    { name: 'Setor Urias Magalhães', prep: 'no' }, { name: 'Vila Roriz', prep: 'na' }, { name: 'Jardim Guanabara', prep: 'no' },
    { name: 'Setor Central', prep: 'no' }, { name: 'Jardim Europa', prep: 'no' }, { name: 'Vila Mauá', prep: 'na' },
    { name: 'Jardim Planalto', prep: 'no' }, { name: 'Vila Alpes', prep: 'na' }, { name: 'Setor Solar Ville', prep: 'no' },
    { name: 'Jardins Ravena', prep: 'nos' }, { name: 'Jardins Capri', prep: 'nos' }, { name: 'Setor Santos Dumont', prep: 'no' },
    { name: 'Jardim do Cedro', prep: 'no' }, { name: 'Itaipu', prep: 'no' }, { name: 'Parque Oeste Industrial', prep: 'no' },
    { name: 'Jardim de Todos os Santos', prep: 'no' }, { name: 'Residencial Itaipu', prep: 'no' }, { name: 'Setor Grajaú', prep: 'no' },
    { name: 'Vila Concórdia', prep: 'na' }, { name: 'Setor Parque das Nações', prep: 'no' }, { name: 'Jardim Novo Mundo II', prep: 'no' },
    { name: 'Setor das Nações', prep: 'no' },

    // --- APARECIDA DE GOIÂNIA ---
    { name: 'Aparecida de Goiânia', prep: 'em' }, { name: 'Setor Colina Azul', prep: 'no' }, { name: 'Cidade Vera Cruz', prep: 'na' },
    { name: 'Jardim Helvécia', prep: 'no' }, { name: 'Jardim Buriti Sereno', prep: 'no' }, { name: 'Parque Industrial Aparecida', prep: 'no' },
    { name: 'Bairro Cardoso', prep: 'no' }, { name: 'Papillon Park', prep: 'no' }, { name: 'Vila Brasília Aparecida', prep: 'na' },
    { name: 'Jardim Luz', prep: 'no' }, { name: 'Setor Pontal Sul', prep: 'no' }, { name: 'Jardim Maria Inês', prep: 'no' },
    { name: 'Garavelo B', prep: 'no' }, { name: 'Parque das Nações Aparecida', prep: 'no' },

    // --- SENADOR CANEDO ---
    { name: 'Senador Canedo', prep: 'em' }, { name: 'Conjunto Uirapuru', prep: 'no' }, { name: 'Jardim das Oliveiras', prep: 'no' },
    { name: 'Vila Galvão', prep: 'na' }, { name: 'Residencial Flor do Ipê', prep: 'no' }, { name: 'Boulevard Senador Canedo', prep: 'no' },

    // --- TRINDADE ---
    { name: 'Trindade', prep: 'em' }, { name: 'Maysa', prep: 'na' }, { name: 'Setor Central de Trindade', prep: 'no' },
    { name: 'Jardim Imperial', prep: 'no' }, { name: 'Parque das Nações Trindade', prep: 'no' },

    // --- ANÁPOLIS ---
    { name: 'Anápolis', prep: 'em' }, { name: 'Jundiaí', prep: 'no' }, { name: 'Setor Central de Anápolis', prep: 'no' },
    { name: 'Bairro Jamil Abrão', prep: 'no' }, { name: 'Jaiara', prep: 'na' }, { name: 'Vila Formosa', prep: 'na' },
    { name: 'Bairro de Lourdes', prep: 'no' }, { name: 'Parque Brasília', prep: 'no' }, { name: 'Anápolis City', prep: 'em' },

    { name: 'Goiânia', prep: 'em' }
];

// 📸 POOL DE IMAGENS PREMIUM (Aumento para 40+)
const images = [
    'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=2070', 'https://images.unsplash.com/photo-1620002093398-8f16081af5ee?q=80&w=2070',
    'https://images.unsplash.com/photo-1722078260099-961a157a46d8?q=80&w=2070', 'https://images.unsplash.com/photo-1637763723578-79a4ca9225f7?q=80&w=2070',
    'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070', 'https://images.unsplash.com/photo-1600706432502-77a0e2e32771?q=80&w=2070',
    'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=2070', 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=2070',
    'https://images.unsplash.com/photo-1605553066446-8608e906a208?q=80&w=2070', 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070',
    'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2070', 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070',
    'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=2070', 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070',
    'https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=2070', 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=2070',
    'https://images.unsplash.com/photo-1517524008410-b4a165599813?q=80&w=2070', 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070',
    'https://images.unsplash.com/photo-1526726538690-5cbf95642cb4?q=80&w=2070', 'https://images.unsplash.com/photo-1493238544526-03710d946fb9?q=80&w=2070',
    'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=2070', 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070',
    'https://images.unsplash.com/photo-1469285994282-454ceb49e63c?q=80&w=2070', 'https://images.unsplash.com/photo-1532581291347-9c39cf10a73c?q=80&w=2070',
    'https://images.unsplash.com/photo-1542362567-b05503f3af15?q=80&w=2070', 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=2070',
    'https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=2070', 'https://images.unsplash.com/photo-1536700503339-1e4b06520771?q=80&w=2070'
];

const customerNames = [
    'João Silva', 'Marcos Almeida', 'Fernanda Costa', 'Roberto Souza', 'Mariana Oliveira', 'Carlos Mendes', 'Beatriz Lima', 'Rafael Santos',
    'Camila Rocha', 'Pedro Henrique', 'Ana Clara', 'Lucas Martins', 'Juliana Fernandes', 'Gabriel Soares', 'Larissa Mendes', 'Thiago Ribeiro',
    'Amanda Santos', 'Felipe Castro', 'Patrícia Borges', 'Daniela Meireles', 'Gustavo Vieira', 'Renata Lopes', 'Eduardo Lima', 'Simone Rocha',
    'Cláudio Pires', 'Marcela Gouvêa', 'Sérgio Machado', 'Tereza Souza', 'Bruno Alencar', 'Mônica Paiva'
];

function slugify(text) {
    return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, '-').replace(/[^a-z0-9-]/g, '');
}

const neighborhoodDetails = {
    'Setor Bueno': { ref: 'Parque Vaca Brava', vibe: 'área mais valorizada' },
    'Setor Marista': { ref: 'Alameda Ricardo Paranhos', vibe: 'topo do luxo em Goiânia' },
    'Setor Oeste': { ref: 'Praça Tamandaré', vibe: 'região empresarial clássica' },
    'Jardim Goiás': { ref: 'Shopping Flamboyant', vibe: 'coração vertical da capital' },
    'Setor Sul': { ref: 'Praça Cívica', vibe: 'polo histórico e administrativo' },
    'Jardim América': { ref: 'Avenida T-63', vibe: 'região mais estratégica' },
    'Setor Campinas': { ref: 'Matriz de Campinas', vibe: 'berço comercial goiano' },
    'Alphaville Flamboyant': { ref: 'Clube Alphaville', vibe: 'exclusividade total' },
    'Aldeia do Vale': { ref: 'BR-153', vibe: 'natureza integrada à cidade' },
    'Vila Canaã': { ref: 'região das peças', vibe: 'polo automotivo de Goiânia' },
    'Jundiaí': { ref: 'Parque Ipiranga', vibe: 'bairro mais nobre de Anápolis' },
};

// 💡 POOL DE DICAS DE ESPECIALISTAS (Marketing Invisível / Autoridade)
const expertTips = [
    "Dica do Perito: Sempre verifique se os parafusos do capô possuem marcas de chave, sinal claro de remoção para reparos estruturais.",
    "Sabia que a tonalidade da pintura original pode variar levemente entre plástico e metal? Nossos scanners identificam se essa variação é normal ou fruto de batida.",
    "Atenção ao histórico de leilão: Nem todo carro de leilão é ruim, mas a desvalorização é real. Nosso laudo traz o scoring completo do veículo.",
    "Dica Técnica: Vedantes de fábrica nas colunas possuem uma textura específica. Se estiverem lisos demais, o carro pode ter sofrido um capotamento maquiado.",
    "O câmbio automático exige atenção extra na pré-compra. Além da estrutura, avaliamos o fluido e o comportamento eletrônico da transmissão.",
    "Importante: Verifique sempre se as etiquetas de segurança dos cintos de segurança condizem com o ano de fabricação do veículo.",
    "Mito ou Verdade: Carro de único dono nem sempre é garantia de perfeição. A perícia técnica é a única prova real do estado do automóvel.",
];

// 💎 POOL DE SENTENÇAS GIGANTE (ULTRA-MIXER v2)
const introPool = [
    "Comprar um seminovo [PREP] [LOC] exige um laudo técnico inquestionável.",
    "A valorização de veículos perto de [REF] demanda segurança e procedência total.",
    "Não feche negócio [PREP] [LOC] sem antes descobrir a verdade oculta do carro.",
    "A [VIBE] [PREP] [LOC] é palco de negociações rápidas que pedem cautela.",
    "Segurança patrimonial é o pilar de uma boa compra veicular [PREP] [LOC].",
    "Garantir um bom negócio automotivo [PREP] [LOC] começa na perícia técnica.",
    "Para veículos de alto padrão perto de [REF], a exigência no laudo deve ser máxima.",
    "O mercado de usados [PREP] [LOC] esconde riscos que só um perito identifica.",
];

const bodyPool = [
    "Nossa [SERVICE] utiliza scanners térmicos e análise de estrutura para achar batidas.",
    "Realizamos a [SERVICE] completa, auditando chassi, motor e histórico de leilões.",
    "Nossa unidade móvel atende toda a região de [REF] com laudos entregues na hora.",
    "Com foco na integridade estrutural, a [SERVICE] analisa longarinas e colunas.",
    "Oferecemos a perícia mais detalhada de Goiás, testando mais de 120 itens vitais.",
    "Nossa equipe técnica [PREP] [LOC] é referência em diagnosticar recuperações de sinistro.",
    "A [SERVICE] da KL Vistorias foca em blindar o comprador contra fraudes e remarcações.",
    "Analisamos minuciosamente a originalidade de cada componente mecânico e estético.",
];

const conclusionPool = [
    "Proteja seu dinheiro contra golpes e revendas maquiadas com nossa expertise.",
    "Nosso laudo é o certificado oficial de tranquilidade para motoristas exigentes.",
    "Garantimos segurança total do pátio de carros até a sua garagem [PREP] [LOC].",
    "Não arrisque seu patrimônio; conte com a vistoria mais respeitada de Goiânia.",
    "Sua próxima conquista merece a transparência que só a KL Vistoria entrega.",
    "Blindamos sua negociação [PREP] [LOC] com um documento pericial definitivo.",
    "Fuja de dores de cabeça futuras escolhendo a melhor perícia técnica da região.",
    "Valorize seu seminovo com o selo de procedência que faz a diferença na revenda.",
];

// 💬 DEPOIMENTOS MASSIVOS
const testIntro = ["Serviço nota 10!", "Fiquei impressionado.", "Muito profissionais.", "Rápido e cirúrgico.", "Atendimento de elite."];
const testBody = [
    "O perito veio até aqui [PREP] [LOC] e achou uma repintura que eu não vi.",
    "A [SERVICE] me deu a paz de espírito para depositar o dinheiro do carro.",
    "Mesmo sendo [PREP] [LOC], o atendimento foi pontual e muito explicativo.",
    "O laudo digital chegou em minutos e é o mais completo que já recebi.",
    "Foram extremamente detalhistas na análise do chassi e histórico de leilão.",
];
const testWrap = ["Recomendo para todo mundo.", "Valeu cada real investido.", "Agora compro meu carro no [LOC] sem medo.", "Parceria para a vida toda.", "A melhor vistoria de Goiânia sem dúvidas."];

const generatedLocations = [];
let imgCounter = 0;
let nameCounter = 0;

function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

services.forEach(service => {
    locations.forEach((loc, idx) => {
        const details = neighborhoodDetails[loc.name] || { ref: 'pontos estratégicos', vibe: 'região de grande fluxo' };

        // BILHÕES DE COMBINAÇÕES (MIXER v2)
        const finalParagraph = `${getRandom(introPool)} ${getRandom(bodyPool)} ${getRandom(conclusionPool)}`
            .replace(/\[PREP\]/g, loc.prep).replace(/\[LOC\]/g, loc.name).replace(/\[REF\]/g, details.ref)
            .replace(/\[SERVICE\]/g, service.term).replace(/\[VIBE\]/g, details.vibe);

        const finalTestimonial = `${getRandom(testIntro)} ${getRandom(testBody)} ${getRandom(testWrap)}`
            .replace(/\[PREP\]/g, loc.prep).replace(/\[LOC\]/g, loc.name).replace(/\[REF\]/g, details.ref)
            .replace(/\[SERVICE\]/g, service.term);

        const rating = (4.8 + Math.random() * 0.2).toFixed(1);

        generatedLocations.push({
            slug: service.query + "-" + loc.prep + "-" + slugify(loc.name),
            cityName: loc.name,
            preposition: loc.prep,
            serviceNameOriginal: service.term,
            shortDescription: `Agende sua ${service.term} ${loc.prep} ${loc.name}. Perícia técnica com laudo 100% garantido e atendimento móvel em toda a região de Goiânia.`,
            uniqueParagraph: finalParagraph,
            heroImage: images[imgCounter % images.length],
            expertTip: getRandom(expertTips), // Nova Propriedade de Autoridade
            localTestimonial: {
                name: customerNames[nameCounter % customerNames.length],
                text: finalTestimonial,
                rating: parseFloat(rating)
            }
        });

        imgCounter++;
        nameCounter++;
    });
});

const content = "export interface ServiceLocation {\n" +
    "    slug: string;\n" +
    "    cityName: string;\n" +
    "    preposition: string;\n" +
    "    serviceNameOriginal?: string;\n" +
    "    shortDescription: string;\n" +
    "    uniqueParagraph: string;\n" +
    "    heroImage: string;\n" +
    "    expertTip?: string;\n" + // Interface atualizada
    "    localTestimonial: {\n" +
    "        name: string;\n" +
    "        text: string;\n" +
    "        rating: number;\n" +
    "    };\n" +
    "}\n\n" +
    "export const serviceLocations: ServiceLocation[] = " + JSON.stringify(generatedLocations, null, 4) + ";\n";

fs.writeFileSync(path.join(process.cwd(), 'src/data/locations.ts'), content, 'utf8');
console.log(`🚀 IMPACTO TOTAL: ${generatedLocations.length} nós pSEO gerados. Dominação regional completa!`);
