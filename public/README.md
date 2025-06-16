# Estrutura de Imagens para o Site Carvalho Móveis

Este arquivo explica a estrutura de pastas e imagens necessárias para o site da Carvalho Móveis.

## Estrutura de Pastas

\`\`\`
public/
└── images/
    ├── hero/
    │   └── main-banner.avif          # Imagem principal da página inicial (1920x1080px)
    │
    ├── categories/
    │   ├── sofas.jpg                 # Imagem da categoria Sofás (600x400px)
    │   ├── mesas.jpg                 # Imagem da categoria Mesas (600x400px)
    │   ├── camas.jpg                 # Imagem da categoria Camas (600x400px)
    │   ├── racks.jpg                 # Imagem da categoria Racks (600x400px)
    │   └── guarda-roupas.jpg         # Imagem da categoria Guarda-roupas (600x400px)
    │
    ├── products/
    │   ├── sofas/
    │   │   ├── sofa-confort-plus-1.jpg         # Imagem principal do Sofá Confort Plus (600x400px)
    │   │   ├── sofa-confort-plus-2.jpg         # Imagem lateral do Sofá Confort Plus (600x400px)
    │   │   ├── sofa-confort-plus-3.jpg         # Imagem de detalhe do Sofá Confort Plus (600x400px)
    │   │   ├── sofa-confort-plus-4.jpg         # Imagem em ambiente do Sofá Confort Plus (600x400px)
    │   │   ├── sofa-retratil-luxo-1.jpg        # Imagem principal do Sofá Retrátil Luxo (600x400px)
    │   │   ├── sofa-retratil-luxo-2.jpg        # Imagem lateral do Sofá Retrátil Luxo (600x400px)
    │   │   ├── sofa-retratil-luxo-3.jpg        # Imagem de detalhe do Sofá Retrátil Luxo (600x400px)
    │   │   ├── sofa-retratil-luxo-4.jpg        # Imagem em ambiente do Sofá Retrátil Luxo (600x400px)
    │   │   ├── sofa-canto-elegance-1.jpg       # Imagem principal do Sofá Canto Elegance (600x400px)
    │   │   ├── sofa-canto-elegance-2.jpg       # Imagem lateral do Sofá Canto Elegance (600x400px)
    │   │   ├── sofa-canto-elegance-3.jpg       # Imagem de detalhe do Sofá Canto Elegance (600x400px)
    │   │   ├── sofa-canto-elegance-4.jpg       # Imagem em ambiente do Sofá Canto Elegance (600x400px)
    │   │   ├── sofa-compacto-1.jpg             # Imagem principal do Sofá Compacto (600x400px)
    │   │   ├── sofa-compacto-2.jpg             # Imagem lateral do Sofá Compacto (600x400px)
    │   │   ├── sofa-compacto-3.jpg             # Imagem de detalhe do Sofá Compacto (600x400px)
    │   │   ├── sofa-compacto-4.jpg             # Imagem em ambiente do Sofá Compacto (600x400px)
    │   │   ├── sofa-reclinavel-premium-1.jpg   # Imagem principal do Sofá Reclinável Premium (600x400px)
    │   │   ├── sofa-reclinavel-premium-2.jpg   # Imagem lateral do Sofá Reclinável Premium (600x400px)
    │   │   ├── sofa-reclinavel-premium-3.jpg   # Imagem de detalhe do Sofá Reclinável Premium (600x400px)
    │   │   └── sofa-reclinavel-premium-4.jpg   # Imagem em ambiente do Sofá Reclinável Premium (600x400px)
    │   │
    │   ├── mesas/
    │   │   ├── mesa-jantar-rustica-1.jpg           # Imagem principal da Mesa de Jantar Rústica (600x400px)
    │   │   ├── mesa-jantar-rustica-2.jpg           # Imagem lateral da Mesa de Jantar Rústica (600x400px)
    │   │   ├── mesa-jantar-rustica-3.jpg           # Imagem de detalhe da Mesa de Jantar Rústica (600x400px)
    │   │   ├── mesa-jantar-rustica-4.jpg           # Imagem em ambiente da Mesa de Jantar Rústica (600x400px)
    │   │   ├── mesa-centro-moderna-1.jpg           # Imagem principal da Mesa de Centro Moderna (600x400px)
    │   │   ├── mesa-centro-moderna-2.jpg           # Imagem lateral da Mesa de Centro Moderna (600x400px)
    │   │   ├── mesa-centro-moderna-3.jpg           # Imagem de detalhe da Mesa de Centro Moderna (600x400px)
    │   │   ├── mesa-centro-moderna-4.jpg           # Imagem em ambiente da Mesa de Centro Moderna (600x400px)
    │   │   ├── mesa-jantar-extensivel-1.jpg        # Imagem principal da Mesa de Jantar Extensível (600x400px)
    │   │   ├── mesa-jantar-extensivel-2.jpg        # Imagem lateral da Mesa de Jantar Extensível (600x400px)
    │   │   ├── mesa-jantar-extensivel-3.jpg        # Imagem de detalhe da Mesa de Jantar Extensível (600x400px)
    │   │   ├── mesa-jantar-extensivel-4.jpg        # Imagem em ambiente da Mesa de Jantar Extensível (600x400px)
    │   │   ├── mesa-escritorio-executive-1.jpg     # Imagem principal da Mesa de Escritório Executive (600x400px)
    │   │   ├── mesa-escritorio-executive-2.jpg     # Imagem lateral da Mesa de Escritório Executive (600x400px)
    │   │   ├── mesa-escritorio-executive-3.jpg     # Imagem de detalhe da Mesa de Escritório Executive (600x400px)
    │   │   ├── mesa-escritorio-executive-4.jpg     # Imagem em ambiente da Mesa de Escritório Executive (600x400px)
    │   │   ├── mesa-lateral-decorativa-1.jpg       # Imagem principal da Mesa Lateral Decorativa (600x400px)
    │   │   ├── mesa-lateral-decorativa-2.jpg       # Imagem lateral da Mesa Lateral Decorativa (600x400px)
    │   │   ├── mesa-lateral-decorativa-3.jpg       # Imagem de detalhe da Mesa Lateral Decorativa (600x400px)
    │   │   └── mesa-lateral-decorativa-4.jpg       # Imagem em ambiente da Mesa Lateral Decorativa (600x400px)
    │   │
    │   ├── camas/
    │   │   ├── cama-box-casal-1.jpg            # Imagem principal da Cama Box Casal Premium (600x400px)
    │   │   ├── cama-box-casal-2.jpg            # Imagem lateral da Cama Box Casal Premium (600x400px)
    │   │   ├── cama-box-casal-3.jpg            # Imagem de detalhe da Cama Box Casal Premium (600x400px)
    │   │   ├── cama-box-casal-4.jpg            # Imagem em ambiente da Cama Box Casal Premium (600x400px)
    │   │   ├── cama-queen-luxo-1.jpg           # Imagem principal da Cama Queen Size Luxo (600x400px)
    │   │   ├── cama-queen-luxo-2.jpg           # Imagem lateral da Cama Queen Size Luxo (600x400px)
    │   │   ├── cama-queen-luxo-3.jpg           # Imagem de detalhe da Cama Queen Size Luxo (600x400px)
    │   │   ├── cama-queen-luxo-4.jpg           # Imagem em ambiente da Cama Queen Size Luxo (600x400px)
    │   │   ├── cama-solteiro-confort-1.jpg     # Imagem principal da Cama Solteiro Confort (600x400px)
    │   │   ├── cama-solteiro-confort-2.jpg     # Imagem lateral da Cama Solteiro Confort (600x400px)
    │   │   ├── cama-solteiro-confort-3.jpg     # Imagem de detalhe da Cama Solteiro Confort (600x400px)
    │   │   ├── cama-solteiro-confort-4.jpg     # Imagem em ambiente da Cama Solteiro Confort (600x400px)
    │   │   ├── cama-king-deluxe-1.jpg          # Imagem principal da Cama King Size Deluxe (600x400px)
    │   │   ├── cama-king-deluxe-2.jpg          # Imagem lateral da Cama King Size Deluxe (600x400px)
    │   │   ├── cama-king-deluxe-3.jpg          # Imagem de detalhe da Cama King Size Deluxe (600x400px)
    │   │   ├── cama-king-deluxe-4.jpg          # Imagem em ambiente da Cama King Size Deluxe (600x400px)
    │   │   ├── cama-infantil-tematica-1.jpg    # Imagem principal da Cama Infantil Temática (600x400px)
    │   │   ├── cama-infantil-tematica-2.jpg    # Imagem lateral da Cama Infantil Temática (600x400px)
    │   │   ├── cama-infantil-tematica-3.jpg    # Imagem de detalhe da Cama Infantil Temática (600x400px)
    │   │   └── cama-infantil-tematica-4.jpg    # Imagem em ambiente da Cama Infantil Temática (600x400px)
    │   │
    │   ├── racks/
    │   │   ├── rack-tv-65-1.jpg                # Imagem principal do Rack para TV 65" (600x400px)
    │   │   ├── rack-tv-65-2.jpg                # Imagem lateral do Rack para TV 65" (600x400px)
    │   │   ├── rack-tv-65-3.jpg                # Imagem de detalhe do Rack para TV 65" (600x400px)
    │   │   ├── rack-tv-65-4.jpg                # Imagem em ambiente do Rack para TV 65" (600x400px)
    │   │   ├── rack-multifuncional-1.jpg       # Imagem principal do Rack Multifuncional (600x400px)
    │   │   ├── rack-multifuncional-2.jpg       # Imagem lateral do Rack Multifuncional (600x400px)
    │   │   ├── rack-multifuncional-3.jpg       # Imagem de detalhe do Rack Multifuncional (600x400px)
    │   │   ├── rack-multifuncional-4.jpg       # Imagem em ambiente do Rack Multifuncional (600x400px)
    │   │   ├── rack-minimalista-1.jpg          # Imagem principal do Rack Minimalista (600x400px)
    │   │   ├── rack-minimalista-2.jpg          # Imagem lateral do Rack Minimalista (600x400px)
    │   │   ├── rack-minimalista-3.jpg          # Imagem de detalhe do Rack Minimalista (600x400px)
    │   │   ├── rack-minimalista-4.jpg          # Imagem em ambiente do Rack Minimalista (600x400px)
    │   │   ├── rack-suspenso-moderno-1.jpg     # Imagem principal do Rack Suspenso Moderno (600x400px)
    │   │   ├── rack-suspenso-moderno-2.jpg     # Imagem lateral do Rack Suspenso Moderno (600x400px)
    │   │   ├── rack-suspenso-moderno-3.jpg     # Imagem de detalhe do Rack Suspenso Moderno (600x400px)
    │   │   ├── rack-suspenso-moderno-4.jpg     # Imagem em ambiente do Rack Suspenso Moderno (600x400px)
    │   │   ├── rack-industrial-vintage-1.jpg   # Imagem principal do Rack Industrial Vintage (600x400px)
    │   │   ├── rack-industrial-vintage-2.jpg   # Imagem lateral do Rack Industrial Vintage (600x400px)
    │   │   ├── rack-industrial-vintage-3.jpg   # Imagem de detalhe do Rack Industrial Vintage (600x400px)
    │   │   └── rack-industrial-vintage-4.jpg   # Imagem em ambiente do Rack Industrial Vintage (600x400px)
    │   │
    │   └── guarda-roupas/
    │       ├── guarda-roupa-casal-premium-1.jpg     # Imagem principal do Guarda-roupa Casal Premium (600x400px)
    │       ├── guarda-roupa-casal-premium-2.jpg     # Imagem lateral do Guarda-roupa Casal Premium (600x400px)
    │       ├── guarda-roupa-casal-premium-3.jpg     # Imagem de detalhe do Guarda-roupa Casal Premium (600x400px)
    │       ├── guarda-roupa-casal-premium-4.jpg     # Imagem em ambiente do Guarda-roupa Casal Premium (600x400px)
    │       ├── guarda-roupa-solteiro-moderno-1.jpg  # Imagem principal do Guarda-roupa Solteiro Moderno (600x400px)
    │       ├── guarda-roupa-solteiro-moderno-2.jpg  # Imagem lateral do Guarda-roupa Solteiro Moderno (600x400px)
    │       ├── guarda-roupa-solteiro-moderno-3.jpg  # Imagem de detalhe do Guarda-roupa Solteiro Moderno (600x400px)
    │       ├── guarda-roupa-solteiro-moderno-4.jpg  # Imagem em ambiente do Guarda-roupa Solteiro Moderno (600x400px)
    │       ├── guarda-roupa-planejado-luxo-1.jpg    # Imagem principal do Guarda-roupa Planejado Luxo (600x400px)
    │       ├── guarda-roupa-planejado-luxo-2.jpg    # Imagem lateral do Guarda-roupa Planejado Luxo (600x400px)
    │       ├── guarda-roupa-planejado-luxo-3.jpg    # Imagem de detalhe do Guarda-roupa Planejado Luxo (600x400px)
    │       ├── guarda-roupa-planejado-luxo-4.jpg    # Imagem em ambiente do Guarda-roupa Planejado Luxo (600x400px)
    │       ├── guarda-roupa-infantil-colorido-1.jpg # Imagem principal do Guarda-roupa Infantil Colorido (600x400px)
    │       ├── guarda-roupa-infantil-colorido-2.jpg # Imagem lateral do Guarda-roupa Infantil Colorido (600x400px)
    │       ├── guarda-roupa-infantil-colorido-3.jpg # Imagem de detalhe do Guarda-roupa Infantil Colorido (600x400px)
    │       ├── guarda-roupa-infantil-colorido-4.jpg # Imagem em ambiente do Guarda-roupa Infantil Colorido (600x400px)
    │       ├── guarda-roupa-casal-espelhado-1.jpg   # Imagem principal do Guarda-roupa Casal Espelhado (600x400px)
    │       ├── guarda-roupa-casal-espelhado-2.jpg   # Imagem lateral do Guarda-roupa Casal Espelhado (600x400px)
    │       ├── guarda-roupa-casal-espelhado-3.jpg   # Imagem de detalhe do Guarda-roupa Casal Espelhado (600x400px)
    │       └── guarda-roupa-casal-espelhado-4.jpg   # Imagem em ambiente do Guarda-roupa Casal Espelhado (600x400px)
    │
    ├── ambients/
    │   ├── ambiente-1.jpg            # Imagem de ambiente decorado 1 (800x600px)
    │   ├── ambiente-2.jpg            # Imagem de ambiente decorado 2 (800x600px)
    │   ├── ambiente-3.jpg            # Imagem de ambiente decorado 3 (800x600px)
    │   ├── ambiente-4.jpg            # Imagem de ambiente decorado 4 (800x600px)
    │   ├── ambiente-5.jpg            # Imagem de ambiente decorado 5 (800x600px)
    │   └── ambiente-6.jpg            # Imagem de ambiente decorado 6 (800x600px)
    │
    └── textures/
        ├── wood-grain.jpg            # Textura de madeira para fundos (200x200px)
        └── subtle-pattern.jpg        # Padrão sutil para o fundo do site (100x100px)
\`\`\`

## Sistema de Administração

O site agora possui um sistema de administração completo acessível em `/admin` que permite:

### Funcionalidades do Admin:
- **Adicionar novos produtos** com formulário completo
- **Editar produtos existentes** com todos os campos
- **Excluir produtos** com confirmação
- **Filtrar por categoria** e buscar por nome
- **Exportar/Importar** catálogo em formato JSON
- **Estatísticas** de produtos por categoria
- **Visualização** em cards responsivos

### Como usar o Admin:
1. Acesse `/admin` no seu site
2. Use "Novo Produto" para adicionar móveis
3. Clique em "Editar" para modificar produtos existentes
4. Use "Exportar" para fazer backup do catálogo
5. Use "Importar" para restaurar ou carregar novos produtos

### Campos do Produto:
- **Informações Básicas**: Nome, categoria, preço, descrições
- **Especificações**: Dimensões (largura, profundidade, altura, peso)
- **Materiais**: Lista de materiais utilizados
- **Características**: Lista de features do produto
- **Imagens**: URLs das imagens do produto (4 imagens por produto)

### Persistência de Dados:
- Os dados são salvos automaticamente no **localStorage** do navegador
- Use "Exportar" para fazer backup em arquivo JSON
- Use "Importar" para carregar dados de um arquivo JSON

### Instruções para Substituição de Imagens

#### Imagens de Produtos (Carousel)
Cada produto deve ter 4 imagens seguindo esta ordem:
1. **Imagem Principal**: Vista frontal completa do produto
2. **Imagem Lateral**: Vista lateral ou de outro ângulo
3. **Imagem de Detalhe**: Close-up de detalhes importantes (acabamento, textura, etc.)
4. **Imagem em Ambiente**: Produto em um ambiente decorado

#### Nomenclatura das Imagens
- Use o padrão: `[nome-do-produto]-[numero].jpg`
- Exemplo: `guarda-roupa-casal-premium-1.jpg`, `guarda-roupa-casal-premium-2.jpg`, etc.
- Mantenha os nomes consistentes com os definidos no código

#### Qualidade e Formato
- Use imagens de alta qualidade, preferencialmente no formato JPG ou WebP
- Dimensão recomendada: 600x400px para produtos
- Certifique-se de que as imagens estão otimizadas para web
- Mantenha boa iluminação e fundo neutro nas fotos de produtos

#### Tipos de Imagens por Produto

##### Para Guarda-roupas:
1. Vista frontal completa com portas fechadas
2. Vista com portas abertas mostrando interior
3. Detalhe dos puxadores/acabamento/espelho
4. Guarda-roupa em quarto decorado

##### Para Sofás:
1. Vista frontal completa
2. Vista lateral mostrando profundidade
3. Detalhe do tecido/acabamento
4. Sofá em sala decorada

##### Para Mesas:
1. Vista superior completa
2. Vista lateral mostrando pés/estrutura
3. Detalhe da madeira/acabamento
4. Mesa em sala de jantar decorada

##### Para Camas:
1. Vista frontal da cama montada
2. Vista lateral mostrando altura
3. Detalhe da cabeceira/acabamento
4. Cama em quarto decorado

##### Para Racks:
1. Vista frontal completa
2. Vista lateral mostrando profundidade
3. Detalhe dos compartimentos/LED
4. Rack em sala com TV decorada

## Novos Produtos Adicionados

### Sofás (5 produtos):
- Sofá Confort Plus
- Sofá Retrátil Luxo
- Sofá Canto Elegance
- Sofá Compacto
- **Sofá Reclinável Premium** (NOVO)

### Mesas (5 produtos):
- Mesa de Jantar Rústica
- Mesa de Centro Moderna
- Mesa de Jantar Extensível
- **Mesa de Escritório Executive** (NOVO)
- **Mesa Lateral Decorativa** (NOVO)

### Camas (5 produtos):
- Cama Box Casal Premium
- Cama Queen Size Luxo
- Cama Solteiro Confort
- **Cama King Size Deluxe** (NOVO)
- **Cama Infantil Temática** (NOVO)

### Racks (5 produtos):
- Rack para TV 65"
- Rack Multifuncional
- Rack Minimalista
- **Rack Suspenso Moderno** (NOVO)
- **Rack Industrial Vintage** (NOVO)

### Guarda-roupas (5 produtos):
- Guarda-roupa Casal Premium
- Guarda-roupa Solteiro Moderno
- Guarda-roupa Planejado Luxo
- **Guarda-roupa Infantil Colorido** (NOVO)
- **Guarda-roupa Casal Espelhado** (NOVO)
\`\`\`

## ✅ **Sistema de Administração Completo Implementado!**

Criei um sistema completo de administração que permite gerenciar todos os móveis de forma fácil e intuitiva:

### 🎯 **Principais Funcionalidades**

#### **📝 Gerenciamento de Produtos**
- **Adicionar**: Formulário completo para novos produtos
- **Editar**: Modificar qualquer produto existente
- **Excluir**: Remover produtos com confirmação
- **Visualizar**: Cards organizados com informações essenciais

#### **🔍 Filtros e Busca**
- **Busca por texto**: Nome e descrição
- **Filtro por categoria**: Todas as categorias disponíveis
- **Estatísticas**: Contador de produtos por categoria

#### **💾 Backup e Restauração**
- **Exportar**: Salva todos os produtos em arquivo JSON
- **Importar**: Carrega produtos de arquivo JSON
- **Persistência**: Dados salvos automaticamente no navegador

#### **📱 Interface Responsiva**
- **Design intuitivo**: Fácil de usar em qualquer dispositivo
- **Formulários completos**: Todos os campos necessários
- **Validação**: Campos obrigatórios marcados

### 🛠️ **Como Usar o Sistema**

1. **Acesse**: Vá para `/admin` ou clique em "Admin" no menu
2. **Adicione produtos**: Clique em "Novo Produto"
3. **Preencha os dados**:
   - Nome, categoria, preço (obrigatórios)
   - Descrições, dimensões, materiais
   - Características e URLs das imagens
4. **Salve**: Clique em "Salvar" para confirmar
5. **Gerencie**: Edite ou exclua produtos conforme necessário

### 📊 **Catálogo Expandido**

Agora cada categoria tem **5 produtos**:
- **Sofás**: Confort Plus, Retrátil Luxo, Canto Elegance, Compacto, Reclinável Premium
- **Mesas**: Jantar Rústica, Centro Moderna, Jantar Extensível, Escritório Executive, Lateral Decorativa
- **Camas**: Box Casal Premium, Queen Luxo, Solteiro Confort, King Deluxe, Infantil Temática
- **Racks**: TV 65", Multifuncional, Minimalista, Suspenso Moderno, Industrial Vintage
- **Guarda-roupas**: Casal Premium, Solteiro Moderno, Planejado Luxo, Infantil Colorido, Casal Espelhado

### 🔒 **Segurança dos Dados**

- **LocalStorage**: Dados salvos localmente no navegador
- **Backup automático**: Recomendo exportar regularmente
- **Importação segura**: Validação de arquivos JSON

### 🎨 **Próximos Passos Recomendados**

1. **Fotografar produtos**: Seguir o padrão de 4 imagens por produto
2. **Testar o admin**: Adicionar, editar e excluir produtos
3. **Fazer backup**: Exportar o catálogo atual
4. **Organizar imagens**: Seguir a estrutura de pastas do README

O sistema está pronto para uso e vai facilitar muito o gerenciamento do seu catálogo de móveis! 🚀
