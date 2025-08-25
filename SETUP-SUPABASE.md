# 🚀 Guia Completo: Configuração do Supabase do Zero

## 📋 **Passo 1: Criar Novo Projeto Supabase**

### 1.1 Acessar Supabase
1. Vá para [supabase.com](https://supabase.com)
2. Clique em **"Start your project"**
3. Faça login ou crie uma conta

### 1.2 Criar Projeto
1. Clique em **"New Project"**
2. Escolha sua organização
3. Preencha os dados:
   - **Name**: `carvalho-moveis`
   - **Database Password**: Crie uma senha forte (anote!)
   - **Region**: `East US (North Virginia)`
4. Clique em **"Create new project"**
5. Aguarde 2-3 minutos para o projeto ser criado

### 1.3 Obter Credenciais
Após criado, vá para **Settings > API**:
- **Project URL**: `MY_POSTGRES_URL` (substitua pela sua URL real)
- **anon public**: `eyJ...` (chave pública)
- **service_role**: `eyJ...` (chave privada - cuidado!)

---

## 📋 **Passo 2: Configurar Banco de Dados**

### 2.1 Executar Scripts SQL
Vá para **SQL Editor** no painel lateral e execute os scripts **NA ORDEM**:

#### Script 1: Estrutura do Banco
\`\`\`sql
-- Cole e execute o conteúdo de scripts/01-create-database.sql
\`\`\`

#### Script 2: Segurança
\`\`\`sql
-- Cole e execute o conteúdo de scripts/02-setup-security.sql
\`\`\`

#### Script 3: Storage
\`\`\`sql
-- Cole e execute o conteúdo de scripts/03-setup-storage.sql
\`\`\`

#### Script 4: Dados de Exemplo
\`\`\`sql
-- Cole e execute o conteúdo de scripts/04-seed-data.sql
\`\`\`

### 2.2 Verificar Criação
Após executar todos os scripts, verifique:
- **Database > Tables**: Deve ter `products` e `promotions`
- **Storage**: Deve ter bucket `product-images`
- **Authentication > Policies**: Deve ter políticas criadas

---

## 📋 **Passo 3: Configurar Frontend**

### 3.1 Atualizar Credenciais
No arquivo `lib/supabase.ts`, substitua:

\`\`\`typescript
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "MY_POSTGRES_URL"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "SUA_CHAVE_ANONIMA_AQUI"
\`\`\`

### 3.2 Variáveis de Ambiente
Crie/atualize o arquivo `.env.local`:

\`\`\`env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=MY_POSTGRES_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=SUA-CHAVE-PUBLICA-AQUI
SUPABASE_SERVICE_ROLE_KEY=SUA-CHAVE-PRIVADA-AQUI
\`\`\`

---

## 📋 **Passo 4: Testar Sistema**

### 4.1 Verificar Conexão
1. Inicie o projeto: `npm run dev`
2. Acesse: `http://localhost:3000`
3. Vá para `/admin/login`
4. Use as credenciais:
   - **Usuário**: `brenno.dev`
   - **Senha**: `Bre140903`

### 4.2 Testar Funcionalidades
1. **Dashboard**: Deve mostrar produtos e estatísticas
2. **Produtos**: Deve listar produtos com promoções aplicadas
3. **Upload**: Teste envio de imagens
4. **Promoções**: Crie uma promoção e veja refletir nos produtos

---

## 🎯 **Funcionalidades Implementadas**

### ✅ **Sistema de Produtos**
- CRUD completo de produtos
- Upload de imagens
- Categorização
- Soft delete (produtos inativos)

### ✅ **Sistema de Promoções**
- Criação de promoções com desconto percentual
- Período de validade (data início/fim)
- Ativação/desativação
- **Aplicação automática nos produtos**

### ✅ **Frontend Atualizado**
- Produtos mostram preços originais e com desconto
- Badges de promoção
- Cálculo automático de preços
- Interface responsiva

### ✅ **Segurança**
- RLS (Row Level Security) configurado
- Políticas de acesso
- Storage público para imagens
- Autenticação admin

---

## 🔧 **Estrutura do Banco**

### Tabela `products`
\`\`\`sql
- id (TEXT, PK)
- name (TEXT)
- description (TEXT)
- price (TEXT)
- images (TEXT[])
- category (TEXT)
- materials (TEXT[])
- dimensions (JSONB)
- features (TEXT[])
- detailed_description (TEXT)
- is_active (BOOLEAN)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
\`\`\`

### Tabela `promotions`
\`\`\`sql
- id (UUID, PK)
- product_id (TEXT, FK)
- discount_percentage (INTEGER)
- start_date (TIMESTAMP)
- end_date (TIMESTAMP)
- is_active (BOOLEAN)
- created_at (TIMESTAMP)
\`\`\`

### Storage `product-images`
- Bucket público
- Limite: 50MB por arquivo
- Formatos: JPG, PNG, WebP, GIF, AVIF

---

## 🚨 **Solução de Problemas**

### Erro de Conexão
- Verifique se as credenciais estão corretas
- Confirme se o projeto Supabase está ativo
- Teste a URL no navegador

### Erro de Permissão
- Execute novamente os scripts de segurança
- Verifique se RLS está habilitado
- Confirme se as políticas foram criadas

### Erro de Storage
- Execute novamente o script de storage
- Verifique se o bucket foi criado
- Teste upload de uma imagem pequena

### Produtos Não Aparecem
- Verifique se `is_active = true`
- Confirme se os dados foram inseridos
- Teste a query no SQL Editor

---

## 📞 **Suporte**

Se encontrar problemas:
1. Verifique os logs do console do navegador
2. Teste as queries no SQL Editor do Supabase
3. Confirme se todos os scripts foram executados
4. Verifique se as credenciais estão corretas

**Tudo configurado corretamente, o sistema deve funcionar perfeitamente!** 🎉

---

## 🔧 **Configuração das Variáveis de Ambiente**

### Arquivo `.env.local`
\`\`\`env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=MY_POSTGRES_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_aqui

# Para funcionalidades administrativas
SUPABASE_SERVICE_ROLE_KEY=sua_chave_service_role_aqui

# Outras configurações (se necessário)
POSTGRES_URL=MY_POSTGRES_URL
POSTGRES_PRISMA_URL=MY_POSTGRES_URL
POSTGRES_URL_NON_POOLING=MY_POSTGRES_URL
\`\`\`

### Importante:
- Substitua `MY_POSTGRES_URL` pela URL real do seu projeto Supabase
- Substitua as chaves pelos valores reais do seu projeto
- Nunca commite o arquivo `.env.local` no Git
- Use `MY_POSTGRES_URL` como placeholder até configurar o projeto real
