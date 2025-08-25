"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { getAllProducts, searchProducts, categories } from "@/lib/products"
import ProductCard from "@/components/product-card"
import { Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get("search")
  const categoryParam = searchParams.get("categoria")

  const [filteredProducts, setFilteredProducts] = useState(getAllProducts())
  const [activeCategory, setActiveCategory] = useState<string>("todos")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const allProducts = getAllProducts()

  const categoryOptions = [{ id: "todos", name: "Todos", slug: "todos" }, ...categories]

  useEffect(() => {
    let products = allProducts

    // Apply search filter if query exists
    if (searchQuery) {
      products = searchProducts(searchQuery)
    }

    // Apply category filter
    if (activeCategory !== "todos") {
      const selectedCategory = categories.find((cat) => cat.id === activeCategory)
      if (selectedCategory) {
        products = products.filter((product) => product.category === selectedCategory.name)
      }
    }

    setFilteredProducts(products)
  }, [searchQuery, activeCategory, allProducts])

  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(categoryParam)
    }
  }, [categoryParam])

  return (
    <main className="py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {searchQuery ? `Resultados para "${searchQuery}"` : "Nossos Produtos"}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubra nossa coleção completa de móveis de qualidade
          </p>
        </div>

        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {categoryOptions.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === category.id
                    ? "bg-amber-500 text-white shadow-lg transform scale-105"
                    : "bg-amber-100 text-amber-800 hover:bg-amber-200 hover:shadow-md"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <p className="text-gray-600">
              {filteredProducts.length} produto{filteredProducts.length !== 1 ? "s" : ""} encontrado
              {filteredProducts.length !== 1 ? "s" : ""}
              {activeCategory !== "todos" && (
                <span className="ml-2 text-amber-600 font-medium">
                  em {categoryOptions.find((cat) => cat.id === activeCategory)?.name}
                </span>
              )}
            </p>

            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="p-2"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="p-2"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div
          className={`${
            viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "flex flex-col gap-6"
          }`}
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} viewMode={viewMode} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhum produto encontrado</h3>
              <p className="text-gray-600 mb-6">
                {searchQuery
                  ? `Não encontramos produtos para "${searchQuery}".`
                  : "Não há produtos nesta categoria no momento."}
              </p>
              {(searchQuery || activeCategory !== "todos") && (
                <Button
                  onClick={() => {
                    setActiveCategory("todos")
                    window.history.pushState({}, "", "/produtos")
                  }}
                  variant="outline"
                >
                  Ver todos os produtos
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
