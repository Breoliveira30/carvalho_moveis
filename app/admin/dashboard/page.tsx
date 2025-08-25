"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  MessageSquare,
  TrendingUp,
  RefreshCw,
  Eye,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import { useAnalytics } from "@/hooks/use-analytics"
import { analytics } from "@/lib/analytics"
import { getAllProducts } from "@/lib/products-data"

export default function AdminDashboard() {
  const router = useRouter()
  const { stats, isLoading, refreshStats } = useAnalytics()
  const [activeTab, setActiveTab] = useState("overview")
  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    // Verificar autenticação
    const token = localStorage.getItem("admin_token")
    if (!token) {
      router.push("/admin/login")
      return
    }

    // Carregar produtos
    loadProducts()
  }, [router])

  const loadProducts = async () => {
    try {
      const productsData = await getAllProducts()
      setProducts(productsData)
    } catch (error) {
      console.error("Erro ao carregar produtos:", error)
    }
  }

  const handleContactStatusChange = (contactId: string, status: "new" | "read" | "responded") => {
    analytics.updateContactStatus(contactId, status)
    refreshStats()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-red-100 text-red-800"
      case "read":
        return "bg-yellow-100 text-yellow-800"
      case "responded":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "new":
        return <AlertCircle className="w-4 h-4" />
      case "read":
        return <Eye className="w-4 h-4" />
      case "responded":
        return <CheckCircle className="w-4 h-4" />
      default:
        return null
    }
  }

  const getProductName = (productId: string) => {
    const product = products.find((p) => p.id === productId)
    return product ? product.name : `Produto ${productId}`
  }

  return (
    <div className="min-h-screen bg-amber-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-amber-900">Dashboard Administrativo</h1>
            <p className="text-amber-700 mt-2">Acompanhe as métricas do seu site em tempo real</p>
          </div>
          <Button
            onClick={refreshStats}
            disabled={isLoading}
            variant="outline"
            className="flex items-center gap-2 bg-transparent"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
            Atualizar Dados
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="contacts">Contatos</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total de Visualizações</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalViews}</div>
                  <p className="text-xs text-muted-foreground">+{stats.todayStats.views} hoje</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Visitantes Únicos</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.uniqueVisitors}</div>
                  <p className="text-xs text-muted-foreground">+{stats.todayStats.visitors} hoje</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Contatos Recebidos</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalContacts}</div>
                  <p className="text-xs text-muted-foreground">+{stats.todayStats.contacts} hoje</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.conversionRate}%</div>
                  <p className="text-xs text-muted-foreground">Contatos/Visitantes</p>
                </CardContent>
              </Card>
            </div>

            {/* Top Products */}
            <Card>
              <CardHeader>
                <CardTitle>Produtos Mais Visualizados</CardTitle>
                <CardDescription>Os produtos que mais despertam interesse</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats.topProducts.length > 0 ? (
                    stats.topProducts.map((product, index) => (
                      <div key={product.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-sm font-bold text-amber-800">
                            {index + 1}
                          </div>
                          <span className="font-medium">{getProductName(product.id)}</span>
                        </div>
                        <Badge variant="secondary">{product.views} visualizações</Badge>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground">Nenhum produto visualizado ainda</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Atividade dos Últimos 7 Dias</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {stats.weeklyStats.map((day) => (
                    <div
                      key={day.date}
                      className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                    >
                      <span className="text-sm font-medium">
                        {new Date(day.date).toLocaleDateString("pt-BR", {
                          weekday: "short",
                          day: "2-digit",
                          month: "2-digit",
                        })}
                      </span>
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <span>{day.views} views</span>
                        <span>{day.visitors} visitantes</span>
                        <span>{day.contacts} contatos</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contacts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciar Contatos</CardTitle>
                <CardDescription>Visualize e gerencie todos os contatos recebidos pelo site</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats.recentContacts.length > 0 ? (
                    stats.recentContacts.map((contact) => (
                      <Card key={contact.id} className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-lg">{contact.name}</h4>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                              <span className="flex items-center gap-1">
                                <Mail className="w-3 h-3" />
                                {contact.email}
                              </span>
                              {contact.phone && (
                                <span className="flex items-center gap-1">
                                  <Phone className="w-3 h-3" />
                                  {contact.phone}
                                </span>
                              )}
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {new Date(contact.timestamp).toLocaleString("pt-BR")}
                              </span>
                            </div>
                          </div>
                          <Badge className={getStatusColor(contact.status)}>
                            <span className="flex items-center gap-1">
                              {getStatusIcon(contact.status)}
                              {contact.status === "new" ? "Novo" : contact.status === "read" ? "Lido" : "Respondido"}
                            </span>
                          </Badge>
                        </div>

                        <p className="text-gray-700 mb-4 p-3 bg-gray-50 rounded-md">{contact.message}</p>

                        <div className="flex gap-2">
                          {contact.status === "new" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleContactStatusChange(contact.id, "read")}
                            >
                              Marcar como Lido
                            </Button>
                          )}
                          {contact.status === "read" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleContactStatusChange(contact.id, "responded")}
                            >
                              Marcar como Respondido
                            </Button>
                          )}
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => {
                              const message = `Olá ${contact.name}! Recebemos sua mensagem sobre: "${contact.message.substring(0, 50)}..."`
                              const whatsappUrl = `https://wa.me/55${contact.phone?.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`
                              window.open(whatsappUrl, "_blank")
                            }}
                          >
                            Responder via WhatsApp
                          </Button>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Nenhum contato recebido ainda</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Métricas de Hoje</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Visualizações</span>
                    <Badge variant="secondary">{stats.todayStats.views}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Novos Visitantes</span>
                    <Badge variant="secondary">{stats.todayStats.visitors}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Contatos</span>
                    <Badge variant="secondary">{stats.todayStats.contacts}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Cliques no WhatsApp</span>
                    <Badge variant="secondary">{stats.whatsappClicks}</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Resumo Geral</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Total de Páginas Vistas</span>
                    <Badge>{stats.totalViews}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Visitantes Únicos</span>
                    <Badge>{stats.uniqueVisitors}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Total de Contatos</span>
                    <Badge>{stats.totalContacts}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Taxa de Conversão</span>
                    <Badge variant="outline">{stats.conversionRate}%</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Informações do Sistema</CardTitle>
                <CardDescription>Dados técnicos e configurações do sistema de analytics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold mb-2">Armazenamento</h4>
                    <p className="text-muted-foreground">
                      Os dados são armazenados localmente no navegador usando localStorage. Isso garante privacidade
                      total dos dados dos visitantes.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Atualização</h4>
                    <p className="text-muted-foreground">
                      Os dados são atualizados automaticamente a cada 30 segundos. Use o botão "Atualizar Dados" para
                      forçar uma atualização imediata.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Privacidade</h4>
                    <p className="text-muted-foreground">
                      Não coletamos dados pessoais dos visitantes. Apenas métricas agregadas de uso do site são
                      registradas.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Backup</h4>
                    <p className="text-muted-foreground">
                      Recomendamos fazer backup regular dos dados importantes. Os dados podem ser perdidos se o cache do
                      navegador for limpo.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
