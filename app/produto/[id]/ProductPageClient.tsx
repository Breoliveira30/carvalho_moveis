"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Heart, Share2, MessageCircle } from "lucide-react"
import ProductTracker from "@/components/product-tracker"
import { analytics } from "@/lib/analytics"
import type { Product } from "@/lib/products-data"

interface ProductPageClientProps {
  product: Product
}

export function ProductPageClient({ product }: ProductPageClientProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  const handleWhatsAppClick = () => {
    analytics.trackWhatsappClick()
    const message = `Olá! Tenho interesse no produto: ${product.name}. Gostaria de mais informações sobre disponibilidade, preço e condições de pagamento.`
    const whatsappUrl = `https://wa.me/5561998605145?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Erro ao compartilhar:", error)
      }
    } else {
      // Fallback: copiar URL para clipboard
      navigator.clipboard.writeText(window.location.href)
      alert("Link copiado para a área de transferência!")
    }
  }

  return (
    <>
      <ProductTracker productId={product.id} />

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
            <Link href="/" className="hover:text-amber-800">
              Início
            </Link>
            <span>/</span>
            <Link href="/produtos" className="hover:text-amber-800">
              Produtos
            </Link>
            <span>/</span>
            <Link href={`/produtos?categoria=${product.category}`} className="hover:text-amber-800">
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Galeria de Imagens */}
            <div className="space-y-4">
              <div className="relative aspect-square bg-white rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={product.images[currentImageIndex] || "/placeholder.svg?height=600&width=600"}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />

                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-colors"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-colors"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}

                {/* Indicadores */}
                {product.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {product.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentImageIndex ? "bg-amber-800" : "bg-white/60"
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* Badge de Promoção */}
                {product.has_promotion && (
                  <div className="absolute top-4 left-4">
                    <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      -{product.promotion?.discount_percentage}% OFF
                    </div>
                  </div>
                )}
              </div>

              {/* Miniaturas */}
              {product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        index === currentImageIndex ? "border-amber-800" : "border-gray-200"
                      }`}
                    >
                      <Image
                        src={image || "/placeholder.svg?height=80&width=80"}
                        alt={`${product.name} - Imagem ${index + 1}`}
                        width={80}
                        height={80}
                        className="object-cover w-full h-full"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Informações do Produto */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                    {product.category}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsLiked(!isLiked)}
                      className={`p-2 rounded-full transition-colors ${
                        isLiked ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
                    </button>
                    <button
                      onClick={handleShare}
                      className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                    >
                      <Share2 size={20} />
                    </button>
                  </div>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

                <div className="flex items-baseline gap-3 mb-6">
                  {product.has_promotion && product.original_price ? (
                    <>
                      <span className="text-3xl font-bold text-red-600">R$ {product.discounted_price}</span>
                      <span className="text-xl text-gray-500 line-through">R$ {product.original_price}</span>
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
                        Economize R${" "}
                        {(
                          Number.parseFloat(product.original_price.replace(".", "").replace(",", ".")) -
                          Number.parseFloat(product.discounted_price?.replace(".", "").replace(",", ".") || "0")
                        ).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </span>
                    </>
                  ) : (
                    <span className="text-3xl font-bold text-amber-900">R$ {product.price}</span>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Descrição</h3>
                <p className="text-gray-700 leading-relaxed">{product.detailedDescription}</p>
              </div>

              {/* Características */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Características</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-700">
                      <div className="w-2 h-2 bg-amber-800 rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Materiais */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Materiais</h3>
                <div className="flex flex-wrap gap-2">
                  {product.materials.map((material, index) => (
                    <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                      {material}
                    </span>
                  ))}
                </div>
              </div>

              {/* Dimensões */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Dimensões</h3>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <span className="text-sm text-gray-600">Largura</span>
                    <p className="font-semibold">{product.dimensions.largura}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Profundidade</span>
                    <p className="font-semibold">{product.dimensions.profundidade}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Altura</span>
                    <p className="font-semibold">{product.dimensions.altura}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Peso</span>
                    <p className="font-semibold">{product.dimensions.peso}</p>
                  </div>
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="space-y-4 pt-6">
                <button
                  onClick={handleWhatsAppClick}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-lg font-semibold text-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle size={24} />
                  Comprar via WhatsApp
                </button>

                <Link
                  href="/contato"
                  className="w-full bg-amber-800 hover:bg-amber-700 text-white py-4 px-6 rounded-lg font-semibold text-lg flex items-center justify-center gap-2 transition-colors"
                >
                  Solicitar Orçamento
                </Link>
              </div>

              {/* Informações Adicionais */}
              <div className="bg-amber-50 p-4 rounded-lg">
                <h4 className="font-semibold text-amber-900 mb-2">Informações Importantes</h4>
                <ul className="text-sm text-amber-800 space-y-1">
                  <li>• Entrega imediata para DF e entorno com taxa de frete</li>
                  <li>• Montagem inclusa no valor</li>
                  <li>• Parcelamento em até 12x com acréscimo da máquina</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
