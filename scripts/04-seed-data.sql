-- Script 4: Inserir dados de exemplo
-- Execute este script por último

-- 1. INSERIR PRODUTOS DE EXEMPLO
INSERT INTO products (id, name, description, price, images, category, materials, dimensions, features, detailed_description, is_active) VALUES
('sofa-confort-plus', 'Sofá Confort Plus', 'Sofá de 3 lugares com tecido premium e estrutura em madeira maciça', '2.499,00', 
 ARRAY['/images/products/sofas/sofa-confort-plus-1.jpg', '/images/products/sofas/sofa-confort-plus-2.jpg', '/images/products/sofas/sofa-confort-plus-3.jpg', '/images/products/sofas/sofa-confort-plus-4.jpg'],
 'Sofás', 
 ARRAY['MDF de alta qualidade', 'Tecido premium impermeável', 'Espuma D33', 'Estrutura em madeira maciça'],
 '{"largura": "210 cm", "profundidade": "90 cm", "altura": "85 cm", "peso": "45 kg"}',
 ARRAY['Estrutura em MDF muito resistente', 'Tecido anti-manchas', 'Espuma de alta densidade', 'Pés em madeira maciça', 'Garantia de 2 anos'],
 'O Sofá Confort Plus é a escolha perfeita para quem busca conforto e elegância. Fabricado com MDF de alta qualidade, oferece resistência e durabilidade excepcionais. O tecido premium é tratado contra manchas e o enchimento em espuma D33 garante conforto duradouro.',
 true),

('sofa-retratil-luxo', 'Sofá Retrátil Luxo', 'Sofá retrátil e reclinável de 4 lugares com tecido suede', '3.299,00',
 ARRAY['/images/products/sofas/sofa-retratil-luxo-1.jpg', '/images/products/sofas/sofa-retratil-luxo-2.jpg', '/images/products/sofas/sofa-retratil-luxo-3.jpg', '/images/products/sofas/sofa-retratil-luxo-4.jpg'],
 'Sofás',
 ARRAY['MDF de alta qualidade', 'Tecido suede', 'Espuma D35', 'Mecanismo retrátil alemão'],
 '{"largura": "280 cm", "profundidade": "105 cm", "altura": "90 cm", "peso": "65 kg"}',
 ARRAY['Estrutura em MDF muito resistente', 'Mecanismo retrátil e reclinável', 'Tecido suede macio', '4 lugares confortáveis', 'Garantia de 3 anos'],
 'O Sofá Retrátil Luxo combina tecnologia e conforto. Com estrutura em MDF resistente e mecanismo alemão de alta qualidade, oferece funcionalidade e durabilidade. O tecido suede proporciona toque macio e elegância ao ambiente.',
 true),

('mesa-jantar-rustica', 'Mesa de Jantar Rústica', 'Mesa de jantar em madeira maciça para 6 pessoas', '1.899,00',
 ARRAY['/images/products/mesas/mesa-jantar-rustica-1.jpg', '/images/products/mesas/mesa-jantar-rustica-2.jpg', '/images/products/mesas/mesa-jantar-rustica-3.jpg', '/images/products/mesas/mesa-jantar-rustica-4.jpg'],
 'Mesas',
 ARRAY['MDF de alta qualidade', 'Laminado melamínico', 'Bordas em PVC', 'Pés em madeira maciça'],
 '{"largura": "160 cm", "profundidade": "90 cm", "altura": "75 cm", "peso": "35 kg"}',
 ARRAY['Tampo em MDF muito resistente', 'Acabamento rústico', 'Comporta 6 pessoas', 'Pés em madeira maciça', 'Garantia de 2 anos'],
 'A Mesa de Jantar Rústica é perfeita para reunir a família. Fabricada com MDF de alta qualidade e acabamento rústico, oferece resistência e charme. O tampo espaçoso comporta confortavelmente 6 pessoas.',
 true),

('mesa-centro-moderna', 'Mesa de Centro Moderna', 'Mesa de centro com tampo de vidro e estrutura em metal', '899,00',
 ARRAY['/images/products/mesas/mesa-centro-moderna-1.jpg', '/images/products/mesas/mesa-centro-moderna-2.jpg', '/images/products/mesas/mesa-centro-moderna-3.jpg', '/images/products/mesas/mesa-centro-moderna-4.jpg'],
 'Mesas',
 ARRAY['Vidro temperado', 'Estrutura em metal', 'Acabamento cromado', 'Base antiderrapante'],
 '{"largura": "120 cm", "profundidade": "60 cm", "altura": "45 cm", "peso": "18 kg"}',
 ARRAY['Tampo em vidro temperado', 'Estrutura metálica resistente', 'Design moderno', 'Fácil limpeza', 'Garantia de 1 ano'],
 'A Mesa de Centro Moderna combina elegância e funcionalidade. O tampo em vidro temperado e a estrutura metálica criam um visual contemporâneo, perfeito para salas modernas.',
 true),

