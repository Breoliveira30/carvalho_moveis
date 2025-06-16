"use client"

import Image from "next/image"
import Link from "next/link"
import type { Product } from "@/lib/products-data"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/produto/${product.id}`}
      className="flex-shrink-0 w-[320px] sm:w-[360px] md:w-[400px] snap-start bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group touch-manipulation"
    >
      <div className="relative h-56 sm:h-64 md:h-72">
        {/* Badge de promoção */}
        {product.has_promotion && product.promotion && (
          <div className="absolute top-2 left-2 z-10">
            <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
              -{product.promotion.discount_percentage}% OFF
            </div>
          </div>
        )}

        <Image
          src={product.images[0] || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 320px, (max-width: 1024px) 400px, 450px"
          quality={90}
          priority={false}
        />
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">{product.category}</span>

          <div className="text-right">
            {product.has_promotion && product.discounted_price ? (
              <div>
                <span className="text-sm text-gray-500 line-through">R$ {product.original_price || product.price}</span>
                <div className="text-lg font-bold text-red-600">R$ {product.discounted_price}</div>
              </div>
            ) : (
              <span className="text-lg font-bold text-amber-900">R$ {product.price}</span>
            )}
          </div>
        </div>

        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-amber-700 transition-colors leading-tight">
          {product.name}
        </h3>

        <p className="text-amber-700 mb-3 text-sm leading-relaxed line-clamp-2">{product.description}</p>

        <div className="flex justify-end">
          <span className="bg-amber-800 text-white px-3 py-1.5 rounded-md text-sm font-medium group-hover:bg-amber-700 transition-colors">
            Ver Detalhes
          </span>
        </div>
      </div>
    </Link>
  )
}
