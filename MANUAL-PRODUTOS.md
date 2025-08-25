# 📋 Manual de Gerenciamento de Produtos

Este guia explica como adicionar, editar e gerenciar produtos e promoções manualmente no código.

## 🎯 Localização dos Dados

Todos os produtos estão no arquivo: `lib/products-data.ts`

## ➕ Como Adicionar um Novo Produto

1. Abra o arquivo `lib/products-data.ts`
2. Localize o array `productsData`
3. Adicione um novo objeto seguindo este modelo:

\`\`\`typescript
{
  id: "id-unico-do-produto", // Use kebab-case
  name: "Nome do Produto",
  description: "Descrição curta do produto",
  price: "1.500,00", // Formato brasileiro
  images: [
    "/images/products/produto-1.jpg",
    "/images/products/produto-2.jpg",
  ],
  category: "Sofás", // Uma das categorias: Sofás, Mesas, Camas, Racks, Guarda-roupas
  materials: ["Material 1", "Material 2"],
  dimensions: {
    largura: "200cm",
    profundidade: "90cm",
    altura: "85cm",
    peso: "50kg",
  },
  features: [
    "Característica 1",
    "Característica 2",
    "Característica 3",
  ],
  detailedDescription: `Descrição detalhada do produto...`,
}
\`\`\`

## 🏷️ Como Adicionar uma Promoção

Para adicionar promoção a um produto, adicione estas propriedades:

\`\`\`typescript
{
  // ... outros dados do produto
  has_promotion: true,
  promotion: {
    discount_percentage: 20, // Desconto em %
    start_date: "2024-01-01", // Data de início
    end_date: "2024-12-31", // Data de fim
  },
}
\`\`\`

## ✏️ Como Editar um Produto

1. Localize o produto pelo `id` no array `productsData`
2. Modifique os campos desejados
3. Salve o arquivo

## 🗑️ Como Remover um Produto

1. Localize o produto no array `productsData`
2. Delete o objeto completo
3. Salve o arquivo

## 📂 Categorias Disponíveis

- Sofás
- Mesas  
- Camas
- Racks
- Guarda-roupas

Para adicionar nova categoria, edite o array `categories` no mesmo arquivo.

## 🖼️ Imagens dos Produtos

1. Adicione as imagens na pasta `public/images/products/`
2. Use o caminho `/images/products/nome-da-imagem.jpg` no código
3. Primeira imagem do array será a principal

## 💡 Dicas Importantes

- **IDs únicos**: Cada produto deve ter um ID único
- **Formato de preço**: Use formato brasileiro "1.500,00"
- **Datas**: Use formato YYYY-MM-DD para promoções
- **Imagens**: Primeira imagem é sempre a principal
- **Categorias**: Use exatamente os nomes das categorias existentes

## 🔄 Aplicar Mudanças

Após editar o arquivo:
1. Salve as alterações
2. Faça deploy na Vercel
3. As mudanças aparecerão automaticamente no site

## 📊 Exemplos Práticos

### Produto Simples (sem promoção):
\`\`\`typescript
{
  id: "cadeira-escritorio",
  name: "Cadeira de Escritório Ergonômica",
  description: "Cadeira com apoio lombar e regulagem de altura",
  price: "450,00",
  images: ["/images/products/cadeira-1.jpg"],
  category: "Cadeiras",
  materials: ["Tecido mesh", "Base em nylon"],
  dimensions: {
    largura: "60cm",
    profundidade: "60cm", 
    altura: "120cm",
    peso: "12kg",
  },
  features: ["Regulagem de altura", "Apoio lombar"],
  detailedDescription: "Cadeira ergonômica ideal para longas jornadas de trabalho.",
}
\`\`\`

### Produto com Promoção:
\`\`\`typescript
{
  id: "mesa-centro-vidro",
  name: "Mesa de Centro em Vidro",
  description: "Mesa moderna com tampo de vidro temperado",
  price: "800,00",
  images: ["/images/products/mesa-centro-1.jpg"],
  category: "Mesas",
  materials: ["Vidro temperado", "Base em aço inox"],
  dimensions: {
    largura: "120cm",
    profundidade: "60cm",
    altura: "45cm", 
    peso: "25kg",
  },
  features: ["Vidro temperado", "Design moderno"],
  detailedDescription: "Mesa de centro elegante para sala de estar.",
  has_promotion: true,
  promotion: {
    discount_percentage: 15,
    start_date: "2024-01-01",
    end_date: "2024-06-30",
  },
}
