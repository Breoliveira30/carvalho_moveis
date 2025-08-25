# 🛠️ Como Gerenciar Produtos - Carvalho Móveis

## 📋 Visão Geral

Este guia explica como adicionar produtos e criar promoções no site da Carvalho Móveis de forma simples e rápida.

## 🚀 Como Adicionar Produtos

### Passo 1: Abrir o Console
1. Abra o site no navegador
2. Pressione **F12** (ou Ctrl+Shift+I)
3. Vá para a aba **Console**

### Passo 2: Carregar o Script
1. Copie todo o conteúdo do arquivo `scripts/gerenciar-produtos.js`
2. Cole no console e pressione **Enter**
3. Você verá a mensagem: "Sistema de Gerenciamento de Produtos carregado!"

### Passo 3: Adicionar um Produto
\`\`\`javascript
// Usar exemplo pronto
adicionarProduto(exemploSofa)

// Ou criar produto personalizado
const meuProduto = {
  id: "cadeira-escritorio-ergonomica",
  name: "Cadeira de Escritório Ergonômica",
  price: "599,00",
  category: "Cadeiras",
  description: "Cadeira ergonômica com apoio lombar e regulagem de altura.",
  detailedDescription: "Cadeira de escritório com design ergonômico...",
  images: [
    "/placeholder.svg?height=600&width=800&text=Cadeira+Ergonômica"
  ],
  features: [
    "Apoio lombar ajustável",
    "Regulagem de altura",
    "Rodízios silenciosos"
  ],
  dimensions: {
    width: "60cm",
    height: "120cm",
    depth: "60cm",
    weight: "15kg"
  },
  materials: ["Tecido mesh", "Base metálica"],
  inStock: true
}

adicionarProduto(meuProduto)
\`\`\`

### Passo 4: Copiar e Colar o Código
1. O sistema gerará o código do produto
2. Copie o código exibido no console
3. Abra o arquivo `lib/products.ts`
4. Adicione o código no array `products`
5. Salve o arquivo

## 🎉 Como Criar Promoções

\`\`\`javascript
// Criar promoção de 15% para um produto
criarPromocao("sofa-reclinavel-premium", 15, "2024-01-01", "2024-01-31")
\`\`\`

### Parâmetros:
- **productId**: ID do produto (deve existir)
- **discountPercentage**: Porcentagem de desconto (número)
- **startDate**: Data de início (YYYY-MM-DD)
- **endDate**: Data de fim (YYYY-MM-DD)

## 📦 Produtos de Exemplo

### Sofá Reclinável Premium
\`\`\`javascript
adicionarProduto(exemploSofa)
\`\`\`

### Mesa de Centro Vidro Temperado
\`\`\`javascript
adicionarProduto(exemploMesa)
\`\`\`

## 🎯 Comandos Úteis

| Comando | Descrição |
|---------|-----------|
| `ajuda()` | Mostra todos os comandos |
| `listarProdutos()` | Lista produtos de exemplo |
| `adicionarProduto(produto)` | Adiciona novo produto |
| `criarPromocao(id, %, inicio, fim)` | Cria promoção |

## ✅ Checklist de Validação

Antes de adicionar um produto, verifique:

- [ ] **ID único**: Não pode repetir IDs existentes
- [ ] **Nome**: Claro e descritivo
- [ ] **Preço**: Formato "1.299,00" (com ponto e vírgula)
- [ ] **Categoria**: Use categorias existentes ou crie novas
- [ ] **Imagens**: Pelo menos 1 imagem
- [ ] **Características**: Lista com pontos importantes
- [ ] **Dimensões**: Largura, altura, profundidade e peso
- [ ] **Materiais**: Lista dos materiais utilizados

## 🔧 Estrutura do Produto

\`\`\`javascript
{
  id: "produto-unico-id",           // ID único (obrigatório)
  name: "Nome do Produto",          // Nome (obrigatório)
  price: "1.299,00",               // Preço (obrigatório)
  category: "Categoria",           // Categoria (obrigatório)
  description: "Descrição curta",  // Descrição (obrigatório)
  detailedDescription: "Descrição completa...",
  images: ["url1", "url2"],        // Array de URLs
  features: ["Característica 1"],  // Array de características
  dimensions: {                    // Objeto com dimensões
    width: "200cm",
    height: "85cm",
    depth: "90cm",
    weight: "45kg"
  },
  materials: ["Material 1"],       // Array de materiais
  inStock: true                    // Boolean (disponível)
}
\`\`\`

## 🚨 Dicas Importantes

1. **Sempre teste** os produtos após adicionar
2. **Use IDs únicos** para evitar conflitos
3. **Mantenha consistência** nos nomes de categorias
4. **Otimize imagens** para carregamento rápido
5. **Revise textos** antes de publicar

## 📞 Suporte

Se encontrar problemas:
1. Verifique se todos os campos obrigatórios estão preenchidos
2. Confirme se o ID é único
3. Teste no console antes de adicionar ao código
4. Verifique a sintaxe do JavaScript

---

**Desenvolvido por DevDuo** 🚀
