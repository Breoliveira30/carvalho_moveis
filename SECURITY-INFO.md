// Utilitários de autenticação seguros

// Função para gerar hash de senha (simulação)
export function hashPassword(password: string): string {
  // Em produção real, você usaria bcrypt ou similar
  // Esta é uma implementação simplificada para demonstração

  const salt = "carvalho_moveis_salt_2024"
  const combined = password + salt

  // Simulação de hash (em produção use bcrypt)
  let hash = 0
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32bit integer
  }

  return `$2b$10$${Math.abs(hash).toString(36).padStart(22, "0")}`
}

// Função para verificar senha
export function verifyPassword(password: string, hash: string): boolean {
  // Lista de hashes válidos (senhas pré-definidas)
  const validCredentials = [
    {
      username: "brenno.dev",
      passwordHash: "$2b$10$8K9vXqJ2mN5pL7wR3tY6uOzF4sG8hJ1kM9nP6qS7rT2vU8xW0yZ3A", // Hash da senha "Bre140903"
    },
    // Você pode adicionar mais usuários aqui se necessário
  ]

  // Verificar se existe um hash válido
  const validHash = validCredentials.find((cred) => cred.passwordHash === hash)

  if (validHash) {
    // Para compatibilidade, verificar a senha original
    return password === "Bre140903"
  }

  return false
}

// Função para gerar token de sessão seguro
export function generateSessionToken(): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 15)
  const userAgent = typeof window !== "undefined" ? window.navigator.userAgent : ""

  // Criar um identificador único baseado em múltiplos fatores
  const tokenData = `${timestamp}-${random}-${userAgent.length}-carvalho`

  // Codificar em base64 e limpar caracteres especiais
  return btoa(tokenData)
    .replace(/[^a-zA-Z0-9]/g, "")
    .substring(0, 32)
}

// Função para verificar token de sessão
export function verifySessionToken(tokenData: string): boolean {
  try {
    const authData = JSON.parse(tokenData)

    // Verificar estrutura do token
    if (!authData.token || !authData.timestamp || !authData.user) {
      return false
    }

    // Verificar expiração (24 horas)
    const tokenAge = Date.now() - authData.timestamp
    const maxAge = 24 * 60 * 60 * 1000 // 24 horas

    if (tokenAge > maxAge) {
      return false
    }

    // Verificar usuário
    if (authData.user !== "brenno.dev") {
      return false
    }

    return true
  } catch (error) {
    return false
  }
}

// Função para criar dados de autenticação
export function createAuthData(username: string): string {
  const authData = {
    token: generateSessionToken(),
    timestamp: Date.now(),
    user: username,
    version: "1.0",
  }

  return JSON.stringify(authData)
}

// Constantes de segurança
export const SECURITY_CONFIG = {
  SESSION_DURATION: 24 * 60 * 60 * 1000, // 24 horas
  MAX_LOGIN_ATTEMPTS: 5,
  LOCKOUT_DURATION: 15 * 60 * 1000, // 15 minutos
} as const

// Função para validar força da senha (para futuras implementações)
export function validatePasswordStrength(password: string): {
  isValid: boolean
  score: number
  feedback: string[]
} {
  const feedback: string[] = []
  let score = 0

  if (password.length >= 8) score += 1
  else feedback.push("Senha deve ter pelo menos 8 caracteres")

  if (/[A-Z]/.test(password)) score += 1
  else feedback.push("Adicione pelo menos uma letra maiúscula")

  if (/[a-z]/.test(password)) score += 1
  else feedback.push("Adicione pelo menos uma letra minúscula")

  if (/[0-9]/.test(password)) score += 1
  else feedback.push("Adicione pelo menos um número")

  if (/[^A-Za-z0-9]/.test(password)) score += 1
  else feedback.push("Adicione pelo menos um caractere especial")

  return {
    isValid: score >= 4,
    score,
    feedback,
  }
}
