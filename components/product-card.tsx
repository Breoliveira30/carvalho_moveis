"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/products"
import ImageModal from "./image-modal"
import { Eye, Tag } from "lucide-react"

interface ProductCardProps {
  product: Product
  viewMode?: "grid" | "list"
}

export default function ProductCard({ product, viewMode = "grid" }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [hovering, setHovering] = useState(false)

  const hasDiscount = product.originalPrice && product.originalPrice > product.price
  const discountPercentage = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0

  const handleImageClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsModalOpen(true)
  }

  if (viewMode === "list") {
    return (
      <>
        <Card className="group hover:shadow-lg transition-all duration-300">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              <div className="relative md:w-64 flex-shrink-0">
                <Link href={`/produto/${product.id}`}>
                  <div
                    className="aspect-square relative overflow-hidden rounded-t-lg md:rounded-l-lg md:rounded-t-none cursor-pointer"
                    onMouseEnter={() => setHovering(true)}
                    onMouseLeave={() => setHovering(false)}
                    onClick={handleImageClick}
                  >
                    <img
                      src={product.images[0] || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {hovering && (
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity duration-300">
                        <div className="bg-white bg-opacity-90 rounded-full p-3 flex items-center gap-2 text-sm font-medium">
                          <Eye className="h-4 w-4" />
                          Clique para ampliar
                        </div>
                      </div>
                    )}
                  </div>
                </Link>

                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {product.isNew && (
                    <Badge variant="secondary" className="bg-green-500 text-white">
                      Novo
                    </Badge>
                  )}
                  {hasDiscount && <Badge variant="destructive">-{discountPercentage}%</Badge>}
                </div>
              </div>

              <Link href={`/produto/${product.id}`} className="flex-1">
                <div className="p-6 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        <Tag className="h-3 w-3 mr-1" />
                        {product.category}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-xl mb-3 group-hover:text-amber-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{product.description}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-amber-600">
                        R$ {product.price.toFixed(2).replace(".", ",")}
                      </span>
                      {hasDiscount && (
                        <span className="text-sm text-gray-500 line-through">
                          R$ {product.originalPrice!.toFixed(2).replace(".", ",")}
                        </span>
                      )}
                    </div>
                    {!product.inStock && <Badge variant="outline">Fora de Estoque</Badge>}
                  </div>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>

        <ImageModal
          images={product.images}
          currentIndex={0}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          productId={product.id}
          productName={product.name}
        />
      </>
    )
  }

  // Grid view (existing layout)
  return (
    <>
      <Card className="group hover:shadow-lg transition-all duration-300">
        <CardContent className="p-0">
          <div className="relative">
            <Link href={`/produto/${product.id}`}>
              <div
                className="aspect-square relative overflow-hidden rounded-t-lg cursor-pointer"
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
                onClick={handleImageClick}
              >
                <img
                  src={product.images[0] || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {hovering && (
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity duration-300">
                    <div className="bg-white bg-opacity-90 rounded-full p-3 flex items-center gap-2 text-sm font-medium">
                      <Eye className="h-4 w-4" />
                      Clique para ampliar
                    </div>
                  </div>
                )}
              </div>
            </Link>

            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {product.isNew && (
                <Badge variant="secondary" className="bg-green-500 text-white">
                  Novo
                </Badge>
              )}
              {hasDiscount && <Badge variant="destructive">-{discountPercentage}%</Badge>}
            </div>
          </div>

          <Link href={`/produto/${product.id}`}>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-xs">
                  <Tag className="h-3 w-3 mr-1" />
                  {product.category}
                </Badge>
              </div>
              <h3 className="font-semibold text-lg mb-2 group-hover:text-amber-600 transition-colors">
                {product.name}
              </h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-amber-600">
                  R$ {product.price.toFixed(2).replace(".", ",")}
                </span>
                {hasDiscount && (
                  <span className="text-sm text-gray-500 line-through">
                    R$ {product.originalPrice!.toFixed(2).replace(".", ",")}
                  </span>
                )}
              </div>
              {!product.inStock && (
                <Badge variant="outline" className="mt-2">
                  Fora de Estoque
                </Badge>
              )}
            </div>
          </Link>
        </CardContent>
      </Card>

      <ImageModal
        images={product.images}
        currentIndex={0}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productId={product.id}
        productName={product.name}
      />
    </>
  )
}