('cama-box-casal-premium', 'Cama Box Casal Premium', 'Cama box conjugada com colchão de molas ensacadas', '2.799,00',
 ARRAY['/images/products/camas/cama-box-casal-1.jpg', '/images/products/camas/cama-box-casal-2.jpg', '/images/products/camas/cama-box-casal-3.jpg', '/images/products/camas/cama-box-casal-4.jpg'],
 'Camas',
 ARRAY['MDF de alta qualidade', 'Colchão de molas ensacadas', 'Tecido anti-ácaro', 'Base box reforçada'],
 '{"largura": "138 cm", "profundidade": "188 cm", "altura": "60 cm", "peso": "80 kg"}',
 ARRAY['Base em MDF muito resistente', 'Colchão de molas ensacadas', 'Tecido anti-ácaro e anti-fungos', 'Base box com gavetas', 'Garantia de 5 anos'],
 'A Cama Box Casal Premium oferece o máximo em conforto e qualidade. A base em MDF resistente suporta o colchão de molas ensacadas, proporcionando noites de sono reparador. Inclui gavetas para otimizar o espaço.',
 true),

('rack-tv-65', 'Rack para TV 65"', 'Rack com painel para TV até 65 polegadas com iluminação LED', '1.699,00',
 ARRAY['/images/products/racks/rack-tv-65-1.jpg', '/images/products/racks/rack-tv-65-2.jpg', '/images/products/racks/rack-tv-65-3.jpg', '/images/products/racks/rack-tv-65-4.jpg'],
 'Racks',
 ARRAY['MDF de alta qualidade', 'Laminado melamínico', 'LED integrado', 'Dobradiças soft close'],
 '{"largura": "180 cm", "profundidade": "35 cm", "altura": "160 cm", "peso": "42 kg"}',
 ARRAY['Estrutura em MDF muito resistente', 'Suporte para TV até 65 polegadas', 'Iluminação LED integrada', 'Múltiplos compartimentos', 'Garantia de 2 anos'],
 'O Rack para TV 65" é a solução completa para sua sala de estar. Fabricado em MDF resistente, comporta TVs de até 65 polegadas e oferece múltiplos compartimentos. A iluminação LED integrada cria um ambiente moderno e aconchegante.',
 true),

('guarda-roupa-casal-premium', 'Guarda-roupa Casal Premium', 'Guarda-roupa de 6 portas com espelho e gavetas internas', '3.899,00',
 ARRAY['/images/products/guarda-roupas/guarda-roupa-casal-premium-1.jpg', '/images/products/guarda-roupas/guarda-roupa-casal-premium-2.jpg', '/images/products/guarda-roupas/guarda-roupa-casal-premium-3.jpg', '/images/products/guarda-roupas/guarda-roupa-casal-premium-4.jpg'],
 'Guarda-roupas',
 ARRAY['MDF de alta qualidade', 'Espelho cristal', 'Dobradiças soft close', 'Puxadores em metal'],
 '{"largura": "270 cm", "profundidade": "60 cm", "altura": "220 cm", "peso": "120 kg"}',
 ARRAY['Estrutura em MDF muito resistente', '6 portas com espelho central', 'Gavetas internas organizadoras', 'Dobradiças soft close', 'Garantia de 3 anos'],
 'O Guarda-roupa Casal Premium é ideal para casais que precisam de muito espaço de armazenamento. Com 6 portas e espelho central, oferece organização e funcionalidade. As gavetas internas facilitam a organização de roupas íntimas e acessórios.',
 true);

-- 2. INSERIR PROMOÇÕES DE EXEMPLO
INSERT INTO promotions (product_id, discount_percentage, start_date, end_date, is_active) VALUES
('sofa-confort-plus', 15, NOW() - INTERVAL '1 day', NOW() + INTERVAL '30 days', true),
('mesa-centro-moderna', 20, NOW() - INTERVAL '1 day', NOW() + INTERVAL '15 days', true);

-- 3. VERIFICAR DADOS INSERIDOS
SELECT 'Dados inseridos com sucesso!' as status;
SELECT COUNT(*) as total_produtos FROM products WHERE is_active = true;
SELECT COUNT(*) as total_promocoes FROM promotions WHERE is_active = true;

-- 4. MOSTRAR PRODUTOS COM PROMOÇÕES
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
  AND pr.end_date >= NOW()
WHERE p.is_active = true;
