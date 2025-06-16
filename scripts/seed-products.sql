-- Inserir produtos iniciais (migração dos dados existentes)
INSERT INTO products (id, name, description, price, images, category, materials, dimensions, features, detailed_description) VALUES
('sofa-1', 'Sofá Confort Plus', 'Sofá de 3 lugares com tecido premium e estrutura em madeira maciça', '2.499,00', 
 ARRAY['/images/products/sofas/sofa-confort-plus-1.jpg', '/images/products/sofas/sofa-confort-plus-2.jpg', '/images/products/sofas/sofa-confort-plus-3.jpg', '/images/products/sofas/sofa-confort-plus-4.jpg'],
 'Sofás', 
 ARRAY['MDF de alta qualidade', 'Tecido premium impermeável', 'Espuma D33', 'Estrutura em madeira maciça'],
 '{"largura": "210 cm", "profundidade": "90 cm", "altura": "85 cm", "peso": "45 kg"}',
 ARRAY['Estrutura em MDF muito resistente', 'Tecido anti-manchas', 'Espuma de alta densidade', 'Pés em madeira maciça', 'Garantia de 2 anos'],
 'O Sofá Confort Plus é a escolha perfeita para quem busca conforto e elegância. Fabricado com MDF de alta qualidade, oferece resistência e durabilidade excepcionais. O tecido premium é tratado contra manchas e o enchimento em espuma D33 garante conforto duradouro.'),

('sofa-2', 'Sofá Retrátil Luxo', 'Sofá retrátil e reclinável de 4 lugares com tecido suede', '3.299,00',
 ARRAY['/images/products/sofas/sofa-retratil-luxo-1.jpg', '/images/products/sofas/sofa-retratil-luxo-2.jpg', '/images/products/sofas/sofa-retratil-luxo-3.jpg', '/images/products/sofas/sofa-retratil-luxo-4.jpg'],
 'Sofás',
 ARRAY['MDF de alta qualidade', 'Tecido suede', 'Espuma D35', 'Mecanismo retrátil alemão'],
 '{"largura": "280 cm", "profundidade": "105 cm", "altura": "90 cm", "peso": "65 kg"}',
 ARRAY['Estrutura em MDF muito resistente', 'Mecanismo retrátil e reclinável', 'Tecido suede macio', '4 lugares confortáveis', 'Garantia de 3 anos'],
 'O Sofá Retrátil Luxo combina tecnologia e conforto. Com estrutura em MDF resistente e mecanismo alemão de alta qualidade, oferece funcionalidade e durabilidade. O tecido suede proporciona toque macio e elegância ao ambiente.'),

('mesa-1', 'Mesa de Jantar Rústica', 'Mesa de jantar em madeira maciça para 6 pessoas', '1.899,00',
 ARRAY['/images/products/mesas/mesa-jantar-rustica-1.jpg', '/images/products/mesas/mesa-jantar-rustica-2.jpg', '/images/products/mesas/mesa-jantar-rustica-3.jpg', '/images/products/mesas/mesa-jantar-rustica-4.jpg'],
 'Mesas',
 ARRAY['MDF de alta qualidade', 'Laminado melamínico', 'Bordas em PVC', 'Pés em madeira maciça'],
 '{"largura": "160 cm", "profundidade": "90 cm", "altura": "75 cm", "peso": "35 kg"}',
 ARRAY['Tampo em MDF muito resistente', 'Acabamento rústico', 'Comporta 6 pessoas', 'Pés em madeira maciça', 'Garantia de 2 anos'],
 'A Mesa de Jantar Rústica é perfeita para reunir a família. Fabricada com MDF de alta qualidade e acabamento rústico, oferece resistência e charme. O tampo espaçoso comporta confortavelmente 6 pessoas.')

ON CONFLICT (id) DO NOTHING;
