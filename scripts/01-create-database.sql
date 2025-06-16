-- Script 1: Criar estrutura básica do banco de dados
-- Execute este script primeiro no SQL Editor do Supabase

-- 1. CRIAR EXTENSÕES NECESSÁRIAS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. LIMPAR TABELAS EXISTENTES (se necessário)
DROP TABLE IF EXISTS promotions CASCADE;
DROP TABLE IF EXISTS products CASCADE;

-- 3. CRIAR TABELA DE PRODUTOS
CREATE TABLE products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  category TEXT NOT NULL,
  materials TEXT[] DEFAULT '{}',
  dimensions JSONB DEFAULT '{}',
  features TEXT[] DEFAULT '{}',
  detailed_description TEXT DEFAULT '',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. CRIAR TABELA DE PROMOÇÕES
CREATE TABLE promotions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  discount_percentage INTEGER NOT NULL CHECK (discount_percentage > 0 AND discount_percentage <= 100),
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT valid_date_range CHECK (end_date > start_date)
);

-- 5. CRIAR ÍNDICES PARA PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_products_name ON products(name);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_promotions_product_id ON promotions(product_id);
CREATE INDEX IF NOT EXISTS idx_promotions_active ON promotions(is_active);
CREATE INDEX IF NOT EXISTS idx_promotions_dates ON promotions(start_date, end_date);

-- 6. VERIFICAR SE AS TABELAS FORAM CRIADAS
SELECT 'Tabelas criadas com sucesso!' as status;
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' AND table_name IN ('products', 'promotions');
