"use client"

import { useEffect } from "react"
import { trackProductView } from "@/lib/analytics"

interface ProductTrackerProps {
  productId: string
  productName: string
}

export default function ProductTracker({ productId, productName }: ProductTrackerProps) {
  useEffect(() => {
    trackProductView(productId, productName)
  }, [productId, productName])

  return null
}
