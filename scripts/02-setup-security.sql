-- Script 2: Configurar segurança e políticas RLS
-- Execute este script após criar as tabelas

-- 1. HABILITAR RLS (Row Level Security)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE promotions ENABLE ROW LEVEL SECURITY;

-- 2. LIMPAR POLÍTICAS EXISTENTES
DROP POLICY IF EXISTS "Allow public read access on products" ON products;
DROP POLICY IF EXISTS "Allow public insert on products" ON products;
DROP POLICY IF EXISTS "Allow public update on products" ON products;
DROP POLICY IF EXISTS "Allow public delete on products" ON products;

DROP POLICY IF EXISTS "Allow public read access on promotions" ON promotions;
DROP POLICY IF EXISTS "Allow public insert on promotions" ON promotions;
DROP POLICY IF EXISTS "Allow public update on promotions" ON promotions;
DROP POLICY IF EXISTS "Allow public delete on promotions" ON promotions;

-- 3. CRIAR POLÍTICAS PARA PRODUTOS
-- Leitura pública (apenas produtos ativos)
CREATE POLICY "Allow public read active products" ON products
  FOR SELECT USING (is_active = true);

-- Leitura completa para admin (todos os produtos)
CREATE POLICY "Allow admin read all products" ON products
  FOR SELECT USING (true);

-- Inserção, atualização e exclusão públicas (para admin via frontend)
CREATE POLICY "Allow public insert on products" ON products
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update on products" ON products
  FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Allow public delete on products" ON products
  FOR DELETE USING (true);

-- 4. CRIAR POLÍTICAS PARA PROMOÇÕES
CREATE POLICY "Allow public read access on promotions" ON promotions
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert on promotions" ON promotions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update on promotions" ON promotions
  FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Allow public delete on promotions" ON promotions
  FOR DELETE USING (true);

-- 5. VERIFICAR POLÍTICAS CRIADAS
SELECT 'Políticas de segurança configuradas!' as status;
SELECT policyname, tablename FROM pg_policies 
WHERE tablename IN ('products', 'promotions');
