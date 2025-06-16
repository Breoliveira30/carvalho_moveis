"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import {
  Plus,
  Edit,
  Trash2,
  Package,
  Tag,
  Upload,
  Search,
  Filter,
  LogOut,
  BarChart3,
  TrendingUp,
  Eye,
  AlertCircle,
  CheckCircle,
  RefreshCw,
} from "lucide-react"
import {
  getProducts,
  deleteProduct,
  getPromotions,
  testCompleteSetup,
  type Product,
  type Promotion,
} from "@/lib/supabase"

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([])
  const [promotions, setPromotions] = useState<Promotion[]>([])
  const [loading, setLoading] = useState(true)
  const [setupStatus, setSetupStatus] = useState<{ success: boolean; message: string; details: any } | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null)
  const router = useRouter()

  const categories = ["Sofás", "Mesas", "Camas", "Racks", "Guarda-roupas"]

  useEffect(() => {
    // Verificar autenticação
    const token = localStorage.getItem("admin_token")
    if (!token) {
      router.push("/admin/login")
      return
    }

    initializeDashboard()
  }, [router])

  const initializeDashboard = async () => {
    setLoading(true)

    // Testar configuração completa
    const setupResult = await testCompleteSetup()
    setSetupStatus(setupResult)

    // Carregar dados se tudo estiver OK
    if (setupResult.success) {
      await loadData()
    }

    setLoading(false)
  }

  const loadData = async () => {
    try {
      const [productsData, promotionsData] = await Promise.all([getProducts(), getPromotions()])
      setProducts(productsData)
      setPromotions(promotionsData)
    } catch (error) {
      console.error("Erro ao carregar dados:", error)
    }
  }

  const handleDeleteProduct = async (id: string) => {
    const success = await deleteProduct(id)
    if (success) {
      setProducts(products.filter((p) => p.id !== id))
      setShowDeleteModal(null)
      alert("Produto excluído com sucesso!")
    } else {
      alert("Erro ao excluir produto")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("admin_token")
    router.push("/")
  }

  const handleRefreshSetup = async () => {
    setLoading(true)
    await initializeDashboard()
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getProductPromotion = (productId: string) => {
    return promotions.find((p) => p.product_id === productId && p.is_active)
  }

  const calculateDiscountedPrice = (price: string, discount: number) => {
    const numPrice = Number.parseFloat(price.replace(".", "").replace(",", "."))
    const discountedPrice = numPrice * (1 - discount / 100)
    return discountedPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-800 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando e verificando configurações...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <div>
                <span className="text-xl font-bold tracking-tight text-amber-800">Carvalho</span>
                <span className="text-xl font-light italic tracking-wide ml-2 text-amber-700">Móveis</span>
              </div>
              <span className="text-sm text-gray-500 border-l pl-4">Painel Administrativo</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleRefreshSetup}
                className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
                title="Verificar configuração"
              >
                <RefreshCw size={16} />
                Verificar
              </button>
              <Link href="/" className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
                <Eye size={16} />
                Ver Site
              </Link>
              <button onClick={handleLogout} className="text-red-600 hover:text-red-700 flex items-center gap-2">
                <LogOut size={16} />
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Setup Status */}
        {setupStatus && (
          <div className="mb-8">
            <div
              className={`p-4 rounded-lg flex items-start gap-3 ${
                setupStatus.success ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
              }`}
            >
              {setupStatus.success ? (
                <CheckCircle className="text-green-600 mt-0.5" size={20} />
              ) : (
                <AlertCircle className="text-red-600 mt-0.5" size={20} />
              )}
              <div className="flex-1">
                <h3 className={`font-medium ${setupStatus.success ? "text-green-800" : "text-red-800"}`}>
                  Status da Configuração
                </h3>
                <p className={`text-sm mt-1 ${setupStatus.success ? "text-green-700" : "text-red-700"}`}>
                  {setupStatus.message}
                </p>
                {!setupStatus.success && setupStatus.details && (
                  <div className="mt-3 text-sm text-red-700">
                    <p className="font-medium mb-2">Detalhes da configuração:</p>
                    <ul className="space-y-1">
                      <li>• Banco de dados: {setupStatus.details.database ? "✅" : "❌"}</li>
                      <li>• Tabela products: {setupStatus.details.products_table ? "✅" : "❌"}</li>
                      <li>• Tabela promotions: {setupStatus.details.promotions_table ? "✅" : "❌"}</li>
                      <li>• Bucket storage: {setupStatus.details.storage_bucket ? "✅" : "❌"}</li>
                      <li>• Permissões storage: {setupStatus.details.storage_permissions ? "✅" : "❌"}</li>
                      <li>• Dados de exemplo: {setupStatus.details.sample_data ? "✅" : "❌"}</li>
                    </ul>
                    <p className="mt-3 font-medium">
                      Execute o script 'complete-database-setup.sql' no Supabase para corrigir os problemas.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-amber-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total de Produtos</p>
                <p className="text-2xl font-bold text-gray-900">{products.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Tag className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Promoções Ativas</p>
                <p className="text-2xl font-bold text-gray-900">{promotions.filter((p) => p.is_active).length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Categorias</p>
                <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Produtos em Promoção</p>
                <p className="text-2xl font-bold text-gray-900">
                  {products.filter((p) => getProductPromotion(p.id)).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions Bar */}
        {setupStatus?.success && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Buscar produtos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent w-full sm:w-64"
                  />
                </div>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent appearance-none bg-white"
                  >
                    <option value="">Todas as categorias</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <Link
                  href="/admin/upload"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <Upload size={16} />
                  Upload Imagens
                </Link>
                <Link
                  href="/admin/promotions"
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <Tag size={16} />
                  Promoções
                </Link>
                <Link
                  href="/admin/products/new"
                  className="bg-amber-800 hover:bg-amber-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <Plus size={16} />
                  Novo Produto
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {setupStatus?.success ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const promotion = getProductPromotion(product.id)
              return (
                <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="relative h-48">
                    {promotion && (
                      <div className="absolute top-2 left-2 z-10">
                        <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          -{promotion.discount_percentage}%
                        </div>
                      </div>
                    )}
                    <Image
                      src={product.images[0] || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "/placeholder.svg?height=192&width=300"
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">{product.category}</span>
                      <div className="text-right">
                        {promotion ? (
                          <div>
                            <span className="text-sm text-gray-500 line-through">R$ {product.price}</span>
                            <div className="text-lg font-bold text-red-600">
                              R$ {calculateDiscountedPrice(product.price, promotion.discount_percentage)}
                            </div>
                          </div>
                        ) : (
                          <span className="text-lg font-bold text-amber-900">R$ {product.price}</span>
                        )}
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/products/edit/${product.id}`}
                        className="flex-1 bg-amber-100 hover:bg-amber-200 text-amber-800 px-3 py-2 rounded text-sm font-medium flex items-center justify-center gap-1 transition-colors"
                      >
                        <Edit size={14} />
                        Editar
                      </Link>
                      <button
                        onClick={() => setShowDeleteModal(product.id)}
                        className="flex-1 bg-red-100 hover:bg-red-200 text-red-800 px-3 py-2 rounded text-sm font-medium flex items-center justify-center gap-1 transition-colors"
                      >
                        <Trash2 size={14} />
                        Excluir
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <AlertCircle className="mx-auto h-12 w-12 text-red-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Configuração Incompleta</h3>
            <p className="text-gray-600 mb-4">Execute o script 'complete-database-setup.sql' no Supabase primeiro.</p>
            <button
              onClick={handleRefreshSetup}
              className="inline-flex items-center gap-2 bg-amber-800 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <RefreshCw size={16} />
              Verificar Novamente
            </button>
          </div>
        )}

        {filteredProducts.length === 0 && setupStatus?.success && (
          <div className="text-center py-12">
            <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum produto encontrado</h3>
            <p className="text-gray-600">Tente ajustar os filtros ou adicione um novo produto.</p>
          </div>
        )}
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Confirmar Exclusão</h3>
            <p className="text-gray-600 mb-6">
              Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteModal(null)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDeleteProduct(showDeleteModal)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
