import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ProductCard from "@/components/product-card"
import { getFeaturedProducts, categories } from "@/lib/products"
import { ArrowRight, Sofa, Table, Home } from "lucide-react"

export default function HomePage() {
  const featuredProducts = getFeaturedProducts()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/hero/furniture-showcase.jpg"
            alt="Móveis de qualidade"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
        </div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Móveis de Qualidade</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Transforme sua casa com nossos móveis únicos e duradouros
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-700">
              <Link href="/produtos">
                Ver Catálogo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-black bg-transparent"
            >
              <Link href="/contato">Fale Conosco</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sofa className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Design Exclusivo</h3>
              <p className="text-gray-600">Móveis com design único e moderno para sua casa</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Table className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Materiais Premium</h3>
              <p className="text-gray-600">Utilizamos apenas materiais de alta qualidade e durabilidade</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Entrega Rápida</h3>
              <p className="text-gray-600">Entregamos seus móveis com rapidez e segurança</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nossas Categorias</h2>
            <p className="text-gray-600 text-lg">Encontre o móvel perfeito para cada ambiente da sua casa</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link key={category.id} href={`/produtos?categoria=${category.id}`}>
                <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <CardContent className="p-0">
                    <div className="aspect-square relative overflow-hidden rounded-t-lg">
                      <img
                        src={category.image || "/placeholder.svg"}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="font-semibold text-lg">{category.name}</h3>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section - Only shows if there are promotions */}
      {featuredProducts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Produtos em Promoção</h2>
              <p className="text-gray-600 text-lg">Aproveite nossas ofertas especiais</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="text-center mt-8">
              <Button asChild variant="outline" size="lg">
                <Link href="/produtos">
                  Ver Todos os Produtos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-amber-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Pronto para Transformar sua Casa?</h2>
          <p className="text-xl mb-8 opacity-90">Entre em contato conosco e descubra como podemos ajudar</p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/contato">Fale Conosco Agora</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
