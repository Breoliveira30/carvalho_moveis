import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10" />
        <Image
          src="/images/hero/main-banner.avif"
          alt="Móveis elegantes da Carvalho Móveis"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center">
          <div className="mb-4 sm:mb-6 inline-block">
            <div className="bg-amber-900/80 backdrop-blur-sm px-4 sm:px-6 py-3 sm:py-4 rounded-lg inline-block">
              <div className="relative">
                <span className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-amber-50">
                  Carvalho
                </span>
                <span className="text-2xl sm:text-4xl md:text-5xl font-light italic tracking-wide ml-2 sm:ml-3 text-amber-100">
                  Móveis
                </span>
                <div className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-0.5 sm:h-1 bg-amber-400"></div>
              </div>
              <p className="text-amber-200 mt-1 sm:mt-2 text-xs sm:text-sm md:text-base">
                Qualidade e elegância desde 2020
              </p>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-3 sm:mb-4 mt-2 sm:mt-4 leading-tight">
            Conforto e Elegância para seu Lar
          </h1>
          <p className="text-base sm:text-xl text-white/90 max-w-2xl mb-6 sm:mb-8 leading-relaxed">
            Móveis de altíssima qualidade que transformam sua casa em um ambiente aconchegante e sofisticado.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              href="/produtos"
              className="bg-amber-800 hover:bg-amber-700 active:bg-amber-900 text-white px-4 sm:px-6 py-3 rounded-md font-medium flex items-center justify-center gap-2 transition-colors text-sm sm:text-base touch-manipulation"
            >
              Ver Produtos <ArrowRight size={16} />
            </Link>
            <Link
              href="/contato"
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 active:bg-white/30 text-white border border-white/30 px-4 sm:px-6 py-3 rounded-md font-medium flex items-center justify-center transition-colors text-sm sm:text-base touch-manipulation"
            >
              Entre em Contato
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-12 sm:py-16 bg-amber-50 wood-slats">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-amber-900 mb-6 sm:mb-8 text-center">
            Nossas Categorias
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/produtos#${category.slug}`}
                className="group relative h-40 sm:h-56 md:h-64 rounded-lg overflow-hidden touch-manipulation"
              >
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 20vw, 20vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 p-3 sm:p-4">
                  <h3 className="text-base sm:text-xl font-bold text-white leading-tight">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-12 sm:py-16 bg-amber-100 bg-[url('/images/textures/wood-grain.jpg')] bg-repeat bg-opacity-5">
        <div className="container mx-auto px-4">
          <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-xl shadow-lg max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-amber-900 mb-3 sm:mb-4">Nossa Missão</h2>
            <p className="text-base sm:text-lg text-amber-800 mb-4 sm:mb-6 leading-relaxed">
              Levar conforto para as pessoas com móveis aconchegantes e de altíssima qualidade, transformando casas em
              lares.
            </p>
            <Link
              href="/sobre"
              className="text-amber-900 font-medium flex items-center gap-2 hover:underline text-sm sm:text-base touch-manipulation"
            >
              Conheça nossa história <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

const categories = [
  {
    name: "Sofás",
    slug: "sofas",
    image: "/images/categories/sofa.jpg", // Updated to use the new image
  },
  {
    name: "Mesas",
    slug: "mesas",
    image: "/images/categories/mesa1.webp",
  },
  {
    name: "Camas",
    slug: "camas",
    image: "/images/categories/cama_casal.jpg",
  },
  {
    name: "Racks",
    slug: "racks",
    image: "/images/categories/rack_sala.jpg",
  },
  {
    name: "Guarda-roupas",
    slug: "guarda-roupas",
    image: "/images/categories/gurada_roupa.webp",
  },
]
