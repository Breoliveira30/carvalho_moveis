import Link from "next/link"
import { ArrowLeft, MessageCircle, Ruler, Package, Star, CreditCard } from "lucide-react"
import { notFound } from "next/navigation"
import ProductCarousel from "@/components/product-carousel"
import { getProductById } from "@/lib/products-data"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductById(params.id)

  if (!product) {
    notFound()
  }

  const whatsappMessage = `Olá! Gostaria de mais informações sobre o ${product.name} no valor de R$ ${product.price}. Poderia me ajudar?`
  const whatsappUrl = `https://wa.me/5561998605145?text=${encodeURIComponent(whatsappMessage)}`

  // Calcular valor da parcela (simulação com taxa de 2.5% ao mês)
  // Remover estas linhas:
  // const priceNumber = Number.parseFloat(product.price.replace(".", "").replace(",", "."))
  // const installmentValue = (priceNumber * 1.025) / 12

  return (
    <main className="py-6 sm:py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Botão Voltar */}
        <Link
          href="/produtos"
          className="inline-flex items-center gap-2 text-amber-800 hover:text-amber-600 mb-6 sm:mb-8 transition-colors text-sm sm:text-base touch-manipulation"
        >
          <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
          Voltar aos Produtos
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Carousel de Imagens */}
          <div className="relative">
            <ProductCarousel images={product.images} productName={product.name} />
          </div>

          {/* Informações do Produto */}
          <div className="space-y-4 sm:space-y-6">
            <div>
              <span className="text-xs sm:text-sm text-amber-600 font-medium">{product.category}</span>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-amber-900 mt-2 leading-tight">
                {product.name}
              </h1>
              <p className="text-base sm:text-lg text-amber-700 mt-3 sm:mt-4 leading-relaxed">{product.description}</p>
            </div>

            {/* Preço e Formas de Pagamento */}
            <div className="bg-amber-50 p-4 sm:p-6 rounded-lg">
              {/* Badge de promoção se houver */}
              {product.has_promotion && product.promotion && (
                <div className="mb-3">
                  <div className="inline-flex bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    🔥 PROMOÇÃO -{product.promotion.discount_percentage}% OFF
                  </div>
                </div>
              )}

              {/* Preços */}
              <div className="mb-2">
                {product.has_promotion && product.discounted_price ? (
                  <div>
                    <span className="text-lg text-gray-500 line-through">
                      De: R$ {product.original_price || product.price}
                    </span>
                    <div className="text-2xl sm:text-3xl font-bold text-red-600">
                      Por: R$ {product.discounted_price}
                    </div>
                    <div className="text-sm text-green-600 font-medium mt-1">
                      Você economiza R${" "}
                      {(
                        Number.parseFloat(
                          (product.original_price || product.price).replace(".", "").replace(",", "."),
                        ) - Number.parseFloat(product.discounted_price.replace(".", "").replace(",", "."))
                      ).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>
                ) : (
                  <div className="text-2xl sm:text-3xl font-bold text-amber-900">R$ {product.price}</div>
                )}
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <p className="text-sm sm:text-base text-amber-700 flex items-center gap-2">
                  <CreditCard size={14} className="sm:w-4 sm:h-4 flex-shrink-0" />À vista com 5% de desconto adicional
                </p>
                <p className="text-sm sm:text-base text-amber-700">
                  Ou em até <strong>12x com juros da máquina</strong>
                </p>
                <p className="text-xs sm:text-sm text-amber-600">*Consulte as condições de parcelamento na loja</p>
              </div>
            </div>

            {/* Botão WhatsApp */}
            <Link
              href={whatsappUrl}
              target="_blank"
              className="w-full bg-green-600 hover:bg-green-700 active:bg-green-800 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg font-medium flex items-center justify-center gap-2 sm:gap-3 transition-colors text-base sm:text-lg touch-manipulation"
            >
              <MessageCircle size={20} className="sm:w-6 sm:h-6" />
              <span className="text-center">Falar com Vendedor no WhatsApp</span>
            </Link>

            {/* Características Principais */}
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
              <h3 className="text-lg sm:text-xl font-bold text-amber-900 mb-3 sm:mb-4 flex items-center gap-2">
                <Star size={18} className="sm:w-5 sm:h-5" />
                Características Principais
              </h3>
              <ul className="space-y-1.5 sm:space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-amber-700 leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Seção de Detalhes */}
        <div className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Dimensões */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <h3 className="text-lg sm:text-xl font-bold text-amber-900 mb-3 sm:mb-4 flex items-center gap-2">
              <Ruler size={18} className="sm:w-5 sm:h-5" />
              Dimensões
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div>
                <span className="text-sm sm:text-base text-amber-600 font-medium">Largura:</span>
                <p className="text-sm sm:text-base text-amber-800 font-bold">{product.dimensions.largura}</p>
              </div>
              <div>
                <span className="text-sm sm:text-base text-amber-600 font-medium">Profundidade:</span>
                <p className="text-sm sm:text-base text-amber-800 font-bold">{product.dimensions.profundidade}</p>
              </div>
              <div>
                <span className="text-sm sm:text-base text-amber-600 font-medium">Altura:</span>
                <p className="text-sm sm:text-base text-amber-800 font-bold">{product.dimensions.altura}</p>
              </div>
              <div>
                <span className="text-sm sm:text-base text-amber-600 font-medium">Peso:</span>
                <p className="text-sm sm:text-base text-amber-800 font-bold">{product.dimensions.peso}</p>
              </div>
            </div>
          </div>

          {/* Materiais */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <h3 className="text-lg sm:text-xl font-bold text-amber-900 mb-3 sm:mb-4 flex items-center gap-2">
              <Package size={18} className="sm:w-5 sm:h-5" />
              Materiais
            </h3>
            <ul className="space-y-1.5 sm:space-y-2">
              {product.materials.map((material, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm sm:text-base text-amber-700 leading-relaxed">{material}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 sm:mt-4 p-3 bg-amber-50 rounded-md">
              <p className="text-xs sm:text-sm text-amber-700 leading-relaxed">
                <strong>MDF:</strong> Material de alta densidade, muito resistente e durável, ideal para móveis de
                qualidade superior.
              </p>
            </div>
          </div>
        </div>

        {/* Descrição Detalhada */}
        <div className="mt-6 sm:mt-8 bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <h3 className="text-lg sm:text-xl font-bold text-amber-900 mb-3 sm:mb-4">Descrição Detalhada</h3>
          <p className="text-sm sm:text-base text-amber-700 leading-relaxed">{product.detailedDescription}</p>
        </div>

        {/* Botão WhatsApp Fixo no Final */}
        <div className="mt-6 sm:mt-8 text-center">
          <Link
            href={whatsappUrl}
            target="_blank"
            className="inline-flex bg-green-600 hover:bg-green-700 active:bg-green-800 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium items-center gap-2 sm:gap-3 transition-colors text-base sm:text-lg touch-manipulation"
          >
            <MessageCircle size={20} className="sm:w-6 sm:h-6" />
            Solicitar Orçamento via WhatsApp
          </Link>
        </div>
      </div>
    </main>
  )
}

// Função para gerar as páginas estáticas
export async function generateStaticParams() {
  const { getProducts } = await import("@/lib/supabase")
  const products = await getProducts()
  return products.map((product) => ({
    id: product.id,
  }))
}

// Metadata para SEO
export async function generateMetadata({ params }: ProductPageProps) {
  const product = await getProductById(params.id)

  if (!product) {
    return {
      title: "Produto não encontrado - Carvalho Móveis",
    }
  }

  return {
    title: `${product.name} - Carvalho Móveis`,
    description: product.description,
  }
}
