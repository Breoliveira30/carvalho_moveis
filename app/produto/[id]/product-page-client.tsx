"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { type Product, getPromotionByProductId } from "@/lib/products"
import ProductTracker from "@/components/product-tracker"
import ImageModal from "@/components/image-modal"
import { analytics } from "@/lib/analytics"
import { MessageCircle, Ruler, Package, Palette, Eye, Truck, Clock, CreditCard } from "lucide-react"

interface ProductPageClientProps {
  product: Product
}

export function ProductPageClient({ product }: ProductPageClientProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [hovering, setHovering] = useState(false)

  const promotion = getPromotionByProductId(product.id)
  const hasDiscount = promotion && promotion.isActive
  const discountedPrice = hasDiscount ? product.price * (1 - promotion.discount / 100) : product.price
  const discountPercentage = hasDiscount ? promotion.discount : 0

  const handleWhatsAppClick = () => {
    analytics.trackWhatsAppClick()
    const message = `Olá! Tenho interesse no produto: ${product.name} - R$ ${discountedPrice.toFixed(2).replace(".", ",")}. Gostaria de mais informações sobre disponibilidade e condições de pagamento.`
    const whatsappUrl = `https://wa.me/5561998605145?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index)
    setIsModalOpen(true)
  }

  return (
    <>
      <ProductTracker productId={product.id} />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Images */}
          <div className="space-y-4">
            <div
              className="aspect-square relative overflow-hidden rounded-lg cursor-pointer"
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
              onClick={() => handleImageClick(selectedImageIndex)}
            >
              <img
                src={product.images[selectedImageIndex] || "/placeholder.svg"}
                alt={`${product.name} - Imagem principal`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />

              {/* Overlay com ícone de ampliar */}
              {hovering && (
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity duration-300">
                  <div className="bg-white bg-opacity-90 rounded-full p-3 flex items-center gap-2 text-sm font-medium">
                    <Eye className="h-4 w-4" />
                    Clique para ampliar
                  </div>
                </div>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && (
                  <Badge variant="secondary" className="bg-green-500 text-white">
                    Novo
                  </Badge>
                )}
                {hasDiscount && <Badge variant="destructive">-{discountPercentage}% OFF</Badge>}
              </div>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index ? "border-amber-500" : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} - Imagem ${index + 1}`}
                      className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-200"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleImageClick(index)
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-xs">
                  {product.category}
                </Badge>
              </div>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-amber-600">
                  R$ {discountedPrice.toFixed(2).replace(".", ",")}
                </span>
                {hasDiscount && (
                  <span className="text-xl text-gray-500 line-through">
                    R$ {product.price.toFixed(2).replace(".", ",")}
                  </span>
                )}
              </div>
              {hasDiscount && (
                <p className="text-green-600 font-medium">
                  Você economiza R$ {(product.price - discountedPrice).toFixed(2).replace(".", ",")}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              {product.inStock ? (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Em Estoque
                </Badge>
              ) : (
                <Badge variant="outline" className="border-red-200 text-red-600">
                  Fora de Estoque
                </Badge>
              )}
            </div>

            <Card className="bg-amber-50 border-amber-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <CreditCard className="h-5 w-5 text-amber-600" />
                  <h3 className="font-semibold text-amber-800">Formas de Pagamento</h3>
                </div>
                <div className="space-y-2 text-sm text-amber-700">
                  <p className="font-medium">💳 Parcelamos em até 12x com acréscimo da máquina</p>
                  <p>💰 À vista: desconto especial via PIX</p>
                  <p>🏦 Cartão de crédito e débito aceitos</p>
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={handleWhatsAppClick}
              size="lg"
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={!product.inStock}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Comprar via WhatsApp
            </Button>

            <Separator />

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">Especificações Técnicas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.materials && product.materials.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">Materiais</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {product.materials.map((material, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {material}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {product.colors && product.colors.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Palette className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">Cores Disponíveis</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {product.colors.map((color, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {color}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {product.dimensions && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Ruler className="h-5 w-5 text-gray-500" />
                    <h3 className="text-xl font-semibold">Dimensões e Peso</h3>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <p className="text-sm text-gray-600 mb-1">Largura</p>
                      <p className="font-bold text-lg">{product.dimensions.width}cm</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <p className="text-sm text-gray-600 mb-1">Altura</p>
                      <p className="font-bold text-lg">{product.dimensions.height}cm</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <p className="text-sm text-gray-600 mb-1">Profundidade</p>
                      <p className="font-bold text-lg">{product.dimensions.depth}cm</p>
                    </div>
                    {product.weight && (
                      <div className="bg-gray-50 p-3 rounded-lg text-center">
                        <p className="text-sm text-gray-600 mb-1">Peso</p>
                        <p className="font-bold text-lg">{product.weight}kg</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Entrega e Serviços</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <Truck className="h-5 w-5 text-amber-600 mt-1" />
                      <div>
                        <p className="font-medium">Entrega Imediata</p>
                        <p className="text-sm text-gray-600">Para DF e entorno com taxa de frete</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-amber-600 mt-1" />
                      <div>
                        <p className="font-medium">Prazo de Entrega</p>
                        <p className="text-sm text-gray-600">Entrega no mesmo dia ou próximo dia útil</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Package className="h-5 w-5 text-amber-600 mt-1" />
                      <div>
                        <p className="font-medium">Montagem Inclusa</p>
                        <p className="text-sm text-gray-600">Serviço de montagem sem custo adicional</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <ImageModal
        images={product.images}
        currentIndex={selectedImageIndex}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productId={product.id}
        productName={product.name}
      />
    </>
  )
}

export default ProductPageClient
