import { createClient } from "@supabase/supabase-js"

// Credenciais do Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://azeksdmwqvzcsaegilce.supabase.co"
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6ZWtzZG13cXZ6Y3NhZWdpbGNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwOTczMjEsImV4cCI6MjA2NTY3MzMyMX0.AyjRPgdW2dZWP0eORU72wic2roy6Ikw4Qf7euRhAWMI"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para o banco de dados
export interface Product {
  id: string
  name: string
  description: string
  price: string
  original_price?: string // Para mostrar preço original quando há promoção
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
  detailed_description: string
  created_at?: string
  updated_at?: string
}

export interface Promotion {
  id: string
  product_id: string
  discount_percentage: number
  start_date: string
  end_date: string
  is_active: boolean
  created_at?: string
}

// Interface para produto com promoção aplicada
export interface ProductWithPromotion extends Product {
  promotion?: Promotion
  discounted_price?: string
  has_promotion: boolean
}

// Função para testar conexão com o banco
export async function testDatabaseConnection(): Promise<{ success: boolean; message: string }> {
  try {
    console.log("🔍 Testando conexão com banco de dados...")
    console.log("🔗 URL:", supabaseUrl)

    const { data, error } = await supabase.from("products").select("count", { count: "exact", head: true })

    if (error) {
      console.error("❌ Erro na conexão:", error.message)
      return {
        success: false,
        message: `❌ Erro na conexão: ${error.message}`,
      }
    }

    console.log("✅ Conexão com banco OK")
    return {
      success: true,
      message: "✅ Conexão com banco de dados OK!",
    }
  } catch (error) {
    console.error("❌ Erro ao testar conexão:", error)
    return {
      success: false,
      message: `❌ Erro ao testar conexão: ${error}`,
    }
  }
}

// Função para testar conexão com storage
export async function testStorageConnection(): Promise<{ success: boolean; message: string }> {
  try {
    console.log("🔍 Testando conexão com storage...")

    const { data, error } = await supabase.storage.from("product-images").list("products", { limit: 1 })

    if (error) {
      console.error("❌ Erro no storage:", error.message)
      return {
        success: false,
        message: `❌ Storage não configurado: ${error.message}`,
      }
    }

    console.log("✅ Storage funcionando")
    return {
      success: true,
      message: "✅ Storage configurado e funcionando!",
    }
  } catch (error) {
    console.error("❌ Erro ao testar storage:", error)
    return {
      success: false,
      message: `❌ Erro no storage: ${error}`,
    }
  }
}

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
function isPromotionActive(promotion: Promotion): boolean {
  const now = new Date()
  const startDate = new Date(promotion.start_date)
  const endDate = new Date(promotion.end_date)
  return promotion.is_active && now >= startDate && now <= endDate
}

// Funções para produtos com promoções aplicadas
export async function getProductsWithPromotions(): Promise<ProductWithPromotion[]> {
  try {
    console.log("🔍 Buscando produtos com promoções...")

    // Buscar produtos ativos
    const { data: products, error: productsError } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false })

    if (productsError) {
      console.error("❌ Erro ao buscar produtos:", productsError.message)
      return []
    }

    // Buscar promoções ativas
    const { data: promotions, error: promotionsError } = await supabase
      .from("promotions")
      .select("*")
      .eq("is_active", true)

    if (promotionsError) {
      console.error("❌ Erro ao buscar promoções:", promotionsError.message)
      return products?.map((product) => ({ ...product, has_promotion: false })) || []
    }

    // Combinar produtos com suas promoções
    const productsWithPromotions: ProductWithPromotion[] =
      products?.map((product) => {
        const activePromotion = promotions?.find((promo) => promo.product_id === product.id && isPromotionActive(promo))

        if (activePromotion) {
          return {
            ...product,
            promotion: activePromotion,
            original_price: product.price,
            discounted_price: calculateDiscountedPrice(product.price, activePromotion.discount_percentage),
            has_promotion: true,
          }
        }

        return {
          ...product,
          has_promotion: false,
        }
      }) || []

    console.log(`✅ ${productsWithPromotions.length} produtos encontrados`)
    return productsWithPromotions
  } catch (error) {
    console.error("❌ Erro ao buscar produtos:", error)
    return []
  }
}

