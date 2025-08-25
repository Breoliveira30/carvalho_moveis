// Sistema de Gerenciamento de Produtos - Carvalho Móveis
// Execute este script no console do navegador (F12)

// Exemplos de produtos prontos para usar
const exemploSofa = {
  id: "sofa-reclinavel-premium",
  name: "Sofá Reclinável Premium",
  price: "3.299,00",
  category: "Sofás",
  description: "Sofá reclinável de luxo com sistema elétrico e estofado em couro.",
  detailedDescription:
    "Sofá reclinável premium com tecnologia de ponta, oferecendo máximo conforto e elegância. Fabricado com couro genuíno e sistema elétrico de reclinação, perfeito para momentos de relaxamento.",
  images: [
    "/placeholder.svg?height=600&width=800&text=Sofá+Reclinável+Premium+-+Principal",
    "/placeholder.svg?height=600&width=800&text=Sofá+Reclinável+Premium+-+Reclinado",
    "/placeholder.svg?height=600&width=800&text=Sofá+Reclinável+Premium+-+Detalhe+Couro",
  ],
  features: [
    "Sistema elétrico de reclinação",
    "Estofado em couro genuíno",
    "Estrutura reforçada",
    "Apoio para cabeça ajustável",
    "Porta-copos integrado",
    "Garantia de 3 anos",
  ],
  dimensions: {
    width: "180cm",
    height: "100cm",
    depth: "95cm",
    weight: "65kg",
  },
  materials: ["Couro genuíno", "Estrutura metálica", "Espuma D45"],
  inStock: true,
}

const exemploMesa = {
  id: "mesa-centro-vidro-temperado",
  name: "Mesa de Centro Vidro Temperado",
  price: "899,00",
  category: "Mesas",
  description: "Mesa de centro moderna com tampo de vidro temperado e base metálica.",
  detailedDescription:
    "Mesa de centro com design contemporâneo, combinando vidro temperado de alta qualidade com base metálica resistente. Ideal para salas modernas e sofisticadas.",
  images: [
    "/placeholder.svg?height=600&width=800&text=Mesa+Centro+Vidro+-+Principal",
    "/placeholder.svg?height=600&width=800&text=Mesa+Centro+Vidro+-+Lateral",
  ],
  features: [
    "Vidro temperado 10mm",
    "Base metálica cromada",
    "Design moderno",
    "Fácil limpeza",
    "Resistente a riscos",
    "Montagem simples",
  ],
  dimensions: {
    width: "120cm",
    height: "45cm",
    depth: "60cm",
    weight: "25kg",
  },
  materials: ["Vidro temperado", "Aço cromado"],
  inStock: true,
}

// Função para adicionar produto
function adicionarProduto(produto) {
  // Validação básica
  const camposObrigatorios = ["id", "name", "price", "category", "description"]
  const camposFaltando = camposObrigatorios.filter((campo) => !produto[campo])

  if (camposFaltando.length > 0) {
    console.error("❌ Campos obrigatórios faltando:", camposFaltando)
    return
  }

  // Gerar código do produto
  const codigoProduto = `  {
    id: "${produto.id}",
    name: "${produto.name}",
    price: "${produto.price}",
    category: "${produto.category}",
    description: "${produto.description}",
    detailedDescription: "${produto.detailedDescription || produto.description}",
    images: [
${produto.images.map((img) => `      "${img}"`).join(",\n")}
    ],
    features: [
${produto.features.map((feature) => `      "${feature}"`).join(",\n")}
    ],
    dimensions: {
      width: "${produto.dimensions.width}",
      height: "${produto.dimensions.height}",
      depth: "${produto.dimensions.depth}",
      weight: "${produto.dimensions.weight}"
    },
    materials: [${produto.materials.map((material) => `"${material}"`).join(", ")}],
    inStock: ${produto.inStock},
    createdAt: "${new Date().toISOString().split("T")[0]}"
  }`

  console.log("✅ Produto criado com sucesso!")
  console.log('📋 Copie o código abaixo e adicione ao array "products" em lib/products.ts:')
  console.log("\n" + codigoProduto + ",\n")

  return codigoProduto
}

// Função para criar promoção
function criarPromocao(productId, discountPercentage, startDate, endDate) {
  const promocao = {
    id: `promo-${productId}-${Date.now()}`,
    productId: productId,
    discountPercentage: discountPercentage,
    startDate: startDate,
    endDate: endDate,
    isActive: true,
  }

  const codigoPromocao = `  {
    id: "${promocao.id}",
    productId: "${promocao.productId}",
    discountPercentage: ${promocao.discountPercentage},
    startDate: "${promocao.startDate}",
    endDate: "${promocao.endDate}",
    isActive: ${promocao.isActive}
  }`

  console.log("🎉 Promoção criada com sucesso!")
  console.log('📋 Copie o código abaixo e adicione ao array "promotions" em lib/products.ts:')
  console.log("\n" + codigoPromocao + ",\n")

  return codigoPromocao
}

// Função para listar produtos existentes
function listarProdutos() {
  console.log("📦 Produtos disponíveis para teste:")
  console.log("1. exemploSofa - Sofá Reclinável Premium")
  console.log("2. exemploMesa - Mesa de Centro Vidro Temperado")
  console.log("\n💡 Use: adicionarProduto(exemploSofa) ou adicionarProduto(exemploMesa)")
}

// Função de ajuda
function ajuda() {
  console.log(`
🛠️  SISTEMA DE GERENCIAMENTO DE PRODUTOS - CARVALHO MÓVEIS

📋 COMANDOS DISPONÍVEIS:

1️⃣  adicionarProduto(produto)
   - Adiciona um novo produto
   - Exemplo: adicionarProduto(exemploSofa)

2️⃣  criarPromocao(productId, desconto, dataInicio, dataFim)
   - Cria uma promoção para um produto
   - Exemplo: criarPromocao("sofa-reclinavel-premium", 20, "2024-01-01", "2024-01-31")

3️⃣  listarProdutos()
   - Lista produtos de exemplo disponíveis

4️⃣  ajuda()
   - Mostra esta mensagem de ajuda

🎯 EXEMPLOS PRONTOS:
- exemploSofa: Sofá reclinável premium
- exemploMesa: Mesa de centro com vidro temperado

🚀 COMO USAR:
1. Execute: adicionarProduto(exemploSofa)
2. Copie o código gerado
3. Cole em lib/products.ts no array "products"
4. Salve o arquivo

💡 DICA: Sempre teste os produtos no site após adicionar!
  `)
}

// Inicialização
console.log("🎉 Sistema de Gerenciamento de Produtos carregado!")
console.log("💡 Digite ajuda() para ver os comandos disponíveis")

// Exportar funções para uso global
window.adicionarProduto = adicionarProduto
window.criarPromocao = criarPromocao
window.listarProdutos = listarProdutos
window.ajuda = ajuda
window.exemploSofa = exemploSofa
window.exemploMesa = exemploMesa
