-- Script para corrigir a estrutura do banco de dados
-- Execute este script no SQL Editor do Supabase

-- 1. LIMPAR TABELAS EXISTENTES
DROP TABLE IF EXISTS promotions CASCADE;
DROP TABLE IF EXISTS products CASCADE;

-- 2. CRIAR TABELA DE PRODUTOS (sem is_active)
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
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. CRIAR TABELA DE PROMOÇÕES
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

-- 4. CRIAR ÍNDICES
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_products_name ON products(name);
CREATE INDEX IF NOT EXISTS idx_promotions_product_id ON promotions(product_id);
CREATE INDEX IF NOT EXISTS idx_promotions_active ON promotions(is_active);
CREATE INDEX IF NOT EXISTS idx_promotions_dates ON promotions(start_date, end_date);

-- 5. HABILITAR RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE promotions ENABLE ROW LEVEL SECURITY;

-- 6. CRIAR POLÍTICAS PARA PRODUTOS
CREATE POLICY "Allow public read access on products" ON products
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert on products" ON products
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update on products" ON products
  FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Allow public delete on products" ON products
  FOR DELETE USING (true);

-- 7. CRIAR POLÍTICAS PARA PROMOÇÕES
CREATE POLICY "Allow public read access on promotions" ON promotions
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert on promotions" ON promotions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update on promotions" ON promotions
  FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Allow public delete on promotions" ON promotions
  FOR DELETE USING (true);

-- 8. INSERIR PRODUTOS DE EXEMPLO
INSERT INTO products (id, name, description, price, images, category, materials, dimensions, features, detailed_description) VALUES
('sofa-confort-plus', 'Sofá Confort Plus', 'Sofá de 3 lugares com tecido premium e estrutura em madeira maciça', '2.499,00', 
 ARRAY['/images/products/sofas/sofa-confort-plus-1.jpg', '/images/products/sofas/sofa-confort-plus-2.jpg', '/images/products/sofas/sofa-confort-plus-3.jpg', '/images/products/sofas/sofa-confort-plus-4.jpg'],
 'Sofás', 
 ARRAY['MDF de alta qualidade', 'Tecido premium impermeável', 'Espuma D33', 'Estrutura em madeira maciça'],
 '{"largura": "210 cm", "profundidade": "90 cm", "altura": "85 cm", "peso": "45 kg"}',
 ARRAY['Estrutura em MDF muito resistente', 'Tecido anti-manchas', 'Espuma de alta densidade', 'Pés em madeira maciça', 'Garantia de 2 anos'],
 'O Sofá Confort Plus é a escolha perfeita para quem busca conforto e elegância. Fabricado com MDF de alta qualidade, oferece resistência e durabilidade excepcionais. O tecido premium é tratado contra manchas e o enchimento em espuma D33 garante conforto duradouro.'),

('sofa-retratil-luxo', 'Sofá Retrátil Luxo', 'Sofá retrátil e reclinável de 4 lugares com tecido suede', '3.299,00',
 ARRAY['/images/products/sofas/sofa-retratil-luxo-1.jpg', '/images/products/sofas/sofa-retratil-luxo-2.jpg', '/images/products/sofas/sofa-retratil-luxo-3.jpg', '/images/products/sofas/sofa-retratil-luxo-4.jpg'],
 'Sofás',
 ARRAY['MDF de alta qualidade', 'Tecido suede', 'Espuma D35', 'Mecanismo retrátil alemão'],
 '{"largura": "280 cm", "profundidade": "105 cm", "altura": "90 cm", "peso": "65 kg"}',
 ARRAY['Estrutura em MDF muito resistente', 'Mecanismo retrátil e reclinável', 'Tecido suede macio', '4 lugares confortáveis', 'Garantia de 3 anos'],
 'O Sofá Retrátil Luxo combina tecnologia e conforto. Com estrutura em MDF resistente e mecanismo alemão de alta qualidade, oferece funcionalidade e durabilidade. O tecido suede proporciona toque macio e elegância ao ambiente.'),

