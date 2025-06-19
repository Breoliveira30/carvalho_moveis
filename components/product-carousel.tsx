"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ZoomIn, X } from "lucide-react"

interface ProductCarouselProps {
  images: string[]
  productName: string
}

export default function ProductCarousel({ images, productName }: ProductCarouselProps) {
  const [currentImage, setCurrentImage] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [modalImageIndex, setModalImageIndex] = useState(0)

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

  const openModal = (index: number) => {
    setModalImageIndex(index)
    setShowModal(true)
    document.body.style.overflow = "hidden" // Prevenir scroll do body
  }

  const closeModal = () => {
    setShowModal(false)
    document.body.style.overflow = "unset"
  }

  const nextModalImage = () => {
    setModalImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevModalImage = () => {
    setModalImageIndex((prev) => (prev - 1 + images.length) % images.length)
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

  // Handlers para modal touch/swipe
  const onModalTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onModalTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onModalTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe && images.length > 1) {
      nextModalImage()
    }
    if (isRightSwipe && images.length > 1) {
      prevModalImage()
    }
  }

  return (
    <>
      <div className="relative w-full">
        {/* Imagem Principal - Maior e mais destacada */}
        <div
          className="relative h-80 sm:h-96 md:h-[500px] lg:h-[600px] rounded-xl overflow-hidden shadow-2xl bg-gray-100 cursor-zoom-in group"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onClick={() => openModal(currentImage)}
        >
          <Image
            src={images[currentImage] || "/placeholder.svg"}
            alt={`${productName} - Imagem ${currentImage + 1}`}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-105"
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
            quality={95}
          />

          {/* Overlay com ícone de zoom */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
              <ZoomIn size={24} className="text-amber-800" />
            </div>
          </div>

          {/* Botões de Navegação */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  prevImage()
                }}
                className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 sm:p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 touch-manipulation"
                aria-label="Imagem anterior"
              >
                <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  nextImage()
                }}
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 sm:p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 touch-manipulation"
                aria-label="Próxima imagem"
              >
                <ChevronRight size={20} className="sm:w-6 sm:h-6" />
              </button>
            </>
          )}

          {/* Indicadores */}
          {images.length > 1 && (
            <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation()
                    goToImage(index)
                  }}
                  className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 touch-manipulation ${
                    index === currentImage ? "bg-white shadow-lg scale-110" : "bg-white/60 hover:bg-white/80"
                  }`}
                  aria-label={`Ir para imagem ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Contador de imagens */}
          {images.length > 1 && (
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white text-sm px-3 py-1.5 rounded-full font-medium">
              {currentImage + 1} / {images.length}
            </div>
          )}
        </div>

        {/* Miniaturas - Grid mais organizado */}
        {images.length > 1 && (
          <div className="mt-4 sm:mt-6">
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2 sm:gap-3">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 touch-manipulation hover:scale-105 ${
                    index === currentImage
                      ? "border-amber-500 shadow-lg ring-2 ring-amber-200"
                      : "border-gray-200 hover:border-amber-300"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${productName} - Miniatura ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 25vw, (max-width: 1024px) 20vw, 100px"
                    quality={80}
                  />
                  {/* Overlay para imagem ativa */}
                  {index === currentImage && <div className="absolute inset-0 bg-amber-500/20"></div>}
                </button>
              ))}
            </div>

            {/* Instrução */}
            <p className="text-sm text-amber-600 text-center mt-3 font-medium">
              Clique na imagem para ampliar • Deslize para navegar
            </p>
          </div>
        )}
      </div>

      {/* Modal de Visualização Ampliada */}
      {showModal && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4" onClick={closeModal}>
          {/* Botão Fechar */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors"
            aria-label="Fechar visualização"
          >
            <X size={24} />
          </button>

          {/* Contador no modal */}
          <div className="absolute top-4 left-4 z-10 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full font-medium">
            {modalImageIndex + 1} de {images.length}
          </div>

          {/* Imagem do Modal */}
          <div
            className="relative w-full h-full max-w-6xl max-h-[90vh] mx-auto"
            onTouchStart={onModalTouchStart}
            onTouchMove={onModalTouchMove}
            onTouchEnd={onModalTouchEnd}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[modalImageIndex] || "/placeholder.svg"}
              alt={`${productName} - Imagem ampliada ${modalImageIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
              quality={100}
              priority
            />

            {/* Navegação do Modal */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevModalImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-4 rounded-full transition-colors"
                  aria-label="Imagem anterior"
                >
                  <ChevronLeft size={28} />
                </button>
                <button
                  onClick={nextModalImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-4 rounded-full transition-colors"
                  aria-label="Próxima imagem"
                >
                  <ChevronRight size={28} />
                </button>
              </>
            )}

            {/* Indicadores do Modal */}
            {images.length > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setModalImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === modalImageIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
                    }`}
                    aria-label={`Ir para imagem ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Instruções do Modal */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm text-center">
            <p className="hidden sm:block">Use as setas ou clique nos pontos para navegar • ESC para fechar</p>
            <p className="sm:hidden">Deslize para navegar • Toque fora da imagem para fechar</p>
          </div>
        </div>
      )}
    </>
  )
}
