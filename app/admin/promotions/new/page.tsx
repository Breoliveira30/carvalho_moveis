"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Save, Tag } from "lucide-react"
import { getProducts, createPromotion, type Product } from "@/lib/supabase"

export default function NewPromotion() {
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [initialLoading, setInitialLoading] = useState(true)
  const router = useRouter()

  const [formData, setFormData] = useState({
    product_id: "",
    discount_percentage: "",
    start_date: "",
    end_date: "",
    is_active: true,
  })

  useEffect(() => {
    const token = localStorage.getItem("admin_token")
    if (!token) {
      router.push("/admin/login")
      return
    }

    loadProducts()
  }, [router])

  const loadProducts = async () => {
    setInitialLoading(true)
    const productsData = await getProducts()
    setProducts(productsData)
    setInitialLoading(false)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const promotionData = {
        product_id: formData.product_id,
        discount_percentage: Number.parseInt(formData.discount_percentage),
        start_date: new Date(formData.start_date).toISOString(),
        end_date: new Date(formData.end_date).toISOString(),
        is_active: formData.is_active,
      }

      const result = await createPromotion(promotionData)
      if (result) {
        // Revalidar cache do site
        try {
          await fetch("/api/revalidate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ path: "/produtos" }),
          })
          console.log("Cache revalidado com sucesso")
        } catch (error) {
          console.error("Erro ao revalidar cache:", error)
        }

        router.push("/admin/promotions")
      }
    } catch (error) {
      console.error("Erro ao criar promoção:", error)
    } finally {
      setLoading(false)
    }
  }

  if (initialLoading) {
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
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Link
            href="/admin/promotions"
            className="inline-flex items-center gap-2 text-amber-800 hover:text-amber-600 mb-4"
          >
            <ArrowLeft size={20} />
            Voltar às Promoções
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Nova Promoção</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Tag className="text-amber-600" size={20} />
              Detalhes da Promoção
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Produto *</label>
                <select
                  value={formData.product_id}
                  onChange={(e) => handleInputChange("product_id", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                >
                  <option value="">Selecione um produto</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name} - R$ {product.price}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Desconto (%) *</label>
                <input
                  type="number"
                  min="1"
                  max="99"
                  value={formData.discount_percentage}
                  onChange={(e) => handleInputChange("discount_percentage", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Ex: 15"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">Digite apenas o número (ex: 15 para 15%)</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Data de Início *</label>
                  <input
                    type="datetime-local"
                    value={formData.start_date}
                    onChange={(e) => handleInputChange("start_date", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Data de Fim *</label>
                  <input
                    type="datetime-local"
                    value={formData.end_date}
                    onChange={(e) => handleInputChange("end_date", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={(e) => handleInputChange("is_active", e.target.checked)}
                  className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                />
                <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900">
                  Promoção ativa
                </label>
              </div>
            </div>
          </div>

          {/* Preview da Promoção */}
          {formData.product_id && formData.discount_percentage && (
            <div className="bg-amber-50 rounded-lg p-6 border border-amber-200">
              <h3 className="text-lg font-semibold text-amber-900 mb-4">Preview da Promoção</h3>
              {(() => {
                const selectedProduct = products.find((p) => p.id === formData.product_id)
                if (!selectedProduct) return null

                const originalPrice = Number.parseFloat(selectedProduct.price.replace(".", "").replace(",", "."))
                const discountAmount = (originalPrice * Number.parseInt(formData.discount_percentage)) / 100
                const finalPrice = originalPrice - discountAmount

                return (
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{selectedProduct.name}</h4>
                        <p className="text-sm text-gray-600">{selectedProduct.category}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                            -{formData.discount_percentage}%
                          </span>
                        </div>
                        <div className="mt-1">
                          <span className="text-sm text-gray-500 line-through">R$ {selectedProduct.price}</span>
                          <div className="text-lg font-bold text-red-600">
                            R${" "}
                            {finalPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })()}
            </div>
          )}

          {/* Botões */}
          <div className="flex gap-4 justify-end">
            <Link
              href="/admin/promotions"
              className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-amber-800 hover:bg-amber-700 disabled:bg-amber-400 text-white rounded-lg flex items-center gap-2 transition-colors"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Criando...
                </>
              ) : (
                <>
                  <Save size={16} />
                  Criar Promoção
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
