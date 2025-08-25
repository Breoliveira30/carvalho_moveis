"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Plus, Edit, Trash2, Tag, Calendar, Percent } from "lucide-react"
import { getPromotions, getProducts, deletePromotion, type Promotion, type Product } from "@/lib/supabase"

export default function PromotionsPage() {
  const [promotions, setPromotions] = useState<Promotion[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("admin_token")
    if (!token) {
      router.push("/admin/login")
      return
    }

    loadData()
  }, [router])

  const loadData = async () => {
    setLoading(true)
    const [promotionsData, productsData] = await Promise.all([getPromotions(), getProducts()])
    setPromotions(promotionsData)
    setProducts(productsData)
    setLoading(false)
  }

  const handleDeletePromotion = async (id: string) => {
    const success = await deletePromotion(id)
    if (success) {
      setPromotions(promotions.filter((p) => p.id !== id))
      setShowDeleteModal(null)
    }
  }

  const getProductName = (productId: string) => {
    const product = products.find((p) => p.id === productId)
    return product?.name || "Produto não encontrado"
  }

  const isPromotionActive = (promotion: Promotion) => {
    const now = new Date()
    const startDate = new Date(promotion.start_date)
    const endDate = new Date(promotion.end_date)
    return promotion.is_active && now >= startDate && now <= endDate
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-800 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center gap-2 text-amber-800 hover:text-amber-600 mb-4"
          >
            <ArrowLeft size={20} />
            Voltar ao Dashboard
          </Link>
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Gerenciar Promoções</h1>
            <Link
              href="/admin/promotions/new"
              className="bg-amber-800 hover:bg-amber-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus size={16} />
              Nova Promoção
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Tag className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Promoções Ativas</p>
                <p className="text-2xl font-bold text-gray-900">
                  {promotions.filter((p) => isPromotionActive(p)).length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total de Promoções</p>
                <p className="text-2xl font-bold text-gray-900">{promotions.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Percent className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Desconto Médio</p>
                <p className="text-2xl font-bold text-gray-900">
                  {promotions.length > 0
                    ? Math.round(promotions.reduce((acc, p) => acc + p.discount_percentage, 0) / promotions.length)
                    : 0}
                  %
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Promotions List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Lista de Promoções</h2>
          </div>

          {promotions.length === 0 ? (
            <div className="text-center py-12">
              <Tag className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma promoção encontrada</h3>
              <p className="text-gray-600 mb-4">Crie sua primeira promoção para atrair mais clientes.</p>
              <Link
                href="/admin/promotions/new"
                className="inline-flex items-center gap-2 bg-amber-800 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Plus size={16} />
                Nova Promoção
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Produto
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Desconto
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Período
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {promotions.map((promotion) => (
                    <tr key={promotion.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{getProductName(promotion.product_id)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-bold">
                            -{promotion.discount_percentage}%
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div>
                          <div>{formatDate(promotion.start_date)}</div>
                          <div className="text-gray-500">até {formatDate(promotion.end_date)}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            isPromotionActive(promotion) ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {isPromotionActive(promotion) ? "Ativa" : "Inativa"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <Link
                            href={`/admin/promotions/edit/${promotion.id}`}
                            className="text-amber-600 hover:text-amber-900"
                          >
                            <Edit size={16} />
                          </Link>
                          <button
                            onClick={() => setShowDeleteModal(promotion.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Confirmar Exclusão</h3>
            <p className="text-gray-600 mb-6">
              Tem certeza que deseja excluir esta promoção? Esta ação não pode ser desfeita.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteModal(null)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDeletePromotion(showDeleteModal)}
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
