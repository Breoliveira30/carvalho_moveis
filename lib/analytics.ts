interface AnalyticsEvent {
  type: "page_view" | "product_view" | "image_view" | "category_view" | "whatsapp_click"
  timestamp: number
  data: any
  path?: string
}

class Analytics {
  private events: AnalyticsEvent[] = []

  constructor() {
    if (typeof window !== "undefined") {
      this.loadEvents()
    }
  }

  private loadEvents() {
    try {
      const stored = localStorage.getItem("analytics_events")
      if (stored) {
        this.events = JSON.parse(stored)
      }
    } catch (error) {
      console.error("Error loading analytics events:", error)
    }
  }

  private saveEvents() {
    try {
      localStorage.setItem("analytics_events", JSON.stringify(this.events))
    } catch (error) {
      console.error("Error saving analytics events:", error)
    }
  }

  trackPageView(path: string) {
    this.events.push({
      type: "page_view",
      timestamp: Date.now(),
      path,
      data: { path },
    })
    this.saveEvents()
  }

  trackProductView(productId: string, productName: string) {
    this.events.push({
      type: "product_view",
      timestamp: Date.now(),
      data: { productId, productName },
    })
    this.saveEvents()
  }

  trackImageView(productId: string, imageUrl: string) {
    this.events.push({
      type: "image_view",
      timestamp: Date.now(),
      data: { productId, imageUrl },
    })
    this.saveEvents()
  }

  trackCategoryView(category: string) {
    this.events.push({
      type: "category_view",
      timestamp: Date.now(),
      data: { category },
    })
    this.saveEvents()
  }

  trackWhatsAppClick(productId: string, productName: string) {
    this.events.push({
      type: "whatsapp_click",
      timestamp: Date.now(),
      data: { productId, productName },
    })
    this.saveEvents()
  }

  getPageViews(path?: string) {
    const pageViews = this.events.filter((event) => event.type === "page_view")
    if (path) {
      return pageViews.filter((event) => event.data.path === path).length
    }
    return pageViews.length
  }

  getProductViews(productId?: string) {
    const productViews = this.events.filter((event) => event.type === "product_view")
    if (productId) {
      return productViews.filter((event) => event.data.productId === productId).length
    }
    return productViews.length
  }

  getMostViewedProducts(limit = 10) {
    const productViews = this.events.filter((event) => event.type === "product_view")
    const counts: { [key: string]: { count: number; name: string } } = {}

    productViews.forEach((event) => {
      const { productId, productName } = event.data
      if (!counts[productId]) {
        counts[productId] = { count: 0, name: productName }
      }
      counts[productId].count++
    })

    return Object.entries(counts)
      .sort(([, a], [, b]) => b.count - a.count)
      .slice(0, limit)
      .map(([productId, data]) => ({
        productId,
        productName: data.name,
        views: data.count,
      }))
  }

  getMostViewedPages(limit = 10) {
    const pageViews = this.events.filter((event) => event.type === "page_view")
    const counts: { [key: string]: number } = {}

    pageViews.forEach((event) => {
      const path = event.data.path
      counts[path] = (counts[path] || 0) + 1
    })

    return Object.entries(counts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
      .map(([path, views]) => ({ path, views }))
  }

  getStats() {
    return {
      totalPageViews: this.getPageViews(),
      totalProductViews: this.getProductViews(),
      totalImageViews: this.events.filter((event) => event.type === "image_view").length,
      totalCategoryViews: this.events.filter((event) => event.type === "category_view").length,
      totalWhatsAppClicks: this.events.filter((event) => event.type === "whatsapp_click").length,
      mostViewedProducts: this.getMostViewedProducts(5),
      mostViewedPages: this.getMostViewedPages(5),
    }
  }

  clearEvents() {
    this.events = []
    this.saveEvents()
  }
}

export const analytics = new Analytics()

export const trackPageView = (path: string) => analytics.trackPageView(path)
export const trackProductView = (productId: string, productName: string) =>
  analytics.trackProductView(productId, productName)
export const trackImageView = (productId: string, imageUrl: string) => analytics.trackImageView(productId, imageUrl)
export const trackCategoryView = (category: string) => analytics.trackCategoryView(category)
export const trackWhatsAppClick = (productId: string, productName: string) =>
  analytics.trackWhatsAppClick(productId, productName)