export async function getProductWithPromotion(id: string): Promise<ProductWithPromotion | null> {
  try {
    console.log("🔍 Buscando produto:", id)

    const decodedId = decodeURIComponent(id)

    // Buscar produto
    const { data: product, error: productError } = await supabase
      .from("products")
      .select("*")
      .eq("id", decodedId)
      .maybeSingle()

    if (productError || !product) {
      console.error("❌ Erro ao buscar produto:", productError?.message)
      return null
    }

    // Buscar promoção ativa para este produto
    const { data: promotions, error: promotionError } = await supabase
      .from("promotions")
      .select("*")
      .eq("product_id", product.id)
      .eq("is_active", true)

    if (promotionError) {
      console.error("❌ Erro ao buscar promoção:", promotionError.message)
      return { ...product, has_promotion: false }
    }

    const activePromotion = promotions?.find((promo) => isPromotionActive(promo))

    if (activePromotion) {
      return {
        ...product,
        promotion: activePromotion,
        original_price: product.price,
        discounted_price: calculateDiscountedPrice(product.price, activePromotion.discount_percentage),
        has_promotion: true,
      }
    }

    return {
      ...product,
      has_promotion: false,
    }
  } catch (error) {
    console.error("❌ Erro ao buscar produto:", error)
    return null
  }
}

export async function getProductsByCategory(category: string): Promise<ProductWithPromotion[]> {
  try {
    const allProducts = await getProductsWithPromotions()
    return allProducts.filter((product) => product.category === category)
  } catch (error) {
    console.error("❌ Erro ao buscar produtos por categoria:", error)
    return []
  }
}

// Funções CRUD para produtos (Admin)
export async function getProducts(): Promise<Product[]> {
  try {
    console.log("🔍 Buscando todos os produtos (admin)...")
    const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("❌ Erro ao buscar produtos:", error.message)
      throw new Error(`Erro ao buscar produtos: ${error.message}`)
    }

    console.log(`✅ ${data?.length || 0} produtos encontrados`)
    return data || []
  } catch (error) {
    console.error("❌ Erro ao buscar produtos:", error)
    return []
  }
}

export async function getProduct(id: string): Promise<Product | null> {
  try {
    console.log("🔍 Buscando produto (admin):", id)
    const decodedId = decodeURIComponent(id)
    const { data, error } = await supabase.from("products").select("*").eq("id", decodedId).maybeSingle()

    if (error) {
      console.error("❌ Erro ao buscar produto:", error.message)
      return null
    }

    console.log(data ? "✅ Produto encontrado" : "⚠️ Produto não encontrado")
    return data
  } catch (error) {
    console.error("❌ Erro ao buscar produto:", error)
    return null
  }
}

export async function createProduct(product: Omit<Product, "created_at" | "updated_at">): Promise<Product | null> {
  try {
    console.log("🔄 Criando produto:", product.name)

    // Gerar ID único se não fornecido
    if (!product.id) {
      const cleanId = `${product.category.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${Date.now()}`
      product.id = cleanId
    }

    const { data, error } = await supabase.from("products").insert([product]).select().single()

    if (error) {
      console.error("❌ Erro ao criar produto:", error.message)
      throw new Error(`Erro ao criar produto: ${error.message}`)
    }

    console.log("✅ Produto criado com sucesso:", data.id)
    return data
  } catch (error) {
    console.error("❌ Erro ao criar produto:", error)
    throw error
  }
}

