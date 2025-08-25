"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ProductCarouselProps {
  images: string[]
  productName: string
}

export default function ProductCarousel({ images, productName }: ProductCarouselProps) {
  const [currentImage, setCurrentImage] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  // Distância mínima para considerar um swipe
  const minSwipeDistance = 50

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToImage = (index: number) => {
    setCurrentImage(index)
  }

  // Handlers para touch/swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe && images.length > 1) {
      nextImage()
    }
    if (isRightSwipe && images.length > 1) {
      prevImage()
    }
  }

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Imagem Principal - Mesmo tamanho dos cards de produto */}
      <div
        className="relative h-56 sm:h-64 md:h-72 rounded-lg overflow-hidden shadow-lg bg-gray-100"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <Image
          src={images[currentImage] || "/placeholder.svg"}
          alt={`${productName} - Imagem ${currentImage + 1}`}
          fill
          className="object-cover transition-opacity duration-300"
          priority
          sizes="(max-width: 640px) 320px, (max-width: 1024px) 400px, 450px"
          quality={90}
        />

        {/* Botões de Navegação */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 sm:p-2 rounded-full transition-colors touch-manipulation"
              aria-label="Imagem anterior"
            >
              <ChevronLeft size={16} className="sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 sm:p-2 rounded-full transition-colors touch-manipulation"
              aria-label="Próxima imagem"
            >
              <ChevronRight size={16} className="sm:w-5 sm:h-5" />
            </button>
          </>
        )}

        {/* Indicadores */}
        {images.length > 1 && (
          <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-colors touch-manipulation ${
                  index === currentImage ? "bg-white" : "bg-white/50"
                }`}
                aria-label={`Ir para imagem ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Contador de imagens para mobile */}
        {images.length > 1 && (
          <div className="absolute top-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full sm:hidden">
            {currentImage + 1}/{images.length}
          </div>
        )}
      </div>

      {/* Miniaturas - Menores e mais compactas */}
      {images.length > 1 && (
        <div className="flex gap-1.5 sm:gap-2 mt-3 sm:mt-4 overflow-x-auto pb-2 scrollbar-hide justify-center">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`relative flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-md overflow-hidden border-2 transition-colors touch-manipulation ${
                index === currentImage ? "border-amber-500" : "border-gray-200 hover:border-amber-300"
              }`}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${productName} - Miniatura ${index + 1}`}
                fill
                className="object-cover"
                sizes="64px"
                quality={80}
              />
            </button>
          ))}
        </div>
      )}

      {/* Instrução de swipe para mobile */}
      {images.length > 1 && (
        <p className="text-xs text-gray-500 text-center mt-2 sm:hidden">Deslize para ver mais imagens</p>
      )}
    </div>
  )
}
