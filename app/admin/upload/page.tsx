"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Upload, ImageIcon, Trash2, Eye, AlertCircle, CheckCircle } from "lucide-react"
import { uploadImage, listImages, deleteImage, testStorageConnection, testDatabaseConnection } from "@/lib/supabase"

export default function UploadPage() {
  const [uploading, setUploading] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [storageStatus, setStorageStatus] = useState<{ success: boolean; message: string } | null>(null)
  const [dbStatus, setDbStatus] = useState<{ success: boolean; message: string } | null>(null)
  const [uploadProgress, setUploadProgress] = useState<string[]>([])
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("admin_token")
    if (!token) {
      router.push("/admin/login")
      return
    }

    initializePage()
  }, [router])

  const initializePage = async () => {
    setLoading(true)

    // Testar conexões
    const [storageResult, dbResult] = await Promise.all([testStorageConnection(), testDatabaseConnection()])

    setStorageStatus(storageResult)
    setDbStatus(dbResult)

    // Carregar imagens se storage estiver funcionando
    if (storageResult.success) {
      await loadImages()
    }

    setLoading(false)
  }

  const loadImages = async () => {
    try {
      const imageList = await listImages()
      setImages(imageList)
    } catch (error) {
      console.error("Erro ao carregar imagens:", error)
    }
  }

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return

    if (!storageStatus?.success) {
      alert("Storage não configurado. Execute o script 'setup-storage-v4.sql' primeiro.")
      return
    }

    setUploading(true)
    setUploadProgress([])

    const fileArray = Array.from(files)
    const results: string[] = []

    for (let i = 0; i < fileArray.length; i++) {
      const file = fileArray[i]

      try {
        setUploadProgress((prev) => [...prev, `Enviando ${file.name}...`])

        const timestamp = Date.now()
        const fileName = `${timestamp}-${file.name}`
        const imagePath = `products/${fileName}`

        const imageUrl = await uploadImage(file, imagePath)

        if (imageUrl) {
          results.push(`✅ ${file.name} - Sucesso`)
        } else {
          results.push(`❌ ${file.name} - Falhou`)
        }
      } catch (error) {
        console.error(`Erro ao enviar ${file.name}:`, error)
        results.push(`❌ ${file.name} - Erro: ${error}`)
      }
    }

    setUploadProgress(results)

    // Recarregar lista de imagens
    await loadImages()

    setUploading(false)

    // Mostrar resultado
    const successCount = results.filter((r) => r.includes("✅")).length
    if (successCount > 0) {
      alert(`${successCount} de ${fileArray.length} imagem(ns) enviada(s) com sucesso!`)
    }
  }

  const handleDeleteImage = async (imageName: string) => {
    if (!confirm("Tem certeza que deseja excluir esta imagem?")) return

    const success = await deleteImage(`products/${imageName}`)
    if (success) {
      alert("Imagem excluída com sucesso!")
      loadImages()
    } else {
      alert("Erro ao excluir imagem")
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileUpload(files)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center gap-2 text-amber-800 hover:text-amber-600 mb-4"
          >
            <ArrowLeft size={20} />
            Voltar ao Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Gerenciar Imagens</h1>
          <p className="text-gray-600 mt-2">Faça upload e gerencie as imagens dos produtos</p>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Database Status */}
          {dbStatus && (
            <div
              className={`p-4 rounded-lg flex items-center gap-3 ${
                dbStatus.success ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
              }`}
            >
              {dbStatus.success ? (
                <CheckCircle className="text-green-600" size={20} />
              ) : (
                <AlertCircle className="text-red-600" size={20} />
              )}
              <div>
                <h3 className={`font-medium ${dbStatus.success ? "text-green-800" : "text-red-800"}`}>
                  Banco de Dados
                </h3>
                <p className={`text-sm ${dbStatus.success ? "text-green-700" : "text-red-700"}`}>{dbStatus.message}</p>
              </div>
            </div>
          )}

          {/* Storage Status */}
          {storageStatus && (
            <div
              className={`p-4 rounded-lg flex items-center gap-3 ${
                storageStatus.success ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
              }`}
            >
              {storageStatus.success ? (
                <CheckCircle className="text-green-600" size={20} />
              ) : (
                <AlertCircle className="text-red-600" size={20} />
              )}
              <div>
                <h3 className={`font-medium ${storageStatus.success ? "text-green-800" : "text-red-800"}`}>
                  Storage de Imagens
                </h3>
                <p className={`text-sm ${storageStatus.success ? "text-green-700" : "text-red-700"}`}>
                  {storageStatus.message}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Upload Area */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Upload de Imagens</h2>

          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              storageStatus?.success ? "border-gray-300 hover:border-amber-400" : "border-red-300 bg-red-50"
            }`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <Upload className={`mx-auto h-12 w-12 mb-4 ${storageStatus?.success ? "text-gray-400" : "text-red-400"}`} />

            {storageStatus?.success ? (
              <>
                <div className="text-lg font-medium text-gray-900 mb-2">
                  Arraste imagens aqui ou clique para selecionar
                </div>
                <p className="text-gray-600 mb-4">Suporte para JPG, PNG, WebP, GIF e AVIF. Máximo 50MB por arquivo.</p>
                <label className="cursor-pointer">
                  <span className="bg-amber-800 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center gap-2">
                    <Upload size={16} />
                    {uploading ? "Enviando..." : "Selecionar Imagens"}
                  </span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e.target.files)}
                    disabled={uploading}
                  />
                </label>
              </>
            ) : (
              <div className="text-red-700">
                <p className="font-medium mb-2">Storage não configurado</p>
                <p className="text-sm">Execute o script 'setup-storage-v4.sql' no Supabase primeiro</p>
              </div>
            )}
          </div>

          {/* Upload Progress */}
          {uploadProgress.length > 0 && (
            <div className="mt-6 bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3">Progresso do Upload:</h3>
              <div className="space-y-1 max-h-40 overflow-y-auto">
                {uploadProgress.map((progress, index) => (
                  <div key={index} className="text-sm font-mono">
                    {progress}
                  </div>
                ))}
              </div>
            </div>
          )}

          {uploading && (
            <div className="mt-4 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-800 mx-auto mb-2"></div>
              <p className="text-amber-600">Fazendo upload das imagens...</p>
            </div>
          )}
        </div>

        {/* Images Gallery */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Imagens Enviadas ({images.length})</h2>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-800 mx-auto mb-2"></div>
              <p className="text-gray-600">Carregando imagens...</p>
            </div>
          ) : !storageStatus?.success ? (
            <div className="text-center py-8">
              <AlertCircle className="mx-auto h-12 w-12 text-red-400 mb-4" />
              <p className="text-red-600">Storage não configurado</p>
              <p className="text-sm text-red-500 mt-1">Execute o script 'setup-storage-v4.sql' primeiro</p>
            </div>
          ) : images.length === 0 ? (
            <div className="text-center py-8">
              <ImageIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-600">Nenhuma imagem encontrada</p>
              <p className="text-sm text-gray-500 mt-1">Faça upload de algumas imagens para começar</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {images.map((imageName, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={`https://pkpiiagnxvgagdsykcad.supabase.co/storage/v1/object/public/product-images/products/${imageName}`}
                      alt={imageName}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "/placeholder.svg?height=200&width=200"
                      }}
                    />
                  </div>

                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                    <button
                      onClick={() =>
                        window.open(
                          `https://pkpiiagnxvgagdsykcad.supabase.co/storage/v1/object/public/product-images/products/${imageName}`,
                          "_blank",
                        )
                      }
                      className="bg-white text-gray-900 p-2 rounded-full hover:bg-gray-100 transition-colors"
                      title="Visualizar"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteImage(imageName)}
                      className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
                      title="Excluir"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <p className="text-xs text-gray-600 mt-2 truncate" title={imageName}>
                    {imageName}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-amber-900 mb-4">Instruções de Uso</h3>
          <ul className="space-y-2 text-amber-800">
            <li>• Execute o script 'setup-storage-v4.sql' no Supabase se o storage não estiver funcionando</li>
            <li>• As imagens enviadas aqui podem ser usadas nos produtos</li>
            <li>• Recomenda-se usar nomes descritivos para as imagens</li>
            <li>• Formato ideal: 600x400px para melhor qualidade</li>
            <li>• Mantenha as imagens organizadas por categoria</li>
            <li>• Suporte para arrastar e soltar múltiplas imagens</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
