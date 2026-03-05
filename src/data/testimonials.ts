export interface Testimonial {
    name: string;
    role: string;
    content: string;
    rating: number;
    avatar: string;
}

// 📝 ADICIONE SEUS DEPOIMENTOS REAIS AQUI
// Se o array estiver vazio [], a seção desaparece automaticamente do site.
export const TESTIMONIALS: Testimonial[] = [
    /* 
    {
      name: "Nome do Cliente",
      role: "Modelo do Carro",
      content: "Texto do depoimento...",
      rating: 5,
      avatar: "https://link-da-foto.com"
    }
    */
];
