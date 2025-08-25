import { notFound } from "next/navigation"
import { getProductById } from "@/lib/products"
import ProductPageClient from "./product-page-client"

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const product = getProductById(id)

  if (!product) {
    notFound()
  }

  return <ProductPageClient product={product} />
}