export async function updateProduct(id: string, product: Partial<Product>): Promise<Product | null> {
  try {
    console.log("🔄 Atualizando produto:", id)
    const decodedId = decodeURIComponent(id)

    const { data, error } = await supabase
      .from("products")
      .update({ ...product, updated_at: new Date().toISOString() })
      .eq("id", decodedId)
      .select()
      .maybeSingle()

    if (error) {
      console.error("❌ Erro ao atualizar produto:", error.message)
      throw new Error(`Erro ao atualizar produto: ${error.message}`)
    }

    console.log("✅ Produto atualizado com sucesso")
    return data
  } catch (error) {
    console.error("❌ Erro ao atualizar produto:", error)
    throw error
  }
}

export async function deleteProduct(id: string): Promise<boolean> {
  try {
    console.log("🗑️ Deletando produto:", id)

    // Delete real do produto
    const { error } = await supabase.from("products").delete().eq("id", id)

    if (error) {
      console.error("❌ Erro ao deletar produto:", error.message)
      return false
    }

    console.log("✅ Produto deletado com sucesso")
    return true
  } catch (error) {
    console.error("❌ Erro ao deletar produto:", error)
    return false
  }
}

// Funções para promoções
export async function getPromotions(): Promise<Promotion[]> {
  try {
    console.log("🔍 Buscando promoções...")
    const { data, error } = await supabase.from("promotions").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("❌ Erro ao buscar promoções:", error.message)
      return []
    }

    console.log(`✅ ${data?.length || 0} promoções encontradas`)
    return data || []
  } catch (error) {
    console.error("❌ Erro ao buscar promoções:", error)
    return []
  }
}

export async function getActivePromotions(): Promise<Promotion[]> {
  try {
    const now = new Date().toISOString()
    const { data, error } = await supabase
      .from("promotions")
      .select("*")
      .eq("is_active", true)
      .lte("start_date", now)
      .gte("end_date", now)

    if (error) {
      console.error("❌ Erro ao buscar promoções ativas:", error.message)
      return []
    }

    return data || []
  } catch (error) {
    console.error("❌ Erro ao buscar promoções ativas:", error)
    return []
  }
}

export async function createPromotion(promotion: Omit<Promotion, "id" | "created_at">): Promise<Promotion | null> {
  try {
    console.log("🔄 Criando promoção...")
    const { data, error } = await supabase.from("promotions").insert([promotion]).select().single()

    if (error) {
      console.error("❌ Erro ao criar promoção:", error.message)
      throw new Error(`Erro ao criar promoção: ${error.message}`)
    }

    console.log("✅ Promoção criada com sucesso")
    return data
  } catch (error) {
    console.error("❌ Erro ao criar promoção:", error)
    throw error
  }
}

export async function updatePromotion(id: string, promotion: Partial<Promotion>): Promise<Promotion | null> {
  try {
    console.log("🔄 Atualizando promoção:", id)
    const { data, error } = await supabase.from("promotions").update(promotion).eq("id", id).select().single()

    if (error) {
      console.error("❌ Erro ao atualizar promoção:", error.message)
      throw new Error(`Erro ao atualizar promoção: ${error.message}`)
    }

    console.log("✅ Promoção atualizada com sucesso")
    return data
  } catch (error) {
    console.error("❌ Erro ao atualizar promoção:", error)
    throw error
  }
}

export async function deletePromotion(id: string): Promise<boolean> {
  try {
    console.log("🗑️ Deletando promoção:", id)
    const { error } = await supabase.from("promotions").delete().eq("id", id)

    if (error) {
      console.error("❌ Erro ao deletar promoção:", error.message)
      return false
    }

    console.log("✅ Promoção deletada com sucesso")
    return true
  } catch (error) {
    console.error("❌ Erro ao deletar promoção:", error)
    return false
  }
}

