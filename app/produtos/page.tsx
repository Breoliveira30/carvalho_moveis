import { categories, getAllProducts } from "@/lib/products-data"
import ProductCarouselHorizontal from "@/components/product-carousel-horizontal"

export default async function ProdutosPage() {
  const allProducts = await getAllProducts()

  // Group products by category
  const productsByCategory = categories.reduce(
    (acc, category) => {
      acc[category] = allProducts.filter((product) => product.category === category)
      return acc
    },
    {} as Record<string, any[]>,
  )

  return (
    <main className="py-6 sm:py-8 md:py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-amber-900 mb-6 sm:mb-8 text-center leading-tight">
          Nossos Produtos
        </h1>
        <p className="text-base sm:text-lg text-center max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4">
          Explore nossa coleção de móveis de alta qualidade, projetados para trazer conforto e elegância para o seu lar.
        </p>

        {/* Navegação rápida para categorias */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8">
          {categories.map((category) => (
            <a
              key={category}
              href={`#${category.toLowerCase()}`}
              className="bg-amber-100 hover:bg-amber-200 text-amber-800 px-3 py-2 rounded-md text-sm sm:text-base transition-colors"
            >
              {category}
            </a>
          ))}
        </div>

        {/* Carrosséis de produtos por categoria */}
        {categories.map((category) => {
          const products = productsByCategory[category] || []
          if (products.length === 0) return null

          return (
            <ProductCarouselHorizontal
              key={category}
              products={products}
              title={category}
              categoryId={category.toLowerCase()}
            />
          )
        })}
      </div>
    </main>
  )
}
