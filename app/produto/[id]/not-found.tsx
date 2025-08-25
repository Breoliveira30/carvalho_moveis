import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold text-amber-900 mb-4">Produto não encontrado</h1>
        <p className="text-lg text-amber-700 mb-8">O produto que você está procurando não existe ou foi removido.</p>
        <Link
          href="/produtos"
          className="inline-flex items-center gap-2 bg-amber-800 hover:bg-amber-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
        >
          <ArrowLeft size={20} />
          Voltar aos Produtos
        </Link>
      </div>
    </div>
  )
}
