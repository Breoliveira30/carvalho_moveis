"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { Product } from "@/lib/products-data"

interface ProductCarouselHorizontalProps {
  products: Product[]
  title: string
  categoryId?: string
}

export default function ProductCarouselHorizontal({ products, title, categoryId }: ProductCarouselHorizontalProps) {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollPosition, setScrollPosition] = useState(0)

  // Verificar se deve mostrar as setas de navegação
  const checkArrows = () => {
    if (!carouselRef.current) return

    setShowLeftArrow(carouselRef.current.scrollLeft > 0)
    setShowRightArrow(
      carouselRef.current.scrollLeft < carouselRef.current.scrollWidth - carouselRef.current.clientWidth - 10,
    )
  }

  useEffect(() => {
    const carousel = carouselRef.current
    if (carousel) {
      carousel.addEventListener("scroll", checkArrows)
      // Verificar inicialmente
      checkArrows()

      // Verificar após carregamento de imagens
      window.addEventListener("load", checkArrows)
      window.addEventListener("resize", checkArrows)

      return () => {
        carousel.removeEventListener("scroll", checkArrows)
        window.removeEventListener("load", checkArrows)
        window.removeEventListener("resize", checkArrows)
      }
    }
  }, [])

  // Funções para navegação
  const handleScrollLeft = (amount: number) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -amount, behavior: "smooth" })
    }
  }

  const handleScrollRight = (amount: number) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: amount, behavior: "smooth" })
    }
  }

  // Funções para arrastar (drag)
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0))
    setScrollPosition(carouselRef.current?.scrollLeft || 0)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setStartX(e.touches[0].pageX - (carouselRef.current?.offsetLeft || 0))
    setScrollPosition(carouselRef.current?.scrollLeft || 0)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - (carouselRef.current?.offsetLeft || 0)
    const walk = (x - startX) * 2 // Velocidade do scroll
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollPosition - walk
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    const x = e.touches[0].pageX - (carouselRef.current?.offsetLeft || 0)
    const walk = (x - startX) * 2
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollPosition - walk
    }
  }

  const handleDragEnd = () => {
    setIsDragging(false)
  }

  return (
    <section className="py-8 relative" id={categoryId}>
      <h2 className="text-2xl sm:text-3xl font-bold text-amber-800 mb-6 pb-2 border-b-2 border-amber-200">{title}</h2>

      <div className="relative">
        {/* Botão de navegação esquerda */}
        {showLeftArrow && (
          <button
            onClick={() => handleScrollLeft(300)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-amber-800/80 hover:bg-amber-700 text-white p-2 rounded-full shadow-lg"
            aria-label="Produtos anteriores"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {/* Carrossel de produtos */}
        <div
          ref={carouselRef}
          className={`flex overflow-x-auto gap-4 pb-4 scrollbar-hide snap-x snap-mandatory ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleDragEnd}
        >
          {products.map((product) => (
            <Link
              key={product.id}
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
                        <span className="text-sm text-gray-500 line-through">
                          R$ {product.original_price || product.price}
                        </span>
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
          ))}
        </div>

        {/* Botão de navegação direita */}
        {showRightArrow && (
          <button
            onClick={() => handleScrollRight(300)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-amber-800/80 hover:bg-amber-700 text-white p-2 rounded-full shadow-lg"
            aria-label="Próximos produtos"
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div>

      {/* Indicador de scroll */}
      <div className="mt-4 text-center text-sm text-amber-600">
        <span>Deslize para ver mais produtos</span>
      </div>
    </section>
  )
}
