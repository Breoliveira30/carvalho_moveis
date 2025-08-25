"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Save, Upload, X } from "lucide-react"
import { getProduct, updateProduct, uploadImage } from "@/lib/supabase"

interface EditProductPageProps {
  params: {
    id: string
  }
}

export default function EditProduct({ params }: EditProductPageProps) {
  const [loading, setLoading] = useState(false)
  const [uploadingImages, setUploadingImages] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    materials: [""],
    dimensions: {
      largura: "",
      profundidade: "",
      altura: "",
      peso: "",
    },
    features: [""],
    detailed_description: "",
    images: ["", "", "", ""],
  })

  const categories = ["Sofás", "Mesas", "Camas", "Balcões", "Racks", "Guarda-roupas"]

  useEffect(() => {
    const token = localStorage.getItem("admin_token")
    if (!token) {
      router.push("/admin/login")
      return
    }

    loadProduct()
  }, [router, params.id])

  const loadProduct = async () => {
    setInitialLoading(true)
    const product = await getProduct(params.id)

    if (!product) {
      router.push("/admin/dashboard")
      return
    }

    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      materials: product.materials.length > 0 ? product.materials : [""],
      dimensions: product.dimensions,
      features: product.features.length > 0 ? product.features : [""],
      detailed_description: product.detailed_description || "",
      images: [product.images[0] || "", product.images[1] || "", product.images[2] || "", product.images[3] || ""],
    })
    setInitialLoading(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleDimensionChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      dimensions: { ...prev.dimensions, [field]: value },
    }))
  }

  const handleArrayChange = (field: "materials" | "features", index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }))
  }

  const addArrayItem = (field: "materials" | "features") => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }))
  }

  const removeArrayItem = (field: "materials" | "features", index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }))
  }

  const handleImageUpload = async (index: number, file: File) => {
    setUploadingImages(true)
    try {
      const timestamp = Date.now()
      const fileName = `${timestamp}-${file.name}`
      const imagePath = `products/${fileName}`

      const imageUrl = await uploadImage(file, imagePath)
      if (imageUrl) {
        setFormData((prev) => ({
          ...prev,
          images: prev.images.map((img, i) => (i === index ? imageUrl : img)),
        }))
      }
    } catch (error) {
      console.error("Erro ao fazer upload da imagem:", error)
    } finally {
      setUploadingImages(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Filtrar arrays vazios
      const cleanedData = {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        category: formData.category,
        materials: formData.materials.filter((m) => m.trim() !== ""),
        features: formData.features.filter((f) => f.trim() !== ""),
        images: formData.images.filter((img) => img.trim() !== ""),
        dimensions: formData.dimensions,
        detailed_description: formData.detailed_description,
      }

      const result = await updateProduct(params.id, cleanedData)
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

        router.push("/admin/dashboard")
      }
    } catch (error) {
      console.error("Erro ao atualizar produto:", error)
    } finally {
      setLoading(false)
    }
  }

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-800 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando produto...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center gap-2 text-amber-800 hover:text-amber-600 mb-4"
          >
            <ArrowLeft size={20} />
            Voltar ao Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Editar Produto</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Informações Básicas */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Informações Básicas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nome do Produto *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Categoria *</label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange("category", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                >
                  <option value="">Selecione uma categoria</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preço (R$) *</label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  placeholder="Ex: 2.499,00"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Descrição Curta *</label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                required
              />
            </div>
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Descrição Detalhada</label>
              <textarea
                value={formData.detailed_description}
                onChange={(e) => handleInputChange("detailed_description", e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Dimensões */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Dimensões</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Largura</label>
                <input
                  type="text"
                  value={formData.dimensions.largura}
                  onChange={(e) => handleDimensionChange("largura", e.target.value)}
                  placeholder="Ex: 200 cm"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Profundidade</label>
                <input
                  type="text"
                  value={formData.dimensions.profundidade}
                  onChange={(e) => handleDimensionChange("profundidade", e.target.value)}
                  placeholder="Ex: 90 cm"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Altura</label>
                <input
                  type="text"
                  value={formData.dimensions.altura}
                  onChange={(e) => handleDimensionChange("altura", e.target.value)}
                  placeholder="Ex: 85 cm"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Peso</label>
                <input
                  type="text"
                  value={formData.dimensions.peso}
                  onChange={(e) => handleDimensionChange("peso", e.target.value)}
                  placeholder="Ex: 45 kg"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Materiais */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Materiais</h2>
            {formData.materials.map((material, index) => (
              <div key={index} className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={material}
                  onChange={(e) => handleArrayChange("materials", index, e.target.value)}
                  placeholder="Ex: MDF de alta qualidade"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
                {formData.materials.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem("materials", index)}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem("materials")}
              className="text-amber-800 hover:text-amber-600 text-sm font-medium"
            >
              + Adicionar Material
            </button>
          </div>

          {/* Características */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Características</h2>
            {formData.features.map((feature, index) => (
              <div key={index} className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => handleArrayChange("features", index, e.target.value)}
                  placeholder="Ex: Estrutura resistente"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
                {formData.features.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem("features", index)}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem("features")}
              className="text-amber-800 hover:text-amber-600 text-sm font-medium"
            >
              + Adicionar Característica
            </button>
          </div>

          {/* Imagens */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Imagens do Produto</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {formData.images.map((image, index) => (
                <div key={index} className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <div className="text-center">
                    {image ? (
                      <div className="space-y-4">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-32 object-cover rounded"
                        />
                        <p className="text-xs text-green-600">✓ Imagem carregada</p>
                        <div>
                          <label className="cursor-pointer">
                            <span className="text-amber-800 font-medium hover:text-amber-600 text-sm">
                              Alterar imagem
                            </span>
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) handleImageUpload(index, file)
                              }}
                            />
                          </label>
                        </div>
                      </div>
                    ) : (
                      <>
                        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <div className="text-sm text-gray-600 mb-4">
                          <label className="cursor-pointer">
                            <span className="text-amber-800 font-medium hover:text-amber-600">
                              Clique para fazer upload
                            </span>
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) handleImageUpload(index, file)
                              }}
                            />
                          </label>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {uploadingImages && (
              <div className="mt-4 text-center text-amber-600">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-amber-600 mx-auto mb-2"></div>
                Fazendo upload das imagens...
              </div>
            )}
          </div>

          {/* Botões */}
          <div className="flex gap-4 justify-end">
            <Link
              href="/admin/dashboard"
              className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={loading || uploadingImages}
              className="px-6 py-3 bg-amber-800 hover:bg-amber-700 disabled:bg-amber-400 text-white rounded-lg flex items-center gap-2 transition-colors"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Salvando...
                </>
              ) : (
                <>
                  <Save size={16} />
                  Salvar Alterações
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
