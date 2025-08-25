"use client"

import { useEffect, useState } from "react"
import { analytics } from "@/lib/analytics"

export function useAnalytics() {
  const [stats, setStats] = useState(analytics.getStats())

  useEffect(() => {
    const updateStats = () => {
      setStats(analytics.getStats())
    }

    // Atualizar stats a cada 30 segundos
    const interval = setInterval(updateStats, 30000)

    // Atualizar quando a página ganha foco
    const handleFocus = () => updateStats()
    window.addEventListener("focus", handleFocus)

    return () => {
      clearInterval(interval)
      window.removeEventListener("focus", handleFocus)
    }
  }, [])

  return stats
}
