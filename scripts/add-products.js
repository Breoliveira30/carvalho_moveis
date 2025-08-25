// Script para adicionar produtos e promoções - Carvalho Móveis
// Execute este script no console do navegador (F12)

// Configuração do Supabase (substitua pelas suas credenciais)
const SUPABASE_URL = "sua-url-do-supabase"
const SUPABASE_ANON_KEY = "sua-chave-anonima-do-supabase"

// Função para adicionar produto
async function adicionarProduto(produto) {
  try {
    console.log("Adicionando produto:", produto.nome)

    const response = await fetch(`${SUPABASE_URL}/rest/v1/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Prefer: "return=representation",
      },
      body: JSON.stringify(produto),
    })

    if (response.ok) {
      const result = await response.json()
      console.log("✅ Produto adicionado com sucesso:", result)
      return result
    } else {
      const error = await response.text()
      console.error("❌ Erro ao adicionar produto:", error)
    }
  } catch (error) {
    console.error("❌ Erro na requisição:", error)
  }
}

// Função para adicionar promoção
async function adicionarPromocao(promocao) {
  try {
    console.log("Adicionando promoção:", promocao.titulo)

    const response = await fetch(`${SUPABASE_URL}/rest/v1/promotions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Prefer: "return=representation",
      },
      body: JSON.stringify(promocao),
    })

    if (response.ok) {
      const result = await response.json()
      console.log("✅ Promoção adicionada com sucesso:", result)
      return result
    } else {
      const error = await response.text()
      console.error("❌ Erro ao adicionar promoção:", error)
    }
  } catch (error) {
    console.error("❌ Erro na requisição:", error)
  }
}

// Função para listar produtos
async function listarProdutos() {
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/products?select=*`, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    })

    if (response.ok) {
      const produtos = await response.json()
      console.log("📋 Produtos cadastrados:", produtos)
      return produtos
    }
  } catch (error) {
    console.error("❌ Erro ao listar produtos:", error)
  }
}

// Exemplos de produtos para adicionar
const exemploSofa = {
  nome: "Sofá 3 Lugares Confort",
  descricao:
    "Sofá confortável de 3 lugares com tecido de alta qualidade e estrutura resistente. Perfeito para sala de estar.",
  preco: 1299.99,
  categoria: "sofas",
  imagem_url: "/images/products/sofa-confort-3-lugares.jpg",
  disponivel: true,
  destaque: true,
  especificacoes: {
    Dimensões: "200cm x 90cm x 85cm",
    Material: "Tecido e madeira",
    Cor: "Cinza",
    Garantia: "1 ano",
  },
}

const exemploMesa = {
  nome: "Mesa de Jantar Elegance",
  descricao: "Mesa de jantar para 6 pessoas em madeira maciça com acabamento premium.",
  preco: 899.99,
  categoria: "mesas",
  imagem_url: "/images/products/mesa-jantar-elegance.jpg",
  disponivel: true,
  destaque: false,
  especificacoes: {
    Dimensões: "160cm x 90cm x 75cm",
    Material: "Madeira maciça",
    Cor: "Mogno",
    Capacidade: "6 pessoas",
  },
}

const exemploPromocao = {
  titulo: "Desconto de Verão",
  descricao: "Até 30% de desconto em sofás selecionados",
  desconto_percentual: 30,
  produto_ids: [1, 2, 3], // IDs dos produtos em promoção
  data_inicio: "2024-01-15",
  data_fim: "2024-02-15",
  ativo: true,
}

// Instruções de uso
console.log(`
🛋️ SCRIPT CARVALHO MÓVEIS - ADICIONAR PRODUTOS

📋 INSTRUÇÕES:
1. Configure suas credenciais do Supabase nas variáveis SUPABASE_URL e SUPABASE_ANON_KEY
2. Use as funções disponíveis:

📦 ADICIONAR PRODUTO:
adicionarProduto(exemploSofa)
adicionarProduto(exemploMesa)

🎯 ADICIONAR PROMOÇÃO:
adicionarPromocao(exemploPromocao)

📋 LISTAR PRODUTOS:
listarProdutos()

✨ EXEMPLOS PRONTOS:
- exemploSofa: Sofá 3 lugares
- exemploMesa: Mesa de jantar
- exemploPromocao: Desconto de verão

💡 DICA: Copie e cole os comandos um por vez no console!
`)