('sofa-canto-elegance', 'Sofá Canto Elegance', 'Sofá de canto em L com chaise e almofadas soltas', '2.899,00',
 ARRAY['/images/products/sofas/sofa-canto-elegance-1.jpg', '/images/products/sofas/sofa-canto-elegance-2.jpg', '/images/products/sofas/sofa-canto-elegance-3.jpg', '/images/products/sofas/sofa-canto-elegance-4.jpg'],
 'Sofás',
 ARRAY['MDF de alta qualidade', 'Tecido linho', 'Espuma D28', 'Pés em madeira'],
 '{"largura": "250 cm", "profundidade": "180 cm", "altura": "88 cm", "peso": "75 kg"}',
 ARRAY['Formato em L otimiza espaço', 'Almofadas soltas removíveis', 'Tecido em linho natural', 'Chaise confortável', 'Garantia de 2 anos'],
 'O Sofá Canto Elegance é ideal para salas amplas. Seu formato em L aproveita melhor o espaço e oferece mais lugares. As almofadas soltas facilitam a limpeza e manutenção.'),

('mesa-jantar-rustica', 'Mesa de Jantar Rústica', 'Mesa de jantar em madeira maciça para 6 pessoas', '1.899,00',
 ARRAY['/images/products/mesas/mesa-jantar-rustica-1.jpg', '/images/products/mesas/mesa-jantar-rustica-2.jpg', '/images/products/mesas/mesa-jantar-rustica-3.jpg', '/images/products/mesas/mesa-jantar-rustica-4.jpg'],
 'Mesas',
 ARRAY['MDF de alta qualidade', 'Laminado melamínico', 'Bordas em PVC', 'Pés em madeira maciça'],
 '{"largura": "160 cm", "profundidade": "90 cm", "altura": "75 cm", "peso": "35 kg"}',
 ARRAY['Tampo em MDF muito resistente', 'Acabamento rústico', 'Comporta 6 pessoas', 'Pés em madeira maciça', 'Garantia de 2 anos'],
 'A Mesa de Jantar Rústica é perfeita para reunir a família. Fabricada com MDF de alta qualidade e acabamento rústico, oferece resistência e charme. O tampo espaçoso comporta confortavelmente 6 pessoas.'),

('mesa-centro-moderna', 'Mesa de Centro Moderna', 'Mesa de centro com tampo de vidro e estrutura em metal', '899,00',
 ARRAY['/images/products/mesas/mesa-centro-moderna-1.jpg', '/images/products/mesas/mesa-centro-moderna-2.jpg', '/images/products/mesas/mesa-centro-moderna-3.jpg', '/images/products/mesas/mesa-centro-moderna-4.jpg'],
 'Mesas',
 ARRAY['Vidro temperado', 'Estrutura em metal', 'Acabamento cromado', 'Base antiderrapante'],
 '{"largura": "120 cm", "profundidade": "60 cm", "altura": "45 cm", "peso": "18 kg"}',
 ARRAY['Tampo em vidro temperado', 'Estrutura metálica resistente', 'Design moderno', 'Fácil limpeza', 'Garantia de 1 ano'],
 'A Mesa de Centro Moderna combina elegância e funcionalidade. O tampo em vidro temperado e a estrutura metálica criam um visual contemporâneo, perfeito para salas modernas.'),

('cama-box-casal-premium', 'Cama Box Casal Premium', 'Cama box conjugada com colchão de molas ensacadas', '2.799,00',
 ARRAY['/images/products/camas/cama-box-casal-1.jpg', '/images/products/camas/cama-box-casal-2.jpg', '/images/products/camas/cama-box-casal-3.jpg', '/images/products/camas/cama-box-casal-4.jpg'],
 'Camas',
 ARRAY['MDF de alta qualidade', 'Colchão de molas ensacadas', 'Tecido anti-ácaro', 'Base box reforçada'],
 '{"largura": "138 cm", "profundidade": "188 cm", "altura": "60 cm", "peso": "80 kg"}',
 ARRAY['Base em MDF muito resistente', 'Colchão de molas ensacadas', 'Tecido anti-ácaro e anti-fungos', 'Base box com gavetas', 'Garantia de 5 anos'],
 'A Cama Box Casal Premium oferece o máximo em conforto e qualidade. A base em MDF resistente suporta o colchão de molas ensacadas, proporcionando noites de sono reparador. Inclui gavetas para otimizar o espaço.'),

