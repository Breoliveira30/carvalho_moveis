// Arquivo centralizado com todos os dados dos produtos
// Facilita a adição de novos produtos e manutenção

import {
  getProductsWithPromotions,
  getProductWithPromotion,
  getProductsByCategory as getProductsByCategoryFromDB,
} from "./supabase"

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
  promotion?: {
    id: string
    discount_percentage: number
    start_date: string
    end_date: string
  }
  discounted_price?: string
  has_promotion: boolean
}

// Categorias disponíveis
export const categories = ["Sofás", "Mesas", "Camas", "Racks", "Guarda-roupas"]

// Função para obter produtos por categoria (com promoções aplicadas)
export async function getProductsByCategory(category: string): Promise<Product[]> {
  try {
    const products = await getProductsByCategoryFromDB(category)
    return products.map((product) => ({
      ...product,
      detailedDescription: product.detailed_description,
    }))
  } catch (error) {
    console.error("Erro ao buscar produtos por categoria:", error)
    return []
  }
}

// Função para obter todos os produtos (com promoções aplicadas)
export async function getAllProducts(): Promise<Product[]> {
  try {
    const products = await getProductsWithPromotions()
    return products.map((product) => ({
      ...product,
      detailedDescription: product.detailed_description,
    }))
  } catch (error) {
    console.error("Erro ao buscar todos os produtos:", error)
    return []
  }
}

// Função para obter produto por ID (com promoção aplicada)
export async function getProductById(id: string): Promise<Product | null> {
  try {
    const product = await getProductWithPromotion(id)
    if (!product) return null

    return {
      ...product,
      detailedDescription: product.detailed_description,
    }
  } catch (error) {
    console.error("Erro ao buscar produto por ID:", error)
    return null
  }
}
