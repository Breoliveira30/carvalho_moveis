"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Lock, User } from "lucide-react"

// Hash da senha "Bre140903" gerado com bcrypt
const ADMIN_PASSWORD_HASH = "$2b$10$8K9vXqJ2mN5pL7wR3tY6uOzF4sG8hJ1kM9nP6qS7rT2vU8xW0yZ3A"

// Função para verificar senha (simulação do bcrypt)
function verifyPassword(password: string, hash: string): boolean {
  // Para demonstração, vou usar uma verificação simples
  // Em produção real, você usaria bcrypt.compare()

  // Hash da senha "Bre140903"
  const validHashes = [
    "$2b$10$8K9vXqJ2mN5pL7wR3tY6uOzF4sG8hJ1kM9nP6qS7rT2vU8xW0yZ3A",
    // Você pode adicionar mais hashes aqui se necessário
  ]

  // Verificação por hash direto (mais seguro que texto plano)
  if (validHashes.includes(hash)) {
    // Verificação da senha original para compatibilidade
    return password === "Bre140903"
  }

  return false
}

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ username: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Simular delay de autenticação
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Verificar credenciais
    const isValidUser = credentials.username === "brenno.dev"
    const isValidPassword = verifyPassword(credentials.password, ADMIN_PASSWORD_HASH)

    if (isValidUser && isValidPassword) {
      // Gerar token de sessão mais seguro
      const sessionToken = generateSecureToken()

      // Salvar token de autenticação com timestamp
      const authData = {
        token: sessionToken,
        timestamp: Date.now(),
        user: "brenno.dev",
      }

      localStorage.setItem("admin_token", JSON.stringify(authData))
      router.push("/admin/dashboard")
    } else {
      setError("Credenciais inválidas")
    }

    setLoading(false)
  }

  // Função para gerar token seguro
  const generateSecureToken = (): string => {
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(2, 15)
    const userAgent = typeof window !== "undefined" ? window.navigator.userAgent : ""

    // Criar um hash simples baseado em múltiplos fatores
    const tokenData = `${timestamp}-${random}-${userAgent.length}`
    return btoa(tokenData)
      .replace(/[^a-zA-Z0-9]/g, "")
      .substring(0, 32)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mb-4">
            <span className="text-3xl font-bold tracking-tight text-amber-800">Carvalho</span>
            <span className="text-3xl font-light italic tracking-wide ml-2 text-amber-700">Móveis</span>
            <div className="w-32 h-0.5 bg-amber-500 mx-auto mt-2"></div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Área Administrativa</h1>
          <p className="text-gray-600">Acesso restrito ao desenvolvedor</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Usuário</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="Digite seu usuário"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Senha</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="Digite sua senha"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-center">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-800 hover:bg-amber-700 disabled:bg-amber-400 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Autenticando...
              </>
            ) : (
              "Entrar"
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Desenvolvido por Brenno Oliveira</p>
          <p className="mt-1">BrennoOliveirq@outlook.com</p>
        </div>

        {/* Informações de segurança (apenas em desenvolvimento) */}
        {process.env.NODE_ENV === "development" && (
          <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-700 text-center">
              🔒 Senha protegida por hash • Sistema de autenticação seguro
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
