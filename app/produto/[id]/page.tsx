import Link from "next/link"
import { ArrowLeft, MessageCircle, Ruler, Package, Star, CreditCard, Shield, Truck, Clock, Award } from "lucide-react"
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

  return (
    <main className="py-6 sm:py-8 md:py-12 bg-gradient-to-br from-amber-50 to-orange-50 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Botão Voltar */}
        <Link
          href="/produtos"
          className="inline-flex items-center gap-2 text-amber-800 hover:text-amber-600 mb-6 sm:mb-8 transition-colors text-sm sm:text-base touch-manipulation bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md"
        >
          <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
          Voltar aos Produtos
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Carousel de Imagens */}
          <div className="relative">
            <ProductCarousel images={product.images} productName={product.name} />
          </div>

          {/* Informações do Produto */}
          <div className="space-y-6">
            {/* Header do Produto */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <span className="inline-block text-sm text-amber-600 font-medium bg-amber-100 px-3 py-1 rounded-full mb-3">
                {product.category}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-amber-900 mb-4 leading-tight">
                {product.name}
              </h1>
              <p className="text-lg text-amber-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Preço e Promoção */}
            <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-6 rounded-xl shadow-lg border border-amber-200">
              {/* Badge de promoção se houver */}
              {product.has_promotion && product.promotion && (
                <div className="mb-4">
                  <div className="inline-flex bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
                    🔥 OFERTA ESPECIAL -{product.promotion.discount_percentage}% OFF
                  </div>
                </div>
              )}

              {/* Preços */}
              <div className="mb-4">
                {product.has_promotion && product.discounted_price ? (
                  <div>
                    <span className="text-xl text-gray-500 line-through block">
                      De: R$ {product.original_price || product.price}
                    </span>
                    <div className="text-4xl font-bold text-red-600 mb-2">Por: R$ {product.discounted_price}</div>
                    <div className="text-lg text-green-600 font-medium bg-green-100 px-3 py-1 rounded-lg inline-block">
                      Você economiza R${" "}
                      {(
                        Number.parseFloat(
                          (product.original_price || product.price).replace(".", "").replace(",", "."),
                        ) - Number.parseFloat(product.discounted_price.replace(".", "").replace(",", "."))
                      ).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>
                ) : (
                  <div className="text-4xl font-bold text-amber-900">R$ {product.price}</div>
                )}
              </div>

              {/* Formas de Pagamento */}
              <div className="space-y-3 bg-white/70 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <CreditCard className="text-green-600" size={20} />
                  <span className="text-amber-800 font-medium">À vista com 5% de desconto adicional</span>
                </div>
                <div className="flex items-center gap-3">
                  <CreditCard className="text-blue-600" size={20} />
                  <span className="text-amber-800">
                    Ou em até <strong>12x com juros da máquina</strong>
                  </span>
                </div>
                <p className="text-sm text-amber-600 ml-8">*Consulte as condições de parcelamento na loja</p>
              </div>
            </div>

            {/* Botão WhatsApp Principal */}
            <Link
              href={whatsappUrl}
              target="_blank"
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-lg"
            >
              <MessageCircle size={24} />
              <span>Falar com Vendedor no WhatsApp</span>
            </Link>

            {/* Garantias e Benefícios */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-amber-900 mb-4 flex items-center gap-2">
                <Shield className="text-green-600" size={22} />
                Garantias e Benefícios
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <Award className="text-green-600" size={18} />
                  <span className="text-sm font-medium text-green-800">Garantia de 2 anos</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <Truck className="text-blue-600" size={18} />
                  <span className="text-sm font-medium text-blue-800">Entrega grátis*</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                  <Clock className="text-purple-600" size={18} />
                  <span className="text-sm font-medium text-purple-800">Montagem inclusa</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                  <Star className="text-orange-600" size={18} />
                  <span className="text-sm font-medium text-orange-800">Qualidade premium</span>
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-3">*Consulte condições de entrega para sua região</p>
            </div>
          </div>
        </div>

        {/* Seção de Detalhes Expandida */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* Características Principais */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-amber-900 mb-4 flex items-center gap-2">
              <Star className="text-amber-600" size={22} />
              Características Principais
            </h3>
            <ul className="space-y-3">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3 p-2 hover:bg-amber-50 rounded-lg transition-colors">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-amber-700 leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Dimensões */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-amber-900 mb-4 flex items-center gap-2">
              <Ruler className="text-blue-600" size={22} />
              Dimensões
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-blue-700 font-medium">Largura:</span>
                <span className="text-blue-900 font-bold">{product.dimensions.largura}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-blue-700 font-medium">Profundidade:</span>
                <span className="text-blue-900 font-bold">{product.dimensions.profundidade}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-blue-700 font-medium">Altura:</span>
                <span className="text-blue-900 font-bold">{product.dimensions.altura}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-blue-700 font-medium">Peso:</span>
                <span className="text-blue-900 font-bold">{product.dimensions.peso}</span>
              </div>
            </div>
          </div>

          {/* Materiais */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-amber-900 mb-4 flex items-center gap-2">
              <Package className="text-green-600" size={22} />
              Materiais
            </h3>
            <ul className="space-y-3 mb-4">
              {product.materials.map((material, index) => (
                <li key={index} className="flex items-start gap-3 p-2 hover:bg-green-50 rounded-lg transition-colors">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-green-700 leading-relaxed">{material}</span>
                </li>
              ))}
            </ul>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm text-green-800 leading-relaxed">
                <strong>MDF:</strong> Material de alta densidade, muito resistente e durável, ideal para móveis de
                qualidade superior.
              </p>
            </div>
          </div>
        </div>

        {/* Descrição Detalhada */}
        <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
          <h3 className="text-2xl font-bold text-amber-900 mb-6 text-center">Descrição Detalhada</h3>
          <div className="prose prose-amber max-w-none">
            <p className="text-lg text-amber-700 leading-relaxed text-center max-w-4xl mx-auto">
              {product.detailedDescription}
            </p>
          </div>
        </div>

        {/* Call to Action Final */}
        <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-8 rounded-xl shadow-lg text-center border border-amber-200">
          <h3 className="text-2xl font-bold text-amber-900 mb-4">Pronto para transformar seu lar?</h3>
          <p className="text-lg text-amber-700 mb-6 max-w-2xl mx-auto">
            Entre em contato conosco agora mesmo e garante este móvel incrível para sua casa. Nossa equipe está pronta
            para te atender!
          </p>
          <Link
            href={whatsappUrl}
            target="_blank"
            className="inline-flex bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 rounded-xl font-bold items-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-lg"
          >
            <MessageCircle size={24} />
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
