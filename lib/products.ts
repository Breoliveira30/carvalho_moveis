export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  category: string
  images: string[]
  inStock: boolean
  isNew?: boolean
  materials?: string[]
  dimensions?: {
    width: number
    height: number
    depth: number
  }
  weight?: number
  colors?: string[]
}

export interface Category {
  id: string
  name: string
  slug: string
  image?: string
}

// Added missing promotion interface
export interface Promotion {
  id: string
  productId: string
  discount: number
  isActive: boolean
  startDate?: Date
  endDate?: Date
}

// Sample products data
const products: Product[] = [
  {
    id: "sofa-3-lugares-comfort",
    name: "Sofá 3 Lugares Comfort",
    description: "Sofá confortável de 3 lugares com estofado em tecido de alta qualidade. Perfeito para sala de estar.",
    price: 1299.99,
    originalPrice: 1599.99,
    category: "Sofás",
    images: [
      "/placeholder.svg?height=400&width=600&text=Sofá+3+Lugares",
      "/placeholder.svg?height=400&width=600&text=Sofá+Lateral",
      "/placeholder.svg?height=400&width=600&text=Sofá+Detalhe",
    ],
    inStock: true,
    isNew: true,
    materials: ["Tecido", "Espuma D33", "Madeira"],
    dimensions: { width: 200, height: 85, depth: 90 },
    weight: 45,
    colors: ["Cinza", "Bege", "Azul"],
  },
  {
    id: "mesa-jantar-madeira",
    name: "Mesa de Jantar em Madeira Maciça",
    description: "Mesa de jantar para 6 pessoas em madeira maciça com acabamento natural.",
    price: 899.99,
    category: "Mesas",
    images: [
      "/placeholder.svg?height=400&width=600&text=Mesa+Jantar",
      "/placeholder.svg?height=400&width=600&text=Mesa+Detalhe",
    ],
    inStock: true,
    materials: ["Madeira Maciça", "Verniz"],
    dimensions: { width: 160, height: 75, depth: 90 },
    weight: 35,
  },
  {
    id: "guarda-roupa-6-portas",
    name: "Guarda-Roupa 6 Portas",
    description: "Guarda-roupa espaçoso com 6 portas e gavetas internas. Ideal para quartos grandes.",
    price: 1899.99,
    originalPrice: 2299.99,
    category: "Guarda-Roupas",
    images: [
      "/placeholder.svg?height=400&width=600&text=Guarda-Roupa+6+Portas",
      "/placeholder.svg?height=400&width=600&text=Interior+Guarda-Roupa",
    ],
    inStock: true,
    materials: ["MDF", "Dobradiças Metálicas"],
    dimensions: { width: 270, height: 220, depth: 60 },
    weight: 80,
    colors: ["Branco", "Carvalho", "Preto"],
  },
  {
    id: "cadeira-escritorio-ergonomica",
    name: "Cadeira de Escritório Ergonômica",
    description: "Cadeira ergonômica com apoio lombar e regulagem de altura. Perfeita para home office.",
    price: 449.99,
    category: "Cadeiras",
    images: ["/placeholder.svg?height=400&width=600&text=Cadeira+Escritório"],
    inStock: false,
    materials: ["Tecido Mesh", "Metal", "Plástico"],
    dimensions: { width: 60, height: 120, depth: 60 },
    weight: 12,
  },
  {
    id: "estante-livros-5-prateleiras",
    name: "Estante para Livros 5 Prateleiras",
    description: "Estante moderna com 5 prateleiras ajustáveis. Ideal para organizar livros e decoração.",
    price: 329.99,
    category: "Estantes",
    images: ["/placeholder.svg?height=400&width=600&text=Estante+5+Prateleiras"],
    inStock: true,
    isNew: true,
    materials: ["MDP", "Fita de Borda"],
    dimensions: { width: 80, height: 180, depth: 30 },
    weight: 25,
  },
  {
    id: "cama-casal-box",
    name: "Cama Box Casal Premium",
    description: "Cama box casal com colchão de molas ensacadas e base reforçada. Máximo conforto para seu descanso.",
    price: 1599.99,
    category: "Camas",
    images: ["/placeholder.svg?height=400&width=600&text=Cama+Box+Casal"],
    inStock: true,
    materials: ["Madeira", "Molas Ensacadas", "Tecido"],
    dimensions: { width: 138, height: 60, depth: 188 },
    weight: 65,
    colors: ["Branco", "Cinza"],
  },
  {
    id: "sofa-2-lugares-moderno",
    name: "Sofá 2 Lugares Moderno",
    description: "Sofá compacto de 2 lugares com design contemporâneo. Ideal para apartamentos pequenos.",
    price: 899.99,
    originalPrice: 1199.99,
    category: "Sofás",
    images: ["/placeholder.svg?height=400&width=600&text=Sofá+2+Lugares"],
    inStock: true,
    materials: ["Tecido", "Espuma D28", "Madeira"],
    dimensions: { width: 140, height: 85, depth: 90 },
    weight: 35,
    colors: ["Azul", "Verde", "Cinza"],
  },
  {
    id: "mesa-centro-vidro",
    name: "Mesa de Centro em Vidro",
    description: "Mesa de centro moderna com tampo de vidro temperado e base em metal cromado.",
    price: 399.99,
    category: "Mesas",
    images: ["/placeholder.svg?height=400&width=600&text=Mesa+Centro+Vidro"],
    inStock: true,
    isNew: true,
    materials: ["Vidro Temperado", "Metal Cromado"],
    dimensions: { width: 100, height: 45, depth: 60 },
    weight: 18,
  },
]

const promotions: Promotion[] = [
  {
    id: "promo-sofa-comfort",
    productId: "sofa-3-lugares-comfort",
    discount: 18.8,
    isActive: true,
  },
  {
    id: "promo-guarda-roupa",
    productId: "guarda-roupa-6-portas",
    discount: 17.4,
    isActive: true,
  },
  {
    id: "promo-sofa-2-lugares",
    productId: "sofa-2-lugares-moderno",
    discount: 25.0,
    isActive: true,
  },
]

export const categories: Category[] = [
  { id: "sofas", name: "Sofás", slug: "sofas", image: "/images/categories/sofas.jpg" },
  { id: "mesas", name: "Mesas", slug: "mesas", image: "/images/categories/mesa1.webp" },
  { id: "cadeiras", name: "Cadeiras", slug: "cadeiras", image: "/images/categories/cadeira.webp" },
  { id: "guarda-roupas", name: "Guarda-Roupas", slug: "guarda-roupas" , image: "/images/categories/gurada_roupa.webp"},
  { id: "balcoes", name: "Balcões", slug: "balcoes" , image: "/images/categories/balcao.webp"},
  { id: "racks", name: "Racks", slug: "racks", image: "/images/categories/rack_sala.jpg" },
  { id: "camas", name: "Camas", slug: "camas", image: "/images/categories/cama_casal.jpg" },
]

export function getAllProducts(): Product[] {
  return products
}

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((product) => product.category === category)
}

export function getFeaturedProducts(): Product[] {
  // Return only products with promotions (originalPrice > price)
  return products.filter((product) => product.originalPrice && product.originalPrice > product.price)
}

export function getCategories(): string[] {
  return [...new Set(products.map((product) => product.category))]
}

export function searchProducts(query: string): Product[] {
  const lowercaseQuery = query.toLowerCase()
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery),
  )
}

export function getPromotionByProductId(productId: string): Promotion | undefined {
  return promotions.find((promotion) => promotion.productId === productId && promotion.isActive)
}