// Funções para storage de imagens
export async function uploadImage(file: File, path: string): Promise<string | null> {
  try {
    console.log("📤 Iniciando upload da imagem:", file.name)

    // Validar o arquivo
    if (!file.type.startsWith("image/")) {
      throw new Error("Arquivo deve ser uma imagem")
    }

    if (file.size > 52428800) {
      // 50MB
      throw new Error("Arquivo muito grande. Máximo 50MB")
    }

    // Gerar nome único
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const fileExtension = file.name.split(".").pop()
    const uniqueFileName = `${timestamp}-${randomString}.${fileExtension}`
    const fullPath = `products/${uniqueFileName}`

    console.log("📤 Fazendo upload para:", fullPath)

    // Fazer upload do arquivo
    const { data, error } = await supabase.storage.from("product-images").upload(fullPath, file, {
      cacheControl: "3600",
      upsert: true,
    })

    if (error) {
      console.error("❌ Erro no upload:", error.message)
      throw new Error(`Erro no upload: ${error.message}`)
    }

    console.log("✅ Upload realizado com sucesso:", data)

    // Obter URL pública
    const { data: urlData } = supabase.storage.from("product-images").getPublicUrl(data.path)

    console.log("🔗 URL pública gerada:", urlData.publicUrl)
    return urlData.publicUrl
  } catch (error) {
    console.error("❌ Erro ao fazer upload da imagem:", error)
    throw error
  }
}

export async function deleteImage(path: string): Promise<boolean> {
  try {
    console.log("🗑️ Deletando imagem:", path)
    const { error } = await supabase.storage.from("product-images").remove([path])

    if (error) {
      console.error("❌ Erro ao deletar imagem:", error.message)
      return false
    }

    console.log("✅ Imagem deletada com sucesso")
    return true
  } catch (error) {
    console.error("❌ Erro ao deletar imagem:", error)
    return false
  }
}

export async function listImages(): Promise<string[]> {
  try {
    console.log("📋 Listando imagens...")
    const { data, error } = await supabase.storage.from("product-images").list("products")

    if (error) {
      console.error("❌ Erro ao listar imagens:", error.message)
      return []
    }

    const imageNames = data?.map((file) => file.name) || []
    console.log(`✅ ${imageNames.length} imagens encontradas`)
    return imageNames
  } catch (error) {
    console.error("❌ Erro ao listar imagens:", error)
    return []
  }
}

// Função para testar configuração completa
export async function testCompleteSetup(): Promise<{ success: boolean; message: string; details: any }> {
  try {
    console.log("🔍 Testando configuração completa...")
    console.log("🔗 URL do banco:", supabaseUrl)

    const results = {
      database: false,
      products_table: false,
      promotions_table: false,
      storage_bucket: false,
      storage_permissions: false,
      sample_data: false,
    }

    // Testar tabela products
    try {
      const { data, error } = await supabase.from("products").select("count", { count: "exact", head: true })

      if (!error) {
        results.database = true
        results.products_table = true
      }
    } catch (error) {
      console.error("❌ Erro na tabela products:", error)
    }

    // Testar tabela promotions
    try {
      const { data, error } = await supabase.from("promotions").select("count", { count: "exact", head: true })

      if (!error) {
        results.promotions_table = true
      }
    } catch (error) {
      console.error("❌ Erro na tabela promotions:", error)
    }

    // Testar storage bucket
    try {
      const { data, error } = await supabase.storage.from("product-images").list("products", { limit: 1 })

      if (!error) {
        results.storage_bucket = true
        results.storage_permissions = true
      }
    } catch (error) {
      console.error("❌ Erro no storage:", error)
    }

    // Testar dados de exemplo
    try {
      const { data, error } = await supabase.from("products").select("id").limit(1)

      if (!error && data && data.length > 0) {
        results.sample_data = true
      }
    } catch (error) {
      console.error("❌ Erro nos dados de exemplo:", error)
    }

    const allGood = Object.values(results).every((result) => result === true)

    return {
      success: allGood,
      message: allGood
        ? "✅ Configuração completa! Tudo funcionando perfeitamente."
        : "❌ Problemas encontrados. Execute os scripts de configuração.",
      details: results,
    }
  } catch (error) {
    console.error("❌ Erro geral ao testar configuração:", error)
    return {
      success: false,
      message: `❌ Erro ao testar configuração: ${error}`,
      details: { error: error },
    }
  }
}
