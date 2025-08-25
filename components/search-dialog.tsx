"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { searchProducts, type Product } from "@/lib/products"

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Product[]>([])
  const router = useRouter()

  useEffect(() => {
    if (query.length > 0) {
      const searchResults = searchProducts(query)
      setResults(searchResults)
    } else {
      setResults([])
    }
  }, [query])

  const handleSelect = (productId: string) => {
    onOpenChange(false)
    router.push(`/produto/${productId}`)
    setQuery("")
  }

  const handleSearchAll = () => {
    onOpenChange(false)
    router.push(`/produtos?search=${encodeURIComponent(query)}`)
    setQuery("")
  }

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput
        placeholder="Buscar produtos... (sofás, camas, guarda-roupas)"
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        <CommandEmpty>
          <div className="text-center py-6">
            <p className="text-sm text-muted-foreground mb-2">Nenhum produto encontrado para "{query}"</p>
            {query && (
              <button onClick={handleSearchAll} className="text-sm text-amber-600 hover:text-amber-700 underline">
                Ver todos os resultados
              </button>
            )}
          </div>
        </CommandEmpty>
        {results.length > 0 && (
          <CommandGroup heading="Produtos">
            {results.slice(0, 8).map((product) => (
              <CommandItem
                key={product.id}
                value={product.id}
                onSelect={() => handleSelect(product.id)}
                className="flex items-center gap-3 p-3"
              >
                <img
                  src={product.images[0] || "/placeholder.svg"}
                  alt={product.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-muted-foreground">{product.category}</p>
                  <p className="text-sm font-semibold text-amber-600">
                    R$ {product.price.toFixed(2).replace(".", ",")}
                  </p>
                </div>
              </CommandItem>
            ))}
            {results.length > 8 && (
              <CommandItem onSelect={handleSearchAll} className="text-center py-3">
                <span className="text-sm text-amber-600">Ver todos os {results.length} resultados</span>
              </CommandItem>
            )}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  )
}