('rack-tv-65', 'Rack para TV 65"', 'Rack com painel para TV até 65 polegadas com iluminação LED', '1.699,00',
 ARRAY['/images/products/racks/rack-tv-65-1.jpg', '/images/products/racks/rack-tv-65-2.jpg', '/images/products/racks/rack-tv-65-3.jpg', '/images/products/racks/rack-tv-65-4.jpg'],
 'Racks',
 ARRAY['MDF de alta qualidade', 'Laminado melamínico', 'LED integrado', 'Dobradiças soft close'],
 '{"largura": "180 cm", "profundidade": "35 cm", "altura": "160 cm", "peso": "42 kg"}',
 ARRAY['Estrutura em MDF muito resistente', 'Suporte para TV até 65 polegadas', 'Iluminação LED integrada', 'Múltiplos compartimentos', 'Garantia de 2 anos'],
 'O Rack para TV 65" é a solução completa para sua sala de estar. Fabricado em MDF resistente, comporta TVs de até 65 polegadas e oferece múltiplos compartimentos. A iluminação LED integrada cria um ambiente moderno e aconchegante.'),

('guarda-roupa-casal-premium', 'Guarda-roupa Casal Premium', 'Guarda-roupa de 6 portas com espelho e gavetas internas', '3.899,00',
 ARRAY['/images/products/guarda-roupas/guarda-roupa-casal-premium-1.jpg', '/images/products/guarda-roupas/guarda-roupa-casal-premium-2.jpg', '/images/products/guarda-roupas/guarda-roupa-casal-premium-3.jpg', '/images/products/guarda-roupas/guarda-roupa-casal-premium-4.jpg'],
 'Guarda-roupas',
 ARRAY['MDF de alta qualidade', 'Espelho cristal', 'Dobradiças soft close', 'Puxadores em metal'],
 '{"largura": "270 cm", "profundidade": "60 cm", "altura": "220 cm", "peso": "120 kg"}',
 ARRAY['Estrutura em MDF muito resistente', '6 portas com espelho central', 'Gavetas internas organizadoras', 'Dobradiças soft close', 'Garantia de 3 anos'],
 'O Guarda-roupa Casal Premium é ideal para casais que precisam de muito espaço de armazenamento. Com 6 portas e espelho central, oferece organização e funcionalidade. As gavetas internas facilitam a organização de roupas íntimas e acessórios.');

-- 9. INSERIR PROMOÇÕES DE EXEMPLO
INSERT INTO promotions (product_id, discount_percentage, start_date, end_date, is_active) VALUES
('sofa-confort-plus', 15, NOW() - INTERVAL '1 day', NOW() + INTERVAL '30 days', true),
('mesa-centro-moderna', 20, NOW() - INTERVAL '1 day', NOW() + INTERVAL '15 days', true);

-- 10. VERIFICAR DADOS
SELECT 'Configuração concluída!' as status;
SELECT COUNT(*) as total_produtos FROM products;
SELECT COUNT(*) as total_promocoes FROM promotions WHERE is_active = true;

-- 11. MOSTRAR PRODUTOS COM PROMOÇÕES
SELECT 
  p.name,
  p.price,
  pr.discount_percentage,
  CASE 
    WHEN pr.id IS NOT NULL THEN 
      ROUND((CAST(REPLACE(REPLACE(p.price, '.', ''), ',', '.') AS NUMERIC) * (1 - pr.discount_percentage::NUMERIC / 100)), 2)
    ELSE NULL
  END as discounted_price
FROM products p
LEFT JOIN promotions pr ON p.id = pr.product_id 
  AND pr.is_active = true 
  AND pr.start_date <= NOW() 
  AND pr.end_date >= NOW();
