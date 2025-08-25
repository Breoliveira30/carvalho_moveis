// Dados estáticos dos produtos - gerenciados manualmente no código
export interface Product {
  id: string
  name: string
  description: string
  price: string
  original_price?: string
  images: string[]
  category: string
  materials: string[]
  dimensions: {
    largura: string
    profundidade: string
    altura: string
    peso: string
  }
  features: string[]
  detailedDescription: string
  has_promotion?: boolean
  promotion?: {
    discount_percentage: number
    start_date: string
    end_date: string
  }
  discounted_price?: string
}

// Lista de categorias disponíveis
export const categories = ["Sofás", "Mesas", "Camas", "Balcões", "Racks", "Guarda-roupas"]

// Função para calcular preço com desconto
function calculateDiscountedPrice(price: string, discountPercentage: number): string {
  const numPrice = Number.parseFloat(price.replace(".", "").replace(",", "."))
  const discountedPrice = numPrice * (1 - discountPercentage / 100)
  return discountedPrice.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

// Função para verificar se uma promoção está ativa
function isPromotionActive(promotion: { start_date: string; end_date: string }): boolean {
  const now = new Date()
  const startDate = new Date(promotion.start_date)
  const endDate = new Date(promotion.end_date)
  return now >= startDate && now <= endDate
}

// PRODUTOS - Adicione, edite ou remova produtos aqui
const productsData: Product[] = [
  {
    id: "sofa-reclinavel-premium",
    name: "Sofá Reclinável Premium",
    description: "Sofá de 3 lugares com sistema de reclinação elétrica e couro sintético de alta qualidade.",
    price: "2.890,00",
    images: [
      "/images/products/sofa-reclinavel-1.jpg",
      "/images/products/sofa-reclinavel-2.jpg",
      "/images/products/sofa-reclinavel-3.jpg",
    ],
    category: "Sofás",
    materials: ["Couro sintético premium", "Estrutura em madeira maciça", "Espuma D33"],
    dimensions: {
      largura: "210cm",
      profundidade: "95cm",
      altura: "102cm",
      peso: "85kg",
    },
    features: [
      "Sistema de reclinação elétrica",
      "Couro sintético resistente",
      "Estrutura reforçada",
      "Espuma de alta densidade",
      "Design ergonômico",
    ],
    detailedDescription: `Este sofá reclinável premium oferece o máximo em conforto e elegância. 
    Com sistema de reclinação elétrica, permite ajustar a posição ideal para relaxamento. 
    O revestimento em couro sintético de alta qualidade garante durabilidade e facilidade de limpeza. 
    A estrutura em madeira maciça proporciona estabilidade e resistência por muitos anos.`,
    // Exemplo de promoção ativa
    has_promotion: true,
    promotion: {
      discount_percentage: 15,
      start_date: "2024-01-01",
      end_date: "2024-12-31",
    },
  },
  {
    id: "mesa-jantar-rustica",
    name: "Mesa de Jantar Rústica",
    description: "Mesa de jantar para 6 pessoas em madeira maciça com acabamento rústico.",
    price: "1.450,00",
    images: ["/images/products/mesa-jantar-1.jpg", "/images/products/mesa-jantar-2.jpg"],
    category: "Mesas",
    materials: ["Madeira de eucalipto maciça", "Verniz fosco", "Pés torneados"],
    dimensions: {
      largura: "160cm",
      profundidade: "90cm",
      altura: "78cm",
      peso: "45kg",
    },
    features: [
      "Madeira maciça de eucalipto",
      "Acabamento rústico",
      "Capacidade para 6 pessoas",
      "Pés torneados artesanais",
      "Verniz resistente",
    ],
    detailedDescription: `Mesa de jantar confeccionada em madeira maciça de eucalipto, 
    com acabamento rústico que valoriza a textura natural da madeira. 
    Os pés torneados artesanalmente conferem charme e personalidade à peça. 
    Ideal para reunir família e amigos em momentos especiais.`,
  },
  {
    id: "cama-box-casal",
    name: "Cama Box Casal Confort",
    description: "Cama box casal com colchão de molas ensacadas e base reforçada.",
    price: "1.890,00",
    images: ["/images/products/cama-box-1.jpg", "/images/products/cama-box-2.jpg"],
    category: "Camas",
    materials: ["Base em MDF", "Colchão de molas ensacadas", "Tecido suede"],
    dimensions: {
      largura: "138cm",
      profundidade: "188cm",
      altura: "58cm",
      peso: "65kg",
    },
    features: [
      "Colchão de molas ensacadas",
      "Base box reforçada",
      "Tecido suede resistente",
      "Conforto ortopédico",
      "Garantia de 5 anos",
    ],
    detailedDescription: `Cama box casal que combina conforto e qualidade. 
    O colchão com molas ensacadas proporciona suporte individualizado, 
    reduzindo a transferência de movimento. A base box reforçada garante 
    durabilidade e estabilidade. Revestimento em tecido suede de alta qualidade.`,
    // Exemplo de promoção com desconto maior
    has_promotion: true,
    promotion: {
      discount_percentage: 25,
      start_date: "2024-01-15",
      end_date: "2024-03-15",
    },
  },
  {
    id: "rack-tv-moderno",
    name: "Rack para TV Moderno",
    description: "Rack suspenso para TV até 65 polegadas com design moderno e clean.",
    price: "680,00",
    images: ["/images/products/rack-tv-1.jpg", "/images/products/rack-tv-2.jpg"],
    category: "Racks",
    materials: ["MDF de alta densidade", "Laminado melamínico", "Ferragens ocultas"],
    dimensions: {
      largura: "180cm",
      profundidade: "35cm",
      altura: "40cm",
      peso: "28kg",
    },
    features: [
      'Suporte para TV até 65"',
      "Design suspenso moderno",
      "Compartimentos organizados",
      "Passagem de cabos",
      "Instalação na parede",
    ],
    detailedDescription: `Rack suspenso com design moderno e funcional. 
    Comporta TVs de até 65 polegadas e oferece compartimentos organizados 
    para equipamentos eletrônicos. O sistema de passagem de cabos mantém 
    a organização. Instalação na parede para otimizar o espaço.`,
  },
  {
    id: "guarda-roupa-6-portas",
    name: "Guarda-roupa 6 Portas",
    description: "Guarda-roupa espaçoso com 6 portas, gavetas e espelho.",
    price: "2.340,00",
    images: ["/images/products/guarda-roupa-1.jpg", "/images/products/guarda-roupa-2.jpg"],
    category: "Guarda-roupas",
    materials: ["MDF de 15mm", "Corrediças telescópicas", "Espelho cristal"],
    dimensions: {
      largura: "270cm",
      profundidade: "58cm",
      altura: "220cm",
      peso: "120kg",
    },
    features: [
      "6 portas com espelho",
      "Gavetas com corrediças telescópicas",
      "Divisórias internas ajustáveis",
      "Cabideiros em aço",
      "Pés reguláveis",
    ],
    detailedDescription: `Guarda-roupa amplo e funcional com 6 portas e espelho. 
    Oferece máximo aproveitamento do espaço com divisórias internas ajustáveis, 
    gavetas com corrediças telescópicas e cabideiros resistentes. 
    O espelho cristal adiciona elegância e funcionalidade ao ambiente.`,
    // Promoção expirada (exemplo)
    has_promotion: true,
    promotion: {
      discount_percentage: 10,
      start_date: "2023-12-01",
      end_date: "2023-12-31",
    },
  },
]

// Processar produtos com promoções
function processProductsWithPromotions(): Product[] {
  return productsData.map((product) => {
    if (product.has_promotion && product.promotion) {
      const isActive = isPromotionActive(product.promotion)

      if (isActive) {
        return {
          ...product,
          has_promotion: true,
          original_price: product.price,
          discounted_price: calculateDiscountedPrice(product.price, product.promotion.discount_percentage),
        }
      }
    }

    return {
      ...product,
      has_promotion: false,
    }
  })
}

// Funções públicas para usar nos componentes
export async function getAllProducts(): Promise<Product[]> {
  // Simular delay de API para manter compatibilidade
  await new Promise((resolve) => setTimeout(resolve, 100))
  return processProductsWithPromotions()
}

export async function getProductById(id: string): Promise<Product | null> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  const products = processProductsWithPromotions()
  const decodedId = decodeURIComponent(id)
  return products.find((product) => product.id === decodedId) || null
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  const products = processProductsWithPromotions()
  return products.filter((product) => product.category === category)
}

// Função para obter produtos em promoção
export async function getProductsOnSale(): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  const products = processProductsWithPromotions()
  return products.filter((product) => product.has_promotion)
}

// Função para buscar produtos
export async function searchProducts(query: string): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  const products = processProductsWithPromotions()
  const searchTerm = query.toLowerCase()

  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm),
  )
}
